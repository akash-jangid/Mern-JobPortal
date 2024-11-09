import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "India"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    array: [
      { label: "0-40k", min: 0, max: 40000 },
      { label: "42k-1lakh", min: 42000, max: 100000 },
      { label: "1lakh to 5lakh", min: 100000, max: 500000 },
    ],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (event, filterType) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);

    if (filterType === "Salary") {
      const salaryRange = filterData
        .find((filter) => filter.filterType === "Salary")
        .array.find((item) => item.label === newValue);

      if (salaryRange) {
        dispatch(
          setSearchedQuery({
            minSalary: salaryRange.min,
            maxSalary: salaryRange.max,
          })
        );
      }
    } else {
      dispatch(setSearchedQuery(newValue));
    }
  };

  const removeFilter = () => {
    setSelectedValue("");
    dispatch(setSearchedQuery(""));
  };

  return (
    <div className="card">
      <h1 className="text-xl font-semibold mb-4">Filter Jobs</h1>
      <hr />
      {filterData.map((data, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-lg font-medium">{data.filterType}</h2>
          {data.array.map((item, idx) => {
            const itemId = `id-${index}-${idx}`;
            const value = data.filterType === "Salary" ? item.label : item;

            return (
              <div key={itemId} className="flex items-center space-x-2 my-2">
                <input
                  type="radio"
                  value={value}
                  id={itemId}
                  name={data.filterType}
                  checked={selectedValue === value}
                  onChange={(e) => changeHandler(e, data.filterType)}
                  className="form-radio h-4 w-4 text-indigo-600"
                />
                <label htmlFor={itemId} className="text-sm text-gray-700">
                  {data.filterType === "Salary" ? item.label : item}
                </label>
              </div>
            );
          })}
        </div>
      ))}
      <button
        onClick={removeFilter}
        className="mt-4 px-6 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition"
      >
        Remove Filter
      </button>
    </div>
  );
};

export default FilterCard;
