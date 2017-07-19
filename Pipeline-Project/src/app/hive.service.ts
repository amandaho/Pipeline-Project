import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

@Injectable()
export class HiveService {

  private baseUrl: string = 'https://cors-anywhere.herokuapp.com/https://ancient-chamber-80519.herokuapp.com/api/testdata';

  constructor(private http: Http) { }

  // getRecords(): Observable<any[]> {
  //     return Observable.timer(0, 5000)
  //       // .interval(5000)
  //       .flatMap(() => {
  //       return this.http.get(this.baseUrl)
  //           .map(this.extractData)
  //       })
  // }

  getRecords(): Observable<any[]> {
        return this.http.get(this.baseUrl)
          .map(this.extractData)
          .catch(this.handleError)
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
