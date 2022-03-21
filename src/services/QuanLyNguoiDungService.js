// import { GROUPID } from "../util/settings/config"
import { GROUPID } from "../util/settings/config";
import { baseService } from "./baseService"

export class QuanLyNguoiDungService extends baseService {

    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super()
    }

    dangNhap = (thongTinDangNhap) => {  //{taiKhoan:'',matKhau:''}
        return this.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
    }

    layThongTinNguoiDung = () => {
        return this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`)
    }

    dangKy = (thongTinDangKy) => {
        return this.post(`/api/QuanLyNguoiDung/DangKy`, thongTinDangKy)
    }

    layDanhSachTaiKhoan = (tuKhoa = '') => {
        if (tuKhoa != '') {
            return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}&tuKhoa=${tuKhoa}`)
        }
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`)
    }

    themNguoiDung = (thongTinThemNguoiDung) => {
        return this.post(`api/QuanLyNguoiDung/ThemNguoiDung`, thongTinThemNguoiDung)
    }

    layDanhSachLoaiNguoiDung = () => {
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`)
    }

    timKiemNguoiDung = (keyWord) => {
        return this.get(
          `api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${GROUPID}&tuKhoa=${keyWord}`
        );
      };
    

    // capNhatThongTinNguoiDung = (taiKhoan='') => {
    //     // return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung`,taiKhoan)
    //     // return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung`,taiKhoan)
    //     if(taiKhoan != '') {
    //         return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}&tuKhoa=${taiKhoan}`)
    //     }
    //     return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`)
    // }

    layThongTinCapNhatACC = (taiKhoan) => {
        if (taiKhoan != '') {
            return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}&tuKhoa=${taiKhoan}`)
        }
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`)
    }

    capNhatThongTinCaNhan = (thongTinCaNhan) => {
        return this.put(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, thongTinCaNhan)
    }

    xoaTaiKhoan = (taiKhoan) => {
        return this.delete(`api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);   
    }

    capNhatThongTinTaiKhoan = (thongTinTaiKhoan) => {
        return this.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, thongTinTaiKhoan)
    }

}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();