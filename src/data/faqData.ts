import { IFAQItemDT } from "@/types/custom-interface";

export const faqItemsData: IFAQItemDT[] = [
  {
    id: "flush-collapseOne",
    question: "What is PropertyLa?",
    answer:
      "PropertyLa is a Malaysia property platform that helps users search for properties for sale and rent across Kuala Lumpur, Selangor, and other locations. Users can browse listings, connect with agents, explore new launches, and discover property-related information.",
    isOpen: false,
  },
  {
    id: "flush-collapseTwo",
    question: "Is PropertyLa free to use?",
    answer:
      "Yes. Searching for properties, viewing listings, and contacting agents on PropertyLa is completely free for property seekers.",
    isOpen: true,
  },
  {
    id: "flush-collapseThree",
    question: "What types of properties are available on PropertyLa?",
    answer:
      "Condominiums,Apartments,Landed houses,Commercial properties,Residential land,New launch projects,Rental properties",
    isOpen: false,
  },
  {
    id: "flush-collapseFour",
    question: "Can property owners and agents post listings?",
    answer:
      "Yes. Both property owners and registered property agents can post property listings on PropertyLa.",
    isOpen: false,
  },
];

export const faqItemsDataTwo: IFAQItemDT[] = [
  {
    id: "flush-collapseOne",
    question: "What services do you provide?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "flush-collapseTwo",
    question: "Can I get a refund for my Premium Membership?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    isOpen: true,
  },
  {
    id: "flush-collapseThree",
    question: "How does the Affiliate Program work?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "flush-collapseFour",
    question: "What is included in Standard membership plan?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

//Faq page items
interface FaqTab {
  id: string;
  label: string;
  content: FaqItem[];
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqTabItemsTwo: FaqTab[] = [
  {
    id: "general",
    label: "General questions",
    content: [
      {
        id: "q1",
        question: "What is PropertyLa?",
        answer:
          "PropertyLa is a Malaysia property platform that helps users search for properties for sale and rent across Kuala Lumpur, Selangor, and other locations. Users can browse listings, connect with agents, explore new launches, and discover property-related information.",
      },
      {
        id: "q2",
        question: "Is PropertyLa free to use?",
        answer:
          "Yes. Searching for properties, viewing listings, and contacting agents on PropertyLa is completely free for property seekers.",
      },
      {
        id: "q3",
        question: "What types of properties are available on PropertyLa?",
        answer:
          "PropertyLa features:\n\nCondominiums\nApartments\nLanded houses\nCommercial properties\nResidential land\nNew launch projects\nRental properties",
      },
      {
        id: "q4",
        question: "Can property owners and agents post listings?",
        answer:
          "Yes. Both property owners and registered property agents can post property listings on PropertyLa.",
      },
      {
        id: "q5",
        question: "What is a REN number?",
        answer:
          "REN stands for Real Estate Negotiator registration number issued by LPPEH Malaysia. Registered property negotiators in Malaysia must have a valid REN number.",
      },
      {
        id: "q6",
        question: "How can I verify if a property agent is genuine?",
        answer:
          "You can verify property agents through the official LPPEH Malaysia portal using their REN, REA, or PEA number. PropertyLa may also display verified agent badges for approved users.",
      },
      {
        id: "q7",
        question: "What is the difference between subsale and new launch property?",
        answer:
          "Subsale property refers to a property sold by an existing owner.\nNew launch property refers to a newly developed property sold directly by the developer.\n\nBoth options have different pricing, risks, and investment benefits depending on your goals.",
      },
      {
        id: "q8",
        question: "What additional costs should I prepare when buying a property?",
        answer:
          "Besides the property price, buyers may need to prepare for:\n\nStamp duty\nLegal fees\nLoan agreement fees\nValuation fees\nInsurance\nMaintenance charges",
      },
      {
        id: "q9",
        question: "What deposits are usually required for rental properties in Malaysia?",
        answer:
          "Typical rental payments include:\n\n2 months security deposit\n1 month advance rental\nUtility deposit\nTenancy agreement fees\n\nRequirements may vary depending on the landlord or agent.",
      },
      {
        id: "q10",
        question: "How can I avoid fake property listings?",
        answer:
          "Users should:\n\nVerify REN numbers\nAvoid paying deposits before viewing\nConfirm property details carefully\nMeet agents physically when possible\n\nPropertyLa encourages verified listings and trusted agents to improve user safety and trust.",
      },
    ],
  },
];
