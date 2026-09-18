import React from 'react';
import { motion } from 'motion/react';
import { MapPin, ArrowUpRight, Zap, Sparkles, UserCheck, Edit3 } from 'lucide-react';
import { Exhibitor } from '../types';

interface ExhibitorCardViewProps {
  exhibitors: Exhibitor[];
  onSelectStand: (standId: string) => void;
  onJumpToMap: (standId: string) => void;
  onEditExhibitor?: (exhibitor: Exhibitor) => void;
}

export const ExhibitorCardView: React.FC<ExhibitorCardViewProps> = ({
  exhibitors,
  onSelectStand,
  onJumpToMap,
  onEditExhibitor,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {exhibitors.map((exhibitor, idx) => (
        <motion.div
          key={exhibitor.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.03 }}
          className="group bg-white rounded-3xl p-5 border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div>
            {/* Top row */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center font-extrabold text-base text-white shadow-xs"
                  style={{ backgroundColor: exhibitor.categoryColor }}
                >
                  {exhibitor.standNumber}
                </div>
                <div>
                  <span
                    className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-0.5"
                    style={{
                      backgroundColor: exhibitor.badgeBg,
                      color: exhibitor.categoryColor,
                    }}
                  >
                    {exhibitor.category}
                  </span>
                  <div className="text-xs text-slate-400 font-medium">Stand #{exhibitor.standNumber}</div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {onEditExhibitor && (
                  <button
                    type="button"
                    onClick={() => onEditExhibitor(exhibitor)}
                    title="Editar información de este expositor"
                    className="p-1.5 rounded-xl bg-slate-50 hover:bg-amber-50 hover:text-amber-600 text-slate-400 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onJumpToMap(exhibitor.id)}
                  title="Ver ubicación en el plano"
                  className="p-1.5 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-600 text-slate-400 transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Name and slogan */}
            <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
              {exhibitor.name}
            </h3>
            <p className="text-xs text-slate-500 line-clamp-2 mt-1 italic">
              {exhibitor.slogan}
            </p>

            {/* Description excerpt */}
            <p className="text-xs text-slate-600 line-clamp-3 mt-2.5 leading-relaxed">
              {exhibitor.description}
            </p>

            {/* Featured product badge */}
            {exhibitor.products && exhibitor.products.length > 0 && (
              <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-500">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="truncate font-medium">{exhibitor.products[0]}</span>
              </div>
            )}
          </div>

          {/* Bottom Card Actions */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <UserCheck className="w-3.5 h-3.5 text-slate-400" />
              <span className="truncate max-w-[120px]">{exhibitor.founder.name}</span>
            </div>

            <button
              type="button"
              onClick={() => onSelectStand(exhibitor.id)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold flex items-center gap-1 transition-all shadow-xs"
            >
              <span>Ver Detalle</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
