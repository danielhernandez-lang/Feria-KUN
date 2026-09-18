import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  FileSpreadsheet,
  Download,
  Upload,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Sparkles,
  Link2,
  KeyRound,
  FileText,
  Lock,
  ShieldAlert,
} from 'lucide-react';
import { Exhibitor, OWNER_ADMIN_EMAIL } from '../types';
import {
  fetchPublicGoogleSheet,
  generateExhibitorsCsv,
  downloadCsvFile,
  extractSpreadsheetId,
  updateGoogleSheetsWithApi,
  EXHIBITOR_EXPORT_HEADERS,
  serializeExhibitorToRow,
} from '../services/googleSheetsService';

interface GoogleSheetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  exhibitors: Exhibitor[];
  onUpdateExhibitors: (newExhibitors: Exhibitor[]) => void;
  showToast: (message: string) => void;
  isAdmin?: boolean;
  onRequestAdminLogin?: () => void;
}

export const GoogleSheetsModal: React.FC<GoogleSheetsModalProps> = ({
  isOpen,
  onClose,
  exhibitors,
  onUpdateExhibitors,
  showToast,
  isAdmin = false,
  onRequestAdminLogin,
}) => {
  const [activeTab, setActiveTab] = useState<'sync' | 'export' | 'api'>('sync');
  const [sheetUrl, setSheetUrl] = useState('');
  const [sheetName, setSheetName] = useState('Sheet1');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [previewExhibitors, setPreviewExhibitors] = useState<Exhibitor[] | null>(null);
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [copiedAllData, setCopiedAllData] = useState(false);
  const [showColumnsModal, setShowColumnsModal] = useState(false);
  
  // API credentials tab state
  const [accessToken, setAccessToken] = useState('');
  const [isPushing, setIsPushing] = useState(false);
  const [pushSuccess, setPushSuccess] = useState(false);

  if (!isOpen) return null;

  const handleFetchSheet = async () => {
    if (!sheetUrl.trim()) {
      setErrorMsg('Por favor ingresa un enlace o ID de Google Sheets.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setPreviewExhibitors(null);

    const result = await fetchPublicGoogleSheet(sheetUrl, sheetName);
    setIsLoading(false);

    if (result.success && result.exhibitors && result.exhibitors.length > 0) {
      setPreviewExhibitors(result.exhibitors);
    } else {
      setErrorMsg(result.error || 'No se pudieron recuperar datos de la hoja de cálculo.');
    }
  };

  const handleApplyImport = () => {
    if (!previewExhibitors || previewExhibitors.length === 0) return;

    if (!isAdmin) {
      setErrorMsg(
        'Permiso denegado: Solo el usuario administrador cuenta con autorización para aplicar cambios al plano interactivo.'
      );
      return;
    }
    
    // Merge or replace: we update the matching stands
    const updatedMap = new Map<string, Exhibitor>();
    exhibitors.forEach((e) => updatedMap.set(e.id, e));
    previewExhibitors.forEach((pe) => updatedMap.set(pe.id, pe));

    const finalExhibitors = Array.from(updatedMap.values()).sort(
      (a, b) => parseInt(a.standNumber, 10) - parseInt(b.standNumber, 10)
    );

    onUpdateExhibitors(finalExhibitors);
    showToast(`¡${previewExhibitors.length} expositores sincronizados desde Google Sheets exitosamente!`);
    onClose();
  };

  const handleDownloadCsv = () => {
    const csv = generateExhibitorsCsv(exhibitors);
    downloadCsvFile(csv, `Expositores_CUN_${new Date().toISOString().slice(0, 10)}.csv`);
    showToast('Archivo CSV descargado. Puedes importarlo en Google Sheets.');
  };

  const handleOpenGoogleSheetsNew = () => {
    // Opens Google Sheets creation page
    window.open('https://sheets.new', '_blank');
  };

  const handleCopyHeaders = () => {
    const headers = EXHIBITOR_EXPORT_HEADERS.join('\t');
    navigator.clipboard.writeText(headers);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2500);
    showToast(`¡${EXHIBITOR_EXPORT_HEADERS.length} encabezados oficiales copiados al portapapeles!`);
  };

  const handleCopyAllDataTsv = () => {
    const tsvData = [
      EXHIBITOR_EXPORT_HEADERS.join('\t'),
      ...exhibitors.map((e) => serializeExhibitorToRow(e).join('\t')),
    ].join('\n');
    navigator.clipboard.writeText(tsvData);
    setCopiedAllData(true);
    setTimeout(() => setCopiedAllData(false), 2500);
    showToast('¡Tabla completa con los 22 campos copiada! Puedes pegarla directamente en Google Sheets con Ctrl+V.');
  };

  const handlePushViaApi = async () => {
    if (!isAdmin) {
      setErrorMsg(
        'Permiso denegado: Únicamente el usuario administrador puede escribir y guardar datos directamente en Google Sheets vía API.'
      );
      return;
    }

    const spreadsheetId = extractSpreadsheetId(sheetUrl);
    if (!spreadsheetId) {
      setErrorMsg('Ingresa un enlace o ID de Google Sheets válido en la primera pestaña.');
      return;
    }
    if (!accessToken.trim()) {
      setErrorMsg('Ingresa un token de acceso OAuth válido.');
      return;
    }

    setIsPushing(true);
    setErrorMsg(null);
    setPushSuccess(false);

    const result = await updateGoogleSheetsWithApi(spreadsheetId, accessToken, exhibitors, sheetName);
    setIsPushing(false);

    if (result.success) {
      setPushSuccess(true);
      showToast(`¡${result.updatedRows} filas actualizadas en Google Sheets mediante API!`);
    } else {
      setErrorMsg(result.error || 'Error al actualizar Google Sheets.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white rounded-3xl shadow-2xl border border-slate-200/80 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight">Integración con Google Sheets</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white border border-white/30">
                  En Vivo
                </span>
              </div>
              <p className="text-xs text-white/85">
                Sincroniza, importa y exporta los datos de los 15 stands en tiempo real
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 px-6 bg-slate-50/80">
          <button
            type="button"
            onClick={() => setActiveTab('sync')}
            className={`py-3.5 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'sync'
                ? 'border-emerald-600 text-emerald-700 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            Importar / Sincronizar
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('export')}
            className={`py-3.5 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'export'
                ? 'border-emerald-600 text-emerald-700 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            Exportar a Sheets
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('api')}
            className={`py-3.5 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'api'
                ? 'border-emerald-600 text-emerald-700 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            Escritura API
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-sm text-slate-700">
          {/* Tab 1: Sync from Google Sheets */}
          {activeTab === 'sync' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-900">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  ¿Cómo conectar tu Google Sheet sin configuración de API?
                </div>
                <ol className="list-decimal list-inside space-y-1 text-emerald-900/90 pl-1 leading-relaxed">
                  <li>Crea o abre tu hoja en Google Sheets con los expositores.</li>
                  <li>
                    Haz clic en <strong>Compartir</strong> y selecciona{' '}
                    <strong>"Cualquier persona con el enlace puede leer"</strong>.
                  </li>
                  <li>Pega el enlace abajo y haz clic en <strong>"Obtener Datos"</strong>.</li>
                </ol>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Enlace o ID de tu Google Sheet
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={sheetUrl}
                    onChange={(e) => setSheetUrl(e.target.value)}
                    placeholder="https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit"
                    className="w-full px-3.5 py-2.5 pl-10 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-xs text-slate-900"
                  />
                  <Link2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Nombre de la Hoja (Pestaña)
                  </label>
                  <input
                    type="text"
                    value={sheetName}
                    onChange={(e) => setSheetName(e.target.value)}
                    placeholder="Sheet1 o Hoja 1"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={handleFetchSheet}
                    disabled={isLoading}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-xs disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Leyendo Hoja...</span>
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Obtener Datos</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Error Box */}
              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold">No se pudo cargar la hoja:</div>
                    <div>{errorMsg}</div>
                  </div>
                </div>
              )}

              {/* Preview of fetched exhibitors */}
              {previewExhibitors && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Se encontraron {previewExhibitors.length} stands válidos
                    </div>
                    {isAdmin ? (
                      <button
                        type="button"
                        onClick={handleApplyImport}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-colors"
                      >
                        Aplicar al Plano Interactivo
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={onRequestAdminLogin}
                        className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-bold text-xs flex items-center gap-1.5 transition-colors"
                        title="Requiere iniciar sesión como Administrador"
                      >
                        <Lock className="w-3.5 h-3.5 text-amber-700" />
                        <span>Requiere Administrador</span>
                      </button>
                    )}
                  </div>

                  <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1 text-xs">
                    {previewExhibitors.slice(0, 10).map((ex) => (
                      <div
                        key={ex.id}
                        className="p-2 bg-white rounded-xl border border-slate-200 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2 font-medium">
                          <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center justify-center">
                            {ex.standNumber}
                          </span>
                          <span className="text-slate-900 font-semibold">{ex.name}</span>
                          <span className="text-slate-400 text-[11px]">({ex.category})</span>
                        </div>
                        <span className="text-slate-500 text-[11px] truncate max-w-[140px]">
                          {ex.founder.name}
                        </span>
                      </div>
                    ))}
                    {previewExhibitors.length > 10 && (
                      <div className="text-center text-[11px] text-slate-400 font-medium pt-1">
                        ...y {previewExhibitors.length - 10} stands más
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Export to Google Sheets */}
          {activeTab === 'export' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/80 border border-blue-200 text-xs text-blue-950 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-blue-950 text-sm">
                    <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                    <span>Exportación Total de Campos para Google Sheets</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-600 text-white shadow-xs">
                    22 Columnas (100%)
                  </span>
                </div>
                <p className="text-blue-900/90 leading-relaxed text-xs">
                  Se exporta la totalidad de la información de los stands: identificación, marca, eslogan, categoría, tipo de espacio físico, descripción, perfil del fundador (nombre, cargo, avatar), todos los canales de contacto directo (teléfono/WhatsApp, correo, web, Instagram, TikTok, Facebook, LinkedIn), URL de logo, productos destacados, mobiliario/equipamiento del stand, agenda completa de pitches y códigos de color corporativos.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={handleDownloadCsv}
                  className="p-3.5 rounded-2xl border-2 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition-all text-left group flex flex-col justify-between"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                    <Download className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-xs">Descargar CSV Completo</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      22 columnas con UTF-8 BOM
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={handleCopyAllDataTsv}
                  className="p-3.5 rounded-2xl border-2 border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/40 transition-all text-left group flex flex-col justify-between"
                >
                  <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                    {copiedAllData ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-xs">
                      {copiedAllData ? '¡Tabla Copiada!' : 'Copiar Tabla Completa'}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      Pega con Ctrl+V directo en Sheets
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={handleOpenGoogleSheetsNew}
                  className="p-3.5 rounded-2xl border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 transition-all text-left group flex flex-col justify-between"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-xs">Abrir Google Sheets</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      Crea hoja nueva en sheets.new
                    </div>
                  </div>
                </button>
              </div>

              {/* Headers copy bar */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-800">22 Encabezados Oficiales</span>
                    <span className="text-[10px] text-slate-500">({EXHIBITOR_EXPORT_HEADERS.length} campos)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowColumnsModal(!showColumnsModal)}
                      className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {showColumnsModal ? 'Ocultar campos' : 'Ver desglose de campos'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCopyHeaders}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors shadow-2xs"
                    >
                      {copiedTemplate ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedTemplate ? 'Copiados' : 'Copiar encabezados'}</span>
                    </button>
                  </div>
                </div>

                {/* Collapsible Column Breakdown */}
                {showColumnsModal && (
                  <div className="mt-2 p-3 bg-white rounded-xl border border-slate-200 text-xs max-h-48 overflow-y-auto space-y-1.5">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Detalle de las 22 columnas incluidas en la exportación:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px]">
                      {EXHIBITOR_EXPORT_HEADERS.map((header, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 p-1 rounded-lg hover:bg-slate-50 text-slate-700">
                          <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-600 font-bold text-[10px] flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="font-medium truncate">{header}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-2.5 rounded-xl bg-white border border-slate-200 font-mono text-[10px] text-slate-600 overflow-x-auto whitespace-nowrap">
                  {EXHIBITOR_EXPORT_HEADERS.join(' | ')}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: API & Token */}
          {activeTab === 'api' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <KeyRound className="w-4 h-4 text-amber-700" />
                  Escritura Directa mediante Google Sheets API v4
                </div>
                <p className="text-amber-900/90 leading-relaxed">
                  Permite sobrescribir y actualizar los 15 stands directamente en tu archivo de Google Drive usando un Token de Acceso con alcance{' '}
                  <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-[10px]">https://www.googleapis.com/auth/spreadsheets</code>.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  ID o Enlace de la Hoja de Destino
                </label>
                <input
                  type="text"
                  value={sheetUrl}
                  onChange={(e) => setSheetUrl(e.target.value)}
                  placeholder="ID o URL de tu hoja de cálculo"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Google OAuth Bearer Access Token
                </label>
                <input
                  type="password"
                  value={accessToken}
                  onChange={(e) => setAccessToken(e.target.value)}
                  placeholder="ya29.a0AfH6SM..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Obtenido mediante tu cuenta institucional @cun.edu.co o Google Cloud Console.
                </p>
              </div>

              {isAdmin ? (
                <button
                  type="button"
                  onClick={handlePushViaApi}
                  disabled={isPushing}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs transition-colors shadow-xs disabled:opacity-50"
                >
                  {isPushing ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Actualizando Google Sheets...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5" />
                      <span>Guardar 15 Stands en Google Sheets</span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onRequestAdminLogin}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors border border-slate-300"
                >
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Escritura Restringida a Administrador</span>
                </button>
              )}

              {pushSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>¡Datos guardados con éxito en la hoja de cálculo de Google!</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 px-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Compatibilidad total con Google Workspace y CUN</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold transition-colors"
          >
            Cerrar
          </button>
        </div>
      </motion.div>
    </div>
  );
};
