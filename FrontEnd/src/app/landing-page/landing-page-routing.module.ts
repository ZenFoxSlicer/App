import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page.component';
import { FrontPageComponent } from './front-page/front-page.component';

const routes: Routes = [
  {
    path: '', component: LandingPageComponent,
    children: [
      { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
      {
        path: 'landing-page', component: FrontPageComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }
