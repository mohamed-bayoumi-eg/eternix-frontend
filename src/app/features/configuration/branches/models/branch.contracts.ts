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

export interface CreateBranchCommand extends CreateCommandBase<CreateBranchCommandResult> {
  arabicName: string;
  englishName: string;
  isActive: IsActive;
  address: string;
  phoneNumber: string;
  email: string;
  managerId: string | null;
  areaId: string;
}

export interface CreateBranchCommandResult extends ResultBase {}

export interface UpdateBranchCommand extends UpdateCommandBase<UpdateBranchCommandResult> {
  arabicName: string;
  englishName: string;
  isActive: IsActive;
  address: string;
  phoneNumber: string;
  email: string;
  managerId: string | null;
  areaId: string;
}
export interface UpdateBranchCommandResult extends ResultBase {}

export interface DeleteBranchCommand extends DeleteCommandBase<DeleteBranchCommandResult> {}

export interface DeleteBranchCommandResult extends ResultBase {}

export interface DeleteBranchRangeCommand extends DeleteRangeCommandBase<DeleteBranchRangeCommandResult> {}

export interface DeleteBranchRangeCommandResult {}

export interface GetBranchQuery extends GetQueryBase<GetBranchQueryResult> {}

export interface GetBranchListQuery extends GetListQueryBase<GetBranchListQueryResult> {}

export interface GetBranchListQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
  isActive: IsActive;
  address: string;
  phoneNumber: string;
  email: string;
  managerArabicName: string;
  managerEnglishName: string;
  areaArabicName: string;
  areaEnglishName: string;
  cityArabicName: string;
  cityEnglishName: string;
  countryArabicName: string;
  countryEnglishName: string;
}

export interface GetBranchQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
  isActive: IsActive;
  address: string;
  phoneNumber: string;
  email: string;
  managerId: string | null;
  countryId: string;
  cityId: string;
  areaId: string;
}

export class GetBranchComboQuery implements GetComboQueryBase<ComboResultBase[]> {
  searchTerm?: string;
}
