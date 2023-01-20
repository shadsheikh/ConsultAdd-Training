import { Component } from '@angular/core';
import { DataService } from './../data/data.service';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import {TableComponent} from '../table/table.component';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css']
})

export class SortingComponent {
  constructor(private dataService:DataService) {}
  radioForm=new FormGroup({
    sortby:new FormControl('',Validators.required),
  });
  sorting(e:any){
    if(e.target.value=='name'){
      this.dataService.sharedTable.sort((a:any,b:any) => (a.name > b.name) ? 1 : -1);
    }else{
      this.dataService.sharedTable.sort(function(a:any,b:any){
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
      });
      console.log(this.dataService.sharedTable[0]['dob']);
    }
  }
}
