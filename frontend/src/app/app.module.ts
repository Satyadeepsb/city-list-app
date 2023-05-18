import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CityListComponent } from './components/city-list/city-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { httpInterceptorProviders } from './interceptors/http.interceptor';
import { CityComponent } from './components/city/city.component';
import { authInterceptorProviders } from './interceptors/auth.interceptor';
import { CityRouteGuard } from './route-guards/city-route.guard';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    CityListComponent,
    LoginComponent,
    CityComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
  ],
  providers: [
    httpInterceptorProviders,
    authInterceptorProviders,
    CityRouteGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
