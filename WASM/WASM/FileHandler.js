fileUploadHandling = async function (event) {
    if (!event.target || !event.target.files) {
        return;
    }
    const fileList = event.target.files;
    try {
        // var bt = window.btoa(fileList[0])
        // console.log(bt)
        // console.log(fileList[0].readAsArrayBuffer() )
        ListOfPromises=[]
        for(var i = 0 ; i<fileList.length; i++){
            ListOfPromises.push(parseUploadFile(fileList.item(i)));
        }
        Promise.all(ListOfPromises).then(function(values) {
            // console.log(values);
            return values
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
        if ( /\.(jpe?g|png|gif)$/i.test(inputFile.name) ){
            readas = FR.readAsArrayBuffer(inputFile)
        } 
        else{
            readas =  FR.readAsDataURL(inputFile)
        }
    });
};