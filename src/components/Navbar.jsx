import { useState } from 'react'

const links = [
  { label: 'Directory', href: '#directory' },
  { label: 'Community Chat', href: '#chat' },
  { label: 'Categories', href: '#categories' },
  { label: 'About', href: '#about' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-orange text-lg font-extrabold text-white">
            M
          </span>
          <span className="text-lg font-extrabold tracking-tight text-brand-black">
            MS-Feature
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-brand-black/70 transition hover:text-brand-orange"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a href="#directory" className="btn-secondary">
            Browse Systems
          </a>
          <a href="#chat" className="btn-primary">
            Join the Chat
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-brand-black md:hidden"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-black/5 bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-semibold text-brand-black/70"
              >
                {link.label}
              </a>
            ))}
            <a href="#chat" onClick={() => setOpen(false)} className="btn-primary w-full">
              Join the Chat
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
