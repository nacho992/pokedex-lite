import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PokemonDetail } from 'src/app/models/PokemonDetails.interface';

@Component({
  selector: 'app-card-row',
  templateUrl: './card-row.component.html',
  styleUrls: ['./card-row.component.scss']
})
export class CardRowComponent implements OnInit {

  @Input() pokemon!: PokemonDetail
  @Output() deleteEvent= new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  public deleteItem(id: number){
    this.deleteEvent.emit(id)
  }

}
