import { YesNo } from 'src/app/shared/enums/common.enums';
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

export interface CreateDepartmentCommand extends CreateCommandBase<CreateDepartmentCommandResult> {
  arabicName: string;
  englishName: string;
  parentDepartmentId: string | null;
  managerId: string | null;
  isActive: YesNo;
}

export interface CreateDepartmentCommandResult extends ResultBase {}

export interface UpdateDepartmentCommand extends UpdateCommandBase<UpdateDepartmentCommandResult> {
  arabicName: string;
  englishName: string;
  parentDepartmentId: string | null;
  managerId: string | null;
  isActive: YesNo;
}
export interface UpdateDepartmentCommandResult extends ResultBase {}

export interface DeleteDepartmentCommand extends DeleteCommandBase<DeleteDepartmentCommandResult> {}

export interface DeleteDepartmentCommandResult extends ResultBase {}

export interface DeleteDepartmentRangeCommand extends DeleteRangeCommandBase<DeleteDepartmentRangeCommandResult> {}

export interface DeleteDepartmentRangeCommandResult {}

export interface GetDepartmentQuery extends GetQueryBase<GetDepartmentQueryResult> {}

export interface GetDepartmentListQuery extends GetListQueryBase<GetDepartmentListQueryResult> {}

export interface GetDepartmentListQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
  managerArabicName: string;
  managerEnglishName: string;
  parentDepartmentArabicName: string;
  parentDepartmentEnglishName: string;
  isActive: YesNo;
}

export interface GetDepartmentQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
  parentDepartmentId: string | null;
  managerId: string | null;
  isActive: YesNo;
}

export class GetDepartmentComboQuery implements GetComboQueryBase<ComboResultBase[]> {
  searchTerm?: string;
}
