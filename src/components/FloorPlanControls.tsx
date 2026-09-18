import React from 'react';
import {
  Search,
  SlidersHorizontal,
  Map,
  Grid,
  Zap,
  Coffee,
  Users,
  Building2,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Printer,
  Sparkles,
  X,
  FileSpreadsheet,
} from 'lucide-react';
import { FacilityType } from '../types';

interface FloorPlanControlsProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (cat: string | null) => void;
  activeFacility: FacilityType | null;
  onToggleFacility: (f: FacilityType) => void;
  viewMode: 'map' | 'directory';
  onViewModeChange: (mode: 'map' | 'directory') => void;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onPrint: () => void;
  onOpenSheets?: () => void;
  totalStands: number;
  matchingCount: number;
}

export const FloorPlanControls: React.FC<FloorPlanControlsProps> = ({
  searchTerm,
  onSearchChange,
  categories,
  selectedCategory,
  onSelectCategory,
  activeFacility,
  onToggleFacility,
  viewMode,
  onViewModeChange,
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onPrint,
  onOpenSheets,
  totalStands,
  matchingCount,
}) => {
  return (
    <div className="space-y-3 mb-4">
      {/* Top row: Search input, View switch, and Print */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por stand (ej: 03), emprendimiento o categoría..."
            className="w-full pl-10 pr-9 py-2 rounded-2xl bg-white border border-slate-200/90 shadow-xs text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* View Toggle and Quick Controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* View mode buttons */}
          <div className="flex items-center p-1 bg-slate-100/90 rounded-2xl border border-slate-200/60 shadow-xs">
            <button
              type="button"
              onClick={() => onViewModeChange('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                viewMode === 'map'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Map className="w-3.5 h-3.5 text-blue-600" />
              <span>Plano 2D</span>
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('directory')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                viewMode === 'directory'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Grid className="w-3.5 h-3.5 text-indigo-600" />
              <span>Directorio ({totalStands})</span>
            </button>
          </div>

          {/* Zoom controls (visible in map mode) */}
          {viewMode === 'map' && (
            <div className="hidden sm:flex items-center bg-white rounded-2xl border border-slate-200/90 shadow-xs p-1">
              <button
                type="button"
                onClick={onZoomOut}
                disabled={zoomLevel <= 0.8}
                title="Alejar plano"
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-600 disabled:opacity-40 transition-colors"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-bold text-slate-600 px-1.5 min-w-[42px] text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                type="button"
                onClick={onZoomIn}
                disabled={zoomLevel >= 1.6}
                title="Acercar plano"
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-600 disabled:opacity-40 transition-colors"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onResetZoom}
                title="Restablecer tamaño"
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors ml-0.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Google Sheets button */}
          {onOpenSheets && (
            <button
              type="button"
              onClick={onOpenSheets}
              title="Sincronizar o exportar con Google Sheets"
              className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 shadow-xs text-xs font-semibold text-emerald-800 transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Google Sheets</span>
            </button>
          )}

          {/* Print button */}
          <button
            type="button"
            onClick={onPrint}
            title="Imprimir o guardar como PDF"
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/90 shadow-xs text-xs font-semibold text-slate-700 transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden md:inline">Imprimir</span>
          </button>
        </div>
      </div>

      {/* Middle row: Category Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] shrink-0 mr-1 flex items-center gap-1">
          <SlidersHorizontal className="w-3 h-3" />
          Sectores:
        </span>
        <button
          type="button"
          onClick={() => onSelectCategory(null)}
          className={`px-3 py-1.5 rounded-full font-semibold shrink-0 transition-all ${
            selectedCategory === null
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Todos ({totalStands})
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => onSelectCategory(cat === selectedCategory ? null : cat)}
            className={`px-3 py-1.5 rounded-full font-medium shrink-0 transition-all flex items-center gap-1.5 ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-xs font-semibold'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Bottom row: Facility highlights toggles */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar text-xs">
        <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] shrink-0 mr-1 flex items-center gap-1">
          <Building2 className="w-3 h-3" />
          Áreas del plano:
        </span>

        <button
          type="button"
          onClick={() => onToggleFacility('bar')}
          className={`px-2.5 py-1 rounded-xl text-[11px] font-medium shrink-0 flex items-center gap-1 border transition-all ${
            activeFacility === 'bar'
              ? 'bg-amber-100 border-amber-300 text-amber-900 font-bold shadow-xs'
              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Coffee className="w-3 h-3 text-amber-600" />
          BAR
        </button>

        <button
          type="button"
          onClick={() => onToggleFacility('capacitaciones')}
          className={`px-2.5 py-1 rounded-xl text-[11px] font-medium shrink-0 flex items-center gap-1 border transition-all ${
            activeFacility === 'capacitaciones'
              ? 'bg-blue-100 border-blue-300 text-blue-900 font-bold shadow-xs'
              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-3 h-3 text-blue-600" />
          Sala Capacitaciones
        </button>

        <button
          type="button"
          onClick={() => onToggleFacility('banos')}
          className={`px-2.5 py-1 rounded-xl text-[11px] font-medium shrink-0 flex items-center gap-1 border transition-all ${
            activeFacility === 'banos'
              ? 'bg-rose-100 border-rose-300 text-rose-900 font-bold shadow-xs'
              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
          }`}
        >
          Baños (H/M)
        </button>

        <button
          type="button"
          onClick={() => onToggleFacility('escaleras')}
          className={`px-2.5 py-1 rounded-xl text-[11px] font-medium shrink-0 flex items-center gap-1 border transition-all ${
            activeFacility === 'escaleras'
              ? 'bg-indigo-100 border-indigo-300 text-indigo-900 font-bold shadow-xs'
              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
          }`}
        >
          Acceso 2° Piso
        </button>

        <button
          type="button"
          onClick={() => onToggleFacility('electricidad')}
          className={`px-2.5 py-1 rounded-xl text-[11px] font-medium shrink-0 flex items-center gap-1 border transition-all ${
            activeFacility === 'electricidad'
              ? 'bg-red-100 border-red-300 text-red-900 font-bold shadow-xs'
              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Zap className="w-3 h-3 text-red-500" />
          Tomas de Energía (X)
        </button>

        <button
          type="button"
          onClick={() => onToggleFacility('descanso')}
          className={`px-2.5 py-1 rounded-xl text-[11px] font-medium shrink-0 flex items-center gap-1 border transition-all ${
            activeFacility === 'descanso'
              ? 'bg-purple-100 border-purple-300 text-purple-900 font-bold shadow-xs'
              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
          }`}
        >
          Puffs de Descanso
        </button>

        {/* Results count feedback */}
        {(searchTerm || selectedCategory) && (
          <span className="ml-auto text-xs font-semibold text-blue-600 shrink-0">
            {matchingCount} de {totalStands} stands
          </span>
        )}
      </div>
    </div>
  );
};
