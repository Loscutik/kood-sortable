const includes = (container, searchElm) => {
    if (Number.isFinite(container)) { return container.toString().includes(searchElm) }
    return container.toLowerCase().includes(searchElm.toLowerCase());
}

const eq = (a, b) =>  a == b;

const ne = (a, b) =>  a != b;

const le = (a, b) => {
    if (Number.isFinite(a)) { 
        return  isNaN(b) ? false:a<=b;
    }
    return a <= b;
}

const ge = (a, b) => {
    if (Number.isFinite(a)) { 
        return  isNaN(b) ? false:a>=b;
    }
    return a >= b;
}