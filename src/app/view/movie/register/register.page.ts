import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Movie } from 'src/app/model/entities/Movie';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterComponent implements OnInit {
  public title!: string;
  public genre!: number;
  public age!: string;
  public synopsis!: string;
  public year!: number;
  public director!: string;
  public image: any; 

  constructor(
    private alertController: AlertController,
    private router: Router,
    private firebase: FirebaseService
  ) {}

  ngOnInit() {}

  goToHome() {
    this.router.navigate(["/home"]);
  }

  uploadFile(image: any) {
    this.image = image.files;
  }

  register() {
    if (this.title && this.genre && this.age) {
      let create: Movie = new Movie(this.title, this.genre, this.age);
      create.year = this.year;
      create.synopsis = this.synopsis;
      create.director = this.director;
      if(this.image) {
        this.firebase.addImage(this.image, create)
        ?.then(() => {
          this.router.navigate(['/home']);
        })
      }
      this.firebase.register(create)
      .then(() => this.router.navigate(['/home']))
      .catch((error) => {
        console.log(error);
        this.presentAlert('ERROR', 'Error saving movie!');
      })
    }
    this.presentAlert('ERROR', 'Required fields are missing!');
  }

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'All Movies',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
