import { Rental } from 'src/app/models/rental';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/models/cartItem';
import { CartService } from 'src/app/services/cart.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-car-rent',
  templateUrl: './car-rent.component.html',
  styleUrls: ['./car-rent.component.css'],
})

export class CarRentComponent implements OnInit {
  cartItems: CartItem[] = [];
  carRentForm: FormGroup;
  cardForm: FormGroup;
  carId: number;
  user: any = {};
  customer: any = {};
  customerId: number;
  currentRent: any = {};


  iban: number = 1;
  cNumber: number = 1;
  sc: number = 1;
  name: string = "1";

  constructor(
    private cartService: CartService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private customerService: CustomerService,
    private rentalService: RentalService,
    private router: Router,
    private activetedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getCarId();
    this.getUserByEmail();
    this.createCarRentForm();
  }

  getCarId() {
    this.carId = +localStorage.getItem('carid');
  }

  getUserByEmail() {
    this.userService
      .getUserByMail(localStorage.getItem('email'))
      .subscribe((response) => {
        this.user = response.data;
        this.getCustomerByUserId(this.user.id);
      });
  }

  getCustomerByUserId(userId: number) {
    this.customerService.getCustomerByUserId(userId).subscribe((response) => {
      this.customer = response.data;
      this.customerId = this.customer.id;
    });
  }

  createCarRentForm() {
    this.carRentForm = this.formBuilder.group({
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required],
      carId: ['', Validators.required],
      customerId: ['', Validators.required]
      //disabled yapıp carid ve customeridyi veri olarak göstereceğiz verigirişi olmamalı
    });
  }

  rent() {
    if (this.carRentForm.valid) {
      let rentModel = Object.assign({}, this.carRentForm.value);
      this.rentalService.rent(rentModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarıyla kiralandı');
        //kiralama sonrası modalı kapatıp kiralamalar bölümüne yönlendirme yapılmalı, modalı nasıl kod ile kapattıracağız?

        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }

}
