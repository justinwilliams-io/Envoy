export default (params: Record<string, any>): string => {
    let x = '?';

    Object.keys(params).forEach(key => {
        x = `${x}&key=${params[key]}`
    });

    return x;
};
