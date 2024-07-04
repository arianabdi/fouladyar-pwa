import {Spinner} from "reactstrap";
import React, {useContext, useEffect} from "react";
import {makeStyles} from "@material-ui/styles";


const useStyles = makeStyles((theme) => ({
    gray: {
        color: "#cecece",
        textAlign: "center",
        display: "block",
    },
    icon: {
        fontSize: "52px",
    },
    title: {
        fontSize: "20px",
    },
    content: {
        color: "#cecece"
    },
    card: {
        width: "100%",
        margin: "auto",
        padding: "15% 0px",
        backgroundColor: "#fff",
        border: "1px solid #f2f2f2"
    }
    })
);


export function EmptyState({image, title, content, className}){
    const classes = useStyles();
    return(
      <div className={`empty-state-container ${className}`}>
          <div className={"image-flex-container"}>
              <div className={"empty-state-image"}>
                  <img src={image} alt=""></img>
              </div>
          </div>
          <div className={`${classes.title} ${classes.gray}`} style={{maxWidth: '480px'}}>{title}</div>
          <p className={`${classes.content} ${classes.gray}`}>
              {content}
          </p>
      </div>
    )
}
