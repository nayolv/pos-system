import { CANCEL, IN_PROGRESS, PENDING, SUCCESS } from "../../constants/constants";

export const acceptIconCondition = (status: string) => status === IN_PROGRESS || status === SUCCESS || status === CANCEL;
export const sendIconCondition = (status: string) => status === PENDING || status === SUCCESS || status === CANCEL;
export const cancelIconCondition = (status: string) => status === CANCEL || status === SUCCESS;

export const calculateDateDifference = (dateString1: string, dateString2: string): string => {

    const date1Parts = dateString1.split(/[/,\s:-]+/);
    const date2Parts = dateString2.split(/[/,\s:-]+/);


    // if (date1Parts.length !== 6 || date2Parts.length !== 6) {
    //     console.log(date1Parts)
    //     console.log(date2Parts)

    //     return null; // Invalid date format
    // }

    const [day1, month1, year1, hour1, minute1, second1] = date1Parts.map(Number);
    const [day2, month2, year2, hour2, minute2, second2] = date2Parts.map(Number);

    const dateObject1 = new Date(year1, month1 - 1, day1, hour1, minute1, second1);
    const dateObject2 = new Date(year2, month2 - 1, day2, hour2, minute2, second2);

    const timeDifference = dateObject2.getTime() - dateObject1.getTime();
    const minutesDifference = timeDifference / (1000 * 60);

    return Math.abs(minutesDifference).toString();
};