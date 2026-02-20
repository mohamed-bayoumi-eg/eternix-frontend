export function getEnumOptions(enumObj: any): { label: string; value: any }[] {
  return Object.keys(enumObj)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      label: `ENUMS.${key.toUpperCase()}`,
      value: enumObj[key],
    }));
}
