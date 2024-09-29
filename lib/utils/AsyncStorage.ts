import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventData } from '../definitions';

export const storeEventAsyncStorage = async (key: string, value: EventData) => {
  try {
    await storeDataAsyncStorage(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error storing event', error);
  }
};

export const storeDataAsyncStorage = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value); 
  } catch (error) {
    console.error('Error storing data', error);
  }
};

export const getDataAsyncStorage = async (key: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error('Error retrieving data', error);
  }
  return null;
}

export const getEventDataAsyncStorage = async (key: string) : Promise<EventData | null> => {
  try {
    const value = await getDataAsyncStorage(key);
    if (value !== null) {
      return JSON.parse(value) as EventData;
    }
  } catch (error) {
    console.error('Error retrieving data', error);
  }
  return null;
}

export const removeDataAsyncStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing data', error);
  }
}

export const getAllItemsAsync = async (): Promise<EventData[]> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);
    
    // Parse and return only valid EventData items
    const parsedItems: EventData[] = items.reduce((acc: EventData[], [key, value]) => {
      if (value) {
        try {
          const parsedValue = JSON.parse(value) as EventData;
          acc.push(parsedValue); // Add valid parsed EventData to the array
        } catch (error) {
          console.error("Error parsing JSON for key:", key, error);
        }
      } else {
        console.warn("Value is undefined or null for key:", key);
      }
      return acc;
    }, []);
    
    return parsedItems;
  } catch (error) {
    console.error('Error getting all items:', error);
    return [];
  }
};