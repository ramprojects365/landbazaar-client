"use client";

import { useMemo, useState } from "react";
import {
  calculateMaxEligibleLoanFromSalary,
  calculatePlotLoanEmi,
  loanAmountFromDownPaymentPercent,
  PLOT_LOAN_DEFAULTS,
} from "@/config/telanganaRealEstate";
import {
  formatIndianCurrency,
  formatIndianNumber,
  parseIndianNumberInput,
} from "@/utils/calculatorFormat";

export default function PlotLoanEmiCalculator() {
  const [plotPrice, setPlotPrice] = useState(PLOT_LOAN_DEFAULTS.plotPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(
    PLOT_LOAN_DEFAULTS.downPaymentPercent,
  );
  const [interestRate, setInterestRate] = useState(
    PLOT_LOAN_DEFAULTS.interestRate,
  );
  const [tenureYears, setTenureYears] = useState(
    PLOT_LOAN_DEFAULTS.tenureYears,
  );
  const [monthlySalary, setMonthlySalary] = useState(
    PLOT_LOAN_DEFAULTS.monthlySalary,
  );

  const { loanAmount, downPayment } = useMemo(
    () => loanAmountFromDownPaymentPercent(plotPrice, downPaymentPercent),
    [plotPrice, downPaymentPercent],
  );

  const breakdown = useMemo(
    () =>
      calculatePlotLoanEmi(plotPrice, downPayment, interestRate, tenureYears),
    [plotPrice, downPayment, interestRate, tenureYears],
  );

  const maxEligibleLoan = useMemo(
    () =>
      calculateMaxEligibleLoanFromSalary(
        monthlySalary,
        PLOT_LOAN_DEFAULTS.foirPercent,
        interestRate,
        tenureYears,
      ),
    [monthlySalary, interestRate, tenureYears],
  );

  const principalShare = breakdown
    ? (breakdown.loanAmount / breakdown.totalPayment) * 100
    : 0;
  const interestShare = breakdown ? 100 - principalShare : 0;

  return (
    <div className="mortgage-calculator service-calculator">
      <div className="mortgage-calculator__shell">
        <div className="mortgage-calculator__inputs">
          <div className="mortgage-calculator__control">
            <div className="mortgage-calculator__control-head">
              <p>Plot purchase price</p>
              <strong>{formatIndianCurrency(plotPrice)}</strong>
            </div>
            <input
              type="range"
              min={10_00_000}
              max={3_00_00_000}
              step={1_00_000}
              value={plotPrice}
              onChange={(event) => setPlotPrice(Number(event.target.value))}
              aria-label="Plot purchase price"
            />
            <input
              type="text"
              inputMode="numeric"
              className="service-calculator__text-input"
              value={formatIndianNumber(plotPrice)}
              onChange={(event) =>
                setPlotPrice(parseIndianNumberInput(event.target.value))
              }
              aria-label="Plot purchase price in rupees"
            />
          </div>

          <div className="mortgage-calculator__control">
            <div className="mortgage-calculator__control-head">
              <p>Down payment ({downPaymentPercent}%)</p>
              <strong>{formatIndianCurrency(downPayment)}</strong>
            </div>
            <input
              type="range"
              min={20}
              max={80}
              step={1}
              value={downPaymentPercent}
              onChange={(event) =>
                setDownPaymentPercent(Number(event.target.value))
              }
              aria-label="Down payment percentage"
            />
            <p className="service-calculator__hint">
              Minimum 20% down payment typical for plot loans. Loan amount (P):{" "}
              {formatIndianCurrency(loanAmount)}.
            </p>
          </div>

          <div className="mortgage-calculator__control">
            <div className="mortgage-calculator__control-head">
              <p>Interest rate (p.a.)</p>
              <strong>{interestRate.toFixed(2)}%</strong>
            </div>
            <input
              type="range"
              min={8}
              max={12}
              step={0.05}
              value={interestRate}
              onChange={(event) =>
                setInterestRate(Number(event.target.value))
              }
              aria-label="Annual interest rate"
            />
            <p className="service-calculator__hint">
              Monthly rate R = annual rate ÷ (12 × 100)
            </p>
          </div>

          <div className="mortgage-calculator__control">
            <div className="mortgage-calculator__control-head">
              <p>Loan tenure</p>
              <strong>
                {tenureYears} years ({tenureYears * 12} months)
              </strong>
            </div>
            <input
              type="range"
              min={5}
              max={20}
              step={1}
              value={tenureYears}
              onChange={(event) => setTenureYears(Number(event.target.value))}
              aria-label="Loan tenure in years"
            />
          </div>

          <div className="mortgage-calculator__control">
            <div className="mortgage-calculator__control-head">
              <p>Net monthly salary (for eligibility estimate)</p>
              <strong>{formatIndianCurrency(monthlySalary)}</strong>
            </div>
            <input
              type="range"
              min={25_000}
              max={5_00_000}
              step={5_000}
              value={monthlySalary}
              onChange={(event) =>
                setMonthlySalary(Number(event.target.value))
              }
              aria-label="Net monthly salary"
            />
            <p className="service-calculator__hint">
              Max eligible loan assumes 50% FOIR (EMI ≤ 50% of net salary).
              Actual bank limits vary.
            </p>
          </div>
        </div>

        <div className="mortgage-calculator__summary">
          <div className="mortgage-calculator__payment">
            <p>Monthly EMI</p>
            <strong>
              {breakdown
                ? `${formatIndianCurrency(Math.round(breakdown.emi))}/month`
                : "—"}
            </strong>
            <span>
              {breakdown
                ? `Reducing balance · ${breakdown.tenureMonths} instalments`
                : "Adjust inputs to calculate EMI"}
            </span>
          </div>

          <div className="mortgage-calculator__summary-card">
            <h3>Repayment breakdown</h3>
            {breakdown && (
              <div className="service-calculator__pie-wrap">
                <div
                  className="service-calculator__pie"
                  style={{
                    background: `conic-gradient(#003b5c 0% ${principalShare}%, #0f6f69 ${principalShare}% 100%)`,
                  }}
                  role="img"
                  aria-label={`Principal ${principalShare.toFixed(0)} percent, interest ${interestShare.toFixed(0)} percent`}
                />
                <ul className="service-calculator__pie-legend">
                  <li>
                    <span className="service-calculator__pie-dot service-calculator__pie-dot--principal" />
                    Principal ({principalShare.toFixed(0)}%)
                  </li>
                  <li>
                    <span className="service-calculator__pie-dot service-calculator__pie-dot--interest" />
                    Interest ({interestShare.toFixed(0)}%)
                  </li>
                </ul>
              </div>
            )}
            <div>
              <span>Principal (P)</span>
              <strong>
                {breakdown ? formatIndianCurrency(breakdown.loanAmount) : "—"}
              </strong>
            </div>
            <div>
              <span>Total interest payable</span>
              <strong>
                {breakdown
                  ? formatIndianCurrency(Math.round(breakdown.totalInterest))
                  : "—"}
              </strong>
            </div>
            <hr />
            <div className="mortgage-calculator__total">
              <span>Total paid to bank</span>
              <strong>
                {breakdown
                  ? formatIndianCurrency(Math.round(breakdown.totalPayment))
                  : "—"}
              </strong>
            </div>
          </div>

          <div className="mortgage-calculator__summary-card">
            <h3>Eligibility estimate</h3>
            <div>
              <span>Max loan at {PLOT_LOAN_DEFAULTS.foirPercent}% FOIR</span>
              <strong>{formatIndianCurrency(Math.round(maxEligibleLoan))}</strong>
            </div>
            <p className="service-calculator__hint mb-0">
              Based on net salary {formatIndianCurrency(monthlySalary)} at{" "}
              {interestRate.toFixed(2)}% for {tenureYears} years. Banks also
              check CIBIL, layout approval, and property valuation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
