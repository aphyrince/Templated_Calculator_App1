import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export function useAsyncStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>, boolean] {
    const [state, setState] = useState<T>(initialValue);
    const [loading, setLoading] = useState<boolean>(true);

    //앱이 켜질 때 로컬 스토리지에서 값 불러옴
    useEffect(() => {
        const loadStoredValue = async () => {
            try {
                const savedValue = await AsyncStorage.getItem(key);
                if (savedValue !== null) {
                    setState(JSON.parse(savedValue) as T);
                }
            } catch (error) {
                console.error(`AsyncStorage [${key}] 불러오기 실패:`, error);
            } finally {
                setLoading(false);
            }
        };

        loadStoredValue();
    }, [key]);

    //값을 변경하고 로컬 스토리지에 저장하는 함수
    const setValue: Dispatch<SetStateAction<T>> = async (value) => {
        try {
            const valueToStore = value instanceof Function ? value(state) : value;

            setState(valueToStore);
            await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`AsyncStorage [${key}] 저장 실패:`, error);
        }
    };

    return [state, setValue, loading];
}
