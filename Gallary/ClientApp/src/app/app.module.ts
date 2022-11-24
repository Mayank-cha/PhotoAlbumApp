import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from './material.module';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { CardComponent } from './Card/card.component';
import { GridComponent } from './Grid/grid.component';
import { FilterPipe } from './Services/pipe/filter.pipe';
import { AddPopUpComponent } from './AddPopup/addPopUp.component';
import { restService } from './Services/rest.service';
import { UpPopUpModel } from './Services/Models/popup.model';
import { UpdatePopUpComponent } from './UpdatePopUp/UpdatePopUp.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CardComponent,
    GridComponent,
    FilterPipe,
    AddPopUpComponent,
    UpdatePopUpComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ApiAuthorizationModule,
    BrowserAnimationsModule,
    MaterialExampleModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
    AuthorizeService,restService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
