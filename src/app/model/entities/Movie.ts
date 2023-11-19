export class Movie {
  private _id!: string;
  private _title: string;
  private _genre: number;
  private _age: string;
  private _year!: number;
  private _director!: string;
  private _synopsis!: string;
  private _downloadUrl: any;
  private _uid!: string;

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

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  public get downloadUrl(): any {
    return this._downloadUrl;
  }
  public set downloadUrl(value: any) {
    this._downloadUrl = value;
  }

  public get uid(): string {
    return this._uid;
  }
  public set uid(value: string) {
    this._uid = value;
  }
}
