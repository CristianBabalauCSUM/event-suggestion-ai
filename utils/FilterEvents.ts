import { EventSlide } from "@/data/SliderData";

export function filterEvents(data: EventSlide[], filter: string | string[]){
    if (filter === 'any'){
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