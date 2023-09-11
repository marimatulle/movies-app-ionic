import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Movie } from 'src/app/model/entities/Movie';
import { MovieService } from 'src/app/model/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public allMovies: Movie[] = [];

  constructor(
    private alertController: AlertController,
    private router: Router,
    private movieService: MovieService
  ) {
    this.allMovies = this.movieService.getAll();
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  edit(index: number) {
    this.router.navigate(['/details', index]);
  }
}
