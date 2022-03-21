import React, { useEffect } from 'react'
import HomeMenu from './HomeMenu/HomeMenu'
import bg from '../../assets/logofilm/inner-bg01.jpg';
import './Home.css'
//Kết nối redux
import { useSelector, useDispatch } from 'react-redux'
import Film from '../../components/Film/Film';
import MultipleRows from '../../components/RSlick/MultipleRowSlick';
import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimActions';
import { layDanhSachHeThongRapAction } from '../../redux/actions/QuanLyRapActions';
import HomeCarousel from '../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel';

export default function Home(props) {

  const { arrFilm } = useSelector(state => state.QuanLyPhimReducer);
  const {heThongRapChieu} = useSelector(state => state.QuanLyRapReducer);
  console.log('propsHome', arrFilm)
  const dispatch = useDispatch();
  // const renderFilms = () => {
  //   return arrFilm.map((phim, index) => {
  //     return <Film key={index}/>

  //   })
  // }

  useEffect(()=>{
    const action = layDanhSachPhimAction();
    dispatch(action); //dispatch function từ thunk

    dispatch(layDanhSachHeThongRapAction());
  },[])


  return (
    
    <div className='bg_inn'>
      <HomeCarousel/>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
        <MultipleRows arrFilm={arrFilm}/>
          {/* <div className="flex flex-wrap -m-4">
            {renderFilms()}
          </div> */}
        </div>
      </section>

      <div className="mx-36">
        <HomeMenu heThongRapChieu={heThongRapChieu} />
      </div>
    </div>
  )
}
