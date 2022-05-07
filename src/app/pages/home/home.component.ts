import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { PokemonDetail } from 'src/app/models/PokemonDetails.interface';
import { PokemonList } from 'src/app/models/PokemonList.interface';
import { PokemonsService } from 'src/app/services/pokemons.service';
import { MessageService } from 'primeng/api';
import { debounceTime, map, tap } from 'rxjs/operators';
import { LoadingService } from 'src/app/components/loading/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService],
})
export class HomeComponent implements OnInit {
  private offset: number;
  public isLoading: boolean = false;
  public pokemons: PokemonDetail[] = [];
  public isLastPage = false;
  public showButton = false;
  public searchError = false;

  constructor(
    private pokemonService: PokemonsService,
    @Inject(DOCUMENT) private document: Document,
    private messageService: MessageService,
    public loadingService: LoadingService
  ) {
    this.offset = 0;
  }

  ngOnInit(): void {
    this.getPokemons();
  }

  private getPokemons() {
    this.loadingService.show();
    this.pokemonService.pokemonsDetails$.subscribe((pokes) => {
      this.pokemons = [...pokes];
      this.offset = this.pokemonService.offsetSubject.value;
      this.loadingService.hide()
      if (!pokes.length) {
        this.pokemonService.offsetSubject.next(0);
        this.getPage(this.offset);
      }
    });
  }

  public deleteItem(id: number) {
    this.pokemons = this.pokemons.filter((val) => val.id !== id);
    this.pokemonService.pokemonsDetails.next(this.pokemons);
    this.messageService.add({
      severity: 'success',
      summary: 'Confirmed',
      detail: 'Deleted pokemon',
    });
  }

  private getPage(offset: number) {
    if (!this.isLoading && !this.isLastPage) {
      this.isLoading = true;
      this.loadingService.hide();
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

  public search(inputSearch: any) {
    if (inputSearch.length > 3) {
      this.loadingService.show();
      this.pokemonService
        .getSearchPokemons(inputSearch)
        .pipe(debounceTime(1500))
        .subscribe(
          (res) => {
            this.searchError = false;
            this.loadingService.hide();
            this.pokemons = [];
            this.pokemons.push(res);
            this.pokemonService.pokemonsDetails.next(this.pokemons);
          },
          (err) => {
            this.loadingService.hide();
            this.searchError = true;
          }
        );
    } else {
      this.getPage(0);
    }
  }

  @HostListener('window:scroll', [])
  public onWindowScroll(): void {
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

  public onScrollDown() {
    if (!this.isLastPage) {
      this.offset += 10;
      this.pokemonService.offsetSubject.next(this.offset);
      this.getPage(this.offset);
    }
  }

  public onScrollTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
