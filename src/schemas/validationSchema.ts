import * as yup from "yup";
import { PHONE_DIGITS_PATTERN, PHONE_VALIDATION_MESSAGE } from "@/utils/phoneInput";
import {
  DESCRIPTION_MAX_CHARS,
  DESCRIPTION_MIN_CHARS,
  stripDescriptionHtml,
} from "@/utils/descriptionHtml";

const strictEmail = (requiredMessage = "Enter email") =>
  yup
    .string()
    .trim()
    .required(requiredMessage)
    .email("Invalid email format")
    .matches(
      /^[^\s@]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
      "Enter a valid email address",
    );

const strictPhone = (requiredMessage = "Phone number is required") =>
  yup
    .string()
    .trim()
    .required(requiredMessage)
    .matches(PHONE_DIGITS_PATTERN, PHONE_VALIDATION_MESSAGE);

const personName = (requiredMessage = "Name is required") =>
  yup
    .string()
    .trim()
    .required(requiredMessage)
    .max(60, "Name must be 60 characters or less")
    .matches(/^(?![0-9])(?=.*[A-Za-z])[A-Za-z\s.'-]+$/, "Enter a valid name");

const meaningfulText = (
  field: string,
  requiredMessage = `${field} is required`,
  max = 1000,
) =>
  yup
    .string()
    .trim()
    .required(requiredMessage)
    .max(max, `${field} must be ${max} characters or less`)
    .matches(/[A-Za-z]/, `${field} must include letters`)
    .matches(/[A-Za-z0-9]/, `${field} cannot be only special characters`);

  const PASSWORD_ALNUM_6 = /^[A-Za-z0-9]{6,}$/;

//Sign Up form validation schema
export const signUpSchema = yup.object().shape({
  displayname: personName("Enter display name"),
  email: strictEmail(),
  phone: strictPhone(),
  password: yup
    .string()
    .required("Enter password")
    .matches(
      PASSWORD_ALNUM_6,
      "Password must be at least 6 characters and alphanumeric only",
    ),
  confirmPassword: yup
    .string()
    .required("Please same password again")
    .oneOf([yup.ref("password")], "Passwords do not match"),
  remember: yup.boolean(),
});
//Sign in form validation schema
export const signInSchema = yup.object().shape({
  email: yup.string().required("Enter email"),
  password: yup
    .string()
    .required("Enter password")
    .matches(
      PASSWORD_ALNUM_6,
      "Password must be at least 6 characters and alphanumeric only",
    ),
});

//Forgot form validation schema
export const forgotSchema = yup.object().shape({
  email: strictEmail(),
});

export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Enter password")
    .matches(
      PASSWORD_ALNUM_6,
      "Password must be at least 6 characters and alphanumeric only",
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

//Verify form validation schema
export const verifySchema = yup.object().shape({
  emailOtp: yup.string().required("Enter email OTP"),
});

//Add listing basic form validation schema
export const basicSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  price: yup
    .string()
    .required("Price is required")
    .matches(/^[0-9]+$/, "Only numbers are allowed")
    .test(
      "not-zero",
      "Price must be greater than 0",
      (value) => Number(value) > 0,
    ),
});

const digitsOnlyPositive = (requiredMessage: string, greaterThanMessage: string) =>
  yup
    .string()
    .required(requiredMessage)
    .matches(/^[0-9]+$/, "Only numbers are allowed")
    .test(
      "not-zero",
      greaterThanMessage,
      (value) => Number(value) > 0,
    );

const optionalDigits = yup
  .string()
  .optional()
  .test(
    "only-numbers",
    "Only numbers are allowed",
    (value) => !value || /^[0-9]+$/.test(value),
  );

export const propertySchema = yup.object({
  listingType: yup
    .string()
    .oneOf(["sale", "lease"], "Listing type must be Sale or Lease")
    .required("Listing type is required"),
  propertyName: yup.string().optional(),
  propertyType: yup.string().required("Property type is required"),
  tenure: yup.string().optional(),
  areaUnit: yup.string().required("Area unit is required"),
  pricePerUnit: yup.string().when("listingType", {
    is: "sale",
    then: () =>
      digitsOnlyPositive(
        "Price per unit is required",
        "Price per unit must be greater than 0",
      ),
    otherwise: () => optionalDigits,
  }),
  totalPrice: yup.string().when("listingType", {
    is: "sale",
    then: () =>
      digitsOnlyPositive(
        "Total price is required",
        "Total price must be greater than 0",
      ),
    otherwise: () => optionalDigits,
  }),
  title: yup.string().required("Title is required"),
  description: yup
    .string()
    .required("Description is required")
    .test(
      "description-min",
      `Description must be at least ${DESCRIPTION_MIN_CHARS} characters`,
      (value) => stripDescriptionHtml(value || "").length >= DESCRIPTION_MIN_CHARS,
    )
    .test(
      "description-max",
      `Description cannot exceed ${DESCRIPTION_MAX_CHARS} characters`,
      (value) => stripDescriptionHtml(value || "").length <= DESCRIPTION_MAX_CHARS,
    ),
  location: yup.string().required("Property location is required"),
  latitude: yup
    .number()
    .nullable()
    .transform((value, originalValue) => {
      return originalValue === "" || originalValue === null || Number.isNaN(value)
        ? null
        : value;
    })
    .optional(),

  longitude: yup
    .number()
    .nullable()
    .transform((value, originalValue) => {
      return originalValue === "" || originalValue === null || Number.isNaN(value)
        ? null
        : value;
    })
    .optional(),
  streetName: yup
    .string()
    .required("Village / Area is required")
    .max(30, "Village / Area must be 30 characters or less"),
  cityName: yup.string().required("City name is required"),
  stateName: yup.string().required("State is required"),
  pinCode: yup
    .string()
    .optional()
    .matches(/^[0-9]{6}$/, "Pin Code must be exactly 6 digits"),
  landmark: yup.string().optional(),
  price: yup.string().when("listingType", {
    is: "sale",
    then: () =>
      digitsOnlyPositive("Price is required", "Price must be greater than 0"),
    otherwise: () => optionalDigits,
  }),
  builtUpArea: yup
    .string()
    .optional()
    .test(
      "only-numbers",
      "Only numbers are allowed",
      (value) => !value || /^[0-9]+$/.test(value)
    )
    .test(
      "not-zero",
      "Built Up Area must be greater than 0",
      (value) => !value || Number(value) > 0,
    ),
  landSize: yup
    .string()
    .required("Land area is required")
    .test(
      "only-numbers",
      "Only numbers are allowed",
      (value) => !value || /^[0-9]+$/.test(value)
    )
    .test(
      "not-zero",
      "Land Size must be greater than 0",
      (value) => !value || Number(value) > 0,
    ),
  furnishing: yup.string().optional(),
  bedRooms: yup.string().optional(),
  bathRooms: yup.string().optional(),
  availability: yup.string().optional(),
  negotiable: yup.string().required("Please select negotiable value"),
  floorLevel: yup.string().optional(),
  cornerPlot: yup.string().optional(),
  roadWidth: yup.string().optional(),
  surveyNumber: yup.string().optional(),
  approvalTypes: yup.array().of(yup.string()).optional(),
  soilType: yup.string().optional(),
  clearTitle: yup.string().optional(),
  loanFacility: yup.string().optional(),
  registrationReady: yup.string().optional(),
  contactPersonName: yup.string().required("Contact person name is required"),
  contactNumber: yup
    .string()
    .required("Contact number is required")
    .matches(PHONE_DIGITS_PATTERN, PHONE_VALIDATION_MESSAGE),
  propertyAge: yup
    .number()
    .typeError("Year of build must be a number")
    .positive("Year of build must be greater than zero")
    .optional(),
  yearOfCompletion: yup
    .number()
    .nullable()
    .transform((value, originalValue) => {
      return originalValue === "" || originalValue === null || Number.isNaN(value)
        ? null
        : value;
    })
    .optional(),
  carParkAllocation: yup.string().optional(),
  facingDirection: yup.string().optional(),
  monthlyRent: yup.string().when("listingType", {
    is: "lease",
    then: () =>
      digitsOnlyPositive(
        "Monthly rent is required",
        "Monthly rent must be greater than 0",
      ),
    otherwise: () => optionalDigits,
  }),
  leaseDurationYears: yup.string().when("listingType", {
    is: "lease",
    then: () =>
      digitsOnlyPositive(
        "Lease duration is required",
        "Lease duration must be greater than 0",
      ),
    otherwise: () => optionalDigits,
  }),
  depositAmount: yup.string().when("listingType", {
    is: "lease",
    then: () =>
      digitsOnlyPositive(
        "Security deposit is required",
        "Security deposit must be greater than 0",
      ),
    otherwise: () => optionalDigits,
  }),
  minimumRentalPeriod: yup.string().when("listingType", {
    is: "lease",
    then: () =>
      digitsOnlyPositive(
        "Min lease period is required",
        "Min lease period must be greater than 0",
      ),
    otherwise: () => optionalDigits,
  }),
  renewalOption: yup.string().when("listingType", {
    is: "lease",
    then: (schema) =>
      schema
        .oneOf(["Yes", "No"], "Please select renewal option")
        .required("Please select renewal option"),
    otherwise: (schema) => schema.optional(),
  }),
  rentEscalationPercent: yup.string().when("listingType", {
    is: "lease",
    then: () =>
      yup
        .string()
        .required("Rent escalation is required")
        .matches(/^[0-9]+$/, "Only numbers are allowed"),
    otherwise: () => optionalDigits,
  }),
  noticePeriod: yup.string().when("listingType", {
    is: "lease",
    then: () =>
      digitsOnlyPositive(
        "Notice period (months) is required",
        "Notice period must be greater than 0",
      ),
    otherwise: () => optionalDigits,
  }),
  petPolicy: yup.string().optional(),
  preferredTenantType: yup.string().optional(),
  maintenanceFee: yup.string().optional(),
  sinkingFund: yup.string().optional(),
  bumiLotStatus: yup.string().optional(),
  renovationStatus: yup.string().optional(),
  amenities: yup
    .array()
    .of(yup.string())
    .optional(),
});

export type PropertyFormData = yup.InferType<typeof propertySchema>;

//Blog comment form validation schema
export const blogCommentSchema = yup.object().shape({
  name: personName("Name is required"),
  email: strictEmail("Email is required"),
  number: strictPhone(),
  message: meaningfulText("Message"),
});

//Contact form validation schema
export const contactSchema = yup.object().shape({
  name: personName("Name is required"),
  email: strictEmail("Email is required"),
  number: strictPhone(),
  subject: meaningfulText("Subject", "Subject is required", 120),
  message: meaningfulText("Message"),
});

//Contact form validation schema
export const contactTwoSchema = yup.object().shape({
  firstName: personName("First Name is required"),
  lastName: personName("Last Name is required"),
  email: strictEmail("Email is required"),
  phone: strictPhone(),
  caseDetails: meaningfulText("Message", "Message is required"),
});

//Property Review validation schema
export const propertyReviewSchema = yup.object().shape({
  name: personName("Name is required"),
  email: strictEmail("Email is required"),
  number: strictPhone(),
  message: meaningfulText("Message"),
});

//Profile information validation schema
export const profileSchema = yup.object().shape({
  fullName: personName("Full name is required"),
  aboutYou: yup.string().trim().max(500, "About you must be 500 characters or less"),
  companyName: yup.string(),
  icPassport: yup.string(),
  designation: yup.string(),
  experience: yup
    .number()
    .typeError("Must be a number")
    .min(0, "Must be 0 or more"),
  renNumber: yup
    .string()
    .transform((value) => value?.toUpperCase() || "")
    .matches(
      /^(REN|PEA)[0-9]{4,6}$|^$/,
      "Must start with REN or PEA followed by 4-6 digits",
    ),
  phone: strictPhone(),
  email: yup
    .string()
    .trim()
    .email("Invalid email format")
    .matches(
      /^$|^[^\s@]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
      "Enter a valid email address",
    ),
});

//Change password validation schema
export const changePasswordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .required("Old password is required")
    .matches(
      PASSWORD_ALNUM_6,
      "Old password must be at least 6 characters and alphanumeric only",
    ),
  newPassword: yup
    .string()
    .required("New password is required")
    .matches(
      PASSWORD_ALNUM_6,
      "New password must be at least 6 characters and alphanumeric only",
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("newPassword")], "Passwords do not match"),
});

//leave message validation schema
export const leaveMessageSchema = yup.object().shape({
  name: personName("Name is required"),
  phone: strictPhone(),
  email: strictEmail("Email is required"),
  message: meaningfulText("Message"),
});
