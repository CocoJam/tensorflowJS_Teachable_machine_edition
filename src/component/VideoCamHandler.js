import React from 'react';
import * as tf from "@tensorflow/tfjs";
import { tensorflowMobileNet, tensorflowMobileMobilenet_v1_1_0_224_transferLearning, tensorflowMobileNet_v_1_0_25_transferLearning, TansferkerasModelGenerator } from "./NetWorks/InternalMobileNet";
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import GestureCard from "./Gesture/GestureCard";
import AndroidIcon from '@material-ui/icons/Android';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';

var mediaRecorder = null;
//This is the Video Cam/ web cam handler which is a tied in with using tensorflow similar to the tensorflowjs' teachable mechaine.
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
        this.state = {
            model: null, VideoComponent: <div />,
            audioChucks: [], images: [], labels: [], labelButtons: [],
            trainButton: null, predictionButton: null, stopButton: null,
            trainedModel: null, predict: false
        }
        //Setting up the Mobile net model, which is pinged from the google storage.
        tensorflowMobileMobilenet_v1_1_0_224_transferLearning().then((Net) => {
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

    //Using WebRTC to set up camera and audio context to record audio.
    cameraSetUp() {
        //Checking the navigator such as depending on what naviagtor each browser is using that different methods are used to get WebRTC.
        navigator.getUserMedia = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;
        if (!navigator.getUserMedia) { return false; }
        //Getting the canvas context for drawing on to the canvas
        const ctx = this.refs.canvas.getContext('2d');
        //A black rect to cover init time before init the video stream
        ctx.fillRect(0, 0, this.refs.canvas.height, this.refs.canvas.width);
        //Creating the video html element in order to allow streaming from the camera into the video htmlelement
        const video = document.createElement("video");
        video.setAttribute("height", this.refs.canvas.height)
        video.setAttribute("width", this.refs.canvas.width)
        //Creating audio nodes for Audiocontext, which this is the first init node.
        var audioCtx = new AudioContext();
        this.getWebcam(video, audioCtx);
        //Creating the audio destinaction node and connecting them up from the init node.
        var dest = audioCtx.createMediaStreamDestination();
        dest.connect(audioCtx.destination);
        window.video  = video
        this.setState({ ...this.state, audioMediaStreamDestination: dest, height: this.refs.canvas.height, width: this.refs.canvas.width, video: video, ctx: ctx });
        this.startAnimationLoop();
    }

    //Please read WebRTC for more information about using these methods below.
    getWebcam = (video, audioCtx) => {
        navigator.getUserMedia({
            video: true, audio: {
                optional: [],
                mandatory: {
                    googEchoCancellation: true
                }
            }
        }, function (stream) {
            //Grabbing the stream and creating the blob to attach it into the Video element to create video streaming
            video.src = window.URL.createObjectURL(stream);
            //Event of video on load and play and muting it to prevent audio leak to futher audio recording
            video.onloadedmetadata = function (e) {
                video.play();
                video.muted = true;
            };
            //Attaching the audio stream to the init audio node to create recording and passing through the connected nodes to create filtered noise.
            var source = audioCtx.createMediaStreamSource(stream);
            var biquadFilter = audioCtx.createBiquadFilter();
            biquadFilter.type = "lowshelf";
            biquadFilter.frequency.value = 1000;

            source.connect(biquadFilter);
            biquadFilter.connect(audioCtx.destination);
        }, function (e) {
            console.error(e);
        });
    }

    //Animation loop for repainting the canvas and 
    animationLoop() {
        //Requesting animation frame for taking the advantage of the single ui thread through async proto.
        var loopFrame = requestAnimationFrame(this.animationLoop.bind(this));
        //Drawing the current instance of video stream source, as an image into the canvas by using the associated canvas context.
        this.state.ctx.drawImage(this.state.video, 0, 0, this.state.height, this.state.width);
        // let frame = this.state.ctx.getImageData(0, 0, this.state.width, this.state.height);
        this.state.ctx.restore();
    }

    startAnimationLoop() {
        var loopFrame = loopFrame || requestAnimationFrame(this.animationLoop.bind(this));
    }

    //Capturing method for using the tensorflow and current camera to create the input pixel values as input features into CNN.
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

    //Predicting at this instance based on the current model, which is the mobile net for feature extraction and custom net for inferencing.
    predictCurrent(label) {
        if (this.state.model !== null) {
            // this.state.images.push(this.capture());
            const result = tf.tidy(() => {
                const cap = this.capture();
                //Using mobile net to inference for feature extraction.
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

        const label = <GestureCard key={this.state.labelButtons.length} title="Label" audioMediaStreamDestination={this.state.audioMediaStreamDestination} actionSet={[]} record={this.predictCurrent.bind(this, this.state.labelButtons.length)} />
        this.state.labelButtons.push(label);
        const classNum = (new Set(this.state.labels)).size;
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

    //Using saved input features and associated assigned label data for training, which 
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
            var batchSize = Math.floor(imageInput.shape[0] * 0.4);
            if (batchSize < 2) {
                batchSize = imageInput.shape[0]
            }
            const epochs = 50;
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
                const img = this.capture();
                const activation = this.state.model.predict(img);
                const predictions = this.state.trainedModel.predict(activation);
                return predictions.as1D().argMax();
            });
            const classId = (await predictedClass.data());
            console.log(classId)
            predictedClass.dispose();
            await tf.nextFrame();
        }
    }

    stop = () => {
        this.setState({ ...this.state, predict: false, stopButton: null, predictionButton: this.predictionButton() })
    }

    render() {
        return (
            <div>
                <canvas ref="canvas" width={this.props.width} height={this.props.height} />
                {this.state.labelButtons.map(val => val)}
                <Button variant="fab" color="primary" aria-label="Add" onClick={this.AdditionalLabel.bind(this)}>
                    <AddIcon />
                </Button>
                {this.state.trainButton}
                {this.state.predictionButton}
                {this.state.stopButton}
            </div>
        )
    }

}
export default VideoCam;