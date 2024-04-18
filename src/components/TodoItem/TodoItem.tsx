//Redux
import { useAppDispatch } from "@/app/hooks";
import {
  editTodo,
  filterAndSearchTodos,
  setFilter,
  setSearchTerm,
} from "@/redux-toolkit/features/todo/todosSlice";
//Packages & Types
import Todo, { TodoItemProps } from "@/types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

//Todo Item Card - Component
const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete }) => {
  // Initialize Redux dispatch
  const dispatch = useAppDispatch();

  // State for Editing. False: Shows Data | True: Shows Form to Edit
  const [editing, setEditing] = useState(false);

  // Initialize edit form handling with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Todo>({
    defaultValues: todo,
  });

  // Define importance options for dropdown (urgency)
  const importanceOptions = [
    { value: 1, label: "Completed" },
    { value: 2, label: "In Progress" },
    { value: 3, label: "Pending" },
  ];

  // Function to handle edit State
  const handleEditTodo = () => {
    setEditing(true);
  };

  // Function to save edit changes
  const handleSaveEdit = (data: Todo) => {
    const newTodo: Todo = {
      ...data,
      importance: Number(data.importance),
    };
    dispatch(editTodo(newTodo)); //Dispatch edited todo.
    //Reset filtes, and states.
    dispatch(setFilter(0));
    dispatch(setSearchTerm(""));
    dispatch(filterAndSearchTodos());
    setEditing(false);
  };

  // Function to cancel edit changes
  const handleCancelEdit = () => {
    setEditing(false);
    reset(todo);
  };

  return (
    <div className="card w-80 h-80 p-3 border dark:border-gray-100 bg-white dark:bg-[#2b2c37] dark:bg-opacity-80 rounded-lg shadow-lg dark:shadow-none ">
      {editing ? (
        // Edit Form
        <form
          onSubmit={handleSubmit(handleSaveEdit)}
          className="w-full h-full flex flex-col justify-between"
        >
          <div className="w-full h-full">
            <div className="w-full flex justify-end ">
              <select
                className="px-2 py-[10px]  mb-3 border-gray-300 border dark:border-gray-300 p-2 rounded-md outline-indigo-500 dark:bg-[#2b2c37] dark:bg-opacity-80"
                defaultValue={todo.importance}
                {...register("importance", {
                  required: "Enter the description",
                })}
              >
                {importanceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            {errors.importance && (
              <p className="text-red-500">{errors.importance.message}</p>
            )}
            <input
              className="w-full font-bold text-xl border dark:border-gray-300 p-2 rounded-md outline-indigo-500 dark:bg-[#2b2c37] dark:bg-opacity-80"
              type="text"
              defaultValue={todo.title}
              {...register("title", { required: "Enter the title" })}
            />
            {errors.title ? (
              <div>
                <p className="text-red-500">{errors.title.message}</p>{" "}
              </div>
            ) : (
              <div className="h-[24px]"></div>
            )}
            <textarea
              className="w-full font-medium text-base border dark:border-gray-300 p-2 rounded-md outline-indigo-500 dark:bg-[#2b2c37] dark:bg-opacity-80 white-space: pre-wrap"
              defaultValue={todo.description}
              {...register("description", {
                required: "Enter the description",
              })}
            />
            {errors.description ? (
              <div>
                <p className="text-red-500">{errors.description.message}</p>
              </div>
            ) : (
              <div className="h-[24px]"></div>
            )}
          </div>
          <div className="w-full gap-1 flex justify-between ">
            <button
              className="bg-red-500 border border-black w-2/3 rounded-lg hover:bg-red-700 text-white"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
            <button
              className="border border-black w-2/3 rounded-lg hover:bg-indigo-700 bg-indigo-500 text-white"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        // Todo Item Card
        <div className="flex flex-col justify-between h-full w-full ">
          <div className="h-full w-full">
            <div className="w-full flex justify-end h-fit">
              <h1
                className={`p-2 border rounded-lg ${todo.importance == 1
                  ? "bg-red-500 border-red-900 text-white text-xs"
                  : todo.importance == 2
                    ? "bg-orange-500 border-orange-900 text-white text-xs"
                    : todo.importance == 3
                      ? "bg-green-600 border-green-900 text-white text-xs"
                      : ""
                  }`}
              >
                {todo.importance == 1
                  ? "Pending"
                  : todo.importance == 2
                    ? "In Progress"
                    : todo.importance == 3
                      ? "Completed"
                      : ""}
              </h1>
            </div>
            <h1 className="font-bold text-xl overflow-auto h-16">
              {todo.title}
            </h1>
            <div className="text-lg h-28 overflow-auto break-words">
              {todo.description}
            </div>          </div>
          <div className="w-full gap-1 flex justify-between">
            <button
              className="bg-red-500 border border-black w-2/3 rounded-lg hover:bg-red-700 text-white"
              onClick={() => onDelete(todo.id)}
            >
              Delete
            </button>
            <button
              className="border border-black w-2/3 rounded-lg hover:bg-indigo-700 bg-indigo-500 text-white"
              onClick={handleEditTodo}
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
