Object.prototype.findPath = function (path) {
    let current = this;
    const keys = path.split('.');

    for (let key of keys) {
        if (current[key] !== undefined) {
            current = current[key];
        } else {
            return undefined;
        }
    }

    return current;
};

let obj = {
    a: {
        b: {
            c: 12
        }
    }
};

console.log(obj.findPath('a.b.c'));
console.log(obj.findPath('a.b'));
console.log(obj.findPath('a.b.d'));
console.log(obj.findPath('a.c'));
console.log(obj.findPath('a.b.c.d'));
console.log(obj.findPath('a.b.c.d.e'));
