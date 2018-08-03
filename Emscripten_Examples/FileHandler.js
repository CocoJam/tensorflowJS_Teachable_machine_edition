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
            console.log(values);
            return values
          });
    } catch (e) {
        console.log(e);
    }
};

parseUploadFile = function (inputFile) {
    const FR = new FileReader();
    return new Promise((resolve, reject) => {
        FR.onerror = () => {
            FR.abort();
            reject(new DOMException("Problem parsing input file."));
        };

        FR.onload = () => {
            resolve(FR.result);
        };
        FR.readAsText(inputFile);
    });
};