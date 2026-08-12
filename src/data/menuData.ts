const propertyTypeSearchHref = (label: string) => {
  const map: Record<string, string> = {
    "HMDA Layouts": "HMDA Layout",
    "DTCP / YTDA Layouts": "DTCP Layout",
    "RERA Ventures": "RERA Plot",
    "Villa Plots": "Villa Plot",
    "Main Road": "Commercial Plot",
    "Industrial": "Industrial Plot",
    "Highway": "Highway Plot",
    "Agricultural": "Agricultural Land",
    "Farmhouses": "Farm House",
    "Weekend Eco-Plots": "Eco Plot",
  };

  const propertyType = map[label];
  return propertyType
    ? `/search?propertyType=${encodeURIComponent(propertyType)}`
    : "/search";
};

const menu_data_one = [
  {
    id: 1,
    label: "Residential",
    url: "/search",
    home_menu: false,
    previewImg: false,
    submenu: [
      {
        id: 1,
        label: "HMDA Layouts",
        url: propertyTypeSearchHref("HMDA Layouts"),
        img: "",
      },
      {
        id: 2,
        label: "DTCP / YTDA Layouts",
        url: propertyTypeSearchHref("DTCP / YTDA Layouts"),
        img: "",
      },
      {
        id: 3,
        label: "RERA Ventures",
        url: propertyTypeSearchHref("RERA Ventures"),
        img: "",
      },
      {
        id: 4,
        label: "Villa Plots",
        url: propertyTypeSearchHref("Villa Plots"),
        img: "",
      },
    ],
  },
  {
    id: 2,
    label: "Commercial",
    url: "/search",
    home_menu: false,
    previewImg: false,
    submenu: [
      {
        id: 5,
        label: "Main Road",
        url: propertyTypeSearchHref("Main Road"),
        img: "",
      },
      {
        id: 6,
        label: "Industrial",
        url: propertyTypeSearchHref("Industrial"),
        img: "",
      },
      {
        id: 7,
        label: "Highway",
        url: propertyTypeSearchHref("Highway"),
        img: "",
      },
    ],
  },
  {
    id: 3,
    label: "Farm",
    url: "/search",
    home_menu: false,
    previewImg: false,
    submenu: [
      {
        id: 8,
        label: "Agricultural",
        url: propertyTypeSearchHref("Agricultural"),
        img: "",
      },
      {
        id: 9,
        label: "Farmhouses",
        url: propertyTypeSearchHref("Farmhouses"),
        img: "",
      },
      {
        id: 10,
        label: "Weekend Eco-Plots",
        url: propertyTypeSearchHref("Weekend Eco-Plots"),
        img: "",
      },
    ],
  },
  {
    id: 4,
    label: "Services",
    url: "#",
    submenu: [
      { id: 11, label: "Dharani Title Check", url: "/services" },
      { id: 12, label: "Legal Verification", url: "/services" },
      { id: 13, label: "EC Verification", url: "/services" },
      { id: 14, label: "Site Visit Scheduler", url: "/services" },
    ],
  },
];

export default menu_data_one;
