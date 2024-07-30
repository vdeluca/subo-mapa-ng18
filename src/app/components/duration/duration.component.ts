import { Component, Input } from '@angular/core';
import { Control, DomUtil, ControlPosition, Map } from 'leaflet';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-duration',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.css']
})
export class DurationComponent {

  private _map!: Map;
  public duration: string = '';
  public durationControl!: Control;

  @Input() position!: ControlPosition;

  @Input() 
  set durationValue(value: string) {
    this.duration = value;
  }

  @Input()
  set map(map: Map) {
    console.log("Map");
    if (map) {
      this._map = map;
      // Create Control
      let HtmlLeafletControl = Control.extend({
        onAdd(map: Map) {
          return DomUtil.get('duration');
        },
        onRemove() {}
      });
      this.durationControl = new HtmlLeafletControl({
        position: this.position,
      }).addTo(this._map);
    }
  }
}
