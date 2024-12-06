export default (params: Record<string, any>): string => {
    let x = '';

    Object.keys(params).forEach((key, i) => {
        x = `${x}${i === 0 ? '?' : '&'}${key}=${encodeURIComponent(params[key])}`
    });

    return x;
};
