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
import { Router, ActivatedRoute } from '@angular/router';

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
  private router = inject(Router);
  private route = inject(ActivatedRoute);
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
    } else {
      this.createForm();
    }
  }

  get controls() {
    return this._controls;
  }

  private _initialData: any = null;
  @Input() set initialData(value: any) {
    this._initialData = value;

    if (!value) {
      if (this.formCreated) {
        this.form.reset();
        this.form.markAsPristine();
        this.form.markAsUntouched();
      }
    } else if (typeof value !== 'function') {
      this.applyPatch();
    }

    this.updatePermissions();
    this.cdr.detectChanges();
  }
  private _config!: DynamicFormPageConfig;

  @Input({ required: true }) set config(value: DynamicFormPageConfig) {
    this._config = { ...value };
    this.updatePermissions();
  }

  private updatePermissions() {
    if (!this._config) return;

    const screenKey = this._config.title;

    const canCreate = this.authService.hasPermission(screenKey, PermissionType.Create);
    const canUpdate = this.authService.hasPermission(screenKey, PermissionType.Update);
    const canDelete = this.authService.hasPermission(screenKey, PermissionType.Delete);

    this._config = {
      ...this._config,
      showSaveBtn: this.isEdit ? canUpdate : canCreate,

      showSaveAndNewBtn: canCreate,

      showDeleteBtn: this.isEdit && canDelete,
      showCopyBtn: canCreate,
    };

    this.cdr.detectChanges();
  }

  @Output() onValueChange = new EventEmitter<{ field: string; value: any }>();
  @Output() onSave = new EventEmitter<any>();
  @Output() onSaveAndNew = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<void>();
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
    this.updatePermissions();
    this.cdr.detectChanges();
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
      this.form.reset(undefined, { emitEvent: false });
      this.form.patchValue(this._initialData);
      this.formPatched = true;

      setTimeout(() => {
        this.form.patchValue(this._initialData);

        const controlsMap = this.form.controls as { [key: string]: AbstractControl };
        Object.values(controlsMap).forEach((control) => {
          control.updateValueAndValidity({ emitEvent: false });
        });

        this.form.markAllAsTouched();

        this.cdr.detectChanges();
      }, 0);

      this.cdr.detectChanges();
    }
  }
  handleAddCancel() {
    const targetRoute = this.isEdit ? '../../' : '../';
    this.router.navigate([targetRoute], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
    });
  }
  handleSave(isSaveAndNew = false) {
    if (this.form.invalid || !this.isExtraDataValid) return;

    const dataToSend = { ...this._initialData, ...this.form.getRawValue() };
    this.formPatched = false;

    if (isSaveAndNew) {
      this.onSaveAndNew.emit(dataToSend);
    } else {
      this.onSave.emit(dataToSend);
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
