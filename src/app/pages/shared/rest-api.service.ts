import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpUrlEncodingCodec} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';

@Injectable()
export class RestApiService {
  codec = new HttpUrlEncodingCodec();
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private toastr: ToastrService) {
  }

  public get(...request): Observable<any> {
    let [ path, options ] = request;
    let wrappedOptions = {...options, ...this.httpOptions};

    return this.http.get(path, wrappedOptions)
      .pipe(catchError( err => {
        this.toastr.error(err.error.message || err.message, 'Get error');
        return throwError(err);
      }));
  }

  public post(...request): Observable<any> {
    const [ path, body, options] = request;

    let wrappedOptions = {...options, ...this.httpOptions};

    return this.http.post(path,body,wrappedOptions)
      .pipe(catchError( err => {
        this.toastr.error(err.error.message || err.message, 'Post error');
        return throwError(err);
      }));
  }

  public put(...request): Observable<any> {
    const [ path, body, options ] = request;

    let wrappedOptions = {...options, ...this.httpOptions};

    return this.http.put(path,body,wrappedOptions)
      .pipe(catchError( err => {
        this.toastr.error(err.error.message || err.message, 'Put error');
        return throwError(err);
      }));
  }

  public delete(...request): Observable<any> {
    const [ path, options ] = request;

    let wrappedOptions = {...options, ...this.httpOptions};

    return this.http.delete(path,wrappedOptions)
      .pipe(catchError( err => {
        this.toastr.error(err.error.message || err.message, 'Delete error');
        return throwError(err);
      }));

}

}