import { Observable } from 'rxjs/Rx';
import { appSettings } from './../../model/settings';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FlyerService {
  private requestOptions: RequestOptions = new RequestOptions({
    headers: new Headers({ 'Content-Type': 'application/json' })
  });

  constructor(private http: Http) {

  }

  getFlyerElements() {
    return this.http.get(appSettings.apiUrl('getFlyerElements'), this.requestOptions)
      .map(res => res.json())
      //.do(res => console.log(res)) debugging
      .catch(this.handleServerError);

  }

  private handleServerError(error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }

}