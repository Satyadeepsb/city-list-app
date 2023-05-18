import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { City } from 'src/app/models/interfaces/City';
import { Page } from 'src/app/models/interfaces/Page';
import { PageParam } from 'src/app/models/interfaces/PageParam';
import { CityService } from 'src/app/services/city.service';
import {
  Subject,
  Subscription,
  distinctUntilChanged,
  debounceTime,
  switchMap,
} from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppConstants } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss'],
})
export class CityListComponent implements OnInit, OnDestroy {
  cities: City[] = [];
  totalElements: number = 0;
  roles: string[] = [];
  private readonly searchSubject = new Subject<string | undefined>();
  private searchSubscription?: Subscription;
  @ViewChild('searchQueryEle', { static: true }) searchQueryElement: ElementRef;
  searchQuery: string = '';

  constructor(
    public cityService: CityService,
    searchQueryElement: ElementRef,
    private storageService: StorageService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.searchQueryElement = searchQueryElement;
  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.roles = this.storageService.getUser().roles;
    }
    this.getCities({ page: 0, size: 12 }, '');
  }

  private getCities(pageRequest: PageParam, searchQuery: string): void {
    this.spinner.show(undefined, { fullScreen: true });
    this.cityService
      .getAll(pageRequest.page, pageRequest.size, searchQuery)
      .subscribe(
        (data: Page) => {
          this.setCitiesData(data);
        },
        (error) => {
          console.log(error.error.message);
          this.spinner.hide();
        },
        () => {
          this.setupSearchSubscription(pageRequest, searchQuery);
          this.spinner.hide();
        }
      );
  }

  private setupSearchSubscription(
    pageRequest: PageParam,
    searchQuery: string
  ): void {
    this.spinner.show(undefined, { fullScreen: true });
    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(3000),
        distinctUntilChanged(),
        switchMap((searchQuery) =>
          this.cityService.getAll(
            pageRequest.page,
            pageRequest.size,
            searchQuery
          )
        )
      )
      .subscribe(
        (data: Page) => {
          this.setCitiesData(data);
        },
        (error) => {
          console.log(error.error.message);
          this.spinner.hide();
        },
        () => {
          this.spinner.hide();
        }
      );
  }

  private setCitiesData(data: Page): void {
    this.cities = data?.content;
    this.totalElements = data?.totalElements;
    this.spinner.hide();
  }

  public onSearchQueryInput(event: Event): void {
    const searchQuery = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchQuery?.trim());
  }

  nextPage(event: PageEvent) {
    const searchQuery = this.searchQueryElement.nativeElement.value;
    let request: PageParam = {
      page: event.pageIndex,
      size: event.pageSize,
    };
    this.searchSubscription?.unsubscribe();
    this.getCities(request, searchQuery?.trim());
    this.searchSubject.next(searchQuery?.trim());
  }

  public ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }

  public handleMissingImage(event: Event) {
    (event.target as HTMLImageElement).src = AppConstants.IMAGE_NOT_FOUND_URL;
  }

  public redirectTo(id: number): void {
    this.router.navigate(['cities', id]);
  }
}
