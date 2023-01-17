import { Component } from '@angular/core';
import { DataService } from "./data.service";
@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent {
  data:any;
  constructor(private Data:DataService){
    Data.getData().subscribe((data)=>{
      this.data=data;
    });
  }
}
