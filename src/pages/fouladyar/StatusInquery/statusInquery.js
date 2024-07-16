import React, { useEffect, useState } from "react";



import { Field } from "../../../components/fouladyar/field/field";
import { toFarsiNumber } from "../../../shared/toFarsiNumber";
import { Button } from "reactstrap";
import Icon from "react-multi-date-picker/components/icon";
import { IoMdCloseCircleOutline, IoMdRefresh } from "react-icons/io";

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
                         setNumber,
                         onPress,
                         loading,
                         className,
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
  const [focusedTextInput, setFocusedTextInput] = useState(0);
  const [addedT, setAddedT] = useState(0);
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
    set_number({ ..._number, part1: t });
  };
  const setNum2 = (t) => {
    set_number({ ..._number, part2: t });
  };
  const setNum3 = (t) => {
    set_number({ ..._number, part3: t });
  };
  const setNum4 = (t) => {
    set_number({ ..._number, part4: t });
  };
  const setNum5 = (t) => {
    set_number({ ..._number, part5: t });
  };
  const setNum6 = (t) => {
    set_number({ ..._number, part6: t });
  };
  const setNum7 = (t) => {
    set_number({ ..._number, part7: t });
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
      <div className={"container"}>
        <div className={"titrWrapper"}>
          <button
            className={"btn btn-primary"}
            onClick={onRefresh
          }>
            <IoMdRefresh size={20} color={
              number.part1 ||
              number.part2 ||
              number.part3 ||
              number.part4 ||
              number.part5 ||
              number.part6 ||
              number.part7
                ? "#206693"
                : "#fff"
            }/>
          </button>
          <span className={"title"}>استعلام وضعیت حواله</span>
          <button className={""} onClick={onDelete}>
            <IoMdCloseCircleOutline
              size={35}
              color={addedT > 0 ? "#d93131" : "#fff"}
            />
          </button>
        </div>
        <div className={"inputWrapper"}>
          <div className={"inputList"}>
            <div className={"inputWrapp"}>
              <Field
                className={"textInput"}
                onFocus={() => setFocusedTextInput(1)}
                maxLength={10}
                onChangeText={setNum1}
                value={_number.part1}
                // placeholder={'1400/103/4729016/3'}
                keyboardType={"numeric"}
              />
            </div>
            <div className={"slashWrapper"}>
              <span className={"slash"}>/</span>
            </div>
            <div className={"inputWrapp"}>
              <Field
                className={"textInput"}
                onFocus={() => setFocusedTextInput(2)}
                maxLength={10}
                onChange={setNum2}
                value={_number.part2}
                // placeholderTextColor={CColor.gray}
                // placeholder={'1400/103/4729016/3'}
                type={"number"}
              />
            </div>
            <div className={"slashWrapper"}>
              <span className={"slash"}>/</span>
            </div>
            <div
              className={"inputWrapp"}>
              <Field
                className={"textInput"}
                onFocus={() => setFocusedTextInput(2)}
                maxLength={10}
                onChange={setNum2}
                value={_number.part2}
                // placeholderTextColor={CColor.gray}
                // placeholder={'1400/103/4729016/3'}
                type={"number"}
              />
            </div>

            <div className={"slashWrapper"}>
              <span className={"slash"}>/</span>
            </div>
            <div
              className={"inputWrapp"}>
              <Field
                className={"textInput"}
                onFocus={() => setFocusedTextInput(2)}
                maxLength={10}
                onChange={setNum2}
                value={_number.part2}
                // placeholderTextColor={CColor.gray}
                // placeholder={'1400/103/4729016/3'}
                type={"number"}
              />
            </div>

            {/* added 1 */}
            {addedT > 0 && (
              <>
                <div className={"slashWrapper"}>
                  <span className={"slash"}>/</span>
                </div>
                <div className={"inputWrapp"}>
                  <Field
                    className={"textInput"}
                    onFocus={() => setFocusedTextInput(2)}
                    maxLength={10}
                    onChange={setNum2}
                    value={_number.part2}
                    // placeholderTextColor={CColor.gray}
                    // placeholder={'1400/103/4729016/3'}
                    type={"number"}
                  />
                </div>
              </>
            )}
            {/* added 2 */}
            {addedT > 1 && (
              <>
                <div className={"slashWrapper"}>
                  <span className={"slash"}>/</span>
                </div>
                <div
                  className={"inputWrapp"}>
                  <Field
                    className={"textInput"}
                    onFocus={() => setFocusedTextInput(2)}
                    maxLength={10}
                    onChange={setNum2}
                    value={_number.part2}
                    // placeholder={'1400/103/4729016/3'}
                    type={"number"}
                  />
                </div>
              </>
            )}
            {/* added 3 */}
            {addedT > 2 && (
              <>
                <div className={"slashWrapper"}>
                  <span className={"slash"}>/</span>
                </div>
                <div
                  className={"inputWrapp"}>
                  <Field
                    className={"textInput"}
                    onFocus={() => setFocusedTextInput(2)}
                    maxLength={10}
                    onChange={setNum2}
                    value={_number.part2}
                    // placeholderTextColor={CColor.gray}
                    // placeholder={'1400/103/4729016/3'}
                    type={"number"}
                  />
                </div>
              </>
            )}
          </div>
          {/*{*/}
          {/*  toFarsiNumber(`${_number.part1 || "----"}/${_number.part2 || "----"}/${*/}
          {/*    _number.part3 || "----"*/}
          {/*  }/${_number.part4 || "----"}`) +*/}
          {/*  (addedT > 0 ? toFarsiNumber(`/${_number.part5 || "----"}`) : ``) +*/}
          {/*  (addedT > 1 ? toFarsiNumber(`/${_number.part6 || "----"}`) : ``) +*/}
          {/*  (addedT > 2 ? toFarsiNumber(`/${_number.part7 || "----"}`) : ``)*/}
          {/*}*/}

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
    </div>
  );
};


export default StatusInquery;
