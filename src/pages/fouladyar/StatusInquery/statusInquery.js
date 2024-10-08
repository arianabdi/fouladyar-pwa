import React, { useEffect, useState } from "react";



import { Field } from "../../../components/fouladyar/field/field";
import { toFarsiNumber } from "../../../shared/toFarsiNumber";
import { Button } from "reactstrap";
import Icon from "react-multi-date-picker/components/icon";
import { IoMdCloseCircleOutline, IoMdRefresh } from "react-icons/io";
import {CgCloseO} from "react-icons/cg";

// export interface trackNumberType {
//   part1: string;
//   part2: string;
//   part3: string;
//   part4: string;
//   part5: string;
//   part6: string;
//   part7: string;
// }
// interface StatusInqueryProps {
//   number?: string;
//   setNumber?: (value: string) => void;
//   onPress: (trackNumber: trackNumberType) => void;
//   loading?: boolean;
//   className?: object;
//   trackingNumber?: trackNumberType;
// }
// 1400%2F2121%2F601%2F133
// 1400/2121/601/133
// 1400/103/4725015/4
// 1400/103/4729016/3//
// 1400/311/901/1


const StatusInquery = ({
     number,
     onPress,
     loading,
     className,
     isSubmittingFromOutside,
     trackingNumber
   }) => {



  const [_number, set_number] = useState({
    part1: "",
    part2: "",
    part3: "",
    part4: "",
    part5: "",
    part6: "",
    part7: ""
  });
  const [showErr, setShowErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedTextInput, setFocusedTextInput] = useState(0);
  const [addedT, setAddedT] = useState(0);

  useEffect(() => {
    if(Object.keys(number).length > 0 && isSubmittingFromOutside) {
      console.log('num', number)
      set_number(number)
      if(number.part5) setAddedT(1);
      if(number.part6) setAddedT(2);
      if(number.part7) setAddedT(3);

    }
  }, [number])
  useEffect(() => {
      if(_number.part1 && _number.part2 && _number.part3 && _number.part4 && isSubmittingFromOutside){
        console.log('calling', isSubmittingFromOutside)
        onSubmit()
      }

  }, [_number])

  useEffect(() => {
    if (trackingNumber && trackingNumber.part1) {
      set_number(trackingNumber);
      if (
        trackingNumber.part5 &&
        !trackingNumber.part6 &&
        !trackingNumber.part7
      ) {
        setAddedT(1);
      }
      if (
        trackingNumber.part5 &&
        trackingNumber.part6 &&
        !trackingNumber.part7
      ) {
        setAddedT(2);
      }
      if (
        trackingNumber.part5 &&
        trackingNumber.part6 &&
        trackingNumber.part7
      ) {
        setAddedT(3);
      }
    }
  }, [trackingNumber]);
  const setNum1 = (t) => {
    set_number({ ..._number, part1: t || ''  });
  };
  const setNum2 = (t) => {
    set_number({ ..._number, part2: t || ''  });
  };
  const setNum3 = (t) => {
    set_number({ ..._number, part3: t || ''  });
  };
  const setNum4 = (t) => {
    set_number({ ..._number, part4: t || ''  });
  };
  const setNum5 = (t) => {
    set_number({ ..._number, part5: t || ''  });
  };
  const setNum6 = (t) => {
    set_number({ ..._number, part6: t || ''  });
  };
  const setNum7 = (t) => {
    set_number({ ..._number, part7: t || '' });
  };
  const onSubmit = () => {
    if (addedT === 0) {
      if (_number.part1 && _number.part2 && _number.part3 && _number.part4) {
        setShowErr(false);
        onPress(_number);
      } else {
        setShowErr(true);
      }
    }
    if (addedT === 1) {
      if (
        _number.part1 &&
        _number.part2 &&
        _number.part3 &&
        _number.part4 &&
        _number.part5
      ) {
        setShowErr(false);
        onPress(_number);
      } else {
        setShowErr(true);
      }
    }
    if (addedT === 2) {
      if (
        _number.part1 &&
        _number.part2 &&
        _number.part3 &&
        _number.part4 &&
        _number.part5 &&
        _number.part6
      ) {
        setShowErr(false);
        onPress(_number);
      } else {
        setShowErr(true);
      }
    }
    if (addedT === 3) {
      if (
        _number.part1 &&
        _number.part2 &&
        _number.part3 &&
        _number.part4 &&
        _number.part5 &&
        _number.part6 &&
        _number.part7
      ) {
        setShowErr(false);
        onPress(_number);
      } else {
        setShowErr(true);
      }
    }
  };

  const onAddClick = () => {
    if (addedT === 0) {
      setAddedT(1);
    }
    if (addedT === 1) {
      setAddedT(2);
    }
    if (addedT === 2) {
      setAddedT(3);
    }
  };
  const onDelete = () => {
    if (addedT === 3) {
      setAddedT(2);
      setNum7("");
    }
    if (addedT === 2) {
      setAddedT(1);
      setNum6("");
    }
    if (addedT === 1) {
      setAddedT(0);
      setNum5("");
    }
  };
  const onRefresh = () => {
    set_number({
      part1: "",
      part2: "",
      part3: "",
      part4: "",
      part5: "",
      part6: "",
      part7: ""
    });
  };
  return (
    <div className={"wrapper"}>

      <div className={"titrWrapper"}>
        <button
            className={"btn btn-primary custom-icon-button"}
            onClick={onRefresh
            }>
          <IoMdRefresh size={30} color={
            _number.part1 ||
            _number.part2 ||
            _number.part3 ||
            _number.part4 ||
            _number.part5 ||
            _number.part6 ||
            _number.part7
                ? "#206693"
                : "#fff"
          }/>
        </button>
        <span className={"title"}>استعلام وضعیت حواله</span>
        <button className={"custom-icon-button"} onClick={onDelete}>
          <CgCloseO
              size={30}
              color={addedT > 0 ? "#d93131" : "#fff"}
          />
        </button>
      </div>
      <div className={"inputWrapper"}>
        <div className={"inputList"}>
          <div className={"inputWrapp"}>
            <Field
                className={"textInput num1"}
                onFocus={() => setFocusedTextInput(1)}
                maxLength={10}
                onChange={setNum1}
                value={_number.part1}
                // placeholder={'1400/103/4729016/3'}
                type={"number"}
            />
          </div>
          <div className={"inputWrapp"}>
            <Field
                className={"textInput num2"}
                onFocus={() => setFocusedTextInput(2)}
                maxLength={10}
                onChange={setNum2}
                value={_number.part2}
                // placeholderTextColor={CColor.gray}
                // placeholder={'1400/103/4729016/3'}
                type={"number"}
            />
          </div>
          <div
              className={"inputWrapp"}>
            <Field
                className={"textInput num3"}
                onFocus={() => setFocusedTextInput(3)}
                maxLength={10}
                onChange={setNum3}
                value={_number.part3}
                // placeholderTextColor={CColor.gray}
                // placeholder={'1400/103/4729016/3'}
                type={"number"}
            />
          </div>


          <div
              className={"inputWrapp"}>
            <Field
                className={"textInput num4"}
                onFocus={() => setFocusedTextInput(4)}
                maxLength={10}
                onChange={setNum4}
                value={_number.part4}
                // placeholderTextColor={CColor.gray}
                // placeholder={'1400/103/4729016/3'}
                type={"number"}
            />
          </div>

          {/* added 1 */}
          {addedT > 0 && (

                <div className={"inputWrapp"}>
                  <Field
                      className={"textInput num5"}
                      onFocus={() => setFocusedTextInput(5)}
                      maxLength={10}
                      onChange={setNum5}
                      value={_number.part5}
                      // placeholderTextColor={CColor.gray}
                      // placeholder={'1400/103/4729016/3'}
                      type={"number"}
                  />
                </div>

          )}
          {/* added 2 */}
          {addedT > 1 && (

                <div
                    className={"inputWrapp"}>
                  <Field
                      className={"textInput num6"}
                      onFocus={() => setFocusedTextInput(6)}
                      maxLength={10}
                      onChange={setNum6}
                      value={_number.part6}
                      // placeholder={'1400/103/4729016/3'}
                      type={"number"}
                  />
                </div>

          )}
          {/* added 3 */}
          {addedT > 2 && (

                <div className={"inputWrapp"}>
                  <Field
                      className={"textInput num7"}
                      onFocus={() => setFocusedTextInput(7)}
                      maxLength={10}
                      onChange={setNum7}
                      value={_number.part7}
                      // placeholderTextColor={CColor.gray}
                      // placeholder={'1400/103/4729016/3'}
                      type={"number"}
                  />
                </div>

          )}
        </div>
        {
            toFarsiNumber(`${_number.part1 || "----"}/${_number.part2 || "----"}/${
                _number.part3 || "----"
            }/${_number.part4 || "----"}`) +
            (addedT > 0 ? toFarsiNumber(`/${_number.part5 || "----"}`) : ``) +
            (addedT > 1 ? toFarsiNumber(`/${_number.part6 || "----"}`) : ``) +
            (addedT > 2 ? toFarsiNumber(`/${_number.part7 || "----"}`) : ``)
        }

        {showErr && (
            <span className={"errorText"}>
              فرمت کد رهگیری وارد شده اشتباه می باشد!
            </span>
        )}
      </div>
      <div className={"buttonWrapper"}>

        <button
            className="outline width-40"
            disabled={loading}
            onClick={onAddClick}
        >
          افزایش اعشار
        </button>

        <button
            className={"width-60"}
            disabled={loading}
            onClick={onSubmit}
        >
          استعلام وضعیت
        </button>
      </div>
    </div>
  );
};


export default StatusInquery;
