

import {Card, Col, Row} from "reactstrap";
import React from "react";
import {Field} from "../../field/field";
import {useTranslation} from "react-i18next";
import { Button, Icon } from "../../../Component";

export function YesOrNoModal({heading, title, content, submitText, cancelText, onClose, onCancel, onSubmit}) {
    const { t, i18n } = useTranslation();

    const style = {
        buttons: {
            padding: "0.5em"
        },
        danaFont: {
          fontFamily: "dana !important",
          margin: "auto"
        },
        divider: {
          height: 1,
          background: "#cecece",
          width: "100%"
        }
    }

    function Divider(){
      return(
        <div style={style.divider}></div>
      )
    }

    return (
        <div>
            <Button onClick={() => onClose(false)}>
                <Icon name="cross"></Icon>
            </Button>
            <h4 style={{padding: "0px 20px"}}>{heading}</h4>
            <Divider/>

            <div style={{margin: "30px 15px"}}>
                <h4>{title}</h4>
                <p >{content}</p>

            </div>
            <Divider/>
            <Row className="nk-kycfm-control-list" style={{margin: "10px"}}>
              <Col sm="6" lg="6" xxl="6" xs="12" style={style.buttons}>
                <Button className="btn btn-danger btn-outline w-100" style={{margin: "10px 0px 0px 0px"}} onClick={onSubmit}>
                  <span style={{margin: "auto", fontFamily: 'iransans'}}>{submitText}</span>
                </Button>
              </Col>
                <Col sm="6" lg="6" xxl="6" xs="12" style={style.buttons}>
                    <Button className="btn btn-light btn-outline w-100" style={{margin: "10px 0px 0px 0px"}} onClick={onCancel}>
                        <div style={{margin: "auto", fontFamily: 'iransans'}}>{cancelText}</div>
                    </Button>
                </Col>
            </Row>

        </div>
    )
}
