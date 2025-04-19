import AsyncStorage from "@react-native-async-storage/async-storage";

export class AsyncFunctions {
  place: string;
  isArray: boolean;

  constructor(place: string, isArray: boolean) {
    this.place = place;
    this.isArray = isArray;
  }

  // ジェネリックメソッドで保存
  static async saveData<T>(place: string, data: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(place, jsonValue);
    } catch (e) {
      console.error("Failed to save data to AsyncStorage", e);
    }
  }

  // ジェネリックメソッドで取得
  static async getData<T>(place: string, type: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(place);
      if (jsonValue !== null) {
        return JSON.parse(jsonValue);
      } else {
        switch (type) {
          case "array":
            return [] as T;
          case "object":
            return null;
          case "string":
            return "" as T;
          default:
            return null;
        }
      }
    } catch (e) {
      console.error("Failed to fetch data from AsyncStorage", e);
      switch (type) {
        case "array":
          return [] as T;
        case "object":
          return null;
        default:
          return null;
      }
    }
  }
}
