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
    if (
      changes['config'] &&
      changes['config'].currentValue.columns !== changes['config'].previousValue?.columns
    ) {
      this.rowForms = [];
    }
  }
  private checkValidity() {
    setTimeout(() => {
      const allRowsValid = this.rowForms.length > 0 ? this.rowForms.every((f) => f.valid) : true;

      const hasData = this.config.data().length > 0;
      const finalStatus = this.config.required ? hasData && allRowsValid : allRowsValid;

      this.statusChange.emit(finalStatus);
      this.cdr.detectChanges();
    }, 0);
  }
  getRowForm(index: number, row: any): FormGroup {
    if (!this.rowForms[index]) {
      const group = new FormGroup({});

      this.config.columns.forEach((col) => {
        const control = new FormControl();
        group.addControl(col.fieldName, control);

        control.setValue(row[col.fieldName], { emitEvent: false });
        control.valueChanges.subscribe((value) => {
          this.updateValue(index, col.fieldName, value);
        });
        group.statusChanges.subscribe(() => {
          this.checkValidity();
        });

        if (row[col.fieldName] !== undefined && row[col.fieldName] !== null) {
          setTimeout(() => {
            control.markAsTouched();
            control.updateValueAndValidity();
          });
        }
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
