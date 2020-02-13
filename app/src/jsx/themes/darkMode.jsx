import { useState, useEffect } from 'react';


export const lightTheme = 'light-theme';
export const darkTheme = 'dark-theme';

function DarkMode() {

    const [theme, setTheme] = useState(darkTheme);
    const toggleTheme = () => {
        if (theme === lightTheme) {
            window.localStorage.setItem('theme', darkTheme);
            setTheme(darkTheme);
        } else {
            window.localStorage.setItem('theme', lightTheme);
            setTheme(lightTheme);
        }
    };

    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme');
        localTheme && setTheme(localTheme);
    }, []);

    return [theme, toggleTheme];
}
export default DarkMode;