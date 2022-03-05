import { SET_DANH_SACH_PHIM, SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU } from "../actions/types/QuanLyPhimType"
import { SET_CHI_TIET_PHIM } from "../actions/types/QuanLyRapType";


const stateDefault = {
    arrFilm:[
        {
            "maPhim": 9589,
            "tenPhim": "Captain America: The Winter Soldier (2014)",
            "biDanh": "captain-america-the-winter-soldier-2014-",
            "trailer": "https://www.youtube.com/embed/7SlILk2WMTI",
            "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/captain-america-the-winter-soldier-2014-_gp00.jpg",
            "moTa": "Captain America (giờ đây dưới quyền S.H.I.E.L.D.) vẫn đang tiếp tục thích nghi với thế giới hiện tại và thực hiện nhiều nhiệm vụ bảo vệ thế giới. Sau khi Nick Fury bị tấn công, Steve Rogers phát hiện S.H.I.E.L.D. đã bị HYDRA khống chế. Steve cùng với Black Widow và người bạn mới Falcon phải đối đầu chống lại Hydra và Chiến binh Mùa đông, cũng chính là Bucky Barnes, người bạn thân của Steve. Bucky đã không chết hồi Thế chiến thứ 2 mà đã bị HYDRA bắt về để lập trình lại não.",
            "maNhom": "GP00",
            "ngayKhoiChieu": "2022-02-21T22:59:37.627",
            "danhGia": 8,
            "hot": false,
            "dangChieu": false,
            "sapChieu": false
          },
          {
            "maPhim": 9589,
            "tenPhim": "Captain America: The Winter Soldier (2014)",
            "biDanh": "captain-america-the-winter-soldier-2014-",
            "trailer": "https://www.youtube.com/embed/7SlILk2WMTI",
            "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/captain-america-the-winter-soldier-2014-_gp00.jpg",
            "moTa": "Captain America (giờ đây dưới quyền S.H.I.E.L.D.) vẫn đang tiếp tục thích nghi với thế giới hiện tại và thực hiện nhiều nhiệm vụ bảo vệ thế giới. Sau khi Nick Fury bị tấn công, Steve Rogers phát hiện S.H.I.E.L.D. đã bị HYDRA khống chế. Steve cùng với Black Widow và người bạn mới Falcon phải đối đầu chống lại Hydra và Chiến binh Mùa đông, cũng chính là Bucky Barnes, người bạn thân của Steve. Bucky đã không chết hồi Thế chiến thứ 2 mà đã bị HYDRA bắt về để lập trình lại não.",
            "maNhom": "GP00",
            "ngayKhoiChieu": "2022-02-21T22:59:37.627",
            "danhGia": 8,
            "hot": false,
            "dangChieu": false,
            "sapChieu": false
          },
    ],
    dangChieu:true,
    sapChieu:true,
    arrFilmDefault: [],

    filmDetail:{}
}

export const QuanLyPhimReducer = (state = stateDefault,action) => {
  switch (action.type) {

    case SET_DANH_SACH_PHIM : {
      state.arrFilm = action.arrFilm;
      state.arrFilmDefault = state.arrFilm
      return {...state}
    }

    case SET_PHIM_DANG_CHIEU : {
      state.dangChieu = !state.dangChieu;

      state.arrFilm = state.arrFilmDefault.filter(film => film.dangChieu === state.dangChieu);
      return {...state}
    }

    case SET_PHIM_SAP_CHIEU : {
      state.sapChieu = !state.sapChieu;

      state.arrFilm = state.arrFilmDefault.filter(film => film.dangChieu === state.dangChieu);
      return {...state}
    }

    case SET_CHI_TIET_PHIM : {
      state.filmDetail = action.filmDetail;
      return {...state};
    }
 

  default:
    return {...state}
  }
}
