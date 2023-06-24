export const sanitizeArray = (inputArray: object[], validObjectClass: object): object[] => {
    let returnArray = []
    for (const i of inputArray) {
        returnArray.push(sanitizeObject(i, validObjectClass))
    }
    return returnArray
}

export const sanitizeObject = (inputData: object, validObject: object): object => {
    for (let key in validObject) {
        if (key in inputData) {
            validObject[key] = inputData[key]
        } else {
            delete validObject[key]
        }
    }
    return validObject
}