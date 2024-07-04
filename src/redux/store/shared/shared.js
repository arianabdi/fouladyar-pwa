

export function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}



export function ConvertFilterObjectToUrlParam(obj){
    const queryParams = [];
    Object.keys(obj).forEach(key => {
        queryParams.push(`${key}=${obj[key]}`);
    });
    return queryParams.join('&');
}
