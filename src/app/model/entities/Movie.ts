export class Movie {
  private _title: string;
  private _genre: number;
  private _age: string;
  private _year!: number;
  private _director!: string;
  private _synopsis!: string;
  private _imageUrl!: string;

  constructor(title: string, genre: number, age: string) {
    this._title = title;
    this._genre = genre;
    this._age = age;
  }

  public get title(): string {
    return this._title;
  }
  public set title(title: string) {
    this._title = title;
  }

  public get genre(): number {
    return this._genre;
  }
  public set genre(genre: number) {
    this._genre = genre;
  }

  public get age(): string {
    return this._age;
  }
  public set age(age: string) {
    this._age = age;
  }

  public get year(): number {
    return this._year;
  }
  public set year(value: number) {
    this._year = value;
  }

  public get director(): string {
    return this._director;
  }
  public set director(value: string) {
    this._director = value;
  }

  public get synopsis(): string {
    return this._synopsis;
  }
  public set synopsis(value: string) {
    this._synopsis = value;
  }

  public get imageUrl(): string {
    return this._imageUrl;
  }
  public set imageUrl(value: string) {
    this._imageUrl = value;
  }
}
