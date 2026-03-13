import { Directive, OnInit, inject, signal, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { DynamicInputConfig, InputType } from '../../../models/dynamic-input-config';

@Directive()
export abstract class BaseFormComponent<TGetResult, TCreateCmd, TUpdateCmd> implements OnInit {
  protected abstract service: any;
  protected abstract listRoute: string;
  protected route = inject(ActivatedRoute);
  protected router = inject(Router);
  abstract formConfig: DynamicInputConfig[];

  editData = signal<TGetResult | null>(null);
  isLoading = signal(false);

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.loadData(id);
    }
  }

  loadData(id: string) {
    this.isLoading.set(true);
    this.service
      .getById({ id } as any)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe((res: any) => {
        let data = res.data;

        data = this.mapEnumValues(data);

        this.editData.set(data);
      });
  }

  private mapEnumValues(data: any): any {
    if (!data) return data;

    this.formConfig.forEach((config) => {
      if (config.type === InputType.Enum && config.enum) {
        const fieldName = config.fieldName;
        const apiValue = data[fieldName];

        if (apiValue !== undefined && apiValue !== null) {
          const enumEntries = Object.entries(config.enum);
          const matchedEntry = enumEntries.find(
            ([key, val]) => val === apiValue || key === apiValue,
          );

          if (matchedEntry) {
            data[fieldName] = matchedEntry[1];
          }
        }
      }
    });

    return data;
  }
  handleSave(formData: any) {
    this.isLoading.set(true);
    const data = this.editData();

    if (data) {
      const updateCmd = { id: (data as any).id, ...formData } as TUpdateCmd;
      this.service
        .update(updateCmd)
        .pipe(finalize(() => this.isLoading.set(false)))
        .subscribe(() => this.navigateToList());
    } else {
      this.service
        .create(formData as TCreateCmd)
        .pipe(finalize(() => this.isLoading.set(false)))
        .subscribe(() => this.navigateToList());
    }
  }

  handleSaveAndAdd(formData: any) {
    this.isLoading.set(true);
    this.service
      .create(formData as TCreateCmd)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe(() => {
        this.editData.set(null);
      });
  }

  handleDelete() {
    const data = this.editData();
    if (data && confirm('Are you sure you want to delete?')) {
      this.isLoading.set(true);
      this.service
        .delete({ id: (data as any).id } as any)
        .pipe(finalize(() => this.isLoading.set(false)))
        .subscribe(() => this.navigateToList());
    }
  }

  handleCancel() {
    this.navigateToList();
  }

  protected navigateToList() {
    this.router.navigate([this.listRoute]);
  }
}
