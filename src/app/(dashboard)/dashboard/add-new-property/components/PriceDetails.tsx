import NiceSelect from "@/components/UI/NiceSelect";
import { ISortingHandlerProps } from "@/types/custom-interface";

export default function PriceDetails({ handleSorting }: ISortingHandlerProps) {
    return (
        <div className="tp-dashboard-new-property mb-50">
            <h5 className="tp-dashboard-new-title">Price</h5>
            <div className="row">
                <div className="col-lg-6">
                    <div className="tp-dashboard-new-input">
                        <label>Price:* </label>
                        <input type="text" placeholder="Example value: 12345.67" />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="tp-dashboard-new-input">
                        <label>Unit Price:* </label>
                        <div className="tp-property-tabs-select tp-select">
                            <NiceSelect
                                options={[
                                    { value: "None", label: "None" },
                                    { value: "1000", label: "1000" },
                                    { value: "2000", label: "2000" },
                                ]}
                                defaultCurrent={0}
                                onChange={handleSorting}
                                name="Unit Price"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="tp-dashboard-new-input">
                        <label>Before Price Label:* </label>
                        <input type="text" />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="tp-dashboard-new-input">
                        <label>After Price Label:* </label>
                        <input type="text" />
                    </div>
                </div>
            </div>
        </div>
    );
};
