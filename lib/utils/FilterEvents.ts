import { SCHEDULE } from "@/constants/data/Schedules";
import { SliderData } from "@/constants/data/SliderData";
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

export const getEvents = (selectedDate: string) : EventData[] => {
  return SCHEDULE.filter((event) => selectedDate === event.date);
};

export const getOtherEvents = (selectedDate: string) : EventData[] => {
  return SliderData.filter((event) => selectedDate !== event.date);
};