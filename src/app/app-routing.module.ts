import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Xta5yComponent } from './pages/xta5y/xta5y.component';

const routes: Routes = [
  { path: '', component: Xta5yComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
