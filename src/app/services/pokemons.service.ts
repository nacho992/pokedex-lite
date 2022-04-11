import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PokemonDetail } from '../models/PokemonDetails.interface';
import { PokemonList } from '../models/PokemonList.interface';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EnvolvesToChain } from '../models/EvolvesTo.interface';
import { EvolutionQuery } from '../models/EvolutionQuery.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  private baseUrl = environment.API_POKE;
  public pokemonsDetails = new BehaviorSubject<PokemonDetail[]>([]);
  public pokemonsDetails$ = this.pokemonsDetails.asObservable();
  constructor(private http: HttpClient) {}

  public getPokemonList(
    offset: number,
    limit: number = 40
  ): Observable<PokemonList[]> {
    return this.http
      .get<PokemonList[]>(
        this.baseUrl + 'pokemon?offset=' + offset + '&limit=' + limit
      )
      .pipe(map((x: any) => x.results));
  }

  public getPokemonDetail(pokemon: number | string): Observable<PokemonDetail> {
    return this.http.get<PokemonDetail>(this.baseUrl + 'pokemon/' + pokemon);
  }

  public getPokemonEvolvesTo(pokemon: number): Observable<EnvolvesToChain> {
    return this.http.get<EnvolvesToChain>(
      this.baseUrl + 'evolution-chain/' + pokemon
    );
  }

  public getPokemonEvolution(pokemon: number): Observable<EvolutionQuery> {
    return this.http.get<EvolutionQuery>(
      this.baseUrl + 'pokemon-species/' + pokemon
    );
  }
}
