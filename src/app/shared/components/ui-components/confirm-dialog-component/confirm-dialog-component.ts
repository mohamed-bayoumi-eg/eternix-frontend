import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-confirm-dialog-component',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './confirm-dialog-component.html',
  styleUrl: './confirm-dialog-component.scss',
})
export class ConfirmDialogComponent {
  @Input() title: string = 'deleteConfirmation';
  @Input() message: string = 'areYouSureYouWantToDelete';

  @Output() result = new EventEmitter<boolean>();

  onClose(status: boolean) {
    this.result.emit(status);
  }
}
