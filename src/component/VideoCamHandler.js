import React from 'react';
import { RawHTML } from 'react-dom';
import * as tf from "@tensorflow/tfjs";
import { tensorflowMobileNet, tensorflowMobileNet_v_1_0_25_transferLearning, TansferkerasModelGenerator } from "./NetWorks/InternalMobileNet";
import CardMedia from '@material-ui/core/CardMedia';
import AssignLabel from "./Gesture/AssignLabel";
import Controler from "./DataSetControler/DataDrivenControler"

const mobilenet_v_1_0_25 = 'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json';

class VideoCam extends React.Component {
    constructor(props) {
        super(props);
        this.state = { model: null, VideoComponent: <div /> }
        tensorflowMobileNet_v_1_0_25_transferLearning().then((Net) => {
            const dataDrivenControl = new Controler(0);
            this.setState({ ...this.state, model: Net, controler: dataDrivenControl })
            this.cameraSetUp();
            tf.tidy(() => Net.predict(this.capture()));
        })
    }

    cameraSetUp() {
        navigator.getUserMedia = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;
        if (!navigator.getUserMedia) { return false; }
        const ctx = this.refs.canvas.getContext('2d');
        ctx.fillRect(0, 0, this.refs.canvas.height, this.refs.canvas.width);
        const video = document.createElement("video");
        video.setAttribute("autoplay", true);
        var track;
        this.setState({ ...this.state, height: this.refs.canvas.height, width: this.refs.canvas.width, video: video, ctx: ctx, track: track });
        this.getWebcam(this.state.video, this.state.track);
        this.startAnimationLoop();

    }

    getWebcam = (video, track) => {
        return navigator.getUserMedia({ video: true, audio: false }, function (stream) {
            video.src = window.URL.createObjectURL(stream);
            // track = stream.getTracks()[0];
        }, function (e) {
            console.error(e);
        });
    }

    animationLoop() {
        var loopFrame = requestAnimationFrame(this.animationLoop.bind(this));
        // this.state.ctx.globalAlpha = 0.1;
        this.state.ctx.drawImage(this.state.video, 0, 0, this.state.height, this.state.width);
        this.state.ctx.restore();
    }

    startAnimationLoop() {
        // setInterval(this.animationLoop.bind(this), 1000);
        var loopFrame = loopFrame || requestAnimationFrame(this.animationLoop.bind(this));
    }

    capture() {
        
        return tf.tidy(() => {
            const webcamImage = tf.fromPixels(this.refs.canvas);
            const resizedImage = tf.image.resizeBilinear(webcamImage, [224, 224])
            const batchedImage = resizedImage.expandDims(0);
            return batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
        });
    }

    predictCurrent(){
        if(this.state.model !== null){
            tf.tidy(() => this.state.controler.addExample(this.state.model.predict(this.capture()), 2));
        }
    }


    render() {
        
        return (
            <div>
                {/* <video ref="video" playsinline autoPlay/> */}
                <canvas ref="canvas" width={this.props.width} height={this.props.height} />
                <AssignLabel action={this.predictCurrent.bind(this)}/>
            </div>
        )
    }

}
export default VideoCam;