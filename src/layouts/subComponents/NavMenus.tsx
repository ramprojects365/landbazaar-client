"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import menu_data_one from "@/data/menuData";

export default function NavMenus() {
  const [hoveredMenu, setHoveredMenu] = useState<number | null>(
    menu_data_one[0]?.id || null,
  );

  useEffect(() => {
    setHoveredMenu(menu_data_one[0]?.id || null);
  }, []);

  return (
    <ul>
      {menu_data_one.map((menu) => (
        <li
          key={menu.id}
          className={`${menu.submenu ? `has-dropdown ${menu.previewImg ? "p-static" : ""}` : ""}`}
          onMouseEnter={() => setHoveredMenu(menu.id)}
        >
          <Link
            className={hoveredMenu === menu.id ? "hover" : ""}
            href={menu.url}
          >
            {menu.label}{" "}
          </Link>

          {menu.home_menu && (
            <div className="tp-mega-menu">
              <div className="tp-home-menu">
                <div className="row row-cols-1 row-cols-xl-5 row-cols-xxl-5">
                  {menu.submenu.map((sub) => (
                    <div key={sub.id} className="col">
                      <Link href={sub.url}>
                        <div className="tp-home-thumb">
                          <Image
                            style={{ width: "100%", height: "auto" }}
                            src={sub.img}
                            alt="menu-image"
                          />
                        </div>
                        <h3 className="tp-home-title">{sub.label}</h3>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {menu.submenu && !menu.home_menu && (
            <ul className="sub-menu">
              {menu.submenu.map((sub) => (
                <li key={sub.id}>
                  <Link href={sub.url}>
                    <span>{sub.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
