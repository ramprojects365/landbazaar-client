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
        id: 1,
        label: "Main Road",
        url: "/search",
        img: "",
      },
      {
        id: 2,
        label: "Industrial",
        url: "/search",
        img: "",
      },
      {
        id: 2,
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
        id: 1,
        label: "Agricultural",
        url: "/search",
        img: "",
      },
      {
        id: 2,
        label: "Farmhouses",
        url: "/search",
        img: "",
      },
      {
        id: 2,
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
      { id: 1, label: "Dharani Title Check", url: "/property-advisor" },
      { id: 2, label: "egal Verification", url: "/property-advisor" },
      { id: 3, label: "EC Verification", url: "/home-loan" },
      { id: 4, label: "Site Visit Scheduler", url: "/interior-design" },
    ],
  },
  {
    id: 5,
    label: "More",
    url: "#",
    submenu: [
      { id: 1, label: "About", url: "/about" },
      { id: 2, label: "Pricing", url: "/pricing" },
      { id: 3, label: "Contact", url: "/contact" },
      { id: 4, label: "Faq", url: "/faq" },
    ],
  },
];

export default menu_data_one;
