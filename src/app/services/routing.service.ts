import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../src/environments/environment';
import { Previaje, PreviajeDataCreate } from '../models/routing.models';


@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(
    private _http: HttpClient
  ) { }


  /**
   * 
   * @param dataRoute Datos necesarios para crear un previaje
   * @returns Previaje. uuid as primary key
   */
  // https://api.bordergis.com/subo/crear-previaje/<str:previajeID>/<str:zona>/<str:start_lat>/<str:start_lng>/<str:end_lat>/<str:end_lng>/
  public getRoute(dataRoute:PreviajeDataCreate): Observable<Previaje> {
    // [TODO] Implementar access token
    // Params
    let params = dataRoute.previajeID + '/' + dataRoute.zona + '/' + dataRoute.start_lat + '/' + dataRoute.start_lng + '/' + dataRoute.end_lat + '/' + dataRoute.end_lng + '/';
    // Request
    return this._http.get<Previaje>(environment.url_base_api + 'subo/crear-previaje/' + params);
  }


  

}
