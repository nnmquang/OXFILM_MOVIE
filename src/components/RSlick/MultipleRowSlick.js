import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU } from "../../redux/actions/types/QuanLyPhimType";
import Film from "../Film/Film";
import Film_Flip from "../Film/Film_Flip";
import styleSlick from './MultipleRowSlick.module.css';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick['slick-prev']}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}


function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick['slick-prev']}`}
      style={{ ...style, display: "block", left: '-52px' }}
      onClick={onClick}
    />
  );
}


const MultipleRowSlick = (props) => {

  const dispatch = useDispatch()
  const { dangChieu, sapChieu } = useSelector(state => state.QuanLyPhimReducer)


  const renderFilms = () => {
    return props.arrFilm.slice(0, 12).map((item, index) => {
      return <div className="mt-2" key={index}>
        <Film_Flip item={item} />
      </div>
    })
  }

  let activeClassDC = dangChieu === true ? 'active_Film' : 'none_active_Film';

  let activeClassSC = sapChieu === true ? 'active_Film' : 'none_active_Film';

  console.log('activeSC',activeClassSC)
  const settings = {
    className: "center variable-width",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    rows: 2,
    slidesPerRow: 1,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };
  return (
    <div>
      <button type="button" className={`${styleSlick[activeClassDC]} p-4 font-semibold  rounded bg-red-400 text-white border-red-400 border mr-2`} onClick={() => {
        const action = { type: SET_PHIM_DANG_CHIEU }
        dispatch(action);
      }}>PHIM ĐANG CHIẾU</button>
      <button type="button" className={`${styleSlick[activeClassSC]} p-4 font-semibold rounded border bg-white text-red-400 border-red-400`} onClick={() => {
        const action = { type: SET_PHIM_SAP_CHIEU }
        dispatch(action);
      }}>PHIM SẮP CHIẾU</button>

      <Slider {...settings}>
        {renderFilms()}
      </Slider>
    </div>
  );
}


export default MultipleRowSlick;