import { useAppDispatch, useAppSelector } from "@/app/hooks"; // Import Redux Hooks (TS)
import { FilterType } from "@/types";
import { useState } from "react";
import {
  filterAndSearchTodos,
  setFilter,
  setSearchTerm,
} from "@/redux-toolkit/features/todo/todosSlice"; // Import Redux actions

type Props = {};

//Filter Component
const Filter = (props: Props) => {
  // Initialize Redux Dispatch
  const dispatch = useAppDispatch();

  // Retrieve global states from Redux
  const filter = useAppSelector((state) => state.todoState.filter);

  // State for Search Input
  const [searchInput, setSearchInput] = useState("");

  // Function to handle changing the filter
  const handleChangeFilter = (newFilter: FilterType) => {
    //Set Filter
    dispatch(setFilter(newFilter));
    //Apply Filter
    dispatch(filterAndSearchTodos());
  };

  // Function to handle search input change
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchInput(searchTerm);
    dispatch(setSearchTerm(searchTerm));
    dispatch(filterAndSearchTodos());
  };

  // Function to handle reset button
  const handleResetButton = () => {
    dispatch(setFilter(0));
    dispatch(setSearchTerm(""));
    setSearchInput("");
  };

  return (
    <div className="filterContainer w-full mx-auto flex flex-col justify-center mt-10 gap-2 rounded-lg h-full">
      {/* Search Container */}
      <div className="searchContainer py-2 md:py-0 w-full flex flex-row gap-2 h-full">
        <input
          className="outline-width-2 w-full border dark:border-gray-300 p-3 rounded-md outline-indigo-500 dark:bg-[#2b2c37] dark:bg-opacity-80"
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        {/* Buttons for reset */}
        <div className="flex w-fit justify-center h-full">
          <button
            className="p-3 rounded-lg border border-gray-300 bg-red-500 hover:bg-red-600 font-bold text-white dark:border-gray-50"
            onClick={handleResetButton}
          >
            Clear
          </button>
        </div>
      </div>
      {/* Filter buttons */}
      <div className="w-full h-full border-b mt-4 border-gray-300 flex justify-between items-center dark:border-gray-500">
        <button
          className={`py-3 h-full w-1/4 rounded-lg ${filter == 0 ? "active font-bold bg-indigo-500 text-white" : ""
            }`}
          onClick={() => handleChangeFilter(0)}
        >
          All
        </button>
        <button
          className={`py-3 h-full w-1/4 rounded-lg ${filter == 1 ? "active font-bold bg-indigo-500 text-white" : ""
            }`}
          onClick={() => handleChangeFilter(1)}
        >
          Pending
        </button>
        <button
          className={`py-3 h-full w-1/4 rounded-lg ${filter == 2 ? "active font-bold bg-indigo-500 text-white" : ""
            }`}
          onClick={() => handleChangeFilter(2)}
        >
          In Progress
        </button>
        <button
          className={`py-3 h-full w-1/4 rounded-lg ${filter === 3 ? "active font-bold bg-indigo-500 text-white" : ""
            }`}
          onClick={() => handleChangeFilter(3)}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default Filter;
