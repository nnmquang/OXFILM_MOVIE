import axios from "axios";
import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { DOMAIN } from "../../util/settings/config";
import { SET_CAROUSEL } from "./types/CarouselType";

  //Viết theo cách 1
// export const getCarouselAction = async (dispatch) => {
//     try {
//         const result = await axios({
//             url: 'http://movieapi.cyberlearn.vn/api/QuanLyPhim/LayDanhSachBanner',
//             method:'GET'
//         });

//         dispatch({
//             type:'SET_CAROUSEL',
//             arrImg: result.data.content
//         })
//     }catch (errors) {
//         console.log('errors',errors)
//     }
// };


 //Viết theo cách 2 truyền tham số
export const getCarouselAction = () => {
    return async (dispatch) => {
        try {
                    // const result = await axios({
                    //     url: `${DOMAIN}/api/QuanLyPhim/LayDanhSachBanner`,
                    //     method:'GET'
                    // });

                    const result = await quanLyPhimService.layDanhSachBanner();
            
                    dispatch({
                        type: SET_CAROUSEL,
                        arrImg: result.data.content
                    })
                }catch (errors) {
                    console.log('errors',errors)
                }
    };
};