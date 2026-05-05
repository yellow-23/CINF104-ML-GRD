import { motion } from 'framer-motion'
import { Leaf } from 'lucide-react'

export default function TypingIndicator() {
  return (
    <motion.div
      className="flex gap-3"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-7 h-7 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-shrink-0 mt-0.5">
        <Leaf className="w-3.5 h-3.5 text-emerald-400" />
      </div>
      <div className="bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center">
        {[0, 1, 2].map(i => (
          <span
            key={i}
            className="typing-dot w-1.5 h-1.5 rounded-full bg-emerald-400/70 block"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </motion.div>
  )
}
