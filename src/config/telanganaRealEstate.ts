export type PropertyLocationType = "urban" | "rural";

export type StampDutyTransactionType =
  | "sale_urban"
  | "sale_rural"
  | "gift_family"
  | "gift_non_family"
  | "partition_family";

/** Telangana stamp duty & registration. Verify on IGRS before registration. */
export const TELANGANA_URBAN_SALE_RATES = {
  stampDuty: 0.04,
  transferDuty: 0.015,
  registrationFee: 0.005,
} as const;

export const TELANGANA_RURAL_SALE_RATES = {
  stampDuty: 0.055,
  registrationFee: 0.02,
} as const;

export const TELANGANA_GIFT_FAMILY_RATES = {
  stampDuty: 0.02,
  registrationFee: 0.005,
  registrationFeeMin: 2000,
  registrationFeeMax: 25000,
} as const;

export const TELANGANA_GIFT_NON_FAMILY_RATES = {
  stampDuty: 0.05,
  registrationFee: 0.005,
} as const;

export const TELANGANA_PARTITION_FAMILY_RATES = {
  stampDuty: 0.005,
  stampDutyCap: 100000,
  registrationFeeFixed: 2000,
} as const;

/** @deprecated Use transaction-type based calculation */
export const TELANGANA_URBAN_RATES = {
  stampDuty: TELANGANA_URBAN_SALE_RATES.stampDuty,
  transferDuty: TELANGANA_URBAN_SALE_RATES.transferDuty,
  registrationFee: TELANGANA_URBAN_SALE_RATES.registrationFee,
  registrationFeeMin: 0,
  registrationFeeMax: Number.POSITIVE_INFINITY,
} as const;

/** @deprecated Use transaction-type based calculation */
export const TELANGANA_RURAL_RATES = {
  stampDuty: TELANGANA_RURAL_SALE_RATES.stampDuty,
  registrationFee: TELANGANA_RURAL_SALE_RATES.registrationFee,
} as const;

export const PLOT_LOAN_DEFAULTS = {
  plotPrice: 60_00_000,
  downPaymentPercent: 25,
  interestRate: 8.75,
  tenureYears: 15,
  foirPercent: 50,
  monthlySalary: 1_00_000,
} as const;

export type StampDutyBreakdown = {
  stampDuty: number;
  transferDuty: number;
  registrationFee: number;
  total: number;
  effectiveRate: number;
  assessedValue: number;
  transactionType: StampDutyTransactionType;
};

export function getAssessedPropertyValue(
  agreedSalePrice: number,
  guidanceValue: number,
): number {
  const agreed = Number.isFinite(agreedSalePrice) ? agreedSalePrice : 0;
  const guidance = Number.isFinite(guidanceValue) ? guidanceValue : 0;
  return Math.max(agreed, guidance);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function calculateTelanganaStampDutyByTransaction(
  assessedValue: number,
  transactionType: StampDutyTransactionType,
): StampDutyBreakdown | null {
  if (!Number.isFinite(assessedValue) || assessedValue <= 0) return null;

  switch (transactionType) {
    case "sale_urban": {
      const stampDuty = assessedValue * TELANGANA_URBAN_SALE_RATES.stampDuty;
      const transferDuty =
        assessedValue * TELANGANA_URBAN_SALE_RATES.transferDuty;
      const registrationFee =
        assessedValue * TELANGANA_URBAN_SALE_RATES.registrationFee;
      const total = stampDuty + transferDuty + registrationFee;
      return {
        stampDuty,
        transferDuty,
        registrationFee,
        total,
        effectiveRate: total / assessedValue,
        assessedValue,
        transactionType,
      };
    }
    case "sale_rural": {
      const stampDuty = assessedValue * TELANGANA_RURAL_SALE_RATES.stampDuty;
      const registrationFee =
        assessedValue * TELANGANA_RURAL_SALE_RATES.registrationFee;
      const total = stampDuty + registrationFee;
      return {
        stampDuty,
        transferDuty: 0,
        registrationFee,
        total,
        effectiveRate: total / assessedValue,
        assessedValue,
        transactionType,
      };
    }
    case "gift_family": {
      const stampDuty = assessedValue * TELANGANA_GIFT_FAMILY_RATES.stampDuty;
      const registrationFee = clamp(
        assessedValue * TELANGANA_GIFT_FAMILY_RATES.registrationFee,
        TELANGANA_GIFT_FAMILY_RATES.registrationFeeMin,
        TELANGANA_GIFT_FAMILY_RATES.registrationFeeMax,
      );
      const total = stampDuty + registrationFee;
      return {
        stampDuty,
        transferDuty: 0,
        registrationFee,
        total,
        effectiveRate: total / assessedValue,
        assessedValue,
        transactionType,
      };
    }
    case "gift_non_family": {
      const stampDuty =
        assessedValue * TELANGANA_GIFT_NON_FAMILY_RATES.stampDuty;
      const registrationFee =
        assessedValue * TELANGANA_GIFT_NON_FAMILY_RATES.registrationFee;
      const total = stampDuty + registrationFee;
      return {
        stampDuty,
        transferDuty: 0,
        registrationFee,
        total,
        effectiveRate: total / assessedValue,
        assessedValue,
        transactionType,
      };
    }
    case "partition_family": {
      const stampDuty = Math.min(
        assessedValue * TELANGANA_PARTITION_FAMILY_RATES.stampDuty,
        TELANGANA_PARTITION_FAMILY_RATES.stampDutyCap,
      );
      const registrationFee =
        TELANGANA_PARTITION_FAMILY_RATES.registrationFeeFixed;
      const total = stampDuty + registrationFee;
      return {
        stampDuty,
        transferDuty: 0,
        registrationFee,
        total,
        effectiveRate: total / assessedValue,
        assessedValue,
        transactionType,
      };
    }
    default:
      return null;
  }
}

/** @deprecated Use calculateTelanganaStampDutyByTransaction */
export function calculateTelanganaStampDuty(
  propertyValue: number,
  location: PropertyLocationType,
): StampDutyBreakdown | null {
  return calculateTelanganaStampDutyByTransaction(
    propertyValue,
    location === "urban" ? "sale_urban" : "sale_rural",
  );
}

export type PlotLoanEmiBreakdown = {
  loanAmount: number;
  emi: number;
  totalInterest: number;
  totalPayment: number;
  tenureMonths: number;
};

export function calculatePlotLoanEmi(
  plotPrice: number,
  downPayment: number,
  annualInterestRate: number,
  tenureYears: number,
): PlotLoanEmiBreakdown | null {
  if (
    !Number.isFinite(plotPrice) ||
    plotPrice <= 0 ||
    !Number.isFinite(downPayment) ||
    downPayment < 0 ||
    downPayment >= plotPrice ||
    !Number.isFinite(annualInterestRate) ||
    annualInterestRate < 0 ||
    !Number.isFinite(tenureYears) ||
    tenureYears <= 0
  ) {
    return null;
  }

  const loanAmount = plotPrice - downPayment;
  const tenureMonths = Math.round(tenureYears * 12);
  const monthlyRate = annualInterestRate / 12 / 100;

  let emi: number;
  if (monthlyRate === 0) {
    emi = loanAmount / tenureMonths;
  } else {
    const factor = Math.pow(1 + monthlyRate, tenureMonths);
    emi = (loanAmount * monthlyRate * factor) / (factor - 1);
  }

  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - loanAmount;

  return {
    loanAmount,
    emi,
    totalInterest,
    totalPayment,
    tenureMonths,
  };
}

export function loanAmountFromDownPaymentPercent(
  plotPrice: number,
  downPaymentPercent: number,
): { loanAmount: number; downPayment: number } {
  if (!Number.isFinite(plotPrice) || plotPrice <= 0) {
    return { loanAmount: 0, downPayment: 0 };
  }
  const clampedDown = Math.min(Math.max(downPaymentPercent, 20), 80);
  const downPayment = (plotPrice * clampedDown) / 100;
  return {
    loanAmount: plotPrice - downPayment,
    downPayment,
  };
}

/** @deprecated Use loanAmountFromDownPaymentPercent */
export function loanAmountFromLtv(
  plotPrice: number,
  ltvPercent: number,
): number {
  if (!Number.isFinite(plotPrice) || plotPrice <= 0) return 0;
  const clampedLtv = Math.min(Math.max(ltvPercent, 0), 90);
  return (plotPrice * clampedLtv) / 100;
}

/**
 * Reverse reducing-balance EMI formula:
 * P = EMI × ((1+R)^N − 1) / (R × (1+R)^N)
 */
export function calculateMaxLoanFromEmi(
  maxEmi: number,
  annualInterestRate: number,
  tenureYears: number,
): number {
  if (!Number.isFinite(maxEmi) || maxEmi <= 0 || tenureYears <= 0) return 0;

  const tenureMonths = Math.round(tenureYears * 12);
  const monthlyRate = annualInterestRate / 12 / 100;

  if (monthlyRate === 0) return maxEmi * tenureMonths;

  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  return (maxEmi * (factor - 1)) / (monthlyRate * factor);
}

export function calculateMaxEligibleLoanFromSalary(
  monthlySalary: number,
  foirPercent: number,
  annualInterestRate: number,
  tenureYears: number,
  existingEmis = 0,
): number {
  if (!Number.isFinite(monthlySalary) || monthlySalary <= 0) return 0;
  const maxEmi = Math.max(
    0,
    (monthlySalary * foirPercent) / 100 - Math.max(existingEmis, 0),
  );
  return calculateMaxLoanFromEmi(maxEmi, annualInterestRate, tenureYears);
}
