import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatThongTinCaNhanAction, layDanhSachLoaiNguoiDungAction, layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';
import { GROUPID } from '../../util/settings/config';
import './Profile.css'

export default function ThongTinCaNhan(props) {
    const { thongTinLoaiNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);

    const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer)
    const dispatch = useDispatch()
    console.log({ thongTinNguoiDung })

    const converSelectLND = () => {
        return thongTinLoaiNguoiDung?.map((lnd, index) => {
            return <option key={index} value={lnd.maLoaiNguoiDung}>{lnd.tenLoai}</option>
        })
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: thongTinNguoiDung?.taiKhoan,
            hoTen: thongTinNguoiDung?.hoTen,
            soDT: thongTinNguoiDung?.soDT,
            email: thongTinNguoiDung?.email,
            matKhau: thongTinNguoiDung?.matKhau,
            maNhom: GROUPID,
            maLoaiNguoiDung: thongTinLoaiNguoiDung?.maLoaiNguoiDung,

        },
        onSubmit: values => {
            values.maNhom = GROUPID;
            alert(JSON.stringify(values, null, 2));
            console.log({ values })
            dispatch(capNhatThongTinCaNhanAction(values))
        },
    });

    useEffect(() => {
        dispatch(layThongTinNguoiDungAction())
        dispatch(layDanhSachLoaiNguoiDungAction())
    }, [])
    return (
        <div className='container'>
            <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md caNhan">
                <form onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-group mb-6">
                            <h1 className='text-white'>Tài khoản</h1>
                            <input disabled name="taiKhoan" type="text" onChange={formik.handleChange} value={formik.values.taiKhoan}
                                className="form-control
     block
     w-full
     px-3
     py-1.5
     text-base
     font-normal
     text-gray-700
     bg-gray-300 bg-clip-padding
     border border-solid border-gray-300
     rounded
     transition
     ease-in-out
     m-0
     focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput123" aria-describedby="emailHelp123" placeholder="Tài khoản" />
                        </div>
                        <div className="form-group mb-6">
                            <h1 className='text-white'>Họ tên</h1>
                            <input name="hoTen" type="text" onChange={formik.handleChange} value={formik.values.hoTen}
                                className="form-control
     block
     w-full
     px-3
     py-1.5
     text-base
     font-normal
     text-gray-700
     bg-white bg-clip-padding
     border border-solid border-gray-300
     rounded
     transition
     ease-in-out
     m-0
     focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput124" aria-describedby="emailHelp124" placeholder="Tên" />
                        </div>
                    </div>
                    <div className="form-group mb-6">
                        <h1 className='text-white'>Số ĐT</h1>
                        <input name="soDT" type="text" onChange={formik.handleChange} value={formik.values.soDT}
                            className="form-control block
   w-full
   px-3
   py-1.5
   text-base
   font-normal
   text-gray-700
   bg-white bg-clip-padding
   border border-solid border-gray-300
   rounded
   transition
   ease-in-out
   m-0
   focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput125" placeholder="Số ĐT" />
                    </div>
                    <div className="form-group mb-6">
                        <h1 className='text-white'>Email</h1>
                        <input name="email" type="email" onChange={formik.handleChange} value={formik.values.email}
                            className="form-control block
   w-full
   px-3
   py-1.5
   text-base
   font-normal
   text-gray-700
   bg-white bg-clip-padding
   border border-solid border-gray-300
   rounded
   transition
   ease-in-out
   m-0
   focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput125" placeholder="Email" />
                    </div>
                    <div className="form-group mb-6">
                        <h1 className='text-white'>Mật khẩu</h1>
                        <input name="matKhau" type="text" onChange={formik.handleChange} value={formik.values.matKhau}
                            className="form-control block
   w-full
   px-3
   py-1.5
   text-base
   font-normal
   text-gray-700
   bg-white bg-clip-padding
   border border-solid border-gray-300
   rounded
   transition
   ease-in-out
   m-0
   focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput126" placeholder="Mật khẩu" />
                    </div>
                    <div className="form-group mb-6">
                        <h1 className='text-white'>Loại khách hàng</h1>
                        <select type="text" className=" w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding rounded mb-4 border border-solid border-gray-300" placeholder="Chọn hệ thống rạp" onChange={formik.handleChange} name="maLoaiNguoiDung" >
                            <option value="" disabled selected>Chọn loại khách hàng</option>
                            {converSelectLND()}
                            {/* <option>Khách hàng</option>
                                <option>Quản trị</option> */}
                        </select>

                    </div>

                    {/* <div className="form-group form-check text-center mb-6">
           <input type="checkbox" className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer" id="exampleCheck25" defaultChecked />
           <label className="form-check-label inline-block text-gray-800" htmlFor="exampleCheck25">Subscribe to our newsletter</label>
         </div> */}
                    <button type="submit" className="
 w-full
 px-6
 py-2.5
 bg-blue-600
 text-white
 font-medium
 text-xs
 leading-tight
 uppercase
 rounded
 shadow-md
 hover:bg-blue-700 hover:shadow-lg
 focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
 active:bg-blue-800 active:shadow-lg
 transition
 duration-150
 ease-in-out">Cập nhật</button>

                </form>
            </div>


        </div>

    );
};