import ResetSvgIcon from "../SVG/BannerSvg/ResetSvgIcon";
import SaveSvgIcon from "../SVG/BannerSvg/SaveSvgIcon";
import SearchSvg from "../SVG/BannerSvg/SearchSvg";
import NiceSelect from "../UI/NiceSelect";
import React from "react";

const BannerFromFilter = () => {
  const handleSorting = () => {};

  return (
    <>
      <div className="tp-from-wrapper">
        <form>
          <div className="tp-from-select-box d-flex flex-wrap flex-lg-nowrap">
            <div className="tp-hero-tab-select tp-select">
              <NiceSelect
                options={[
                  { value: "All", label: "All Residential" },
                  { value: "Apartment", label: "Apartment" },
                  { value: "Condominium", label: "Condominium" },
                  { value: "Landed House", label: "Landed House" },
                  { value: "Bungalow", label: "Bungalow" },
                  { value: "Shop", label: "Shop" },
                  { value: "Office", label: "Office" },
                ]}
                defaultCurrent={0}
                onChange={() => handleSorting()}
                name="Sorting"
              />
            </div>
            <div className="tp-hero-tab-select tp-select">
              <NiceSelect
                options={[
                  { value: "All", label: "Bed rooms" },
                  { value: "Studio", label: "Studio" },
                  { value: "1", label: "1" },
                  { value: "2", label: "2" },
                  { value: "3", label: "3" },
                  { value: "4", label: "4" },
                  { value: "5", label: "5" },
                ]}
                defaultCurrent={0}
                onChange={() => handleSorting()}
                name="Sorting"
              />
            </div>
            <div className="tp-hero-tab-select tp-select">
              <NiceSelect
                options={[
                  { value: "All", label: "Show Properties" },
                  { value: "Subsale", label: "Subsale" },
                  { value: "New Launch", label: "New Launch" },
                  { value: "Auction", label: "Auction" },
                ]}
                defaultCurrent={0}
                onChange={() => handleSorting()}
                name="Sorting"
              />
            </div>
          </div>
          <div className="tp-from-input-box d-flex flex-wrap flex-lg-nowrap">
            <div className="tp-from-input">
              <input type="text" placeholder="Min. area" />
            </div>
            <div className="tp-from-input">
              <input type="text" placeholder="Max. area" />
            </div>
            <div className="tp-from-input">
              <input type="text" placeholder="Min. price" />
            </div>
            <div className="tp-from-input">
              <input type="text" placeholder="Max. price" />
            </div>
          </div>
          <div className="tp-from-bottom d-flex justify-content-between flex-wrap">
            <div className="tp-hero-tab-search">
              <button>
                <span>
                  <SearchSvg />
                </span>{" "}
                Search Property ww
              </button>
            </div>
            <div className="tp-from-button-box d-flex">
              <div className="tp-from-button">
                <button type="button">
                  <SaveSvgIcon /> Save
                </button>
              </div>
              <div className="tp-from-button">
                <button type="button">
                  <ResetSvgIcon /> Reset
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default BannerFromFilter;
