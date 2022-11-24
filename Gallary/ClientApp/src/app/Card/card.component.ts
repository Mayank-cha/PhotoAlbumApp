import { Component, Input, OnInit } from '@angular/core';
import { Image } from '../Services/Models/image.model';

@Component({
  selector: 'ImageCard',
  templateUrl: './card.component.html',
  styleUrls: ['card.component.css']

})
export class CardComponent implements OnInit {
  @Input('image') image!: Image;
  @Input('update') update!: (image: Image) => void;
  @Input('delete') delete!: (image: Image) => void;
  tag!:string;
  ngOnInit(){
    this.tag="Title: "+this.image.title+" Tags: "+this.image.tag;
  }
  onHover: boolean = false;
  isActive:boolean=true;
  onHoverFun(inp: boolean) {
    this.onHover = inp;
  }
  onUpdate() {
    this.update(this.image);
  }
  onDelete() {
    this.delete(this.image);
  }
}
