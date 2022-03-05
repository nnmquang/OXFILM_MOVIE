import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk';
import { CarouselReducer } from '../reducers/CarouselReducer';
import { QuanLyNguoiDungReducer } from '../reducers/QuanLyNguoiDungReducer';
import { QuanLyPhimReducer } from '../reducers/QuanLyPhimReducer';
import { QuanLyRapReducer } from '../reducers/QuanLyRapReducer';
import { QuanLyDatVeReducer } from '../reducers/QuanLyDatVeReducer'
import { LoadingReducer } from '../reducers/LoadingReducer';

const rootReducer = combineReducers({
    //state ứng dụng
    CarouselReducer,
    QuanLyPhimReducer,
    QuanLyRapReducer,
    QuanLyNguoiDungReducer,
    QuanLyDatVeReducer,
    LoadingReducer
});

export const store = createStore(rootReducer,applyMiddleware(thunk));