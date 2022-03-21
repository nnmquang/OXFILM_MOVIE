import { connection } from "../../index";
import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { displayLoadingAction, hideLoadingAction } from "./LoadingActions";
import { CHUYEN_TAB, DAT_VE, DAT_VE_HOAN_TAT, SET_CHI_TIET_PHONG_VE } from "./types/QuanLyDatVeType";



export const layChiTietPhongVeAction = (maLichChieu) => {


    return async dispatch => {
        try {
            const result = await quanLyDatVeService.layChiTietPhongVe(maLichChieu);

            console.log('result',result)
            if(result.status === 200) {
                dispatch({
                    type:SET_CHI_TIET_PHONG_VE,
                    chiTietPhongVe:result.data.content
                })
            }

        }catch(error) {
            console.log('error',error)
            console.log('error',error.response?.data)
        }
    }
}

export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {

    return async (dispatch,getState) => {
        try {

            dispatch(displayLoadingAction)

            const result = await quanLyDatVeService.datVe(thongTinDatVe);
            console.log('result',result.data.content)
            //Đặt vé thành công gọi api load lại phòng vé
            await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu))
            await dispatch ({type:DAT_VE_HOAN_TAT});
            await dispatch(hideLoadingAction);
            
            //Video 60 realtime
            let userLogin = getState().QuanLyNguoiDungReducer.userLogin;
             connection.invoke('datGheThanhCong', userLogin.taiKhoan,thongTinDatVe.maLichChieu);

            dispatch({type:CHUYEN_TAB})

        }catch(error) {
            dispatch(displayLoadingAction)

            console.log('error',error)
            console.log('error',error.response?.data)
        }
    }
}

export const datGheAction = (ghe,maLichChieu) => {

    //Để lấy thông tin này từ 1 action  file riêng, thì chúng ta ko lây đươc do ko có sự kiện useSelector 
    // => Nhưng do chúng ta sử dụng redux thunk nên chúng ta còn 1 tham số getState (ở tham số thứ 2)
    //Để giúp ta lấy dữ liệu từ những store khác thông qua getState
    return async (dispatch,getState) => {

        //Đưa thông tin ghế lên reducer
        await dispatch({
            type: DAT_VE,
            gheDuocChon: ghe
        })

        //Call api về backend
        let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;
        let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan;
        
        console.log({danhSachGheDangDat});
        console.log({taiKhoan});
        console.log({maLichChieu});
        //Biến mảng thành chuỗi
        danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);

        //Call api
        connection.invoke('datGhe',taiKhoan,danhSachGheDangDat,maLichChieu); // lấy từ backend


    }
}