import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { SET_DANH_SACH_PHIM, SET_THONG_TIN_PHIM } from "./types/QuanLyPhimType";
import { history } from "../../App";


export const layDanhSachPhimAction = (tenPhim='') => {

    return async (dispatch) => {
        try {
                    // const result = await axios({
                    //     url: `${DOMAIN}/api/QuanLyPhim/LayDanhSachBanner`,
                    //     method:'GET'
                    // });

                    const result = await quanLyPhimService.layDanhSachPhim(tenPhim);

                    // Sau khi lấy dũe liệu từ api về => redux (reducer)
                    dispatch({
                        type: SET_DANH_SACH_PHIM,
                        arrFilm: result.data.content
                    })
                }catch (errors) {
                    console.log('errors',errors)
                }
    };
}

export const themPhimUploadHinhAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.themPhimUploadHinh(formData);
            alert('Thêm phim thành công!')
            console.log('result', result.data.content)
        }catch(errors) {
            console.log(errors.response?.data)
        }
    }
}

export const capNhatPhimUploadAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.capNhatPhimUpload(formData);
            alert('Cập nhật phim thành công!')
            console.log('result', result.data.content)

            dispatch(layDanhSachPhimAction())
            history.push('/admin/films');
        }catch(errors) {
            console.log(errors.response?.data)
        }
    }
}


export const layThongTinPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.layThongTinPhim(maPhim);

            // console.log('result', result.data.content)

            dispatch ({
                type: SET_THONG_TIN_PHIM,
                thongTinPhim:result.data.content
            })
        }catch (errors) {
            console.log(errors.response?.data)
        }
    }

}


export const xoaPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.xoaPhim(maPhim)
            alert('Xoá phim thành công!');
            console.log('result',result.data.content)
            //Sau khi xoá load lại danh sách phim mới
            dispatch(layDanhSachPhimAction())

        }catch(errors) {
            console.log(errors.response?.data)
        }
    }
}