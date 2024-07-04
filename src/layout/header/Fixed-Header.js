import { LiaClipboardCheckSolid } from "react-icons/lia";
import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";


export function FixedHeader({title, useBack}){
  return(
    <div className="fixed-header d-flex flex-row justify-content-between align-content-center">
      <div className="fixed-header-title">
        {title}
      </div>

      {
        !useBack ? '' :
          <div className="fixed-header-back" onClick={()=>{history.back()}}>
            <IoArrowBackOutline   size={22} color={"#4f5050"} />
          </div>
      }
    </div>
  )
}
