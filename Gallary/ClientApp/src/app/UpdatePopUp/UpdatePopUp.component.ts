import { Component, Inject, OnInit } from '@angular/core';
import {Dialog, DialogRef, DIALOG_DATA} from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import { ApplicationPaths } from 'src/api-authorization/api-authorization.constants';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { Image } from '../Services/Models/image.model';
import { UpPopUpModel } from '../Services/Models/popup.model';

export interface DialogData {
  image:Image;
}

@Component({
  selector: 'app-up-popup',
  templateUrl: './UpdatePopUp.component.html',
  styleUrls: ['UpdatePopUp.component.css']
})
export class UpdatePopUpComponent {
  image!: Image;
  uploadFile!:File | null;
  uploadFileLabel!:string | undefined;
  updateFile!:boolean
  constructor(
    public dialogRef: DialogRef<UpPopUpModel>,
    @Inject(DIALOG_DATA) public data: DialogData
  ) {
    this.image = data.image;
  }
  handleFileInput(files: FileList) {
    if (files.length > 0) {
      this.uploadFile = files.item(0);
      this.uploadFileLabel = this.uploadFile?.name;
      this.updateFile=true;
    }
    else{
      this.updateFile=false;
    }
  }
  add(){
    this.dialogRef.close(new UpPopUpModel({file:this.uploadFile,image:this.image,fileName:this.uploadFileLabel,updateFile:this.updateFile}));
  }
  cancel(){
    this.dialogRef.close();
  }
}
