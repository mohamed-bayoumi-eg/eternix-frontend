import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicInputConfig, InputType } from '../../../models/dynamic-input-config';
import { DynamicInputComponent } from '../dynamic-input-component/dynamic-input-component';

@Component({
  selector: 'app-dynamic-details-table-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, DynamicInputComponent],
  templateUrl: './dynamic-details-table-component.html',
  styleUrl: './dynamic-details-table-component.scss',
})
export class DynamicDetailsTableComponent {
  @Input({ required: true }) title: string = '';

  @Input({ required: true }) columns: DynamicInputConfig[] = [];
  @Input() data = signal<any[]>([]);
  @Output() onDataChange = new EventEmitter<any[]>();

  private cdr = inject(ChangeDetectorRef);

  rowForms: FormGroup[] = [];

  getRowForm(index: number, row: any): FormGroup {
    if (!this.rowForms[index]) {
      const group = new FormGroup({});
      this.columns.forEach((col) => {
        const control = new FormControl(row[col.fieldName]);
        group.addControl(col.fieldName, control);
        control.valueChanges.subscribe((value) => this.updateValue(index, col.fieldName, value));
      });
      this.rowForms[index] = group;
    }
    return this.rowForms[index];
  }

  updateValue(index: number, fieldName: string, value: any) {
    const currentData = [...this.data()];
    if (currentData[index]) {
      currentData[index][fieldName] = value;
      this.data.set(currentData);
      this.onDataChange.emit(currentData);
    }
  }

  addRow() {
    const newRow: any = {};
    this.columns.forEach((col) => (newRow[col.fieldName] = null));
    this.data.update((current) => [...current, newRow]);

    setTimeout(() => {
      this.cdr.detectChanges();
    }, 0);
  }

  removeRow(index: number) {
    this.data.update((current) => current.filter((_, i) => i !== index));
    this.rowForms.splice(index, 1);
    this.onDataChange.emit(this.data());
  }
}
