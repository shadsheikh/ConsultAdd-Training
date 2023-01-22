import api from './data.json';
import {React,useState} from 'react';
import Table from './Table';
import Sorting from './Sorting';

function Data(props) {
    const [data,setData]=useState(api)
    return (
     <div>
      <Table data={data}/>
      </div>
    );
  }
  
  export default Data;
  