import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PokemonDetail } from 'src/app/models/PokemonDetails.interface';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-card-row',
  templateUrl: './card-row.component.html',
  styleUrls: ['./card-row.component.scss'],
  providers: [ConfirmationService,MessageService],
})
export class CardRowComponent {
  @Input() pokemon!: PokemonDetail;
  @Output() deleteEvent = new EventEmitter<number>();

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
        this.deleteItem(this.pokemon.id)
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
}
