import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Movie } from 'src/app/model/entities/Movie';
import { MovieService } from 'src/app/model/services/movie.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  register() {
    throw new Error('Method not implemented.');
  }
  index!: number;
  title!: string;
  genre!: number;
  age!: string;
  year!: number;
  director!: string;
  synopsis!: string;
  imageUrl!: string;
  movie!: Movie;
  edit: boolean = true;

  constructor(
    private actRoute: ActivatedRoute,
    private movieService: MovieService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'All Movies',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentConfirmAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'All Movies',
      subHeader: subHeader,
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('canceled');
          },
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {
            this.deleteMovie();
          },
        },
      ],
    });
    await alert.present();
  }

  ngOnInit() {
    this.actRoute.params.subscribe((item) => {
      if (item['index']) {
        this.index = item['index'];
      }
    });
    this.movie = this.movieService.getByIndex(this.index);
    this.title = this.movie.title;
    this.genre = this.movie.genre;
    this.age = this.movie.age;
    this.year = this.movie.year;
    this.director = this.movie.director;
    this.synopsis = this.movie.synopsis;
  }

  enable() {
    if (this.edit) {
      this.edit = false;
    } else {
      this.edit = true;
    }
  }

  toEdit() {
    if (this.title && this.genre && this.age) {
      let create: Movie = new Movie(this.title, this.genre, this.age);
      create.year = this.year;
      create.director = this.director;
      create.synopsis = this.synopsis;
      this.movieService.update(this.index, create);
      this.router.navigate(['/home']);
    } else {
      this.presentAlert('ERROR', 'TITLE, GENRE AND AGE ARE REQUIRED FIELDS!');
    }
  }

  exclude() {
    this.presentConfirmAlert(
      'ATTENTION',
      'Do you really want to delete this movie?'
    );
  }

  deleteMovie() {
    this.movieService.delete(this.index);
    this.router.navigate(['/home']);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
