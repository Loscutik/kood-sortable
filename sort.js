// implements sorting for fields with pure string or numerical values
export function sortSimpleField(heroesInfo, infoKey, sign) {
    if (typeof heroesInfo[0].get(infoKey) === 'string') {
        return heroesInfo.sort((h1, h2) => {
            if (h1.get(infoKey) === undefined || h1.get(infoKey) === null) return 1;
            if (h2.get(infoKey) === undefined || h2.get(infoKey) === null) return -1;
            if ((h1.get(infoKey) === undefined || h1.get(infoKey) === null) && (h2.get(infoKey) === undefined || h2.get(infoKey) === null)) return 0;

            const h1feature = h1.get(infoKey).trim().toLowerCase();
            const h2feature = h2.get(infoKey).trim().toLowerCase();

            if (h1feature === '-' || h1feature === '') return 1;
            if (h2feature === '-' || h2feature === '') return -1;
            if ((h1feature === '-' || h1feature === '') && (h2feature === '-' || h2feature === '')) return 0;

            if (h1feature < h2feature) return -1 * sign;
            if (h1feature > h2feature) return sign;
            return 0;
        });
    } else {
        return heroesInfo.sort((h1, h2) => {
            if (h1.get(infoKey) === undefined || h1.get(infoKey) === null) return 1;
            if (h2.get(infoKey) === undefined || h2.get(infoKey) === null) return -1;
            if ((h1.get(infoKey) === undefined || h1.get(infoKey) === null) && (h2.get(infoKey) === undefined || h2.get(infoKey) === null)) return 0;

            if (h1.get(infoKey) < h2.get(infoKey)) return -1 * sign;
            if (h1.get(infoKey) > h2.get(infoKey)) return sign;
            return 0;
        });
    }
}

//converts meters to cm and tones to kg. 
function Converter(a) {
    if (a.includes("kg")) {
        return parseInt(a);
    } else if (a.includes("tons")) {
        return parseInt(a.replaceAll(',', '')) * 1000;
    } else if (a.includes("cm")) {
        return parseFloat(a);
    } else if (a.includes("meters")) {
        return parseFloat(a) * 100;
    }
    return a;
}

// implements sorting for fields height and weight - their values are numbers connected to the metric units.
export function sortMixedField(heroesInfo, infoKey, sign) {
    return heroesInfo.sort((h1, h2) => {
        const value1 = h1.get(infoKey);
        const value2 = h2.get(infoKey);

        // Apply conversion if needed
        const convertedValue1 = typeof value1 === 'string' ? Converter(value1) : value1;
        const convertedValue2 = typeof value2 === 'string' ? Converter(value2) : value2;

        if (convertedValue1 === undefined || convertedValue1 === null) return 1;
        if (convertedValue2 === undefined || convertedValue2 === null) return -1;
        if ((convertedValue1 === undefined || convertedValue1 === null) && (convertedValue2 === undefined || convertedValue2 === null)) return 0;

        if (convertedValue1 < convertedValue2) return -1 * sign;
        if (convertedValue1 > convertedValue2) return sign;
        return 0;
    });
}