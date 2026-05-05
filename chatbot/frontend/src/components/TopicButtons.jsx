import { motion } from 'framer-motion'
import { Grape, Bug, Droplets, ClipboardList, Thermometer, BadgeCheck } from 'lucide-react'

const TOPICS = [
  { icon: Grape,         label: 'Uva de mesa',       query: '¿Cuál es el ciclo fenológico de la uva de mesa y cuándo se hace la poda de invierno en la zona central?' },
  { icon: Bug,           label: 'Mosca de la fruta', query: '¿Qué es la mosca de la fruta y cuáles son los métodos de control integrado autorizados por el SAG?' },
  { icon: Droplets,      label: 'Riego paltos',       query: '¿Cómo calcular el requerimiento hídrico de un huerto de paltos de 10 hectáreas en Valparaíso durante enero?' },
  { icon: ClipboardList, label: 'Normativa laboral',  query: '¿Cuáles son los derechos laborales de un trabajador agrícola de temporada según el Código del Trabajo?' },
  { icon: Thermometer,   label: 'Heladas',            query: '¿Cuáles son las medidas de protección contra heladas tardías en un viñedo de la región del Maule?' },
  { icon: BadgeCheck,    label: 'GlobalGAP',          query: '¿Qué registros debe llevar un agricultor para obtener la certificación GlobalGAP?' },
]

export default function TopicButtons({ onSelect }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 px-6 py-4">
      {TOPICS.map(({ icon: Icon, label, query }, i) => (
        <motion.button
          key={label}
          onClick={() => onSelect(query)}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="
            relative flex items-center gap-1.5 px-3 py-1.5 text-xs
            bg-white/[0.03] hover:bg-white/[0.07]
            border border-white/[0.08] hover:border-emerald-500/40
            text-white/60 hover:text-white/90
            rounded-full transition-colors duration-200 overflow-hidden
          "
        >
          <Icon className="w-3 h-3" />
          <span>{label}</span>
          <motion.span
            className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-emerald-500 to-green-400"
            initial={{ width: 0 }}
            whileHover={{ width: '100%' }}
            transition={{ duration: 0.25 }}
          />
        </motion.button>
      ))}
    </div>
  )
}
