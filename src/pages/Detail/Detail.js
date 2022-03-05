import React, { useEffect, useState } from 'react'
import { CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import '../../assets/styles/circle.css'
import { Tabs, Radio, Space, } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CHI_TIET_PHIM } from '../../redux/actions/types/QuanLyRapType';
import { layThongTinChiTietPhim } from '../../redux/actions/QuanLyRapActions';
import moment from 'moment';
import { StarOutlined } from '@ant-design/icons'
import { Rate } from 'antd';
import { NavLink } from 'react-router-dom';
import Comments from './Comments';


const { TabPane } = Tabs;

export default function Detail(props) {

    const filmDetail = useSelector(state => state.QuanLyPhimReducer.filmDetail)

    console.log({ filmDetail })

    const dispatch = useDispatch();

    useEffect(() => {
        //Lấy thông tin param từ url (id phim)
        let { id } = props.match.params;
        console.log('id', id)

        dispatch(layThongTinChiTietPhim(id))

    }, [])

    return (
        <div style={{ backgroundImage: `url(${filmDetail.hinhAnh})`, backgroundSize: '100%', backgroundPosition: 'center', minHeight: '100vh' }}>
            <CustomCard
                style={{ paddingTop: 150, minHeight: '100vh' }}
                effectColor="#fff" // required
                color="#fff" // default color is white
                blur={10} // default blur value is 10px
                borderRadius={0} // default border radius value is 10px
            >
                <div className="grid grid-cols-12 ml-14">
                    <div className="col-span-5 col-start-3">
                        <div className="grid grid-cols-3">
                            <img className="col-span-1" src={filmDetail.hinhAnh} style={{ width: '100%', height: 300 }} alt="123" />
                            <div className="col-span-2 ml-5" style={{ marginTop: '10%' }}>
                                <p className="text-sm">Ngày chiếu: {moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
                                <p className="text-2xl leading-2">{filmDetail.tenPhim?.toUpperCase()}</p>
                                {/* <p>{filmDetail.moTa.length > 100 ? <span>{filmDetail.moTa?.slice(0, 200)} ...</span> : <span>{filmDetail.moTa}</span>}</p> */}
                                {/* <p className="text-2xl leading-2">{filmDetail.tenPhim}</p> */}
                                <p>{filmDetail.moTa}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 ml-20">
                        <h1 style={{ marginLeft: '24%', color: 'yellow', fontWeight: 'bold', fontSize: 15 }}>Đánh giá</h1>
                        <h1 style={{ marginLeft: '15%' }} className="text-green-400 text-2xl"><Rate allowHalf value={filmDetail.danhGia / 2} /></h1>
                        <div className={`c100 p${filmDetail.danhGia * 10} big green`}>
                            <span className="text-white">{filmDetail.danhGia * 10}%</span>
                            <div className="slice">
                                <div className="bar"></div>
                                <div className="fill"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-20 ml-64 w-2/3 container bg-white px-5 py-5">
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane tab="Lịch chiếu" key="1" style={{ minHeight: 300 }}>
                            <div>
                                <Tabs tabPosition={'left'}>
                                    {filmDetail.heThongRapChieu?.map((htr, index) => {
                                        return <TabPane
                                            tab={<div className='flex flex-row items-center justify-center'>
                                                <img src={htr.logo} alt="123" className="rounded-full w-full" style={{ width: 50 }} />
                                                <div className='text-center ml-2'>
                                                    {htr.tenHeThongRap}
                                                </div>
                                            </div>}
                                            key={index}>

                                            {htr.cumRapChieu?.map((cumRap, index) => {
                                                return <div className='mt-5' key={index}>
                                                    <div className='flex flex-row'>
                                                        <img style={{ width: 60, height: 60 }} src={cumRap.hinhAnh} alt="cumRap.hinhAnh" />
                                                        <div className='ml-2'>
                                                            <p style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 1 }}>{cumRap.tenCumRap}</p>
                                                            <p className='text-gray-400' style={{ marginTop: 0 }}>{cumRap.diaChi}</p>
                                                        </div>
                                                    </div>
                                                    <div className="thong-tin-lich-chieu grid grid-cols-4">
                                                        {cumRap.lichChieuPhim?.slice(0, 12).map((lichChieu, index) => {
                                                            return <NavLink to={`/checkout/${lichChieu.maLichChieu}`} key={index} className="col-span-1 text-orange-500 font-bold">
                                                                {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                            </NavLink>
                                                        })}
                                                    </div>
                                                </div>
                                            })}

                                        </TabPane>
                                    })}
                                </Tabs>
                            </div>
                        </TabPane>

                        <TabPane tab="Thông tin" key="2">
                            <div className='flex flex-row'>
                                <img src={filmDetail.hinhAnh} alt="filmDetail.hinhAnh" style={{ width: '30%', height: 300 }} />
                                <div className='ml-5'>
                                    <p className='text-2xl'>{filmDetail.tenPhim?.toUpperCase()}</p>
                                    <p>Mã phim: {filmDetail.maPhim}</p>
                                </div>
                            </div>
                            <p className='mt-5'>{filmDetail.moTa}</p>
                            <p>Năm sản xuất : 2022</p>
                            <p>Đạo diễn: Holywood</p>
                        </TabPane>

                        <TabPane tab="Đánh giá" key="3">
                            <Comments/>
                        </TabPane>
                    </Tabs>
                </div>



            </CustomCard>


        </div>
    )
}
