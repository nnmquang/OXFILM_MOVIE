import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { capNhatThongTinNguoiDungAction, capNhatThongTinTaiKhoanAction, layDanhSachLoaiNguoiDungAction, layDanhSachTaiKhoanAction, layThongTinCapNhatACCAction, themNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import logo from '../../../assets/logofilm/Oxfilm.png'
import { NavLink } from 'react-router-dom';
import { GROUPID } from '../../../util/settings/config';
import { Input, Space } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

export default function EditAcc(props) {
    
    let { taiKhoan } = props.match.params

    console.log({ props })
    const dispatch = useDispatch();
    const { thongTinCapNhat } = useSelector(state => state.QuanLyNguoiDungReducer);
    console.log({ thongTinCapNhat })
    const { thongTinLoaiNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);

    const converSelectLND = () => {
        return thongTinLoaiNguoiDung?.map((lnd, index)=> {
            return <option value={lnd.maLoaiNguoiDung} key={index}>{lnd.tenLoai}</option>
        })
    }

    useEffect(() => {
        // dispatch(layThongTinCapNhatACCAction(taiKhoan))
        dispatch(layDanhSachTaiKhoanAction(taiKhoan))
        dispatch(layDanhSachLoaiNguoiDungAction())
    }, [dispatch,taiKhoan])


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: thongTinCapNhat?.taiKhoan,
            matKhau: thongTinCapNhat?.matKhau,
            email: thongTinCapNhat?.email,
            soDt: thongTinCapNhat?.soDt,
            maNhom: GROUPID,
            hoTen: thongTinCapNhat?.hoTen,
            maLoaiNguoiDung: thongTinCapNhat?.maLoaiNguoiDung,
        },
        onSubmit: values => {
            values.maNhom = GROUPID;
            console.log('values', values)
            dispatch(capNhatThongTinTaiKhoanAction(values))
        }
    })

    // const renderInput = () => {
    //     return thongTinCapNhat?.map((data,index)=>{
    //         return <>
    //         <input style={{ backgroundColor: '#14162b' }} type="text" className="block  w-96 p-3 rounded mb-4" name="taiKhoan" onChange={formik.handleChange}  placeholder="T??i kho???n" value={data.taiKhoan} />
    //         <input style={{ backgroundColor: '#14162b' }} type="text" className="block  w-96 p-3 rounded mb-4" name="matKhau" onChange={formik.handleChange} placeholder="M???t kh???u" value={data.matKhau} />
    //         <input style={{ backgroundColor: '#14162b' }} type="text" className="block  w-96 p-3 rounded mb-4" name="hoTen" onChange={formik.handleChange} placeholder="H??? t??n" value={data.hoTen} />
    //         <input style={{ backgroundColor: '#14162b' }} type="text" className="block  w-96 p-3 rounded mb-4" name="email" onChange={formik.handleChange} placeholder="Email" value={data.email} />
    //         <input style={{ backgroundColor: '#14162b' }} type="text" className="block  w-96 p-3 rounded mb-4" name="soDt" onChange={formik.handleChange} placeholder="S??? ??i???n tho???i" value={data.soDt} />
    //         <select style={{ backgroundColor: '#14162b' }} type="text" className="block  w-96 p-3 rounded mb-4" placeholder="Ch???n h??? th???ng r???p" onChange={formik.handleChange} name="maLoaiNguoiDung" >
    //             <option value='' disabled selected>Ch???n lo???i kh??ch h??ng</option>
    //             {converSelectLND()}
    //             {/* <option>{data.maLoaiNguoiDung}</option>
    //                 <option>Qu???n tr???</option> */}
    //         </select>
    //         </>
    //     })
    // }

    return (
        <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -mx-4 -mb-10">
                <div className="sm:w-1/2 mb-10 px-4">
                <form onSubmit={formik.handleSubmit}>
                    <h1 className="text-white text-3xl">Th??ng tin t??i kho???n</h1>
                    <div className='mt-5'>
                        <h1 className='text-white'>T??i kho???n</h1>
                        <input disabled style={{ backgroundColor: '#14162b', opacity:"0.5"}} type="text" 
                        className="block  w-96 p-3 rounded mb-4" 
                        name="taiKhoan" 
                        onChange={formik.handleChange} 
                        placeholder="T??i kho???n" 
                        value={formik.values.taiKhoan} />
                        
                        <h1 className='text-white'>M???t kh???u</h1>
                        <input style={{ backgroundColor: '#14162b' }} type="text" 
                        className="block  w-96 p-3 rounded mb-4" 
                        name="matKhau" onChange={formik.handleChange} 
                        placeholder="M???t kh???u" 
                        value={formik.values.matKhau} />

                        <h1 className='text-white'>H??? t??n</h1>
                        <input style={{ backgroundColor: '#14162b' }} type="text" 
                        className="block  w-96 p-3 rounded mb-4"
                        name="hoTen" 
                        onChange={formik.handleChange} 
                        placeholder="H??? t??n" 
                        value={formik.values.hoTen} />

                         <h1 className='text-white'>Email</h1>
                        <input style={{ backgroundColor: '#14162b' }} type="text" 
                        className="block  w-96 p-3 rounded mb-4" 
                        name="email" 
                        onChange={formik.handleChange} 
                        placeholder="Email" 
                        value={formik.values.email} />

                         <h1 className='text-white'>S??? ??T</h1>
                        <input style={{ backgroundColor: '#14162b' }} type="text" 
                        className="block  w-96 p-3 rounded mb-4" 
                        name="soDt" 
                        onChange={formik.handleChange} 
                        placeholder="S??? ??i???n tho???i" 
                        value={formik.values.soDt} /> 

                         <h1 className='text-white'>Lo???i t??i kho???n</h1>
                        <select style={{ backgroundColor: '#14162b' }} type="text" 
                        className="block  w-96 p-3 rounded mb-4" 
                        placeholder="Ch???n h??? th???ng r???p" 
                        onChange={formik.handleChange} 
                        name="maLoaiNguoiDung"
                        value={formik.values.maLoaiNguoiDung} >
                            {/* <option value="" disabled selected>Ch???n lo???i kh??ch h??ng</option>  */}
                            {converSelectLND()}
                             {/* <option>Kh??ch h??ng</option>
                                <option>Qu???n tr???</option> */}
                         </select>
                        <div className='flex justify-center'>
                            <button type="submit" className="inline-flex text-white bg-blue-600 border-0 py-2 px-6 focus:outline-none hover:bg-blue-800 rounded text-lg">C???p nh???t</button>
                        </div>
                    </div>
                </form>

            </div>
            <div className="sm:w-1/2 mb-10 px-4 mt-16">
                <div className="content-wrapper-header">
                    <div className="content-wrapper-context ">
                        <h3 className="img-content">
                            <img style={{ width: '80px' }} src={logo} alt="123" className="bg-black py-2 px-1 rounded-md"/>
                            {/* <svg viewBox="0 0 512 512">
                                    <path d="M467 0H45C20.099 0 0 20.099 0 45v422c0 24.901 20.099 45 45 45h422c24.901 0 45-20.099 45-45V45c0-24.901-20.099-45-45-45z" fill="#d6355b" data-original="#ff468c" />
                                    <path xmlns="http://www.w3.org/2000/svg" d="M512 45v422c0 24.901-20.099 45-45 45H256V0h211c24.901 0 45 20.099 45 45z" fill="#d6355b" data-original="#d72878" />
                                    <path xmlns="http://www.w3.org/2000/svg" d="M467 30H45c-8.401 0-15 6.599-15 15v422c0 8.401 6.599 15 15 15h422c8.401 0 15-6.599 15-15V45c0-8.401-6.599-15-15-15z" fill="#2e000a" data-original="#700029" />
                                    <path xmlns="http://www.w3.org/2000/svg" d="M482 45v422c0 8.401-6.599 15-15 15H256V30h211c8.401 0 15 6.599 15 15z" fill="#2e000a" data-original="#4d0e06" />
                                    <path xmlns="http://www.w3.org/2000/svg" d="M181 391c-41.353 0-75-33.647-75-75 0-8.291 6.709-15 15-15s15 6.709 15 15c0 24.814 20.186 45 45 45s45-20.186 45-45-20.186-45-45-45c-41.353 0-75-33.647-75-75s33.647-75 75-75 75 33.647 75 75c0 8.291-6.709 15-15 15s-15-6.709-15-15c0-24.814-20.186-45-45-45s-45 20.186-45 45 20.186 45 45 45c41.353 0 75 33.647 75 75s-33.647 75-75 75z" fill="#d6355b" data-original="#ff468c" />
                                    <path xmlns="http://www.w3.org/2000/svg" d="M391 361h-30c-8.276 0-15-6.724-15-15V211h45c8.291 0 15-6.709 15-15s-6.709-15-15-15h-45v-45c0-8.291-6.709-15-15-15s-15 6.709-15 15v45h-15c-8.291 0-15 6.709-15 15s6.709 15 15 15h15v135c0 24.814 20.186 45 45 45h30c8.291 0 15-6.709 15-15s-6.709-15-15-15z" fill="#d6355b" data-original="#d72878" />
                                </svg> */}
                            Cinema Movie
                        </h3>
                        <div className="content-text">TH??? GI???I PHIM HAY NGAY TRONG T???M TAY.</div>
                        <NavLink to="/"><button className="content-button">Trang ch???</button></NavLink>
                    </div>
                    <img className="content-wrapper-img" src="https://assets.codepen.io/3364143/glass.png" alt="123" />
                </div>

            </div>
        </div>
        </div >

    )



}



