const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen dark:bg-dark-gradient bg-light-gradient">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-headerColor rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
