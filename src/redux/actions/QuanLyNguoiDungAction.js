/* eslint-disable no-lone-blocks */
import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService"
import { DANG_KY_ACTION, DANG_NHAP_ACTION, LAY_DANH_SACH_NGUOI_DUNG_KEYWORD, SET_CAP_NHAT_THONG_TIN, SET_CAP_NHAT_THONG_TIN_CA_NHAN, SET_CAP_NHAT_THONG_TIN_TAI_KHOAN, SET_LOAI_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG, SET_THONG_TIN_TAI_KHOAN, THEM_NGUOI_DUNG } from "./types/QuanLyNguoiDungType";
import { history } from "../../App";
import { createBrowserHistory } from 'history';

export const dangNhapAction = (thongTinDangNhap) => {


    return async (dispatch) => {

        try {
            const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);

            if (result.data.statusCode === 200) {
                dispatch({
                    type: DANG_NHAP_ACTION,
                    thongTinDangNhap: result.data.content
                });
            }
            history.goBack();
            console.log('result', result)


        } catch (error) {
            console.log('error', error.response.data)
        }

    }
}


export const layThongTinNguoiDungAction = () => {


    return async (dispatch) => {

        try {
            const result = await quanLyNguoiDungService.layThongTinNguoiDung();

            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung: result.data.content
                });
            }



        } catch (error) {
            console.log('error', error.response.data)
        }

    }
}

export const dangKyAction = (thongTinDangKy) => {
    return async (dispatch) => {

        try {
            const result = await quanLyNguoiDungService.dangKy(thongTinDangKy);

            if (result.data.statusCode === 200) {
                dispatch({
                    type: DANG_KY_ACTION,
                    thongTinDangKy: result.data.content
                });
            }
            alert('Đăng ký thành công')
            // history.goBack();
            // history.push('/home');
            createBrowserHistory().push('/home');
            window.location.reload();
            console.log('result', result)


        } catch (error) {
            console.log('error', error.response.data)
        }

    }
}

export const layDanhSachTaiKhoanAction = (tuKhoa = '') => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layDanhSachTaiKhoan(tuKhoa);

            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_THONG_TIN_TAI_KHOAN,
                    danhSachTaiKhoan: result.data.content
                });
            }
        } catch (error) {
            console.log('error', error.response.data)
        }
    }
}

export const timKiemNguoiDungAction = (keyWord) => {
    return async (dispatch) => {
      try {
        const result = await quanLyNguoiDungService.timKiemNguoiDung(keyWord);
        if (result.data.statusCode === 200) {
          dispatch({
            type: LAY_DANH_SACH_NGUOI_DUNG_KEYWORD,
            danhSachSearch: result.data.content,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };
  

export const themNguoiDungAction = (thongTinThemNguoiDung) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.themNguoiDung(thongTinThemNguoiDung);

            if (result.data.statusCode === 200) {
                dispatch({
                    type: THEM_NGUOI_DUNG,
                    thongTinThemNguoiDung: result.data.content
                });
            }
            alert('Thêm người dùng thành công')
            // history.goBack();
            // history.push('/home');
            createBrowserHistory().push('/account/acc');
            window.location.reload();

            console.log('result', result)
        } catch (error) {
            console.log('error', error.response.data)
        }
    }
}


export const layDanhSachLoaiNguoiDungAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layDanhSachLoaiNguoiDung();
            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_LOAI_NGUOI_DUNG,
                    thongTinLoaiNguoiDung: result.data.content
                });
            }

        } catch (error) {
            console.log('error', error.response.data)
        }
    }
}

// export const capNhatThongTinNguoiDungAction = (taiKhoan='') => {
//     return async(dispatch) => {
//         try {
//             const result = await quanLyNguoiDungService.capNhatThongTinNguoiDung(taiKhoan);
//             if(result.data.statusCode === 200) {
//                 dispatch({
//                     type:SET_CAP_NHAT_THONG_TIN,
//                     thongTinCapNhat: result.data.content
//                 });
//             }
//             console.log(result.data.content)
//         }catch(error) {
//             console.log('error', error.response.data)
//         }
// }
// }

export const layThongTinCapNhatACCAction = (taiKhoan) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layThongTinCapNhatACC(taiKhoan);
            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_CAP_NHAT_THONG_TIN,
                    thongTinCapNhat: result.data.content
                });
            }
            console.log('result',result.data.content)

        } catch (error) {
            console.log('error', error.response.data)
        }
    }
}


export const capNhatThongTinCaNhanAction = (thongTinCaNhan) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.capNhatThongTinCaNhan(thongTinCaNhan)
            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_CAP_NHAT_THONG_TIN_CA_NHAN,
                    thongTinCaNhan: result.data.content
                });
            }
            alert('Cập nhật thông tin thành công')
            console.log({ result })
        } catch (error) {
            console.log('error', error.response.data)
        }
    }
}


export const xoaTaiKhoanAction = (taiKhoan) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.xoaTaiKhoan(taiKhoan)
           

            alert('Xoá tài khoản thành công !')
            console.log( 'result', result.data.content)
            //Sau khi xoá tài khoản load lại danh sách tài khoản mới
            dispatch(layDanhSachTaiKhoanAction())

        } catch (error) {
            console.log('error', error.response.data)
        }
    }
}


export const capNhatThongTinTaiKhoanAction = (thongTinTaiKhoan) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.capNhatThongTinTaiKhoan(thongTinTaiKhoan)
            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_CAP_NHAT_THONG_TIN_TAI_KHOAN,
                    thongTinTaiKhoan: result.data.content
                });
            }
            alert('Cập nhật thông tin thành công')
            console.log({ result })
        } catch (error) {
            console.log('error', error.response.data)
        }
    }
}