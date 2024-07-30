import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { DurationComponent } from './components/duration/duration.component';
import { DistanceComponent } from './components/distance/distance.component';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Map } from 'leaflet';  
import { FareComponent } from './components/fare/fare.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MapComponent,
    DurationComponent,
    CommonModule,
    LeafletModule,
    DistanceComponent,
    FareComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {

  @ViewChild('duration') durationComponent!: DurationComponent;
  @ViewChild('distance') distanceComponent!: DistanceComponent;
  @ViewChild('fare') fareComponent!: FareComponent;

  private _map!: Map;

  public estimatedTime$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public estimatedDistance$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public estimatedFare$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  ngAfterViewInit() {
    this.durationComponent.map = this._map;
    this.distanceComponent.map = this._map;
    this.fareComponent.map = this._map;
  }
  
  /**
   * Con esta función se emiten los datos del previaje a los componentes 
   * que flotan sobre el mapa y ofrecen información sobre la ruta.
   * Como: Duración, distancia y costo estimado.
   * @param routeInfo Info about the Previaje route
   */
  public broadcastPreviajeInfo(routeInfo: any){
    this.estimatedTime$.next(routeInfo.properties.estimatedTime);
    this.estimatedDistance$.next(routeInfo.properties.estimatedDistance);
    this.estimatedFare$.next(routeInfo.properties.estimatedCost);
  }

  public catchMapObject(map: Map){ 
    this._map = map;
  }
}
