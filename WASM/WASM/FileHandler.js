fileUploadHandling = async function (event) {
  
    if (!event.target || !event.target.files) {
        return;
    }
    const fileList = event.target.files;
    try {
        ListOfPromises=[]
        for(var i = 0 ; i<fileList.length; i++){
            ListOfPromises.push(parseUploadFile(fileList.item(i)));
        }
        Promise.all(ListOfPromises).then(function(values) {
            values.map(function(val){
                console.time();
                const uint8_t_arr = new Uint8Array(val)
                console.log(uint8_t_arr);
                const uint8_t_ptr = window.Module._malloc(uint8_t_arr.length);
                Module.HEAPU8.set(uint8_t_arr, uint8_t_ptr);
                Module.readFile(uint8_t_ptr, uint8_t_arr.length);
                const returnArr = new Uint8Array(uint8_t_arr.length);
                returnArr.set(window.Module.HEAPU8.subarray(uint8_t_ptr, uint8_t_ptr + uint8_t_arr.length));
                console.log(returnArr);
                Module._free(uint8_t_ptr);
                console.timeEnd();
                
                // window.val = val;
                // \d+(?=.(?=(?<=\.)\d+))
                // console.time();
                // val.split(/\n/g).map(val=> val.split(/\t/g))
                // console.timeEnd();
               if (val instanceof ArrayBuffer){
                    // var TypedArray = new Float64Array(val);
                    // console.log(TypedArray);
                    // Module._malloc(vak.length)
               }
               else{
                   console.log("Not array buffer")
               }
            })
            return values;
          });
    } catch (e) {
        console.log(e);
    }
};

parseUploadFile = function (inputFile) {
    const FR = new FileReader();
    console.log(inputFile)
   
    return new Promise((resolve, reject) => {
        FR.onerror = () => {
            FR.abort();
            reject(new DOMException("Problem parsing input file."));
        };

        FR.onload = () => {
            resolve(FR.result);
        };
        try{
        // if ( /\.(jpe?g|png|gif)$/i.test(inputFile.name) ){
        //     console.log("pic")
        //     FR.readAsDataURL(inputFile)
        // } 
        // else if(/\.(xlsx|csv)$/i.test(inputFile.name)){
        //     console.log("csv")
        //     FR.readAsArrayBuffer(inputFile)
        // }
        // else{
        //     FR.readAsBinaryString(inputFile)
        // }
        FR.readAsArrayBuffer(inputFile)
        // FR.readAsDataURL(inputFile)
    }
        catch (e){
            console.log(e);
            alert("formate not supported");
        }
    });
};