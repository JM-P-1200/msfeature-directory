import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Directory from './components/Directory.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Directory />
      <Footer />
    </div>
  )
}
