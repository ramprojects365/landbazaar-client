import { buildSearchHref } from "@/utils/searchUrl";

export type FaqItem = {
  question: string;
  answer: string;
};

export function stripFaqMarkup(text: string): string {
  return text.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$1");
}

const search = buildSearchHref();
const plots10L = buildSearchHref({ maxPrice: "1000000" });
const plots20L = buildSearchHref({ maxPrice: "2000000" });
const plots30L = buildSearchHref({ maxPrice: "3000000" });
const plots50L = buildSearchHref({ maxPrice: "5000000" });
const agriLand = buildSearchHref({ propertyType: "Agricultural Land" });
const farmLand = buildSearchHref({ propertyType: "Farm Land" });

export const faqItems: FaqItem[] = [
  {
    question: "How do I find a good plot for sale in Andhra Pradesh or Telangana?",
    answer:
      "Start by choosing your preferred location, budget, plot size and land type. Check the location, road access, approvals, ownership and required documents before buying. You can use [[DekhoLand|/]] to [[search and compare available plots and land|/search]] in [[Andhra Pradesh|/plots-for-sale-in-andhra-pradesh]] and [[Telangana|/plots-for-sale-in-telangana]] based on your requirements.",
  },
  {
    question: "What should I check before buying a plot?",
    answer:
      "Check the ownership, title, EC, survey details, land-use status, layout approval, road access and applicable government approvals. Also verify the physical boundaries and documents with qualified professionals before completing the purchase. DekhoLand's [[document checklist|/blog/10-essential-legal-documents-to-check-before-buying-a-plot-in-hyderabad]] is a useful starting point.",
  },
  {
    question: "What documents should I verify before buying land?",
    answer:
      "Important documents may include the sale deed, title documents, link documents, Encumbrance Certificate (EC), revenue records, survey documents, layout approval and applicable RERA or planning approvals. The exact documents depend on the type and location of the land. See the [[legal documents guide on DekhoLand|/blog/10-essential-legal-documents-to-check-before-buying-a-plot-in-hyderabad]].",
  },
  {
    question: "How can I verify land ownership?",
    answer:
      "Verify the registered title and seller's ownership through the relevant government records. Check the sale deed, link documents, revenue records and EC. For important transactions, have the documents reviewed by a qualified property lawyer. In Telangana, you can also follow DekhoLand's [[Dharani land records guide|/blog/how-to-verify-land-records-on-the-telangana-dharani-registration-portal]].",
  },
  {
    question: "How can I check whether a property has a clear title?",
    answer:
      "Review the ownership history, sale deed, link documents, EC and relevant revenue records. Make sure there are no known claims, disputes or conflicting ownership records. A qualified property lawyer should conduct the final title verification. DekhoLand also offers [[legal verification support|/services/legal-verification]] if you need help.",
  },
  {
    question: "How can I check the Encumbrance Certificate (EC) of a property?",
    answer:
      "An EC can generally be obtained through the relevant state registration department or its online services. It helps identify registered transactions and certain encumbrances recorded against the property. Always check the EC along with the complete title documents. You can start with DekhoLand's [[EC verification service|/services/ec-verification]].",
  },
  {
    question: "How can I check whether a plot is legally approved?",
    answer:
      "Check the approval issued by the relevant planning authority, such as [[HMDA|/hmda-plots-for-sale]], [[DTCP|/dtcp-plots-for-sale]], [[APCRDA|/apcrda-plots-for-sale]] or another applicable authority. If the project falls under RERA, check its [[RERA registration|/rera-approved-plots-for-sale]] as well. Approval requirements vary by location and project. Read [[HMDA vs DTCP vs RERA|/blog/hmda-vs-dtcp-vs-rera-whats-the-difference-and-which-is-safer]] on DekhoLand.",
  },
  {
    question: "What is the process of buying land in India?",
    answer:
      "The typical process is to identify the property, verify ownership and documents, check approvals, agree on the price, execute the required agreement, pay applicable charges and register the sale deed. Professional legal and registration advice is recommended. Browse current [[plots for sale on DekhoLand|/search]] while you complete due diligence.",
  },
  {
    question: "What are the major costs involved when buying land or a plot?",
    answer:
      "Apart from the property price, buyers may need to pay stamp duty, registration charges and other applicable government or transaction charges. Legal verification, brokerage and documentation costs may also apply. Use DekhoLand's [[stamp duty calculator|/services/stamp-duty-calculator]] to estimate statutory charges.",
  },
  {
    question: "How can I avoid fraud when buying land or plots?",
    answer:
      "Verify the seller, ownership, title, EC, survey details, approvals and physical boundaries. Never rely only on advertisements or verbal promises. Avoid making large payments before proper verification and use a registered transaction process. Compare listings on [[DekhoLand|/]] and [[contact our team|/contact]] if something looks unclear.",
  },
  {
    question: "Where are the best places to buy land in Telangana?",
    answer:
      "There is no single best location for everyone. [[Hyderabad|/plots-for-sale-in-hyderabad]] and its growth corridors, along with cities such as [[Warangal|/plots-for-sale-in-warangal]] and other developing areas, may offer different opportunities. Compare connectivity, development, infrastructure, prices and your investment timeframe on [[plots for sale in Telangana|/plots-for-sale-in-telangana]].",
  },
  {
    question: "Where are the best places to buy land in Andhra Pradesh?",
    answer:
      "Popular areas to research include [[Visakhapatnam|/plots-for-sale-in-visakhapatnam]], [[Vijayawada|/plots-for-sale-in-vijayawada]], [[Amaravati|/plots-for-sale-in-amaravati]], [[Guntur|/plots-for-sale-in-guntur]], [[Tirupati|/plots-for-sale-in-tirupati]], [[Kakinada|/plots-for-sale-in-kakinada]] and other developing locations. The right location depends on your budget, purpose, connectivity, development potential and investment horizon. Start with [[plots for sale in Andhra Pradesh|/plots-for-sale-in-andhra-pradesh]] on DekhoLand.",
  },
  {
    question: "Where are the best places to buy land near Hyderabad?",
    answer:
      "Potential locations vary depending on your budget and purpose. Areas around Hyderabad's major growth corridors can be considered, but buyers should compare current prices, connectivity, infrastructure, approvals and future development before investing. Explore [[plots for sale near Hyderabad|/plots-for-sale-near-hyderabad]] and [[west Hyderabad corridors|/blog/why-west-hyderabad-shankarpally-to-sadashivpet-is-the-next-realty-hotspot]] on DekhoLand.",
  },
  {
    question: "Is Hyderabad a good place to invest in land?",
    answer:
      "Hyderabad has strong economic activity and continuing infrastructure development, making land an area of interest for many investors. However, prices and future potential vary significantly by location. Always evaluate the specific property's legal status, price and development prospects. Browse [[plots for sale in Hyderabad|/plots-for-sale-in-hyderabad]] and [[growth corridors around Hyderabad|/blog/top-5-high-growth-land-investment-corridors-around-hyderabad]].",
  },
  {
    question: "Is Visakhapatnam (Vizag) a good place to invest in land?",
    answer:
      "Visakhapatnam has strong connectivity, residential growth and economic activity, making it an important land market in Andhra Pradesh. Investment potential varies by locality, so consider infrastructure, demand, pricing, approvals and future development before buying. See [[plots for sale in Visakhapatnam|/plots-for-sale-in-visakhapatnam]] and [[Vizag|/plots-for-sale-in-vizag]] on DekhoLand.",
  },
  {
    question: "Is Vijayawada a good place to invest in land?",
    answer:
      "Vijayawada is an important commercial and transportation hub in Andhra Pradesh. Land demand varies across different areas. Before investing, compare connectivity, development, current prices, approvals and the property's intended use. View [[plots for sale in Vijayawada|/plots-for-sale-in-vijayawada]] on DekhoLand.",
  },
  {
    question: "Is Amaravati a good place to invest in land?",
    answer:
      "Amaravati is an area of significant interest because of its planned development and regional importance. However, land investment involves risks and prices can vary considerably. Buyers should independently verify development plans, [[APCRDA approvals|/apcrda-plots-for-sale]], ownership and current market conditions. Compare [[plots for sale in Amaravati|/plots-for-sale-in-amaravati]].",
  },
  {
    question: "Is Tirupati a good place to invest in land?",
    answer:
      "Tirupati has demand associated with tourism, education, employment and residential development. Different areas have different investment characteristics. Check connectivity, development, property approvals, demand and pricing before making an investment decision. Browse [[plots for sale in Tirupati|/plots-for-sale-in-tirupati]] on DekhoLand.",
  },
  {
    question: "Is Warangal a good place to invest in land?",
    answer:
      "Warangal is an important urban centre in Telangana with residential and infrastructure development. Investment potential depends on the specific locality and property. Compare connectivity, development, prices, approvals and demand before purchasing. See [[plots for sale in Warangal|/plots-for-sale-in-warangal]].",
  },
  {
    question: "Is Kakinada a good place to invest in land?",
    answer:
      "Kakinada has industrial, commercial and residential development and is an important city in coastal Andhra Pradesh. Potential varies by location, so buyers should evaluate infrastructure, connectivity, demand, approvals and property prices. Explore [[plots for sale in Kakinada|/plots-for-sale-in-kakinada]] on DekhoLand.",
  },
  {
    question: "Where can I buy a plot for ₹10 lakhs or less?",
    answer: `Plots under ₹10 lakhs may be available in developing or peripheral areas, depending on location, size and approvals. Search [[plots under ₹10 lakhs on DekhoLand|${plots10L}]] and compare the location, plot size, price and approval status before buying.`,
  },
  {
    question: "Where can I buy a plot for ₹20 lakhs or less?",
    answer: `The options available under ₹20 lakhs depend heavily on the city and locality. Developing areas around major cities may offer more options. Compare plot size, price per square yard, connectivity and approvals rather than considering price alone. Filter [[plots under ₹20 lakhs|${plots20L}]] on DekhoLand.`,
  },
  {
    question: "Where can I buy a plot for ₹30 lakhs or less?",
    answer: `A ₹30 lakh budget can provide different options across Telangana and Andhra Pradesh. Use your preferred city, plot size and land type to narrow the search and always verify the property's documents and approvals. See [[plots under ₹30 lakhs|${plots30L}]] on DekhoLand.`,
  },
  {
    question: "Where can I buy a plot for ₹50 lakhs or less?",
    answer: `A ₹50 lakh budget may provide options ranging from developing locations to established urban areas, depending on plot size and location. Compare properties based on total price, price per square yard, connectivity, approvals and future requirements. Browse [[plots under ₹50 lakhs|${plots50L}]] on DekhoLand.`,
  },
  {
    question: "How much does a 100 sq yard plot cost?",
    answer:
      "There is no fixed price for a 100 sq yard plot. The price depends mainly on the city, locality, road access, approvals, development and market conditions. Compare similar nearby properties on [[DekhoLand search|/search]] to understand the current asking price.",
  },
  {
    question: "How much does a 200 sq yard plot cost?",
    answer:
      "The price of a 200 sq yard plot varies significantly by location and property characteristics. Check comparable listings in the same locality and compare the price per square yard before making a decision. Use [[DekhoLand|/search]] to review current 200 sq yard plot listings.",
  },
  {
    question: "How is the price of land or plots calculated?",
    answer:
      "Plot prices are commonly compared using the price per square yard or square foot. The final value also depends on location, road width, facing, corner position, approvals, infrastructure and market demand. Listing pages on [[DekhoLand|/search]] show total price and price per unit so you can compare fairly.",
  },
  {
    question: "What is the price per square yard of a plot?",
    answer:
      "Calculate it by dividing the total property price by the total plot area in square yards. For example, a ₹40 lakh plot measuring 200 sq yards has an asking price of ₹20,000 per sq yard. DekhoLand listings display this so you can compare [[plots|/search]] across cities.",
  },
  {
    question: "How can I know whether a plot is overpriced?",
    answer:
      "Compare the property's price per square yard with similar properties nearby. Consider plot size, road access, approvals, location, development and other features. Asking prices are not always the same as final transaction prices. Shortlist similar [[plots on DekhoLand|/search]] before you negotiate.",
  },
  {
    question: "How can I negotiate the price of a plot?",
    answer:
      "Research comparable properties first and understand the local market price. Check the property's condition, documentation, urgency of the seller and comparable listings. Make a reasonable offer based on verified information rather than only asking for a discount. Use DekhoLand to [[compare listings|/search]] and [[contact the seller|/contact]] after you have checked the facts.",
  },
  {
    question: "What is an Encumbrance Certificate (EC) and why is it important?",
    answer:
      "An Encumbrance Certificate is a registration-related document that records certain registered transactions or encumbrances for a property during a specified period. It is an important part of property due diligence, but it should be checked along with other title and revenue records. Learn more via DekhoLand [[EC verification|/services/ec-verification]].",
  },
  {
    question: "What is a sale deed and why is it important?",
    answer:
      "A sale deed is the legal document used to transfer ownership of a property from the seller to the buyer. It should contain accurate property, seller and buyer details and be properly executed and registered as required. See which other papers to review in DekhoLand's [[documents checklist|/blog/10-essential-legal-documents-to-check-before-buying-a-plot-in-hyderabad]].",
  },
  {
    question: "What is a title deed?",
    answer:
      "A title deed is a document that establishes a person's ownership or legal interest in a property. Buyers should verify the title and ownership history carefully before purchasing land. DekhoLand's [[legal verification|/services/legal-verification]] and [[title-check guidance|/services/dharani-title-check]] can support that review.",
  },
  {
    question: "What is a link document or chain of title?",
    answer:
      "Link documents show the history of ownership transfers from previous owners to the current owner. Reviewing the chain helps establish how the seller acquired the property and whether the ownership history is consistent. Pair this check with the [[legal documents guide|/blog/10-essential-legal-documents-to-check-before-buying-a-plot-in-hyderabad]] on DekhoLand.",
  },
  {
    question: "How can I check whether land has any legal disputes?",
    answer:
      "Check available court records, registration records, revenue records and other relevant government records. A property lawyer can conduct a more comprehensive legal due-diligence check before purchase. You can also request [[legal verification through DekhoLand|/services/legal-verification]].",
  },
  {
    question: "What is the difference between agricultural land and residential land?",
    answer: `Agricultural land is primarily intended for agricultural use, while residential land is intended for residential development subject to applicable rules and approvals. Land-use restrictions and conversion requirements vary by state and location. Compare [[agricultural land|${agriLand}]] and [[residential plots|/residential-plots-hyderabad]] on DekhoLand.`,
  },
  {
    question: "What is HMDA approval and why is it important?",
    answer:
      "HMDA is the Hyderabad Metropolitan Development Authority. HMDA approval relates to planning and development permissions within its jurisdiction. Buyers should verify the specific approval and approved layout details rather than relying only on the seller's claim. Browse [[HMDA plots for sale|/hmda-plots-for-sale]] and read [[HMDA vs DTCP vs RERA|/blog/hmda-vs-dtcp-vs-rera-whats-the-difference-and-which-is-safer]].",
  },
  {
    question: "What is DTCP approval and why is it important?",
    answer:
      "DTCP refers to the Directorate of Town and Country Planning and related planning authorities. DTCP-approved layouts are planned and approved according to applicable planning regulations. Buyers should verify the actual approval with the relevant authority. See [[DTCP plots for sale|/dtcp-plots-for-sale]] on DekhoLand.",
  },
  {
    question: "What is RERA approval and when is it required for plots?",
    answer:
      "RERA regulates applicable real estate projects and promotes transparency for buyers. Whether a plotted development requires RERA registration depends on the project and applicable rules. Buyers should verify the project's RERA registration where applicable. Explore [[RERA approved plots|/rera-approved-plots-for-sale]] on DekhoLand.",
  },
  {
    question: "What is APCRDA approval and where does it apply?",
    answer:
      "APCRDA is the Andhra Pradesh Capital Region Development Authority. It is associated with planning and development within the applicable capital-region area. Buyers should verify the current planning authority and approval status of the specific property. Review [[APCRDA plots|/apcrda-plots-for-sale]] and [[Amaravati listings|/plots-for-sale-in-amaravati]] on DekhoLand.",
  },
  {
    question: "What should I check before buying agricultural land?",
    answer: `Check ownership, title, EC, revenue records, survey and boundaries, land classification, access roads, water availability and applicable restrictions. Also verify whether there are any disputes or restrictions on the intended use of the land. Browse [[agricultural land on DekhoLand|${agriLand}]] and our [[farmland buying guide|/blog/complete-guide-to-buying-managed-farmland-and-weekend-farmhouses]].`,
  },
  {
    question: "Can agricultural land be converted into residential land?",
    answer:
      "It may be possible in some cases, but conversion depends on the state's laws, land classification, location and applicable approvals. Do not assume agricultural land can automatically be used for residential construction. Read [[can non-farmers buy agricultural land in Telangana|/blog/can-non-farmers-buy-agricultural-land-in-telangana]] on DekhoLand.",
  },
  {
    question: "What documents are required to buy agricultural land?",
    answer: `Documents can include the sale deed, title/link documents, EC, revenue records, survey records and identity documents. Additional permissions or records may be required depending on the land and state. Use the [[documents checklist|/blog/10-essential-legal-documents-to-check-before-buying-a-plot-in-hyderabad]] and browse [[agricultural land listings|${agriLand}]] on DekhoLand.`,
  },
  {
    question: "Is agricultural land a good investment?",
    answer: `Agricultural land can be an investment option, but returns are not guaranteed. Location, soil, water availability, access, legal status, land-use restrictions and future development can significantly affect its value. Compare [[agricultural land|${agriLand}]] and [[farm land|${farmLand}]] listings on DekhoLand.`,
  },
  {
    question: "What is the difference between farmland and agricultural land?",
    answer: `The terms are often used interchangeably, but the legal classification and permitted use of a particular property are what matter. Always verify the official land classification and permitted use rather than relying on the property's marketing name. See [[farm land|${farmLand}]] and [[agricultural land|${agriLand}]] on DekhoLand.`,
  },
  {
    question: "How can I search for plots and land on DekhoLand?",
    answer: `Choose your preferred location and land type, then apply filters such as budget, plot size and other available features. You can browse property details and shortlist properties that match your requirements on the [[DekhoLand search page|${search}]].`,
  },
  {
    question: "How can I find plots based on my budget and preferred location?",
    answer: `Select your preferred city or location and set your budget and other requirements using DekhoLand's [[search and filters|${search}]]. Compare the available properties based on price, size, location and other important details. You can also start from city pages such as [[Hyderabad|/plots-for-sale-in-hyderabad]] or [[Visakhapatnam|/plots-for-sale-in-visakhapatnam]].`,
  },
  {
    question: "How can I contact a land seller or developer on DekhoLand?",
    answer:
      "Open the property listing and use the available contact options to send an enquiry or contact the seller/developer. Before making any payment or commitment, independently verify the property and seller details. For general help, use the [[DekhoLand contact page|/contact]].",
  },
  {
    question: "How can I compare different plots before buying?",
    answer: `Compare properties based on location, total price, price per square yard, plot size, road access, facing, approvals, development and other relevant features. Shortlisting several similar properties on [[DekhoLand|${search}]] can help you make a more informed decision.`,
  },
  {
    question: "How can I list my land or plot for sale on DekhoLand?",
    answer:
      "Create an account on DekhoLand and use the property-listing option to add your land or plot. Provide accurate information, location, price, size, images and available documents to help buyers understand the property. Start here: [[list your land or plot|/add-property]].",
  },
];
