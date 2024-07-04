import React from "react";
import { toFarsiNumber } from "../../../shared/toFarsiNumber";
import { ConvertGregorianToJalali } from "../../../shared/convertGregorianToJalali";
import { useTranslation } from "react-i18next";

export function TransactionItem({transactionId, title, amount, date, status}){

  const { t, i18n } = useTranslation();

  return(
    <div className="transaction-item-container">
      <div className="p-2 d-flex flex-column align-content-center">
        <div className="d-flex flex-row align-content-center justify-content-between">
          <div className="transaction-item-title">
            {title}
          </div>
          <div className="me-1 transaction-item-title">
            {toFarsiNumber(amount)} ریال
          </div>
        </div>
        <div className="d-flex flex-row  align-content-center justify-content-between">
          <div className="transaction-item-date">
            {toFarsiNumber(ConvertGregorianToJalali(date, true))}
          </div>
          <div className={`transaction-item-status me-1  ${"t-failed"}`}>
            {t(status)}
          </div>
        </div>
      </div>
    </div>
  )
}
