export default function Footer() {
  return (
    <footer id="about" className="border-t border-black/5 bg-brand-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-orange text-sm font-extrabold">
                M
              </span>
              <span className="text-lg font-extrabold">MS-Feature</span>
            </div>
            <p className="mt-3 text-sm text-white/50">
              The directory for every management system — HRMS, LMS, CRM, QMS, and beyond —
              with a live community chat built in.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-white/40">Product</p>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                <li><a href="#directory" className="hover:text-brand-orange">Directory</a></li>
                <li><a href="#chat" className="hover:text-brand-orange">Community Chat</a></li>
                <li><a href="#categories" className="hover:text-brand-orange">Categories</a></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-white/40">Demo</p>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                <li>Data stored in your browser</li>
                <li>No account required</li>
                <li>Built with React + Tailwind</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} MS-Feature. Demo build — not affiliated with Zapier.</p>
          <p>Made for evaluating management systems, faster.</p>
        </div>
      </div>
    </footer>
  )
}
