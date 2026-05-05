import { motion } from 'framer-motion'
import { User, Leaf } from 'lucide-react'

function formatText(text) {
  return text.split('\n').map((line, i, arr) => {
    const parts = line.split(/\*\*(.*?)\*\*/g)
    return (
      <span key={i}>
        {parts.map((part, j) =>
          j % 2 === 1
            ? <strong key={j} className="font-semibold text-emerald-300">{part}</strong>
            : part
        )}
        {i < arr.length - 1 && <br />}
      </span>
    )
  })
}

export default function MessageBubble({ role, content }) {
  const isUser = role === 'user'

  return (
    <motion.div
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {/* Avatar */}
      <div className={`
        w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
        ${isUser
          ? 'bg-emerald-500/20 border border-emerald-500/30'
          : 'bg-white/[0.05] border border-white/[0.08]'}
      `}>
        {isUser
          ? <User className="w-3.5 h-3.5 text-emerald-400" />
          : <Leaf className="w-3.5 h-3.5 text-emerald-400" />
        }
      </div>

      {/* Burbuja */}
      <div className={`
        max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed
        ${isUser
          ? 'bg-emerald-500/20 text-white/90 border border-emerald-500/20 rounded-br-sm'
          : 'bg-white/[0.04] text-white/80 border border-white/[0.06] rounded-bl-sm backdrop-blur-sm'
        }
      `}>
        {formatText(content)}
      </div>
    </motion.div>
  )
}
