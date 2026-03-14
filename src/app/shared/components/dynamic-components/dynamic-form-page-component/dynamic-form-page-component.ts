import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicInputConfig } from '../../../models/dynamic-input-config';
import { DynamicInputComponent } from '../dynamic-input-component/dynamic-input-component';
import { ConfirmDialogComponent } from '../../ui-components/confirm-dialog-component/confirm-dialog-component';
@Component({
  selector: 'app-dynamic-form-page-component',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    DynamicInputComponent,
    ConfirmDialogComponent,
  ],
  templateUrl: './dynamic-form-page-component.html',
  styleUrl: './dynamic-form-page-component.scss',
  standalone: true,
})
export class DynamicFormPageComponent implements OnInit {
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) controls: DynamicInputConfig[] = [];
  @Input() isLoading: boolean = false;
  @Input() tabs: string[] = [];
  activeTab: number = 0;

  private _initialData: any = null;
  @Input() set initialData(value: any) {
    if (!value || typeof value === 'function') return;

    this._initialData = value;

    if (this.form && Object.keys(this.form.controls).length > 0) {
      this.applyPatch();
    }
  }

  @Output() onSave = new EventEmitter<any>();
  @Output() onSaveAndNew = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();
  @Output() onCopy = new EventEmitter<void>();

  form: FormGroup = new FormGroup({});
  showConfirmDialog = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.createForm();
    if (this._initialData) {
      this.applyPatch();
    }
  }
  private applyPatch() {
    if (!this.form) return;

    setTimeout(() => {
      this.form.reset();

      this.form.patchValue(this._initialData);

      this.form.markAllAsTouched();
      this.form.markAsDirty();

      this.form.updateValueAndValidity();

      this.cdr.detectChanges();
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
  onClickSave() {
    if (this.form.valid) {
      this.onSave.emit(this.form.value);
    }
  }

  onClickSaveAndNew() {
    if (this.form.valid) {
      this.onSaveAndNew.emit(this.form.value);
      this.form.reset();
    }
  }
  onClickDelete() {
    this.showConfirmDialog = true;
  }
  handleDialogResult(result: boolean) {
    this.showConfirmDialog = false;
    if (result) {
      this.onDelete.emit();
    }
  }
  onClickCopy() {
    this.onCopy.emit();
  }
  onClickCancel() {
    this.onCancel.emit();
  }
  selectTab(index: number) {
    this.activeTab = index;
    this.cdr.detectChanges();
  }

  get hasTabs(): boolean {
    return this.tabs && this.tabs.length > 0;
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
