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
    type: string[];
    description: string;
}

export const SliderData = [
    {
        title: 'Team Stand-up Meeting',
        description: 'Daily sync-up with the project team',
        location: 'Zoom',
        start: '2024-09-04T09:00:00',
        end: '2024-09-02T09:30:00',
        duration: 30,
        time: '9:00 AM - 9:30 AM',
        type: ['Meeting', 'Team', 'Stand-up', 'Comedy'],
        image: require('@/assets/images/partial-react-logo.png'),
    },
    {
        title: 'Tennis in the Park',
        description: 'Daily sync-up with the project team',
        location: 'Zoom',
        start: '2024-09-02T09:00:00',
        end: '2024-09-02T09:30:00',
        duration: 30,
        time: '9:00 AM - 9:30 AM',
        type: ['Sports', 'Tennis', 'Park', 'Active', 'Fun', 'Healthy', 'Exercise'],
        image: require('@/assets/images/react-logo.png'),
    },
    {
        title: 'Park walking with pets',
        description: 'Daily sync-up with the project team',
        location: 'Zoom',
        start: '2024-09-03T09:00:00',
        end: '2024-09-07T09:30:00',
        duration: 30,
        time: '9:00 AM - 9:30 AM',
        type: ['Social','Pets', 'Walking', 'Park', 'Active', 'Fun', 'Healthy', 'Exercise'],
        image: require('@/assets/images/splash.png'),
    },
    {
        title: 'Picnic by the Lake',
        description: 'Daily sync-up with the project team ',
        location: 'Zoom',
        start: '2024-09-04T09:00:00',
        end: '2024-09-06T09:30:00',
        duration: 30,
        time: '9:00 AM - 9:30 AM',
        type: ['Social', 'Picnic', 'Lake', 'Active', 'Fun', 'Healthy', 'Exercise'],
        image: require('@/assets/images/icon.png'),
    },
    {
        title: 'Hiking in the Mountains',
        description: 'Daily sync-up with the project team ',
        location: 'Zoom',
        start: '2024-09-14T09:00:00',
        end: '2024-09-16T09:30:00',
        duration: 30,
        time: '9:00 AM - 9:30 AM',
        type: ['Social', 'Hiking', 'Mountains', 'Active', 'Fun', 'Healthy', 'Exercise'],
        image: require('@/assets/images/icon.png'),
    },
    {
        title: 'Ping Pong Tournament',
        description: 'Daily sync-up with the project team ',
        location: 'Zoom',
        start: '2024-09-14T09:00:00',
        end: '2024-09-16T09:30:00',
        duration: 30,
        time: '9:00 AM - 9:30 AM',
        type: ['Social', 'Ping Pong', 'Tournament', 'Active', 'Fun', 'Healthy', 'Exercise'],
        image: require('@/assets/images/icon.png'),
    },
    {
        title: 'Foot Ball Tournament',
        description: 'Daily sync-up with the project team ',
        location: 'Zoom',
        start: '2024-09-14T09:00:00',
        end: '2024-09-16T09:30:00',
        duration: 30,
        time: '9:00 AM - 9:30 AM',
        type: ['Social', 'Foot Ball', 'Tournament', 'Active', 'Fun', 'Healthy', 'Exercise'],
        image: require('@/assets/images/icon.png'),
    },

    {
        title: 'Meditation in the Park',
        description: 'Daily sync-up with the project team ',
        location: 'Zoom',
        start: '2024-09-14T09:00:00',
        end: '2024-09-16T09:30:00',
        duration: 30,
        time: '9:00 AM - 9:30 AM',
        type: ['Social', 'Meditaion', 'Active', 'Fun', 'Healthy', 'Exercise', 'Mental', 'Peace'],
        image: require('@/assets/images/icon.png'),
    },

] as EventSlide[];