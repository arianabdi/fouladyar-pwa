import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toFarsiNumber } from "../../../shared/toFarsiNumber";


const ExerciseComponent = ({ items }) => {
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();


  function ExerciseComponentItem({ item }) {

    const { t, i18n } = useTranslation();

    return (
      <Link to={`/exercise/${item.exerciseId}`}>
        <div className="exercise-item-container">
          <div className="p-2 d-flex flex-row align-content-center">
            <div className="exercise-item-image">
              <img src={item.image} alt="" />
            </div>
            <div className="exercise-item-data">
              <div className="exercise-item-title w-100">
                {item.title}
              </div>
              <div className={`exercise-item-sets w-100 `}>
                {toFarsiNumber(item.sets)} ست {toFarsiNumber(item.reps)} تکرار ({toFarsiNumber(item.rest)} دقیقه استراحت بین ست)
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }


  return (

    <div className="container tab-content-view">
      {
        items.map(item => {
          return (
            <ExerciseComponentItem item={item} />
          );
        })
      }
    </div>

  );
};

export default ExerciseComponent;
