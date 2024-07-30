import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Leaflet
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Map, MapOptions, control, LatLng, icon, Marker, geoJSON } from 'leaflet';
// Models
import { base_osm, argenmap, googleSat } from './../../../models/baselayers.models';
import { RoutingService } from '../../services/routing.service';
import { Previaje } from '../../models/routing.models';

/**
 * [TODO] Setup icons on-the-fly
 */
const iconUrl = 'marker-icon.png';
const shadowUrl = 'cruce-shadow.png';

const iconDefault = icon({
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

const homeIconUrl = 'home-location-icon.png';
const iconHome = icon({
  iconUrl: homeIconUrl,
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  shadowUrl,
  shadowSize: [48, 48]
});

Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    RouterOutlet,
    LeafletModule
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  // Title
  title = 'traceroute';
  // Map
  public layersControl: any = [];
  private _map!: Map;
  public leafletLayersControlOptions = { position: 'topleft'};
  public mapOptions!: MapOptions;
  private _centerCoords: [number, number] = [-31.416814, -64.183569];
  // Waypoints for routing
  private _startLatLng!: LatLng;
  private _endLatLng!: LatLng;
  // Route Layer
  private _routeLayer: any; 

  // Itinerary start coords. 
  @Input()
  set startCoords(value:[number,number]){
    this._startLatLng = new LatLng(value[0], value[1]);
  }
  // Itinerary end coords.
  @Input()
  set endCoords(value:[number, number]){
    this._endLatLng = new LatLng(value[0], value[1]);
  }
  // Emit map object
  @Output() 
  mapObject = new EventEmitter<Map>();
  // Emit previaje info. Catched and broadcasted by app-root
  @Output()
  previajeInfo = new EventEmitter<Previaje>();

  constructor(
    private _routingService: RoutingService
  ){
    this.setupMap();
  }

  ngAfterViewInit(): void {
    // Trace route
    this.traceRoute();
  }

  // Trace route
  private traceRoute(){
    // Routing
    this._routingService.getRoute({
      previajeID: '1',
      zona: 'cordoba',
      start_lat: this._startLatLng.lat.toString(),
      start_lng: this._startLatLng.lng.toString(),
      end_lat: this._endLatLng.lat.toString(),
      end_lng: this._endLatLng.lng.toString()
    }).subscribe({
        next: (data:any) => {
          this._routeLayer = geoJSON(data).addTo(this._map);
          // map extent to geojson layer
          this._map.fitBounds(this._routeLayer.getBounds());
          // Emit previaje info
          this.previajeInfo.emit(data);
        },
        error: (error:any) => {
          console.error('Error:', error);
        },
        complete: () => {
          // Add markers after route is traced
          this.setupMarkers();
        }
    });
  }

  public catchMapReady(map:Map){
    this._map = map;
    // Bubble up map object
    this.mapObject.emit(map);
    // Add scale control
    control.scale({
      position:'bottomright',
      imperial: false,
      metric: true
    }).addTo(map);
  }

  private setupMap(){
    this.layersControl = {
      baseLayers : {
        '<span class="base-layer-item">Open Street Map Standard</span>': base_osm,
        '<span class="base-layer-item">Argenmap IGN</span>': argenmap,
        '<span class="base-layer-item">Google Maps Satellite</span>': googleSat        
      }
    }
         
    this.mapOptions = {
      layers: [
        base_osm
      ],
      center: this._centerCoords,
      zoomControl: false,
      zoom:8,
    }
  }

  private setupMarkers(){
    // Start Marker
    const startMarker = new Marker(this._startLatLng, { icon: iconHome } ).addTo(this._map);
    // End Marker
    const endMarker = new Marker(this._endLatLng, { icon: iconDefault } ).addTo(this._map);
  }

  /**
   * [TODO]
   * Recibe nuevamente el startCoords y el endCoords para rehacer la ruta.
   */
  private resetMap(){
    this._map.removeLayer(this._routeLayer);
  }
}
