export interface ICompareDate {
  startDate: Date;
  endDate: Date;
}

interface IDateProvider {
  compareInHours({ startDate, endDate }: ICompareDate): number;
  compareInDays({ startDate, endDate }: ICompareDate): number;
  convertToUTC(date: Date): string;
  dateNow(): Date;
  addDays(days: number): Date;
}

export { IDateProvider };
