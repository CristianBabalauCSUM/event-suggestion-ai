import { ImageSourcePropType } from "react-native";

export interface EventData {
    title: string;
    description: string;
    location: string;
    start: string;
    end: string;
    duration: number;
    time: string;
    image: ImageSourcePropType;
    social?: number;
    sentiment?: number;
    type: string[];
    date: string;
}