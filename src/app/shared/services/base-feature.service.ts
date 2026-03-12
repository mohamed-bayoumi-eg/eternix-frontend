import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { PagedList } from '../models/base-requests';

export abstract class BaseFeatureService<
  TGetListQuery,
  TGetListResult,
  TGetQuery,
  TGetQueryResult,
  TCreateCommand,
  TCreateResult,
  TUpdateCommand,
  TUpdateResult,
  TDeleteCommand,
  TDeleteResult,
> {
  protected abstract endpoint: string;
  protected api = inject(ApiService);

  getList(query: TGetListQuery): Observable<PagedList<TGetListResult>> {
    return this.api.get<PagedList<TGetListResult>>(this.endpoint, query);
  }

  getById(query: TGetQuery): Observable<TGetQueryResult> {
    const id = (query as any).id;
    return this.api.get<TGetQueryResult>(`${this.endpoint}/${id}`);
  }

  create(command: TCreateCommand): Observable<TCreateResult> {
    return this.api.post<TCreateCommand, TCreateResult>(this.endpoint, command);
  }

  update(command: TUpdateCommand): Observable<TUpdateResult> {
    return this.api.put<TUpdateCommand, TUpdateResult>(this.endpoint, command);
  }

  delete(command: TDeleteCommand): Observable<TDeleteResult> {
    // نقوم بإرسال الـ command كاملاً في الـ body، والـ ApiService سيتعامل مع الـ DELETE request
    return this.api.delete<TDeleteResult>(this.endpoint, command);
  }
}
