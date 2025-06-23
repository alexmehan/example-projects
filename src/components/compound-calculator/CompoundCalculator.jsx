import React from "react";
import { ReactDOM } from "react";
import { useState } from "react";

export default function CompoundCalculator() {
    const [formData, setFormData] = useState({
        initial: 0,
        regular: 0,
        depositFrequency: 12,
        compoundFrequency: 12,
        duration: 1,
        interest: 0.00
    });

    function handleChange(event) {
        
        const {name, value} = event.target;
        setFormData((prevFormData) => ({...prevFormData, [name]: parseFloat(value)}));
    }

    function futureValue() {
        // https://www.thecalculatorsite.com/finance/calculators/compound-interest-formula
        const {initial, regular, depositFrequency, interest, compoundFrequency, duration} = formData;
        let compoundFormula = initial * Math.pow(1 + interest / compoundFrequency, compoundFrequency * duration);
        //let contributionsFormula = regular * (Math.pow((1 + interest / compoundFrequency), compoundFrequency * duration) - 1) / (interest / compoundFrequency) 
        compoundFormula = Number(Math.round(compoundFormula + 'e2') + 'e-2'); // This is to get around rounding issues with certain numbers
        return compoundFormula;
    }
    return (
        <div id="compound-calculator" class="p-4 shadow-lg shadow-slate-400">
            <ul class="flex flex-row gap-8">
                <li>Initial: {formData.initial}</li>
                <li>Regular Deposits: {formData.regular}</li>
                <li>Deposit Frequency: {formData.depositFrequency}</li>
                <li>Compound Frequency: {formData.compoundFrequency}</li>
                <li>Duration: {formData.duration}</li>
                <li>Interest: {formData.interest}</li>
            </ul>
            <span class="block text-center text-4xl p-8">{futureValue()}</span>
            <div class="grid grid-cols-3 gap-4">
                <div>
                <label class="block">Initial Investment</label>
                <input type="text" name="initial" class="border-2 border-slate-400" onChange={handleChange}/>
                </div>
                <div>
                <label class="block">Regular Deposit</label>
                <input type="text" name="regular" class="border-2 border-slate-400" onChange={handleChange}/>
                </div>
                <div>
                <label class="block">Deposit Frequency</label>
                <select name="depositFrequency" class="border-2 border-slate-400" onChange={handleChange}>
                    <option value="365">Daily</option>
                    <option value="12" selected>Monthly</option>
                    <option value="1">Yearly</option>
                </select>
                </div>
                <div>
                <label class="block">Compound Frequency</label>
                <select name="compoundFrequency" class="border-2 border-slate-400" onChange={handleChange}>
                    <option value="365">Daily</option>
                    <option value="12" selected>Monthly</option>
                    <option value="1">Yearly</option>
                </select>
                </div>
                <div>
                <label class="block">Number of Years</label>
                <input type="text" name="duration" class="border-2 border-slate-400" onChange={handleChange}/>
                </div>
                <div>
                <label class="block">Annual Interest Rate</label>
                <input type="text" name="interest" class="border-2 border-slate-400" onChange={handleChange}/>
                </div>
            </div>
        </div>
    )
}