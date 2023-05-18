import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { City } from 'src/app/models/interfaces/City';
import { CityService } from 'src/app/services/city.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppConstants } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
})
export class CityComponent implements OnInit {
  city: City = {
    id: 0,
    name: '',
    photo: '',
  };
  errorMessage: string = '';

  constructor(
    private cityService: CityService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getCityById(Number(id));
  }

  getCityById(id: number): void {
    this.cityService.getById(id).subscribe(
      (data: City) => {
        this.city = data;
      },
      (err) => {
        this.errorMessage = err.error.message;
      }
    );
  }

  onSubmit(): void {
    this.spinner.show(undefined, { fullScreen: true });
    this.cityService.update(this.city).subscribe(
      (data) => {
        this.city = data;
        this.spinner.hide();
        alert('City updated Successfully');
        this.router.navigate(['cities']);
      },
      (err) => {
        this.spinner.hide();
        this.errorMessage = err.error.message;
      }
    );
  }
  public handleMissingImage(event: Event) {
    (event.target as HTMLImageElement).src = AppConstants.IMAGE_NOT_FOUND_URL;
  }
}
