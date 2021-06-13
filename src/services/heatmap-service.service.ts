import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { EMPTY, Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeatmapServiceService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:8080';

  getHeatmap2(
    name: string,
    attribute: string,
    date_time_start: Date,
    date_time_end: Date
  ): Observable<Record[]> {
    const start = date_time_start.toISOString();
    const end = date_time_end.toISOString();

    const httpOptions = new HttpParams()
      .set('attribute', attribute)
      .set('station', name)
      .set('timeStart', start)
      .set('timeEnd', end);

    var data: Record[];

    data = [
      {
        station: 'cor',
        timeStart: new Date('2015-09-14T12:00:00'),
        timeEnd: new Date('2015-09-14T14:00:00'),
        azimuthStart: 90,
        azimuthEnd: 120,
        elevationStart: 40,
        elevationEnd: 50,
        tecu: 40.03,
      },
      {
        station: 'cor',
        timeStart: new Date('2015-09-14T12:00:00'),
        timeEnd: new Date('2015-09-14T14:00:00'),
        azimuthStart: 210,
        azimuthEnd: 240,
        elevationStart: 40,
        tecu: 20.97,
      },
      {
        station: 'cor',
        timeStart: new Date('2015-09-14T12:00:00'),
        timeEnd: new Date('2015-09-14T14:00:00'),
        azimuthStart: 210,
        azimuthEnd: 240,
        elevationStart: 30,
        elevationEnd: 40,
        tecu: 38.06,
      },
      {
        station: 'cor',
        timeStart: '2015-09-14T12:00:00',
        timeEnd: '2015-09-14T14:00:00',
        azimuthStart: 180,
        azimuthEnd: 210,
        elevationStart: 30,
        elevationEnd: 40,
        tecu: 36.74,
      },
    ];

    return of(data);

    // ODKOMENTOVAT KED SA POUZIVA BACKEND
    // return this.http
    //   .get<Array<Record>>(this.url + '/api/heatmap2', { params: httpOptions })
    //   .pipe(catchError((error) => this.httpErrorProcess(error)));
  }

  getScatter2(
    attribute: string,
    date_time_start: Date,
    date_time_end: Date
  ): Observable<Record[]> {
    const start = date_time_start.toISOString();
    const end = date_time_end.toISOString();

    const httpOptions = new HttpParams()
      .set('attribute', attribute)
      .set('timeStart', start)
      .set('timeEnd', end);

    console.log(httpOptions);

    var data: Record[];
    data = [
      {
        station: 'rep',
        timeStart: '2015-03-12T00:00:00',
        timeEnd: '2015-03-11T01:00:00',
        s4: 0.058,
      },
      {
        station: 'ran',
        timeStart: '2015-03-11T15:00:00',
        timeEnd: '2015-03-11T16:00:00',
        s4: 0.071,
      },
      {
        station: 'fsi',
        timeStart: '2015-03-11T15:00:00',
        timeEnd: '2015-03-11T16:00:00',
        s4: 0.062,
      },
      {
        station: 'mcm',
        timeStart: '2015-03-12T00:00:00',
        timeEnd: '2015-03-11T01:00:00',
        s4: 0.06,
      },
      {
        station: 'ran',
        timeStart: '2015-03-12T00:00:00',
        timeEnd: '2015-03-11T01:00:00',
        s4: 0.058,
      },
      {
        station: 'fsi',
        timeStart: '2015-03-12T00:00:00',
        timeEnd: '2015-03-11T01:00:00',
        s4: 0.063,
      },
      {
        station: 'gil',
        timeStart: '2015-03-12T00:00:00',
        timeEnd: '2015-03-11T01:00:00',
        s4: 0.05,
      },
      {
        station: 'rab',
        timeStart: '2015-03-12T00:00:00',
        timeEnd: '2015-03-11T01:00:00',
        s4: 0.063,
      },
      {
        station: 'rab',
        timeStart: '2015-03-11T15:00:00',
        timeEnd: '2015-03-11T16:00:00',
        s4: 0.072,
      },
      {
        station: 'gil',
        timeStart: '2015-03-11T15:00:00',
        timeEnd: '2015-03-11T16:00:00',
        s4: 0.057,
      },
      {
        station: 'mcm',
        timeStart: '2015-03-11T15:00:00',
        timeEnd: '2015-03-11T16:00:00',
        s4: 0.063,
      },
      {
        station: 'arv',
        timeStart: '2015-03-11T15:00:00',
        timeEnd: '2015-03-11T16:00:00',
        s4: 0.072,
      },
      {
        station: 'cor',
        timeStart: '2015-03-11T15:00:00',
        timeEnd: '2015-03-11T16:00:00',
        s4: 0.074,
      },
      {
        station: 'arv',
        timeStart: '2015-03-12T08:00:00',
        timeEnd: '2015-03-12T09:00:00',
        s4: 0.06,
      },
      {
        station: 'fsm',
        timeStart: '2015-03-12T00:00:00',
        timeEnd: '2015-03-11T01:00:00',
        s4: 0.064,
      },
      {
        station: 'chu',
        timeStart: '2015-03-11T00:00:00',
        timeEnd: '2015-03-11T01:00:00',
        s4: 0.053,
      },
      {
        station: 'rep',
        timeStart: '2015-03-11T10:00:00',
        timeEnd: '2015-03-11T11:00:00',
        s4: 0.061,
      },
      {
        station: 'fsm',
        timeStart: '2014-08-11T15:00:00',
        timeEnd: '2014-08-11T16:00:00',
        s4: 0.063,
      },
      {
        station: 'chu',
        timeStart: '2015-03-11T15:00:00',
        timeEnd: '2015-03-11T16:00:00',
        s4: 0.065,
      },
    ];

    return of(data);

    // ODKOMENTOVAT KED SA POUZIVA BACKEND
    // return this.http
    //   .get<Array<Record>>(this.url + '/api/scatter2', { params: httpOptions })
    //   .pipe(catchError((error) => this.httpErrorProcess(error)));
  }

  private httpErrorProcess(error) {
    if (error instanceof HttpErrorResponse) {
      console.log(error);
      return EMPTY;
    }
    return throwError(error);
  }
}

interface Rec {
  station: string;
  timeStart: Date;
  timeEnd: Date;
  azimuthStart: number;
  azimuthEnd: number;
  elevationStart: number;
  elevationEnd: number;
}

export interface Record {
  [attribute: string]: any;
}
