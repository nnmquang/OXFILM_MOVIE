import { TOKEN, USER_LOGIN, USER_SIGNUP } from "../../util/settings/config";
import { DANG_KY_ACTION, DANG_NHAP_ACTION, LAY_DANH_SACH_NGUOI_DUNG_KEYWORD, SET_CAP_NHAT_THONG_TIN, SET_CAP_NHAT_THONG_TIN_CA_NHAN, SET_CAP_NHAT_THONG_TIN_TAI_KHOAN, SET_LOAI_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG, SET_THONG_TIN_TAI_KHOAN, THEM_NGUOI_DUNG } from "../actions/types/QuanLyNguoiDungType"

let user = {}; //lấy thông tin này làm mặc định để khi quay lại thì thông tin này vẫn nằm trên máy
if(localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN))
}

// let userSignup = {}; //lấy thông tin này làm mặc định để khi quay lại thì thông tin này vẫn nằm trên máy
// if(localStorage.getItem(USER_SIGNUP)) {
//     user = JSON.parse(localStorage.getItem(USER_SIGNUP))
// }

const initialState = {
    userLogin: user,
    thongTinNguoiDung: {},
    // userSignUp: userSignup,
    danhSachTaiKhoan: [],
    danhSachSearch:[],
    thongTinLoaiNguoiDung: [],
    thongTinCapNhat:[],
    thongTinCaNhan: {},
    thongTinTaiKhoan:{}

}

export const QuanLyNguoiDungReducer = (state = initialState, action) => {
  switch (action.type) {

    case DANG_NHAP_ACTION : {
        const {thongTinDangNhap} = action;
        localStorage.setItem(USER_LOGIN,JSON.stringify(thongTinDangNhap));//lưu lại thông tin đăng nhập này sau khi biến nó thành chuỗi stringify
        localStorage.setItem(TOKEN,thongTinDangNhap.accessToken)
        return {...state,userLogin:thongTinDangNhap}
    }
 
    case SET_THONG_TIN_NGUOI_DUNG : {
      state.thongTinNguoiDung = action.thongTinNguoiDung;
      return {...state};
    }

    case DANG_KY_ACTION : {
      // const {thongTinDangKy} = action;
      // localStorage.setItem(USER_SIGNUP,JSON.stringify(thongTinDangKy));//lưu lại thông tin đăng nhập này sau khi biến nó thành chuỗi stringify
      // localStorage.setItem(TOKEN,thongTinDangKy.accessToken)
      // return {...state,userSignUp:thongTinDangKy}
      
      const {thongTinDangKy} = action;
        localStorage.setItem(USER_LOGIN,JSON.stringify(thongTinDangKy));//lưu lại thông tin đăng nhập này sau khi biến nó thành chuỗi stringify
        localStorage.setItem(TOKEN,thongTinDangKy.accessToken)
        return {...state,userLogin:thongTinDangKy}
  }

    case SET_THONG_TIN_TAI_KHOAN : {
      state.danhSachTaiKhoan = action.danhSachTaiKhoan;
      state.thongTinCapNhat = state.danhSachTaiKhoan[0];

      return {...state};
    }

    case THEM_NGUOI_DUNG : {
        state.thongTinThemNguoiDung = action.thongTinThemNguoiDung;
        return {...state};
    }

    case SET_LOAI_NGUOI_DUNG : {
        state.thongTinLoaiNguoiDung = action.thongTinLoaiNguoiDung;
        return {...state};
    }

    case LAY_DANH_SACH_NGUOI_DUNG_KEYWORD: {
      state.danhSachSearch = action.danhSachSearch;
      state.danhSachTaiKhoan = state.danhSachSearch;
      // state.userInfo = state.arrUserSearch[0];
      return { ...state };
    }

    // case SET_CAP_NHAT_THONG_TIN : {
    //   // state.danhSachTaiKhoan = action.danhSachTaiKhoan;
    //     // state.thongTinCapNhat = action.thongTinCapNhat;
    //     // state.danhSachTaiKhoan = action.danhSachTaiKhoan;
    //     // state.danhSachTaiKhoan = state.danhSachTaiKhoan;
    //     state.thongTinCapNhat = state.danhSachTaiKhoan[0];
    //     return {...state}
    // }

    case SET_CAP_NHAT_THONG_TIN_CA_NHAN : {
        state.thongTinCaNhan = action.thongTinCaNhan
        return {...state}
    }

    case SET_CAP_NHAT_THONG_TIN_TAI_KHOAN : {
        state.thongTinTaiKhoan = action.thongTinTaiKhoan
        return {...state}
    }

  default:
    return {...state}
  }
}
