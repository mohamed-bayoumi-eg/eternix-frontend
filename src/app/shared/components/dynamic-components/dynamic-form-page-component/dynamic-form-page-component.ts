import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { DynamicInputConfig } from '../../../models/dynamic-input-config';
import { DynamicFormPageConfig } from 'src/app/shared/models/dynamic-page-config';

import { DynamicInputComponent } from '../dynamic-input-component/dynamic-input-component';
import { ConfirmDialogComponent } from '../../ui-components/confirm-dialog-component/confirm-dialog-component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PermissionType } from 'src/app/features/auth/roles/enums/role.enums';

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
  private authService = inject(AuthService);

  @Input() isLoading = false;
  @Input() tabs: string[] = [];
  @Input() isExtraDataValid = true;
  formPatched = false;

  private _controls: DynamicInputConfig[] = [];

  @Input({ required: true }) set controls(value: DynamicInputConfig[]) {
    this._controls = value;
    if (this.formCreated) {
      this.syncFormControls();
    }
  }

  get controls() {
    return this._controls;
  }

  private _initialData: any = null;
  @Input() set initialData(value: any) {
    if (!value || typeof value === 'function') return;
    this._initialData = value;
    this.applyPatch();
    this.updatePermissions();
  }

  private _config!: DynamicFormPageConfig;

  @Input({ required: true }) set config(value: DynamicFormPageConfig) {
    this._config = { ...value };
    this.updatePermissions();
  }

  private updatePermissions() {
    if (!this._config) return;

    const title = this._config.title;
console.log( this.authService.hasPermission(title, PermissionType.Create))
    this._config = {
      ...this._config,
      showSaveBtn: this.isEdit
        ? this.authService.hasPermission(title, PermissionType.Update)
        : this.authService.hasPermission(title, PermissionType.Create),
      showSaveAndNewBtn:
        !this.isEdit && this.authService.hasPermission(title, PermissionType.Create),
      showDeleteBtn: this.authService.hasPermission(title, PermissionType.Delete),
      showCopyBtn: this.authService.hasPermission(title, PermissionType.Create),
    };
  }

  @Output() onValueChange = new EventEmitter<{ field: string; value: any }>();
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
    this.syncFormControls();
    this.formCreated = true;
    this.applyPatch();
  }

  private syncFormControls() {
    this._controls.forEach((ctrl) => {
      if (!this.form.contains(ctrl.fieldName)) {
        this.form.addControl(ctrl.fieldName, new FormControl(null));
      }
    });

    Object.keys(this.form.controls).forEach((key) => {
      const exists = this._controls.find((c) => c.fieldName === key);
      if (!exists) {
        this.form.removeControl(key);
      }
    });

    this.cdr.detectChanges();
  }

  private applyPatch() {
    if (this._initialData && this.formCreated) {
      setTimeout(() => {
        this.form.patchValue(this._initialData);

        this.formPatched = true;

        const controlsMap = this.form.controls as { [key: string]: AbstractControl };

        Object.values(controlsMap).forEach((control) => {
          control.updateValueAndValidity({ emitEvent: false });
        });

        this.form.markAllAsTouched();
        this.cdr.detectChanges();
      });
    }
  }

  handleSave(isSaveAndNew = false) {
    if (this.form.invalid || !this.isExtraDataValid) return;

    this._initialData = { ...this._initialData, ...this.form.getRawValue() };
    console.log(this._initialData);
    this.formPatched = false;
    if (isSaveAndNew) {
      this.onSaveAndNew.emit(this.form.value);
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
