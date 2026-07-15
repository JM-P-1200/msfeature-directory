import { useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { seedMessages } from '../data/seedMessages.js'

function formatDateTime(timestamp) {
  return new Date(timestamp).toLocaleString([], {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export default function AdminPage() {
  const [messages, setMessages] = useLocalStorage('ms-feature-chat-messages', seedMessages)

  const sortedMessages = useMemo(
    () => [...messages].sort((a, b) => a.timestamp - b.timestamp),
    [messages]
  )

  const subscriberCount = messages.filter((m) => m.subscribed).length
  const uniqueNames = new Set(messages.map((m) => m.name)).size

  function deleteMessage(id) {
    setMessages((prev) => prev.filter((m) => m.id !== id))
  }

  function clearAll() {
    if (window.confirm('Delete ALL chat messages? This cannot be undone.')) {
      setMessages([])
    }
  }

  function restoreSeeds() {
    if (window.confirm('Reset the chat back to the original demo messages?')) {
      setMessages(seedMessages)
    }
  }

  return (
    <div className="min-h-screen bg-brand-black/[0.02]">
      <header className="border-b border-black/5 bg-brand-black">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-orange text-lg font-extrabold text-white">
              M
            </span>
            <div>
              <p className="text-base font-extrabold text-white">MS-Feature Admin</p>
              <p className="text-xs text-white/50">Chat moderation panel</p>
            </div>
          </div>
          <a href="/" className="pill bg-white/10 text-white hover:bg-white/20">
            ← Back to site
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10 lg:px-8">
        <div className="mb-8 rounded-xl2 border border-brand-orange/20 bg-brand-orange/5 px-5 py-4 text-sm text-brand-black/70">
          <span className="font-semibold text-brand-orangeDark">Demo notice:</span> this page is
          hidden (URL-only, no links point here) but not secured — anyone who knows the URL can
          open it. In a production build, put it behind real authentication on a backend.
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl2 border border-black/5 bg-white p-5 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-black/40">
              Total messages
            </p>
            <p className="mt-1 text-3xl font-extrabold text-brand-black">{messages.length}</p>
          </div>
          <div className="rounded-xl2 border border-black/5 bg-white p-5 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-black/40">
              From subscribers
            </p>
            <p className="mt-1 text-3xl font-extrabold text-brand-orange">{subscriberCount}</p>
          </div>
          <div className="rounded-xl2 border border-black/5 bg-white p-5 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-black/40">
              Unique names
            </p>
            <p className="mt-1 text-3xl font-extrabold text-brand-black">{uniqueNames}</p>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-xl2 border border-black/5 bg-white shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 px-6 py-4">
            <h2 className="text-base font-bold text-brand-black">Chat messages</h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={restoreSeeds}
                className="pill border border-black/10 bg-white text-brand-black/70 hover:border-black/20"
              >
                Restore demo messages
              </button>
              <button
                type="button"
                onClick={clearAll}
                disabled={messages.length === 0}
                className="pill bg-red-600 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Clear all
              </button>
            </div>
          </div>

          {sortedMessages.length === 0 ? (
            <p className="px-6 py-10 text-center text-sm text-brand-black/40">
              No messages in the chat.
            </p>
          ) : (
            <ul className="divide-y divide-black/5">
              {sortedMessages.map((message) => (
                <li key={message.id} className="flex items-start gap-4 px-6 py-4">
                  <div
                    className={`mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full text-xs font-bold text-white ${
                      message.subscribed ? 'bg-brand-orange' : 'bg-brand-black/30'
                    }`}
                    aria-hidden
                  >
                    {message.name.slice(0, 1).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="text-sm font-semibold text-brand-black">{message.name}</span>
                      {message.subscribed && (
                        <span className="pill bg-brand-orange/10 text-[10px] text-brand-orangeDark">
                          subscriber
                        </span>
                      )}
                      <span className="text-[11px] text-brand-black/40">
                        {formatDateTime(message.timestamp)}
                      </span>
                    </div>
                    <p className="break-words text-sm text-brand-black/80">{message.text}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteMessage(message.id)}
                    aria-label={`Delete message from ${message.name}`}
                    className="rounded-full p-2 text-brand-black/30 transition hover:bg-red-50 hover:text-red-600"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m3 0-1 13a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1L6 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  )
}
