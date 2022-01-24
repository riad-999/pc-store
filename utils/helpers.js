export const isOnServer = () => (typeof window === 'undefined')? true : false;
export const toPrice = (price) => {
    const conv = price / 100;
    return conv.toFixed(2);
}