import { createFileRoute } from '@tanstack/react-router'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Portfolio } from '@/components/Portfolio'
import { Services } from '@/components/Services'
import { Booking } from '@/components/Booking'
import { Footer } from '@/components/Footer'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className="bg-bg min-h-screen">
      <Nav />
      <main>
        <Hero />
        <section id="about">
          <About />
        </section>
        <section id="portfolio">
          <Portfolio />
        </section>
        <section id="services">
          <Services />
        </section>
        <section id="booking">
          <Booking />
        </section>
      </main>
      <Footer />
    </div>
  )
}
