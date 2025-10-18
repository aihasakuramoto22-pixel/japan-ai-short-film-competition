import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AIFilmCompetition from './components/AIFilmCompetition'

// Lazy load components for better performance
const AboutPage = lazy(() => import('./components/AboutPage'))
const SuccessPage = lazy(() => import('./components/SuccessPage'))
const StripePaymentPage = lazy(() => import('./components/StripePaymentPage'))

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
)

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<AIFilmCompetition />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/payment" element={<StripePaymentPage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
