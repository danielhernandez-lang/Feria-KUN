import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ShieldCheck,
  Eye,
  EyeOff,
  Lock,
  Mail,
  KeyRound,
  AlertCircle,
  CheckCircle2,
  User,
  LogOut,
  Sparkles,
  Info,
} from 'lucide-react';
import { AppUser, OWNER_ADMIN_EMAIL, OWNER_ADMIN_PASSWORD } from '../types';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: AppUser;
  onLoginAsAdmin: (email: string, password: string) => boolean;
  onSwitchToViewer: () => void;
  showToast: (msg: string) => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginAsAdmin,
  onSwitchToViewer,
  showToast,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setPassword('');
      setErrorMsg(null);
      setSuccessMsg(null);
      setShowPassword(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setErrorMsg('Por favor ingrese el correo electrónico del administrador.');
      return;
    }

    if (!password) {
      setErrorMsg('Por favor ingrese la contraseña del administrador.');
      return;
    }

    // Check if the user attempting to log in is the owner
    if (cleanEmail !== OWNER_ADMIN_EMAIL.toLowerCase()) {
      setErrorMsg(
        `Acceso denegado: El correo "${email}" no cuenta con privilegios de administración. Los demás usuarios tienen acceso en modo de solo consultas.`
      );
      return;
    }

    // Validate owner password
    if (password !== OWNER_ADMIN_PASSWORD) {
      setErrorMsg(
        'Contraseña incorrecta. Por favor verifique e ingrese la contraseña asignada para el administrador.'
      );
      return;
    }

    // Success verification for the owner
    const success = onLoginAsAdmin(cleanEmail, password);
    if (success) {
      setSuccessMsg(`¡Bienvenido! Permisos plenos de edición activados.`);
      showToast('Permisos plenos de edición activados como Administrador.');
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  };

  const handleSwitchToConsulta = () => {
    onSwitchToViewer();
    showToast('Has cambiado al modo de solo consultas (Visitante).');
    onClose();
  };

  const isAdmin = currentUser.role === 'admin';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 320 }}
          className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold tracking-tight">Control de Acceso & Permisos</h2>
                <p className="text-xs text-slate-300">Roles y privilegios de la plataforma</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-5 text-xs text-slate-700">
            {/* Roles Info Box */}
            <div className="space-y-2.5">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>1. Administrador (Plenos Permisos)</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Propietario
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Exclusivo para el usuario administrador autorizado. Habilita la edición y modificación de todos los datos de los 15 expositores, productos, agenda, contactos y sincronización con Google Sheets.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <Eye className="w-4 h-4 text-blue-600" />
                    <span>2. Usuario de Solo Consultas</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                    Público / Visitantes
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Para todos los demás usuarios que accedan a la aplicación. Permite consultar el plano interactivo, visualizar detalles de stands y descargar reportes, sin permisos de modificación.
                </p>
              </div>
            </div>

            {/* Current Active Status */}
            <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-700" />
                <div>
                  <span className="text-slate-500">Sesión actual: </span>
                  <span className="font-bold text-slate-900">
                    {isAdmin ? 'Administrador' : 'Usuario Consulta'}
                  </span>
                </div>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  isAdmin ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {isAdmin ? 'Edición Habilitada' : 'Solo Lectura'}
              </span>
            </div>

            {/* Admin Login Form or Logout */}
            {!isAdmin ? (
              <form onSubmit={handleAdminSubmit} className="space-y-4 pt-1">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    Correo del Administrador
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="correo@cun.edu.co"
                      autoComplete="username email"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Ingresa el correo institucional autorizado para acceder a los permisos de administración.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    Contraseña del Administrador
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Ingresa la contraseña asignada"
                      autoComplete="current-password"
                      className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 p-1 text-slate-400 hover:text-slate-600 transition-colors"
                      title={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    La contraseña no se almacena preescrita y debe ser ingresada por el usuario para validar los permisos.
                  </p>
                </div>

                {/* Error Banner */}
                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2 leading-relaxed">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Success Banner */}
                {successMsg && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{successMsg}</span>
                  </div>
                )}

                {/* Action buttons */}
                <div className="space-y-2 pt-1">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Validar e Iniciar como Administrador</span>
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors text-center"
                  >
                    Continuar en Modo Consulta
                  </button>
                </div>
              </form>
            ) : (
              /* Already Admin */
              <div className="space-y-4 pt-1">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-xs text-emerald-950">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Sesión de Administrador Activa</span>
                  </div>
                  <p className="text-[11px] text-emerald-900/90 leading-relaxed">
                    Has iniciado sesión como <strong>{OWNER_ADMIN_EMAIL}</strong>. Tienes permisos plenos para editar todos los stands, productos, horarios y configuraciones de la feria.
                  </p>
                </div>

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={handleSwitchToConsulta}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-slate-300"
                  >
                    <Eye className="w-3.5 h-3.5 text-blue-600" />
                    <span>Cambiar a Modo Consulta (Solo Lectura)</span>
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full py-2 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors"
                  >
                    Listo, mantener permisos de edición
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
