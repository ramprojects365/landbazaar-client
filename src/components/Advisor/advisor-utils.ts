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

export const ADVISOR_PROGRESS_KEY = "propertyla-guided-advisor-progress";
export const ADVISOR_RESULTS_KEY = "propertyla-guided-advisor-results";

export const getMatchReason = (answers: AdvisorAnswers): string => {
  const parts = [];
  if (answers.budgetAmount || answers.budgetRange) parts.push("budget");
  if (answers.location) parts.push("location");
  if (answers.bedrooms) parts.push("bedroom needs");

  if (!parts.length) return "Recommended starter property for your search";
  //return `Matches your ${parts.join(", ")}`;
  return "Matches what you're looking for";
};
