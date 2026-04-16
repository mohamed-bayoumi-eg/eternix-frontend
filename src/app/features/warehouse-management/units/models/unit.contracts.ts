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
import { YesNo } from 'src/app/shared/enums/common.enums';

export interface CreateUnitCommand extends CreateCommandBase<CreateUnitCommandResult> {
  arabicName: string;
  englishName: string;
  symbol: string;
  globalUnitCode: string | null;
  isActive: YesNo;
}

export interface CreateUnitCommandResult extends ResultBase {}

export interface UpdateUnitCommand extends UpdateCommandBase<UpdateUnitCommandResult> {
  arabicName: string;
  englishName: string;
  symbol: string;
  globalUnitCode: string | null;
  isActive: YesNo;
}
export interface UpdateUnitCommandResult extends ResultBase {}

export interface DeleteUnitCommand extends DeleteCommandBase<DeleteUnitCommandResult> {}

export interface DeleteUnitCommandResult extends ResultBase {}

export interface DeleteUnitRangeCommand extends DeleteRangeCommandBase<DeleteUnitRangeCommandResult> {}

export interface DeleteUnitRangeCommandResult {}

export interface GetUnitQuery extends GetQueryBase<GetUnitQueryResult> {}

export interface GetUnitListQuery extends GetListQueryBase<GetUnitListQueryResult> {}

export interface GetUnitListQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
  symbol: string;
  globalUnitCode: string | null;
  isActive: YesNo;
}

export interface GetUnitQueryResult extends ResultBase {
  code: number;
  arabicName: string;
  englishName: string;
  symbol: string;
  globalUnitCode: string | null;
  isActive: YesNo;
}

export class GetUnitComboQuery implements GetComboQueryBase<ComboResultBase[]> {
  searchTerm?: string;
}
