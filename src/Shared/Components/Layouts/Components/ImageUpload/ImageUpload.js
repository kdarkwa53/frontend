
import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
// import Upload from 'rc-upload';
import { useDispatch } from 'react-redux';
import { showErrorNotification, showSuccessNotification } from '../../../../actions/alert.actions';
import { TickBold } from '../../../JavIcons';
import {  authHeader, REACT_APP_BASE_API_URL } from '../../../../../helpers/contants';
import axios from 'axios';

const ImageUpload = ({ msg, name, handleChange}) => {
    const dispatch = useDispatch()




    const getBase64 = (img) => {
        return new Promise((res, rej)=>{
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

    const customRequest = async ({
        file,
        onError,
        onSuccess,
    })=>{
        
       
            setImgProp({
                ...img,
                loading: true,
            })
            getBase64(file).then(async(imageUrl)=>{
                console.log("okay: ", imageUrl)
                setImgProp({
                    imageUrl,
                    loading: false,
                })
                // console.log("Uop: ", img)

                try {
                    const details = {
                        "file": imageUrl
                    }
                    const { data } = await axios
                        .post(`${REACT_APP_BASE_API_URL}/resource/base64/upload`,
                            details,
                            authHeader,
                        )
                    dispatch(showSuccessNotification(data?.message))
                        setImgProp({
                                imageUrl,
                                loading: false,
                            })
                    handleChange(name, data?.url)
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

        }
    

    const uploadProps = {
        multiple: false,
        onSuccess(res, file) {
        },
        onError(err) {

            setImgProp({
                ...img,
                loading: false,
            })
            console.log(err)
            dispatch(showErrorNotification(err?.response?.data?.message))
        },
     
    }



    const { loading, imageUrl } = img;

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>{msg}</div>
        </div>
    )

    return (
        <div>
            <Upload
                {...uploadProps}
                // name="file"
                listType="picture-card"
                beforeUpload={beforeUpload}
                customRequest={customRequest}
                multiple={true}
                showUploadList={false}
            >
                {imageUrl ?
                    <div style={{ display: "flex", padding: "1em 2em", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                        <div style={{ width: "100px" }}>
                            <img src={imageUrl} style={{ objectFit: "contain", width: '100%' }} alt="avatar" />
                        </div>
                        <div>
                            <TickBold width="2em" height="2em" color="#2D9319" />
                        </div>
                    </div>

                    : uploadButton}
            </Upload>
        </div>
    );
};


export default ImageUpload






