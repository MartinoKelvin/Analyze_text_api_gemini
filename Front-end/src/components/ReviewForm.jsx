"use client"

import { useState } from "react"

function ReviewForm({ onSubmit, loading }) {
  const [reviewText, setReviewText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!reviewText.trim()) {
      alert("Mohon masukkan review text")
      return
    }

    try {
      setIsSubmitting(true)
      setSuccess(false)
      await onSubmit(reviewText)

      // Clear form dan tampilkan success message
      setReviewText("")
      setSuccess(true)

      // Hide success message setelah 3 detik
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.error("Error submitting review:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Masukkan Review Produk</h2>

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          ✅ Review berhasil dianalisis! Lihat hasilnya di tab "Review History"
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="review" className="block text-gray-700 font-semibold mb-2">
            Review Text
          </label>
          <textarea
            id="review"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Contoh: Produk ini sangat bagus! Kualitasnya luar biasa dan pengiriman cepat. Sangat puas dengan pembelian ini."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows="6"
            disabled={isSubmitting || loading}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || loading || reviewText.length < 3}
          className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all ${
            isSubmitting || loading || reviewText.length < 3
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700 hover:shadow-lg transform hover:-translate-y-0.5"
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Menganalisis...
            </span>
          ) : (
            "🚀 Analyze Review"
          )}
        </button>
      </form>

      <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4">
        <p className="text-sm text-blue-700">
          <strong>💡 Tips:</strong> Review yang lebih panjang dan detail akan menghasilkan analisis yang lebih akurat.
        </p>
      </div>
    </div>
  )
}

export default ReviewForm
