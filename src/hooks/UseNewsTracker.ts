import { useState } from 'react';

export function UseNewsTracker(initialValue: number): [number, (value: number) => void] {
    const key = "newsCountWatched";

    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.sessionStorage.getItem(key);
            return item ? parseInt(item, 10) : initialValue;
        } catch (error) {
            console.warn('Error reading sessionStorage key “' + key + '”:', error);
            return initialValue;
        }
    });

    const setValue = (value: number) => {
        try {
            setStoredValue(value);
            window.sessionStorage.setItem(key, value.toString());
        } catch (error) {
            console.warn('Error setting sessionStorage key “' + key + '”:', error);
        }
    };

    return [storedValue, setValue];
}