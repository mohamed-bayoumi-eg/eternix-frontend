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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target) && this.dropdownOpen) {
      this.closeDropdown();
    }
  }

  constructor() {
    effect(() => {
      const val = this.control?.value;
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
      });
    });
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

  private loadData(search: string = '') {
    if (this.config.type === InputType.Select && this.config.endpoint) {
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
    return key ? map[key] : 'inValidField';
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
