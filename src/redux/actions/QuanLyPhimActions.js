import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { SET_DANH_SACH_PHIM } from "./types/QuanLyPhimType";


export const layDanhSachPhimAction = () => {

    return async (dispatch) => {
        try {
                    // const result = await axios({
                    //     url: `${DOMAIN}/api/QuanLyPhim/LayDanhSachBanner`,
                    //     method:'GET'
                    // });

                    const result = await quanLyPhimService.layDanhSachPhim();

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