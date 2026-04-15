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

export interface CreateWarehouseCommand extends CreateCommandBase<CreateWarehouseCommandResult> {
  arabicName: string;
  englishName: string;
  isActive: YesNo;
  isMain: YesNo;
  areaId: string;
  address: string;
  branchId: string;
}

export interface CreateWarehouseCommandResult extends ResultBase {}

export interface UpdateWarehouseCommand extends UpdateCommandBase<UpdateWarehouseCommandResult> {
  arabicName: string;
  englishName: string;
  isActive: YesNo;
  isMain: YesNo;
  areaId: string;
  address: string;
  branchId: string;
}
export interface UpdateWarehouseCommandResult extends ResultBase {}

export interface DeleteWarehouseCommand extends DeleteCommandBase<DeleteWarehouseCommandResult> {}

export interface DeleteWarehouseCommandResult extends ResultBase {}

export interface DeleteWarehouseRangeCommand extends DeleteRangeCommandBase<DeleteWarehouseRangeCommandResult> {}

export interface DeleteWarehouseRangeCommandResult {}

export interface GetWarehouseQuery extends GetQueryBase<GetWarehouseQueryResult> {}

export interface GetWarehouseListQuery extends GetListQueryBase<GetWarehouseListQueryResult> {}

export interface GetWarehouseListQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
  isActive: YesNo;
  isMain: YesNo;
  areaArabicName: string;
  areaEnglishName: string;
  cityArabicName: string;
  cityEnglishName: string;
  countryArabicName: string;
  countryEnglishName: string;
  address: string;
  branchArabicName: string;
  branchEnglishName: string;
}

export interface GetWarehouseQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
  isActive: YesNo;
  isMain: YesNo;
  countryId: string;
  cityId: string;
  areaId: string;
  address: string;
  branchId: string;
}

export class GetWarehouseComboQuery implements GetComboQueryBase<ComboResultBase[]> {
  searchTerm?: string;
}
