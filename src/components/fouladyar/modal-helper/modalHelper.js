import React, {useRef, useState, useEffect} from "react";


import {useTranslation} from "react-i18next";

import { BottomSheet } from 'react-spring-bottom-sheet'
// if setting up the CSS is tricky, you can add this to your page somewhere:
// <link rel="stylesheet" href="https://unpkg.com/react-spring-bottom-sheet/dist/style.css" crossorigin="anonymous">
import 'react-spring-bottom-sheet/dist/style.css'
import {makeStyles} from "@material-ui/styles";
import {Modal} from "reactstrap";
import {useSelector} from "react-redux";
import { selectThemeInfo } from "../../../redux/store/services/theme/store";


const useStyles = makeStyles((theme) => ({
        bottomSheet: {
            '& [data-rsbs-overlay]': {
                zIndex: 2000000,
            },
            '& [data-rsbs-backdrop]': {
                zIndex: 1000000,
            }
        },
    })
);





const ModalHelper = ({open, onClose, onOpen, size, component}) => {

    const themeState = useSelector(selectThemeInfo());
    const [mobileView, setMobileView] = useState(false);


    useEffect(() => {
        viewChange();
    }, []);

    const viewChange = () => {
        if (window.innerWidth < 576) {
            setMobileView(true);

        } else {
            setMobileView(false);
        }
    };


    window.addEventListener("load", viewChange);
    window.addEventListener("resize", viewChange);




    const { t, i18n } = useTranslation();
    const classes = useStyles();
    const handleBottomSheetClick = (event) => {
        event.stopPropagation();
        // Handle other BottomSheet logic
    };

    function ModalForMobile(){
        return(
            <BottomSheet onClick={handleBottomSheetClick} className={classes.bottomSheet} onDismiss={onClose} onTouchCancel={onClose} style={{zIndex: 100000}} open={open}>
                {component}
            </BottomSheet>
        )
    }

    function ModalForWeb(){
        return(
            <Modal  isOpen={open} size={size ? size : "md"} toggle={open ? onClose : onOpen}>
                {component}
            </Modal>
        )
    }


    return (
        <>
            {/*<ModalForWeb/>*/}
            {/*<button onClick={openModal}>Open modal</button>*/}
            {mobileView ? <ModalForMobile/> : <ModalForWeb/>}
        </>
    )
}

export default ModalHelper
