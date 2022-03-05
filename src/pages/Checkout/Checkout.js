import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import style from './Checkout.module.css';
import screen from './../../assets/logofilm/screen-thumb.png'
import logo from './../../assets/logofilm/Oxfilm.png'
import { datVeAction, layChiTietPhongVeAction } from '../../redux/actions/QuanLyDatVeActions';
import seat from './../../assets/logofilm/seat.png'
import './Checkout.css'
import { CloseOutlined, UserOutlined } from '@ant-design/icons'
import { CHANGE_TAB_ACTIVE, CHUYEN_TAB, DAT_VE } from '../../redux/actions/types/QuanLyDatVeType';
import _ from 'lodash';
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe';
import { Tabs } from 'antd';
import { NavLink } from 'react-router-dom';
import { layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';
import moment from 'moment';






function Checkout(props) {

  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

  const { chiTietPhongVe, danhSachGheDangDat } = useSelector(state => state.QuanLyDatVeReducer);

  const dispatch = useDispatch();

  console.log({ chiTietPhongVe })

  useEffect(() => {
    //Goi ham tao ra 1 async function
    const action = layChiTietPhongVeAction(props.match.params.id);
    //Dispatch function nay di
    dispatch(action)
  }, [])

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



      return <Fragment key={index}>
        <button onClick={() => {
          dispatch({
            type: DAT_VE,
            gheDuocChon: ghe
          })
        }} disabled={ghe.daDat} className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat}`}
          key={index}>
          <img src={seat} alt="" />
          {ghe.daDat ? classGheDaDuocDat != '' ? <UserOutlined /> : <CloseOutlined /> : ghe.stt}

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
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='text-center'><button className="p-2"><img style={{ width: '30px' }} src={seat} alt="" /></button></td>
                  <td className='text-center'><button className="gheDangDat"><img style={{ width: '30px' }} src={seat} alt="" /></button></td>
                  <td className='text-center'><button className="gheVip"><img style={{ width: '30px' }} src={seat} alt="" /></button></td>
                  <td className='text-center'><button className="gheDaDat"><img style={{ width: '30px' }} src={seat} alt="" /></button></td>
                  <td className='text-center'><button className="gheDaDuocDat"><img style={{ width: '30px' }} src={seat} alt="" /></button></td>
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

  const { tabActive } = useSelector(state => state.QuanLyDatVeReducer)
  const dispatch = useDispatch();
  console.log({ tabActive })
  return <div className="p-5" style={{ backgroundColor: '#001232' }}>
    <NavLink to="/"><img style={{ width: '180px', paddingTop: '10px' }} src={logo} alt="123" /></NavLink>
    <Tabs defaultActiveKey="1" activeKey={tabActive} onChange={(key) => {
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
                  <h6 className='text-white'>Số ĐT: 0123456789{thongTinNguoiDung.soDT}</h6>
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















