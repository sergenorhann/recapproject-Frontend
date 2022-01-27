import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/ListResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {

  apiUrl = 'https://localhost:44347/api/';

  constructor(private httpClient:HttpClient) { }

  getCarDetail():Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"cars/getcardetail";
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsDetailByCarId(
    carId: number
  ): Observable<ListResponseModel<CarDetail>> {
    let newPath =
      this.apiUrl + 'cars/getcardetailbycarid?id=' + carId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
}