export function isEmpty(obj) {
    for (var prop in obj) {
        return false;
    }

    return true;
} 