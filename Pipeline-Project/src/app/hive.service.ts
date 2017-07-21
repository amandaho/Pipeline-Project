import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

@Injectable()
export class HiveService {

//   private baseUrl: string = 'https://ancient-chamber-80519.herokuapp.com/api/testdata';
  private baseUrl: string = 'https://ancient-chamber-80519.herokuapp.com/api/';

  constructor(private http: Http) { }

  // getRecords(): Observable<any[]> {
  //     return Observable
  //       // .timer(0, 5000)
  //       .interval(10000)
  //       .flatMap(() => {
  //       return this.http.get(this.baseUrl)
  //           .map(this.extractData)
  //       })
  // }

//   getRecords(endpoint: string): Observable<any[]> {
//     let apiUrl = `${this.baseUrl}${endpoint}`;
//         return this.http.get(apiUrl)
//   }

  getRecords(endpoint:string): Observable<any[]> {
    let apiUrl = `${this.baseUrl}${endpoint}`    
    return this.http.get(apiUrl)
          .map(this.extractData)
          .catch(this.handleError)
  }

   getRecord(endpoint: string, id): Observable<object> {
    let apiUrl = `${this.baseUrl}${endpoint}/${id}`;
    return this.http.get(apiUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
        
  addRecord(endpoint: string, record:object): Observable<object> {
        let apiUrl = `${this.baseUrl}${endpoint}`;
        console.log(apiUrl)
        console.log(record)
        return this.http.post(apiUrl, record)
            .map(this.extractData)
            .catch(this.handleError);
    }

    editRecord(endpoint: string, record:object, id:number): Observable<object> {
        let apiUrl = `${this.baseUrl}${endpoint}/${id}`;
        console.log(record)
        record = this.clean_request_body(record);
        console.log(apiUrl)
        return this.http.put(apiUrl, record)
            .map(this.extractData)
            .catch(this.handleError);
    }

    clean_request_body(request_body) {
        return JSON.parse(JSON.stringify(request_body).replace(/\"\"/g, null))
    }

    private extractData(res: Response) {
      let results = res.json();
    return results || [];
  }

  private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            if(error.status === 0){
                errMsg = "Error connecting to API"
            }else{
                const errorJSON = error.json();
                errMsg = `${errorJSON.code} - ${errorJSON.message}`;
            } 
        }
        
        return Observable.throw(errMsg);
    }

}
