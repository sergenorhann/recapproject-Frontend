import { CarDetail } from './../../models/carDetail';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  carDetails: CarDetail[] = [];
  images: CarImage[] = [];

  carId: number;
  dailyPrice:number;


  imageUrl="https://localhost:44347";
  constructor(
    private carDetailService: CarDetailService,
    private activetedRoute: ActivatedRoute,
    private carImageService: CarImageService,
    private toastrService:ToastrService,
    private cartService:CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activetedRoute.params.subscribe((params) => {
      if (params['carid']) {
        this.getCarsDetailByCarId(params['carid']);
        this.getCarImageByCarId(params['carid'])
      } else {
        this.getCarDetail();
      }
    });
  }
  getCarDetail() {
    this.carDetailService.getCarDetail().subscribe((response) => {
      this.carDetails = response.data;
    });
  }
  getCarsDetailByCarId(carId: number) {
    this.carDetailService.getCarsDetailByCarId(carId).subscribe((response) => {
      this.carDetails = response.data;
    });
  }
  getCarImageByCarId(carId : number){
    this.carImageService.getCarImageByCarId(carId).subscribe((response) => {
      this.images = response.data;
    });
  }
  addToCart(carDetail: CarDetail) {
    localStorage.setItem("carid",carDetail.id.toString());
    this.router.navigate(['carrent']);
  }
}
