import { Pipe, PipeTransform } from '@angular/core';
import { Image } from '../Models/image.model';
@Pipe({name: 'filter'})
export class FilterPipe implements PipeTransform {
  transform(value: Image, filter:string): any {
    if (filter==null){
        return value;
    }
    else{
        if(value.tag.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||filter.toLocaleLowerCase().includes(value.tag.toLocaleLowerCase())){
            return value;
        }
    }
  }
}