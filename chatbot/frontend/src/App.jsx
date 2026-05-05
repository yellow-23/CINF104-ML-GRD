import { useState } from 'react'
import { motion } from 'framer-motion'
import { Leaf } from 'lucide-react'
import { sendMessage } from './api/chat'
import StatusIndicator from './components/StatusIndicator'
import TopicButtons    from './components/TopicButtons'
import ChatWindow      from './components/ChatWindow'
import InputBar        from './components/InputBar'

export default function App() {
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)

  async function handleSend(text) {
    if (!text.trim() || isTyping) return
    const newMessages = [...messages, { role: 'user', content: text }]
    setMessages(newMessages)
    setIsTyping(true)
    try {
      const reply = await sendMessage(newMessages)
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '⚠️ Error de conexión. Verifica que Flask esté corriendo.',
      }])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="h-screen flex flex-col relative overflow-hidden" style={{ background: '#050d05' }}>

      {/* Blobs decorativos de fondo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/8 rounded-full filter blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-600/8 rounded-full filter blur-[128px] animate-pulse" style={{ animationDelay: '0.7s' }} />
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-teal-500/6 rounded-full filter blur-[96px] animate-pulse" style={{ animationDelay: '1.2s' }} />
      </div>

      <motion.header
        className="relative z-10 flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.06] backdrop-blur-sm bg-white/[0.01]"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
          <Leaf className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="flex-1">
          <h1 className="text-sm font-semibold text-white/90 leading-none mb-0.5">AgroBot</h1>
          <p className="text-xs text-white/30">Asesor Agrícola Chileno</p>
        </div>
        <StatusIndicator />
      </motion.header>

      <div className="relative z-10 border-b border-white/[0.04]">
        <TopicButtons onSelect={handleSend} />
      </div>

      <div className="relative z-10 flex-1 min-h-0">
        <ChatWindow messages={messages} isTyping={isTyping} />
      </div>

      <div className="relative z-10">
        <InputBar onSend={handleSend} disabled={isTyping} />
      </div>

      <div className="relative z-10 text-center text-xs text-white/15 pb-2">
        CINF104 · Universidad Andrés Bello 2026 · AgroBot puede cometer errores
      </div>

    </div>
  )
}
