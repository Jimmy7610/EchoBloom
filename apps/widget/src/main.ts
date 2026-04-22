/**
 * EchoBloom Embeddable Widget
 * 
 * Usage: Add this to any page:
 * <script src="https://your-domain.com/echobloom-widget.iife.js" data-workspace-id="YOUR_WORKSPACE_ID" data-api-url="https://your-echobloom-app.com"></script>
 */

// -- Types --
interface Prompt {
  id: string
  workspace_id: string
  title: string
  question_text: string
  type: 'emoji' | 'rating' | 'text'
  trigger_type: string
}

// -- Config --
function getConfig() {
  const scriptTag = document.querySelector('script[data-workspace-id]') as HTMLScriptElement | null
  if (!scriptTag) {
    console.warn('[EchoBloom] No script tag with data-workspace-id found.')
    return null
  }
  return {
    workspaceId: scriptTag.getAttribute('data-workspace-id')!,
    apiUrl: scriptTag.getAttribute('data-api-url') || 'http://localhost:3000',
  }
}

// -- Session ID --
function getSessionId(): string {
  let sid = sessionStorage.getItem('eb_session_id')
  if (!sid) {
    sid = 'eb_' + Math.random().toString(36).substring(2, 15)
    sessionStorage.setItem('eb_session_id', sid)
  }
  return sid
}

// -- CSS --
const WIDGET_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

  :host {
    all: initial;
    font-family: 'Inter', system-ui, sans-serif;
  }

  .eb-overlay {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 2147483647;
    max-width: 380px;
    width: calc(100vw - 48px);
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
    border: 1px solid #e2e8f0;
    overflow: hidden;
    animation: eb-slide-in 0.3s ease-out;
  }

  @keyframes eb-slide-in {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes eb-slide-out {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(16px); }
  }

  .eb-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px 12px;
    border-bottom: 1px solid #f1f5f9;
  }

  .eb-brand {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 500;
    color: #94a3b8;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .eb-brand svg {
    width: 14px;
    height: 14px;
    color: #6366f1;
  }

  .eb-dismiss {
    background: none;
    border: none;
    cursor: pointer;
    color: #94a3b8;
    padding: 4px;
    border-radius: 6px;
    transition: all 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .eb-dismiss:hover {
    background: #f1f5f9;
    color: #64748b;
  }

  .eb-body {
    padding: 20px;
  }

  .eb-question {
    font-size: 16px;
    font-weight: 600;
    color: #1e293b;
    margin: 0 0 20px 0;
    line-height: 1.4;
  }

  /* Emoji picker */
  .eb-emoji-row {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-bottom: 16px;
  }

  .eb-emoji-btn {
    font-size: 28px;
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    cursor: pointer;
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s;
  }

  .eb-emoji-btn:hover {
    border-color: #6366f1;
    background: #eef2ff;
    transform: scale(1.08);
  }

  .eb-emoji-btn.selected {
    border-color: #6366f1;
    background: #eef2ff;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  }

  /* Rating */
  .eb-rating-row {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-bottom: 16px;
  }

  .eb-rating-btn {
    width: 48px;
    height: 48px;
    border-radius: 10px;
    border: 2px solid #e2e8f0;
    background: #f8fafc;
    font-size: 18px;
    font-weight: 600;
    color: #475569;
    cursor: pointer;
    transition: all 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .eb-rating-btn:hover {
    border-color: #6366f1;
    background: #eef2ff;
    color: #6366f1;
  }

  .eb-rating-btn.selected {
    border-color: #6366f1;
    background: #6366f1;
    color: #ffffff;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  }

  /* Text input */
  .eb-text-input {
    width: 100%;
    padding: 10px 14px;
    border: 1.5px solid #e2e8f0;
    border-radius: 10px;
    font-size: 14px;
    font-family: 'Inter', system-ui, sans-serif;
    color: #1e293b;
    background: #f8fafc;
    resize: vertical;
    min-height: 72px;
    transition: border-color 0.15s;
    box-sizing: border-box;
    margin-bottom: 16px;
  }

  .eb-text-input:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
  }

  .eb-text-input::placeholder {
    color: #94a3b8;
  }

  /* Submit button */
  .eb-submit {
    width: 100%;
    padding: 12px;
    background: #6366f1;
    color: #ffffff;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Inter', system-ui, sans-serif;
    cursor: pointer;
    transition: all 0.15s;
  }

  .eb-submit:hover {
    background: #4f46e5;
  }

  .eb-submit:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Thank you */
  .eb-thanks {
    text-align: center;
    padding: 32px 20px;
  }

  .eb-thanks-icon {
    font-size: 40px;
    margin-bottom: 12px;
  }

  .eb-thanks-title {
    font-size: 18px;
    font-weight: 600;
    color: #1e293b;
    margin: 0 0 6px 0;
  }

  .eb-thanks-subtitle {
    font-size: 14px;
    color: #64748b;
    margin: 0;
  }
`

const EMOJIS = [
  { value: 'angry', emoji: '😠' },
  { value: 'sad', emoji: '😞' },
  { value: 'neutral', emoji: '😐' },
  { value: 'happy', emoji: '😊' },
  { value: 'love', emoji: '😍' },
]

// -- Widget Class --
class EchoBloomWidget {
  private config: { workspaceId: string; apiUrl: string }
  private shadow: ShadowRoot | null = null
  private container: HTMLDivElement | null = null
  private selectedEmoji: string | null = null
  private selectedRating: number | null = null
  private prompt: Prompt | null = null

  constructor(config: { workspaceId: string; apiUrl: string }) {
    this.config = config
  }

  async init() {
    // Fetch active prompt
    try {
      const res = await fetch(
        `${this.config.apiUrl}/api/v1/prompts/active?workspaceId=${this.config.workspaceId}`
      )
      const data = await res.json()
      if (!data.prompt) return // No active prompt, silently do nothing
      this.prompt = data.prompt
    } catch (e) {
      console.warn('[EchoBloom] Failed to fetch prompt:', e)
      return
    }

    // Check if user already responded in this session
    const dismissedKey = `eb_dismissed_${this.prompt!.id}`
    if (sessionStorage.getItem(dismissedKey)) return

    this.render()
  }

  private render() {
    if (!this.prompt) return

    // Create shadow DOM host
    this.container = document.createElement('div')
    this.container.id = 'echobloom-widget-root'
    document.body.appendChild(this.container)
    this.shadow = this.container.attachShadow({ mode: 'open' })

    // Inject styles
    const style = document.createElement('style')
    style.textContent = WIDGET_CSS
    this.shadow.appendChild(style)

    // Build UI
    const overlay = document.createElement('div')
    overlay.className = 'eb-overlay'
    overlay.innerHTML = this.buildHTML()
    this.shadow.appendChild(overlay)

    // Attach event listeners
    this.attachListeners(overlay)
  }

  private buildHTML(): string {
    const p = this.prompt!

    let responseUI = ''

    if (p.type === 'emoji') {
      responseUI = `
        <div class="eb-emoji-row">
          ${EMOJIS.map(e => `<button class="eb-emoji-btn" data-emoji="${e.value}" title="${e.value}">${e.emoji}</button>`).join('')}
        </div>
      `
    } else if (p.type === 'rating') {
      responseUI = `
        <div class="eb-rating-row">
          ${[1, 2, 3, 4, 5].map(n => `<button class="eb-rating-btn" data-rating="${n}">${n}</button>`).join('')}
        </div>
      `
    }

    // Always show optional text for emoji/rating, or required text for text type
    const textPlaceholder = p.type === 'text' ? 'Share your thoughts...' : 'Add a comment (optional)'
    responseUI += `<textarea class="eb-text-input" placeholder="${textPlaceholder}"></textarea>`

    return `
      <div class="eb-header">
        <div class="eb-brand">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M7 20h10"/>
            <path d="M10 20c5.5-2.5.8-6.4 3-10"/>
            <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/>
            <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>
          </svg>
          EchoBloom
        </div>
        <button class="eb-dismiss" data-action="dismiss">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="eb-body">
        <p class="eb-question">${p.question_text}</p>
        ${responseUI}
        <button class="eb-submit" data-action="submit">Send Feedback</button>
      </div>
    `
  }

  private attachListeners(overlay: HTMLDivElement) {
    // Dismiss
    overlay.querySelector('[data-action="dismiss"]')?.addEventListener('click', () => {
      this.dismiss()
    })

    // Emoji buttons
    overlay.querySelectorAll('.eb-emoji-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        overlay.querySelectorAll('.eb-emoji-btn').forEach(b => b.classList.remove('selected'))
        btn.classList.add('selected')
        this.selectedEmoji = (btn as HTMLElement).dataset.emoji || null
      })
    })

    // Rating buttons
    overlay.querySelectorAll('.eb-rating-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        overlay.querySelectorAll('.eb-rating-btn').forEach(b => b.classList.remove('selected'))
        btn.classList.add('selected')
        this.selectedRating = parseInt((btn as HTMLElement).dataset.rating || '0', 10)
      })
    })

    // Submit
    overlay.querySelector('[data-action="submit"]')?.addEventListener('click', () => {
      this.submit(overlay)
    })
  }

  private async submit(overlay: HTMLDivElement) {
    const p = this.prompt!
    const textInput = this.shadow?.querySelector('.eb-text-input') as HTMLTextAreaElement
    const textValue = textInput?.value?.trim() || null
    const submitBtn = overlay.querySelector('.eb-submit') as HTMLButtonElement

    submitBtn.disabled = true
    submitBtn.textContent = 'Sending...'

    const payload: Record<string, unknown> = {
      prompt_id: p.id,
      workspace_id: p.workspace_id,
      session_id: getSessionId(),
    }

    if (p.type === 'emoji') payload.emoji_value = this.selectedEmoji
    if (p.type === 'rating') payload.rating_value = this.selectedRating
    if (textValue) payload.text_value = textValue

    try {
      await fetch(`${this.config.apiUrl}/api/v1/responses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } catch (e) {
      console.warn('[EchoBloom] Failed to submit response:', e)
    }

    // Show thank you
    const body = overlay.querySelector('.eb-body')!
    body.innerHTML = `
      <div class="eb-thanks">
        <div class="eb-thanks-icon">🌸</div>
        <p class="eb-thanks-title">Thank you!</p>
        <p class="eb-thanks-subtitle">Your feedback helps us improve.</p>
      </div>
    `

    // Mark as responded
    sessionStorage.setItem(`eb_dismissed_${p.id}`, 'true')

    // Auto-dismiss after 2.5s
    setTimeout(() => this.dismiss(), 2500)
  }

  private dismiss() {
    if (this.prompt) {
      sessionStorage.setItem(`eb_dismissed_${this.prompt.id}`, 'true')
    }
    const overlay = this.shadow?.querySelector('.eb-overlay') as HTMLElement
    if (overlay) {
      overlay.style.animation = 'eb-slide-out 0.2s ease-in forwards'
      setTimeout(() => {
        this.container?.remove()
      }, 200)
    } else {
      this.container?.remove()
    }
  }
}

// -- Bootstrap --
;(function () {
  const config = getConfig()
  if (!config) return

  // Wait for DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new EchoBloomWidget(config).init())
  } else {
    new EchoBloomWidget(config).init()
  }
})()
