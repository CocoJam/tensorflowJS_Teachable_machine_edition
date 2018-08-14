var g_WebWorker = new Worker("worker_.js");
g_WebWorker.onerror = function (evt) {
    console.log(`Error from Web Worker: ${evt.message}`);
}
g_WebWorker.onmessage = function (evt) {
    alert(`Message from the Web Worker:\n\n ${evt.data}`);
}
g_WebWorker.postMessage({ "MessagePurpose": "AddValues", "Val1": 1, "Val2": 2 });

