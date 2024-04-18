"use client";
//Packages
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
//Redux
import { useAppSelector, useAppDispatch } from "./hooks";
import {
  addTodo,
  deleteTodo,
  filterAndSearchTodos,
  setFilter,
  setSearchTerm,
} from "../redux-toolkit/features/todo/todosSlice";
//Components
import NoTodoItem from "@/components/NoTodoItem/NoTodoItem";
import TodoItem from "@/components/TodoItem/TodoItem";
import Filter from "@/components/Filter/Filter";
//Images & Types
import Todo from "@/types";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import { useTheme } from "next-themes";

// Main component
export default function Home() {
  // Initialize Redux dispatch
  const dispatch = useAppDispatch();

  //Retrieve global states from Redux
  const filter = useAppSelector((state) => state.todoState.filter);
  const allTodos = useAppSelector((state) => state.todoState.todos);
  const searchTerm = useAppSelector((state) => state.todoState.searchTerm);
  const filteredTodos = useAppSelector(
    (state) => state.todoState.filteredTodos
  );

  // Initialize main form handling with react-hook-form
  const {
    register,
    handleSubmit: handleSubmitAdd,
    formState: { errors },
    reset,
  } = useForm<Todo>();

  // Define importance options for dropdown (urgency)
  const importanceOptions = [
    { value: 1, label: "Pending" },
    { value: 2, label: "In Progress" },
    { value: 3, label: "Completed" },
  ];

  // Function to handle adding a new todo
  const handleAddTodo = (data: Todo) => {
    const newTodo: Todo = {
      ...data,
      importance: Number(data.importance),
      id: uuidv4(),
    };
    dispatch(addTodo(newTodo)); // Dispatch - Create a new Todo
    // Reset filters, form and search terms
    dispatch(setFilter(0));
    dispatch(setSearchTerm(""));
    dispatch(filterAndSearchTodos());
    reset();
  };

  // Function to handle deleting a todo
  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id)); // Dispatch - Delete a Todo
  };

  //Theme
  const { theme } = useTheme();

  return (
    <main
      className="flex min-h-screen flex-col w-full justify-start items-center bg-cover dark:bg-gray-800 dark:bg-opacity-50 bg-blue-50"
    >
      {/* FORM AND FILTER */}
      <div className="w-full flex justify-center items-center bg-cover">
        <div className="w-full px-2 md:px-0 md:w-10/12 xl:w-6/12 2xl:w-4/12 h-full my-10 bg.">
          {/* FORM*/}
          <div className="formContainer border dark:border-gray-100 bg-white dark:bg-[#2b2c37] dark:bg-opacity-80 rounded-lg shadow-lg dark:shadow-none">
            <form
              onSubmit={handleSubmitAdd(handleAddTodo)}
              className="flex flex-col w-full p-5"
            >
              <div className="w-full flex justify-between">
                <h1 className="mb-6 font-bold uppercase text-xl text-customBlue5 dark:text-white">
                Add a new Task 
                </h1>
                <ThemeToggle />
              </div>
              {/* <span className="mb-4 text-customBlue5 dark:text-gray-300 text-sm"></span> */}
              {/* Title */}
              <div className="w-full ">
                <label className="block pb-2 font-medium text-lg">Title</label>
                <input
                  className="outline-width-2 w-full font-bold text-xl border dark:border-gray-300 p-2 rounded-md outline-indigo-500 dark:bg-[#2b2c37] dark:bg-opacity-80"
                  type="text"
                  {...register("title", {
                    required: "Enter the title",
                  })}
                />
                {errors.title ? (
                  <div>
                    <p className="text-red-500 pb-1 text-sm">{errors.title.message}</p>{" "}
                  </div>
                ) : (
                  <div className="h-[24px]"></div>
                )}
              </div>
              {/* Description */}
              <div className="w-full h-fit">
              <label className="block pb-2 font-medium text-lg">Description</label>
                <textarea
                  className="outline-width-2 rounded-md w-full border dark:border-gray-100 dark:bg-[#2b2c37] dark:bg-opacity-80 p-2"
                  {...register("description", {
                    required: "Enter the description",
                  })}
                />
                {errors.description ? (
                  <div>
                    <p className="text-red-500 text-sm pb-1">{errors.description.message}</p>
                  </div>
                ) : (
                  <div className="h-[24px]"></div>
                )}
              </div>
              {/* Importance */}
              <div className="w-full">
                <label className="block pb-2 font-medium text-lg">Status</label>
                <select
                  className="outline-width-2 w-full rounded-md border mb-2 p-2 dark:border-gray-100 dark:bg-[#2b2c37] dark:bg-opacity-80"
                  {...register("importance", {
                    required: "La urgencia es requerida.",
                  })}
                >
                  {importanceOptions.map((option) => (
                    <option key={option.value} value={option.value} className="w-40">
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.importance && (
                  <p className="text-red-500">{errors.importance.message}</p>
                )}
              </div>
              <button
                className="w-full border rounded-lg p-2 text-md mt-2 border-customBlue4 bg-indigo-500 hover:bg-indigo-700 font-bold text-white"
                type="submit"
              >
                Save Task
              </button>
            </form>
          </div>
          {/* FILTER */}
          <Filter />
        </div>
      </div>
      {/* TODOS */}
      <div className="todosContainer flex w-9/12 flex-row gap-2 my-4 flex-wrap justify-center ">
        {filter === 0 && searchTerm === "" && allTodos.length > 0 ? (
          allTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onDelete={handleDeleteTodo} />
          ))
        ) : (filter !== 0 || searchTerm !== "") && filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onDelete={handleDeleteTodo} />
          ))
        ) : (
          <NoTodoItem />
        )}
      </div>
    </main>
  );
}