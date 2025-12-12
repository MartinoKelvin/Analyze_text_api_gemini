"use client"

import { useState, useEffect } from "react"
import ReviewForm from "./components/ReviewForm"
import ReviewList from "./components/ReviewList"
import { analyzeReview, getAllReviews } from "./services/api"

function App() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("analyze") // 'analyze' or 'history'

  // Fetch all reviews saat component mount
  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getAllReviews()
      // Urutkan berdasarkan id terbaru dulu (id terbesar di atas)
      const sortedById = (data || []).slice().sort((a, b) => {
        const ia = Number(a?.id ?? 0)
        const ib = Number(b?.id ?? 0)
        return ib - ia
      })
      setReviews(sortedById)
    } catch (err) {
      setError("Gagal memuat reviews: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAnalyzeReview = async (reviewText) => {
    try {
      setLoading(true)
      setError(null)
      const result = await analyzeReview(reviewText)

      // Refresh list reviews setelah analyze berhasil
      await fetchReviews()

      // Switch ke tab history untuk melihat hasil
      setActiveTab("history")

      return result
    } catch (err) {
      setError("Gagal menganalisis review: " + err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🔍 Product Review Analyzer</h1>
          <p className="text-purple-100">Analisis sentimen dan ekstrak poin penting dari review produk</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-t-lg shadow-lg">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("analyze")}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                activeTab === "analyze" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              ✍️ Analyze Review
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                activeTab === "history" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              📊 Review History ({reviews.length})
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-b-lg shadow-lg p-6">
          {activeTab === "analyze" ? (
            <ReviewForm onSubmit={handleAnalyzeReview} loading={loading} />
          ) : (
            <ReviewList reviews={reviews} loading={loading} onRefresh={fetchReviews} />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
