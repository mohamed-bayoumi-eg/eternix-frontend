import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { DynamicInputConfig } from '../../../models/dynamic-input-config';
import { DynamicFormPageConfig } from 'src/app/shared/models/dynamic-page-config';

import { DynamicInputComponent } from '../dynamic-input-component/dynamic-input-component';
import { ConfirmDialogComponent } from '../../ui-components/confirm-dialog-component/confirm-dialog-component';
import { AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-dynamic-form-page-component',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    DynamicInputComponent,
    ConfirmDialogComponent,
  ],
  templateUrl: './dynamic-form-page-component.html',
  styleUrl: './dynamic-form-page-component.scss',
})
export class DynamicFormPageComponent implements OnInit {
  @Input({ required: true }) controls: DynamicInputConfig[] = [];
  @Input() isLoading = false;
  @Input() tabs: string[] = [];
  @Input() isExtraDataValid = true;

  private _initialData: any = null;
  @Input() set initialData(value: any) {
    if (!value || typeof value === 'function') return;
    this._initialData = value;
    this.applyPatch();
  }

  private _config!: DynamicFormPageConfig;
  @Input({ required: true }) set config(value: DynamicFormPageConfig) {
    this._config = {
      showSaveBtn: true,
      showSaveAndNewBtn: true,
      showDeleteBtn: true,
      showCopyBtn: true,
      ...value,
    };
  }

  @Output() onSave = new EventEmitter<any>();
  @Output() onSaveAndNew = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();
  @Output() onCopy = new EventEmitter<void>();

  form = new FormGroup({});
  activeTab = 0;
  showConfirmDialog = false;
  private formCreated = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.controls && this.controls.length > 0) {
      this.createForm();
    }
  }

  private createForm() {
    if (this.formCreated) return;

    const uniqueControls = this.controls.filter(
      (v, i, a) => a.findIndex((t) => t.fieldName === v.fieldName) === i,
    );

    uniqueControls.forEach((ctrl) => {
      if (!this.form.contains(ctrl.fieldName)) {
        this.form.addControl(ctrl.fieldName, new FormControl(null));
      }
    });

    this.formCreated = true;
    this.applyPatch();
  }

  private applyPatch() {
    const controls = Object.values(this.form.controls);

    if (this._initialData && controls.length > 0) {
      this.form.patchValue(this._initialData);

      (controls as AbstractControl[]).forEach((control) => {
        control.updateValueAndValidity({ emitEvent: false });
      });

      this.form.markAllAsTouched();
      this.cdr.detectChanges();
    }
  }

  handleSave(isSaveAndNew = false) {
    if (this.form.invalid || !this.isExtraDataValid) return;

    if (isSaveAndNew) {
      this.onSaveAndNew.emit(this.form.value);
      this.form.reset();
    } else {
      this.onSave.emit(this.form.value);
    }
  }

  handleDialogResult(result: boolean) {
    this.showConfirmDialog = false;
    if (result) this.onDelete.emit();
  }

  get config() {
    return this._config;
  }
  get hasTabs() {
    return this.tabs?.length > 0;
  }
  get isEdit() {
    return !!(this._initialData?.id || this._initialData?.code);
  }
}
