import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux';
import { dangKyAction } from '../../redux/actions/QuanLyNguoiDungAction'
import * as Yup from 'yup';

export default function Register(props) {

  const dispatch = useDispatch();

  // const registerSchema = Yup.object({
  //     taiKhoan: Yup.string()
  //       .min(3, "Nhập ít nhất 3 ký tự")
  //       .max(20, "Nhập tối đa 20 ký tự")
  //       .required(" Tài khoản không được bỏ trống !"),
  //     hoTen: Yup.string()
  //       .min(3, "Nhập ít nhất 3 ký tự")
  //       .max(20, "Nhập tối đa 20 ký tự")
  //       .required(" Họ tên không được bỏ trống !"),
  //     email: Yup.string()
  //       .email("Email không đúng định dạng")
  //       .required("Email không được bỏ trống !"),
  //     matkhau: Yup.string()
  //       .min(8, "Nhập tối đa 5 ký tự")
  //       .required("Mật khẩu không được bỏ trống !"),
  //     confirm_matkhau: Yup.string()
  //       .oneOf([Yup.ref("matkhau")], "Mật khẩu không khớp")
  //       .required("Mật khẩu không được bỏ trống !"),
  //     soDT: Yup.string()
  //       .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, 'SĐT không hợp lệ!')
  //       .required("Số ĐT không được bỏ trống !"),
  // });
  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matkhau: '',
      email: '',
      soDt: '',
      maNhom: '',
      hoTen: '',
    },
    // validationSchema: registerSchema,
    validationSchema: Yup.object({
      taiKhoan: Yup.string()
        .min(3, "Nhập ít nhất 3 ký tự")
        .max(20, "Nhập tối đa 20 ký tự")
        .required(" Tài khoản không được bỏ trống !"),
      hoTen: Yup.string()
        .min(3, "Nhập ít nhất 3 ký tự")
        .max(20, "Nhập tối đa 20 ký tự")
        .required(" Họ tên không được bỏ trống !"),
      email: Yup.string()
        .email("Email không đúng định dạng")
        .required("Email không được bỏ trống !"),
      matkhau: Yup.string()
        .min(8, "Nhập tối đa 5 ký tự")
        .required("Mật khẩu không được bỏ trống !"),
      confirm_matkhau: Yup.string()
        .oneOf([Yup.ref("matkhau")], "Mật khẩu không khớp")
        .required("Mật khẩu không được bỏ trống !"),
      soDt: Yup.string()
        .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, 'SĐT không hợp lệ!')
        .required("Số ĐT không được bỏ trống !"),
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      dispatch(dangKyAction(values))
      console.log('values', values)
    }
  })


  return (
    <form onSubmit={formik.handleSubmit} className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center text-sky-300">Đăng Ký
          </h1>
          <input type="text" className="block border border-grey-light w-full p-3 rounded mb-4" name="taiKhoan" onChange={formik.handleChange} placeholder="Tài khoản" />
          {/* {formik.errors.taiKhoan && <p className='text-red-500'>{formik.errors.taiKhoan}</p>} */}
          {formik.errors.taiKhoan && formik.touched.taiKhoan && (
            <p className='text-red-500'>{formik.errors.taiKhoan}</p>
          )}
          <input type="text" className="block border border-grey-light w-full p-3 rounded mb-4" name="hoTen" onChange={formik.handleChange} placeholder="Họ tên" />
          {/* {formik.errors.taiKhoan && <p className='text-red-500'>{formik.errors.taiKhoan}</p>} */}
          {formik.errors.hoTen && formik.touched.hoTen && (
            <p className='text-red-500'>{formik.errors.hoTen}</p>
          )}
          <input type="password" className="block border border-grey-light w-full p-3 rounded mb-4" name="matkhau" onChange={formik.handleChange} placeholder="Mật khẩu" />
          {/* {formik.errors.matKhau && <p className='text-red-500'>{formik.errors.matKhau}</p>} */}
          {formik.errors.matKhau && formik.touched.matKhau && (
            <p className='text-red-500'>{formik.errors.matKhau}</p>
          )}
          <input type="password" className="block border border-grey-light w-full p-3 rounded mb-4" name="confirm_matkhau" onChange={formik.handleChange} placeholder="Nhập lại mật khẩu" />
          {/* {formik.errors.confirm_matkhau && <p className='text-red-500'>{formik.errors.confirm_matkhau}</p>} */}
          {formik.errors.confirm_matkhau && formik.touched.confirm_matkhau && (
            <p className='text-red-500'>{formik.errors.confirm_matkhau}</p>
          )}
          <input type="text" className="block border border-grey-light w-full p-3 rounded mb-4" name="email" onChange={formik.handleChange} placeholder="Email" />
          {/* {formik.errors.email && <p className='text-red-500'>{formik.errors.email}</p>} */}
          {formik.errors.email && formik.touched.email && (
            <p className='text-red-500'>{formik.errors.email}</p>
          )}
          <input type="text" className="block border border-grey-light w-full p-3 rounded mb-4" name="soDt" onChange={formik.handleChange} placeholder="Số điện thoại" />
          {/* {formik.errors.soDT && <p className='text-red-500'>{formik.errors.soDT}</p>} */}
          {formik.errors.soDt && formik.touched.soDt && (
            <p className='text-red-500'>{formik.errors.soDt}</p>
          )}
          <button type="submit" className="w-full text-center py-3 rounded bg-red-500 text-white hover:bg-green-dark focus:outline-none my-1">Đăng ký</button>
          {/* <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the
            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
              Terms of Service
            </a> and
            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
              Privacy Policy
            </a>
          </div> */}
        </div>
        <div className="text-white mt-6">
          Bạn đã có tài khoản -
          <a className="no-underline border-b border-blue text-green-500 hover:text-red-300" href="../login/">
            Đăng nhập
          </a>
        </div>
      </div>
    </form>

  )
}
