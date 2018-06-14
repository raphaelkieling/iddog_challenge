
export const toParameterUrl = (object) =>
    Object.keys(object)
        .map(k =>
            encodeURIComponent(k) + '=' + encodeURIComponent(object[k])
        ).join('&')