import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http:HttpClient) { }
  url = "../../assets/data.json";
  getData(){
    return this.http.get(this.url);
  }
}
