
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';
import './Profile.css'
import moment from 'moment';
import _ from 'lodash';


export default function Historybook() {

    const dispatch = useDispatch();

    const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);

    console.log({ thongTinNguoiDung })

    useEffect(() => {
        const action = layThongTinNguoiDungAction()
        dispatch(action)
    }, [])

    const renderHistorybook = () => {
        return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
            const seats = _.first(ticket.danhSachGhe)

            return <>
                <div key={index} >
                    <img src={ticket.hinhAnh} alt="123" className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full flex-shrink-0" />
                </div>
                <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                    <h2 className="text-white text-lg title-font font-medium mb-2">{(ticket.tenPhim).toUpperCase()}</h2>
                    <h6 className="text-white">Thời lượng: {ticket.thoiLuongPhim} phút</h6>
                    <h6 className="text-white">Giờ chiếu: {moment(ticket.ngayDat).format('hh:mm A')} - Ngày chiếu {moment(ticket.ngayDat).format('DD-MM-YYYY')}</h6>
                    <h6 className="text-white">{seats.tenHeThongRap}</h6>
                    <h6 className="text-white">
                        Tên rạp: {seats.tenCumRap} - Ghế {ticket.danhSachGhe.map((ghe, index) => { return <span key={index} className="m-1">[{ghe.tenGhe}]</span> })}
                    </h6>
                    
                </div>
            </>
        })
    }

    return (
        <div className='historybook'>
            <section className="text-gray-600 body-font">
                <div className="container px-3 py-24 mx-auto">
                    <div className="flex items-center  mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
                        {renderHistorybook()}
                    </div>
                </div>
            </section>

        </div>
    )
}
