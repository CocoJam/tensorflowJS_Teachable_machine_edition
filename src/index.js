import React from 'react';
import ReactDOM from 'react-dom';
import Dash from "./Dash.js"
// import wasmLoader from "../WASM/WASM/dlib.js";
// import wasm from "../WASM/WASM/dlib.wasm";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from '@tensorflow-models/mobilenet';
// const Module = wasmLoader({
//   locateFile(path) {
//     if(path.endsWith('.wasm')) {
//       return wasm;
//     }
//     return path;
//   }
// });

//32 bit hash
String.prototype.hashCode = function () {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
// 64 bit hash
// String.prototype.hashCode = function() {
// var i = this.length
// var hash1 = 5381
// var hash2 = 52711

// while (i--) {
//   const char = this.charCodeAt(i)
//   hash1 = (hash1 * 33) ^ char
//   hash2 = (hash2 * 33) ^ char
// }

// return (hash1 >>> 0) * 4096 + (hash2 >>> 0)
// };

// const wasmLoaded = wasmLoader().then(function (wasm) {
//   window.wasm = wasm;
//   var data = new Float64Array(10);
//   for (var i = 0; i < data.length; i++) {
//     data[i] = i;
//   }
//   console.log(data)
//   const m = new window.wasm.matrix(data, data.length/2, data.length/5);
//   console.log(m.veiw())
//   return wasm;
// })

const MOBILENET_MODEL_PATH =
  'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json';
const NetLoader = async () => {
  return await tf.loadModel(MOBILENET_MODEL_PATH);
}

var catEl = new Promise((resolve, reject) => {
  let image = new Image();
  image.onload = () => resolve(image);
  image.onerror = reject;
  image.crossOrigin = "anonymous";
  image.src = 'https://raw.githubusercontent.com/tensorflow/tfjs-examples/master/mobilenet/cat.jpg';
  image.width = 227;
  image.height = 227;
})
catEl.then((val) => {
  console.log(val)
  document.body.appendChild(val);
  const catImg = tf.fromPixels(val);
  console.log("cat")
  console.log(catImg);
  const topK = 5;
  // var mobilenet = NetLoader();
  mobilenet.load().then((Net)=>{
    console.log(Net)
    // predict(Net, val);
    const topK = 5;
    const result = Net.infer(catImg, 'conv_preds').flatten();
    console.log(result);
    const logits2d = result.div(result.norm()).expandDims(0);
    const dataset = {};
    dataset[1] = tf.keep(logits2d);
    console.log(dataset)
    // const text = predictions.then(prediction =>console.log(prediction));
  })
  // console.log(mobilenet)
  // .then((Net) => {
  //   console.log(Net)
  //   Net.predict(tf.zeros([1, val.height, val.width, 3])).dispose();
  //   Net.classify(catImg, topK).then((val2) => {
  //     const text = val2.map(prediction => {
  //       console.log(prediction.probability.toFixed(3) + ': ' + prediction.className)
  //     })
  //   })
  // })
})

async function predict(net , imgElement) {
  // status('Predicting...');

  const startTime = performance.now();
  const logits = tf.tidy(() => {
    // tf.fromPixels() returns a Tensor from an image element.
    const img = tf.fromPixels(imgElement).toFloat();

    const offset = tf.scalar(127.5);
    // Normalize the image from [0, 255] to [-1, 1].
    const normalized = img.sub(offset).div(offset);

    // Reshape to a single-element batch so we can pass it to predict.
    const batched = normalized.reshape([1, imgElement.height, imgElement.width, 3]);

    // Make a prediction through mobilenet.
    console.log("prediction")
    pre = net.predict(batched);
    console.log(pre)
    return pre;
  });

  // Convert logits to probabilities and class names.
  const classes = await getTopKClasses(logits, TOPK_PREDICTIONS);
  const totalTime = performance.now() - startTime;
  status(`Done in ${Math.floor(totalTime)}ms`);

  // Show the classes in the DOM.
  showResults(imgElement, classes);
}


ReactDOM.render(
  <div><Dash /></div>,
  document.getElementById('app')
);

module.hot.accept();