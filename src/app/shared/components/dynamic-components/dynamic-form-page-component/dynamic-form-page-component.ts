import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicInputConfig } from '../../../models/dynamic-input-config';
import { DynamicInputComponent } from '../dynamic-input-component/dynamic-input-component';

@Component({
  selector: 'app-dynamic-form-page-component',
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, DynamicInputComponent],
  templateUrl: './dynamic-form-page-component.html',
  styleUrl: './dynamic-form-page-component.scss',
})
export class DynamicFormPageComponent implements OnInit {
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) controls: DynamicInputConfig[] = [];
  @Input() isLoading: boolean = false;

  private _initialData: any = null;
  @Input() set initialData(value: any) {
    if (!value || typeof value === 'function') return;

    this._initialData = value;

    if (this.form && Object.keys(this.form.controls).length > 0) {
      this.applyPatch();
    }
  }

  @Output() onSave = new EventEmitter<any>();
  @Output() onSaveAndAdd = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  form: FormGroup = new FormGroup({});

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.createForm();
    if (this._initialData) {
      this.applyPatch();
    }
  }
  private applyPatch() {
    setTimeout(() => {
      this.form.patchValue(this._initialData);
      this.form.updateValueAndValidity();
      this.cdr.markForCheck();
    }, 0);
  }
  private createForm() {
    this.controls.forEach((control) => {
      if (!this.form.contains(control.fieldName)) {
        this.form.addControl(control.fieldName, new FormControl(null));
      }
    });
    this.cdr.detectChanges();
  }
  onSubmit() {
    if (this.form.valid) {
      this.onSave.emit(this.form.value);
    }
  }

  onSaveAndNew() {
    if (this.form.valid) {
      this.onSaveAndAdd.emit(this.form.value);
      this.form.reset();
    }
  }
  get initialData() {
    return this._initialData;
  }
  get isEdit(): boolean {
    return !!(this.initialData && (this.initialData.id || this.initialData.code));
  }

  get actionKey(): string {
    return this.isEdit ? 'edit' : 'add';
  }
}
