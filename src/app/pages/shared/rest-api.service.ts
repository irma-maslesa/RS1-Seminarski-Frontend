import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class RestApiService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private toastr: ToastrService) {
  }

  public get(...request): Observable<any> {
    const [ path ] = request;
    return this.http.get(path,this.httpOptions)
      .pipe(catchError( err => {
        this.toastr.error(err.error.message || err.message, 'Get error');
        return throwError(err);
      }));
  }

  public post(...request): Observable<any> {
    const [ path, body ] = request;
    const wrappedBody = {
      entity: {
        ...body
      }
    }
    return this.http.post(path,wrappedBody,this.httpOptions)
      .pipe(catchError( err => {
        this.toastr.error(err.error.message || err.message, 'Post error');
        return throwError(err);
      }));
  }

  public put(...request): Observable<any> {
    const [ path, body ] = request;
    const wrappedBody = {
      entity: {
        ...body
      }
    }
    return this.http.put(path,wrappedBody,this.httpOptions)
      .pipe(catchError( err => {
        this.toastr.error(err.error.message || err.message, 'Put error');
        return throwError(err);
      }));
  }

  public delete(...request): Observable<any> {
    const [ path ] = request;
    return this.http.delete(path,this.httpOptions)
      .pipe(catchError( err => {
        this.toastr.error(err.error.message || err.message, 'Delete error');
        return throwError(err);
      }));
  }

}
