self.importScripts('dlib.js');
self.importScripts("http://d3js.org/d3.v5.min.js");
// self.importScripts("https://cdn.plot.ly/plotly-latest.min.js");
// console.log(d3)
self.onmessage = function (evt) {

    this.console.log(evt.data);

    if (evt.data.inputFile !== undefined) {
            console.log("start")
            this.console.time();
            // data = d3.csvParse(evt.data.inputFile[0], function (d) {
            //     var dataD3 = {};
            //     for (x in d) {
            //         dataD3[x] = parser(d[x])
            //     }
            //     // console.log("asd")
            //     return dataD3
            // });

            data=evt.data.inputFile[0].split("\n").map(function(val){
                return val.split(",").map(function(val2){
                    return parser(val2)
                })
            })
            this.console.timeEnd();
            this.console.log(data);
            self.postMessage({data:data})
    }
}
Module.addOnPostRun(() => {
    var data = new Float64Array(10);

    for (var i = 0; i < data.length; i++) {
        data[i] = i;
    }

    console.log(Module)
    m = new Module.matrix(data, 5, 2);
    console.log(m.loc(0, 0))
    console.log(m.loc(0, 1))
    console.log(m.loc(0, 2))
});

fileUploadHandling = async function (event) {
    if (!event.target || !event.target.files) {
        return;
    }
    const fileList = event.target.files;
    try {
        ListOfPromises = []
        for (var i = 0; i < fileList.length; i++) {
            ListOfPromises.push(parseUploadFile(fileList.item(i)));
        }
        Promise.all(ListOfPromises).then(function (values) {
            // values.map(function(val){
            //     console.log(d3)
            //     uint8(val);
            // });

            window.values = values.map(function (val) {
                console.log(d3)
                console.log(Plotly)
                console.time();
                window.data = Plotly.d3.csv.parse(val, function (d) {
                    var dataD3 = {};
                    for (x in d) {
                        dataD3[x] = parser(d[x])
                    }
                    return dataD3
                });
                // g_WebWorker.postMessage({matrix:window.data});
                console.timeEnd();

                return { matrix: data };
            })
        });
    } catch (e) {
        console.log(e);
    }
};

function parseUploadFile(inputFile) {
    const FR = new FileReader();
    return new Promise((resolve, reject) => {
        FR.onerror = () => {
            FR.abort();
            reject(new DOMException("Problem parsing input file."));
        };

        FR.onload = () => {
            resolve(FR.result);
        };
        try {
            FR.readAsBinaryString(inputFile)
        }
        catch (e) {
            console.log(e);
            alert("formate not supported");
        }
    });
};

function parser(val) {
    if (/^[\d%]+$/gm.test(val)) {
        if (/%/gm.test(val)) {
            return parseInt(val) / 100;
        }
        return parseInt(val)
    }
    else if (/\d+(?=.(?=(?<=\.)\d+)).[\d%]+$/gm.test(val)) {
        if (/%/gm.test(val)) {
            return parseFloat(val) / 100;
        }
        return parseFloat(val)
    }
    else {
        return val
    }
}

function uint8(val) {
    console.time("uint8")
    const uint8_t_arr = new Uint8Array(val)
    const uint8_t_ptr = window.Module._malloc(uint8_t_arr.length);
    Module.HEAPU8.set(uint8_t_arr, uint8_t_ptr);
    Module.readFile(uint8_t_ptr, uint8_t_arr.length);
    const returnArr = new Uint8Array(uint8_t_arr.length);
    returnArr.set(window.Module.HEAPU8.subarray(uint8_t_ptr, uint8_t_ptr + uint8_t_arr.length));
    Module._free(uint8_t_ptr);
    console.timeEnd("uint8");
    return returnArr;
}