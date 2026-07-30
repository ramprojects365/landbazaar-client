import NiceSelect from "@/components/UI/NiceSelect";
import { PropertyTypeOptions } from "@/data/dropdownData";
import { ISortingHandlerProps } from "@/types/custom-interface";

export default function AdditionalInfoArea({
  handleSorting,
}: ISortingHandlerProps) {
  return (
    <div className="tp-dashboard-new-property mb-50">
      <h5 className="tp-dashboard-new-title">Addtional Infomation</h5>
      <div className="row">
        <div className="col-lg-4">
          <div className="tp-dashboard-new-input">
            <label> Property Type:* </label>
            <div className="tp-property-tabs-select tp-select">
              <NiceSelect
                options={PropertyTypeOptions}
                defaultCurrent={0}
                onChange={() => handleSorting()}
                name="Sorting"
              />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="tp-dashboard-new-input">
            <label> Unit Price:* </label>
            <div className="tp-property-tabs-select tp-select">
              <NiceSelect
                options={[
                  { value: "Office", label: "Choose" },
                  { value: "Villa", label: "For Rent" },
                  { value: "Studio", label: "For Sale" },
                ]}
                defaultCurrent={0}
                onChange={() => handleSorting()}
                name="Sorting"
              />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="tp-dashboard-new-input">
            <label> Property Age:* </label>
            <div className="tp-property-tabs-select tp-select">
              <NiceSelect
                options={[
                  { value: "0years", label: "0 to 2 years" },
                  { value: "2years", label: "2 to 5 years" },
                  { value: "5years", label: "5 to 10 years" },
                  { value: "10years", label: "More than 10 years" },
                ]}
                defaultCurrent={0}
                onChange={() => handleSorting()}
                name="Sorting"
              />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="tp-dashboard-new-input">
            <label> Size (SqFt):* </label>
            <input type="text" />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="tp-dashboard-new-input">
            <label> Land Area (SqFt):* </label>
            <input type="text" />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="tp-dashboard-new-input">
            <label> Property ID:* </label>
            <input type="text" />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="tp-dashboard-new-input">
            <label> Rooms:* </label>
            <input type="text" />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="tp-dashboard-new-input">
            <label> Bedrooms:* </label>
            <input type="text" />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="tp-dashboard-new-input">
            <label> Bathrooms:* </label>
            <input type="text" />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="tp-dashboard-new-input">
            <label> Garages:* </label>
            <input type="text" />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="tp-dashboard-new-input">
            <label> Garages Size (SqFt):* </label>
            <input type="text" />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="tp-dashboard-new-input">
            <label> Year Built:* </label>
            <input type="text" />
          </div>
        </div>
      </div>
    </div>
  );
}
