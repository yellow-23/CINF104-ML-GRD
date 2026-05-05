import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Loader2 } from 'lucide-react'

export default function InputBar({ onSend, disabled }) {
  const ref = useRef(null)
  const [focused, setFocused]  = useState(false)
  const [hasText, setHasText]  = useState(false)

  function handleSend() {
    const text = ref.current.value.trim()
    if (!text || disabled) return
    onSend(text)
    ref.current.value = ''
    ref.current.style.height = 'auto'
    setHasText(false)
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  function handleInput() {
    const el = ref.current
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 120) + 'px'
    setHasText(el.value.trim().length > 0)
  }

  return (
    <div className="px-4 pb-4 pt-2">
      <motion.div
        className="relative backdrop-blur-xl bg-white/[0.03] rounded-2xl border shadow-2xl overflow-hidden"
        animate={{ borderColor: focused ? 'rgba(52,211,153,0.25)' : 'rgba(255,255,255,0.07)' }}
      >
        <AnimatePresence>
          {focused && (
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ boxShadow: 'inset 0 0 40px rgba(52,211,153,0.04)' }}
            />
          )}
        </AnimatePresence>

        <div className="px-4 pt-3 pb-1">
          <textarea
            ref={ref} rows={1} disabled={disabled}
            placeholder="Escribe tu pregunta agrícola aquí..."
            onKeyDown={handleKey} onInput={handleInput}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            className="w-full resize-none outline-none bg-transparent text-sm text-white/90 placeholder-white/20 leading-relaxed min-h-[44px] max-h-28 disabled:opacity-40"
          />
        </div>

        <div className="px-3 pb-3 flex items-center justify-between">
          <span className="text-xs text-white/20 pl-1">Enter · Shift+Enter nueva línea</span>
          <motion.button
            onClick={handleSend} disabled={disabled || !hasText}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-all
              ${hasText && !disabled
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                : 'bg-white/[0.05] text-white/30 cursor-not-allowed'}`}
          >
            {disabled ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span>{disabled ? 'Pensando...' : 'Enviar'}</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
