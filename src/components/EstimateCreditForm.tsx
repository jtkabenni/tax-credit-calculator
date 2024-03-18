import React, { useState } from "react";
import {
  calculateTotal,
  calculateFirstYearRDCredit,
  calculateRDCredit,
} from "../utils/calculate";

interface FormData<T> {
  wages: T;
  contractors: T;
  supplies: T;
  cloudComputing: T;
  year3: T;
  year2: T;
  year1: T;
}

export default function EstimateCreditForm() {
  const [formData, setFormData] = useState<FormData<string>>({
    wages: "",
    contractors: "",
    supplies: "",
    cloudComputing: "",
    year3: "",
    year2: "",
    year1: "",
  });

  const [credit, setCredit] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isFirstYear, setIsFirstYear] = useState(false);
  const [prevYearsMessage, setPrevYearsMessage] = useState("");
  const currYear = new Date().getFullYear();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function convertFormDataToNums(formData: FormData<string>): FormData<number> {
    let { wages, contractors, supplies, cloudComputing, year1, year2, year3 } =
      formData;
    return {
      wages: parseInt(wages) || 0,
      contractors: parseInt(contractors) || 0,
      supplies: parseInt(supplies) || 0,
      cloudComputing: parseInt(cloudComputing) || 0,
      year1: parseInt(year1) || 0,
      year2: parseInt(year2) || 0,
      year3: parseInt(year3) || 0,
    };
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setPrevYearsMessage("");
    e.preventDefault();

    // converting form data values to numbers for calculation
    let { wages, contractors, supplies, cloudComputing, year1, year2, year3 } =
      convertFormDataToNums(formData);

    //calculate total QRE for current year
    const currYearQRE = calculateTotal([
      wages,
      contractors,
      supplies,
      cloudComputing,
    ]);

    //calculate total credit based on whether or not first year with QRE
    let total;
    if (isFirstYear) {
      total = calculateFirstYearRDCredit(currYearQRE);
    } else if (!year1 || !year2 || !year3) {
      setPrevYearsMessage(
        "Please enter the qualifying research expenditure for the previous three tax years"
      );
      return;
    } else {
      total = calculateRDCredit(year1, year2, year3, currYearQRE);
    }
    // if calculated credit is negative, set to 0
    setCredit(total < 0 ? 0 : total);
    setSubmitted(true);
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
            />
            I did not have Qualifying Research Expenditure (QRE) in all three
            previous tax years.
          </label>
        </div>
        {!isFirstYear && (
          <div>
            <div className="flex justify-between">
              <div className="mb-4 w-full">
                <label
                  htmlFor="year3"
                  className="block text-sm font-medium text-gray-700"
                >
                  {currYear - 2} Total QRE
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
                  {currYear - 3} Total QRE
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
                  {currYear - 4} Total QRE
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
            <p className="text-red-500"> {prevYearsMessage}</p>
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
            <span className="px-1">
              <b>Wages</b> - Salaries, bonuses, and other forms of compensation
              paid to employees directly
            </span>
          </label>

          <input
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
            <span className="px-1">
              <b> Contractors</b> - Expenses paid to external individuals or
              entities hired to perform qualified research activities
            </span>
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
            <span className="px-1">
              <b> Supplies</b> - Costs associated with materials and resources
              used
            </span>
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
            <span className="px-1">
              <b>Cloud Computing</b> - Expenses related to utilizing cloud-based
              services and infrastructure
            </span>
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

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded focus:outline-none focus:shadow-outline">
          Get credit estimate
        </button>
        {submitted && (
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-800 mt-2 mb-4">
              Your company may be eligible for up to ${credit} in R&D credit. To
              ensure your R&D Tax Credit is calculated accurately, please
              consult an R&D specialist.
            </h4>
          </div>
        )}
      </form>
    </div>
  );
}
