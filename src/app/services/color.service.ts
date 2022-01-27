import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/ListResponseModel';
import { Color } from '../models/color';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  colors: Color[] = [];
  apiUrl = 'https://localhost:44347/api/';

  constructor(private httpClient: HttpClient) {}

  getColors(): Observable<ListResponseModel<Color>> {
    let newPath = this.apiUrl + 'colors/getall';
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }
  addColor(color: Color): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'colors/add',
      color
    );
  }

  deleteColor(color: Color): Observable<ResponseModel> {
    let newpath = this.apiUrl + 'colors/delete';
    return this.httpClient.post<ResponseModel>(newpath, color);
  }

  updateColor(color: Color): Observable<ResponseModel> {
    let newpath = this.apiUrl + 'colors/update';
    return this.httpClient.post<ResponseModel>(newpath, color);
  }
}
