import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PokemonDetail } from 'src/app/models/PokemonDetails.interface';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-create-edit-form',
  templateUrl: './create-edit-form.component.html',
  styleUrls: ['./create-edit-form.component.scss'],
})
export class CreateEditFormComponent implements OnInit {
  private id!: number;
  public edit!: boolean;
  public title!: string;
  private pokemons: PokemonDetail[] = [];
  datos = this.fb.group({
    sprites: ['', [Validators.required]],
    id: ['', [Validators.required]],
    name: ['', [Validators.required]],
    type: ['', [Validators.required]],
    lvl: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private pokemonService: PokemonsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.pokemonService.pokemonsDetails$.subscribe((pokes) => {
      this.pokemons = pokes;
    });
    this.id = this.route.snapshot.params.id;
    if (this.id != 0) {
      const pokeEdit = this.pokemons.filter((poke) => poke.id == this.id);
      this.setPokemon(pokeEdit);
      this.pokemons = this.pokemons.filter((poke) => poke.id != this.id);
      this.edit = true;
      this.title = 'Edit';
    } else {
      this.edit = false;
      this.title = 'Create';
    }
  }

  public editPokemon(): void {
    this.setData()
  }

  public createPokemon(): void {
    this.setData()
  }

  private setData(): void{
    const poke: PokemonDetail = {
      sprites: { front_default: this.datos.get('sprites')?.value },
      id: this.datos.get('id')?.value,
      name: this.datos.get('name')?.value,
      base_experience: this.datos.get('lvl')?.value,
      types: [
        {
          slot: 1,
          type: { name: this.datos.get('type')?.value },
        },
      ],
    };
    this.pokemons.unshift(poke);
    this.pokemonService.pokemonsDetails.next(this.pokemons);
    this.location.back();
  }

  private setPokemon(pokemon: any): any {
    this.datos.controls['sprites'].setValue(pokemon[0]?.sprites.front_default);
    this.datos.controls['id'].setValue(pokemon[0]?.id);
    this.datos.controls['name'].setValue(pokemon[0]?.name);
    this.datos.controls['lvl'].setValue(pokemon[0]?.base_experience);
    this.datos.controls['type'].setValue(pokemon[0]?.types[0].type.name);
    return pokemon;
  }

  onGoBack(): void {
    this.location.back();
  }
}
