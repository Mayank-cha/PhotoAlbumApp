import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from './Models/image.model';
@Injectable({
  providedIn: 'root',
})
export class restService {
    private endPoint:string;
    constructor(private http:HttpClient,@Inject('BASE_URL') baseUrl: string){
        this.endPoint=baseUrl+"api/Image/"
    }
    getImageList():Observable<Image[]>{
        return this.http.get<Image[]>(this.endPoint+"list");
    }
    updateImage(file:FormData):Observable<any>{
        return this.http.post<any>(this.endPoint+"update",file);
    }
    deleteImage(image:Image):Observable<boolean>{
        return this.http.post<boolean>(this.endPoint+"delete",image);
    }
    addImage(file:FormData):Observable<any>{
        return this.http.post<any>(this.endPoint+"add",file);
    }
    updateImageDetails(image:Image):Observable<boolean>{
        return this.http.post<boolean>(this.endPoint+"details",image);
    }
}
