import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityListComponent } from './components/city-list/city-list.component';
import { CityComponent } from './components/city/city.component';
import { LoginComponent } from './components/login/login.component';
import { CityRouteGuard } from './route-guards/city-route.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cities', component: CityListComponent },
  {
    path: 'cities/:id',
    component: CityComponent,
    canActivate: [CityRouteGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
