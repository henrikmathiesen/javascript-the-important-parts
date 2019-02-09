export enum DatesRangeEnum {
    day = 'day',
    month = 'month',
    year = 'year'
  }
  
  // can not get member as string when using these ^
  // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-4.html
  
  export enum StegEnum {
      steg1 = 1,
      steg2 = 2,
      steg3 = 3
  }
  
  // get member as string
  this.router.navigate([StegEnum[StegEnum.steg2]]);
