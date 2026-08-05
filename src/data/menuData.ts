const menu_data_one = [
  {
    id: 1,
    label: "Residential",
    url: "/",
    home_menu: false,
    previewImg: false,
    submenu: [
      {
        id: 1,
        label: "HMDA Layouts",
        url: "/search",
        img: "",
      },
      {
        id: 2,
        label: "DTCP / YTDA Layouts",
        url: "/search",
        img: "",
      },
      {
        id: 3,
        label: "RERA Ventures",
        url: "/search",
        img: "",
      },
      {
        id: 4,
        label: "Villa Plots",
        url: "/search",
        img: "",
      },
    ],
  },
  {
    id: 2,
    label: "Commercial",
    url: "/",
    home_menu: false,
    previewImg: false,
    submenu: [
      {
        id: 5,
        label: "Main Road",
        url: "/search",
        img: "",
      },
      {
        id: 6,
        label: "Industrial",
        url: "/search",
        img: "",
      },
      {
        id: 7,
        label: "Highway",
        url: "/search",
        img: "",
      },
    ],
  },
  {
    id: 3,
    label: "Farm",
    url: "/",
    home_menu: false,
    previewImg: false,
    submenu: [
      {
        id: 8,
        label: "Agricultural",
        url: "/search",
        img: "",
      },
      {
        id: 9,
        label: "Farmhouses",
        url: "/search",
        img: "",
      },
      {
        id: 10,
        label: "Weekend Eco-Plots",
        url: "/search",
        img: "",
      },
    ],
  },
  {
    id: 4,
    label: "Services",
    url: "#",
    submenu: [
      { id: 11, label: "Dharani Title Check", url: "/property-advisor" },
      { id: 12, label: "Legal Verification", url: "/property-advisor" },
      { id: 13, label: "EC Verification", url: "/home-loan" },
      { id: 14, label: "Site Visit Scheduler", url: "/interior-design" },
    ],
  },
  {
    id: 5,
    label: "More",
    url: "#",
    submenu: [
      { id: 15, label: "About", url: "/about" },
      { id: 16, label: "Pricing", url: "/pricing" },
      { id: 17, label: "Contact", url: "/contact" },
      { id: 18, label: "Faq", url: "/faq" },
    ],
  },
];

export default menu_data_one;
