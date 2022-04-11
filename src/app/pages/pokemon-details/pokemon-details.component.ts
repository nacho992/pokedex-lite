import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonsService } from 'src/app/services/pokemons.service';
import { Location } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { PokemonDetail } from 'src/app/models/PokemonDetails.interface';

interface evolvesObject {
  name: string;
  url: string;
}
@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent implements OnInit {
  public pokemon: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private id!: number;
  public evolveslinks: evolvesObject[] = [];
  public pokemon$ = this.pokemon.asObservable()

  constructor(
    private location: Location,
    private pokemonService: PokemonsService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    if (this.id) {
      this.pokemonService
        .getPokemonDetail(this.id)
        .subscribe((pokemonDetails) => {
          this.pokemon.next(pokemonDetails)
          console.log(this.pokemon.value);
          this.pokemonService
            .getPokemonSpecies(pokemonDetails.species?.url)
            .subscribe((PokeSpecie) => {
              this.pokemonService
                .getPokemonEvolvesTo(PokeSpecie.evolution_chain.url)
                .subscribe((evolve) => {
                  this.evolveslinks.push({
                    url: evolve.chain.species.url,
                    name: evolve.chain.species.name,
                  });
                  this.evolveslinks.push({
                    url: evolve.chain.evolves_to[0]?.species.url,
                    name: evolve.chain.evolves_to[0]?.species.name,
                  });
                  this.evolveslinks.push({
                    url: evolve.chain.evolves_to[0]?.evolves_to[0]?.species.url,
                    name: evolve.chain.evolves_to[0]?.evolves_to[0]?.species
                      .name,
                  });
                });
            });
        });
    }
  }

  public selectEvolved(item: any): void {
    this.pokemonService.getPokemonDetail(item).subscribe((res) => {
      this.pokemon.next(res)
    });
  }

  public onGoBack(): void {
    this.location.back();
  }
}
