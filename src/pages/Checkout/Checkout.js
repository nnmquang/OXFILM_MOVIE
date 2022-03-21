import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import style from './Checkout.module.css';
import screen from './../../assets/logofilm/screen-thumb.png'
import logo from './../../assets/logofilm/Oxfilm.png'
import { datGheAction, datVeAction, layChiTietPhongVeAction } from '../../redux/actions/QuanLyDatVeActions';
import seat from './../../assets/logofilm/seat.png'
import './Checkout.css'
import { CloseOutlined, UserOutlined, SmileOutlined } from '@ant-design/icons'
import { CHANGE_TAB_ACTIVE, CHUYEN_TAB, DAT_GHE, DAT_VE } from '../../redux/actions/types/QuanLyDatVeType';
import _ from 'lodash';
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe';
import { Tabs } from 'antd';
import { NavLink } from 'react-router-dom';
import { layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';
import moment from 'moment';
import { connection } from '../../index';
// import { history } from '../../App';
import { TOKEN, USER_LOGIN, USER_SIGNUP } from '../../util/settings/config';
import { useHistory } from 'react-router-dom';






function Checkout(props) {


  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

  const { chiTietPhongVe, danhSachGheDangDat,danhSachGheKhachDat } = useSelector(state => state.QuanLyDatVeReducer);

  const dispatch = useDispatch();

  console.log({ chiTietPhongVe })

  useEffect(() => {
    //Goi ham tao ra 1 async function
    const action = layChiTietPhongVeAction(props.match.params.id);
    //Dispatch function nay di
    dispatch(action);


    //Có 1 client nào thực hiện việc đặt vé thành công mình sẽ load lại danh sách phòng vé của lịch chiếu đó
    connection.on('datVeThanhCong',() => {
      dispatch(action);
    })

    //Vừa vào trang load tất cả ghế của người khác đang đặt
    connection.invoke('loadDanhSachGhe',props.match.params.id)

    //Load danh sách ghế đang đặt từ server về -video 59 realtime (lắng nghe sự kiện từ serve trả về)
    connection.on("loadDanhSachGheDaDat", (dsGheKhachDat)=> {
      console.log('loadDanhSachGheDaDat',dsGheKhachDat); 

      //B1: Loại mình ra khỏi danh sách - video60
      dsGheKhachDat = dsGheKhachDat.filter(item => item.taiKhoan !== userLogin.taiKhoan);
      //B2: Gộp danh sách ghế khách đawtj ở tất cả user thành 1 mảng chung

      let arrGheKhachDat = dsGheKhachDat.reduce((result,item,index)=>{
        let arrGhe = JSON.parse(item.danhSachGhe);

        return [...result,...arrGhe]
      },[]);

      //Đôi lúc vì yếu tố mạng nên khách sẽ đặt trùng với nhau => trùng ghế vói nhau => Backend sẽ xử lý
      //Frontend cũng xử lý được bằng cách loại bỏ những phần tử trùng nhau trong mảng => sử dụng lodash uniqBy
      // Sau đó đưa dữ liệu ghế khách đặt cập nhật redux
      arrGheKhachDat = _.uniqBy(arrGheKhachDat,'maGhe');

      //Đưa dữ liệu khách đặt về redux
      dispatch({
        type: DAT_GHE,
        arrGheKhachDat:arrGheKhachDat
      })
      console.log(arrGheKhachDat)
    })

    //Cài đặt sự kiện khi reload trang (khi ghế ko đặt sẽ bị mất)
    window.addEventListener("beforeunload",clearGhe);

    return () => {
      clearGhe();
      window.removeEventListener('beforeunload',clearGhe)
    }
        

  }, [])

  const clearGhe = function(event) {
    connection.invoke('huyDat',userLogin.taiKhoan,props.match.params.id)
  }

  const { thongTinPhim, danhSachGhe } = chiTietPhongVe;

  const renderSeats = () => {
    return danhSachGhe.map((ghe, index) => {

      let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
      let classGheDaDat = ghe.daDat === true ? 'gheDaDat' : '';
      let classGheDangDat = '';

      //Kiểm tra từng ghế render xem có trong mảng ghế đang đặt hay không
      let indexGheDD = danhSachGheDangDat.findIndex(gheDD => gheDD.maGhe === ghe.maGhe);
      if (indexGheDD != -1) {
        classGheDaDat = 'gheDangDat'
      }

      //Ghế được chính mình đặt màu vàng-Ghế được chính mình đặt-taiKhoanNguoiDat nam trong ThongTinDatVe
      let classGheDaDuocDat = '';
      if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheDaDuocDat = 'gheDaDuocDat';
      }

      //Kiểm tra từng ghế render xem có phải ghế khách đặt hay không (video58)
      let classGheKhachDat = '';
      let indexGheKD = danhSachGheKhachDat.findIndex(gheKD => gheKD.maGhe === ghe.maGhe);
      if(indexGheKD !== -1) {
        classGheKhachDat = 'gheKhachDat';
      }


      return <Fragment key={index}>
        <button onClick={() => {

          const action = datGheAction(ghe,props.match.params.id);
          dispatch(action);


        }} disabled={ghe.daDat || classGheKhachDat !=='' } className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat} ${classGheKhachDat}`}
          key={index}>
          <img src={seat} alt="" />
          {ghe.daDat ? classGheDaDuocDat !== '' ? <UserOutlined /> : <CloseOutlined /> : classGheKhachDat !=='' ? <SmileOutlined /> : ghe.stt}

        </button>


        {(index + 1) % 12 === 0 ? <br /> : ''}
      </Fragment>
    })
  }

  return (
    <div className='container-fluid' style={{ height: "auto", width: "100%", backgroundColor: '#001232' }} >
      {/* <img style={{ width: '180px', paddingTop: '10px' }} src={logo} alt="123" /> */}
      <div className='grid grid-cols-12'>
        <div className='col-span-9'>
          <h4 className={`${style['screen']}`}>màn hình</h4>
          <div style={{ marginLeft: '100px', marginTop: "30px" }}>
            <img src={screen} alt="123" />
          </div>
          <div className='mt-5 flex justify-center'>
            <table className="divide-y divide-gray-200">
              <thead className="p-5">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ghế bình thường</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ghế đang đặt</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ghế vip</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ghế đã đặt</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ghế mình đặt</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ghế khách đang đặt</th>

                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='text-center'><button className="p-2"><img style={{ width: '30px' }} src={seat} alt="" /></button></td>
                  <td className='text-center'><button className="gheDangDat"><img style={{ width: '30px' }} src={seat} alt="" /></button></td>
                  <td className='text-center'><button className="gheVip"><img style={{ width: '30px' }} src={seat} alt="" /></button></td>
                  <td className='text-center'><button className="gheDaDat"><img style={{ width: '30px' }} src={seat} alt="" /></button></td>
                  <td className='text-center'><button className="gheDaDuocDat"><img style={{ width: '30px' }} src={seat} alt="" /></button></td>
                  <td className='text-center'><button className="gheKhachDat"><img style={{ width: '30px' }} src={seat} alt="" /></button></td>

                </tr>
              </tbody>
            </table>
          </div>
          <div className='text-center'>
            {renderSeats()}
          </div>
        </div>
        <div className='col-span-3'>
          <div>
            <div className={`${style['booking-summery']}`}>
              <h4 className={`${style['title']}`}>chi tiết đặt vé</h4>
              <ul className={`${style['booking-summery ul']}`}>
                <li style={{ marginTop: 30, padding: 0 }}>
                  <h6 className={`${style['subtitle']}`}>{thongTinPhim.tenPhim}</h6>
                  <h5 className="subtitle mb-0 text-white"><span>Địa điểm: {thongTinPhim.tenCumRap} - {thongTinPhim.tenRap}</span></h5>

                  <span className={`${style['info']}`}>VIETSUB-2d</span>
                </li>
                <li style={{ marginTop: 30, padding: 0 }}>
                  <h6 className={`${style['subtitle']}`}><span>Ghế</span></h6>
                </li>
                <li>

                  <h6 className="subtitle text-white" style={{ overflowWrap: 'break-word' }}>
                    {_.sortBy(danhSachGheDangDat, ['stt']).map((gheDD, index) => {
                      return <span key={index} className='m-1'>[{gheDD.stt}]</span>
                    })}
                  </h6>
                  {/* <h6>SL: 
                  {danhSachGheDangDat.reduce((soLuong,ghe,index)=> {
                      return soLuong += ghe.soLuong;
                    },0).toLocaleString()}
                  </h6> */}
                </li>
                <li>
                  <h5 className="text-white"><span>Ngày chiếu: {thongTinPhim.ngayChieu}</span> - <span>{thongTinPhim.gioChieu}</span></h5>
                </li>
                <li>
                  <h6 className={`${style['subtitle']}`}><span>giá vé</span>
                    <span>
                      {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                        return tongTien += ghe.giaVe;
                      }, 0).toLocaleString()}
                    </span>
                  </h6>
                </li>
              </ul>
              <ul className="side-shape">
                <li>
                  <h6 className='text-white'>Email : {userLogin.email}</h6>
                </li>
                <li>
                  <h6 className='text-white'>Phone : {userLogin.soDT}</h6>
                </li>
              </ul>
              <ul>
                <li>

                </li>
              </ul>
            </div>
            <div className={`${style['proceed-area']}`}>
              <h6 className={`${style['subtitle']}`} style={{ marginBottom: 30 }}><span>Tổng tiền</span>
                <span>
                  {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                    return tongTien += ghe.giaVe;
                  }, 0).toLocaleString()} vnđ
                </span>
              </h6>
              <button onClick={() => {
                const thongTinDatVe = new ThongTinDatVe();
                thongTinDatVe.maLichChieu = props.match.params.id;
                thongTinDatVe.danhSachVe = danhSachGheDangDat;

                console.log(thongTinDatVe)

                dispatch(datVeAction(thongTinDatVe))

              }} href="#0" className={`${style['back-button']}`}>ĐẶT VÉ</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}




const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function CheckoutTab(props) {
  const history = useHistory();

  const { tabActive } = useSelector(state => state.QuanLyDatVeReducer)
  const dispatch = useDispatch();
  console.log({ tabActive });

  const {userLogin} = useSelector(state=>state.QuanLyNguoiDungReducer)

  const operations = <Fragment>
    <div className='flex px-2 text-justify'>
    <div style={{width:30,height:30, display:'flex', justifyContent:'center', alignItems:'center', borderRadius:'50%', color:'white'}} className="ml-5 rounded-full, bg-green-400">
        {userLogin.taiKhoan.substr(0,1)}
      </div>
    <div style={{justifyContent:'center', alignItems:'center', margin:'5px'}}>
    {!_.isEmpty(userLogin) ? <button onClick={()=>{
      history.push('/profile')
      // window.location.reload()
    }} className='text-white'>
      Hello ! {userLogin.taiKhoan}</button> : ''}
    </div>
    <div>
      <button onClick={()=>{
        localStorage.removeItem(USER_LOGIN);
        localStorage.removeItem(USER_SIGNUP);
        localStorage.removeItem(TOKEN);
        history.push('/home');
        window.location.reload();
      }} style={{backgroundColor:'#7d78ff', color:'#ffffff', borderRadius:'25px',justifyContent:'center', alignItems:'center',height:'30px',width:'100px'}}>Đăng Xuất</button>
    </div>
    </div>
  </Fragment>;


  return <div className="p-5" style={{ backgroundColor: '#001232' }}>
    <div className='grid grid-cols-12'>
      <div className='col-span-10'>
      <NavLink to="/"><img style={{ width: '180px', paddingTop: '10px' }} src={logo} alt="123" /></NavLink>
      </div>
    <div className='col-span-2 mt-6'>
    <NavLink to="/" style={{height:'40px'}} className={`${style['back-button']}`}>Quay lại trang chủ</NavLink>
    </div>
    
    </div>
    <Tabs tabBarExtraContent={operations} defaultActiveKey="1" activeKey={tabActive} onChange={(key) => {
      console.log('obeject', key)
      dispatch({
        type: CHANGE_TAB_ACTIVE,
        number: key.toString()
      })
    }}>
      <TabPane tab={<span style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>01 CHỌN GHẾ & THANH TOÁN</span>} key="1">
        <Checkout {...props} />
      </TabPane>
      <TabPane tab={<span style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>02 KẾT QUẢ ĐẶT VÉ</span>} key="2">
        <KetQuaDatVe {...props} />
      </TabPane>

    </Tabs>
  </div>
}

function KetQuaDatVe(props) {

  const dispatch = useDispatch();

  const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);

  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

  useEffect(() => {
    const action = layThongTinNguoiDungAction()
    dispatch(action)
  }, [])

  console.log({ thongTinNguoiDung })

  const renderTicketItem = () => {
    return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
      const seats = _.first(ticket.danhSachGhe)

      return <div className="p-2 w-full">
        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
          <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={ticket.hinhAnh} />
          <div className="flex-grow">
            <h2 className="text-white title-font font-medium">{ticket.tenPhim}</h2>
            <h6 className="text-indigo-300">Giờ chiếu: {moment(ticket.ngayDat).format('hh:mm A')} - Ngày chiếu {moment(ticket.ngayDat).format('DD-MM-YYYY')}</h6>
            <h6 className="text-indigo-300">{seats.tenHeThongRap}</h6>
            <h6 className="text-indigo-300">
              Tên rạp: {seats.tenCumRap} - Ghế {ticket.danhSachGhe.map((ghe, index) => { return <span key={index} className="m-1">[{ghe.tenGhe}]</span> })}
            </h6>
          </div>
        </div>
      </div>
    })
  }

  return <div className='container'>
    <div className="flex flex-col text-center w-full mt-6">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Lịch sử đặt vé khách hàng</h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-indigo-300">Kiểm tra thông tin và địa điểm đặt vé</p>
            </div>
    <div className='grid grid-cols-12'>
      <div className='col-span-8'>
        <section className="text-gray-600 body-font h-screen">
          <div className="container px-5 mx-auto" style={{paddingTop:'68px'}}>
            
            <div className="flex flex-wrap -m-2" style={{ backgroundColor: '#032055' }}>
              {renderTicketItem()}
              {/* <div className="p-2 w-full">
            <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
              <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/80x80" />
              <div className="flex-grow">
                <h2 className="text-gray-900 title-font font-medium">Holden Caulfield</h2>
                <p className="text-gray-500">UI Designer</p>
              </div>
            </div>
          </div> */}
            </div>
          </div>
        </section>
      </div>
      <div className='col-span-4'>
      <div className={`${style['booking-summery']}`}>
              <h4 className={`${style['title']}`}>Thông tin khách hàng</h4>
              <ul className={`${style['booking-summery ul']}`}>
                <li style={{ marginTop: 30, padding: 0 }}>
                  <h6 className='text-white'>Tên KH: {thongTinNguoiDung.hoTen}</h6>
                  <h6 className='text-white'>Tài khoản: {thongTinNguoiDung.taiKhoan}</h6>
                  <h6 className='text-white'>Email: {thongTinNguoiDung.email}</h6>
                  <h6 className='text-white'>Số ĐT: {thongTinNguoiDung.soDT}</h6>
                </li>
              </ul>
              <ul className="side-shape">
                <li>
                  <h6 className='text-white'>Mã tích điểm : {thongTinNguoiDung.maNhom}</h6>
                </li>
                <li>
                  <h6 className='text-white'>Loại TV : {thongTinNguoiDung.loaiNguoiDung}</h6>
                </li>
              </ul>
              <ul>
                <li>

                </li>
              </ul>
            </div>
      </div>
    </div>

  </div>
}















