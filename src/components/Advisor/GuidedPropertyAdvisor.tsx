"use client";

import { useEffect, useRef, useState } from "react";
import { ElementType } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  Check,
  Home,
  Loader2,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  Sparkles,
  WandSparkles,
  Wallet,
  X,
} from "lucide-react";
import {
  ADVISOR_PROGRESS_KEY,
  ADVISOR_RESULTS_KEY,
  AdvisorAnswers,
  AdvisorContact,
} from "./advisor-utils";
import { createOrLoginPropertyFitLead } from "@/services/propertyService";
import "./guided-property-advisor.scss";

type AdvisorStep = keyof AdvisorAnswers;
type AdvisorFlowStep = AdvisorStep | "contact";
type AdvisorSuggestion = {
  label: string;
  value: string;
  custom?: boolean;
};

const isAdvisorAnswerStep = (key: AdvisorFlowStep): key is AdvisorStep =>
  key !== "contact";

const initialAnswers: AdvisorAnswers = {
  intent: "",
  location: "",
  budgetRange: "",
  budgetAmount: "",
  bedrooms: "",
};

const initialContact: AdvisorContact = {
  name: `Property seeker ${Math.floor(1000 + Math.random() * 9000)}`,
  phone: "",
  email: "",
};

const steps: Array<{
  key: AdvisorFlowStep;
  eyebrow: string;
  question: string;
  helper: string;
  icon: ElementType;
}> = [
  {
    key: "intent",
    eyebrow: "Start",
    question: "What are you looking for?",
    helper: "",
    icon: Home,
  },
  {
    key: "location",
    eyebrow: "Area",
    question: "Where should we look?",
    helper: "",
    icon: MapPin,
  },
  {
    key: "budgetAmount",
    eyebrow: "Budget",
    question: "Max price?",
    helper: "",
    icon: Wallet,
  },
  {
    key: "bedrooms",
    eyebrow: "Rooms",
    question: "How many rooms?",
    helper: "",
    icon: BedDouble,
  },
  {
    key: "contact",
    eyebrow: "Contact",
    question: "Share contact details?",
    helper: "",
    icon: Phone,
  },
];

const options: Partial<Record<AdvisorStep, string[]>> = {
  intent: ["Buy", "Rent"],
};

const answerLabels: Record<AdvisorStep, string> = {
  intent: "Goal",
  location: "Location",
  budgetRange: "Budget",
  budgetAmount: "Max price",
  bedrooms: "Bedrooms",
};

const inputConfig: Partial<
  Record<
    AdvisorStep,
    {
      type: string;
      placeholder: string;
      prefix?: string;
      min?: string;
    }
  >
> = {
  location: {
    type: "text",
    placeholder: "Example: Kuala Lumpur, Cheras, Puchong",
  },
  budgetAmount: {
    type: "number",
    placeholder: "Example: 2500 or 650000",
    prefix: "RM",
    min: "0",
  },
  bedrooms: {
    type: "number",
    placeholder: "Example: 3",
    min: "0",
  },
};

const locationSuggestions: AdvisorSuggestion[] = [
  { label: "Kuala Lumpur", value: "Kuala Lumpur" },
  { label: "Selangor", value: "Selangor" },
  { label: "Other", value: "", custom: true },
];

const rentBudgetSuggestions: AdvisorSuggestion[] = [
  { label: "RM 1.5k", value: "1500" },
  { label: "RM 2.5k", value: "2500" },
  { label: "RM 3.5k", value: "3500" },
  { label: "RM 5k", value: "5000" },
  { label: "Other", value: "", custom: true },
];

const buyBudgetSuggestions: AdvisorSuggestion[] = [
  { label: "RM 500k", value: "500000" },
  { label: "RM 800k", value: "800000" },
  { label: "RM 1.2M", value: "1200000" },
  { label: "RM 2M", value: "2000000" },
  { label: "Other", value: "", custom: true },
];

const bedroomSuggestions: AdvisorSuggestion[] = [
  { label: "Studio", value: "0" },
  { label: "1 room", value: "1" },
  { label: "2 rooms", value: "2" },
  { label: "3 rooms", value: "3" },
  // { label: "4+ rooms", value: "4" },
  { label: "Other", value: "", custom: true },
];

const getInputSuggestions = (
  key: AdvisorStep,
  intent: AdvisorAnswers["intent"],
): AdvisorSuggestion[] => {
  if (key === "location") return locationSuggestions;
  if (key === "bedrooms") return bedroomSuggestions;
  if (key === "budgetAmount") {
    return intent === "rent" ? rentBudgetSuggestions : buyBudgetSuggestions;
  }

  return [];
};

const formatSummaryValue = (key: AdvisorStep, value: string): string => {
  if (!value) return "Not selected yet";
  if (key === "intent") return value.charAt(0).toUpperCase() + value.slice(1);
  if (key === "bedrooms" && value === "0") return "Studio";
  return value;
};

interface GuidedPropertyAdvisorProps {
  popupMode?: boolean;
  onCancel?: () => void;
}

export default function GuidedPropertyAdvisor({
  popupMode = false,
  onCancel,
}: GuidedPropertyAdvisorProps) {
  const router = useRouter();
  const [answers, setAnswers] = useState<AdvisorAnswers>(initialAnswers);
  const [contact, setContact] = useState<AdvisorContact>(initialContact);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [leadLoading, setLeadLoading] = useState(false);
  const [leadMessage, setLeadMessage] = useState("");
  const [defaultPassword, setDefaultPassword] = useState("");
  const [showReminder, setShowReminder] = useState(false);
  const customInputRef = useRef<HTMLInputElement>(null);

  const step = steps[currentStep];
  const progress = Math.round(((currentStep + 1) / steps.length) * 100);
  const completedCount = Object.values(answers).filter(Boolean).length;
  const contactCompleted = Boolean(contact.phone || contact.email);
  const flowCompletedCount = completedCount + (contactCompleted ? 1 : 0);
  const requiredAnswerCount = steps.filter((item) =>
    isAdvisorAnswerStep(item.key),
  ).length;
  const canFindMatches = completedCount >= requiredAnswerCount;
  const autoRegisterReady = Boolean(contact.email);
  const answerStep = isAdvisorAnswerStep(step.key) ? step.key : null;
  const currentInput = answerStep ? inputConfig[answerStep] : undefined;
  const inputSuggestions = answerStep
    ? getInputSuggestions(answerStep, answers.intent)
    : [];
  const canContinue =
    step.key === "contact" ? true : Boolean(answerStep && answers[answerStep]);
  const isLastStep = currentStep === steps.length - 1;
  const StepIcon = step.icon;

  useEffect(() => {
    const saved = window.localStorage.getItem(ADVISOR_PROGRESS_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as {
        answers?: AdvisorAnswers;
        contact?: AdvisorContact;
        currentStep?: number;
      };

      if (parsed.answers) setAnswers(parsed.answers);
      if (parsed.contact) setContact(parsed.contact);
      if (typeof parsed.currentStep === "number") {
        setCurrentStep(Math.min(parsed.currentStep, steps.length - 1));
      }
      setShowReminder(true);
    } catch {
      window.localStorage.removeItem(ADVISOR_PROGRESS_KEY);
    }
  }, []);

  useEffect(() => {
    const hasProgress =
      Object.values(answers).some(Boolean) ||
      Object.values(contact).some(Boolean) ||
      currentStep > 0;

    if (!hasProgress || loading) return;

    window.localStorage.setItem(
      ADVISOR_PROGRESS_KEY,
      JSON.stringify({ answers, contact, currentStep }),
    );
  }, [answers, contact, currentStep, loading]);

  const selectAnswer = (key: AdvisorStep, value: string) => {
    setAnswers((current) => ({
      ...current,
      [key]: key === "intent" ? value.toLowerCase() : value,
    }));
  };

  const moveNextSoon = () => {
    window.setTimeout(() => {
      setCurrentStep((index) => Math.min(index + 1, steps.length - 1));
    }, 180);
  };

  const selectAnswerAndContinue = (key: AdvisorStep, value: string) => {
    selectAnswer(key, value);
    if (currentStep < steps.length - 1) {
      moveNextSoon();
    }
  };

  const saveAuthFromResponse = (response: any) => {
    const auth = response?.data?.auth || response?.auth;
    const user = auth?.user;
    const token = auth?.token;

    if (!token || !user) return false;

    localStorage.setItem("authToken", token);
    localStorage.setItem("loginUser", user.username || user.email || "");
    localStorage.setItem(
      "loginUserDisplayName",
      user.fullName || user.username || user.email || "",
    );
    window.dispatchEvent(new Event("propertyla-auth-changed"));
    return true;
  };

  const createLeadLogin = async () => {
    if (!autoRegisterReady) return { ok: true, password: "" };

    setLeadLoading(true);
    setLeadMessage("");
    setDefaultPassword("");

    try {
      const response = await createOrLoginPropertyFitLead(contact);
      const loggedIn = saveAuthFromResponse(response);
      const password =
        response?.data?.defaultPassword || response?.defaultPassword || "";
      const existingEmailIgnored =
        response?.data?.existingEmailIgnored || response?.existingEmailIgnored;
      if (password) setDefaultPassword(password);
      setLeadMessage(
        existingEmailIgnored
          ? "Welcome back. We sent a sign-in reminder to your email."
          : loggedIn
            ? "Saved. We emailed this password so you can sign in later."
            : "Saved. We will continue without asking you to register.",
      );
      return { ok: true, password };
    } catch (error: any) {
      const status = error?.response?.status;
      const serverMessage = error?.response?.data?.message;
      const endpointMissing = status === 404;
      const networkError = !error?.response;

      setLeadMessage(
        serverMessage ||
          (endpointMissing
            ? "Auto-login backend route is not available yet. Please restart the backend with the latest build."
            : networkError
              ? "Auto-login backend is not reachable. Please make sure the backend is running."
              : "We could not auto-login right now. Please try again."),
      );
      return { ok: false, password: "" };
    } finally {
      setLeadLoading(false);
    }
  };

  const handleNext = async () => {
    if (!canContinue) return;

    if (step.key === "contact") {
      const leadReady = await createLeadLogin();
      if (!leadReady.ok) return;
    }

    setCurrentStep((index) => Math.min(index + 1, steps.length - 1));
  };

  const handleFindMatches = async () => {
    let createdPassword = defaultPassword;
    if (autoRegisterReady && !localStorage.getItem("authToken")) {
      const leadReady = await createLeadLogin();
      if (!leadReady.ok) return;
      createdPassword = leadReady.password || createdPassword;
    }

    setLoading(true);
    window.localStorage.removeItem(ADVISOR_PROGRESS_KEY);
    setShowReminder(false);

    window.setTimeout(() => {
      window.localStorage.setItem(
        ADVISOR_RESULTS_KEY,
        JSON.stringify({
          answers,
          contact: {
            ...contact,
            name: contact.name || initialContact.name,
          },
          autoRegisterReady,
          defaultPassword: createdPassword,
          createdAt: new Date().toISOString(),
        }),
      );
      router.push("/property-fit");
    }, 650);
  };

  return (
    <main
      className={`guided-advisor ${popupMode ? "guided-advisor--popup" : ""}`}
    >
      {popupMode && onCancel && (
        <button
          type="button"
          className="guided-advisor__cancel"
          onClick={onCancel}
          aria-label="Cancel advisor"
        >
          <X size={18} />
          Cancel
        </button>
      )}

      <section className="guided-advisor__intro">
        <span className="guided-advisor__badge">
          <Sparkles size={14} />
          {popupMode ? "Property helper" : "Guided Property Advisor"}
        </span>
        <h1>
          {popupMode
            ? "Find a better match."
            : "Let PropertyLa guide you to a better-fit home."}
        </h1>
        {!popupMode && (
          <>
            <p>
              A warmer, step-by-step experience that feels like a property
              concierge, not another basic search form.
            </p>
            <div className="guided-advisor__ai-strip">
              <span>
                <WandSparkles size={16} /> Smart brief
              </span>
              <span>
                <WandSparkles size={16} /> Match reasons
              </span>
              <span>
                <MessageCircle size={16} /> Agent fallback
              </span>
            </div>
          </>
        )}
      </section>

      <section className="guided-advisor__app">
        <div className="guided-advisor__progress">
          <div>
            <strong>{progress}%</strong>
            <span>
              {completedCount}/{requiredAnswerCount} done
            </span>
          </div>
          <i>
            <b style={{ width: `${progress}%` }} />
          </i>
        </div>

        <div className="guided-advisor__question">
          {!popupMode && (
            <div className="guided-advisor__assistant-bubble">
              <p>
                {currentStep === 0 &&
                  "Start with the basics. We will narrow it down step by step."}
                {currentStep === 1 &&
                  "Choose a common area or type another location."}
                {currentStep === 2 &&
                  "Use the closest price, or type your own."}
                {step.key === "contact" &&
                  "This is optional. It only helps us connect you with a suitable agent."}
                {step.key === "bedrooms" &&
                  "One more answer, then we can show matches."}
              </p>
            </div>
          )}

          <div className="guided-advisor__question-head">
            <span>
              <StepIcon size={18} />
            </span>
            <div>
              <p>{step.eyebrow}</p>
              <h2>{step.question}</h2>
              {step.helper && <small>{step.helper}</small>}
            </div>
          </div>

          {!answerStep ? (
            <div className="guided-advisor__contact-form">
              <label>
                Phone
                <input
                  type="tel"
                  value={contact.phone}
                  onChange={(event) =>
                    setContact((current) => ({
                      ...current,
                      phone: event.target.value,
                    }))
                  }
                  placeholder="+60"
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  value={contact.email}
                  onChange={(event) =>
                    setContact((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  placeholder="you@example.com"
                />
              </label>
              <p>This will help you find better matches.</p>
              {defaultPassword && (
                <p className="guided-advisor__password-note">
                  Your sign-in password: <strong>{defaultPassword}</strong>
                </p>
              )}
              {leadMessage && (
                <p className="guided-advisor__lead-message">{leadMessage}</p>
              )}
            </div>
          ) : currentInput ? (
            <div className="guided-advisor__typed-answer">
              <label>
                {answerLabels[answerStep]}
                <div className="guided-advisor__typed-row guided-advisor__typed-row--options-only">
                  <div className="guided-advisor__input-options">
                    {inputSuggestions.map((suggestion) =>
                      suggestion.custom ? (
                        <div
                          key={`${suggestion.label}-${suggestion.value || "custom"}`}
                          className="guided-advisor__other-option"
                        >
                          {currentInput.prefix &&
                            answerStep === "budgetAmount" && (
                              <span>{currentInput.prefix}</span>
                            )}
                          <input
                            ref={customInputRef}
                            type={currentInput.type}
                            min={currentInput.min}
                            value={answers[answerStep]}
                            onChange={(event) =>
                              selectAnswer(answerStep, event.target.value)
                            }
                            onKeyDown={(event) => {
                              if (
                                event.key === "Enter" &&
                                answers[answerStep]
                              ) {
                                event.preventDefault();
                                void handleNext();
                              }
                            }}
                            placeholder="Other"
                          />
                        </div>
                      ) : (
                        <button
                          type="button"
                          key={`${suggestion.label}-${suggestion.value}`}
                          className={
                            answers[answerStep] === suggestion.value
                              ? "is-selected"
                              : ""
                          }
                          onClick={() =>
                            selectAnswerAndContinue(
                              answerStep,
                              suggestion.value,
                            )
                          }
                        >
                          {suggestion.label}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              </label>
            </div>
          ) : (
            <div className="guided-advisor__options">
              {(options[answerStep] || []).map((option) => (
                <button
                  key={option}
                  type="button"
                  className={
                    answers[answerStep] === option.toLowerCase()
                      ? "is-selected"
                      : ""
                  }
                  onClick={() => selectAnswerAndContinue(answerStep, option)}
                >
                  <span>{option}</span>
                  {answers[answerStep] === option.toLowerCase() && (
                    <Check size={18} />
                  )}
                </button>
              ))}
            </div>
          )}

          <div className="guided-advisor__nav">
            <button
              type="button"
              onClick={() => setCurrentStep((index) => Math.max(index - 1, 0))}
              disabled={currentStep === 0}
            >
              <ArrowLeft size={16} />
              Back
            </button>
            {!isLastStep ? (
              <button
                type="button"
                className="primary"
                onClick={handleNext}
                disabled={!canContinue || leadLoading}
              >
                {leadLoading ? "Saving..." : "Next"}
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                className="primary"
                onClick={handleFindMatches}
                disabled={!canFindMatches || loading}
              >
                {loading ? (
                  <Loader2 className="guided-advisor__spin" size={16} />
                ) : (
                  <Search size={16} />
                )}
                Results
              </button>
            )}
          </div>
        </div>

        <aside className="guided-advisor__summary">
          <div className="guided-advisor__score-ring">
            <span>
              {flowCompletedCount}/{steps.length}
            </span>
            <small>Brief strength</small>
          </div>
          <h3>Your search brief</h3>
          {steps.map((item) => (
            <div
              key={item.key}
              className={
                isAdvisorAnswerStep(item.key)
                  ? answers[item.key]
                    ? "is-filled"
                    : ""
                  : contactCompleted
                    ? "is-filled"
                    : ""
              }
            >
              <span>
                {isAdvisorAnswerStep(item.key)
                  ? answerLabels[item.key]
                  : "Contact"}
              </span>
              <strong>
                {isAdvisorAnswerStep(item.key)
                  ? formatSummaryValue(item.key, answers[item.key])
                  : autoRegisterReady
                    ? "Can save for later"
                    : contactCompleted
                      ? contact.phone || contact.email
                      : "Skipped"}
              </strong>
            </div>
          ))}
        </aside>
      </section>

      {showReminder && !loading && !popupMode && (
        <button
          type="button"
          className="guided-advisor__resume"
          onClick={() => setShowReminder(false)}
        >
          <MessageCircle size={17} />
          Continue your property advisor
        </button>
      )}

      {loading && (
        <div
          className="guided-advisor__modal"
          role="dialog"
          aria-modal="true"
          aria-label="Preparing property fit results"
        >
          <div className="guided-advisor__modal-backdrop" />
          <div className="guided-advisor__modal-panel">
            <div className="guided-advisor__modal-loading">
              <div className="guided-advisor__modal-visual">
                <div className="guided-advisor__modal-orbit">
                  <WandSparkles size={34} />
                </div>
                <div className="guided-advisor__modal-card guided-advisor__modal-card--one">
                  <Home size={15} />
                  Reading brief
                </div>
                <div className="guided-advisor__modal-card guided-advisor__modal-card--two">
                  <MapPin size={15} />
                  Checking projects
                </div>
              </div>
              <span>AI match check</span>
              <h2>Finding your best match</h2>
              <p>
                Scanning your location, budget, and rooms against live
                PropertyLa projects.
              </p>
              <div className="guided-advisor__modal-steps">
                <span>Brief understood</span>
                <span>Database scan</span>
                <span>Results next</span>
              </div>
              <div className="guided-advisor__thinking">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
