import { Component, Input } from '@angular/core';
import { Control, DomUtil, ControlPosition, Map } from 'leaflet';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-distance',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './distance.component.html',
  styleUrls: ['./distance.component.css']
})
export class DistanceComponent {

  private _map!: Map;
  public distance: string = '';
  public distanceControl!: Control;

  @Input() position!: ControlPosition;

  @Input() 
  set distanceValue(value: string) {
    this.distance = value;
  }

  @Input()
  set map(map: Map) {
    console.log("Map");
    if (map) {
      this._map = map;
      // Create Control
      let HtmlLeafletControl = Control.extend({
        onAdd(map: Map) {
          return DomUtil.get('distance');
        },
        onRemove() {}
      });
      this.distanceControl = new HtmlLeafletControl({
        position: this.position,
      }).addTo(this._map);
    }
  }
}
