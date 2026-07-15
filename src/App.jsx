import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Directory from './components/Directory.jsx'
import Footer from './components/Footer.jsx'
import AdminPage from './pages/AdminPage.jsx'

export default function App() {
  // hidden route: no link in the UI points here, reachable only by typing the URL
  if (window.location.pathname.replace(/\/+$/, '') === '/admin-mode') {
    return <AdminPage />
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Directory />
      <Footer />
    </div>
  )
}
