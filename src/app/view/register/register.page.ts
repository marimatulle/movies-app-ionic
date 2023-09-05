import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Movie } from 'src/app/model/entities/Movie';
import { MovieService } from 'src/app/model/services/movie.service';

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

  constructor(
    private alertController: AlertController,
    private router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit() {}

  register() {
    if (this.title && this.genre && this.age) {
      let create: Movie = new Movie(this.title, this.genre, this.age);
      create.year = this.year;
      create.synopsis = this.synopsis;
      create.director = this.director;
      this.movieService.register(create);
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
