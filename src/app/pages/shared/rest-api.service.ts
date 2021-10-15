import { HttpClient, HttpHeaders, HttpUrlEncodingCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RestApiService {
  codec = new HttpUrlEncodingCodec();
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private toastr: ToastrService) {
  }

  public get(...request): Observable<any> {
    let [path, options] = request;
    let wrappedOptions = { ...options, ...this.httpOptions };

    return this.http.get(path, wrappedOptions)
      .pipe(catchError(err => {
        this.toastr.error(err.error.ERROR.map(e => e + "!").join(" "));
        return throwError(err);
      }));
  }

  public post(...request): Observable<any> {
    const [path, body, options] = request;

    let wrappedOptions = { ...options, ...this.httpOptions };

    return this.http.post(path, body, wrappedOptions)
      .pipe(catchError(err => {
        this.toastr.error(err.error.ERROR.map(e => e + "!").join(" "));
        return throwError(err);
      }));
  }

  public put(...request): Observable<any> {
    const [path, body, options] = request;

    let wrappedOptions = { ...options, ...this.httpOptions };

    return this.http.put(path, body, wrappedOptions)
      .pipe(catchError(err => {
        this.toastr.error(err.error.ERROR.map(e => e + "!").join(" "));
        return throwError(err);
      }));
  }

  public delete(...request): Observable<any> {
    const [path, options] = request;

    let wrappedOptions = { ...options, ...this.httpOptions };

    return this.http.delete(path, wrappedOptions)
      .pipe(catchError(err => {
        this.toastr.error(err.error.ERROR.map(e => e + "!").join(" "));
        return throwError(err);
      }));

  }

}