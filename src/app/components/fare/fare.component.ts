import { Component, Input } from '@angular/core';
import { Control, DomUtil, ControlPosition, Map } from 'leaflet';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fare',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './fare.component.html',
  styleUrls: ['./fare.component.css']
})
export class FareComponent {

  private _map!: Map;
  public fare: string = '';
  public fareControl!: Control;

  @Input() position!: ControlPosition;

  @Input() 
  set fareValue(value: string) {
    this.fare = value;
  }

  @Input()
  set map(map: Map) {
    console.log("Map");
    if (map) {
      this._map = map;
      // Create Control
      let HtmlLeafletControl = Control.extend({
        onAdd(map: Map) {
          return DomUtil.get('fare');
        },
        onRemove() {}
      });
      this.fareControl = new HtmlLeafletControl({
        position: this.position,
      }).addTo(this._map);
    }
  }
}
