import { Component, OnInit } from '@angular/core';
import { UserImage } from 'src/app/models/userImage';
import { UserImageService } from 'src/app/services/user-image.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [UserImageService],
})
export class AccountComponent implements OnInit {
  userImagesPath:string;
  user: any = {};
  userId: number;
  imageUrl = 'https://localhost:44347';

  constructor(
    private userImageService: UserImageService,
    private userService: UserService
  ) {}
    
  ngOnInit(): void {
      this.getUserByEmail();
 
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
        this.userImagesPath = this.imageUrl+response.data.imagePath;

      });
  }
}
