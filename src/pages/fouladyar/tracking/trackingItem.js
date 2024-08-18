import React, {useEffect} from 'react';
import {toFarsiNumber} from "../../../shared/toFarsiNumber";


export function TrackingItem ({item, index}) {

    useEffect(()=>{
        console.log('-----------------------', item)
    }, [])

    function TrackingItemRow({name, value}){
        return(
            <div class="d-flex flex-row justify-content-between tracking-item">
                <h6 class="w-50 name">{name}</h6>
                <span class="w-50 align-left value">{toFarsiNumber(value || '')}</span>
            </div>
        )
    }

    return (
        <div className="tracking-item-container">

            <TrackingItemRow name={"ردیف"} value={index + 1}/>
            <TrackingItemRow name={"نام حواله"} value={item["goodName"]}/>
            <TrackingItemRow name={"شماره حواله"} value={item["orderNo"]}/>
            <TrackingItemRow name={"وضعیت حواله"} value={item["exportStatus"]}/>
            <TrackingItemRow name={"نوع حواله"} value={item["orderType"]}/>
            <TrackingItemRow name={"نوع برش"} value={item["exportType"]}/>
            <TrackingItemRow name={"وزن خالص"} value={item["netAmount1"]}/>
            <TrackingItemRow name={"وزن لفاف"} value={item["coverWeight"]}/>
            <TrackingItemRow name={"وزن کل"} value={item["amount1"]}/>
            <TrackingItemRow name={"تاریخ و ساعت خروج"} value={`${item['trustDate']} ${item["createTime"]}`}/>

        </div>
    );
};


