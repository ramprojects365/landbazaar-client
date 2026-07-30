"use client"

import { useState } from 'react';

export default function AgentInformation() {
    const [selectedOption, setSelectedOption] = useState('upload');

    return (
        <div className="tp-dashboard-new-property mb-50">
            <h5 className="tp-dashboard-new-title">Agent Information</h5>

            <div className="tp-dashboard-new-filter">
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="agentInfoOption"
                        id="radio-1"
                        value="embedded"
                        checked={selectedOption === 'embedded'}
                        onChange={() => setSelectedOption('embedded')}
                    />
                    <label className="form-check-l" htmlFor="radio-1">
                        Embedded code
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="agentInfoOption"
                        id="radio-2"
                        value="upload"
                        checked={selectedOption === 'upload'}
                        onChange={() => setSelectedOption('upload')}
                    />
                    <label className="form-check-b" htmlFor="radio-2">
                        Upload image
                    </label>
                </div>
            </div>
        </div>
    )
}