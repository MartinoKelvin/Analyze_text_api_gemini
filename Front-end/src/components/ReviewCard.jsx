function ReviewCard({ review }) {
  const getSentimentColor = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case "positive":
        return "bg-green-100 text-green-800 border-green-300"
      case "negative":
        return "bg-red-100 text-red-800 border-red-300"
      case "neutral":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getSentimentEmoji = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case "positive":
        return "😊"
      case "negative":
        return "😞"
      case "neutral":
        return "😐"
      default:
        return "❓"
    }
  }

  return (
    <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow bg-white">
      {/* Review Text */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-700 mb-2">📝 Review:</h3>
        <p className="text-gray-600 italic leading-relaxed">"{review.text ?? review.review_text}"</p>
      </div>

      {/* Sentiment Badge */}
      <div className="mb-4">
        <span
          className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border ${getSentimentColor(review.sentiment)}`}
        >
          <span className="mr-2 text-lg">{getSentimentEmoji(review.sentiment)}</span>
          Sentiment: {review.sentiment || "Unknown"}
        </span>
      </div>

      {/* Key Points */}
      {(review.keypoints || review.key_points) && (
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <h4 className="font-semibold text-purple-900 mb-3 flex items-center">
            <span className="mr-2">🔑</span>
            Key Points:
          </h4>
          <div className="text-gray-700 whitespace-pre-line leading-relaxed">{review.keypoints ?? review.key_points}</div>
        </div>
      )}

      {/* Timestamp */}
      {review.created_at && (
        <div className="mt-4 text-xs text-gray-400">
          ⏰{" "}
          {new Date(review.created_at).toLocaleString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      )}
    </div>
  )
}

export default ReviewCard
