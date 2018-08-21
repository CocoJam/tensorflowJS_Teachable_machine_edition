import React from 'react';
import { RawHTML } from 'react-dom';
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from '@tensorflow-models/mobilenet';
import CardMedia from '@material-ui/core/CardMedia';


class VideoCam extends React.Component {
    constructor(props) {
        super(props);
        this.state = { model: null, VideoComponent: <div /> }
        this.NetWorkSetUp().then((Net) => {
            this.setState({ ...this.state, model: Net })
            this.cameraSetUp();
        })
    }

    NetWorkSetUp = async () => {
        return await mobilenet.load();
    }

    cameraSetUp() {
        navigator.getUserMedia = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;
        if (!navigator.getUserMedia) { return false; }
        const ctx = this.refs.canvas.getContext('2d');
        ctx.fillRect(0, 0, 100, 100);
        const video = document.createElement("video");
        video.setAttribute("autoplay", true);
        video.setAttribute("playsinline")
        console.log(video)
        var track;
        this.setState({ ...this.state, height: this.refs.canvas.height, width:this.refs.canvas.width,video: video, ctx: ctx, track: track });
        console.log(this.state.video);
        this.getWebcam(this.state.video, this.state.track);
        this.startAnimationLoop();
    }

    getWebcam = (video, track) => {
        return navigator.getUserMedia({ video: true, audio: false }, function (stream) {
            video.src = window.URL.createObjectURL(stream);
            track = stream.getTracks()[0];
        }, function (e) {
            console.error('Rejected!', e);
        });
    }

    animationLoop() {
        var loopFrame = requestAnimationFrame(this.animationLoop.bind(this));
        this.state.ctx.globalAlpha = 0.1;
        this.state.ctx.drawImage(this.state.video, 0, 0, this.state.height, this.state.width);
    }

    startAnimationLoop() {
        var loopFrame = loopFrame || requestAnimationFrame(this.animationLoop.bind(this));
    }

    render() {
        console.log("re-rendering")
        return (
            <canvas ref="canvas" width={300} height={300} />
        )
    }

}
export default VideoCam;