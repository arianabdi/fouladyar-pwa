


export function toFarsiNumber(n) {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, x => farsiDigits[x]);
}
export function objectToFarsiNumber(object) {
    let newObject = {};
    if(object)
        Object.keys(object).map(itm => {

            if(typeof object[itm] === "object"){
                return newObject[itm]=objectToFarsiNumber(object[itm])
            }


            return newObject[itm]=toFarsiNumber(object[itm])
        })

    return newObject;
}

