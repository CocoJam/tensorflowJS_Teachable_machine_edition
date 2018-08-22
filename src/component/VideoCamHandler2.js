import React from 'react';
import * as tf from "@tensorflow/tfjs";
import { tensorflowMobileNet, tensorflowMobileNet_v_1_0_25_transferLearning, TansferkerasModelGenerator, CNNkerasModelGenerator } from "./NetWorks/InternalMobileNet";
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import GestureCard from "./Gesture/GestureCard";
import AndroidIcon from '@material-ui/icons/Android';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';


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
        tensorflowMobileNet_v_1_0_25_transferLearning().then((Net) => {

            console.log(Net);
            console.log(Net.feedInputShapes[0][1])
            console.log(Net.feedInputShapes[0][2])
            this.setState({ ...this.state, model: Net })
            this.cameraSetUp();
            // tf.tidy(() => Net.predict(this.capture()));
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
        video.setAttribute("height", this.state.model.feedInputShapes[0][1])
        video.setAttribute("width", this.state.model.feedInputShapes[0][2])
        this.setState({ ...this.state, height: this.refs.canvas.height, width: this.refs.canvas.width, video: video, ctx: ctx });
        this.getWebcam(this.state.video);
        this.startAnimationLoop();

    }

    getWebcam = (video) => {
        return navigator.getUserMedia({ video: true, audio: false }, function (stream) {
            video.src = window.URL.createObjectURL(stream);
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
            // console.time("pix")
            const webcamImage = tf.fromPixels(this.state.video);
            const resizedImage = tf.image.resizeBilinear(webcamImage, [224, 224])
            const batchedImage = resizedImage.expandDims(0);
            // console.timeEnd("pix")
            return batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
            // return batchedImage;
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
            this.state.images.push(this.capture());
            // const result = tf.tidy(() => {
            //     console.log("retraining??")
            //     const cap = this.capture();
            //     console.log(cap.shape);
            //     console.log(this.state.model);
            //     var re = this.state.model.predict(cap);
            //     console.log("re ")
            //     return re
            // })
            // this.state.images.push(result);
            this.state.labels.push(label)
            const classNum = (new Set(this.state.labels)).size;
            if (classNum >= 2 && this.state.trainedModel === null && this.state.trainButton === null) {
                console.log("rendering train button")
                this.setState({
                    ...this.state, labels: this.state.labels, trainButton: this.trainButton()
                })
                return;
            }
        }
        console.log("capp")
        // console.log(this.state.images)
    }


    AdditionalLabel() {
        const label = <GestureCard title="Label" actionSet={[]} record={this.predictCurrent.bind(this, this.state.labelButtons.length)} />
        // const label = <GestureCard title="Label" actionSet={[]} record={this.predictCurrent.bind(this, this.state.labelButtons.length)} />

        this.state.labelButtons.push(label);
        // console.log(labelList)
        const classNum = (new Set(this.state.labels)).size;
        // console.log(this.state.labelButtons.size)
        this.setState({ ...this.state, labelButtons: this.state.labelButtons })
    }

    setUpTrain = () => {
        console.log("set up training")
        const trainingPromise = this.Train();

        // this.setState({ ...this.state, trainButton: null })
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

            const model = CNNkerasModelGenerator([this.state.video.height,this.state.video.width,3], [50], 0.0001, classNum, "softmax")
            const imageInput = tf.concat2d(this.state.images);
            console.log(imageInput.shape[0])
            var batchSize =  Math.floor(imageInput.shape[0] * 0.4);
            console.log(batchSize)
            if(batchSize < 2){
                batchSize = imageInput.shape[0]
            }
            const epochs = 20;
            console.time("training")
            // console.log(oneHot);

            // await model.fit(results, oneHot, {
            await model.fit(imageInput, oneHot, {
                batchSize,
                epochs: epochs,
                callbacks: {
                    onBatchEnd: async (batch, logs) => {
                        console.log(logs.loss.toFixed(5))
                        // await tf.nextFrame();
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
                const predictions = this.state.trainedModel.predict(img);
                return  predictions.as1D().argMax();;
            });

            const classId = (await predictedClass.data())[0];
            console.log(classId)
            console.timeEnd("transfer")
            
            predictedClass.dispose();

            await tf.nextFrame();
        }
    }

    stop = () => {
        this.setState({ ...this.state, predict: false , stopButton:null, predictionButton: this.predictionButton() })
    }

    render() {
        return (
            <div>
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