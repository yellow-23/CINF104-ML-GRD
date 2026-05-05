import { useEffect, useState } from 'react'
import { Wifi, WifiOff, Loader } from 'lucide-react'
import { checkHealth } from '../api/chat'

export default function StatusIndicator() {
  const [status, setStatus] = useState('checking')
  const [model, setModel]   = useState('')

  useEffect(() => {
    checkHealth()
      .then(data => {
        if (data.status === 'ok' && data.model_available) {
          setStatus('ok'); setModel(data.model)
        } else setStatus('error')
      })
      .catch(() => setStatus('error'))
  }, [])

  if (status === 'checking') return (
    <div className="flex items-center gap-1.5 text-xs text-white/30">
      <Loader className="w-3 h-3 animate-spin" />
      <span>Verificando...</span>
    </div>
  )

  if (status === 'ok') return (
    <div className="flex items-center gap-1.5 text-xs text-emerald-400/80">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
      </span>
      <span>{model} · conectado</span>
    </div>
  )

  return (
    <div className="flex items-center gap-1.5 text-xs text-red-400/70">
      <WifiOff className="w-3 h-3" />
      <span>Ollama desconectado</span>
    </div>
  )
}
