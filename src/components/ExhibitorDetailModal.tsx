import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  MapPin,
  Calendar,
  Sparkles,
  Phone,
  Mail,
  Globe,
  Instagram,
  Linkedin,
  Facebook,
  Music2,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Share2,
  Check,
  CheckCircle2,
  Zap,
  Armchair,
  Layers,
  Lock,
  Quote,
  ShieldCheck,
} from 'lucide-react';
import { Exhibitor } from '../types';
import { STAND_COORDINATES } from '../data/standsData';
import { ExhibitorLogo } from './ExhibitorLogo';

interface ExhibitorDetailModalProps {
  exhibitor: Exhibitor | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectStand: (standId: string) => void;
  onEditExhibitor: (exhibitor: Exhibitor) => void;
  totalStands: number;
  isAdmin?: boolean;
  onRequestAdminLogin?: () => void;
}

export const ExhibitorDetailModal: React.FC<ExhibitorDetailModalProps> = ({
  exhibitor,
  isOpen,
  onClose,
  onSelectStand,
  onEditExhibitor,
  isAdmin = false,
  onRequestAdminLogin,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen || !exhibitor) return null;

  const currentNum = parseInt(exhibitor.standNumber, 10);
  const prevStandId = String(currentNum > 1 ? currentNum - 1 : 15).padStart(2, '0');
  const nextStandId = String(currentNum < 15 ? currentNum + 1 : 1).padStart(2, '0');
  const coord = STAND_COORDINATES[exhibitor.id];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `Feria de Emprendimiento - Stand ${exhibitor.standNumber}: ${exhibitor.name} (${exhibitor.category})`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
        {/* Backdrop click */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 320 }}
          className="relative z-10 w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Banner */}
          <div
            className="relative px-6 py-5 text-white overflow-hidden transition-colors"
            style={{
              background: `linear-gradient(135deg, ${exhibitor.categoryColor} 0%, #0f172a 120%)`,
            }}
          >
            {/* Background geometric accents */}
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top Toolbar: Navigation on left, actions on right (No overlapping) */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-white/15 relative z-10">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/25 backdrop-blur-md text-xs font-medium text-white/90 border border-white/10">
                  <MapPin className="w-3.5 h-3.5 text-amber-300" />
                  <span>{coord ? coord.zone : `Espacio ${exhibitor.standNumber}`}</span>
                </div>
                <div className="flex items-center gap-1 bg-black/25 px-2.5 py-1 rounded-full backdrop-blur-md text-xs border border-white/10">
                  <button
                    type="button"
                    onClick={() => onSelectStand(prevStandId)}
                    className="hover:text-white text-white/80 transition-colors p-0.5"
                    title="Stand anterior"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-bold tracking-wider px-1 text-white">STAND {exhibitor.standNumber}</span>
                  <button
                    type="button"
                    onClick={() => onSelectStand(nextStandId)}
                    className="hover:text-white text-white/80 transition-colors p-0.5"
                    title="Stand siguiente"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  title="Copiar datos del stand"
                  className="px-3 py-1.5 rounded-xl bg-black/25 hover:bg-black/40 text-white transition-colors backdrop-blur-sm border border-white/10 flex items-center gap-1.5 text-xs font-medium"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">{copied ? 'Copiado' : 'Compartir'}</span>
                </button>
                {isAdmin ? (
                  <button
                    type="button"
                    onClick={() => onEditExhibitor(exhibitor)}
                    title="Editar información (Administrador)"
                    className="px-3 py-1.5 rounded-xl bg-black/25 hover:bg-black/40 text-white transition-colors backdrop-blur-sm border border-white/10 flex items-center gap-1.5 text-xs font-medium"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-sky-300" />
                    <span className="hidden sm:inline">Editar</span>
                  </button>
                ) : onRequestAdminLogin ? (
                  <button
                    type="button"
                    onClick={onRequestAdminLogin}
                    title="Edición restringida al administrador"
                    className="px-3 py-1.5 rounded-xl bg-black/25 hover:bg-black/40 text-white/70 hover:text-white transition-colors backdrop-blur-sm border border-white/10 flex items-center gap-1.5 text-xs font-medium"
                  >
                    <Lock className="w-3.5 h-3.5 text-amber-300" />
                    <span className="hidden sm:inline">Modo Consulta</span>
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={onClose}
                  title="Cerrar ventana"
                  className="p-1.5 rounded-xl bg-black/25 hover:bg-black/40 text-white transition-colors backdrop-blur-sm border border-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Stand Title & Slogan Area */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5 relative z-10">
              <div className="flex items-center gap-3 shrink-0">
                <ExhibitorLogo
                  exhibitor={exhibitor}
                  size="xl"
                  showStandNumber={true}
                  className="shadow-2xl ring-4 ring-white/30"
                />
                <div className="sm:hidden flex flex-col">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white/70">
                    Stand #{exhibitor.standNumber}
                  </span>
                  <span className="text-xs font-semibold text-white/90">
                    {coord?.zone}
                  </span>
                </div>
              </div>

              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-md border border-white/15">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    {exhibitor.category}
                  </div>
                  <div className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-black/20 text-white/90 border border-white/10">
                    <MapPin className="w-3 h-3 text-amber-300" />
                    Stand #{exhibitor.standNumber}
                  </div>
                </div>

                {/* Nombre del Emprendimiento (Visible al 100%, sin truncamiento) */}
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                  {exhibitor.name || `Stand #${exhibitor.standNumber} (Disponible)`}
                </h2>

                {/* Eslogan del Emprendimiento (Destacado y 100% visible) */}
                {exhibitor.slogan ? (
                  <div className="inline-flex items-start gap-2.5 px-4 py-2.5 rounded-2xl bg-black/30 backdrop-blur-md border border-white/20 text-white max-w-full shadow-inner">
                    <Quote className="w-4 h-4 text-amber-300 shrink-0 mt-0.5 rotate-180" />
                    <p className="text-sm sm:text-base font-medium italic leading-relaxed text-amber-50">
                      «{exhibitor.slogan}»
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {/* Scrollable Modal Body */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700">
            {/* Emprendimiento & Slogan Overview Banner with Logo */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-50 via-blue-50/30 to-slate-50 border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Identificación del Emprendimiento
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-200/80 text-slate-700">
                  Stand #{exhibitor.standNumber} • {coord?.zone || 'Feria'}
                </span>
              </div>

              <div className="flex items-center gap-3.5">
                <ExhibitorLogo
                  exhibitor={exhibitor}
                  size="lg"
                  className="ring-2 ring-slate-200/90 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Marca Oficial
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                    {exhibitor.name || `Stand #${exhibitor.standNumber} (Disponible)`}
                  </h3>
                </div>
              </div>

              {exhibitor.slogan ? (
                <div className="pt-2.5 border-t border-slate-200/70 flex items-start gap-2">
                  <Quote className="w-4 h-4 text-blue-600 shrink-0 mt-0.5 rotate-180" />
                  <div>
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Eslogan Oficial
                    </div>
                    <p className="text-sm sm:text-base font-medium text-slate-800 italic leading-relaxed">
                      "{exhibitor.slogan}"
                    </p>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Description */}
            {exhibitor.description ? (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Acerca del Emprendimiento
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {exhibitor.description}
                </p>
              </div>
            ) : null}

            {/* Founder Info & Category */}
            <div className={`grid grid-cols-1 ${exhibitor.founder?.name ? 'sm:grid-cols-2' : ''} gap-3`}>
              {exhibitor.founder?.name ? (
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm shrink-0">
                    {exhibitor.founder.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Liderazgo & Equipo</div>
                    <div className="text-sm font-semibold text-slate-800">{exhibitor.founder.name}</div>
                    {exhibitor.founder.role && (
                      <div className="text-xs text-slate-500">{exhibitor.founder.role}</div>
                    )}
                  </div>
                </div>
              ) : null}

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
                  style={{ backgroundColor: exhibitor.categoryColor }}
                >
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Espacio Asignado</div>
                  <div className="text-sm font-semibold text-slate-800">{exhibitor.spaceType}</div>
                  <div className="text-xs text-slate-500">Stand #{exhibitor.standNumber} • Plano v03</div>
                </div>
              </div>
            </div>

            {/* Featured Products / Services */}
            {exhibitor.products && exhibitor.products.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Productos y Servicios Destacados
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {exhibitor.products.map((prod, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white border border-slate-200/80 hover:border-slate-300 transition-colors shadow-xs flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs font-medium text-slate-700 leading-snug">{prod}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stand Amenities (Equipamiento del Stand) - Visible exclusivamente para el usuario Administrador */}
            {isAdmin && exhibitor.amenities && exhibitor.amenities.length > 0 && (
              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100/90 shadow-2xs">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-950 flex items-center gap-1.5">
                    <Armchair className="w-3.5 h-3.5 text-indigo-600" />
                    Equipamiento del Stand
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-700 bg-indigo-100/80 px-2 py-0.5 rounded-full border border-indigo-200">
                    <ShieldCheck className="w-3 h-3 text-indigo-600" />
                    Solo Administrador
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {exhibitor.amenities.map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium bg-white text-indigo-900 border border-indigo-200/80 shadow-2xs"
                    >
                      <Zap className="w-3 h-3 text-amber-500" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Schedule / Agenda */}
            {exhibitor.schedule && exhibitor.schedule.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-sky-500" />
                  Agenda de Pitches y Demostraciones
                </h3>
                <div className="space-y-2">
                  {exhibitor.schedule.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-sky-50/70 border border-sky-100 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="px-2 py-0.5 rounded-md bg-sky-200 text-sky-900 font-bold">
                          {item.time}
                        </span>
                        <span className="font-semibold text-slate-800">{item.title}</span>
                      </div>
                      <span className="text-slate-500 font-medium hidden sm:inline-block">
                        {item.location}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Channels */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Canales de Contacto Directo
                </h3>
                <span className="text-[11px] text-slate-400 font-normal">Redes sociales y mensajería oficial</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {exhibitor.contact.phone && (
                  <a
                    href={`https://wa.me/${exhibitor.contact.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/70 text-xs font-semibold transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">WhatsApp</span>
                  </a>
                )}
                {exhibitor.contact.email && (
                  <a
                    href={`mailto:${exhibitor.contact.email}`}
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200/70 text-xs font-semibold transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">Email</span>
                  </a>
                )}
                {exhibitor.contact.website && (
                  <a
                    href={exhibitor.contact.website.startsWith('http') ? exhibitor.contact.website : `https://${exhibitor.contact.website}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300/70 text-xs font-semibold transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                    <span className="truncate">Sitio Web</span>
                  </a>
                )}
                {exhibitor.contact.instagram && (
                  <a
                    href={
                      exhibitor.contact.instagram.startsWith('http')
                        ? exhibitor.contact.instagram
                        : `https://instagram.com/${exhibitor.contact.instagram.replace('@', '')}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-800 border border-pink-200/70 text-xs font-semibold transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                    <span className="truncate">Instagram</span>
                  </a>
                )}
                {exhibitor.contact.tiktok && (
                  <a
                    href={
                      exhibitor.contact.tiktok.startsWith('http')
                        ? exhibitor.contact.tiktok
                        : `https://www.tiktok.com/@${exhibitor.contact.tiktok.replace('@', '')}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-900 hover:bg-black text-white border border-slate-700 text-xs font-semibold transition-colors shadow-xs"
                    title={`TikTok: ${exhibitor.contact.tiktok}`}
                  >
                    <Music2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate">TikTok</span>
                  </a>
                )}
                {exhibitor.contact.facebook && (
                  <a
                    href={
                      exhibitor.contact.facebook.startsWith('http')
                        ? exhibitor.contact.facebook
                        : `https://www.facebook.com/${exhibitor.contact.facebook.replace('@', '')}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200/70 text-xs font-semibold transition-colors"
                    title={`Facebook: ${exhibitor.contact.facebook}`}
                  >
                    <Facebook className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span className="truncate">Facebook</span>
                  </a>
                )}
                {exhibitor.contact.linkedin && (
                  <a
                    href={
                      exhibitor.contact.linkedin.startsWith('http')
                        ? exhibitor.contact.linkedin
                        : `https://linkedin.com/${exhibitor.contact.linkedin.replace(/^\//, '')}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200/70 text-xs font-semibold transition-colors col-span-2 sm:col-span-1"
                    title={`LinkedIn: ${exhibitor.contact.linkedin}`}
                  >
                    <Linkedin className="w-3.5 h-3.5 text-sky-700 shrink-0" />
                    <span className="truncate">LinkedIn</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onSelectStand(prevStandId)}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 flex items-center gap-1 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Stand {prevStandId}
              </button>
              <button
                type="button"
                onClick={() => onSelectStand(nextStandId)}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 flex items-center gap-1 transition-colors"
              >
                Stand {nextStandId}
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              {isAdmin ? (
                <button
                  type="button"
                  onClick={() => onEditExhibitor(exhibitor)}
                  className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Editar Toda la Información</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onRequestAdminLogin}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
                  title="La edición está restringida al usuario administrador"
                >
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Modo Consulta</span>
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
              >
                Cerrar Detalle
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
