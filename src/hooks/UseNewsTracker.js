import { useState } from 'react';

function UseNewsTracker(initialValue) {
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

    const setValue = (value) => {
        try {
            setStoredValue(value);
            window.sessionStorage.setItem(key, value.toString());
        } catch (error) {
            console.warn('Error setting sessionStorage key “' + key + '”:', error);
        }
    };

    return [storedValue, setValue];
}

export default UseNewsTracker;