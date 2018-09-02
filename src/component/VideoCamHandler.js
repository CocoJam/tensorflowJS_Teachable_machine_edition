import React from 'react';
import * as tf from "@tensorflow/tfjs";
import { tensorflowMobileNet, tensorflowMobileMobilenet_v1_1_0_224_transferLearning, tensorflowMobileNet_v_1_0_25_transferLearning, TansferkerasModelGenerator } from "./NetWorks/InternalMobileNet";
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import GestureCard from "./Gesture/GestureCard";
import AndroidIcon from '@material-ui/icons/Android';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import { ceil } from '@tensorflow/tfjs';


class VideoCam extends React.Component {
    trainButton = () => <Button variant="fab" color="primary" aria-label="Add" onClick={this.setUpTrain.bind(this)}>
        <AndroidIcon />
    </Button>

    predictionButton = () => <Button variant="fab" color="primary" aria-label="Add" onClick={this.prediction}>
        <PeopleIcon />
    </Button>

    stopButton = () => <Button variant="fab" color="primary" aria-label="Add" onClick={this.stop}>
        <DashboardIcon />
    </Button>

    constructor(props) {
        super(props);
        this.state = { model: null, VideoComponent: <div />, images: [], labels: [], labelButtons: [], trainButton: null, predictionButton: null, stopButton: null, trainedModel: null, predict: false }
        tensorflowMobileMobilenet_v1_1_0_224_transferLearning().then((Net) => {

            console.log(Net);
            console.log(Net.feedInputShapes[0][1])
            console.log(Net.feedInputShapes[0][2])
            this.setState({ ...this.state, model: Net })
            this.cameraSetUp();
            // tf.tidy(() => Net.predict(this.capture()));
        })
    }

    handleCVEvent = (event) => {
        console.log(event)
    }

    componentDidMount = () => {
        window.addEventListener('cv', this.handleCVEvent.bind(this));
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
        video.setAttribute("height", this.refs.canvas.height)
        video.setAttribute("width", this.refs.canvas.width)
        video.setAttribute("muted", true)
        // video.muted = true;
        const audio = document.createElement("audio");
        const stream = this.getWebcam(video,audio);
        // stream.then(val => console.log(val))
        this.setState({ ...this.state, stream: stream, audio: audio, height: this.refs.canvas.height, width: this.refs.canvas.width, video: video, ctx: ctx });
        this.startAnimationLoop();

    }

    getWebcam = (video, audio) => {
        return navigator.getUserMedia({
            video: true
        }, function (stream) {
            video.src = window.URL.createObjectURL(stream);
            audio.src = window.URL.createObjectURL(stream);
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
            const webcamImage = tf.fromPixels(this.state.video);
            const resizedImage = tf.image.resizeBilinear(webcamImage, [224, 224])
            const batchedImage = resizedImage.expandDims(0);
            return batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
        });
    }

    // predictCurrent(label) {
    //     console.log("cap")
    //     if (this.state.model !== null) {
    //         this.state.images.push(this.capture());
    //         this.state.labels.push(label)
    //         const classNum = (new Set(this.state.labels)).size;
    //         if (classNum >= 2 && this.state.trainedModel === null && this.state.trainButton === null) {
    //             console.log("rendering train button")
    //             this.setState({
    //                 ...this.state, labels: this.state.labels, trainButton: <Button variant="fab" color="primary" aria-label="Add" onClick={this.setUpTrain.bind(this)}>
    //                     <AndroidIcon />
    //                 </Button>
    //             })
    //             return;
    //         }
    //     }
    //     console.log("capp")
    //     // console.log(this.state.images)
    // }

    predictCurrent(label) {
        console.log("cap")
        if (this.state.model !== null) {
            // this.state.images.push(this.capture());
            const result = tf.tidy(() => {
                const cap = this.capture();
                var re = this.state.model.predict(cap);
                return re
            })
            this.state.images.push(result);
            this.state.labels.push(label)
            const classNum = (new Set(this.state.labels)).size;
            if (classNum >= 2 && this.state.trainedModel === null && this.state.trainButton === null) {
                this.setState({
                    ...this.state, labels: this.state.labels, trainButton: this.trainButton()
                })
                return;
            }
        }
    }


    AdditionalLabel() {
        const label = <GestureCard key={this.state.labelButtons.length} title="Label" actionSet={[]} record={this.predictCurrent.bind(this, this.state.labelButtons.length)} />
        this.state.labelButtons.push(label);
        // console.log(labelList)
        const classNum = (new Set(this.state.labels)).size;
        // console.log(this.state.labelButtons.size)
        this.setState({ ...this.state, labelButtons: this.state.labelButtons })
    }

    setUpTrain = () => {
        console.log("set up training")
        const trainingPromise = this.Train();
        console.log("train async")
        trainingPromise.then((model) => {
            this.setState({
                ...this.state, predict: true, trainedModel: model, predictionButton: this.predictionButton()
            })
            console.log(model);
        })
    }

    Train = async () => {
        if (this.state.model !== null) {
            //Memory leak it too many samples....
            //need to find some middle ground to do nextFrame and dispose the memory
            // var results = tf.tidy(() => {
            //     var re = this.state.model.predictOnBatch(tf.concat2d(this.state.images));
            //     tf.nextFrame();
            //     return re
            // })
            const classNum = (new Set(this.state.labels)).size;
            const oneHot = tf.tidy(() => tf.oneHot(tf.tensor1d(this.state.labels).toInt(), classNum));

            const model = TansferkerasModelGenerator(this.state.model.outputShape, [100, 50], 0.0001, classNum, "softmax")
            const imageInput = tf.concat2d(this.state.images);
            console.log(imageInput.shape[0])
            var batchSize = Math.floor(imageInput.shape[0] * 0.4);
            console.log(batchSize)
            if (batchSize < 2) {
                batchSize = imageInput.shape[0]
            }
            const epochs = 50;
            console.time("training")
            // console.log(oneHot);

            // await model.fit(results, oneHot, {
            await model.fit(imageInput, oneHot, {
                batchSize,
                epochs: epochs,
                callbacks: {
                    onBatchEnd: async (batch, logs) => {
                        console.log(logs.loss.toFixed(5))
                        await tf.nextFrame();
                    }
                }
            });
            console.timeEnd("training")
            console.log("done");
            // this.state.images = [];
            imageInput.dispose();
            return model;
        }
    }

    prediction = async () => {
        this.setState({
            ...this.state, predictionButton: null, stopButton: this.stopButton()
        })
        while (this.state.predict) {

            const predictedClass = tf.tidy(() => {
                console.time("cap")
                const img = this.capture();
                console.timeEnd("cap")
                console.time("mob")
                const activation = this.state.model.predict(img);
                console.timeEnd("mob")
                console.time("transfer")
                const predictions = this.state.trainedModel.predict(activation);
                return predictions.as1D().argMax();;
            });

            const classId = (await predictedClass.data())[0];
            console.log(classId)
            console.timeEnd("transfer")

            predictedClass.dispose();

            await tf.nextFrame();
        }
    }

    stop = () => {
        this.setState({ ...this.state, predict: false, stopButton: null, predictionButton: this.predictionButton() })
    }
    handleAudio = () => {
        // console.log(this.state.stream)
        console.log(this.state.video.audioTracks);
        this.state.audio.play();    
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleAudio}>audio</Button>
                <canvas ref="canvas" width={this.props.width} height={this.props.height} />
                {this.state.labelButtons.map(val => val)}
                <Button variant="fab" color="primary" aria-label="Add" onClick={this.AdditionalLabel.bind(this)}>
                    <AddIcon />
                </Button>
                {/* <div className={classes.root}>
                    <LinearProgress variant="buffer" value={completed} valueBuffer={buffer} />
                    <br />
                    <LinearProgress color="secondary" variant="buffer" value={completed} valueBuffer={buffer} />
                </div> */}
                {this.state.trainButton}
                {this.state.predictionButton}
                {this.state.stopButton}
            </div>
        )
    }

}
export default VideoCam;