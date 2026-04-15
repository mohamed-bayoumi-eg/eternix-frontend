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

export interface CreateEmployeeCommand extends CreateCommandBase<CreateEmployeeCommandResult> {
  arabicName: string;
  englishName: string;
  employeeCode: string;
  departmentId: string;
  jobTitleId: string;
  branchId: string;
  userId: string | null;
  hireDate: Date;
  isActive: YesNo;
  otherBranchIds: string[];
}

export interface CreateEmployeeCommandResult extends ResultBase {}

export interface UpdateEmployeeCommand extends UpdateCommandBase<UpdateEmployeeCommandResult> {
  arabicName: string;
  englishName: string;
  employeeCode: string;
  departmentId: string;
  jobTitleId: string;
  branchId: string;
  userId: string | null;
  hireDate: Date;
  isActive: YesNo;
  otherBranchIds: string[];
}
export interface UpdateEmployeeCommandResult extends ResultBase {}

export interface DeleteEmployeeCommand extends DeleteCommandBase<DeleteEmployeeCommandResult> {}

export interface DeleteEmployeeCommandResult extends ResultBase {}

export interface DeleteEmployeeRangeCommand extends DeleteRangeCommandBase<DeleteEmployeeRangeCommandResult> {}

export interface DeleteEmployeeRangeCommandResult {}

export interface GetEmployeeQuery extends GetQueryBase<GetEmployeeQueryResult> {}

export interface GetEmployeeListQuery extends GetListQueryBase<GetEmployeeListQueryResult> {}

export interface GetEmployeeListQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
  employeeCode: string;
  departmentArabicName: string;
  departmentEnglishName: string;
  jobTitleArabicName: string;
  jobTitleEnglishName: string;
  branchArabicName: string;
  branchEnglishName: string;
  userArabicName: string;
  userEnglishName: string;
  hireDate: Date;
  isActive: YesNo;
}

export interface GetEmployeeQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
  employeeCode: string;
  departmentId: string;
  jobTitleId: string;
  branchId: string;
  userId: string;
  hireDate: Date;
  isActive: YesNo;
  otherBranchIds: string[];
}

export class GetEmployeeComboQuery implements GetComboQueryBase<ComboResultBase[]> {
  searchTerm?: string;
}
