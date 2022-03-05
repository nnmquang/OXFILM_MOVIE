import { GROUPID } from "../util/settings/config"
import { baseService } from "./baseService"

export class QuanLyRapService extends baseService{

    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super()
    }

    layDanhSachHeThongRap = () => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`)
    }

    layThongTinLichChieuPhim = (maPhim) => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`)
    }

    
}

export const quanLyRapService = new QuanLyRapService();