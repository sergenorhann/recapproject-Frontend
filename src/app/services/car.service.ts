import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/ListResponseModel';
import { Car } from '../models/car';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44347/api/';


  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getall';
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  
  getCarsByBrand(
    brandId: number
  ): Observable<ListResponseModel<Car>> {
    let newPath =
      this.apiUrl + 'cars/getallbybrandid?brandid=' + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColor(
    colorId: number
  ): Observable<ListResponseModel<Car>> {
    let newPath =
      this.apiUrl + 'cars/getallbycolorid?colorid=' + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByFilter(
    colorId: number,brandId:number
  ): Observable<ListResponseModel<Car>> {
    let newPath =
      this.apiUrl + 'cars/getallbyfilter?colorid=' + colorId+"&brandid"+brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  add(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/add",car);
  }

  deleteCar(car: Car): Observable<ResponseModel> {
    let newpath = this.apiUrl + 'cars/delete';
    return this.httpClient.post<ResponseModel>(newpath, car);
  }

  updateCar(car: Car): Observable<ResponseModel> {
    let newpath = this.apiUrl + 'cars/update';
    return this.httpClient.post<ResponseModel>(newpath, car);
  }
} 