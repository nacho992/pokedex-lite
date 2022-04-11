import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
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
  public showButton = false

  constructor(private pokemonService: PokemonsService, @Inject(DOCUMENT) private document: Document) {
    this.offset = 0;
  }

  ngOnInit(): void {
    this.pokemonService.pokemonsDetails$.subscribe((pokes) => {
      this.pokemons = pokes;
      if (!pokes.length) {
        this.getPage(this.offset);
      }
    });
  }

  deleteItem(id: number) {
    this.pokemons = this.pokemons.filter((val) => val.id !== id);
    this.pokemonService.pokemonsDetails.next(this.pokemons)
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

  private getPokemon(list: PokemonList[]) {
    const arr: Observable<PokemonDetail>[] = [];
    list.map((value: PokemonList) => {
      arr.push(this.pokemonService.getPokemonDetail(value.name));
    });

    forkJoin([...arr]).subscribe((pokemons) => {
      this.pokemons.push(...pokemons);
      this.offset += 20;
      this.isLoading = false;
      this.pokemonService.pokemonsDetails.next(this.pokemons);
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const yOffSet = window.pageYOffset;
    if (
      (yOffSet ||
        this.document.documentElement.scrollTop ||
        this.document.body.scrollTop) > 20
    ) {
      this.showButton = true;
    } else if (
      this.showButton &&
      (yOffSet ||
        this.document.documentElement.scrollTop ||
        this.document.body.scrollTop) < 20
    ) {
      this.showButton = false;
    }
  }

  onScrollTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}
