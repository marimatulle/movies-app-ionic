import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Movie } from 'src/app/model/entities/Movie';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import { AuthService } from 'src/app/model/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public movies: Movie[] = [];
  public user: any;

  constructor(
    private router: Router,
    private firebase: FirebaseService,
    private auth: AuthService
  ) {
    this.user = this.auth.getLoggedInUser();

    this.firebase.findAll().subscribe((res) => {
      this.movies = res.map((movie) => {
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

  logOut() {
    this.auth.signOut();
    this.router.navigate(['signin']);
  }
}
