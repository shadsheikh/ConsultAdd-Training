import { Component } from '@angular/core';

@Component({
  selector: 'app-curreny-converter',
  templateUrl: './curreny-converter.component.html',
  styleUrls: ['./curreny-converter.component.css']
})
export class CurrenyConverterComponent {
  title = 'Currency Calculator';
  result = 0;
  CurrencyCoverter(data:number,rCurrency:string){
    if(rCurrency=='USD')this.result=data*81.68;
    else if(rCurrency=='EUR')this.result=data*88.30;
    else if(rCurrency=='JPY')this.result=data*0.64;
    else if(rCurrency=='GBP')this.result=data*99.56;
    else if(rCurrency=='CHF')this.result=data*88.15;
  }
}
