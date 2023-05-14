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

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss'],
})
export class CityListComponent implements OnInit, OnDestroy {
  cities: City[] = [];
  totalElements: number = 0;
  private readonly searchSubject = new Subject<string | undefined>();
  private searchSubscription?: Subscription;
  @ViewChild('searchQueryEle', { static: true }) searchQueryElement: ElementRef;
  searchQuery: string = '';

  constructor(public cityService: CityService, searchQueryElement: ElementRef) {
    this.searchQueryElement = searchQueryElement;
  }

  ngOnInit(): void {
    this.getCities({ page: 0, size: 12 }, '');
    // this.searchSubject.next('');
  }

  private getCities(pageRequest: PageParam, searchQuery: string): void {
    this.cityService
      .getAll(pageRequest.page, pageRequest.size, searchQuery)
      .subscribe(
        (data: Page) => this.setCitiesData(data),
        (error) => {
          console.log(error.error.message);
        },
        () => {
          this.setupSearchSubscription(pageRequest, searchQuery);
        }
      );
  }

  private setupSearchSubscription(
    pageRequest: PageParam,
    searchQuery: string
  ): void {
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
        (data: Page) => this.setCitiesData(data),
        (error) => {
          console.log(error.error.message);
        },
        () => {}
      );
  }

  private setCitiesData(data: Page): void {
    this.cities = data?.content;
    this.totalElements = data?.totalElements;
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
}
