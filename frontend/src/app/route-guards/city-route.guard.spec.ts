import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { cityRouteGuard } from './city-route.guard';

describe('cityRouteGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => cityRouteGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
