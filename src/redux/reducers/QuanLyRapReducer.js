import { SET_HE_THONG_RAP_CHIEU } from "../actions/types/QuanLyRapType";


const initialState = {
    heThongRapChieu: []
}

// eslint-disable-next-line import/no-anonymous-default-export
export const QuanLyRapReducer = (state = initialState,action) => {

  switch (action.type) {

    case SET_HE_THONG_RAP_CHIEU : {
        state.heThongRapChieu = action.heThongRapChieu;
        return {...state};
    }
  

  default:
    return {...state}
  }
}
