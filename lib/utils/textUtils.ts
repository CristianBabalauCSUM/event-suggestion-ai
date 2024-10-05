export function truncateText(text: string, length: number) {
    if (text.length > length) {
        return text.substring(0, length) + '...';
    }
    return text;
}

export function formatTitleToId(title: string) {
    return title.replace(/ /g, '-').toLowerCase();
}

export function getDurationInMinutesFromString(startTime: string, endTime: string) {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);


    const startDate = new Date();
    startDate.setHours(startHour, startMinute, 0, 0);

    const endDate = new Date();
    endDate.setHours(endHour, endMinute, 0, 0);

    return getDurationInMinutesFromDate(startDate, endDate);
}

export function getDurationInMinutesFromDate(startTime: Date, endTime: Date) {
    const difference = endTime.getTime() - startTime.getTime();

    const totalMinutes = Math.floor(difference / (1000 * 60));

    return totalMinutes;
}

export function isStartTimeBeforeEndTime(startTime: string, endTime: string) {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
  
    const startDate = new Date();
    startDate.setHours(startHour, startMinute, 0, 0);
  
    const endDate = new Date();
    endDate.setHours(endHour, endMinute, 0, 0);
  
    return startDate < endDate;
  }