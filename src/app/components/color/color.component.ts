import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
})
export class ColorComponent implements OnInit {
  colors: Color[] = [];
  currentColor: Color;
  updateColorForm: FormGroup;
  filterText = '';

  constructor(
    private colorService: ColorService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getColors();
    this.updateColorFormControl();
  }

  setCurrentCarDetail(color: Color) {
    this.currentColor = color;
  }
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  setCurrentColor(color: Color) {
    this.currentColor = color;
  }

  updateColor() {
    if (this.updateColorForm.valid) {
      let color = Object.assign(
        { id: this.currentColor.id },
        this.updateColorForm.value
      );
      this.colorService.updateColor(color).subscribe(
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
  updateColorFormControl() {
    this.updateColorForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  deleteColor() {
    this.colorService.deleteColor(this.currentColor).subscribe(
      (response) => {
        if (response.success) {
          this.toastrService.success(response.message, 'Color Silindi');
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
