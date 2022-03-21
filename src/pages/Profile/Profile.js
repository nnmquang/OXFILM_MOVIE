import { Tabs } from 'antd';
import { useFormik } from 'formik';
import ThongTinCaNhan from './ThongTinCaNhan';
import './Profile.css'
import Historybook from './Historybook';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

export default function ProfileTab(props) {
  return <div className="p-40 frofile">
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab={<span style={{ fontSize: 20, color: 'white' }}>Thông tin cá nhân</span>} key="1" style={{color:"white"}}>
        <ThongTinCaNhan {...props}  />
      </TabPane>
      <TabPane tab={<span style={{ fontSize: 20, color: 'white' }}>Lịch sử đặt vé</span>} key="2">
        <Historybook {...props}/>
      </TabPane>

    </Tabs>
  </div>
}

// function ThongTinCaNhan(props) {


//   const formik = useFormik({
//     enableReinitialize: true,
//     initiaValues: {
//         taiKhoan:'',
//         hoTenL:'',
//         soDt:'',
//         email:'',
//         matKhau:''
//     },
//     onSubmit: values => {
//       console.log('values', values)
//       // dispatch(themNguoiDungAction(values));
//   }
    
//   })

//   return (
//   <div className='container'>
//     <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md">
//       <form onSubmit={formik.handleSubmit}>
//         <div className="grid grid-cols-2 gap-4">
//           <div className="form-group mb-6">
//             <input name="taiKhoan"  type="text" className="form-control
//     block
//     w-full
//     px-3
//     py-1.5
//     text-base
//     font-normal
//     text-gray-700
//     bg-white bg-clip-padding
//     border border-solid border-gray-300
//     rounded
//     transition
//     ease-in-out
//     m-0
//     focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput123" aria-describedby="emailHelp123" placeholder="Tài khoản" />
//           </div>
//           <div className="form-group mb-6">
//             <input type="text" className="form-control
//     block
//     w-full
//     px-3
//     py-1.5
//     text-base
//     font-normal
//     text-gray-700
//     bg-white bg-clip-padding
//     border border-solid border-gray-300
//     rounded
//     transition
//     ease-in-out
//     m-0
//     focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput124" aria-describedby="emailHelp124" placeholder="Tên" />
//           </div>
//         </div>
//         <div className="form-group mb-6">
//           <input type="text" className="form-control block
//   w-full
//   px-3
//   py-1.5
//   text-base
//   font-normal
//   text-gray-700
//   bg-white bg-clip-padding
//   border border-solid border-gray-300
//   rounded
//   transition
//   ease-in-out
//   m-0
//   focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput125" placeholder="Số ĐT" />
//         </div>
//         <div className="form-group mb-6">
//           <input type="email" className="form-control block
//   w-full
//   px-3
//   py-1.5
//   text-base
//   font-normal
//   text-gray-700
//   bg-white bg-clip-padding
//   border border-solid border-gray-300
//   rounded
//   transition
//   ease-in-out
//   m-0
//   focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput125" placeholder="Email" />
//         </div>
//         <div className="form-group mb-6">
//           <input type="text" className="form-control block
//   w-full
//   px-3
//   py-1.5
//   text-base
//   font-normal
//   text-gray-700
//   bg-white bg-clip-padding
//   border border-solid border-gray-300
//   rounded
//   transition
//   ease-in-out
//   m-0
//   focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput126" placeholder="Mật khẩu" />
//         </div>
//         {/* <div className="form-group form-check text-center mb-6">
//           <input type="checkbox" className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer" id="exampleCheck25" defaultChecked />
//           <label className="form-check-label inline-block text-gray-800" htmlFor="exampleCheck25">Subscribe to our newsletter</label>
//         </div> */}
//         <button type="submit" className="
// w-full
// px-6
// py-2.5
// bg-blue-600
// text-white
// font-medium
// text-xs
// leading-tight
// uppercase
// rounded
// shadow-md
// hover:bg-blue-700 hover:shadow-lg
// focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
// active:bg-blue-800 active:shadow-lg
// transition
// duration-150
// ease-in-out">Cập nhật</button>
//       </form>
//     </div>

//   </div>
//   )

// }
