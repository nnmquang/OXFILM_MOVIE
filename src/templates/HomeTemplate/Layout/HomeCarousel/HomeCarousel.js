import React,{useEffect, useState} from 'react'
import { Carousel } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import { getCarouselAction } from '../../../../redux/actions/CarouselActions';
import './HomeCarousel.css';
import { CSSTransition } from 'react-transition-group';


const contentStyle = {
    height: '400px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    // background: '#364d79',
    backgroundPosition:'center',
    backgroundSize:'100%',
    backgroundRepeat:'no-repeat'
};


export default function HomeCarousel(props) {

    const { arrFilm } = useSelector(state => state.QuanLyPhimReducer);
    console.log({arrFilm})

    const { arrImg } = useSelector(state => state.CarouselReducer);
    const  [show, setShow] = useState(false)
    console.log('arrImg', arrImg)
    const [trailer, setTrailer] = useState("");


    const dispatch = useDispatch();

    //Sẽ tự kích hoạt khi component load ra (viet theo redux thuong duoi coponent)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // useEffect(async ()=>{
    //     try {
    //         const result = await axios({
    //             url: 'http://movieapi.cyberlearn.vn/api/QuanLyPhim/LayDanhSachBanner',
    //             method:'GET'
    //         })

    //         //Đưa lên reducer
    //         console.log('result',result)

    //         dispatch({
    //             type:'SET_CAROUSEL',
    //             arrImg: result.data.content
    //         })

    //     }catch(errors) {
    //         console.log('errors',errors)
    //     }
    // },[])

     //1 action = {type:'',data}
     //2 (phải cài middleware); callBackFunction(dispatch)
    
    useEffect (() => {
        //Viết theo cách 1
        //   dispatch(getCarouselAction);

        //Viết theo cách 2 truyền tham số
        //const action = getCarouselAction()
        dispatch(getCarouselAction());


      },[])

    const renderImg = () => {
        // return arrImg.map((item,index) => {
        //     return <div key={index}>
        //         <div style={{...contentStyle, backgroundImage:`url(${item.hinhAnh})`}} >
        //             <img src={item.hinhAnh} className="w-full opacity-0" alt="item.hinhAnh" />
        //         </div>
        //     </div>
        // })

        return arrFilm.map((item,index) => {
            return <div key={index} onClick={()=>{setTrailer(item.trailer);}}>
                <div style={{...contentStyle, backgroundImage:`url(${item.hinhAnh})`}} >
                    <img src={item.hinhAnh} className="w-full opacity-0" alt="item.hinhAnh" />
                </div>
                <button onClick={() => setShow(true)} className="play-btn-carousel">
            <img src="./images/play-video.png" alt="playVideo"/>
        </button>

            </div>
        })
    }

    return (
       <div className='relative'>
            <Carousel autoplay effect='fade'style={{width:'100%',padding:0,margin:0,maxHeight:'500px'}}>
            {renderImg()}
        </Carousel>
        {/* <button onClick={() => setShow(true)} className="play-btn-carousel">
            <img src="./images/play-video.png" alt="playVideo"/>
        </button> */}
        <CSSTransition in={show} unmountOnExit timeout={{ enter: 0, exit: 300 }}>
        <div className="modal" onClick={() => setShow(false)}>
          <iframe
            title="title1"
            allowfullscreen="true"
            width="994px"
            height="500px"
            src={trailer}
            frameborder="0"
          ></iframe>
        </div>
      </CSSTransition>
       </div>
        
    )
}

