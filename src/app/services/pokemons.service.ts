import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PokemonDetail } from '../models/PokemonDetails.interface';
import { PokemonList } from '../models/PokemonList.interface';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  private baseUrl = environment.API_POKE;
  private pokemons = new BehaviorSubject<PokemonList[]>([]);
  public pokemons$ = this.pokemons.asObservable();
  constructor(private http: HttpClient) {}

  getPokemonList(
    offset: number,
    limit: number = 20
  ): Observable<PokemonList[]> {
    return this.http
      .get<PokemonList[]>(
        this.baseUrl + 'pokemon?offset=' + offset + '&limit=' + limit
      )
      .pipe(map((x: any) => x.results), tap((pokes) => this.pokemons.next(pokes)));
  }

  getPokemonDetail(pokemon: number | string): Observable<PokemonDetail> {
    return this.http.get<PokemonDetail>(this.baseUrl + 'pokemon/' + pokemon);
  }
}
