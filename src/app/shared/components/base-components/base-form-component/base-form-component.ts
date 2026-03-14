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

  constructor() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const copyData = history.state?.copyData;

    if (copyData) {
      this.editData.set(copyData);
    } else {
      const id = this.route.snapshot.params['id'];
      if (id) {
        this.loadData(id);
      }
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

    if (data && (data as any).id) {
      const updateCmd = { id: (data as any).id, ...formData } as TUpdateCmd;
      this.service
        .update(updateCmd)
        .pipe(finalize(() => this.isLoading.set(false)))
        .subscribe(() => {
          this.navigateToList();
        });
    } else {
      this.service
        .create(formData as TCreateCmd)
        .pipe(finalize(() => this.isLoading.set(false)))
        .subscribe((res: any) => {
          // const newId = res.data?.id || res.data;
          // const currentData = { ...formData, id: newId };
          // this.editData.set(currentData);
          // this.router.navigate([this.listRoute, 'edit', newId]);
          this.navigateToList();

        });
    }
  }

  handleSaveAndNew(formData: any) {
    this.isLoading.set(true);
    const data = this.editData();

    const isUpdate = !!(data && (data as any).id);

    const request$ = isUpdate
      ? this.service.update({ id: (data as any).id, ...formData })
      : this.service.create(formData);

    request$.pipe(finalize(() => this.isLoading.set(false))).subscribe(() => {
      this.editData.set(null);
      this.router.navigate([this.listRoute, 'add']);
    });
  }

  handleCopy() {
    const data = this.editData();
    if (data) {
      const copyData = JSON.parse(JSON.stringify(data));
      delete copyData.id;
      delete copyData.code;

      this.router.navigate([this.listRoute, 'add'], {
        state: { copyData: copyData },
      });
    }
  }
  handleDelete() {
    const data = this.editData();
    if (data && (data as any).id) {
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
