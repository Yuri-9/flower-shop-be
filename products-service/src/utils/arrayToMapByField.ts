export const arrayToMapByField = (field, list) => list?.reduce((acc, value) => acc.set(value[field], value), new Map());
