

import { Modal } from 'antd';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import JavVid from "../../../assets/videos/javolin_video.mp4"
import JavVidOGG from "../../../assets/videos/javolin_video.ogg"
import JavVid_FR from "../../../assets/videos/javolin_video_fr.mp4"
import JavVidOGG_FR from "../../../assets/videos/javolin_video_fr.ogg"
import { PlayIcon } from '../JavIcons';
import "./VideoModal.css"



const VideoModal = () => {
    
    const [isVisible, setIsModalVisible] = useState(false)
    const vidRef = useRef(null);
    const lang = useSelector((state) => state.language?.selectedLang)

    
    const handlePauseVideo = () => {
      vidRef.current.pause();
    }
    const handleCancel = () => {
        setIsModalVisible(false)
        handlePauseVideo()
    }

   
    const showModal = () => {
        setIsModalVisible(true);
      };

    return (
        <>
            <div onClick={showModal} className="playBtn" >
                <PlayIcon/>
            </div>
            <Modal
                visible={isVisible}
                onCancel={handleCancel}
                footer={false}
                closable={false}
                style={{ width:"900px", top: 300, backgroundColor: "transparent", display: "flex", justifyContent: "center", alignContent: "center"}}
            >
                 <video ref={vidRef} width="500" controls>
                    <source src={lang === "EN" ? JavVid : JavVid_FR } type="video/mp4"></source>
                    <source src={lang === "EN" ? JavVidOGG: JavVidOGG_FR} type="video/ogg"></source>
                    Your browser does not support HTML video.
                </video>
            </Modal>
        </>
    )
}


export default VideoModal