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
  @Input() initialData: any = null;
  @Input() isLoading: boolean = false;

  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();
  @Output() onSaveAndAdd = new EventEmitter<any>();

  form: FormGroup = new FormGroup({});

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.createForm();

    if (this.initialData) {
      this.cdr.detectChanges();
    }
  }

  private createForm() {
    const group: any = {};
    this.controls.forEach((control) => {
      group[control.fieldName] = new FormControl(null);
    });

    this.form = new FormGroup(group);
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
}
