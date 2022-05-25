import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBeer } from '../models/beer';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BeerService {



  private _url: string = "./assets/data/beers.json"

  constructor(private http: HttpClient) {

  }

  getBeers(): Observable<IBeer[]> {
    return this.http.get<IBeer[]>(this._url)
      .pipe(map((res: any) => {
        return res
      }));
  }


}
