import { useMemo, useState } from 'react'
import { categories, managementSystems } from '../data/managementSystems.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

export default function Directory() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [saved, setSaved] = useLocalStorage('ms-feature-saved-systems', [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return managementSystems.filter((system) => {
      const matchesCategory = activeCategory === 'All' || system.category === activeCategory
      const matchesQuery =
        !q ||
        system.name.toLowerCase().includes(q) ||
        system.abbr.toLowerCase().includes(q) ||
        system.tags.some((tag) => tag.toLowerCase().includes(q))
      return matchesCategory && matchesQuery
    })
  }, [query, activeCategory])

  function toggleSave(id) {
    setSaved((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]))
  }

  return (
    <section id="directory" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-heading">Browse every management system</h2>
          <p className="mt-4 text-brand-black/60">
            Search or filter by category to find the right MS for your team. Save the ones
            you're evaluating — saved picks stay in this browser.
          </p>
        </div>

        <div id="categories" className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={
                  activeCategory === category
                    ? 'pill bg-brand-orange text-white'
                    : 'pill border border-black/10 bg-white text-brand-black/60 hover:border-black/20'
                }
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <svg
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-black/30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search systems, tags…"
              className="w-full rounded-full border border-black/10 bg-white py-2.5 pl-9 pr-4 text-sm outline-none focus:border-brand-orange"
            />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((system) => {
            const isSaved = saved.includes(system.id)
            return (
              <div
                key={system.id}
                className="group flex flex-col rounded-xl2 border border-black/5 bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-cardHover"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-gradient text-sm font-extrabold text-white">
                    {system.abbr.slice(0, 3)}
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleSave(system.id)}
                    aria-label={isSaved ? 'Remove from saved' : 'Save this system'}
                    className={`rounded-full p-2 transition ${
                      isSaved ? 'text-brand-orange' : 'text-brand-black/20 hover:text-brand-black/50'
                    }`}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                      <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>

                <h3 className="mt-4 text-base font-bold text-brand-black">{system.name}</h3>
                <p className="mt-1 text-sm text-brand-black/60">{system.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {system.tags.map((tag) => (
                    <span key={tag} className="pill bg-black/[0.04] text-[11px] text-brand-black/60">
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-black/30">
                  {system.category}
                </span>
              </div>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-sm text-brand-black/40">
            No systems match "{query}". Try another search.
          </p>
        )}
      </div>
    </section>
  )
}
