"use client"

import ReviewCard from "./ReviewCard"
import LoadingSpinner from "./LoadingSpinner"

function ReviewList({ reviews, loading, onRefresh }) {
  if (loading) {
    return <LoadingSpinner message="Memuat reviews..." />
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📭</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum Ada Review</h3>
        <p className="text-gray-500 mb-6">Mulai analyze review pertama Anda di tab "Analyze Review"</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Review History ({reviews.length})</h2>
        <button
          onClick={onRefresh}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          🔄 Refresh
        </button>
      </div>

      <div className="space-y-4">
        {reviews.map((review, index) => (
          <ReviewCard key={review.id || index} review={review} />
        ))}
      </div>
    </div>
  )
}

export default ReviewList
