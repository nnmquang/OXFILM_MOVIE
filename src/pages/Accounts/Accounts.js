import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Table } from 'antd';
import './../../templates/AccountTemplates/AccountTemplates.css'
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachTaiKhoanAction, layThongTinCapNhatACCAction, timKiemNguoiDungAction, xoaTaiKhoanAction } from '../../redux/actions/QuanLyNguoiDungAction';
import { GROUPID } from '../../util/settings/config';
import { NavLink } from 'react-router-dom';
import { AudioOutlined ,SearchOutlined, EditOutlined, DeleteOutlined, CalendarOutlined} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { Input, Space } from 'antd';
import { AutoComplete, Button, Popconfirm} from "antd";


const { Search } = Input;

export default function Accounts(props) {
  console.log({props})
  const history = useHistory();
    const {danhSachTaiKhoan} = useSelector(state=>state.QuanLyNguoiDungReducer);
    const {danhSachSearch} = useSelector(state=> state.QuanLyNguoiDungReducer)
    const [value, setValue] = useState("");
    const searchRef = useRef(null);
console.log({danhSachSearch})
    
    const dispatch = useDispatch()


    console.log({danhSachTaiKhoan})
    useEffect(()=>{
        dispatch(layDanhSachTaiKhoanAction())
    },[])

    const columns = [
      // {
      //   title: 'STT',
      //   key: 'index',
      //   render : (value, item, index) => index,
      //   sorter: (a, b) => a.index - b.index,
      //   sortDirections: ['descend','ascend'],
      //   width: '5%',
      // },
        {
          title: 'Tài khoản',
          dataIndex: 'taiKhoan',
          width: '15%',
          sorter:(a,b) => {
            let taiKhoanA = a.taiKhoan.toLowerCase().trim();
            let taiKhoanB = b.taiKhoan.toLowerCase().trim();
            if(taiKhoanA > taiKhoanB) {
                return 1;
            }
            return -1;
        },
          sortDirections: ['descend','ascend'],
        },
        {
          title: 'Mật khẩu',
          dataIndex: 'matKhau',
          width: '15%',
        },
        {
          title: 'Họ tên',
          dataIndex: 'hoTen',
          // sorter: (a, b) => a.hoTen - b.hoTen,
          // sortDirections: ['descend','ascend'],
          width: '15%',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          width: '20%',
        },
        {
          title: 'Số ĐT',
          dataIndex: 'soDt',
          width: '10%',
        },
        {
          title: 'Thao tác',
          dataIndex: 'address',
          render : (text,account) => {
            return <Fragment>
              <NavLink key={1} to={`/account/acc/editacc/${account.taiKhoan}`} className=" text-blue-500 mr-2 p-2 border border-emerald-400 rounded hover:bg-emerald-200  "><EditOutlined/></NavLink>
              <span style={{cursor:'pointer'}} key={2} to="/" className=" text-blue-500 mr-2 p-2 border border-fuchsia-500 rounded hover:bg-fuchsia-200 " onClick={()=>{
                  //Gọi action xoá
                if(window.confirm('Bạn có muốn xoá tài khoản ' + account.taiKhoan)) {
                  //Gọi action 
                  dispatch(xoaTaiKhoanAction(account.taiKhoan))
                }

              }}><DeleteOutlined/></span>
            </Fragment>
          },
          width: '20%',
        },
      ];
    
    const data = danhSachTaiKhoan;
    
    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

  //   const onSearch = value => {
  //     console.log(value);
  //     //Gọi api lấy danh sách phim video-70 search film
  //     dispatch(layDanhSachTaiKhoanAction(value))
  // }


    return (
        <div >
            <h3 className="text-2xl text-gray-200">Tài khoản</h3>
            <button className="content-button mb-2" onClick={()=>{
              history.push('/account/acc/addacc')
            }}>Thêm người dùng</button>
            {/* <div className="search-bar">
                <input type="text" placeholder="Search" />
            </div> */}
            {/* <Search
            className="mb-5"
                placeholder="input search text"
                // enterButton="Search"
                enterButton={<SearchOutlined />}
                size="large"
                // suffix={suffix}
                onSearch={onSearch}
            /> */}

<AutoComplete
        className="mb-5 w-25"
        placeholder="Nhập vào tài khoản người dùng cần tìm"
        value={value}
        onChange={(text) => {
          setValue(text);
        }}
        options={danhSachSearch?.map((user, index) => {
          return {
            key: index,
            label: user.taiKhoan,
            value: user.taiKhoan,
          };
        })}
        onSelect={(valueSelect, option) => {
          setValue(option.label);
          dispatch(timKiemNguoiDungAction(valueSelect));
        }}
        onSearch={(value) => {
          if (searchRef.current) {
            clearTimeout(searchRef.current);
          }
          searchRef.current = setTimeout(() => {
            if (value === "") {
              dispatch(layDanhSachTaiKhoanAction());
            } else {
              dispatch(timKiemNguoiDungAction(value));
            }
          }, 800);
        }}
        style={{ width: "100%", height: 40 }}
      />

            <Table columns={columns} dataSource={data} onChange={onChange} rowKey={"taiKhoan"}/>
        </div>
    )
}
