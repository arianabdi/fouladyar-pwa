import React, { useEffect, useState } from "react";
import Content from "../../../layout/content/Content";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Button,
  Col,
  PreviewCard,
  Row
} from "../../../components/Component";
import { useTranslation } from "react-i18next";
import { Field } from "../field/field";
import DuotoneSpace from "react-syntax-highlighter/dist/cjs/styles/prism/duotone-space";
import { makeStyles } from "@material-ui/styles";
import { Alert } from "reactstrap";
import Icon from "../../icon/Icon";
import axios from "axios";
import { convertDate } from "../../../shared/shared";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";


function Form ({ form, fields, statics, isEditing, onFieldChange, onFormSubmit }) {
  const { t, i18n } = useTranslation();

  const auth = useSelector((state) => state.auth);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState()
  const classes = useStyles();
  const [_fields, set_fields] = useState([])



  function validateForm(){
    let errors = [];

    fields.map(row => {
      row.map(field =>{
        if(field.regex){
          const isMatch = field.regex.test(form[field.slug])
          if(!isMatch){
            errors.push(field.alert);

          }
        }
      })
    })

    console.log('error', errors);
    if(errors.length === 0){
      setShowAlert(false)
      setAlertText('');
      return true;
    }

    setAlertText(
      <>
        شما باید فیلد های زیر را تغییر دهید:
        <div className="space-10"/>
        <ul>
          {
            errors.map(message => {
              return (
                <li>{message}</li>
              )
            })
          }
        </ul>
      </>
    )
    setShowAlert(true)
    return false;
  }

  async function loadOptionsFromApi(path, key, chooseOptionsLabelFrom, chooseOptionsValueFrom){
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}${path}`, {
        headers: {
          "authorization": `bearer ${auth.token}`
        }
      } );

      if(res.data.statusCode === 200){
        //it should be an array object
        const options = res.data.data[key].map(item => {
          return {label: item[chooseOptionsLabelFrom], value: item[chooseOptionsValueFrom]}
        })

        return options;
      }
    }catch (e) {
      console.log('Error: ', e)
      toast.error(e.message)
    }
  }





  useEffect(() => {
    async function fetchDataAndRender() {

      const rows = [];

      for (const [rowIndex, row] of fields.entries()) {
        const cols = [];


        for (const [colIndex, col] of row.entries()) {

          const selectOptions = col.chooseOptionsFromApi ?
            (await loadOptionsFromApi(col.path, col.key, col.chooseOptionsLabelFrom, col.chooseOptionsValueFrom) || null) :
            (col.options || null)

          cols.push(
            <Col lg={`${12 / row.length}`} key={`col-${colIndex}-${rowIndex}`}>
              <Field
                id={col.slug}
                name={col.slug}
                label={col.title}
                placeholder={col.placeholder}
                isRequired={col.isRequired}
                isJalali={col.isJalali}
                options={selectOptions}
                onChange={(value) => {
                  // console.log('_______onchange', col.title, value, { ...form, [col.slug]: value })
                  onFieldChange({[col.slug]: value });
                }}
                value={form[col.slug]}
                type={col.type}
              />
            </Col>
          );
        }

        rows.push(
          <Row key={`row-${rowIndex}`} className={`g-4 ${classes.formRow}`}>
            {cols}
          </Row>
        );
      }

      set_fields(rows);
    }

    fetchDataAndRender();
  }, []);

  return (
    <Content page="component">
      <Block size="lg">
        <BlockHead>
          <BlockHeadContent>
            <BlockTitle tag="h5">{isEditing ? statics.editTitle : (statics.title || 'فرم بدون عنوان')}</BlockTitle>
            <p>{isEditing ? statics.editDescription : (statics.description || 'فرم بدون خلاصه')}</p>
          </BlockHeadContent>
        </BlockHead>
        <PreviewCard>
          <div className="card-head">
            <h5 className="card-title">{isEditing ? statics.editTitle : (statics.title || 'فرم بدون عنوان')}</h5>
          </div>
          <div className="card-head">
            <h5 className="card-title alert-container">

              {
                !showAlert ? null :
                  <div>
                    <Alert className="alert-fill alert-icon" color="danger">
                      {alertText}
                      <Icon name="alert-circle" />
                    </Alert>
                  </div>
              }
            </h5>
          </div>
          <form>
            {_fields}
            <Row className="g-4 form-submit-container">
              <Col xl="12" className={"no-padding"}>
                <div className="btn btn-primary form-submit-btn" color="primary" size="lg" onClick={()=>{

                  if(!validateForm())
                    return

                  onFormSubmit()
                }}>
                  {isEditing ? statics.editSubmitText : (statics.submitText || 'ایجاد')}
                </div>
              </Col>
            </Row>
          </form>
        </PreviewCard>
      </Block>

    </Content>
  );
};

export default Form;

export function FormIsLoading({isEditing, statics}){
  return(
    <Content page="component">
      <Block size="lg">
        <BlockHead>
          <BlockHeadContent>
            <BlockTitle tag="h5">{isEditing ? statics.editTitle : (statics.title || 'فرم بدون عنوان')}</BlockTitle>
            <p>{isEditing ? statics.editDescription : (statics.description || 'فرم بدون عنوان')}</p>
          </BlockHeadContent>
        </BlockHead>
        <PreviewCard>
          <div className="card-head">
            <h5 className="card-title">{isEditing ? statics.editTitle : (statics.title || 'فرم بدون عنوان')}</h5>
          </div>

          <div className="align-center justify-center w-100">
            در حال بارگذاری...
          </div>

        </PreviewCard>
      </Block>

    </Content>
  )
}


const useStyles = makeStyles((theme) => ({
    formRow: {
      marginTop: "0px",
    }
  })
);

