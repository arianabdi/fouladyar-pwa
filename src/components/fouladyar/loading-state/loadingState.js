import {Spinner} from "reactstrap";
import React, {useContext, useEffect} from "react";
import {makeStyles} from "@material-ui/styles";


const useStyles = makeStyles((theme) => ({
        customSpinner: {
            '& .custom-spinner': {
                margin: "auto",
                top: "40%",
                position: "relative",
                width: "45px",
                borderRadius: "50px",
                border: "1px solid #0000000d",
                alignItems: "center",
                background: "#fff",
                boxShadow: "1px 2px 6px -3px #00000024",
                textAlign: "center",
                height: "auto",
                padding: "12px 0px 8px 0px"
            },
            width: "100%",
            height: "100%",
        },
        tableSpinner:{
            margin: "auto",
            '& .custom-spinner': {
                margin: "auto",
                top: "40%",
                position: "relative",
                width: "45px",
                borderRadius: "50px",
                border: "1px solid #0000000d",
                alignItems: "center",
                background: "#fff",
                boxShadow: "1px 2px 6px -3px #00000024",
                textAlign: "center",
                height: "auto",
                padding: "12px 0px 8px 0px"
            },
        }
    })
);

export function LoadingState(){
    const classes = useStyles();
    return(
        <div className={classes.customSpinner}>
            <div className="custom-spinner">
                <Spinner size="sm" color="light" />
            </div>
        </div>
    )
}

export function TableLoadingState(){
    const classes = useStyles();
    return(
        <div className={`custom-spinner ${classes.tableSpinner}`}>
            <div className="custom-spinner">
                <Spinner size="sm" color="light" />
            </div>
        </div>
    )
}
