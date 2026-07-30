"use client";
import useGlobalContext from "@/hooks/useContext";
import menu_data_one from "@/data/menuData";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const OffcanvasMenus = () => {
  const { toggleOffcanvas } = useGlobalContext();
  const [navTitle, setNavTitle] = useState("");
  //openMobileMenu
  const openMobileMenu = (menu: string) => {
    if (navTitle === menu) {
      setNavTitle("");
    } else {
      setNavTitle(menu);
    }
  };
  return (
    <ul>
      {/* Mapping through header menu data to render offcanvas navigation items */}
      {menu_data_one.map((menu) => (
        <li
          key={menu.id}
          className={
            menu.home_menu
              ? "p-static"
              : navTitle === menu.label
                ? "active"
                : ""
          }
        >
          <Link href={menu.url}>{menu.label}</Link>
          {menu.home_menu && (
            <div
              className="tp-mega-menu"
              style={{ display: navTitle === menu.label ? "block" : "none" }}
            >
              <div className="tp-main-has-submenu">
                <div className="row gx-6 row-cols-1 row-cols-md-2 row-cols-lg-5">
                  {menu.submenu?.map((hm) => (
                    <div key={hm.id} className="col">
                      <span>
                        <div className="tp-home-thumb">
                          <Link href={hm.url}>
                            <Image
                              style={{ width: "100%", height: "auto" }}
                              src={hm.img!}
                              alt={hm.label}
                            />
                          </Link>
                        </div>
                      </span>
                      <h3 className="tp-home-title">
                        <Link href={hm.url}>{hm.label}</Link>
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {!menu.home_menu && menu.submenu && (
            <ul
              className="tp-submenu submenu"
              style={{ display: navTitle === menu.label ? "block" : "none" }}
            >
              {menu.submenu.map((sm) => (
                <li key={sm.id}>
                  <Link href={sm.url} onClick={toggleOffcanvas}>
                    {sm.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {(menu.submenu || menu.home_menu) && (
            <button
              onClick={() => openMobileMenu(menu.label)}
              className="tp-menu-close"
            >
              <i className="far fa-chevron-right"></i>
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default OffcanvasMenus;
