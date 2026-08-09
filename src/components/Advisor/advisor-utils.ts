export type AdvisorAnswers = {
  intent: "rent" | "buy" | "";
  location: string;
  budgetRange: string;
  budgetAmount: string;
  bedrooms: string;
};

export type AdvisorContact = {
  name: string;
  phone: string;
  email: string;
};

export const ADVISOR_PROGRESS_KEY = "dekholand-guided-advisor-progress";
export const ADVISOR_RESULTS_KEY = "dekholand-guided-advisor-results";

export const getMatchReason = (answers: AdvisorAnswers): string => {
  const parts = [];
  if (answers.budgetAmount || answers.budgetRange) parts.push("budget");
  if (answers.location) parts.push("location");
  if (answers.bedrooms) parts.push("plot size needs");

  if (!parts.length) return "Recommended starter land listing for your search";
  return "Matches what you're looking for";
};
