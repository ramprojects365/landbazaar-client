"use client";

import { useMemo, useState } from "react";
import {
  calculateTelanganaStampDutyByTransaction,
  getAssessedPropertyValue,
  type StampDutyTransactionType,
} from "@/config/telanganaRealEstate";
import {
  formatIndianCurrency,
  formatIndianNumber,
  formatPercent,
  parseIndianNumberInput,
} from "@/utils/calculatorFormat";

const TRANSACTION_OPTIONS: {
  id: StampDutyTransactionType;
  label: string;
  hint: string;
}[] = [
  {
    id: "sale_urban",
    label: "Sale deed — Urban / GHMC / HMDA",
    hint: "Hyderabad, Cyberabad, municipal & HMDA limits",
  },
  {
    id: "sale_rural",
    label: "Sale deed — Rural / Gram Panchayat",
    hint: "ORR-side GP layouts and village panchayats",
  },
  {
    id: "gift_family",
    label: "Gift deed — Family members",
    hint: "2% stamp duty + 0.5% registration (min ₹2,000, max ₹25,000)",
  },
  {
    id: "gift_non_family",
    label: "Gift deed — Non-family",
    hint: "5% stamp duty + 0.5% registration (urban)",
  },
  {
    id: "partition_family",
    label: "Partition deed — Family",
    hint: "0.5% stamp duty (max ₹1,00,000) + ₹2,000 registration",
  },
];

const SHOWS_TRANSFER_DUTY: StampDutyTransactionType[] = ["sale_urban"];

export default function StampDutyCalculator() {
  const [transactionType, setTransactionType] =
    useState<StampDutyTransactionType>("sale_urban");
  const [agreedSalePrice, setAgreedSalePrice] = useState(80_00_000);
  const [guidanceValue, setGuidanceValue] = useState(75_00_000);

  const assessedValue = useMemo(
    () => getAssessedPropertyValue(agreedSalePrice, guidanceValue),
    [agreedSalePrice, guidanceValue],
  );

  const breakdown = useMemo(
    () =>
      calculateTelanganaStampDutyByTransaction(assessedValue, transactionType),
    [assessedValue, transactionType],
  );

  const valueSource =
    agreedSalePrice >= guidanceValue ? "agreed sale price" : "guidance value";

  return (
    <div className="mortgage-calculator service-calculator">
      <div className="mortgage-calculator__shell">
        <div className="mortgage-calculator__inputs">
          <div className="service-calculator__field">
            <label className="service-calculator__label" htmlFor="transaction-type">
              Transaction type
            </label>
            <select
              id="transaction-type"
              className="service-calculator__select"
              value={transactionType}
              onChange={(event) =>
                setTransactionType(
                  event.target.value as StampDutyTransactionType,
                )
              }
            >
              {TRANSACTION_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            <p className="service-calculator__hint">
              {
                TRANSACTION_OPTIONS.find(
                  (option) => option.id === transactionType,
                )?.hint
              }
            </p>
          </div>

          <div className="mortgage-calculator__control">
            <div className="mortgage-calculator__control-head">
              <p>Agreed sale price</p>
              <strong>{formatIndianCurrency(agreedSalePrice)}</strong>
            </div>
            <input
              type="range"
              min={5_00_000}
              max={5_00_00_000}
              step={50_000}
              value={agreedSalePrice}
              onChange={(event) =>
                setAgreedSalePrice(Number(event.target.value))
              }
              aria-label="Agreed sale price"
            />
            <input
              type="text"
              inputMode="numeric"
              className="service-calculator__text-input"
              value={formatIndianNumber(agreedSalePrice)}
              onChange={(event) =>
                setAgreedSalePrice(parseIndianNumberInput(event.target.value))
              }
              aria-label="Agreed sale price in rupees"
            />
          </div>

          <div className="mortgage-calculator__control">
            <div className="mortgage-calculator__control-head">
              <p>Government market / guidance value</p>
              <strong>{formatIndianCurrency(guidanceValue)}</strong>
            </div>
            <input
              type="range"
              min={5_00_000}
              max={5_00_00_000}
              step={50_000}
              value={guidanceValue}
              onChange={(event) =>
                setGuidanceValue(Number(event.target.value))
              }
              aria-label="Government guidance value"
            />
            <input
              type="text"
              inputMode="numeric"
              className="service-calculator__text-input"
              value={formatIndianNumber(guidanceValue)}
              onChange={(event) =>
                setGuidanceValue(parseIndianNumberInput(event.target.value))
              }
              aria-label="Government guidance value in rupees"
            />
          </div>

          <div className="service-calculator__assessed">
            <p>Assessed value used for duty</p>
            <strong>{formatIndianCurrency(assessedValue)}</strong>
            <span>Higher of agreed price or guidance ({valueSource})</span>
          </div>
        </div>

        <div className="mortgage-calculator__summary">
          <div className="mortgage-calculator__payment">
            <p>Total statutory fees payable</p>
            <strong>
              {breakdown ? formatIndianCurrency(breakdown.total) : "—"}
            </strong>
            <span>
              {breakdown
                ? `${formatPercent(breakdown.effectiveRate, 2)} of assessed value`
                : "Enter valid property values"}
            </span>
          </div>

          <div className="mortgage-calculator__summary-card">
            <h3>Fee breakdown</h3>
            <div>
              <span>Stamp duty</span>
              <strong>
                {breakdown ? formatIndianCurrency(breakdown.stampDuty) : "—"}
              </strong>
            </div>
            {SHOWS_TRANSFER_DUTY.includes(transactionType) && (
              <div>
                <span>Transfer duty</span>
                <strong>
                  {breakdown
                    ? formatIndianCurrency(breakdown.transferDuty)
                    : "—"}
                </strong>
              </div>
            )}
            <div>
              <span>Registration fee</span>
              <strong>
                {breakdown
                  ? formatIndianCurrency(breakdown.registrationFee)
                  : "—"}
              </strong>
            </div>
            <hr />
            <div className="mortgage-calculator__total">
              <span>Total payable to government</span>
              <strong>
                {breakdown ? formatIndianCurrency(breakdown.total) : "—"}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
