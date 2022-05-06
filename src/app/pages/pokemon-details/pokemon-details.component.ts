import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonsService } from 'src/app/services/pokemons.service';
import { Location } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { PokemonDetail } from 'src/app/models/PokemonDetails.interface';
import { colors } from 'src/environments/environment';

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
  colors = colors
  public colorPoke: string = '';
  public pokemon: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private id!: number;
  public evolveslinks: evolvesObject[] = [];
  public pokemon$ = this.pokemon.asObservable();
  public type!: string

  constructor(
    private location: Location,
    private pokemonService: PokemonsService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    if (this.id) {
      this.getDestailsAndEvolutions();
    }
  }

  public selectEvolved(item: any): void {
    this.pokemonService.getPokemonDetail(item).subscribe((res) => {
      this.pokemon.next(res);
    });
  }

  public onGoBack(): void {
    this.location.back();
  }

  private setColorByType(res: PokemonDetail){
    const main_types: string[] = Object.keys(this.colors)
    const poke_types: string[] = res.types.map(type => type.type.name) 
    const type: string = main_types.find(type => poke_types.indexOf(type) > -1 )!
    this.colorPoke = Object.values(this.colors)[Object.keys(this.colors).indexOf(type)]
  }

  public getColorByType(type: any): string{
    return Object.values(this.colors)[
      Object.keys(this.colors).indexOf(type)
    ];
  }

  private getDestailsAndEvolutions(){
    this.pokemonService
    .getPokemonDetail(this.id)
    .subscribe((pokemonDetails) => {
      this.setColorByType(pokemonDetails);
      this.pokemon.next(pokemonDetails);
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
