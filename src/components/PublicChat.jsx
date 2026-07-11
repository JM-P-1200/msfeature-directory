import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { seedMessages } from '../data/seedMessages.js'

const ADJECTIVES = ['Swift', 'Bright', 'Calm', 'Bold', 'Nimble', 'Sunny', 'Quiet', 'Brisk']
const NOUNS = ['Falcon', 'Otter', 'Comet', 'Maple', 'Harbor', 'Ember', 'Pixel', 'Willow']

function randomGuestName() {
  const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)]
  const suffix = Math.floor(Math.random() * 90 + 10)
  return `${adjective}${noun}${suffix}`
}

function makeId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

export default function PublicChat() {
  const [profile, setProfile] = useLocalStorage('ms-feature-profile', null)
  const [messages, setMessages] = useLocalStorage('ms-feature-chat-messages', seedMessages)
  const [draft, setDraft] = useState('')
  const [nameDraft, setNameDraft] = useState('')
  const [editingName, setEditingName] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (!profile) {
      const name = randomGuestName()
      setProfile({ id: makeId(), name, subscribed: false })
      setNameDraft(name)
    } else {
      setNameDraft(profile.name)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages.length])

  const sortedMessages = useMemo(
    () => [...messages].sort((a, b) => a.timestamp - b.timestamp),
    [messages]
  )

  if (!profile) return null

  function toggleSubscribe() {
    setProfile((prev) => ({ ...prev, subscribed: !prev.subscribed }))
  }

  function saveName() {
    const trimmed = nameDraft.trim()
    if (trimmed) setProfile((prev) => ({ ...prev, name: trimmed }))
    setEditingName(false)
  }

  function sendMessage(e) {
    e.preventDefault()
    const text = draft.trim()
    if (!text || !profile.subscribed) return
    setMessages((prev) => [
      ...prev,
      {
        id: makeId(),
        name: profile.name,
        text,
        subscribed: true,
        timestamp: Date.now(),
      },
    ])
    setDraft('')
  }

  return (
    <div className="overflow-hidden rounded-xl2 border border-black/5 bg-white shadow-cardHover">
      <div className="flex items-center justify-between gap-4 border-b border-black/5 bg-brand-black px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-orange opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-orange" />
          </span>
          <div>
            <p className="text-sm font-bold text-white">#random — public chat</p>
            <p className="text-xs text-white/50">Everyone can read. Subscribers can post.</p>
          </div>
        </div>
        <span className="pill bg-white/10 text-white">{sortedMessages.length} messages</span>
      </div>

      <div ref={scrollRef} className="flex h-80 flex-col gap-4 overflow-y-auto px-6 py-5 sm:h-96">
        {sortedMessages.map((message) => (
          <div key={message.id} className="flex gap-3">
            <div
              className={`flex h-8 w-8 flex-none items-center justify-center rounded-full text-xs font-bold text-white ${
                message.subscribed ? 'bg-brand-orange' : 'bg-brand-black/30'
              }`}
              aria-hidden
            >
              {message.name.slice(0, 1).toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-sm font-semibold text-brand-black">{message.name}</span>
                {message.subscribed && (
                  <span className="pill bg-brand-orange/10 text-[10px] text-brand-orangeDark">
                    subscriber
                  </span>
                )}
                <span className="text-[11px] text-brand-black/40">{formatTime(message.timestamp)}</span>
              </div>
              <p className="break-words text-sm text-brand-black/80">{message.text}</p>
            </div>
          </div>
        ))}
        {sortedMessages.length === 0 && (
          <p className="m-auto text-sm text-brand-black/40">No messages yet. Be the first to say hi.</p>
        )}
      </div>

      <div className="border-t border-black/5 bg-brand-black/[0.02] px-6 py-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs text-brand-black/60">
            <span>Posting as</span>
            {editingName ? (
              <input
                autoFocus
                value={nameDraft}
                onChange={(e) => setNameDraft(e.target.value)}
                onBlur={saveName}
                onKeyDown={(e) => e.key === 'Enter' && saveName()}
                maxLength={24}
                className="rounded-md border border-black/10 px-2 py-1 text-xs font-semibold text-brand-black outline-none focus:border-brand-orange"
              />
            ) : (
              <button
                type="button"
                onClick={() => setEditingName(true)}
                className="font-semibold text-brand-black underline decoration-dotted underline-offset-2"
              >
                {profile.name}
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={toggleSubscribe}
            className={
              profile.subscribed
                ? 'pill border border-black/10 bg-white text-brand-black/70 hover:border-black/20'
                : 'pill bg-brand-orange text-white hover:bg-brand-orangeDark'
            }
          >
            {profile.subscribed ? 'Subscribed ✓ — click to leave' : 'Subscribe to chat'}
          </button>
        </div>

        <form onSubmit={sendMessage} className="flex items-center gap-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            disabled={!profile.subscribed}
            placeholder={
              profile.subscribed
                ? 'Say something to the community…'
                : 'Subscribe above to unlock posting'
            }
            maxLength={280}
            className="flex-1 rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm text-brand-black outline-none transition placeholder:text-brand-black/30 focus:border-brand-orange disabled:cursor-not-allowed disabled:bg-black/5"
          />
          <button
            type="submit"
            disabled={!profile.subscribed || !draft.trim()}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            Send
          </button>
        </form>
        <p className="mt-2 text-[11px] text-brand-black/40">
          Demo mode: subscription and messages are simulated and stored only in this browser's
          local storage.
        </p>
      </div>
    </div>
  )
}
