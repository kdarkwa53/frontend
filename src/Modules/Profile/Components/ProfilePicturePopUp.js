
import { Modal, Avatar, Upload, message } from "antd"
import { useState } from "react"
import Styles from "../Profile.module.css"
import { LoadingOutlined } from '@ant-design/icons';
import { getUserType, REACT_APP_BASE_API_URL, REACT_APP_CUSTOMER_SERVICE_API_URL } from "../../../helpers/contants";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { updateProfilePicture } from "../../Login/duck/action";


const ProfilePicturePopUp = ({ showPic, setShowPic }) => {
    const text = useSelector((state) => state?.language)

    const accessToken = Cookies.get("javAccessToken");
    const dispatch = useDispatch()

    const handleCancel = () => {
        setShowPic(false)
    }

    const image = useSelector((state) => state?.user?.image_url)

    const [state, setPicState] = useState({
        loading: false,
        imageUrl: image,
    })



    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setPicState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            dispatch(updateProfilePicture(info.file.response.url))
            getBase64(info.file.originFileObj, imageUrl => {
                setPicState({
                    imageUrl,
                    loading: false,
                })
            }
            );
        }
    };

    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng
    }

    const userType = getUserType()

    const props = {
        listType:"text",
        name:"file",
        action:`${REACT_APP_BASE_API_URL}/${userType}/profile_picture/update`,
        headers: {
            "Authorization": `Bearer ${accessToken}`,
        }
    }

    return (
        <Modal
            visible={showPic}
            className={Styles.popupModals}
            style={{ top: "20%", borderRadius: '40px' }}
            footer={false}
            closable={false}
            onCancel={handleCancel}>
            <Upload
                {...props}
                onChange={handleChange}
                beforeUpload={beforeUpload}
            >
                <Avatar
                    size={{ xs: 120, sm: 120, md: 150, lg: 150, xl: 100, xxl: 400 }}
                    src={state.imageUrl}
                    style={{
                        backgroundColor: '#0032A0',
                        margin: '2em',
                    }}
                >
                    <div>
                        {state.loading ? <LoadingOutlined /> :
                            image ? state.imageUrl :
                                <span style={{ fontSize: "23px", fontWeight: "bold" }}>KT</span>
                        }
                    </div>
                </Avatar>
                <h3 className={Styles.changeProfile}>{text.CHANGE_PROFILE_PIC}</h3>
            </Upload>
        </Modal>
    )
}

export default ProfilePicturePopUp