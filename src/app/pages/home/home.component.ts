import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { PokemonDetail } from 'src/app/models/PokemonDetails.interface';
import { PokemonList } from 'src/app/models/PokemonList.interface';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private offset: number;
  public isLoading: boolean = false;
  public pokemons: PokemonDetail[] = [];
  public isLastPage = false;

  constructor(private pokemonService: PokemonsService) {
    this.offset = 0;
  }

  ngOnInit(): void {
    this.getPage(this.offset);
    this.pokemonService.pokemons$.subscribe((pokes) => {
      this.getPokemon(pokes);
      console.log(pokes);
    });
  }

  openDialog(id: number, message: string) {
    console.log(message);
  }

  deleteItem(id: number) {
    this.pokemons = this.pokemons.filter((val) => val.id !== id);
  }

  getPage(offset: number) {
    if (!this.isLoading && !this.isLastPage) {
      this.isLoading = true;
      this.pokemonService
        .getPokemonList(offset)
        .subscribe((list: PokemonList[]) => {
          if (list.length === 0) {
            this.isLastPage = true;
          }
          if (!this.isLastPage) {
            this.getPokemon(list);
          }
        });
    }
  }

  onScroll(event: Event): void {
    const element: HTMLDivElement = event.target as HTMLDivElement;
    if (element.scrollHeight - element.scrollTop < 1000) {
      this.getPage(this.offset);
    }
  }

  private getPokemon(list: PokemonList[]) {
    const arr: Observable<PokemonDetail>[] = [];
    list.map((value: PokemonList) => {
      arr.push(this.pokemonService.getPokemonDetail(value.name));
    });

    forkJoin([...arr]).subscribe((pokemons) => {
      this.pokemons.push(...pokemons);
      this.offset += 20;
      this.isLoading = false;
    });
  }

}
