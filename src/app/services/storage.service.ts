import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PokemonDetail } from '../models/PokemonDetails.interface';
const MY_FAVORITES = 'myFavorites';
const ACCES_TOKEN = 'acces_token'
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private charactersFavSubject = new BehaviorSubject<PokemonDetail[]>([]);
  charactersFav$ = this.charactersFavSubject.asObservable();

  constructor() { 
    this.initialStorage();
   }

   addOrRemoveFavorite(character: PokemonDetail): void {
    const { id } = character;
    const currentsFav = this.getFavoritesCharacters();
    const found = !!currentsFav.find((fav: PokemonDetail) => fav.id === id);
    found ? this.removeFromFavorite(id) : this.addToFavorite(character);
  }

  private addToFavorite(character: PokemonDetail): void {
    try {
      const currentsFav = this.getFavoritesCharacters();
      localStorage.setItem(MY_FAVORITES, JSON.stringify([...currentsFav, character]));
      this.charactersFavSubject.next([...currentsFav, character]);
     /*  this.toastrSvc.success(`${character.name} added to favorite`, 'RickAndMortyAPP'); */
    } catch (error) {
      console.log('Error saving localStorage', error);
      /* this.toastrSvc.error(`Error saving localStorage ${error} `, 'RickAndMortyAPP'); */
    }
  }

  private removeFromFavorite(id: number): void {
    try {
      const currentsFav: PokemonDetail[] = this.getFavoritesCharacters();
      const characters = currentsFav.filter(item => item.id !== id);
      localStorage.setItem(MY_FAVORITES, JSON.stringify([...characters]));
      this.charactersFavSubject.next([...characters]);
   /*    this.toastrSvc.warning(`Removed from favorite`, 'RickAndMortyAPP'); */
    } catch (error) {
      console.log('Error removing localStorage', error);
 /*      this.toastrSvc.error(`Error removing localStorage ${error} `, 'RickAndMortyAPP') */;
    }

  }

  getFavoritesCharacters(): any {
    try {
      const charactersFav = JSON.parse(localStorage.getItem('myFavorites') ?? 'myFavorites');
      this.charactersFavSubject.next(charactersFav);
      return charactersFav;
    } catch (error) {
      console.log('Error getting favorites from localStorage', error);
    }
  }

  clearStorage(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.log('Error cleaning localStorage', error);
    }
  }

  private initialStorage(): void {
    const currents = JSON.parse(localStorage.getItem('myFavorites') ?? 'myFavorites');
    if (!currents) {
      localStorage.setItem(MY_FAVORITES, JSON.stringify([]));
    }
  }
}
