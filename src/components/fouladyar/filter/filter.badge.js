

import { Badge } from "reactstrap";


import React from "react";
import {useTranslation} from "react-i18next";
import { Icon } from "../../Component";

function BadgeItem({title, value, onBadgeClose}){
  const { t, i18n } = useTranslation();

  const styles = {
    badgeBtn: {
      fontSize: "12px",
      color: "#fff",
      background: "#ffffff57",
      width: "20px",
      height: "20px",
      padding: "3px 3px",
      margin: "0px 0px",
      borderRadius: "40px"
    },
    badge: {
      padding: "3px 3px",
    },

  }



  return(
    <li className="preview-item"  style={styles.badge} >
      <Badge className="badge-sm" pill color="primary">
        {`${t(title)}=${t(value)}`}
        <button style={styles.badgeBtn} onClick={() =>onBadgeClose(title)}>
          <a
            href="#close"
            onClick={(ev) => {
              ev.preventDefault();
              toggle();
            }}
            className="close"
          >
            <Icon name="cross-sm"></Icon>
          </a>
        </button>
      </Badge>
    </li>
  )
}
export function FilterParamsBadgeLoader({ obj, onBadgeClose }) {

  const styles = {
    badgeList: {
      padding: "0px",
      margin: "unset"
    }
  }

  const keys = Object.keys(obj) ;



  return (
    <div className="nk-block">
     {
       !keys ? '' :
         (
             <ul className="preview-list" style={styles.badgeList}>
               {
                 keys.map((item) => {

                   return(
                     <BadgeItem
                         title={item}
                         value={obj[item]}
                         onBadgeClose={(e)=>onBadgeClose(e)}
                     />
                   )
                 })
               }
             </ul>
         )
     }
    </div>
  );
}
