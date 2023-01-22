import {React,useState} from 'react';

function Table(props) {
    const [sortState, setSortState] = useState("none");
    const sortMethods={
        none:{method:(a, b) => null},
        name:{method: (a, b) => (a.name>b.name?1:-1)},
        dob:{method:(a,b)=>{
            var [d1,m1,y1]=a.bdy.split('/');
            var [d2,m2,y2]=b.bdy.split('/');
            var date1=new Date(+y1,+m1-1,+d1);
            var date2=new Date(+y2,+m2-1,+d2);
            var timeDiff1=Math.abs(Date.now() - new Date(date1).getTime());
            var age1=Math.floor(timeDiff1 / (1000 * 3600 * 24) / 365.25);
            var timeDiff2=Math.abs(Date.now() - new Date(date2).getTime());
            var age2=Math.floor(timeDiff2 / (1000 * 3600 * 24) / 365.25);
            if(age1<age2){
              return 1;
            }else{
              return -1;
            }
          }}
    };

    return (
      <div>
        <div>
            <input name='sort' type='radio' value='name' onChange={(e) => setSortState(e.target.value)}/>Sort By Name
            <input name='sort' type='radio' value='dob' onChange={(e) => setSortState(e.target.value)}/>Sort By Age
        </div>
         <div>
          <table border='1'>
            <tr>
                <td>id</td>
                <td>name</td>
                <td>bdy</td>
            </tr>
                {
                    props.data.sort(sortMethods[sortState].method).map((data)=>
                    <tr>
                    <th>{data.id}</th>
                    <th >{data.name}</th>
                    <th>{data.bdy}</th>
                    </tr>
                    )
                }
            </table>
      </div>
      </div>
    );
  }
  
  export default Table;
  