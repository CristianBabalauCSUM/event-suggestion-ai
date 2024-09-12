import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeDataAsyncStorage = async (key : any, value : any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));  // Convert to string if necessary
  } catch (error) {
    console.error('Error storing data', error);
  }
};

export const getDataAsyncStorage = async (key : any) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);  // Parse JSON data
    }
  } catch (error) {
    console.error('Error retrieving data', error);
  }
}

export const removeDataAsyncStorage = async (key : any) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing data', error);
  }
}

export const getAllItemsAsync = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);
    return items; // Return the array of key-value pairs
  } catch (error) {
    console.error('Error getting all items:', error);
    return []; // Return an empty array in case of error
  }

  };