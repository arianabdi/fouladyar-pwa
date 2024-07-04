
export const setGeoCenter = (geo) => ({
    type: 'SET_GEO_CENTER',
    geo: geo,
});

export const setGeoDistance = (distance) => ({
    type: 'SET_GEO_DISTANCE',
    distance: distance,
});
export const resetGeo = () => ({
    type: 'RESET_GEO'
});

