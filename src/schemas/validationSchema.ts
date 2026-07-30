import * as yup from "yup";

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
    .matches(/^[0-9]{10,12}$/, "Phone number must be 10 to 12 digits");

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

//Sign Up form validation schema
export const signUpSchema = yup.object().shape({
  displayname: personName("Enter display name"),
  email: strictEmail(),
  phone: strictPhone(),
  renNumber: yup.string().when("$showRen", {
    is: true,
    then: (schema) =>
      schema
        .required("REN/PEA number is required")
        .matches(
          /^(REN|PEA)[0-9]{4,6}$/,
          "Must start with REN or PEA followed by 4-6 digits",
        ),
    otherwise: (schema) => schema.optional(),
  }),
  password: yup
    .string()
    .required("Enter password")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
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
    .min(6, "Password must be at least 6 characters"),
});

//Forgot form validation schema
export const forgotSchema = yup.object().shape({
  email: strictEmail(),
});

export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Enter password")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain uppercase, lowercase and number",
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

export const propertySchema = yup.object({
  listingType: yup.string().required("Listing type is required"),
  propertyName: yup.string().required("Property name is required"),
  propertyType: yup.string().required("Property type is required"),
  tenure: yup.string().when("listingType", {
    is: "sale",
    then: (schema) => schema.optional(),
    otherwise: (schema) => schema.optional(),
  }),
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
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
  streetName: yup.string().required("Street name is required"),
  cityName: yup.string().required("City name is required"),
  stateName: yup.string().required("State is required"),
  countryName: yup.string().required("Country is required"),
  pinCode: yup
    .string()
    .required("Pin Code is required")
    .matches(/^[0-9]{5}$/, "Pin Code must be exactly 5 digits"),
  landmark: yup.string().required("Land mark is required"),
  price: yup
    .string()
    .required("Price is required")
    .matches(/^[0-9]+$/, "Only numbers are allowed")
    .test(
      "not-zero",
      "Price must be greater than 0",
      (value) => Number(value) > 0,
    ),
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
    .optional()
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
  furnishing: yup.string().required("Furnishing type is required"),
  bedRooms: yup.string().required("Bed rooms are required"),
  bathRooms: yup.string().required("Bath rooms are required"),
  availability: yup.string().required("Availability is required"),
  negotiable: yup.string().optional(),
  floorLevel: yup.string().required("Floor Number is required"),
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
  depositAmount: yup.string().optional(),
  minimumRentalPeriod: yup.string().optional(),
  petPolicy: yup.string().optional(),
  preferredTenantType: yup.string().optional(),
  maintenanceFee: yup.string().optional(),
  sinkingFund: yup.string().optional(),
  bumiLotStatus: yup.string().optional(),
  renovationStatus: yup.string().optional(),
  floorPlan: yup.string().optional(),
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
  oldPassword: yup.string().required("Old password is required"),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(6, "At least 6 characters"),
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
