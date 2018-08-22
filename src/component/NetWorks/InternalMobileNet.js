import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from "@tensorflow/tfjs";
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

export const TansferkerasModelGenerator = (inputShape, unitsList, learningRate, outputShape, outputActivation) => {
    tfModel = { layers: [tf.layers.flatten({ inputShape: inputShape })] }
    for (var i = 0; i < unitsList.size; i++) {
        tfModel.layers.push(tf.layers.dense({
            units: unitsList[i],
            activation: 'relu',
            kernelInitializer: 'varianceScaling',
            useBias: true
        }))
    }
    tfModel.layers.push(tf.layers.dense({
        units: outputShape,
        kernelInitializer: 'varianceScaling',
        useBias: false,
        activation: outputActivation
    }))
    const model = tf.sequential(tfModel)
    const optimizer = tf.train.adam(learningRate);
    model.compile({ optimizer: optimizer, loss: 'categoricalCrossentropy' });
    return model;
}