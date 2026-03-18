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
import { TranslateModule } from '@ngx-translate/core';
import {
  DynamicInputConfig,
  InputType,
  ValidationConfig,
} from '../../../models/dynamic-input-config';
import { ApiService } from '../../../services/api.service';
import { ComboResultBase } from '../../../models/base-requests';
import { Subject, forkJoin, timer } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize } from 'rxjs/operators';
import { computed } from '@angular/core';
@Component({
  selector: 'app-dynamic-input-component',
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, FormsModule],
  templateUrl: './dynamic-input-component.html',
  styleUrl: './dynamic-input-component.scss',
  standalone: true,
})
export class DynamicInputComponent implements OnInit {
  private _config!: DynamicInputConfig;

  @Input({ required: true }) set config(value: DynamicInputConfig) {
    this._config = value;
    if (this.isInitialLoadDone || this.form) {
      this.setupValidations();
    }
  }
  @Input({ required: true }) form!: FormGroup;
  @Input() showLabel = true;
  @Output() valueChange = new EventEmitter<{ field: string; value: any }>();

  private apiService = inject(ApiService);
  private elementRef = inject(ElementRef);

  types = InputType;
  options = signal<ComboResultBase[]>([]);
  isLoadingOptions = signal<boolean>(false);
  dropdownOpen = false;
  searchTerm: string = '';
  private searchSubject = new Subject<string>();
  private isInitialLoadDone = false;
  currentValue = signal<any>(null);
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target) && this.dropdownOpen) {
      this.closeDropdown();
    }
  }

  constructor() {
    effect(() => {
      const val = this.currentValue();
      const opts = this.options();

      untracked(() => {
        if (
          this.hasValue(val) &&
          opts.length === 0 &&
          this.config.endpoint &&
          !this.isInitialLoadDone
        ) {
          this.loadData();
        }
      });
    });
  }
  ngOnInit(): void {
    this.setupValidations();

    const initialValue = this.control?.value;
    this.currentValue.set(initialValue);

    this.control?.valueChanges.subscribe((val) => {
      this.currentValue.set(val);
    });

    if (this.hasValue(initialValue) && this.config.endpoint) {
      this.loadData();
    }

    if (this.config.type !== InputType.Select && this.config.type !== InputType.MultiSelect) {
      this.loadData();
    }

    this.searchSubject.pipe(debounceTime(300), distinctUntilChanged()).subscribe((term) => {
      this.loadData(term);
    });
  }

  private loadData(search: string = '') {
    if (
      (this.config.type === InputType.Select || this.config.type === InputType.MultiSelect) &&
      this.config.endpoint
    ) {
      if (this.isInitialLoadDone && search === '' && this.options().length > 0) return;

      this.isLoadingOptions.set(true);
      let query: any = this.config.queryModel ? new this.config.queryModel() : {};

      Object.keys(query).forEach((key) => {
        const ctrl = this.form.get(key);
        if (ctrl) query[key] = ctrl.value ?? '';
      });
      query.filter = search;

      forkJoin({
        data: this.apiService.getCombo(this.config.endpoint, query),
        delay: timer(200),
      })
        .pipe(finalize(() => this.isLoadingOptions.set(false)))
        .subscribe({
          next: (res) => {
            this.options.set(res.data);
            this.isInitialLoadDone = true;
          },
          error: () => this.isLoadingOptions.set(false),
        });
    } else if (this.config.type === InputType.Enum && this.config.enum) {
      this.options.set(this.mapEnum(this.config.enum));
    } else if (this.config.options) {
      this.options.set(this.config.options);
    }
  }
  private hasValue(val: any): boolean {
    if (Array.isArray(val)) return val.length > 0;
    return val !== null && val !== undefined && val !== '';
  }
  selectedLabelsSignal = computed(() => {
    const values = this.currentValue();
    const opts = this.options();

    if (!Array.isArray(values) || values.length === 0 || opts.length === 0) {
      return '';
    }

    const selectedKeys = values.map((v: any) => String(v).trim());

    return opts
      .filter((o) => selectedKeys.includes(String(o.key).trim()))
      .map((o) => o.value)
      .join(', ');
  });

  toggleOption(opt: ComboResultBase) {
    let currentValues = this.control.value;

    if (!Array.isArray(currentValues)) {
      currentValues = currentValues ? [currentValues] : [];
    }

    const index = currentValues.findIndex((v: any) => String(v) === String(opt.key));

    if (index > -1) {
      currentValues.splice(index, 1);
    } else {
      currentValues.push(opt.key);
    }

    this.control.setValue([...currentValues]);
    this.control.markAsDirty();
    this.valueChange.emit({ field: this.config.fieldName, value: currentValues });
  }

  getSelectedLabels(): string {
    const values = this.control?.value;
    if (!Array.isArray(values) || values.length === 0) return '';

    const opts = this.options();
    if (opts.length === 0) return '';

    const selectedStringValues = values.map((v: any) => String(v).trim());

    return opts
      .filter((o) => selectedStringValues.includes(String(o.key).trim()))
      .map((o) => o.value)
      .join(', ');
  }
  isSelected(key: any): boolean {
    const values = this.control?.value;
    if (!Array.isArray(values)) {
      return String(values) === String(key);
    }
    return values.some((v: any) => String(v).trim() === String(key).trim());
  }

  getSelectedLabel(): string {
    const val = this.control?.value;
    const opts = this.options();
    if (val === null || val === undefined || opts.length === 0) return '';

    const opt = opts.find((o) => String(o.key) === String(val));
    return opt ? opt.value : '';
  }

  selectOption(opt: ComboResultBase) {
    this.control.setValue(opt.key);
    this.control.markAsDirty();
    this.valueChange.emit({ field: this.config.fieldName, value: opt.key });
    this.closeDropdown();
  }

  toggleDropdown() {
    if (this.dropdownOpen) return this.closeDropdown();
    this.dropdownOpen = true;
    this.control.markAsTouched();
    if (this.options().length === 0 && this.config.endpoint) this.loadData();
  }

  closeDropdown() {
    this.dropdownOpen = false;
    if (this.searchTerm) {
      this.searchTerm = '';
      this.loadData('');
    }
  }

  onSearch(value: string) {
    this.searchTerm = value;
    this.searchSubject.next(value);
  }

  clearSelection(event: MouseEvent) {
    event.stopPropagation();
    this.control.setValue(null);
    this.control.markAsDirty();
    this.valueChange.emit({ field: this.config.fieldName, value: null });
    this.closeDropdown();
  }

  private setupValidations() {
    const configs = this.config.validations;
    if (!configs) return;
    const validationArray = Array.isArray(configs) ? configs : [configs];
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

  private mapEnum(enumObj: any): ComboResultBase[] {
    const entries = Object.entries(enumObj)
      .filter(([key]) => isNaN(Number(key)))
      .map(([key, value]) => ({ key: enumObj[key], value: key }));
    return this.config.showUndefined ? entries : entries.slice(1);
  }

  get control() {
    return this.form.get(this.config.fieldName)!;
  }
  get isInvalid() {
    return this.control?.touched && this.control?.invalid;
  }
  get isControlValid() {
    return !!(this.control?.valid && (this.control?.dirty || this.control?.touched));
  }
  get isRequired(): boolean {
    const v = this.config.validations;
    if (!v) return false;

    if (Array.isArray(v)) {
      return (v as ValidationConfig[]).some((i) => i.required === true);
    }

    return (v as ValidationConfig).required === true;
  }
  get fieldWidth() {
    return `${(this.fieldSpan / 12) * 100}%`;
  }
  get inputWidth() {
    return `${(this.fieldSpan / 12) * 500}px`;
  }
  get shouldShowError() {
    return this.config.showErrorMessage !== false;
  }

  get fieldSpan(): number {
    if (this.config.span) return this.config.span;
    const spans: any = {
      [InputType.TextArea]: 6,
      [InputType.Checkbox]: 6,
      [InputType.Date]: 6,
      [InputType.Select]: 6,
      [InputType.Enum]: 4,
    };
    return spans[this.config.type] || 6;
  }

  getErrorMessage(): string {
    const errs = this.control.errors;
    if (!errs) return '';
    const map: any = {
      required: 'fieldRequired',
      email: 'inValidEmail',
      minlength: 'minlength',
      maxlength: 'maxlength',
      pattern: 'inValidFormat',
    };
    const key = Object.keys(map).find((k) => errs[k]);
    return key ? map[key] : 'inValidFormat';
  }

  getErrorParams() {
    const e = this.control.errors;
    return e
      ? {
          value:
            e['minlength']?.requiredLength ||
            e['maxlength']?.requiredLength ||
            e['min']?.min ||
            e['max']?.max ||
            0,
        }
      : {};
  }
  get config(): DynamicInputConfig {
    return this._config;
  }
}
