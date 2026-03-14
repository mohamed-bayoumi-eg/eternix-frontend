import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicInputConfig, InputType } from '../../../models/dynamic-input-config';
import { DynamicInputComponent } from '../dynamic-input-component/dynamic-input-component';
import { DynamicDetailsTableConfig } from 'src/app/shared/models/dynamic-details-table-config';

@Component({
  selector: 'app-dynamic-details-table-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, DynamicInputComponent],
  templateUrl: './dynamic-details-table-component.html',
  styleUrl: './dynamic-details-table-component.scss',
})
export class DynamicDetailsTableComponent implements OnInit, OnChanges {
  @Input({ required: true }) config!: DynamicDetailsTableConfig;

  @Output() onDataChange = new EventEmitter<any[]>();

  private cdr = inject(ChangeDetectorRef);
  rowForms: FormGroup[] = [];

  ngOnInit() {
    setTimeout(() => {
      if (this.config.required && this.config.data().length === 0) {
        this.addRow();
      }
    }, 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
 
    if (
      changes['config'] &&
      changes['config'].currentValue.columns !== changes['config'].previousValue?.columns
    ) {
      this.rowForms = [];
    }
  }

getRowForm(index: number, row: any): FormGroup {
  if (!this.rowForms[index]) {
    const group = new FormGroup({});

    this.config.columns.forEach((col) => {
      const control = new FormControl();
      group.addControl(col.fieldName, control);

      control.setValue(row[col.fieldName], { emitEvent: false });

      if (row[col.fieldName] !== undefined && row[col.fieldName] !== null) {
        setTimeout(() => {
          control.markAsTouched();
          control.updateValueAndValidity(); 
        });
      }

      control.valueChanges.subscribe((value) => {
        this.updateValue(index, col.fieldName, value);
      });
    });

    this.rowForms[index] = group;
  }
  return this.rowForms[index];
}

  updateValue(index: number, fieldName: string, value: any) {
    const currentData = [...this.config.data()];
    if (currentData[index]) {
      currentData[index][fieldName] = value;
      this.config.data.set(currentData);
      this.onDataChange.emit(currentData);
    }
  }
  addRow() {
    const newRow: any = {};
    this.config.columns.forEach((col) => {
      newRow[col.fieldName] = undefined;
    });

    this.config.data.update((current) => [...current, newRow]);
  }

  removeRow(index: number) {
    if (this.config.required && this.config.data().length <= 1) return;

    this.config.data.update((current) => current.filter((_, i) => i !== index));
    this.rowForms.splice(index, 1);
    this.onDataChange.emit(this.config.data());
  }
}
