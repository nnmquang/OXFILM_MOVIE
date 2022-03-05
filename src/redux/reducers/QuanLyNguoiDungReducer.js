import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { DANG_NHAP_ACTION, SET_THONG_TIN_NGUOI_DUNG } from "../actions/types/QuanLyNguoiDungType"

let user = {}; //lấy thông tin này làm mặc định để khi quay lại thì thông tin này vẫn nằm trên máy
if(localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const initialState = {
    userLogin: user,
    thongTinNguoiDung: {}

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

  default:
    return {...state}
  }
}
