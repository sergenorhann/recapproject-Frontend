import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Car } from 'src/app/models/car';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  currentCar: Car;
  cars: Car[] = [];
  filterText = '';
  updateCarForm: FormGroup;

  constructor(
    private carService: CarService,
    private activetedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activetedRoute.params.subscribe((params) => {
      if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else if ((params['brandId'], params['colorId'])) {
        this.getCarsByFilter(params['brandId'], params['colorId']);
      } else {
        this.getCars();
      }
      this.updateCarFormControl();
    });
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
    });
  }
  getCarsByFilter(colorId: number, brandId: number) {
    this.carService.getCarsByFilter(colorId, brandId).subscribe((response) => {
      this.cars = response.data;
    });
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
    });
  }
  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
    });
  }
  setCurrentCar(car: Car) {
    this.currentCar = car;
  }

  addToCart(car: Car) {
    localStorage.setItem("carid", car.id.toString());
    this.router.navigate(['carrent']);
  }

  updateCar() {
    if (this.updateCarForm.valid) {
      let car = Object.assign(
        { id: this.currentCar.id },
        this.updateCarForm.value
      );
      this.carService.updateCar(car).subscribe(
        (response) => {
          if (response.success) {
            this.toastrService.success(response.message, 'Güncelleme Başarılı');
          } else {
            this.toastrService.error(
              response.message,
              "Güncelleneme Başarısız'"
            );
          }
        },
        (error) => {
          console.log(error);
          for (let i = 0; i < error.error.Errors.length; i++) {
            this.toastrService.error(error.error.Errors[i].ErrorMessage);
          }
        }
      );
    } else {
      this.toastrService.error('Hatalı Giriş Yaptınız', 'Hata');
    }
  }
  updateCarFormControl() {
    this.updateCarForm = this.formBuilder.group({
      colorId: ['', Validators.required],
      brandId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  deleteCar() {
    this.carService.deleteCar(this.currentCar).subscribe(
      (response) => {
        if (response.success) {
          this.toastrService.success(response.message, 'Car Silindi');
        } else {
          this.toastrService.error(response.message, 'Hata');
        }
      },
      (error) => {
        console.log(error);
        for (let i = 0; i < error.error.Errors.length; i++) {
          this.toastrService.error(error.error.Errors[i].ErrorMessage);
        }
      }
    );
  }
}
