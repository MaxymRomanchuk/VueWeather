let data = {
    text: 'Lorem ipsum...',
    name: 'john',
    surname: 'Doe',
    word: 'foo',
    number: 10,
    float: 10.55,
    date: new Date('10 Aug 2021'),
    subData: {
        name: '',
        number: NaN
    },
    arr: [
        [],
        3,
        5
    ],
    empty: {}
};

let subData = {
    name: '',
    number: NaN
}

function deleteKey(object, key) {
    Array.isArray(object) ? object.splice(key, 1) : delete object[key];
    return object
}

function clearEmptyValues(target) {

    for(let i in target) {
        if(!target[i] && target[i] !== 0 && target[i] !== false) {
            target = deleteKey(target, i);
            continue;
        }

        if(typeof target[i] === 'object' && !(target[i] instanceof Date)) {
            let buffer = clearEmptyValues(target[i]);

            if(Object.keys(buffer).length > 0) {
                target[i] = buffer;
            } else {
                target = deleteKey(target, i);
            }
        }
    }
    return target;
}

console.log(clearEmptyValues(data));
// console.log(clearEmptyValues(subData));
console.log(clearEmptyValues(data.name));