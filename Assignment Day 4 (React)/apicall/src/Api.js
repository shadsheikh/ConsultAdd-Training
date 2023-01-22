import { React, useEffect, useState } from 'react';

function Api(){
    const[data,setData]=useState([])
    const[showResults,setShowResults]=useState(false);
    const onClick = () => setShowResults(true);
    function Result(){
        return(
            <div>
            <table border="1">
            <tr>
                <td>userId</td>
                <td>id</td>
                <td>title</td>
                <td>body</td>
            </tr>
            {
                data.map((data)=>
                <tr>
                <th >{data.id}</th>
                <th >{data.userId}</th>
                <th >{data.title}</th>
                <th>{data.body}</th>
                </tr>)
            }
            </table>
        </div>
        )
    }
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts").then((result)=>{
        result.json().then((res)=>{
            setData(res);
        })
    })
    }, []);
    return(
        <div>
            <h1>Calling API</h1>
            <button onClick={onClick}>Show Data</button>
            {showResults?<Result/>:null}
        </div>
    )
}

export default Api;