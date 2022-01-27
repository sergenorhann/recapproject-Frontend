import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  currentBrand: Brand;
  updateBrandForm: FormGroup;
  filterText = '';

  constructor(
    private brandService: BrandService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getBrands();
    this.updateBrandFormControl();
  }

  setCurrentCarDetail(brand: Brand) {
    this.currentBrand = brand;
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  setCurrentBrand(brand: Brand) {
    this.currentBrand = brand;
  }
  updateBrand() {
    if (this.updateBrandForm.valid) {
      let brand = Object.assign(
        { id: this.currentBrand.id },
        this.updateBrandForm.value
      );
      this.brandService.updateBrand(brand).subscribe(
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
  updateBrandFormControl() {
    this.updateBrandForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  deleteBrand() {
    this.brandService.deleteBrand(this.currentBrand).subscribe(
      (response) => {
        if (response.success) {
          this.toastrService.success(response.message, 'Brand Silindi');
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
