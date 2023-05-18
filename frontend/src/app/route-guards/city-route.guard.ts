import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/interfaces/User';
import { StorageService } from '../services/storage.service';
@Injectable({
  providedIn: 'root',
})
export class CityRouteGuard implements CanActivate {
  constructor(public storageService: StorageService, public router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.storageService.isLoggedIn()) {
      window.alert('Access denied!');
      this.router.navigate(['login']);
    }
    const user: User = this.storageService.getUser();
    if (user && !user.roles.includes('ROLE_ALLOW_EDIT')) {
      window.alert('Access denied!');
      this.router.navigate(['login']);
    }
    return true;
  }
}
