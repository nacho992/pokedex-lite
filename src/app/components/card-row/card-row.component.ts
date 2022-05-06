import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PokemonDetail } from 'src/app/models/PokemonDetails.interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { colors } from 'src/environments/environment';

@Component({
  selector: 'app-card-row',
  templateUrl: './card-row.component.html',
  styleUrls: ['./card-row.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class CardRowComponent  {
  @Input() pokemon!: PokemonDetail;
  @Output() deleteEvent = new EventEmitter<number>();
  colors = colors
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  confirm() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmed',
          detail: 'Deleted pokemon',
        });
        this.deleteItem(this.pokemon.id);
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
  }

  public deleteItem(id: number) {
    this.deleteEvent.emit(id);
  }

  public getColorByType(type: any): string{
    return Object.values(this.colors)[
      Object.keys(this.colors).indexOf(type)
    ];
  }

  public getPrimaryColor(): string{
    const main_types: string[] = Object.keys(this.colors)
    const poke_types: string[] = this.pokemon.types.map(type => type.type.name) 
    const type: string = main_types.find(type => poke_types.indexOf(type) > -1 )!
    return Object.values(this.colors)[Object.keys(this.colors).indexOf(type)]
  }
}
