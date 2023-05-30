const includes = (container, searchElm) => {
    if (Number.isFinite(container)) { return container.toString().includes(searchElm) }
    return container && container.toLowerCase().includes(searchElm.toLowerCase());
}

const excludes = (container, searchElm) => {
    if (searchElm.length === 0) return true;
    if (Number.isFinite(container)) { return !container.toString().includes(searchElm) }
    return !container || !container.toLowerCase().includes(searchElm.toLowerCase());
}

const eq = (a, b) => {
    if (b.length === 0) return true;
    if (Number.isFinite(a)) return a == b
    return a && a.toLowerCase() == b.toLowerCase();
}


const ne = (a, b) => {
    if (b.length === 0) return true;
    if (Number.isFinite(a)) return a != b
    return !a || a.toLowerCase() != b.toLowerCase();
}

const le = (a, b) => {
    if (b.length === 0) return true;
    if (Number.isFinite(a)) {
        return isNaN(b) ? false : a <= b;
    }
    return !a || a.toLowerCase() <= b.toLowerCase();
}

const ge = (a, b) => {
    if (b.length === 0) return true;
    if (Number.isFinite(a)) {
        return isNaN(b) ? false : a >= b;
    }
    return a && a.toLowerCase() >= b.toLowerCase();
}

export const Operations = {
    "=": eq,
    "!=": ne,
    "<=": le,
    ">=": ge,
    "includes": includes,
    "excludes": excludes,
}