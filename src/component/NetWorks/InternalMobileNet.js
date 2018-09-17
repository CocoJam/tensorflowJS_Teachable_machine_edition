import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from "@tensorflow/tfjs";
import {loadFrozenModel} from '@tensorflow/tfjs-converter';

export const tensorflowMobileNet = async () => {
    return await mobilenet.load();
}
export const tensorflowMobileNet_v_1_0_25 = async () => {
    return await tf.loadModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');
}

export const tensorflowMobileNet_v_1_0_25_transferLearning = async () => {
    const model = await tf.loadModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');
    const layer = model.getLayer('conv_pw_13_relu');
    console.log(layer)
    return tf.model({ inputs: model.inputs, outputs: layer.output });
}

export const tensorflowMobileMobilenet_v1_1_0_224_transferLearning = async () => {
    const model = await tf.loadModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');
    const layer = model.getLayer('conv_pw_13_relu');
    console.log(layer)
    return tf.model({ inputs: model.inputs, outputs: layer.output });
}

export const TansferkerasModelGenerator = (inputShape, unitsList, learningRate, outputShape, outputActivation) => {
    console.log(unitsList)
    if (inputShape[0] === null) {
        var clonedArray = [...inputShape];
        clonedArray.shift();
    }
    console.log(inputShape)
    const tfModel = { layers: [tf.layers.flatten({ inputShape: clonedArray })] }
    unitsList.map(val => {
        console.log(val)
        tfModel.layers.push(tf.layers.dense({
            units: val,
            activation: 'relu',
            kernelInitializer: 'varianceScaling',
            useBias: true
        }))
    })

    tfModel.layers.push(tf.layers.dense({
        units: outputShape,
        kernelInitializer: 'varianceScaling',
        useBias: false,
        activation: outputActivation
    }))
    console.log(tfModel)
    const model = tf.sequential(tfModel)
    const optimizer = tf.train.adam(learningRate);
    model.compile({ optimizer: optimizer, loss: 'categoricalCrossentropy' });
    return model;
}

export const tensorflowMobileNetCoCo =async ()=>{
    const MODEL_URL = 'https://storage.googleapis.com/tfjs-models/savedmodel/coco-ssd-mobilenet_v1/tensorflowjs_model.pb';
    const WEIGHTS_URL = 'https://storage.googleapis.com/tfjs-models/savedmodel/coco-ssd-mobilenet_v1/weights_manifest.json';
    const model = await loadFrozenModel(MODEL_URL, WEIGHTS_URL);
    return model;
}

export const tensorflowCoCo =async ()=>{
    const MODEL_URL = 'https://storage.googleapis.com/tfjs-models/savedmodel/coco-ssd/tensorflowjs_model.pb';
    const WEIGHTS_URL = 'https://storage.googleapis.com/tfjs-models/savedmodel/coco-ssd/weights_manifest.json';
    const model = await loadFrozenModel(MODEL_URL, WEIGHTS_URL);
    return model;
}


export const CNNkerasModelGenerator = (inputShape, unitsList, learningRate, outputShape, outputActivation) => {
    console.log(unitsList)
    if (inputShape[0] === null) {
        var clonedArray = [...inputShape];
        clonedArray.shift();
    }
    console.log(inputShape)

    const tfModel = { layers: [] }
    tfModel.layers.push(tf.layers.conv2d({
        inputShape: inputShape,
        kernelSize: 3,
        filters: 3,
        strides: 1,
        activation: 'relu',
        kernelInitializer: 'VarianceScaling'
    }));
    tfModel.layers.push(tf.layers.flatten({ inputShape: clonedArray }))
    unitsList.map(val => {
        console.log(val)
        tfModel.layers.push(tf.layers.dense({
            units: val,
            activation: 'relu',
            kernelInitializer: 'varianceScaling',
            useBias: true
        }))
    })

    tfModel.layers.push(tf.layers.dense({
        units: outputShape,
        kernelInitializer: 'varianceScaling',
        useBias: false,
        activation: outputActivation
    }))
    console.log(tfModel)
    const model = tf.sequential(tfModel)
    const optimizer = tf.train.adam(learningRate);
    model.compile({ optimizer: optimizer, loss: 'categoricalCrossentropy' });
    return model;
}