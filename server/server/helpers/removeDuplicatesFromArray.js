/**
 * @dev The method removes duplicates from provided array
 * @returns filtered array
 */
exports.removeDuplicatesFromArray = (arr) => {
    const uniqueSet = new Set(arr)
    const backToArray = [...uniqueSet]
    return backToArray
}