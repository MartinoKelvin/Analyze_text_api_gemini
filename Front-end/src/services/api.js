// Base API URL - sesuaikan dengan backend Anda
const API_BASE_URL = "http://127.0.0.1:8000/api"

/**
 * Analyze review baru
 * @param {string} reviewText - Text review yang akan dianalisis
 * @returns {Promise<Object>} - Hasil analisis
 */
export async function analyzeReview(reviewText) {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze-review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // sesuaikan key dengan schema backend (ReviewCreate.text)
        text: reviewText,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || errorData.message || `HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error analyzing review:", error)
    throw error
  }
}

/**
 * Get semua reviews yang sudah dianalisis
 * @returns {Promise<Array>} - List semua reviews
 */
export async function getAllReviews() {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || errorData.message || `HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching reviews:", error)
    throw error
  }
}
