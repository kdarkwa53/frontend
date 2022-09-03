import React, { useEffect, useState } from "react";

import "./Selfie.css";
import {Modal} from "antd"
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { TickBold } from "../../../JavIcons";


const Selfie = ({ idImage, selfie, setImgState})=> {
    const [visible, setVisible] = useState(false);
   

    const videoEle = React.createRef();
    const canvasEle = React.createRef();
    const imageEle = React.createRef();

    useEffect(()=>{
        startCamera()
    })
    

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "environment" }
            });

            if (videoEle.current) {
                videoEle.current.srcObject = stream;
            }
        } catch (err) {
            console.log(err);
        }
    };

    const takeSelfie = async () => {
        // Get the exact size of the video element.
        const width = videoEle.current.videoWidth;
        const height = videoEle.current.videoHeight;

        // get the context object of hidden canvas
        const ctx = canvasEle.current.getContext("2d");

        // Set the canvas to the same dimensions as the video.
        canvasEle.current.width = width;
        canvasEle.current.height = height;

        // Draw the current frame from the video on the canvas.
        ctx.drawImage(videoEle.current, 0, 0, width, height);

        // Get an image dataURL from the canvas.
        const imageDataURL = canvasEle.current.toDataURL("image/png");
        stopCam();

        setImgState(imageDataURL
        )
    };

    const stopCam = () => {
        const stream = videoEle?.current?.srcObject;
        const tracks = stream?.getTracks();

        tracks?.forEach((track) => {
            track?.stop();
        });
    };

   const  backToCam = () => {
       setImgState("")
       startCamera()
    };

    const showModal=()=>{
        setVisible(true)
    }

    const handleCancel=()=>{
        stopCam()
        setVisible(false)
       
    }

    const uploadButton = (
        <div style={{ display: "flex", justifyContent: "center", width:"100%", flexDirection:"column", alignItems: "center" }} >
            {false ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Tap to add a selfie</div>
        </div>
    )

        return (
            <>
                <div onClick={idImage ? showModal : null} style={{ padding: "0 2em", display: "flex", alignItems: "center", cursor: idImage ? "pointer" : "not-allowed"}} className='ant-upload ant-upload-select ant-upload-select-picture-card'>
                    {selfie ?
                        <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                            <div style={{ width: "100px" }}>
                                <img src={selfie} style={{ objectFit: "contain", width: '100%'  }} alt="avatar"/>
                            </div>
                            <div>
                                <TickBold width="2em" height="2em" color="#2D9319" />
                            </div>

                        </div> 
                         : uploadButton}
                </div>
            <Modal
                visible={visible}
                footer={false}
                closable={false}
                onCancel={handleCancel}>

                <div className="selfie">
                    {selfie === "" && (
                        <div className="cam">
                            <video
                                width="100%"
                                height="100%"
                                className="video-player"
                                autoPlay={true}
                                ref={videoEle}
                            ></video>
                            <button className="btn capture-btn" onClick={takeSelfie}>
                                <i className="fa fa-camera" aria-hidden="true"></i>
                            </button>
                        </div>
                    )}

                    <canvas ref={canvasEle} style={{ display: "none" }}></canvas>
                    {selfie !== "" && (
                        <div className="preview">
                            <img
                                alt="cam"
                                className="preview-img"
                                src={selfie}
                                ref={imageEle}
                            />

                            <div className="btn-container">
                                <button className="btn back-btn" onClick={backToCam}>
                                    <i className="fa fa-trash" aria-hidden="true"></i>
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="btn download-btn"
                                >
                                    <i className="fa fa-check" aria-hidden="true"></i>
                                    </button>
                            </div>
                        </div>
                    )}
                </div>
            </Modal>
            </>
        );
}

export default Selfie;
