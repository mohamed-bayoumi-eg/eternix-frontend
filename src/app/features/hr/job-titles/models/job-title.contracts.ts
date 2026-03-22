import { IsActive } from 'src/app/shared/enums/common.enums';
import {
  CreateCommandBase,
  ResultBase,
  UpdateCommandBase,
  DeleteCommandBase,
  DeleteRangeCommandBase,
  GetQueryBase,
  GetListQueryBase,
  GetComboQueryBase,
  ComboResultBase,
} from 'src/app/shared/models/base-requests';

export interface CreateJobTitleCommand extends CreateCommandBase<CreateJobTitleCommandResult> {
  arabicName: string;
  englishName: string;
  description: string | null;
  isActive: IsActive;
}

export interface CreateJobTitleCommandResult extends ResultBase {}

export interface UpdateJobTitleCommand extends UpdateCommandBase<UpdateJobTitleCommandResult> {
  arabicName: string;
  englishName: string;
  description: string | null;
  isActive: IsActive;
}
export interface UpdateJobTitleCommandResult extends ResultBase {}

export interface DeleteJobTitleCommand extends DeleteCommandBase<DeleteJobTitleCommandResult> {}

export interface DeleteJobTitleCommandResult extends ResultBase {}

export interface DeleteJobTitleRangeCommand extends DeleteRangeCommandBase<DeleteJobTitleRangeCommandResult> {}

export interface DeleteJobTitleRangeCommandResult {}

export interface GetJobTitleQuery extends GetQueryBase<GetJobTitleQueryResult> {}

export interface GetJobTitleListQuery extends GetListQueryBase<GetJobTitleListQueryResult> {}

export interface GetJobTitleListQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
  description: string | null;
  isActive: IsActive;
}

export interface GetJobTitleQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
  description: string | null;
  isActive: IsActive;
}

export class GetJobTitleComboQuery implements GetComboQueryBase<ComboResultBase[]> {
  searchTerm?: string;
}
