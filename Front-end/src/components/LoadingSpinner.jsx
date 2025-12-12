function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-gray-600 font-semibold">{message}</p>
    </div>
  )
}

export default LoadingSpinner
