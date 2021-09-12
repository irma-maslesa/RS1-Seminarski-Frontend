import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


let FRANCHISES;

@Injectable()
export class FranchiseService {

    constructor(private httpClient: HttpClient) {

    }

    getFranchises(): Observable<any> {

        return this.httpClient.get('http://localhost:8000/vigor/franchise/find');
    };


    addOrEditFranchise(franchise) {
        console.log(franchise);
    }

    private handleError(operation = 'operation', result?: any) {
        return (error: any): Observable<any> => {
            console.log(error);
            return of(result)
        }
    }
}