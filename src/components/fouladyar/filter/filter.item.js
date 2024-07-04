


import {Button, Col, Row} from "reactstrap";
import { Field } from "../field/field";
import React from "react";
import { useTranslation } from "react-i18next";


export default function FilterItem({ title, value, selected, options, type, onChange, onSelect }) {
  const { t, i18n } = useTranslation();


  const styles={
    selected: {
      background:  "#0971fe12",
      padding: "15px 20px"
    },
    normal: {
      padding: "15px 20px"
    }
  }
  return (
    <div className="data-item" style={selected ? styles.selected : styles.normal}>
      <div className="data-col">
        <Col md="4">
          <Row>
            <Col className="col-3">
              <div onClick={(e) => {
                onSelect()
              }}>
                <Field
                    type="checkbox"
                    value={selected || false}
                />
              </div>

            </Col>
            <Col className="col-9">{t(title)}</Col>
          </Row>
        </Col>

        {/*<span className="data-label"> </span>*/}
        {/*<span className="data-value">{t(dataValue)}</span>*/}
        <Col md="8">
          <Field
            id={title}
            name={title}
            type={type || 'text'}
            value={value || ''}
            options={options || []}
            onChange={(e) => {onChange(type === 'select' ? e.value : (type==='datepicker' ? e : e.target.value))}}
            disabled={!selected}
          />
        </Col>

      </div>
    </div>
  );
}
