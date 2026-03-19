import { Directive, OnInit, inject, signal, Input, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { DynamicInputConfig, InputType } from '../../../models/dynamic-input-config';

@Directive()
export abstract class BaseFormComponent<TGetResult, TCreateCmd, TUpdateCmd> implements OnInit {
  protected abstract service: any;
  protected abstract listRoute: string;
  protected route = inject(ActivatedRoute);
  protected router = inject(Router);
  protected cdr = inject(ChangeDetectorRef);
  abstract formConfig: DynamicInputConfig[];

  editData = signal<TGetResult | null>(null);
  isLoading = signal(false);

  constructor() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  // داخل BaseFormComponent
  ngOnInit(): void {
    const copyData = history.state?.copyData;

    if (copyData) {
      this.editData.set(copyData);
      // إجبار الأب على قراءة الـ Getter وتحديث الـ Child فوراً عند الـ Copy
      this.cdr.detectChanges();
    } else {
      const id = this.route.snapshot.params['id'];
      if (id) {
        this.loadData(id);
      } else {
        // في حالة الإضافة الجديدة (Empty Form)
        this.cdr.detectChanges();
      }
    }
  }

  loadData(id: string) {
    this.isLoading.set(true);
    this.service
      .getById({ id } as any)
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
          this.cdr.detectChanges();
        }),
      )
      .subscribe((res: any) => {
        let data = res.data;
        data = this.mapEnumValues(data);
        this.afterDataLoaded(data);
        this.editData.set(data);
        this.cdr.detectChanges();
      });
  }
  protected afterDataLoaded(data: TGetResult): void {}
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
    const oldData = this.editData();
    const id = (oldData as any)?.id;

    const updatedData = { ...formData, id: id };

    const currentState = history.state || {};
    history.replaceState({ ...currentState, copyData: updatedData }, '');

    this.editData.set(updatedData);

    this.isLoading.set(true);

    if (id) {
      const updateCmd = { id: id, ...formData } as TUpdateCmd;
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
      // مسح التاريخ تماماً
      history.replaceState(null, '');

      // إجبار الـ Signal على التغيير:
      // إذا كانت القيمة null فعلياً، نمرر object فارغ ثم null لإجبار الـ setter على العمل
      this.editData.set({} as any);

      setTimeout(() => {
        this.editData.set(null);

        if (!this.router.url.includes('/add')) {
          this.router.navigate([this.listRoute, 'add']);
        }
      });
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
