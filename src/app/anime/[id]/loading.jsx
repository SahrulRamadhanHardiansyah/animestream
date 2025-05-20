const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-t-violet-500 border-gray-700 rounded-full animate-spin"></div>

      {/* Text Loading */}
      <p className="mt-4 text-violet-400 font-semibold text-lg tracking-wider animate-pulse">Loading...</p>
    </div>
  );
};

export default Loading;
