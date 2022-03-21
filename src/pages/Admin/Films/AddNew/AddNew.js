import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { themPhimUploadHinhAction } from '../../../../redux/actions/QuanLyPhimActions';
import { GROUPID } from '../../../../util/settings/config';

const AddNew = () => {
    const [componentSize, setComponentSize] = useState('default');
    const [imgSrc, setImgSrc] = useState('');
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            tenPhim: '',
            trailer: '',
            moTa: '',
            ngayKhoiChieu: '',
            dangChieu: false,
            sapChieu: false,
            hot: false,
            danhGia: 0,
            hinhAnh: {},

        },
        // validationSchema: Yup.object({
        //     tenPhim: Yup.string()
        //         .min(2, "Mininum 2 characters")
        //         .max(20, "Maximum 20 characters")
        //         .required("Required!"),
        //     // email: Yup.string()
        //     //     .email("Invalid email format")
        //     //     .required("Required!"),
        //     // password: Yup.string()
        //     //     .min(8, "Minimum 8 characters")
        //     //     .required("Required!"),
        //     // confirm_password: Yup.string()
        //     //     .oneOf([Yup.ref("password")], "Password's not match")
        //     //     .required("Required!")
        // }),
        onSubmit: (values) => {
            console.log({ values })
            values.maNhom = GROUPID;
            //Tạo đối tượng Formdata => Đưa giá trị values từ formik vào formdata- video66
            let formData = new FormData();
            for (let key in values) {
                if(key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                }else {
                    formData.append('File', values.hinhAnh, values.hinhAnh.name)
                }
            }
            // formData.append('tenPhim',formik.values.tenPhim); // Dùng vòng lặp for key để lấy nhiều thuộc tính thay cho làm từng cái

            //Gọi api gửi các giá trị formdata về backend xử lý

            dispatch(themPhimUploadHinhAction(formData));
            console.log('fomData',formData.get('File'))
        },
    })

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const handleChangeDatePicker = (value) => {
        console.log('datapickerchange', moment(value).format('DD/MM/YYYY'));
        let ngayKhoiChieu = moment(value).format('DD/MM/YYYY')
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
    }

    //Cách viết closure function
    const handleChangeSwitch = name => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }

    const handleChangeInputNumber = name => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }

    const handleChangeFile = (e) => {
        //Lấy file ra từ e
        let file = e.target.files[0];
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {
            //Tạo đối tượng để đọc file
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                console.log(e.target.result);
                setImgSrc(e.target.result); //Hình base 64
            }
            //Đem dữ liệu file lưu vào formik
            formik.setFieldValue('hinhAnh', file)
        }
        console.log({ file })
    }

    return (
        <Form
            onSubmitCapture={formik.handleSubmit}
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"
            initialValues={{
                size: componentSize,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
        >
            <h3>Thêm phim mới</h3>

            <Form.Item label="Form Size" name="size">
                <Radio.Group>
                    <Radio.Button value="small">Small</Radio.Button>
                    <Radio.Button value="default">Default</Radio.Button>
                    <Radio.Button value="large">Large</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="Tên phim">
                <Input  name="tenPhim" onChange={formik.handleChange} />
                {/* {formik.errors.tenPhim && formik.touched.tenPhim && (
                    <span className='text-red-500'>{formik.errors.tenPhim}</span>
                )} */}
                {/* {formik.errors.tenPhim && <span className='text-red-500'>{formik.errors.tenPhim}</span>} */}
            </Form.Item>
            <Form.Item label="Trailer">
                <Input name="trailer" onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="Mô tả">
                <Input  name="moTa" onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="Ngày khởi chiếu">
                <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} />
            </Form.Item>
            <Form.Item label="Đang chiếu" valuePropName="checked">
                <Switch onChange={handleChangeSwitch('dangChieu')} />
            </Form.Item>
            <Form.Item label="Sắp chiếu" valuePropName="checked">
                <Switch onChange={handleChangeSwitch('sapChieu')} />
            </Form.Item>
            <Form.Item label="Hot" valuePropName="checked">
                <Switch onChange={handleChangeSwitch('hot')} />
            </Form.Item>
            <Form.Item label="Số sao">
                <InputNumber onChange={handleChangeInputNumber('danhGia')} min={1} max={10} />
            </Form.Item>
            <Form.Item label="Hình ảnh">
                <input type="file" onChange={handleChangeFile} accept="image/png,image/jpeg,image/jpg,image/gif,image/png" />
                <br />
                <img style={{ width: 150, height: 150 }} src={imgSrc} alt="..." />
            </Form.Item>


            <Form.Item label="Tác vụ">
                <button type='submit' className="bg-blue-500 text-white p-2">Thêm phim</button>
            </Form.Item>
        </Form>
    );
};

export default AddNew;