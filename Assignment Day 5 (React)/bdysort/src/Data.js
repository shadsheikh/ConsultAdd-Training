import { React, useState, useEffect } from "react";
import Table from "./Table";

function Data() {
  const [data, setData] = useState([]);
  // const getData=()=>{
  //   fetch('./data.json'
  //   ,{
  //     headers : { 
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //      }
  //   }
  //   )
  //     .then(function(response){
  //       console.log(response)
  //       return response.json();
  //     })
  //     .then(function(myJson) {
  //       console.log(myJson);
  //       setData(myJson)
  //     });
  // }
  // useEffect(()=>{
  //   getData()
  // },[])

  useEffect(() => {
    fetch('./data.json')
    .then((res)=>res.json())
    .then((data)=>{
      setData(data)
    })
  },[]);

  return (
    <div>
      <Table data={data} />
    </div>
  );
}

export default Data;
