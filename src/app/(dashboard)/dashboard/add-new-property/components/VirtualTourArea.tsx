"use client";
import { useState } from "react";

export default function VirtualTourArea() {
    const [selectedOption, setSelectedOption] = useState("embedded");

    return (
        <div className="tp-dashboard-new-property mb-50">
            <h5 className="tp-dashboard-new-title">Virtual Tour 360</h5>
            <div className="tp-dashboard-new-filter">
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="virtualTourOption"
                        id="radio-virtual-1"
                        value="embedded"
                        checked={selectedOption === "embedded"}
                        onChange={() => setSelectedOption("embedded")}
                    />
                    <label className="form-check-label" htmlFor="radio-virtual-1">
                        Embedded code
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="virtualTourOption"
                        id="radio-virtual-2"
                        value="upload"
                        checked={selectedOption === "upload"}
                        onChange={() => setSelectedOption("upload")}
                    />
                    <label className="form-check-label" htmlFor="radio-virtual-2">
                        Upload image
                    </label>
                </div>
            </div>

            {selectedOption === "embedded" && (
                <div className="tp-dashboard-new-input">
                    <label>Embedded Code Virtual 360</label>
                    <textarea placeholder="Paste embedded code here..."></textarea>
                </div>
            )}
        </div>
    );
}
