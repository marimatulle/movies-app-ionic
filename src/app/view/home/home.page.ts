import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Movie } from 'src/app/model/entities/Movie';
import { FirebaseService } from 'src/app/model/services/firebase.service';

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
    private firebase: FirebaseService
  ) {
    this.firebase.findAll().subscribe((res) => {
      this.allMovies = res.map((movie) => {
        return {
          id: movie.payload.doc.id,
          ...(movie.payload.doc.data() as any),
        } as Movie;
      });
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  edit(movie: Movie) {
    this.router.navigateByUrl('/details', { state: { movie: movie } });
  }
}
