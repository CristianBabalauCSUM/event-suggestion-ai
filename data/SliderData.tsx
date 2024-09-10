import { ImageSourcePropType } from "react-native";


export type EventSlide = { 
    title: string;
    image: ImageSourcePropType;
    start: string;
    end: string;
    location: string;
    duration: number;
    time: string;
    date: string;
    description: string;
}

export const SliderData = [
    {
        title: 'Team Stand-up Meeting',
        description: 'Daily sync-up with the project team',
        location: 'Zoom',
        start: '2024-09-02T09:00:00',
        end: '2024-09-02T09:30:00',
        duration: 30,
        time: '9:00 AM - 9:30 AM',
        image: require('@/assets/images/partial-react-logo.png'),
    },
    {
        title: 'Team Stand-up Meeting',
        description: 'Daily sync-up with the project team',
        location: 'Zoom',
        start: '2024-09-02T09:00:00',
        end: '2024-09-02T09:30:00',
        duration: 30,
        time: '9:00 AM - 9:30 AM',
        image: require('@/assets/images/partial-react-logo.png'),
    },
    {
        title: 'Team Stand-up Meeting',
        description: 'Daily sync-up with the project team',
        location: 'Zoom',
        start: '2024-09-02T09:00:00',
        end: '2024-09-02T09:30:00',
        duration: 30,
        time: '9:00 AM - 9:30 AM',
        image: require('@/assets/images/partial-react-logo.png'),
    },
    {
        title: 'Team Stand-up Meeting',
        description: 'Daily sync-up with the project team toby melcher is a good person',
        location: 'Zoom',
        start: '2024-09-02T09:00:00',
        end: '2024-09-02T09:30:00',
        duration: 30,
        time: '9:00 AM - 9:30 AM',
        image: require('@/assets/images/partial-react-logo.png'),
    },

] as EventSlide[];