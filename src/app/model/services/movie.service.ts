import { Injectable } from '@angular/core';
import { Movie } from '../entities/Movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  public moviesList: Movie[] = [];

  constructor() {
    let m1: Movie = new Movie('Spider-Man: Across the Spider-Verse', 0, 'L');
    m1.year = 2023;
    let m2: Movie = new Movie('X', 2, '18');
    m2.year = 2022;
    m2.director = 'Ti West';
    m2.synopsis =
      'A group of actors sets out to make an adult film in rural Texas under the noses of their reclusive hosts, but when the elderly couple catches their young guests in the act, the cast finds themselves in a desperate fight for their lives.';
    let m3: Movie = new Movie('No Hard Feelings', 1, '16');
    let m4: Movie = new Movie('Mid90s', 3, '16');
    m4.year = 2018;
    m4.director = 'Jonah Hill';
    m4.synopsis =
      'In 1990s Los Angeles, a 13-year-old spends his summer navigating between a troubled home life and a crew of new friends he meets at a skate shop.';
    let m5: Movie = new Movie('Summerland', 4, '10');
    m5.year = 2020;
    m5.director = 'Jessica Swale';
    let m6: Movie = new Movie('Prisoners', 5, '16');
    let m7: Movie = new Movie('Interstellar', 6, '10');
    m7.year = 2014;
    m7.director = 'Cristopher Nolan';
    let m8: Movie = new Movie('Pulp Fiction', 7, '18');
    m8.year = 1994;
    m8.director = 'Quentin Tarantino';
    let m9: Movie = new Movie('The Rocky Horror Picture Show', 8, '14');
    let m10: Movie = new Movie('My Neighbor Totoro', 9, 'L');
    m10.year = 1988;
    this.moviesList.push(m1, m2, m3, m4, m5, m6, m7, m8, m9, m10);
  }

  register(movie: Movie) {
    this.moviesList.push(movie);
  }

  getAll(): Movie[] {
    return this.moviesList;
  }

  getByIndex(index: number): Movie {
    return this.moviesList[index];
  }

  update(index: number, add: Movie) {
    this.moviesList[index] = add;
  }

  delete(index: number) {
    this.moviesList.splice(index, 1);
  }
}
