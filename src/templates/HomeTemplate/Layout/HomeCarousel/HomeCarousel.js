import React,{useEffect} from 'react'
import { Carousel } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import { getCarouselAction } from '../../../../redux/actions/CarouselActions';
import './HomeCarousel.css';


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

    const { arrImg } = useSelector(state => state.CarouselReducer)
    console.log('arrImg', arrImg)

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
        return arrImg.map((item,index) => {
            return <div key={index}>
                <div style={{...contentStyle, backgroundImage:`url(${item.hinhAnh})`}}>
                    <img src={item.hinhAnh} className="w-full opacity-0" alt="item.hinhAnh" />
                </div>
            </div>
        })
    }

    return (
        <Carousel effect='fade'style={{width:'100%',padding:0,margin:0}}>
            {renderImg()}

        </Carousel>
    )
}
