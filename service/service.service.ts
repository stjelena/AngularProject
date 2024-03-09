import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/Employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  //this was for testing only
  getAllEmployees(){
    return this.http.get<Employee[]>('http://localhost:4000/user/getAllEmployees')
  }

  getTotalWorkingHours(): Observable<any> {
    return this.http.get<any>('http://localhost:4000/user/getTotalWorkingHours');
}

}
