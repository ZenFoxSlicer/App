import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { MaterialModule } from '../shared/material-module/materiale.module';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LandingPageComponent,
    FrontPageComponent,
    LoginDialogComponent],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    LandingPageRoutingModule
  ],
  entryComponents: [LoginDialogComponent],
})
export class LandingPageModule { }
