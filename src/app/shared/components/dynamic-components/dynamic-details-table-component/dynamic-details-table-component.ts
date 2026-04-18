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
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
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
  @Output() statusChange = new EventEmitter<boolean>();

  private cdr = inject(ChangeDetectorRef);
  rowForms: FormGroup[] = [];

  ngOnInit() {
    setTimeout(() => {
      if (this.config.required && this.config.data().length === 0) {
        this.addRow();
      }
      this.checkValidity();
    }, 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.rowForms = [];
      this.cdr.detectChanges();
    }
  }
  private checkValidity() {
    setTimeout(() => {
      if (this.rowForms.length === 0 && this.config.required) {
        this.statusChange.emit(false);
        return;
      }

      const allRowsValid = this.rowForms.every((f) => f.valid);
      const hasData = this.config.data().length > 0;
      const finalStatus = this.config.required ? hasData && allRowsValid : allRowsValid;

      this.statusChange.emit(finalStatus);
      this.cdr.detectChanges();
    });
  }

  getRowForm(index: number, row: any): FormGroup {
    if (this.rowForms[index]) {
      const group = this.rowForms[index];
      this.config.columns.forEach((col) => {
        const control = group.get(col.fieldName);
        if (control && control.value !== row[col.fieldName]) {
          control.setValue(row[col.fieldName], { emitEvent: false });

          if (
            row[col.fieldName] !== undefined &&
            row[col.fieldName] !== null &&
            row[col.fieldName] !== ''
          ) {
            control.markAsTouched();
            control.updateValueAndValidity({ emitEvent: false });
          }
        }
      });
      return group;
    }

    const group = new FormGroup({});
    this.config.columns.forEach((col) => {
      const control = new FormControl(row[col.fieldName]);
      group.addControl(col.fieldName, control);

      control.valueChanges.subscribe((value) => {
        this.updateValue(index, col.fieldName, value);
      });

      if (
        row[col.fieldName] !== undefined &&
        row[col.fieldName] !== null &&
        row[col.fieldName] !== ''
      ) {
        setTimeout(() => {
          control.markAsTouched();
          control.markAsDirty();
          control.updateValueAndValidity({ emitEvent: true });
        });
      }
    });

    group.statusChanges.subscribe(() => this.checkValidity());
    this.rowForms[index] = group;
    setTimeout(() => this.checkValidity());

    return group;
  }

  updateValue(index: number, fieldName: string, value: any) {
    const currentData = [...this.config.data()];
    if (currentData[index]) {
      currentData[index][fieldName] = value;
      this.config.data.set(currentData);
      this.onDataChange.emit(currentData);
    }
    const allValid =
      this.rowForms.every((f) => f.valid) &&
      (this.config.required ? this.rowForms.length > 0 : true);
    this.statusChange.emit(allValid);
    this.checkValidity();
  }
  addRow() {
    const newRow: any = {};
    this.config.columns.forEach((col) => {
      newRow[col.fieldName] = undefined;
    });

    this.config.data.update((current) => [...current, newRow]);
    setTimeout(() => this.checkValidity());
  }

  removeRow(index: number) {
    if (this.config.required && this.config.data().length <= 1) return;

    this.config.data.update((current) => current.filter((_, i) => i !== index));
    this.rowForms.splice(index, 1);
    this.onDataChange.emit(this.config.data());
    this.checkValidity();
  }
}
