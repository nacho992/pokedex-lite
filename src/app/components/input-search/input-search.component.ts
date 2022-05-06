import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss'],
})
export class InputSearchComponent {
  @Output() searched: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  public search(inputSearch: any) {
    this.searched.emit(inputSearch);
  }
}
