import PublicChat from './PublicChat.jsx'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-[480px] bg-brand-gradient opacity-10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 pb-16 pt-16 lg:px-8 lg:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="pill mx-auto mb-6 border border-brand-orange/20 bg-brand-orange/10 text-brand-orangeDark">
            The directory for management systems
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-brand-black sm:text-6xl">
            Every management system.
            <br />
            <span className="bg-brand-gradient bg-clip-text text-transparent">One directory.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-brand-black/60">
            MS-Feature is where teams discover, compare, and talk about the QMS, HRMS,
            LMS, CRM, and every other MS out there — plus a live community chat, right
            below, open for anyone to read.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href="#directory" className="btn-primary">
              Explore the directory
            </a>
            <a href="#chat" className="btn-secondary">
              Watch the live chat
            </a>
          </div>
        </div>
      </div>

      <div id="chat" className="mx-auto max-w-4xl px-6 pb-20 lg:px-8">
        <PublicChat />
      </div>
    </section>
  )
}
