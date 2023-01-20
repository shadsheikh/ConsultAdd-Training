import { Component } from '@angular/core';
import { ApiService } from './../data/api.service';
import { DataService } from './../data/data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent {
  constructor(private api:ApiService,public dataService:DataService){
    api.getData().subscribe((data)=>{
      this.dataService.sharedTable=data;
    });
  }
}
