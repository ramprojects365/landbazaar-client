"use client";

import { formatPrice } from "@/components/Utils/formatPrice";
import {
  Banknote,
  Building2,
  Calculator,
  CheckCircle2,
  FileText,
  ShieldCheck,
} from "lucide-react";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";

type ProjectType = "new" | "subsale";
type InsuranceType = "mrta" | "mlta";

function computeMonthlyInstallment(
  principal: number,
  annualRatePercent: number,
  tenureYears: number,
): { monthly: number; total: number; months: number } {
  const months = Math.max(1, Math.round(tenureYears * 12));
  if (principal <= 0) return { monthly: 0, total: 0, months };

  const r = annualRatePercent / 100 / 12;
  if (r <= 0) {
    const monthly = principal / months;
    return { monthly, total: monthly * months, months };
  }

  const pow = (1 + r) ** months;
  const monthly = (principal * r * pow) / (pow - 1);
  return { monthly, total: monthly * months, months };
}

function calculateMotStampDuty(price: number): number {
  const first = Math.min(price, 100_000) * 0.01;
  const second = Math.min(Math.max(price - 100_000, 0), 400_000) * 0.02;
  const third = Math.min(Math.max(price - 500_000, 0), 500_000) * 0.03;
  const fourth = Math.max(price - 1_000_000, 0) * 0.04;
  return first + second + third + fourth;
}

function calculateLegalFees(amount: number): number {
  const first = Math.min(amount, 500_000) * 0.01;
  const second = Math.min(Math.max(amount - 500_000, 0), 500_000) * 0.008;
  const third = Math.min(Math.max(amount - 1_000_000, 0), 2_000_000) * 0.007;
  const fourth = Math.max(amount - 3_000_000, 0) * 0.006;
  return first + second + third + fourth;
}

const percent = (value: number, min: number, max: number) =>
  `${((value - min) / (max - min)) * 100}%`;

export default function HomeLoanCalculator({
  variant = "page",
}: {
  variant?: "page" | "home";
}) {
  const [projectType, setProjectType] = useState<ProjectType>("new");
  const [propertyPrice, setPropertyPrice] = useState(500_000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(10);
  const [interestRate, setInterestRate] = useState(4.5);
  const [tenureYears, setTenureYears] = useState(30);
  const [freeMot, setFreeMot] = useState(false);
  const [freeSpaLegal, setFreeSpaLegal] = useState(false);
  const [freeLoanLegal, setFreeLoanLegal] = useState(false);
  const [includeInsurance, setIncludeInsurance] = useState(true);
  const [insuranceType, setInsuranceType] = useState<InsuranceType>("mrta");
  const [addInsuranceToLoan, setAddInsuranceToLoan] = useState(false);

  const result = useMemo(() => {
    const downPayment = propertyPrice * (downPaymentPercent / 100);
    const baseLoanAmount = Math.max(0, propertyPrice - downPayment);
    const insuranceRate = insuranceType === "mrta" ? 0.03 : 0.05;
    const insuranceCost = includeInsurance ? baseLoanAmount * insuranceRate : 0;
    const financedInsurance = addInsuranceToLoan ? insuranceCost : 0;
    const loanAmount = baseLoanAmount + financedInsurance;
    const installment = computeMonthlyInstallment(
      loanAmount,
      interestRate,
      tenureYears,
    );
    const motStampDuty =
      projectType === "new" && freeMot ? 0 : calculateMotStampDuty(propertyPrice);
    const spaLegalFees =
      projectType === "new" && freeSpaLegal ? 0 : calculateLegalFees(propertyPrice);
    const loanStampDuty = baseLoanAmount * 0.005;
    const loanLegalFees =
      projectType === "new" && freeLoanLegal ? 0 : calculateLegalFees(baseLoanAmount);
    const upfrontInsurance = addInsuranceToLoan ? 0 : insuranceCost;
    const totalUpfront =
      downPayment +
      motStampDuty +
      spaLegalFees +
      loanStampDuty +
      loanLegalFees +
      upfrontInsurance;
    const totalInterest = Math.max(0, installment.total - loanAmount);
    const effectiveInterestCost =
      loanAmount > 0 ? (totalInterest / loanAmount) * 100 : 0;
    const ltv = propertyPrice > 0 ? (baseLoanAmount / propertyPrice) * 100 : 0;

    return {
      baseLoanAmount,
      downPayment,
      effectiveInterestCost,
      insuranceCost,
      loanAmount,
      loanLegalFees,
      loanStampDuty,
      ltv,
      monthly: installment.monthly,
      motStampDuty,
      spaLegalFees,
      totalAmountPaid: installment.total,
      totalInterest,
      totalUpfront,
    };
  }, [
    addInsuranceToLoan,
    downPaymentPercent,
    freeLoanLegal,
    freeMot,
    freeSpaLegal,
    includeInsurance,
    insuranceType,
    interestRate,
    projectType,
    propertyPrice,
    tenureYears,
  ]);

  const renderSlider = ({
    label,
    value,
    displayValue,
    min,
    max,
    step,
    onChange,
  }: {
    label: string;
    value: number;
    displayValue: string;
    min: number;
    max: number;
    step: number;
    onChange: (value: number) => void;
  }) => (
    <div className="mortgage-calculator__control">
      <div className="mortgage-calculator__control-head">
        <p>{label}</p>
        <strong>{displayValue}</strong>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{ "--progress": percent(value, min, max) } as CSSProperties}
      />
    </div>
  );

  const renderSwitch = ({
    checked,
    label,
    onChange,
  }: {
    checked: boolean;
    label: string;
    onChange: () => void;
  }) => (
    <button
      type="button"
      className={`mortgage-calculator__switch ${checked ? "is-on" : ""}`}
      aria-pressed={checked}
      onClick={onChange}
    >
      <span aria-hidden="true" />
      {label}
    </button>
  );

  return (
    <main className={`home-loan-page ${variant === "home" ? "home-loan-page--home" : ""}`}>
      {variant === "page" && (
        <section className="home-loan-page__hero">
          <div className="container">
            <div className="home-loan-page__hero-grid">
              <div className="home-loan-page__hero-copy">
                <span>
                  <Banknote size={17} />
                  Home loan planning
                </span>
                <h1>Estimate your Malaysia mortgage before you buy.</h1>
                <p>
                  Check monthly repayments, upfront costs, stamp duty, legal fees,
                  and mortgage insurance in one simple Property La calculator.
                </p>
              </div>
              <div className="home-loan-page__hero-note">
                <CheckCircle2 size={22} />
                <div>
                  <strong>Buyer-friendly estimate</strong>
                  <p>
                    Use this as a planning guide before speaking with a bank or
                    property consultant.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="mortgage-calculator" id="mortgage-calculator">
        <div className="container">
          <div className="mortgage-calculator__heading">
            {variant === "home" && (
              <span>
                <Banknote size={17} />
                Home loan planning
              </span>
            )}
            <h2>
              {variant === "home"
                ? "Estimate your monthly loan."
                : "Mortgage calculator"}
            </h2>
            <p>
              {variant === "home"
                ? "Plan repayments and upfront costs before you enquire."
                : "Estimate your monthly payments and upfront costs"}
            </p>
          </div>

          <div className="mortgage-calculator__shell">
            <div className="mortgage-calculator__inputs">
              <div className="mortgage-calculator__tabs" role="group">
                <button
                  type="button"
                  className={projectType === "new" ? "is-active" : ""}
                  aria-pressed={projectType === "new"}
                  onClick={() => setProjectType("new")}
                >
                  New Project
                </button>
                <button
                  type="button"
                  className={projectType === "subsale" ? "is-active" : ""}
                  aria-pressed={projectType === "subsale"}
                  onClick={() => setProjectType("subsale")}
                >
                  Subsale
                </button>
              </div>

              {renderSlider({
                label: "Property price",
                value: propertyPrice,
                displayValue: formatPrice(propertyPrice, false),
                min: 100_000,
                max: 10_000_000,
                step: 50_000,
                onChange: setPropertyPrice,
              })}

              {renderSlider({
                label: "Down payment",
                value: downPaymentPercent,
                displayValue: `${downPaymentPercent}% (${formatPrice(
                  result.downPayment,
                  false,
                )})`,
                min: 0,
                max: 100,
                step: 1,
                onChange: setDownPaymentPercent,
              })}

              {renderSlider({
                label: "Interest rate",
                value: interestRate,
                displayValue: `${interestRate.toFixed(1)}%`,
                min: 1,
                max: 10,
                step: 0.1,
                onChange: setInterestRate,
              })}

              {renderSlider({
                label: "Loan tenure",
                value: tenureYears,
                displayValue: `${tenureYears} years`,
                min: 5,
                max: 35,
                step: 1,
                onChange: setTenureYears,
              })}

              {projectType === "new" && (
                <div className="mortgage-calculator__option-group">
                  <p>Developer incentives</p>
                  {renderSwitch({
                    checked: freeMot,
                    label: "Free stamp duty (MOT)",
                    onChange: () => setFreeMot((value) => !value),
                  })}
                  {renderSwitch({
                    checked: freeSpaLegal,
                    label: "Free SPA legal fees",
                    onChange: () => setFreeSpaLegal((value) => !value),
                  })}
                  {renderSwitch({
                    checked: freeLoanLegal,
                    label: "Free loan legal fees",
                    onChange: () => setFreeLoanLegal((value) => !value),
                  })}
                </div>
              )}

              <div className="mortgage-calculator__option-group">
                {renderSwitch({
                  checked: includeInsurance,
                  label: "Include mortgage insurance",
                  onChange: () => setIncludeInsurance((value) => !value),
                })}

                {includeInsurance && (
                  <>
                    <div className="mortgage-calculator__tabs mortgage-calculator__tabs--small">
                      <button
                        type="button"
                        className={insuranceType === "mrta" ? "is-active" : ""}
                        onClick={() => setInsuranceType("mrta")}
                      >
                        MRTA (est. 3%)
                      </button>
                      <button
                        type="button"
                        className={insuranceType === "mlta" ? "is-active" : ""}
                        onClick={() => setInsuranceType("mlta")}
                      >
                        MLTA (est. 5%)
                      </button>
                    </div>
                    {renderSwitch({
                      checked: addInsuranceToLoan,
                      label: `Add ${insuranceType.toUpperCase()} to loan amount`,
                      onChange: () => setAddInsuranceToLoan((value) => !value),
                    })}
                  </>
                )}
              </div>
            </div>

            <aside className="mortgage-calculator__summary">
              <div className="mortgage-calculator__payment">
                <p>Estimated monthly payment</p>
                <strong>{formatPrice(result.monthly, false)}</strong>
                <span>
                  Loan: {formatPrice(result.loanAmount, false)} . LTV:{" "}
                  {result.ltv.toFixed(0)}%
                </span>
              </div>

              <div className="mortgage-calculator__summary-card">
                <h3>Loan summary</h3>
                <div>
                  <span>Total interest paid</span>
                  <strong>{formatPrice(result.totalInterest, false)}</strong>
                </div>
                <div>
                  <span>Total amount paid</span>
                  <strong>{formatPrice(result.totalAmountPaid, false)}</strong>
                </div>
                <hr />
                <div>
                  <span>Effective interest cost</span>
                  <strong>{result.effectiveInterestCost.toFixed(1)}%</strong>
                </div>
              </div>

              <div className="mortgage-calculator__summary-card">
                <h3>Upfront costs</h3>
                <div>
                  <span>Down payment</span>
                  <strong>{formatPrice(result.downPayment, false)}</strong>
                </div>
                <hr />
                <div>
                  <span>Stamp duty (MOT)</span>
                  <strong>{formatPrice(result.motStampDuty, false)}</strong>
                </div>
                <div>
                  <span>SPA legal fees</span>
                  <strong>{formatPrice(result.spaLegalFees, false)}</strong>
                </div>
                <div>
                  <span>Loan stamp duty</span>
                  <strong>{formatPrice(result.loanStampDuty, false)}</strong>
                </div>
                <div>
                  <span>Loan legal fees</span>
                  <strong>{formatPrice(result.loanLegalFees, false)}</strong>
                </div>
                {includeInsurance && (
                  <div>
                    <span>{insuranceType.toUpperCase()} insurance (est.)</span>
                    <strong>
                      {addInsuranceToLoan
                        ? "Financed"
                        : formatPrice(result.insuranceCost, false)}
                    </strong>
                  </div>
                )}
                <hr />
                <div className="mortgage-calculator__total">
                  <span>Total upfront</span>
                  <strong>{formatPrice(result.totalUpfront, false)}</strong>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {variant === "page" && (
        <section className="home-loan-page__guide">
          <div className="container">
            <div className="home-loan-page__guide-grid">
              <article>
                <Calculator size={22} />
                <h3>How to use it</h3>
                <p>
                  Adjust the property price, down payment, interest rate, and
                  tenure. The estimate updates immediately so you can compare
                  different budgets before you enquire.
                </p>
              </article>
              <article>
                <FileText size={22} />
                <h3>What costs are included</h3>
                <p>
                  The calculator estimates down payment, MOT stamp duty, SPA legal
                  fees, loan stamp duty, loan legal fees, and optional MRTA or
                  MLTA insurance.
                </p>
              </article>
              <article>
                <Building2 size={22} />
                <h3>New project vs subsale</h3>
                <p>
                  New projects may include developer incentives such as free legal
                  fees or stamp duty. Subsale purchases usually require buyers to
                  budget for more upfront costs.
                </p>
              </article>
              <article>
                <ShieldCheck size={22} />
                <h3>Before applying</h3>
                <p>
                  Final approval depends on bank checks, income, debt service
                  ratio, credit record, property value, and current lending
                  policies.
                </p>
              </article>
            </div>
            <p className="home-loan-page__disclaimer">
              This calculator is for illustration only. Actual rates, legal fees,
              insurance, stamp duty, and bank offers may differ. Confirm all
              figures with your bank, lawyer, or licensed adviser before making a
              purchase decision.
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
