import React, { useState } from "react";
import { calculateFirstYearRDCredit, calculateRDCredit } from "./calculate";
import Tooltip from "./Tooltip";
interface FormData {
  wages: number;
  contractors: number;
  supplies: number;
  cloudComputing: number;
  year3: number;
  year2: number;
  year1: number;
}
export default function EstimateCreditForm() {
  const [formData, setFormData] = useState<FormData>({
    wages: 0,
    contractors: 0,
    supplies: 0,
    cloudComputing: 0,
    year3: 0,
    year2: 0,
    year1: 0,
  });

  const [credit, setCredit] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isFirstYear, setIsFirstYear] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseInt(value) });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let { wages, contractors, supplies, cloudComputing, year1, year2, year3 } =
      formData;
    const QRE = wages + contractors + supplies + cloudComputing;

    //calculate total credit based on whether or not first year with QRE
    const total = isFirstYear
      ? calculateFirstYearRDCredit(QRE)
      : calculateRDCredit(year1, year2, year3, QRE);

    setCredit(total);
    setSubmitted(true);
    console.log(formData);
  };

  return (
    <div className="m-auto w-1/2 ">
      <form onSubmit={handleSubmit}>
        <h3 className="text-xl font-semibold text-blue-600 mt-3 mb-2">
          Previous years QREs
        </h3>
        <div className="py-1">
          <label>
            <input
              type="checkbox"
              name="processOrExperimentation"
              checked={isFirstYear}
              onChange={(e) => setIsFirstYear(!isFirstYear)}
            />{" "}
            This is my first year with Qualifying Research Expenditure (QRE)
          </label>
        </div>
        {!isFirstYear && (
          <div className="flex justify-between">
            <div className="mb-4 w-full">
              <label
                htmlFor="year3"
                className="block text-sm font-medium text-gray-700"
              >
                2023 Total QRE
              </label>
              <input
                type="number"
                id="year3"
                name="year3"
                value={formData.year3}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4 w-full">
              <label
                htmlFor="year2"
                className="block text-sm font-medium text-gray-700"
              >
                2022 Total QRE
              </label>
              <input
                type="number"
                id="year2"
                name="year2"
                value={formData.year2}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4 w-full">
              <label
                htmlFor="year1"
                className="block text-sm font-medium text-gray-700"
              >
                2021 Total QRE
              </label>
              <input
                type="number"
                id="year1"
                name="year1"
                value={formData.year1}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
          </div>
        )}

        <h3 className="text-xl font-semibold text-blue-600 mt-3 mb-2">
          This year's QREs
        </h3>
        <p>
          <i>
            How much did you spend last year on research and development
            activity?
          </i>
        </p>
        <div className="my-2">
          <label
            htmlFor="wages"
            className="block text-sm font-medium text-gray-700"
          >
            Wages{" "}
            <Tooltip text="Salaries, bonuses, and other forms of compensation paid to employees directly involved in conducting qualified research activities."></Tooltip>
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
        <div className="my-2">
          <label
            htmlFor="contractors"
            className="block text-sm font-medium text-gray-700"
          >
            Contractors{" "}
            <Tooltip text="Expenses paid to external individuals or entities hired to perform qualified research activities on behalf of the company."></Tooltip>
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
        <div className="my-2">
          <label
            htmlFor="supplies"
            className="block text-sm font-medium text-gray-700"
          >
            Supplies{" "}
            <Tooltip text="Costs associated with materials and resources used in the R&D process."></Tooltip>
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
        <div className="my-2">
          <label
            htmlFor="cloudComputing"
            className="block text-sm font-medium text-gray-700"
          >
            Cloud Computing{" "}
            <Tooltip text="Expenses related to utilizing cloud-based services and infrastructure for R&D purposes."></Tooltip>
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

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Get credit estimate
        </button>
        {submitted && (
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-800 mt-2 mb-4">
              Your company may be eligible for up to ${credit} in R&D credit
            </h4>
          </div>
        )}
      </form>
    </div>
  );
}
