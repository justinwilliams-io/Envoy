export default (params: Record<string, string | number | boolean>): string => {
    let x = '';

    Object.keys(params).forEach((key, i) => {
        x = `${x}${i === 0 ? '?' : '&'}${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    });

    return x;
};
