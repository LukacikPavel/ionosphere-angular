import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { EMPTY, Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GraphsServiceService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:8080';

  getHeatmap(
    name: string,
    attribute: string,
    date_time_start: Date,
    date_time_end: Date
  ): Observable<Record[]> {
    const start = new Date(
      date_time_start.getTime() - date_time_start.getTimezoneOffset() * 60000
    ).toISOString();
    const end = new Date(
      date_time_end.getTime() - date_time_end.getTimezoneOffset() * 60000
    ).toISOString();

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

    // ZAKOMENTOVAT KED SA POUZIVA BACKEND
    return of(data);

    return this.http
      .get<Array<Record>>(this.url + '/api/heatmap', { params: httpOptions })
      .pipe(catchError((error) => this.httpErrorProcess(error)));
  }

  getScatter(
    attribute: string,
    azimuthStart: string,
    azimuthEnd: string,
    elevationStart: string,
    elevationEnd: string,
    date_time_start: Date,
    date_time_end: Date
  ): Observable<Record[]> {
    const start = new Date(
      date_time_start.getTime() - date_time_start.getTimezoneOffset() * 60000
    ).toISOString();
    const end = new Date(
      date_time_end.getTime() - date_time_end.getTimezoneOffset() * 60000
    ).toISOString();

    const httpOptions = new HttpParams()
      .set('attribute', attribute)
      .set('azimuthStart', azimuthStart)
      .set('azimuthEnd', azimuthEnd)
      .set('elevationStart', elevationStart)
      .set('elevationEnd', elevationEnd)
      .set('timeStart', start)
      .set('timeEnd', end);

    var data: Record[];
    data = [
      {
        station: 'rep',
        timeStart: '2015-03-12T00:00:00',
        timeEnd: '2015-03-11T01:00:00',
        s4: 0.058,
        scintillation: false,
      },
      {
        station: 'ran',
        timeStart: '2015-03-11T15:00:00',
        timeEnd: '2015-03-11T16:00:00',
        s4: 0.071,
        scintillation: false,
      },
      {
        station: 'fsi',
        timeStart: '2015-03-11T15:00:00',
        timeEnd: '2015-03-11T16:00:00',
        s4: 0.062,
        scintillation: true,
      },
      {
        station: 'mcm',
        timeStart: '2015-03-12T00:00:00',
        timeEnd: '2015-03-11T01:00:00',
        s4: 0.06,
        scintillation: true,
      },
      {
        station: 'ran',
        timeStart: '2015-03-12T00:00:00',
        timeEnd: '2015-03-11T01:00:00',
        s4: 0.058,
        scintillation: true,
      },
      {
        station: 'fsi',
        timeStart: '2015-03-12T00:00:00',
        timeEnd: '2015-03-11T01:00:00',
        s4: 0.063,
        scintillation: true,
      },
      {
        station: 'gil',
        timeStart: '2015-03-12T00:00:00',
        timeEnd: '2015-03-11T01:00:00',
        s4: 0.05,
        scintillation: true,
      },
      {
        station: 'rab',
        timeStart: '2015-03-12T00:00:00',
        timeEnd: '2015-03-11T01:00:00',
        s4: 0.063,
        scintillation: true,
      },
      {
        station: 'rab',
        timeStart: '2015-03-11T15:00:00',
        timeEnd: '2015-03-11T16:00:00',
        s4: 0.072,
        scintillation: true,
      },
      {
        station: 'gil',
        timeStart: '2015-03-11T15:00:00',
        timeEnd: '2015-03-11T16:00:00',
        s4: 0.057,
        scintillation: false,
      },
      {
        station: 'mcm',
        timeStart: '2015-03-11T15:00:00',
        timeEnd: '2015-03-11T16:00:00',
        s4: 0.063,
        scintillation: false,
      },
      {
        station: 'arv',
        timeStart: '2015-03-11T15:00:00',
        timeEnd: '2015-03-11T16:00:00',
        s4: 0.072,
        scintillation: true,
      },
      {
        station: 'cor',
        timeStart: '2015-03-11T15:00:00',
        timeEnd: '2015-03-11T16:00:00',
        s4: 0.074,
        scintillation: false,
      },
      {
        station: 'arv',
        timeStart: '2015-03-12T08:00:00',
        timeEnd: '2015-03-12T09:00:00',
        s4: 0.06,
        scintillation: false,
      },
      {
        station: 'fsm',
        timeStart: '2015-03-12T00:00:00',
        timeEnd: '2015-03-11T01:00:00',
        s4: 0.064,
        scintillation: true,
      },
      {
        station: 'chu',
        timeStart: '2015-03-11T00:00:00',
        timeEnd: '2015-03-11T01:00:00',
        s4: 0.053,
        scintillation: false,
      },
      {
        station: 'rep',
        timeStart: '2015-03-11T10:00:00',
        timeEnd: '2015-03-11T11:00:00',
        s4: 0.061,
        scintillation: true,
      },
      {
        station: 'fsm',
        timeStart: '2014-08-11T15:00:00',
        timeEnd: '2014-08-11T16:00:00',
        s4: 0.063,
        scintillation: false,
      },
      {
        station: 'chu',
        timeStart: '2015-03-11T15:00:00',
        timeEnd: '2015-03-11T16:00:00',
        s4: 0.065,
        scintillation: true,
      },
    ];

    // ZAKOMENTOVAT KED SA POUZIVA BACKEND
    return of(data);

    return this.http
      .get<Array<Record>>(this.url + '/api/scatter', { params: httpOptions })
      .pipe(catchError((error) => this.httpErrorProcess(error)));
  }

  getStations(): Observable<string[]> {
    const stations = [
      'ran',
      'rep',
      'fsi',
      'chu',
      'cor',
      'fsm',
      'arv',
      'rab',
      'gil',
      'mcm',
      'gri',
      'edm',
      'gjo',
      'sac',
      'arc',
    ];

    return of(stations);

    return this.http
      .get<string[]>(this.url + '/api/stations')
      .pipe(catchError((error) => this.httpErrorProcess(error)));
  }

  private httpErrorProcess(error) {
    if (error instanceof HttpErrorResponse) {
      console.log(error);
      return EMPTY;
    }
    return throwError(error);
  }
}

export interface Record {
  [attribute: string]: any;
}
