import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserImage } from 'src/app/models/userImage';
import { AuthService } from 'src/app/services/auth.service';
import { UserImageService } from 'src/app/services/user-image.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  userImage: UserImage;
  user: any = {};
  userId: number;
  userImagePath:string;
  imageUrl = 'https://localhost:44347';

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private userImageService: UserImageService
  ) {}
   
  ngOnInit(): void {
    if (this.checkIfLogin()) {
      this.getUserByEmail();
    }
  }

  checkIfLogin() {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.toastrService.info('Çıkış Yapıldı');
    localStorage.clear();
    window.location.reload();
  }

  getUserByEmail() {
    this.userService
      .getUserByMail(localStorage.getItem('email'))
      .subscribe((response) => {
        this.user = response.data;
        this.userId = this.user.id;
        this.getUserImageByUserId();
      });
  }

  getUserImageByUserId() {
    this.userImageService
      .getUserImageByUserId(this.userId)
      .subscribe((response) => {
        this.userImage = response.data;
        this.userImagePath=this.imageUrl+this.userImage.imagePath;
      });
  }
}