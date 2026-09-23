import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Layers,
  MapPin,
  Calendar,
  Building2,
  Info,
  CheckCircle2,
  ArrowRight,
  Printer,
  ChevronRight,
  ExternalLink,
  Edit3,
  ShieldCheck,
  Eye,
  Lock,
  FileSpreadsheet,
  RotateCcw,
} from 'lucide-react';
import {
  Exhibitor,
  FacilityType,
  AppUser,
  OWNER_ADMIN_EMAIL,
  OWNER_ADMIN_PASSWORD,
} from './types';
import {
  INITIAL_EXHIBITORS,
  getStoredExhibitors,
  saveStoredExhibitors,
  STAND_COORDINATES,
} from './data/standsData';
import { FloorPlanSvg } from './components/FloorPlanSvg';
import { FloorPlanControls } from './components/FloorPlanControls';
import { ExhibitorDetailModal } from './components/ExhibitorDetailModal';
import { EditExhibitorModal } from './components/EditExhibitorModal';
import { ExhibitorCardView } from './components/ExhibitorCardView';
import { ExhibitorLogo } from './components/ExhibitorLogo';
import { CunLogo } from './components/CunLogo';
import { GoogleSheetsModal } from './components/GoogleSheetsModal';
import { AdminAuthModal } from './components/AdminAuthModal';

const SESSION_AUTH_KEY = 'cun_floorplan_admin_active';

const DEFAULT_VIEWER: AppUser = {
  email: 'visitante@cun.edu.co',
  name: 'Usuario Consulta',
  role: 'viewer',
  isOwner: false,
};

const OWNER_USER: AppUser = {
  email: OWNER_ADMIN_EMAIL,
  name: 'Daniel Hernández Gómez',
  role: 'admin',
  isOwner: true,
};

function getInitialUser(): AppUser {
  try {
    const isSessionActive = sessionStorage.getItem(SESSION_AUTH_KEY) === 'true';
    if (isSessionActive) {
      return OWNER_USER;
    }
  } catch (e) {
    console.error('Error loading session:', e);
  }
  return DEFAULT_VIEWER;
}

export default function App() {
  const [exhibitors, setExhibitors] = useState<Exhibitor[]>(getStoredExhibitors);
  const [selectedStandId, setSelectedStandId] = useState<string | null>('01');
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [hoveredStandId, setHoveredStandId] = useState<string | null>(null);

  // User Role & Admin Authentication
  const [currentUser, setCurrentUser] = useState<AppUser>(getInitialUser);
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState<boolean>(false);

  const isAdmin =
    currentUser.role === 'admin' &&
    currentUser.email.toLowerCase() === OWNER_ADMIN_EMAIL.toLowerCase();

  const handleLoginAsAdmin = (email: string, passwordInput: string): boolean => {
    if (
      email.trim().toLowerCase() === OWNER_ADMIN_EMAIL.toLowerCase() &&
      passwordInput === OWNER_ADMIN_PASSWORD
    ) {
      setCurrentUser(OWNER_USER);
      try {
        sessionStorage.setItem(SESSION_AUTH_KEY, 'true');
      } catch (e) {}
      return true;
    }
    return false;
  };

  const handleSwitchToViewer = () => {
    setCurrentUser(DEFAULT_VIEWER);
    try {
      sessionStorage.removeItem(SESSION_AUTH_KEY);
    } catch (e) {}
  };

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeFacility, setActiveFacility] = useState<FacilityType | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'directory'>('map');

  // Zoom level for map
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Google Sheets modal
  const [isSheetsModalOpen, setIsSheetsModalOpen] = useState<boolean>(false);

  // Edit modal
  const [editingExhibitor, setEditingExhibitor] = useState<Exhibitor | null>(null);

  // Toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Categories list
  const categories = useMemo(() => {
    const set = new Set<string>();
    exhibitors.forEach((e) => {
      const cat = (e.category || '').trim();
      if (cat) {
        set.add(cat);
      }
    });
    return Array.from(set);
  }, [exhibitors]);

  // Filtered exhibitors
  const filteredExhibitors = useMemo(() => {
    return exhibitors.filter((exhibitor) => {
      // Search term
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase().trim();
        const matchesNum =
          exhibitor.standNumber.includes(term) || `stand ${exhibitor.standNumber}`.includes(term);
        const matchesName = (exhibitor.name || '').toLowerCase().includes(term);
        const matchesCat = (exhibitor.category || '').toLowerCase().includes(term);
        const matchesFounder = (exhibitor.founder?.name || '').toLowerCase().includes(term);
        const matchesProducts = (exhibitor.products || []).some((p) => p.toLowerCase().includes(term));
        if (!(matchesNum || matchesName || matchesCat || matchesFounder || matchesProducts)) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory && (exhibitor.category || '').trim() !== selectedCategory.trim()) {
        return false;
      }

      return true;
    });
  }, [exhibitors, searchTerm, selectedCategory]);

  const selectedExhibitor = useMemo(() => {
    return exhibitors.find((e) => e.id === selectedStandId) || null;
  }, [exhibitors, selectedStandId]);

  // Handlers
  const handleSelectStand = (standId: string, openModal: boolean = true) => {
    setSelectedStandId(standId);
    if (openModal) {
      setIsDetailModalOpen(true);
    }
  };

  const handleToggleFacility = (f: FacilityType) => {
    setActiveFacility((prev) => (prev === f ? null : f));
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.15, 1.6));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.15, 0.75));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  const handleSaveExhibitor = (updated: Exhibitor) => {
    if (!isAdmin) {
      showToast('Acceso denegado: Se requieren permisos de administrador para editar información.');
      setIsAdminAuthModalOpen(true);
      return;
    }
    const nextList = exhibitors.map((e) => (e.id === updated.id ? updated : e));
    setExhibitors(nextList);
    saveStoredExhibitors(nextList);
    showToast(`Información del Stand ${updated.standNumber} actualizada exitosamente.`);
  };

  const handleResetStand = (standId: string) => {
    if (!isAdmin) {
      showToast('Acceso denegado: Se requieren permisos de administrador para restaurar stands.');
      setIsAdminAuthModalOpen(true);
      return;
    }
    const original = INITIAL_EXHIBITORS.find((e) => e.id === standId);
    if (original) {
      const nextList = exhibitors.map((e) => (e.id === standId ? original : e));
      setExhibitors(nextList);
      saveStoredExhibitors(nextList);
      showToast(`Stand ${standId} restaurado a los datos originales.`);
    }
  };

  const handleUpdateAllExhibitors = (newExhibitors: Exhibitor[]) => {
    if (!isAdmin) {
      showToast('Acceso denegado: Se requieren permisos de administrador para actualizar stands.');
      return;
    }
    setExhibitors(newExhibitors);
    saveStoredExhibitors(newExhibitors);
  };

  const handleLoadDefaultExhibitors = () => {
    if (!isAdmin) {
      showToast('Acceso denegado: Solo el administrador puede cargar la información por defecto.');
      setIsAdminAuthModalOpen(true);
      return;
    }
    const confirmed = window.confirm(
      '¿Deseas cargar la información actual de los expositores como información inicial por defecto?\n\nEsto restablecerá los 15 stands con todos los nombres de marcas, eslóganes, categorías, logos SVG oficiales y configuración de la feria.'
    );
    if (confirmed) {
      setExhibitors(INITIAL_EXHIBITORS);
      saveStoredExhibitors(INITIAL_EXHIBITORS);
      showToast('Información actual cargada exitosamente como información inicial por defecto.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="h-11 px-2.5 py-1 bg-white rounded-xl border border-slate-200/90 shadow-xs flex items-center justify-center">
              <CunLogo className="h-9 sm:h-10 w-auto" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-tight">
                  Plano Interactivo de Distribución
                </h1>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  15 Expositores
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Feria de Emprendimiento e Innovación • CUN
              </p>
            </div>
          </div>

          {/* Quick status pill, role pill & action buttons */}
          <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-end flex-wrap">
            {/* User Role Switcher */}
            {isAdmin ? (
              <button
                type="button"
                onClick={() => setIsAdminAuthModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-bold shadow-xs transition-all"
                title="Sesión de Administrador activa (daniel_hernandez@cun.edu.co). Clic para gestionar acceso."
              >
                <ShieldCheck className="w-4 h-4 text-emerald-200" />
                <span className="hidden md:inline">Admin:</span>
                <span className="truncate max-w-[130px] sm:max-w-[160px]">daniel_hernandez</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsAdminAuthModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-semibold shadow-2xs transition-all"
                title="Modo Consulta (Solo Lectura). Clic para acceder como Administrador."
              >
                <Eye className="w-3.5 h-3.5 text-blue-600" />
                <span>Modo Consulta</span>
                <Lock className="w-3 h-3 text-slate-400" />
              </button>
            )}

            {isAdmin && (
              <button
                type="button"
                onClick={() => setIsSheetsModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300/80 text-xs font-bold shadow-xs transition-colors"
                title="Sincronizar o exportar con Google Sheets"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>Google Sheets</span>
              </button>
            )}

            {isAdmin && (
              <button
                type="button"
                onClick={handleLoadDefaultExhibitors}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 text-xs font-bold shadow-xs transition-colors"
                title="Cargar la información actual de los expositores como información inicial por defecto"
              >
                <RotateCcw className="w-3.5 h-3.5 text-indigo-600" />
                <span className="hidden lg:inline">Cargar Info Inicial por Defecto</span>
                <span className="lg:hidden">Por Defecto</span>
              </button>
            )}

            {isAdmin && (
              <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>100% Ocupación</span>
              </div>
            )}

            {selectedExhibitor && (
              <button
                type="button"
                onClick={() => setIsDetailModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <span>Ficha Stand {selectedExhibitor.standNumber}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-5">
        {/* Helper announcement banner */}
        <div className="mb-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-100 rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-3 text-xs sm:text-sm text-slate-700">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Info className="w-4 h-4" />
            </span>
            <div>
              <span className="font-bold text-slate-900">Interacción rápida:</span> Haz clic en
              cualquier número del plano (del <strong className="text-blue-700">01</strong> al{' '}
              <strong className="text-blue-700">15</strong>) o en la columna lateral derecha para abrir
              la información completa del expositor, catálogo, agenda y contactos.
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              // Select random stand as exploration
              const randomNum = Math.floor(Math.random() * 15) + 1;
              handleSelectStand(String(randomNum).padStart(2, '0'), true);
            }}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-800 bg-white px-3 py-1.5 rounded-xl border border-blue-200/80 shadow-xs shrink-0 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Stand aleatorio
          </button>
        </div>

        {/* Filter Controls & Search */}
        <FloorPlanControls
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          activeFacility={activeFacility}
          onToggleFacility={handleToggleFacility}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          zoomLevel={zoomLevel}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetZoom={handleResetZoom}
          onPrint={handlePrint}
          onOpenSheets={isAdmin ? () => setIsSheetsModalOpen(true) : undefined}
          totalStands={exhibitors.length}
          matchingCount={filteredExhibitors.length}
        />

        {/* Dynamic View: Map vs Directory Cards */}
        {viewMode === 'map' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left side: Interactive SVG Floor Plan */}
            <div className="lg:col-span-8 flex flex-col items-center">
              <div
                className="w-full transition-transform duration-200 origin-top"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <FloorPlanSvg
                  exhibitors={exhibitors}
                  selectedStandId={selectedStandId}
                  hoveredStandId={hoveredStandId}
                  onSelectStand={(id) => handleSelectStand(id, true)}
                  onHoverStand={setHoveredStandId}
                  selectedCategory={selectedCategory}
                  activeFacility={activeFacility}
                  searchTerm={searchTerm}
                />
              </div>

              {/* Map Footer Legend */}
              <div className="w-full mt-3 p-3 bg-white rounded-2xl border border-slate-200/80 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full border border-slate-900 bg-white text-[9px] font-bold flex items-center justify-center text-slate-900">
                      01
                    </span>
                    <span>Expositores</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-red-500 flex items-center justify-center text-white text-[8px] font-bold">
                      ✕
                    </span>
                    <span>Toma eléctrica 110V/220V</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-md bg-purple-500" />
                    <span>Silla Ergonómica Giratoria</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-purple-400" />
                    <span>Puff / Área de Descanso</span>
                  </div>
                </div>

                <span className="text-[11px] text-slate-400 font-medium">
                  Versión Arquitectónica: Plano v03.svg
                </span>
              </div>
            </div>

            {/* Right side: Quick Stand Preview Panel */}
            <div className="lg:col-span-4 sticky top-20 space-y-4">
              {selectedExhibitor ? (
                <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between">
                  <div>
                    {/* Header with exhibitor logo, stand badge and zone */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        <ExhibitorLogo
                          exhibitor={selectedExhibitor}
                          size="lg"
                          showStandNumber={true}
                          className="shrink-0 ring-2 ring-slate-100 shadow-sm"
                        />
                        <div className="min-w-0">
                          {selectedExhibitor.category ? (
                            <span
                              className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-0.5"
                              style={{
                                backgroundColor: selectedExhibitor.badgeBg,
                                color: selectedExhibitor.categoryColor,
                              }}
                            >
                              {selectedExhibitor.category}
                            </span>
                          ) : (
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-0.5 bg-slate-100 text-slate-500">
                              Disponible
                            </span>
                          )}
                          <div className="text-xs font-semibold text-slate-400">
                            Stand #{selectedExhibitor.standNumber} • {STAND_COORDINATES[selectedExhibitor.id]?.zone}
                          </div>
                        </div>
                      </div>

                      {isAdmin ? (
                        <button
                          type="button"
                          onClick={() => setEditingExhibitor(selectedExhibitor)}
                          className="text-xs font-medium text-slate-400 hover:text-blue-600 transition-colors p-1"
                          title="Editar stand"
                        >
                          Editar
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setIsAdminAuthModalOpen(true)}
                          className="text-slate-400 hover:text-blue-600 transition-colors p-1 flex items-center gap-1 text-[11px]"
                          title="Solo el administrador puede editar"
                        >
                          <Lock className="w-3 h-3 text-slate-400" />
                          <span className="hidden sm:inline">Solo lectura</span>
                        </button>
                      )}
                    </div>

                    <h2 className="text-lg font-bold text-slate-900 leading-snug">
                      {selectedExhibitor.name || `Stand #${selectedExhibitor.standNumber} (Disponible)`}
                    </h2>
                    {selectedExhibitor.slogan && (
                      <p className="text-xs text-slate-500 italic mt-0.5">
                        {selectedExhibitor.slogan}
                      </p>
                    )}

                    {/* Excerpt */}
                    {selectedExhibitor.description && (
                      <p className="text-xs text-slate-600 mt-3 leading-relaxed line-clamp-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        {selectedExhibitor.description}
                      </p>
                    )}

                    {/* Products list preview */}
                    {selectedExhibitor.products && selectedExhibitor.products.length > 0 && (
                      <div className="mt-3.5 space-y-1.5">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Productos Destacados
                        </div>
                        <div className="space-y-1">
                          {selectedExhibitor.products.slice(0, 3).map((p, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span className="truncate">{p}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Founder */}
                    {selectedExhibitor.founder?.name && (
                      <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-400">Fundador:</span>
                        <span className="font-semibold text-slate-800">
                          {selectedExhibitor.founder.name}
                        </span>
                      </div>
                    )}

                    {/* Next Schedule item */}
                    {selectedExhibitor.schedule && selectedExhibitor.schedule[0] && (
                      <div className="mt-2.5 p-2.5 rounded-xl bg-blue-50/80 border border-blue-100 text-xs text-blue-900">
                        <div className="font-bold flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-blue-600" />
                          Próxima actividad: {selectedExhibitor.schedule[0].time}
                        </div>
                        <div className="text-[11px] text-blue-700 truncate mt-0.5">
                          {selectedExhibitor.schedule[0].title}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Open full modal CTA & Edit CTA */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsDetailModalOpen(true)}
                      className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
                    >
                      <span>Abrir Detalle</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    {isAdmin ? (
                      <button
                        type="button"
                        onClick={() => setEditingExhibitor(selectedExhibitor)}
                        className="py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all border border-blue-200 shadow-xs"
                        title="Editar toda la información de este expositor"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Editar</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsAdminAuthModalOpen(true)}
                        className="py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 font-medium text-xs flex items-center justify-center gap-1 transition-all border border-slate-200"
                        title="Edición disponible únicamente para el administrador"
                      >
                        <Lock className="w-3 h-3 text-slate-400" />
                        <span className="hidden sm:inline">Solo Consulta</span>
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-6 border border-slate-200/90 text-center text-slate-400 text-xs">
                  Selecciona cualquier stand en el plano interactivo para visualizar su información.
                </div>
              )}

              {/* Quick Stand Selector Grid on side */}
              <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-xs">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                  <span>Acceso Rápido por Número</span>
                  <span className="text-[11px] text-slate-400 font-normal">1 a 15</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {exhibitors.map((ex) => {
                    const isSelected = selectedStandId === ex.id;
                    return (
                      <button
                        key={ex.id}
                        type="button"
                        onClick={() => handleSelectStand(ex.id, true)}
                        onMouseEnter={() => setHoveredStandId(ex.id)}
                        onMouseLeave={() => setHoveredStandId(null)}
                        className={`py-2 rounded-xl text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/70'
                        }`}
                      >
                        {ex.standNumber}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Directory Cards View */
          <ExhibitorCardView
            exhibitors={filteredExhibitors}
            onSelectStand={(id) => handleSelectStand(id, true)}
            onJumpToMap={(id) => {
              handleSelectStand(id, false);
              setViewMode('map');
            }}
            onEditExhibitor={isAdmin ? (ex) => setEditingExhibitor(ex) : undefined}
          />
        )}
      </main>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs font-medium px-4 py-2.5 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exhibitor Detail Modal */}
      <ExhibitorDetailModal
        exhibitor={selectedExhibitor}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onSelectStand={(id) => handleSelectStand(id, false)}
        onEditExhibitor={(ex) => {
          setIsDetailModalOpen(false);
          setEditingExhibitor(ex);
        }}
        totalStands={exhibitors.length}
        isAdmin={isAdmin}
        onRequestAdminLogin={() => setIsAdminAuthModalOpen(true)}
      />

      {/* Edit Exhibitor Modal */}
      <EditExhibitorModal
        exhibitor={editingExhibitor}
        isOpen={editingExhibitor !== null}
        onClose={() => setEditingExhibitor(null)}
        onSave={handleSaveExhibitor}
        onResetStand={handleResetStand}
      />

      {/* Google Sheets Integration Modal */}
      <GoogleSheetsModal
        isOpen={isSheetsModalOpen}
        onClose={() => setIsSheetsModalOpen(false)}
        exhibitors={exhibitors}
        onUpdateExhibitors={handleUpdateAllExhibitors}
        showToast={showToast}
        isAdmin={isAdmin}
        onRequestAdminLogin={() => setIsAdminAuthModalOpen(true)}
      />

      {/* Admin Authentication & Role Modal */}
      <AdminAuthModal
        isOpen={isAdminAuthModalOpen}
        onClose={() => setIsAdminAuthModalOpen(false)}
        currentUser={currentUser}
        onLoginAsAdmin={handleLoginAsAdmin}
        onSwitchToViewer={handleSwitchToViewer}
        showToast={showToast}
      />
    </div>
  );
}
