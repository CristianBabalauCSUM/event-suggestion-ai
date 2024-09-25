import { EventData } from "@/lib/definitions";

export function filterEvents(data: EventData[], filter: string | string[]) {
  if (filter === 'any') {
    return data;
  }
  else {
    return data.filter((item) => {
      if (typeof filter === 'string') {
        return item.type.includes(filter);
      } else if (Array.isArray(filter)) {
        return filter.some(f => item.type.includes(f));
      }
    });
  }
}

export const getEvents = (calendarSchedule: EventData[], selectedDate: string) : EventData[] => {
  return calendarSchedule.filter((event) => selectedDate === event.date);
};

export const getOtherEvents = (calendarSchedule: EventData[], selectedDate: string) : EventData[] => {
  return calendarSchedule.filter((event) => selectedDate !== event.date);
};