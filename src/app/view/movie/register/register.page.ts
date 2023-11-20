import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Movie } from 'src/app/model/entities/Movie';
import { AuthService } from 'src/app/model/services/auth.service';
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
  user: any;

  constructor(
    private alertController: AlertController,
    private auth: AuthService,
    private router: Router,
    private firebase: FirebaseService
  ) {
    this.user = this.auth.getLoggedInUser();
  }

  ngOnInit() {}

  goToHome() {
    this.router.navigate(['/home']);
  }

  uploadFile(image: any) {
    this.image = image.files;
  }

  register() {
    if (!this.title || !this.genre || !this.age || !this.image) {
      this.presentAlert('ERROR', 'Required fields are missing!');
      return;
    }

    let newMovie: Movie = new Movie(this.title, this.genre, this.age);
    newMovie.year = this.year;
    newMovie.synopsis = this.synopsis;
    newMovie.director = this.director;
    newMovie.uid = this.user.uid;

    this.firebase.addImage(this.image, newMovie)?.then((resp) => {
      this.router.navigate(['/home']);
    });
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
