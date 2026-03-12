import { Directive, OnInit, inject, signal, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { DynamicInputConfig } from '../../../models/dynamic-input-config';

@Directive()
export abstract class BaseFormComponent<TGetResult, TCreateCmd, TUpdateCmd> implements OnInit {
  protected abstract service: any;
  protected route = inject(ActivatedRoute);
  protected router = inject(Router);

  editData = signal<TGetResult | null>(null);
  isLoading = signal(false);
  abstract formConfig: DynamicInputConfig[];
  protected abstract listRoute: string; 

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
      .subscribe((res: any) => this.editData.set(res));
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
