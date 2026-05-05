import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sprout } from 'lucide-react'
import MessageBubble   from './MessageBubble'
import TypingIndicator from './TypingIndicator'

function Welcome() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full text-center px-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5">
        <Sprout className="w-8 h-8 text-emerald-400" />
      </div>
      <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/40 mb-2">
        ¿En qué puedo ayudarte hoy?
      </h2>
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent mb-3"
        initial={{ width: 0 }}
        animate={{ width: 192 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      />
      <p className="text-sm text-white/30 leading-relaxed max-w-xs">
        Soy tu asesor especializado en agricultura chilena.<br />
        Pregúntame sobre cultivos, plagas, riego, fertilización,<br />
        normativa laboral y más.
      </p>
    </motion.div>
  )
}

export default function ChatWindow({ messages, isTyping }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 min-h-0 h-full">
      <AnimatePresence>
        {messages.length === 0 && !isTyping
          ? <Welcome key="welcome" />
          : (
            <>
              {messages.map((msg, i) => (
                <MessageBubble key={i} role={msg.role} content={msg.content} />
              ))}
              <AnimatePresence>
                {isTyping && <TypingIndicator key="typing" />}
              </AnimatePresence>
              <div ref={bottomRef} />
            </>
          )
        }
      </AnimatePresence>
    </div>
  )
}
