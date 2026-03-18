import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  Validators,
  ValidatorFn,
  FormsModule,
} from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  DynamicInputConfig,
  InputType,
  ValidationConfig,
} from '../../../models/dynamic-input-config';
import { ApiService } from '../../../services/api.service';
import { ComboResultBase } from '../../../models/base-requests';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { forkJoin, timer } from 'rxjs';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-dynamic-input-component',
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, FormsModule],
  templateUrl: './dynamic-input-component.html',
  styleUrl: './dynamic-input-component.scss',
  standalone: true,
})
export class DynamicInputComponent implements OnInit {
  @Input({ required: true }) config!: DynamicInputConfig;
  @Input({ required: true }) form!: FormGroup;
  @Input() showLabel = true;

  @Output() valueChange = new EventEmitter<{ field: string; value: any }>();

  private apiService = inject(ApiService);
  private elementRef = inject(ElementRef);
  types = InputType;
  options = signal<ComboResultBase[]>([]);
  dropdownOpen = false;
  searchTerm: string = '';
  lastSelectedLabel: string = '';
  private searchSubject = new Subject<string>();
  private isInitialLoadDone = false;

  isLoadingOptions = signal<boolean>(false);

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target) && this.dropdownOpen) {
      this.closeDropdown();
    }
  }

  constructor() {
    effect(() => {
      const ctrl = this.control;
      if (!ctrl) return;

      const val = ctrl.value;
      const opts = this.options();

      untracked(() => {
        if (
          val !== null &&
          val !== undefined &&
          opts.length === 0 &&
          this.config.endpoint &&
          !this.isInitialLoadDone
        ) {
          this.loadData();
        }
        this.syncLabel();
      });
    });

    effect(() => {
      const opts = this.options();
      if (!this.control) return;
      untracked(() => {
        if (opts.length > 0) {
          this.syncLabel();
        }
      });
    });
  }
  private syncLabel() {
    const val = this.control?.value;
    if (val === null || val === undefined || val === '') {
      this.lastSelectedLabel = '';
      return;
    }

    const opts = this.options();
    if (opts.length === 0) return;

    const opt = opts.find((o) => String(o.key) === String(val));

    if (opt) {
      this.lastSelectedLabel = opt.value;
    }
  }
  ngOnInit(): void {
    this.setupValidations();

    if (this.config.type !== InputType.Select) {
      this.loadData();
    }

    this.searchSubject.pipe(debounceTime(300), distinctUntilChanged()).subscribe((term) => {
      this.loadData(term);
    });
  }

  toggleDropdown() {
    if (this.dropdownOpen) {
      this.closeDropdown();
    } else {
      this.dropdownOpen = true;
      this.control.markAsTouched();

      if (this.options().length === 0 && this.config.endpoint) {
        this.loadData();
      }
    }
  }

  closeDropdown() {
    this.dropdownOpen = false;
    if (this.searchTerm) {
      this.searchTerm = '';
      this.loadData('');
    }
  }

  private updateLabelFromValue() {
    const val = this.control.value;
    if (val === undefined || val === null) {
      this.lastSelectedLabel = '';
      return;
    }

    const opt = this.options().find((o) => String(o.key) === String(val));

    if (opt) {
      this.lastSelectedLabel = opt.value;
    } else if (this.config.endpoint && val) {
      this.loadData(this.searchTerm);
    }
  }

  getSelectedLabel(): string {
    const selectedKey = this.control.value;
    if (!selectedKey) return '';

    const opt = this.options()?.find((o) => o.key === selectedKey);
    return opt ? opt.value : '';
  }
  selectOption(opt: ComboResultBase) {
    this.lastSelectedLabel = opt.value;
    this.control.setValue(opt.key);
    this.closeDropdown();
  }

  filteredOptions(): ComboResultBase[] {
    const allOptions = this.options() || [];
    const term = this.searchTerm?.toLowerCase().trim() || '';

    if (this.config.endpoint) {
      return allOptions;
    }

    return allOptions.filter((opt) => opt.value.toLowerCase().includes(term));
  }

  get control() {
    return this.form.get(this.config.fieldName)!;
  }

  get isInvalid() {
    return this.control?.touched && this.control?.invalid;
  }
  get isControlValid(): boolean {
    return !!(this.control?.valid && (this.control?.dirty || this.control?.touched));
  }
  get isRequired(): boolean {
    const configs = this.config.validations;
    if (!configs) return false;

    if (Array.isArray(configs)) {
      return configs.some((v) => v.required === true);
    }

    return (configs as ValidationConfig).required === true;
  }

  private setupValidations() {
    const configs = this.config.validations;
    if (!configs) return;

    const validationArray: ValidationConfig[] = Array.isArray(configs) ? configs : [configs];

    const validators: ValidatorFn[] = [];

    validationArray.forEach((v) => {
      if (v.required) validators.push(Validators.required);
      if (v.minLength) validators.push(Validators.minLength(v.minLength));
      if (v.maxLength) validators.push(Validators.maxLength(v.maxLength));
      if (v.email) validators.push(Validators.email);
      if (v.pattern) validators.push(Validators.pattern(v.pattern));
      if (v.min !== undefined) validators.push(Validators.min(v.min));
      if (v.max !== undefined) validators.push(Validators.max(v.max));
    });

    this.control.setValidators(validators);
    this.control.updateValueAndValidity({ emitEvent: false });
  }

  private loadData(search: string = '') {
    if (this.config.type === InputType.Select && this.config.endpoint) {
      if (this.isInitialLoadDone && search === '' && this.options().length > 0) return;

      this.isLoadingOptions.set(true);

      let query: any = this.config.queryModel ? new this.config.queryModel() : {};
      Object.keys(query).forEach((key) => {
        const control = this.form.get(key);
        if (control) query[key] = control.value ?? '';
      });
      query.filter = search;

      // هنا السحر: بنعمل forkJoin بين طلب الداتا و تايمر 500 ملي ثانية
      forkJoin({
        data: this.apiService.getCombo(this.config.endpoint, query),
        delay: timer(500), // هيستنى نص ثانية على الأقل
      })
        .pipe(
          finalize(() => {
            // الـ Loader هيقفل بعد ما الاتنين يخلصوا (الداتا والوقت)
            this.isLoadingOptions.set(false);
          }),
        )
        .subscribe({
          next: (result) => {
            this.options.set(result.data);
            this.isInitialLoadDone = true;
            this.syncLabel();
          },
          error: () => {
            this.isLoadingOptions.set(false);
          },
        });
    } else if (this.config.type === InputType.Enum && this.config.enum) {
      this.options.set(this.mapEnum(this.config.enum));
    } else if (this.config.options) {
      this.options.set(this.config.options);
    }
  }

  onSearch(value: string) {
    this.searchSubject.next(value);
    this.searchTerm = value;
  }

  private mapEnum(enumObj: any): ComboResultBase[] {
    const entries = Object.entries(enumObj)
      .filter(([key]) => isNaN(Number(key)))
      .map(([key, value]) => ({
        key: key,
        value: value as string,
      }));

    if (this.config.showUndefined) {
      return entries;
    }

    return entries.slice(1);
  }
  clearSelection(event: MouseEvent) {
    event.stopPropagation();

    this.control.setValue(null);

    this.searchTerm = '';
    this.lastSelectedLabel = '';

    if (this.config.endpoint) {
      this.loadData('');
    }

    this.valueChange.emit({ field: this.config.fieldName, value: null });

    this.closeDropdown();
  }
  getErrorMessage(): string {
    const errors = this.control.errors;
    if (!errors) return '';

    if (errors['required']) return 'fieldRequired';
    if (errors['email']) return 'inValidEmail';
    if (errors['minlength']) return 'minlength';
    if (errors['maxlength']) return 'maxlength';
    if (errors['pattern']) return 'inValidFormat';

    return 'inValidField';
  }

  getErrorParams() {
    const errors = this.control.errors;
    if (!errors) return {};

    return {
      value:
        errors['minlength']?.requiredLength ||
        errors['maxlength']?.requiredLength ||
        errors['min']?.min ||
        errors['max']?.max ||
        0,
    };
  }

  trackByValue(index: number, item: any) {
    return item.key;
  }

  get inputWidth(): string {
    const baseWidth = 500;
    const calculatedWidth = (this.fieldSpan / 12) * baseWidth;
    return `${calculatedWidth}px`;
  }

  get fieldSpan(): number {
    if (this.config.span) return this.config.span;

    switch (this.config.type) {
      case InputType.TextArea:
        return 6;
      case InputType.Checkbox:
        return 6;
      case InputType.Date:
      case InputType.Select:
        return 6;
      case InputType.Enum:
        return 4;
      default:
        return 6;
    }
  }

  get fieldWidth(): string {
    return `${(this.fieldSpan / 12) * 100}%`;
  }
  get shouldShowError(): boolean {
    return this.config.showErrorMessage !== false;
  }
}
