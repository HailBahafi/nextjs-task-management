//No Elements Found - Component Message
const NoTodoItem = () => {
  return (
    <div className="card w-full  xl:w-8/12 2xl:w-6/12 h-fit border border-indigo-500 bg-white rounded-lg bg-whi p-5 flex flex-col justify-between items-center dark:bg-[#2b2c37] dark:bg-opacity-80 dark:border-gray-100">
      <h1 className="text-2xl font-bold">
        Oh no! You have no added tasks.
      </h1>
      <h1 className="text-lg">
        <span className="font-bold">Tip:</span> Try adding tasks or clearing search filters.
      </h1>
    </div>
  );
};

export default NoTodoItem;
