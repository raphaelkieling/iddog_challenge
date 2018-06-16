let memoise_map = new Map();

export const memoize_promise = (fn) => {
    return (...attr) => {
        if (memoise_map.has(...attr)) return new Promise((resolve) => resolve(memoise_map.get(...attr)));

        return fn.apply(this, attr)
            .then(res => {
                memoise_map.set(...attr, res);
                return res;
            });
    };
};

//how to utilize my memoize
// memoize_promisse(requisition)('attributes01','attributes02')
//     .then((res) => {
//         console.log(memoise_map);
//     });
