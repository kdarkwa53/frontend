
import React, { useState } from 'react';
import { Modal, Form, Select, Input, Upload, message, Button } from 'antd';
import Styles from "../../../Menu/Menu.module.css"
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
// import Upload from 'rc-upload';
import { useDispatch, useSelector } from 'react-redux';
import { showErrorNotification } from '../../../../actions/alert.actions';
import Selfie from './Selfie';
import { TickBold } from '../../../JavIcons';
import { verifyIdentity } from '../../../duck/action';
import { authFileHeader, getUserType, REACT_APP_BASE_API_URL, REACT_APP_CUSTOMER_SERVICE_API_URL } from '../../../../../helpers/contants';
import axios from 'axios';


const VerifyIdentity = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [disableButton, setButton] = useState(true)
    const [selfie, setImgState] = useState("")
    const vLoading = useSelector((state) => state?.resources?.verifyingIdentity)
    const text = useSelector((state) => state?.language)

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const {Option} = Select

    const handleFormChange = () => {
        const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
        setButton(hasErrors);
    }

    // const getBase64 = (img, callback) => {
    //     const reader = new FileReader();
    //     reader.addEventListener('load', () => callback(reader.result));
    //     reader.readAsDataURL(img);
    // }

    const getBase64 = (img) => {
        return new Promise((res, rej) => {
            const reader = new FileReader();
            reader.addEventListener('load', () => res(reader.result));
            reader.readAsDataURL(img);
        })
    }

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    const [img, setImgProp] = useState({ loading: false })

  
    const uploadProps = {
        multiple: false,
        onSuccess(res, file) {
        },
        onError(err) {

            setImgProp({
                ...img,
                loading: false,
            })
            dispatch(showErrorNotification(err?.response?.data?.message))
        },
        customRequest ({
            file,
            onError,
            onSuccess,
        }) {
            let data = form.getFieldsValue()
            const formData = new FormData();
            if (data) {
                Object.keys(data).forEach(key => {
                    formData.append(key, data[key]);
                });
            }
            formData.append("id_image", file);
            setImgProp({
                ...img,
                loading: true,
            })

            getBase64(file).then(async (imageUrl) => {
                console.log("okay: ", imageUrl)
                setImgProp({
                    imageUrl,
                    loading: false,
                })
                const userType = getUserType()
                try {
                    axios
                        .post(`${REACT_APP_BASE_API_URL}/${userType}/ID-verification`,
                            formData,
                            authFileHeader,
                        )
                        .then(({ data: response }) => {
                            getBase64(file, imageUrl =>
                                setImgProp({
                                    imageUrl,
                                    loading: false,
                                }),
                            );
                            onSuccess(response, file);
                        }).catch(onError)
                } catch (error) {
                    setImgProp({
                        ...img,
                        loading: false,
                    })
                }
                return {
                    abort() {
                        console.log('upload progress is aborted.');
                    },
                };

            })
            
            // getBase64(file, imageUrl =>
            //     setImgProp({
            //         imageUrl,
            //         loading: false,
            //     }),
            // );
        }
    }

    

    const { loading, imageUrl } = img;

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Tap to add a picture of your ID</div>
        </div>
    )

    const onFinish = async(values) => {
            const formData = new FormData();
            Object.keys(values).forEach(key => {
                formData.append(key, values[key]);
            });
             const blob = await fetch(selfie).then((res) => res.blob());
            formData.append("selfie_image", blob);

            console.log("form: ",formData)
            dispatch(verifyIdentity(formData, setIsModalVisible))

    };

    return (
        <>
            <div className={Styles.kycCard}  onClick={showModal}>
                <div className={Styles.kycTitle}>{text.VERIFY_IDENTITY}</div>
                <div className={Styles.kcyMsg}>{text.VERIFY_IDENTITY_MSG}</div>
            </div>
            <Modal 
            visible={isModalVisible} 
            onOk={handleOk} 
            footer={false}
            onCancel={handleCancel}>
                <h3 className='text-center'>Verify your identity</h3>
                <p className='subtitle text-center'>Fill this form to verify that this account belongs to you</p>
                <Form
                    form={form}
                    layout='vertical'
                    onFinish={onFinish}
                    onFieldsChange={handleFormChange}
                >
                    <div className={Styles.itemRow}>
                        <div className={Styles.inputLabel}>Country</div>
                        <div className={Styles.inputContainer}>
                            <Form.Item
                                name="country"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Select style={{ width: "100%" }} size="large"  placeholder="Select country">
                                    <Option value="gh">Ghana </Option>
                                    <Option value="us">USA</Option>
                                    <Option value="sn">Senegal</Option>
                                    <Option value="ng">Nigeria</Option>
                                    <Option value="uk">UK</Option>
                                </Select>
                            </Form.Item>
                        </div>
                    </div>
                    <div className={Styles.itemRow}>
                        <div className={Styles.inputLabel}>ID Type</div>
                        <div className={Styles.inputContainer}>
                            <Form.Item
                                name="id_type"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Select style={{ width: "100%" }} size="large" placeholder="Select ID type">
                                    <Option value="nhis">Nationa Health Insurance (NHIS) </Option>
                                    <Option value="ghanacard">Ghana Card</Option>
                                    <Option value="nationaid">National ID</Option>
                                    <Option value="passport">Passport</Option>
                                </Select>
                            </Form.Item>
                        </div>
                    </div>
                    <div className={Styles.itemRow}>
                        <div className={Styles.inputLabel}>ID Number</div>
                        <div className={Styles.inputContainer}>
                            <Form.Item
                                name="id_number"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input size='large' placeholder='Enter ID number'/>
                            </Form.Item>
                        </div>
                    </div>

                    <div>
                        <Upload
                            {...uploadProps}
                            // name="file"
                            listType="picture-card"
                            beforeUpload={beforeUpload}
                            htmlType="submit"
                            showUploadList={false}
                            disabled={disableButton}
                        >
                            {imageUrl ? 
                            <div style={{display: "flex", padding:"1em 2em", justifyContent:"space-between", width: "100%", alignItems: "center"}}>
                                    <div style={{ width: "100px"}}>
                                        <img src={imageUrl} style={{ objectFit: "contain", width: '100%'  }} alt="avatar"/>
                                    </div>
                                    <div>
                                        <TickBold width="2em" height="2em" color="#2D9319" />
                                    </div>
                            </div>
                            
                            : uploadButton}
                        </Upload>
                    </div>
                    <Selfie idImage={img.imageUrl} selfie={selfie} setImgState={setImgState} />
                    <Form.Item>
                        <Button
                            block
                            size="large"
                            style={{ marginTop: "2em" }}
                            type="primary"
                            htmlType='submit'
                            disabled={selfie?false:true}
                            loading={vLoading}
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                
            </Modal>
        </>
    );
};


export default VerifyIdentity




    
            
