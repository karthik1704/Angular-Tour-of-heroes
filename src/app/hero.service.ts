import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";

import { Hero } from "./hero";
import { HEROES } from "./mock-heroes";

@Injectable({
  providedIn: "root"
})
export class HeroService {
  constructor() {}
  getHeroes(): Observable<Hero[]> {
    return of(HEROES);
  }
}
