const isEmpty = (mixedVar) => {
    let undef;
    let key;
    let i;
    let len;
    const emptyValues = [undef, null, false, 0, '', '0', 'null', 'undefined'];

    for (i = 0, len = emptyValues.length; i < len; i++) {
        if (mixedVar === emptyValues[i] || typeof mixedVar == 'undefined') {
            return true;
        }
    }

    if (typeof mixedVar === 'object' && !(mixedVar instanceof Date)) {
        for (key in mixedVar) {
            if (mixedVar.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }
    return false;
};

module.exports = { isEmpty };
