import { Injectable } from '@angular/core';
import { Movie } from '../entities/Movie';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private PATH: string = 'movies';

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

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
      downloadUrl: movie.downloadUrl,
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
      downloadUrl: movie.downloadUrl,
    });
  }

  delete(id: string) {
    return this.firestore.collection(this.PATH).doc(id).delete();
  }

  addImage(image: any, movie: Movie) {
    const file = image.item(0);
    if (file.type.split('/')[0] !== 'image') {
      console.error('Image not supported');
      return;
    }
    const path = `images/${movie.title}_${file.name}`;
    const fileRef = this.storage.ref(path);
    let task = this.storage.upload(path, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          let uploadFileUrl = fileRef.getDownloadURL();
          uploadFileUrl.subscribe((resp) => {
            movie.downloadUrl = resp;
            if (!movie.id) {
              this.register(movie);
            }
            this.update(movie, movie.id);
          });
        })
      )
      .subscribe();
    return task;
  }
}
