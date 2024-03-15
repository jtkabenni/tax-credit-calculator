import React, { useState } from "react";
interface FormData {
  wages: number;
  contractors: number;
  supplies: number;
  cloudComputing: number;
}
export default function CalculateCreditForm() {
  const [formData, setFormData] = useState<FormData>({
    wages: 500000,
    contractors: 100000,
    supplies: 50000,
    cloudComputing: 30000,
  });

  const [credit, setCredit] = useState(0);

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(formData);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseInt(value) });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const total = calculate();
    setCredit(total);
    setSubmitted(true);
    console.log(formData);
  };

  function calculate() {
    let { wages, contractors, supplies, cloudComputing } = formData;
    const total = (wages + contractors + supplies + cloudComputing) * 0.2;
    return total;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="wages"
            className="block text-sm font-medium text-gray-700"
          >
            Wages:
          </label>
          <input
            placeholder="100,000"
            type="number"
            id="wages"
            name="wages"
            value={formData.wages}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="contractors"
            className="block text-sm font-medium text-gray-700"
          >
            Contractors:
          </label>
          <input
            type="number"
            id="contractors"
            name="contractors"
            value={formData.contractors}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="supplies"
            className="block text-sm font-medium text-gray-700"
          >
            Supplies:
          </label>
          <input
            type="number"
            id="supplies"
            name="supplies"
            value={formData.supplies}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="cloudComputing"
            className="block text-sm font-medium text-gray-700"
          >
            Cloud Computing:
          </label>
          <input
            type="number"
            id="cloudComputing"
            name="cloudComputing"
            value={formData.cloudComputing}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <button>Calculate my credit</button>
        {submitted && (
          <div>
            <h4>
              Your company may be eligible for up to ${credit} in R&D credit
              this year
            </h4>
          </div>
        )}
      </form>
    </>
  );
}
