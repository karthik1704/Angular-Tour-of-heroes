import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

import { Hero } from "./hero";
import { MessageService } from "./message.service";

@Injectable({
  providedIn: "root"
})
export class HeroService {
  private herosUrl = "api/heroes";
  httpOptions = {
    headers: new HttpHeaders({ "content-type": " application/json" })
  };
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.herosUrl).pipe(
      tap(_ => this.log("fetched heroes")),
      catchError(this.handleError<Hero[]>("getHeroes", []))
    );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.herosUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id = ${id}`))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.herosUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated her id=${hero.id}`)),
      catchError(this.handleError<any>("updateHero"))
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.herosUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added Hero w/ id= ${hero.id}`)),
      catchError(this.handleError<Hero>("addHero"))
    );
  }

  deleteHero(hero: Hero): Observable<Hero> {
    const id = typeof hero === "number" ? hero : hero.id;
    const url = `${this.herosUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id = ${id}`)),
      catchError(this.handleError<Hero>("deleteHero"))
    );
  }

  private handleError<T>(operation = "operations", result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
