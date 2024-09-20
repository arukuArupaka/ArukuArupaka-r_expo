export const convertNumberToWeekOfTheDay = (weekNumber: number): string => {
  switch (weekNumber) {
    case 1:
      return "月";
    case 2:
      return "火";
    case 3:
      return "水";
    case 4:
      return "木";
    case 5:
      return "金";
  }
};
