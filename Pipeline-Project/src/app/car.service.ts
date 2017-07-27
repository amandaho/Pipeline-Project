import { Injectable } from '@angular/core';
import { Jsonp, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class CarService {

  private baseUrl: string ='https://www.carqueryapi.com/api/0.3/?callback=JSONP_CALLBACK'

  constructor(
        private jsonp: Jsonp,
        private route: ActivatedRoute,
        private router: Router
    ) { }

  getVehicleYears(endpoint:string): Observable<any> {
        let apiUrl = `${this.baseUrl}&cmd=${endpoint}`
        // console.log(apiUrl)    
        return this.jsonp.get(apiUrl)
          .map(this.extractData)
          .catch(this.handleError)
    }

  getVehicleMakes(endpoint:string, year:number): Observable<any> {
        let apiUrl = `${this.baseUrl}&cmd=${endpoint}&year=${year}&sold_in_us=1`
        console.log(apiUrl)    
        return this.jsonp.get(apiUrl)
          .map(this.extractData)
          .catch(this.handleError)
    }

  getVehicleModels(endpoint:string, make:string, year:number,): Observable<any> {
        let apiUrl = `${this.baseUrl}&cmd=${endpoint}&make=${make}&year=${year}&sold_in_us=1`
        console.log(apiUrl)    
        return this.jsonp.get(apiUrl)
          .map(this.extractData)
          .catch(this.handleError)
    }

  private extractData(res: Response) {
        let results = false
        try{
            results = res.json();
        }catch(e){
            if(res.status !== 200){
                return Observable.throw(e);
            }
        }
        return results || [];
    }
  
  private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            if(error.status === 0){
                errMsg = "Error connecting to API"
            } else{
                const errorJSON = error.json();
                errMsg = `${errorJSON.code} - ${errorJSON.message}`;
            } 
        }
        return Observable.throw(errMsg);
    }

}
