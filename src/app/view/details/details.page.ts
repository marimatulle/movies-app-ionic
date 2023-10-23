import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Movie } from 'src/app/model/entities/Movie';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
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
    private firebase: FirebaseService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.movie = history.state.movie;

    this.title = this.movie?.title;
    this.genre = this.movie?.genre;
    this.age = this.movie?.age;
    this.year = this.movie?.year;
    this.director = this.movie?.director;
    this.synopsis = this.movie?.synopsis;
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
      create.id = this.movie.id;
      this.firebase
        .update(create, this.movie.id)
        .then(() => {
          this.router.navigate(['/home']);
        })
        .catch((error) => {
          console.log(error);
          this.presentAlert('ERROR', 'Error updating movie');
        });
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
    this.firebase
      .delete(this.movie.id)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.log(error);
        this.presentAlert('ERROR', 'Error when deleting movie');
      });
  }

  goToHome() {
    this.router.navigate(['/home']);
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
}
