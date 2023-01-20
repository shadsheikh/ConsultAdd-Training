import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isData=false;
  app1=false;
  app2=false;
  getApp1(){
    this.app1=true;
    this.app2=false;
  }
  getApp2(){
    this.app2=true;
    this.app1=false;
  }
  getData(){
    this.isData=true;
  }
}
