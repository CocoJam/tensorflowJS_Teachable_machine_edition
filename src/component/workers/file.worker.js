import { readAsBinaryString, fileContentParse, stringHashing, isNumeric, flattenedNum } from "../FileHandler/FileReader"
// import Scatter from "../Charts/Scatter";
// import Pie from "../Charts/Pie";
var currentValues = null;
self.addEventListener('message', (event) => {
  console.log("received")
  console.log(event.data)
  if (event.data.file !== undefined) {
    const fileContents = readAsBinaryString(event.data.file).then(val => {
      return fileContentParse(val);
    }).then(val => {
      console.log(val);
      currentValues = val
      self.postMessage({ data: val });
    });
  }else if(event.data.charts !== undefined){

  //   const box = [];
  //   const pie = event.data.charts.types.map(val => {
  //     if (Object.values(val)[0] === "string" || Object.values(val)[0] === "time" || Object.values(val)[0] === "date") {
  //         return Object.keys(val);
  //     }
  //     else{
  //         box.push(Object.keys(val));
  //     }
  // }).filter(val=> val!==undefined)
  
  // const pieChart =pie.map(type=><Pie type={type} cxt={event.data.charts.cxt}/>);
  // const layout = [];
  // for(var i = 0; i<box.length; i++){
  //     for(var j = 0; j<box.length; j++){
  //             layout.push([ box[i],box[j]])
  //     }
  // }
  
  // const scatterChart = layout.map(type=><Scatter type={type}  cxt={event.data.charts.cxt}/>)
  }
})
console.log("asd")
