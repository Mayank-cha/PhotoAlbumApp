import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationPaths } from 'src/api-authorization/api-authorization.constants';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { Image } from '../Services/Models/image.model';
import { Dialog, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { AddPopUpComponent } from '../AddPopup/addPopUp.component';
import { PopUpModel, UpPopUpModel } from '../Services/Models/popup.model';
import { restService } from '../Services/rest.service';
import { UpdatePopUpComponent } from '../UpdatePopUp/UpdatePopUp.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  imageList!: Image[];
  imageTempList!: Image[];
  col!: number;
  search!: string;
  filter!: string;
  constructor(
    @Inject('BASE_URL') baseUrl: string,
    private _routeManager: Router,
    private _authManager: AuthorizeService,
    public dialog: Dialog,
    private _rest: restService
  ) {
    this.col = 4;
    this.filter = '';
  }
  ngOnInit(): void {
    this._authManager.isAuthenticated().subscribe((result) => {
      if (result == false) {
        this._routeManager.navigate([ApplicationPaths.Login]);
      }
    });
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.fetchData();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filter = filterValue.trim().toLowerCase();
    this.imageTempList = this.imageList.filter((value) => {
      if (this.filter == null) {
        return value;
      } else {
        if (
          value.tag
            .toLocaleLowerCase()
            .includes(this.filter.toLocaleLowerCase()) ||
          this.filter
            .toLocaleLowerCase()
            .includes(value.tag.toLocaleLowerCase())
        ) {
          return value;
        }
        return null;
      }
    });
  }
  clear() {
    this.search = '';
    this.imageTempList = this.imageList.filter((value) => {
      return value;
    });
  }
  update(image: Image): void {
    const dialogRef = this.dialog.open<UpPopUpModel>(UpdatePopUpComponent, {
      width: '500px',
      data: { image: image },
    });
    dialogRef.closed.subscribe((result) => {
      if (result) {
        console.log('The dialog was closed');
        const formData = new FormData();
        var result1 = <UpPopUpModel>result;
        if (result1.file) {
          formData.append(<string>result1.fileName, result1.file);
          formData.append('data', JSON.stringify(result1.image));
          this._rest.updateImage(formData).subscribe((result) => {
            console.log(result);
            this.fetchData();
          });
        } else {
          this._rest.updateImageDetails(result1.image).subscribe((result) => {
            console.log(result);
            this.fetchData();
          });
        }
      }
    });
  }
  delete(image: Image): void {
    this._rest.deleteImage(image).subscribe({
      next: (array: boolean) => {
        this.fetchData();
      },
      error: (err) => {
        console.log('error message' + err);
      },
    });
  }

  add(): void {
    const dialogRef = this.dialog.open<PopUpModel>(AddPopUpComponent, {
      width: '500px',
    });

    dialogRef.closed.subscribe((result) => {
      console.log('The dialog was closed');
      const formData = new FormData();
      var result1 = <PopUpModel>result;
      if (result1.file) {
        formData.append(<string>result1.fileName, result1.file);
        formData.append('data', JSON.stringify(result1.image));
        this._rest.addImage(formData).subscribe((result) => {
          console.log(result);
          this.fetchData();
        });
      }
    });
  }
  initAll(array: Image[]) {
    this.imageList = array;
    this.updateTemp();
  }
  fetchData() {
    this._rest.getImageList().subscribe({
      next: (array: Image[]) => {
        this.initAll(array);
        console.log(array);
      },
      error: (err) => {
        this.initAll([]);
        console.log('error message' + err);
      },
    });
  }
  updateTemp() {
    this.imageTempList = this.imageList.filter((value) => {
      if (this.filter === '') {
        return value;
      } else {
        if (
          value.tag
            .toLocaleLowerCase()
            .includes(this.filter.toLocaleLowerCase()) ||
          this.filter
            .toLocaleLowerCase()
            .includes(value.tag.toLocaleLowerCase())
        ) {
          return value;
        }
        return null;
      }
    });
  }
}
