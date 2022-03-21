import React, { useEffect,  useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { capNhatPhimUploadAction, layThongTinPhimAction, themPhimUploadHinhAction } from '../../../../redux/actions/QuanLyPhimActions';
import { GROUPID } from '../../../../util/settings/config';
import { Editor } from '@tinymce/tinymce-react';

const { TextArea } = Input;

const Edit = (props) => {
    const [componentSize, setComponentSize] = useState('default');
    const [imgSrc, setImgSrc] = useState('');
    const { thongTinPhim } = useSelector(state => state.QuanLyPhimReducer);
    console.log({ thongTinPhim })
    const dispatch = useDispatch();

    const {
        // values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue
    } = props;

    useEffect(() => {
        formik.setFieldValue('moTa', formik.values.moTa)
        let { id } = props.match.params;

        dispatch(layThongTinPhimAction(id))

    }, [])

    const handleEditorChange = (content, editor) => {
        formik.setFieldValue('moTa', content)

    }


    const formik = useFormik({
        enableReinitialize: true, //chi su dung TH nay doi voi formik do no render lai do ham handlechange ko chinh sua duoc duc lieu khi input
        initialValues: {
            maPhim: thongTinPhim.maPhim,
            tenPhim: thongTinPhim.tenPhim,
            trailer: thongTinPhim.trailer,
            moTa: thongTinPhim.moTa,
            ngayKhoiChieu: thongTinPhim.ngayKhoiChieu,
            dangChieu: thongTinPhim.dangChieu,
            sapChieu: thongTinPhim.sapChieu,
            hot: thongTinPhim.hot,
            danhGia: thongTinPhim.danhGia,
            hinhAnh: null,
            maNhom: GROUPID

        },

        onSubmit: (values) => {
            console.log({ values })
            values.maNhom = GROUPID;
            //Tạo đối tượng Formdata => Đưa giá trị values từ formik vào formdata- video66
            let formData = new FormData();
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                } else {
                    if (values.hinhAnh !== null) {
                        formData.append('File', values.hinhAnh, values.hinhAnh.name);
                    }

                }
            }
            // formData.append('tenPhim',formik.values.tenPhim); // Dùng vòng lặp for key để lấy nhiều thuộc tính thay cho làm từng cái

            //Gọi api gửi các giá trị formdata về backend xử lý

            dispatch(capNhatPhimUploadAction(formData));
            console.log('fomData', formData.get('File'))
        },
    })

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const handleChangeDatePicker = (value) => {
        // console.log('datapickerchange', moment(value).format('DD/MM/YYYY'));
        let ngayKhoiChieu = moment(value);
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

    const handleChangeFile = async (e) => {
        //Lấy file ra từ e
        let file = e.target.files[0];
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {
            //Đem dữ liệu file lưu vào formik
            await formik.setFieldValue('hinhAnh', file)
            //Tạo đối tượng để đọc file
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                console.log(e.target.result);
                setImgSrc(e.target.result); //Hình base 64
            }

        }
        console.log({ file })
    }

    const cleanup = (input) => {
        const div = document.createElement('div');
        div.innerHTML = input;
        return div.innerText;
    };

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
                <Input name="tenPhim" onChange={formik.handleChange} value={formik.values.tenPhim} />
            </Form.Item>
            <Form.Item label="Trailer">
                <Input name="trailer" onChange={formik.handleChange} value={formik.values.trailer} />
            </Form.Item>
            <Form.Item label="Mô tả">
                {/* <Input  name="moTa" onChange={formik.handleChange} value={formik.values.moTa} /> */}
                {/* <TextArea rows={4}  value={formik.values.moTa}/> */}
                <Editor
                    name="moTa"
                    // onInit={(evt, editor) => editorRef.current = editor}
                    // initialValue={values.description}
                    value={formik.values.moTa}
                    init={{
                        // selector: 'textarea',
                        // forced_root_block : "",
                        // block_formats: 'Paragraph=p; Header 1=h1; Header 2=h2; Header 3=h3',
                        // height: 300,
                        // menubar: false,
                        // plugins: [
                        //     'advlist autolink lists link image charmap print preview anchor',
                        //     'searchreplace visualblocks code fullscreen',
                        //     'insertdatetime media table paste code help wordcount'
                        // ],
                        // toolbar: 'undo redo | formatselect | ' +
                        //     'bold italic backcolor | alignleft aligncenter ' +
                        //     'alignright alignjustify | bullist numlist outdent indent | ' +
                        //     'removeformat | help',
                        // content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                        selector: "textarea",
                        language: 'vi_VN',
                        //inline: true, //for contenteditable selector
                        forced_root_block: "", //!important
                        force_br_newlines: true, //!important
                        force_p_newlines: false, //!important
                        valid_elements: "br", //!important
                        paste_as_text: true, //!important
                        external_plugins: {
                            twExoticMarkdownEditor: "[[++assets_url]]components/tinymcewrapper/tinymceplugins/twExoticMarkdownEditor.js", //!important
                            bubbleBar: "[[++assets_url]]components/tinymcewrapper/tinymceplugins/tinymceBubbleBar.js", //!important
                            twPreCodeManager: "[[++assets_url]]components/tinymcewrapper/tinymceplugins/twPreCodeManager.js",
                            modxMagicHoverLink: "[[++assets_url]]components/tinymcewrapper/tinymceplugins/modxMagicHoverLink.js",
                        },
                        twExoticMarkdownEditorSettings: {
                            addClass: false, //default is true (add .twExoticMarkdownEditor class to editor body)
                            removeClasses: "a b c", // remove class(es) when editor loads - smoothly reveal editor only after text has been prepared
                            skipClass: "", // do not process this particular editor content, skip it!
                            addAttr: false, //default is true (add markdown="1" to editor body) good for parsing mixed content in mark/parsedownExtra
                        },
                        plugins: "paste contextmenu save searchreplace", //!important
                        toolbar: "modxMagicHoverLink twPreCodeManager boldMD italicMD linkMD imageMD blockquoteMD codeMD numlistMD bullistMD tableMD undo redo searchreplace bubbleBarOptionsButton", //!important
                        menubar: false,
                        contextmenu: "modxMagicHoverLink twPreCodeManager boldMD italicMD linkMD imageMD blockquoteMD codeMD numlistMD bullistMD tableMD undo redo searchreplace template" //!important
                    }}
                    onEditorChange={handleEditorChange}

                />
            </Form.Item>
            <Form.Item label="Ngày khởi chiếu">
                <DatePicker format="DD/MM/YYYY" onChange={handleChangeDatePicker} value={moment(formik.values.ngayKhoiChieu)} />
            </Form.Item>
            <Form.Item label="Đang chiếu" valuePropName="checked">
                <Switch onChange={handleChangeSwitch('dangChieu')} checked={formik.values.dangChieu} />
            </Form.Item>
            <Form.Item label="Sắp chiếu" valuePropName="checked">
                <Switch onChange={handleChangeSwitch('sapChieu')} checked={formik.values.sapChieu} />
            </Form.Item>
            <Form.Item label="Hot" valuePropName="checked">
                <Switch onChange={handleChangeSwitch('hot')} checked={formik.values.hot} />
            </Form.Item>
            <Form.Item label="Số sao">
                <InputNumber onChange={handleChangeInputNumber('danhGia')} min={1} max={10} value={formik.values.danhGia} />
            </Form.Item>
            <Form.Item label="Hình ảnh">
                <input type="file" onChange={handleChangeFile} accept="image/png,image/jpeg,image/jpg,image/gif,image/png" />
                <br />
                <img style={{ width: 150, height: 150 }} src={imgSrc === '' ? thongTinPhim.hinhAnh : imgSrc} alt="..." />
            </Form.Item>


            <Form.Item label="Tác vụ">
                <button type='submit' className="bg-blue-500 text-white p-2">Cập nhật</button>
            </Form.Item>
        </Form>
    );
};

export default Edit;