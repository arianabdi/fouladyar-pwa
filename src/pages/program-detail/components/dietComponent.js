import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PiHeartbeatBold } from "react-icons/pi";


const DietComponent = ({items}) => {
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);
  const navigate = useNavigate();


  function DietComponentItem({item}) {
    const { t, i18n } = useTranslation();
    return (
      <div className="diet-item-container">
        <div
          className={`diet-item-header d-flex flex-row justify-content-between ${item.type === "supplement" ? "diet-header-green" : (item.type === "meal" ? "diet-header-blue" : "diet-header-red")}`}>
          <div className="diet-item-header-data d-flex flex-row ">
            <div className="diet-item-icon">
              <PiHeartbeatBold size={18} color={"#fff"} />
            </div>
            <div className={`diet-item-title `}>
              {item.title}
            </div>
          </div>
          <div className="diet-item-type">
            ({t(item.type)})
          </div>
        </div>
        <div className="diet-item-suggestions-item-container">
          {
            item.suggestions.map(item => {
              return (
                <div className="diet-item-suggestions-item">
                  {item}
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }


  return (

    <div className="container  tab-content-view">

      {
        items.map(item => {
          return(
            <DietComponentItem item={item} />
          )
        })
      }


    </div>

  );
};

export default DietComponent;
