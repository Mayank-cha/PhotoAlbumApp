import { Component, Input } from '@angular/core';
import { Image } from '../Services/Models/image.model';
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
})
export class GridComponent {
  @Input("colSize") colSize!:number;
  @Input("imageList") imageList!:Image[];
  @Input('update') update!: (image: Image) => void;
  @Input('delete') delete!: (image: Image) => void;
  isActive:boolean=true;
  constructor(){}
}
