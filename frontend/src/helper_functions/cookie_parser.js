export const parseCookie = (str) => {
    const cookies = str.split(';');

    let cookiesObj = {};

    for (let cookieStr of cookies) {
        const key = decodeURIComponent(cookieStr.split('=')[0].trim());
        const value = decodeURIComponent(cookieStr.split('=')[1].trim());
        
        cookiesObj[key] = value;
    }

    return cookiesObj;
};
