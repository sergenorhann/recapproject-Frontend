import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';
import { Router, RouterLink } from '@angular/router';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css'],
})
export class CarFilterComponent implements OnInit {
  brands: Brand[] = [];
  currentBrand: Brand;
  colors: Color[] = [];
  currentColor: Color;

  allColor?: Color;
  allBrand?: Brand;

  constructor(
    private brandsService: BrandService,
    private colorService: ColorService,
    private router:Router,
  )  {}

  ngOnInit(): void {
    this.getbrands();
    this.getColors();
  }
  getbrands() {
    this.brandsService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  setCurrentBrand(brand: Brand) {
    this.currentBrand = brand;
    console.log(this.currentBrand.id);
  }
  getCurrentBrandClass(brand: Brand) {
    if (brand == this.currentBrand) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
  getAllBrandClass() {
    if (!this.currentBrand) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  setCurrentColor(color: Color) {
    this.currentColor = color;
  }
  getCurrentColorClass(color: Color) {
    if (color == this.currentColor) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
  getAllColorClass() {
    if (!this.currentColor) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }

  getSelectedColor() {
    //console.log(this.currentColor.id.toString());
  }
  allColorSelected() {
    return this.currentColor == undefined ? true : false;
  }

  getSelectedBrand() {
    //console.log(this.currentBrand.id.toString());
  }
  allBrandSelected() {
    return this.currentBrand == undefined ? true : false;
  }

  setRouterLink() {
    if (this.currentBrand&& this.currentColor) {
      return '/cars/getallbyfilter/' + this.currentBrand.id + '/' + this.currentColor.id;
    } else if (this.currentBrand && !this.currentColor) {
      console.log(this.currentBrand.id)
      return '/cars/brand/' + this.currentBrand.id;
    } else if (this.currentColor&& !this.currentBrand) {
      return '/cars/color/' + this.currentColor.id;
    } else {
      return 'cars';
    }
  }

  clearRoute() {
    this.router.navigate(["cars"]);  
    console.log("siledar clearRoute");
  }
  
}
