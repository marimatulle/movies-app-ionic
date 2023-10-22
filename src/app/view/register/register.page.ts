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
  public imageUrl!: string;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private firebase: FirebaseService
  ) {}

  ngOnInit() {}

  goToHome() {
    this.router.navigate(["/home"]);
  }

  register() {
    if (this.title && this.genre && this.age) {
      let create: Movie = new Movie(this.title, this.genre, this.age);
      create.year = this.year;
      create.synopsis = this.synopsis;
      create.director = this.director;
      create.imageUrl = this.imageUrl;
      this.firebase.register(create);
      this.router.navigate(['/home']);
    } else {
      this.presentAlert('ERROR', 'TITLE, GENRE AND AGE ARE REQUIRED FIELDS!');
    }
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
