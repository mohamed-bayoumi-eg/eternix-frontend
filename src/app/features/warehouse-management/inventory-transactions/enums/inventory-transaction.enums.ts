export enum InventoryTransactionType {
  Undefined = 'Undefined',
  OpeningBalance = 'OpeningBalance', // To
  Sales = 'Sales', // From
  SalesReturn = 'SalesReturn', // To
  Purchase = 'Purchase', // To
  PurchaseReturn = 'PurchaseReturn', // From
  Transfer = 'Transfer', // From  To
  AdjustmentIncrease = 'AdjustmentIncrease', // To
  AdjustmentDecrease = 'AdjustmentDecrease', // From
  Damage = 'Damage', // From
}
