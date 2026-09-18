import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Save,
  RotateCcw,
  Building2,
  User,
  FileText,
  Sparkles,
  Calendar,
  Phone,
  Plus,
  Trash2,
  Globe,
  Instagram,
  Facebook,
  Music2,
  Linkedin,
  Mail,
  Armchair,
  Layers,
} from 'lucide-react';
import { Exhibitor, StandCategory, ExhibitorScheduleItem } from '../types';

interface EditExhibitorModalProps {
  exhibitor: Exhibitor | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: Exhibitor) => void;
  onResetStand: (standId: string) => void;
}

const CATEGORIES: { label: StandCategory; color: string; badgeBg: string }[] = [
  { label: 'Biotecnología & Alimentos', color: '#059669', badgeBg: '#ecfdf5' },
  { label: 'Gastronomía & Agro', color: '#d97706', badgeBg: '#fef3c7' },
  { label: 'EdTech & Software', color: '#4f46e5', badgeBg: '#e0e7ff' },
  { label: 'EdTech & Hardware', color: '#0284c7', badgeBg: '#e0f2fe' },
  { label: 'FinTech', color: '#2563eb', badgeBg: '#dbeafe' },
  { label: 'Sostenibilidad & Diseño', color: '#0d9488', badgeBg: '#ccfbf1' },
  { label: 'Energías Limpias', color: '#ea580c', badgeBg: '#ffedd5' },
  { label: 'AgroTech', color: '#65a30d', badgeBg: '#ecfccb' },
  { label: 'Salud & Mascotas', color: '#e11d48', badgeBg: '#ffe4e6' },
  { label: 'Belleza & Cuidado Personal', color: '#db2777', badgeBg: '#fce7f3' },
  { label: 'Moda Sostenible', color: '#9333ea', badgeBg: '#f3e8ff' },
  { label: 'Logística & Transporte', color: '#0284c7', badgeBg: '#e0f2fe' },
  { label: 'HealthTech & IA', color: '#3b82f6', badgeBg: '#dbeafe' },
  { label: 'Alimentos & Bebidas', color: '#8b5cf6', badgeBg: '#ede9fe' },
  { label: 'Arquitectura & Hábitat', color: '#10b981', badgeBg: '#d1fae5' },
];

type EditTab = 'general' | 'founder' | 'description' | 'products' | 'schedule' | 'contact';

export const EditExhibitorModal: React.FC<EditExhibitorModalProps> = ({
  exhibitor,
  isOpen,
  onClose,
  onSave,
  onResetStand,
}) => {
  const [formData, setFormData] = useState<Exhibitor | null>(null);
  const [activeTab, setActiveTab] = useState<EditTab>('general');

  useEffect(() => {
    if (exhibitor) {
      setFormData(JSON.parse(JSON.stringify(exhibitor)));
    }
  }, [exhibitor]);

  if (!isOpen || !formData) return null;

  const handleCategoryChange = (catName: StandCategory) => {
    const found = CATEGORIES.find((c) => c.label === catName);
    setFormData({
      ...formData,
      category: catName,
      categoryColor: found ? found.color : formData.categoryColor,
      badgeBg: found ? found.badgeBg : formData.badgeBg,
    });
  };

  // Products helpers
  const handleAddProduct = () => {
    setFormData({
      ...formData,
      products: [...formData.products, ''],
    });
  };

  const handleUpdateProduct = (index: number, val: string) => {
    const next = [...formData.products];
    next[index] = val;
    setFormData({ ...formData, products: next });
  };

  const handleRemoveProduct = (index: number) => {
    setFormData({
      ...formData,
      products: formData.products.filter((_, i) => i !== index),
    });
  };

  // Amenities helpers
  const handleAddAmenity = () => {
    setFormData({
      ...formData,
      amenities: [...formData.amenities, ''],
    });
  };

  const handleUpdateAmenity = (index: number, val: string) => {
    const next = [...formData.amenities];
    next[index] = val;
    setFormData({ ...formData, amenities: next });
  };

  const handleRemoveAmenity = (index: number) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.filter((_, i) => i !== index),
    });
  };

  // Schedule helpers
  const handleAddScheduleItem = () => {
    const newItem: ExhibitorScheduleItem = {
      time: '11:00 AM',
      title: 'Demostración de producto y networking',
      location: `Stand ${formData.standNumber}`,
    };
    setFormData({
      ...formData,
      schedule: [...(formData.schedule || []), newItem],
    });
  };

  const handleUpdateScheduleItem = (index: number, field: keyof ExhibitorScheduleItem, val: string) => {
    const next = [...(formData.schedule || [])];
    next[index] = { ...next[index], [field]: val };
    setFormData({ ...formData, schedule: next });
  };

  const handleRemoveScheduleItem = (index: number) => {
    setFormData({
      ...formData,
      schedule: (formData.schedule || []).filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      // Filter out empty items
      const cleaned: Exhibitor = {
        ...formData,
        products: formData.products.map((p) => p.trim()).filter(Boolean),
        amenities: formData.amenities.map((a) => a.trim()).filter(Boolean),
        schedule: (formData.schedule || []).filter((s) => s.title.trim().length > 0),
      };
      onSave(cleaned);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl text-white font-extrabold flex items-center justify-center text-sm shadow-xs border border-white/20"
                style={{ backgroundColor: formData.categoryColor }}
              >
                {formData.standNumber}
              </div>
              <div>
                <h2 className="text-base font-bold flex items-center gap-2">
                  <span>Editar Expositor - Stand {formData.standNumber}</span>
                </h2>
                <p className="text-xs text-slate-400">
                  Toda la información del expositor es editable y se guarda en tiempo real
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 px-4 py-2 bg-slate-50 border-b border-slate-200 overflow-x-auto no-scrollbar shrink-0 text-xs font-semibold text-slate-600">
            <button
              type="button"
              onClick={() => setActiveTab('general')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                activeTab === 'general'
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                  : 'hover:bg-slate-200/60'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>General & Espacio</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('contact')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                activeTab === 'contact'
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                  : 'hover:bg-slate-200/60'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Canales de Contacto</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('founder')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                activeTab === 'founder'
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                  : 'hover:bg-slate-200/60'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Fundador & Equipo</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('description')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                activeTab === 'description'
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                  : 'hover:bg-slate-200/60'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Descripción</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('products')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                activeTab === 'products'
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                  : 'hover:bg-slate-200/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Productos & Mobiliario</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('schedule')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                activeTab === 'schedule'
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                  : 'hover:bg-slate-200/60'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-sky-500" />
              <span>Agenda de Pitches</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
            {/* TAB 1: General & Espacio */}
            {activeTab === 'general' && (
              <div className="space-y-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Nombre del Emprendimiento / Marca
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-900 text-sm"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Eslogan o Frase de Impacto
                  </label>
                  <input
                    type="text"
                    value={formData.slogan}
                    onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Sector o Categoría
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleCategoryChange(e.target.value as StandCategory)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 bg-white"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat.label} value={cat.label}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Tipo de Espacio Asignado en Plano
                    </label>
                    <input
                      type="text"
                      value={formData.spaceType}
                      onChange={(e) => setFormData({ ...formData, spaceType: e.target.value })}
                      placeholder="Ej: Módulo Lateral con Sillas, Espacio Lounge..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    URL del Logo o Emblema (opcional)
                  </label>
                  <input
                    type="url"
                    value={formData.logoUrl || ''}
                    onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 font-mono"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: Canales de Contacto Directo */}
            {activeTab === 'contact' && (
              <div className="space-y-4">
                <div className="p-3 bg-blue-50/70 rounded-2xl border border-blue-100 text-xs text-blue-900 leading-relaxed">
                  Configura los canales oficiales de contacto y redes sociales directas del expositor. Estos enlaces se mostrarán en la ficha técnica y directorio interactivo.
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      Teléfono / WhatsApp
                    </label>
                    <input
                      type="text"
                      value={formData.contact.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contact: { ...formData.contact, phone: e.target.value },
                        })
                      }
                      placeholder="+57 300 000 0000"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-blue-600" />
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      value={formData.contact.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contact: { ...formData.contact, email: e.target.value },
                        })
                      }
                      placeholder="contacto@empresa.co"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-slate-600" />
                      Sitio Web
                    </label>
                    <input
                      type="text"
                      value={formData.contact.website || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contact: { ...formData.contact, website: e.target.value },
                        })
                      }
                      placeholder="https://miempresa.com"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Instagram className="w-3.5 h-3.5 text-pink-600" />
                      Instagram
                    </label>
                    <input
                      type="text"
                      value={formData.contact.instagram || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contact: { ...formData.contact, instagram: e.target.value },
                        })
                      }
                      placeholder="@usuario_instagram"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Music2 className="w-3.5 h-3.5 text-cyan-500" />
                      <span>TikTok (@usuario o URL)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.contact.tiktok || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contact: { ...formData.contact, tiktok: e.target.value },
                        })
                      }
                      placeholder="@empresa_tiktok"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Facebook className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Facebook (página o usuario)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.contact.facebook || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contact: { ...formData.contact, facebook: e.target.value },
                        })
                      }
                      placeholder="nombre.pagina.oficial"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Linkedin className="w-3.5 h-3.5 text-sky-700" />
                    LinkedIn (empresa o perfil personal)
                  </label>
                  <input
                    type="text"
                    value={formData.contact.linkedin || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact, linkedin: e.target.value },
                      })
                    }
                    placeholder="company/nombre-empresa"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                  />
                </div>
              </div>
            )}

            {/* TAB 3: Fundador & Equipo */}
            {activeTab === 'founder' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Nombre del Fundador / Representante
                    </label>
                    <input
                      type="text"
                      value={formData.founder.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          founder: { ...formData.founder, name: e.target.value },
                        })
                      }
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Cargo / Especialidad
                    </label>
                    <input
                      type="text"
                      value={formData.founder.role}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          founder: { ...formData.founder, role: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    URL de Avatar o Foto del Fundador (opcional)
                  </label>
                  <input
                    type="url"
                    value={formData.founder.avatar || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        founder: { ...formData.founder, avatar: e.target.value },
                      })
                    }
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 font-mono"
                  />
                </div>
              </div>
            )}

            {/* TAB 4: Descripción */}
            {activeTab === 'description' && (
              <div className="space-y-3">
                <label className="block font-semibold text-slate-700">
                  Descripción Detallada del Emprendimiento
                </label>
                <textarea
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Explica la misión del proyecto, mercado al que va dirigido y propuesta de valor..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 leading-relaxed text-sm"
                />
              </div>
            )}

            {/* TAB 5: Productos & Mobiliario */}
            {activeTab === 'products' && (
              <div className="space-y-5">
                {/* Products */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="font-semibold text-slate-800 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Productos y Servicios Destacados
                    </label>
                    <button
                      type="button"
                      onClick={handleAddProduct}
                      className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      Agregar Producto
                    </button>
                  </div>

                  <div className="space-y-2">
                    {formData.products.map((p, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={p}
                          onChange={(e) => handleUpdateProduct(idx, e.target.value)}
                          placeholder={`Producto o servicio #${idx + 1}`}
                          className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveProduct(idx)}
                          title="Eliminar producto"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    {formData.products.length === 0 && (
                      <div className="text-slate-400 italic text-xs py-2">
                        No hay productos registrados. Haz clic en "Agregar Producto".
                      </div>
                    )}
                  </div>
                </div>

                {/* Amenities / Furniture */}
                <div className="pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <label className="font-semibold text-slate-800 flex items-center gap-1.5">
                      <Armchair className="w-3.5 h-3.5 text-indigo-500" />
                      Equipamiento y Mobiliario del Stand
                    </label>
                    <button
                      type="button"
                      onClick={handleAddAmenity}
                      className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      Agregar Mobiliario
                    </button>
                  </div>

                  <div className="space-y-2">
                    {formData.amenities.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleUpdateAmenity(idx, e.target.value)}
                          placeholder="Ej: Mesa de exhibición, Silla ergonómica, Toma 110V..."
                          className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveAmenity(idx)}
                          title="Eliminar elemento"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: Agenda & Demostraciones */}
            {activeTab === 'schedule' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-semibold text-slate-800 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-sky-500" />
                      Agenda de Pitches y Demostraciones
                    </label>
                    <span className="text-[11px] text-slate-400">
                      Horarios y actividades programadas durante la feria
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddScheduleItem}
                    className="px-2.5 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    Nueva Actividad
                  </button>
                </div>

                <div className="space-y-3">
                  {(formData.schedule || []).map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 relative"
                    >
                      <button
                        type="button"
                        onClick={() => handleRemoveScheduleItem(idx)}
                        title="Eliminar actividad"
                        className="absolute top-2.5 right-2.5 p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pr-8">
                        <div>
                          <span className="block text-[10px] font-semibold text-slate-500 uppercase">
                            Horario
                          </span>
                          <input
                            type="text"
                            value={item.time}
                            onChange={(e) => handleUpdateScheduleItem(idx, 'time', e.target.value)}
                            placeholder="Ej: 10:30 AM"
                            className="w-full px-2.5 py-1 rounded-lg border border-slate-300 text-xs font-bold text-slate-800 bg-white"
                          />
                        </div>
                        <div>
                          <span className="block text-[10px] font-semibold text-slate-500 uppercase">
                            Ubicación
                          </span>
                          <input
                            type="text"
                            value={item.location}
                            onChange={(e) => handleUpdateScheduleItem(idx, 'location', e.target.value)}
                            placeholder="Ej: Stand 01 / Zona Bar"
                            className="w-full px-2.5 py-1 rounded-lg border border-slate-300 text-xs text-slate-800 bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <span className="block text-[10px] font-semibold text-slate-500 uppercase">
                          Título / Descripción de la actividad
                        </span>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => handleUpdateScheduleItem(idx, 'title', e.target.value)}
                          placeholder="Ej: Demostración en vivo y degustación sensorial"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-800 bg-white"
                        />
                      </div>
                    </div>
                  ))}

                  {(!formData.schedule || formData.schedule.length === 0) && (
                    <div className="text-slate-400 italic text-xs py-4 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                      No hay actividades programadas. Pulsa "Nueva Actividad" para añadir una.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between shrink-0">
              <button
                type="button"
                onClick={() => {
                  if (confirm(`¿Restaurar los datos originales del Stand ${formData.standNumber}?`)) {
                    onResetStand(formData.id);
                    onClose();
                  }
                }}
                className="px-3 py-1.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 font-medium flex items-center gap-1.5 transition-colors text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Restaurar original
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 font-semibold text-slate-700 text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-1.5 shadow-sm transition-colors text-xs"
                >
                  <Save className="w-4 h-4" />
                  Guardar Todos los Cambios
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
