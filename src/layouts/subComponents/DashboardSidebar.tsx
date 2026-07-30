"use client";
import {
  AddPropertySvg,
  MyPropertiesSvg,
  IdentityDockSvg,
  LogoutSvg,
} from "@/components/SVG";
import Link from "next/link";
import { JSX, useState, useEffect } from "react";

// SidebarItem interface
interface SidebarItem {
  href: string;
  label: string;
  icon: JSX.Element;
}

// SidebarSection interface
interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

// Sidebar component
const Sidebar = () => {
  const [activePath, setActivePath] = useState<string>("");

  // Update activePath when the component mounts
  useEffect(() => {
    setActivePath(window.location.pathname);
  }, []);

  const manageListingSection: SidebarSection = {
    title: "Manage listing",
    items: [
      {
        href: "/dashboard/add-new-property",
        label: "Add new property",
        icon: <AddPropertySvg />,
      },
      {
        href: "/dashboard/property",
        label: "My properties",
        icon: <MyPropertiesSvg />,
      },
    ],
  };

  const manageAccountSection: SidebarSection = {
    title: "Manage account",
    items: [
      {
        href: "/dashboard/my-profile",
        label: "My profile",
        icon: <IdentityDockSvg />,
      },
      {
        href: "/dashboard/update-password",
        label: "Update Password",
        icon: <IdentityDockSvg />,
      },
      {
        href: "/sign-in",
        label: "Logout",
        icon: <LogoutSvg />,
      },
    ],
  };

  // Sidebar render function with active class logic
  const renderSection = (section: SidebarSection) => (
    <div className="tp-dashboard-sidebar-content pb-70">
      <h4 className="tp-dashboard-sidebar-title">{section.title}</h4>
      {section.items.map((item, index) => (
        <div className="tp-dashboard-sidebar-item" key={index}>
          <Link
            href={item.href}
            className={activePath === item.href ? "active" : ""}
            onClick={() => setActivePath(item.href)}
          >
            <span>{item.icon}</span> {item.label}
          </Link>
        </div>
      ))}
    </div>
  );

  return (
    <div className="tp-dashboard-sidebar d-none d-xxl-block">
      <div className="tp-dashboard-sidebar-wrap">
        {renderSection(manageListingSection)}
        {renderSection(manageAccountSection)}
      </div>
    </div>
  );
};

export default Sidebar;
