import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FormgroupComponent } from './formgroup/formgroup.component';

const routes: Routes = [
  { path: 'home', component: AppComponent },
  { path: 'form', component: FormgroupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
