import { EventSlide } from "@/data/SliderData";
import { SCHEDULE } from "@/constants/data/Schedules";
import { SliderData } from "@/data/SliderData";
import { Event } from "@/constants/data/Schedules";

export function filterEvents(data: EventSlide[], filter: string | string[]) {
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

export const getEvents = (selectedDate: string) : Event[] => {
  return SCHEDULE.filter((event) => selectedDate === event.date);
};

export const getOtherEvents = (selectedDate: string) : Event[] => {
  return SliderData.filter((event) => selectedDate !== event.date);
};