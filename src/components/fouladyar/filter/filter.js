
import { Button, Card } from "reactstrap";
import React, {useEffect, useState} from "react";
import FilterItem from "./filter.item";
import {useTranslation} from "react-i18next";
import { Icon } from "../../Component";



export default function Filter({filterStructure, filter, onClose, onSubmit, onChange}) {


  const { t, i18n } = useTranslation();
  const [filterItems, setFilterItems] = useState([])

    useEffect(() => {
        setFilterItems([...filterStructure])
    },[])

  async function getFilterSearchValues(){
    const obj = filterItems.filter(item=> item.selected).reduce((acc, curr) => {
      acc[curr.slug] = curr.value;
      return acc;
    }, {});

   return obj;
  }

  return (
    <div>
      <div className="btn" onClick={onClose}>
        <a href="#cancel" className="close">
          {" "}
          <Icon
            name="cross-sm"
            onClick={(ev) => {
              ev.preventDefault();
              // onFormCancel();
            }}
          ></Icon>
        </a>
      </div>
      <h4 style={{ padding: "0px 20px" }}>{t('filter')}</h4>
      <li className="divider" style={{margin: 0}}></li>


      <div style={{ margin: "30px 15px" }}>
        <Card className="card-bordered">
          <div className="nk-data data-list">

            {
              filterItems.map((item) =>{
                return(
                  <FilterItem
                    key={item.slug}
                    title={item.title}
                    value={item.value}
                    type={item.type}
                    selected={item.selected}
                    onSelect={() => {
                        setFilterItems([
                            ...filterItems.map((i) => {
                                if(i.title === item.title)
                                    return {
                                        ...i,
                                        selected: !item.selected
                                    }
                                return i
                            }),
                        ])
                    }}
                    options={item.options}
                    onChange={(e)=> {
                        setFilterItems([
                            ...filterItems.map((i) => {
                                if(i.title === item.title)
                                    return {
                                        ...i,
                                        value: e
                                    }
                                return i
                            }),
                        ])
                    }}
                  />
                )}
              )
            }
          </div>
        </Card>
      </div>
      <li className="divider" style={{margin: 0}}></li>

      <div style={{ margin: "10px 15px 20px 15px" }}>
        <button
          className="btn btn-primary btn-outline w-100"
          style={{ margin: "10px 0px 0px 0px" }}
          onClick={async () => {
            onSubmit(await getFilterSearchValues());
          }}>
          <span className="form-submit-btn">{t("filter")}</span>
        </button>
      </div>

    </div>
  );
}
