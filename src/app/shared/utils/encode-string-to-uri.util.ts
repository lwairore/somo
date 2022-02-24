export const encodeStringToUri = (str: string): string => {
    const encodedString = window.encodeURIComponent(str);
    
    return encodedString;
}