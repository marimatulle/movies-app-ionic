import { Injectable } from '@angular/core';
import { Movie } from '../entities/Movie';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATH: string = "movies";

  constructor(private firestore: AngularFirestore) {
  }

  findAll() {
    return this.firestore.collection(this.PATH).snapshotChanges();
  }

  register(movie: Movie) {
    return this.firestore.collection(this.PATH).add({
      title: movie.title,
      genre: movie.genre,
      age: movie.age,
      year: movie.year,
      director: movie.director,
      synopsis: movie.synopsis,
      imageUrl: movie.imageUrl
    });
  }

  update(movie: Movie, id: string) {
    return this.firestore.collection(this.PATH).doc(id).update({
      title: movie.title,
      genre: movie.genre,
      age: movie.age,
      year: movie.year,
      director: movie.director,
      synopsis: movie.synopsis,
      imageUrl: movie.imageUrl,
    });
  }

  delete(id: string) {
    return this.firestore.collection(this.PATH).doc(id).delete();
  }
}
