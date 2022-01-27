import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/ListResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserImage } from '../models/userImage';

@Injectable({
  providedIn: 'root',
})
export class UserImageService {
  apiUrl = 'https://localhost:44347/api/';

  constructor(private httpClient: HttpClient) {}

  getUserImage(): Observable<ListResponseModel<UserImage>> {
    let newPath = this.apiUrl + 'userimages/getall';
    return this.httpClient.get<ListResponseModel<UserImage>>(newPath);
  }

  getUserImageByUserId(
    userId: number
  ): Observable<SingleResponseModel<UserImage>> {
    let newPath = this.apiUrl + 'userimages/getbyuserid?id=' + userId;
    return this.httpClient.get<SingleResponseModel<UserImage>>(newPath);
  }
}
