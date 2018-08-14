fileUploadHandling = async function (event) {
    if (!event.target || !event.target.files) {
        return;
    }
    const fileList = event.target.files;
    try {
        parseUploadFile(fileList.item(0))
        ListOfPromises = []
        for (var i = 0; i < fileList.length; i++) {
            ListOfPromises.push(parseUploadFile(fileList.item(i)));
        }
        Promise.all(ListOfPromises).then(function (values) {
            // values.map(function(val){
            //     console.log(d3)
            //     uint8(val);
            // });
            // g_WebWorker.postMessage({inputFile:values})
            window.values = values.map(function (val) {
                console.log(d3)
                console.log(Plotly)
                console.time();
                d3.select("body").append("div")
                    .attr("id", "container")

                d3.select("#container").append("div")
                    .attr("id", "FilterableTable");

                d3.select("#FilterableTable").append("h1")
                    .attr("id", "title")
                    .text("My Youtube Channels")

                d3.select("#FilterableTable").append("div")
                    .attr("class", "SearchBar")
                    .append("p")
                    .attr("class", "SearchBar")
                    .text("Search By Title:");

                d3.select(".SearchBar")
                    .append("input")
                    .attr("class", "SearchBar")
                    .attr("id", "search")
                    .attr("type", "text")
                    .attr("placeholder", "Search...");

                var table = d3.select("#FilterableTable").append("table");
                table.append("thead").append("tr");

                window.data = d3.csvParse(val, function (d) {
                    table.append("tbody")

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

parseUploadFile = function (inputFile) {
    // g_WebWorker.postMessage({inputFile: inputFile});
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