import { Component, Inject, OnInit } from '@angular/core';
import {Dialog, DialogRef, DIALOG_DATA} from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import { ApplicationPaths } from 'src/api-authorization/api-authorization.constants';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { Image } from '../Services/Models/image.model';
import { PopUpModel } from '../Services/Models/popup.model';

@Component({
  selector: 'app-add-popup',
  templateUrl: './addPopUp.component.html',
  styleUrls: ['addPopUp.component.css']
})
export class AddPopUpComponent {
  image!: Image;
  uploadFile!:File | null;
  uploadFileLabel!:string | undefined;
  constructor(
    public dialogRef: DialogRef<PopUpModel>,
  ) {
    this.image = new Image();
  }
  handleFileInput(files: FileList) {
    if (files.length > 0) {
      this.uploadFile = files.item(0);
      this.uploadFileLabel = this.uploadFile?.name;
    }
  }
  add(){
    this.dialogRef.close(new PopUpModel({file:this.uploadFile,image:this.image,fileName:this.uploadFileLabel}));
  }
  cancel(){
    this.dialogRef.close();
  }
}
