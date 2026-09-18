import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Exhibitor, StandCoordinates, FacilityType } from '../types';
import { STAND_COORDINATES, RIGHT_LEGEND_ITEMS } from '../data/standsData';
import cunLogoUrl from '../assets/Logo_CUN.svg';

interface FloorPlanSvgProps {
  exhibitors: Exhibitor[];
  selectedStandId: string | null;
  hoveredStandId: string | null;
  onSelectStand: (standId: string) => void;
  onHoverStand: (standId: string | null) => void;
  selectedCategory: string | null;
  activeFacility: FacilityType | null;
  searchTerm: string;
}

export const FloorPlanSvg: React.FC<FloorPlanSvgProps> = ({
  exhibitors,
  selectedStandId,
  hoveredStandId,
  onSelectStand,
  onHoverStand,
  selectedCategory,
  activeFacility,
  searchTerm,
}) => {
  const getExhibitor = (id: string) => exhibitors.find((e) => e.id === id);

  // Check if stand matches filters
  const isStandHighlighted = (id: string) => {
    const exhibitor = getExhibitor(id);
    if (!exhibitor) return true;

    // If search term exists
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      const matchesNum = exhibitor.standNumber.includes(term) || `stand ${exhibitor.standNumber}`.includes(term);
      const matchesName = exhibitor.name.toLowerCase().includes(term);
      const matchesCat = exhibitor.category.toLowerCase().includes(term);
      const matchesFounder = exhibitor.founder.name.toLowerCase().includes(term);
      const matchesProducts = exhibitor.products.some((p) => p.toLowerCase().includes(term));
      if (!(matchesNum || matchesName || matchesCat || matchesFounder || matchesProducts)) {
        return false;
      }
    }

    // If category selected
    if (selectedCategory && exhibitor.category !== selectedCategory) {
      return false;
    }

    return true;
  };

  // Helper for rendering purple ergonomic office chair
  const renderPurpleChair = (cx: number, cy: number, angle: number = 0, key?: string) => (
    <g key={key} transform={`rotate(${angle} ${cx} ${cy})`}>
      {/* 5-star swivel wheel base */}
      <line x1={cx - 7} y1={cy} x2={cx + 7} y2={cy} stroke="#64748b" strokeWidth="1.2" />
      <line x1={cx} y1={cy - 7} x2={cx} y2={cy + 7} stroke="#64748b" strokeWidth="1.2" />
      <line x1={cx - 5} y1={cy - 5} x2={cx + 5} y2={cy + 5} stroke="#64748b" strokeWidth="1.2" />
      <line x1={cx - 5} y1={cy + 5} x2={cx + 5} y2={cy - 5} stroke="#64748b" strokeWidth="1.2" />
      {/* Seat cushion */}
      <rect
        x={cx - 6}
        y={cy - 6}
        width={12}
        height={12}
        rx={3}
        fill="#8b5cf6"
        stroke="#6d28d9"
        strokeWidth="1"
      />
      {/* Backrest */}
      <rect
        x={cx - 7}
        y={cy - 10}
        width={14}
        height={4}
        rx={2}
        fill="#7c3aed"
        stroke="#5b21b6"
        strokeWidth="0.8"
      />
    </g>
  );

  // Helper for rendering dark grey executive chair (for diamond tables 05-08)
  const renderGreyChair = (cx: number, cy: number, angle: number = 0, key?: string) => (
    <g key={key} transform={`rotate(${angle} ${cx} ${cy})`}>
      <rect
        x={cx - 7}
        y={cy - 7}
        width={14}
        height={14}
        rx={4}
        fill="#475569"
        stroke="#1e293b"
        strokeWidth="1.2"
      />
      <rect
        x={cx - 8}
        y={cy - 11}
        width={16}
        height={4.5}
        rx={2}
        fill="#334155"
        stroke="#0f172a"
        strokeWidth="0.8"
      />
    </g>
  );

  // Helper for red electrical outlet marker
  const renderPowerOutlet = (cx: number, cy: number, key?: string) => (
    <g
      key={key}
      className={activeFacility === 'electricidad' ? 'animate-bounce' : ''}
    >
      <circle
        cx={cx}
        cy={cy}
        r={6.5}
        fill="#ef4444"
        stroke="#b91c1c"
        strokeWidth="1"
      />
      {/* White cross inside */}
      <line x1={cx - 3.5} y1={cy - 3.5} x2={cx + 3.5} y2={cy + 3.5} stroke="#ffffff" strokeWidth="1.5" />
      <line x1={cx - 3.5} y1={cy + 3.5} x2={cx + 3.5} y2={cy - 3.5} stroke="#ffffff" strokeWidth="1.5" />
    </g>
  );

  // Helper for purple beanbags / puffs
  const renderBeanbag = (d: string, cx: number, cy: number, key?: string) => (
    <path
      key={key}
      d={d}
      fill="#c084fc"
      stroke="#a855f7"
      strokeWidth="1.2"
      className={`transition-all duration-300 ${
        activeFacility === 'descanso' ? 'filter drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] scale-110' : ''
      }`}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    />
  );

  // Selected stand exhibitor info for tooltip / preview
  const hoveredExhibitor = hoveredStandId ? getExhibitor(hoveredStandId) : null;
  const hoveredCoord = hoveredStandId ? STAND_COORDINATES[hoveredStandId] : null;

  return (
    <div className="relative w-full max-w-[920px] mx-auto select-none bg-white rounded-2xl shadow-sm border border-slate-200/80 p-2 sm:p-4 overflow-hidden">
      <svg
        viewBox="0 0 920 1020"
        className="w-full h-auto block"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Plano interactivo de exhibición"
      >
        <defs>
          {/* Wood hatched pattern for diamond tables */}
          <pattern id="woodHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#d6d3d1" strokeWidth="1" />
          </pattern>
          {/* Subtle grid pattern for floor background */}
          <pattern id="floorGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f1f5f9" strokeWidth="0.8" />
          </pattern>
          {/* Glow filter for selected stand */}
          <filter id="standGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#3b82f6" floodOpacity="0.7" />
          </filter>
          <filter id="badgeShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* ================= BACKGROUND ================= */}
        <rect x="0" y="0" width="920" height="1020" fill="#ffffff" />
        <rect x="15" y="18" width="625" height="912" fill="url(#floorGrid)" />

        {/* ================= ARCHITECTURAL ROOMS ================= */}

        {/* BAR */}
        <g
          className={`cursor-pointer transition-all ${
            activeFacility === 'bar' ? 'filter drop-shadow-[0_0_12px_rgba(234,179,8,0.7)]' : ''
          }`}
          onClick={() => {}}
        >
          <rect
            x="18"
            y="292"
            width="174"
            height="164"
            fill={activeFacility === 'bar' ? '#fef08a' : '#ebebeb'}
            stroke="#000000"
            strokeWidth="3.5"
          />
          <text
            x="105"
            y="384"
            fill="#52525b"
            fontSize="34"
            fontWeight="700"
            fontFamily="system-ui, -apple-system, sans-serif"
            textAnchor="middle"
            letterSpacing="2"
          >
            BAR
          </text>
        </g>

        {/* SALA DE CAPACITACIONES */}
        <g
          className={`cursor-pointer transition-all ${
            activeFacility === 'capacitaciones' ? 'filter drop-shadow-[0_0_12px_rgba(59,130,246,0.7)]' : ''
          }`}
          onClick={() => {}}
        >
          <rect
            x="18"
            y="456"
            width="262"
            height="206"
            fill={activeFacility === 'capacitaciones' ? '#dbeafe' : '#ebebeb'}
            stroke="#000000"
            strokeWidth="3.5"
          />
          <text
            x="149"
            y="548"
            fill="#52525b"
            fontSize="26"
            fontWeight="600"
            fontFamily="system-ui, -apple-system, sans-serif"
            textAnchor="middle"
          >
            Sala de
          </text>
          <text
            x="149"
            y="584"
            fill="#52525b"
            fontSize="26"
            fontWeight="600"
            fontFamily="system-ui, -apple-system, sans-serif"
            textAnchor="middle"
          >
            Capacitaciones
          </text>
        </g>

        {/* Green Board / Tablero below Sala de Capacitaciones */}
        <g>
          {/* Double green line */}
          <rect x="150" y="670" width="130" height="7" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
          <line x1="150" y1="682" x2="280" y2="682" stroke="#10b981" strokeWidth="1.5" />
          <text
            x="215"
            y="702"
            fill="#475569"
            fontSize="13"
            fontWeight="500"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            Tablero
          </text>
        </g>

        {/* BAÑO MUJERES */}
        <g
          className={`cursor-pointer transition-all ${
            activeFacility === 'banos' ? 'filter drop-shadow-[0_0_12px_rgba(236,72,153,0.7)]' : ''
          }`}
        >
          <rect
            x="18"
            y="662"
            width="118"
            height="268"
            fill={activeFacility === 'banos' ? '#fce7f3' : '#ebebeb'}
            stroke="#000000"
            strokeWidth="3.5"
          />
          <text
            x="77"
            y="876"
            fill="#64748b"
            fontSize="13"
            fontWeight="500"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            Baño
          </text>
          <text
            x="77"
            y="894"
            fill="#64748b"
            fontSize="13"
            fontWeight="500"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            Mujeres
          </text>
        </g>

        {/* BAÑO HOMBRES */}
        <g
          className={`cursor-pointer transition-all ${
            activeFacility === 'banos' ? 'filter drop-shadow-[0_0_12px_rgba(59,130,246,0.7)]' : ''
          }`}
        >
          <rect
            x="232"
            y="778"
            width="178"
            height="152"
            fill={activeFacility === 'banos' ? '#e0f2fe' : '#ebebeb'}
            stroke="#000000"
            strokeWidth="3.5"
          />
          <text
            x="272"
            y="855"
            fill="#64748b"
            fontSize="13"
            fontWeight="500"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            Baño
          </text>
          <text
            x="272"
            y="873"
            fill="#64748b"
            fontSize="13"
            fontWeight="500"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            Hombres
          </text>
        </g>

        {/* ACCESO 2° PISO (STAIRS) */}
        <g
          className={`cursor-pointer transition-all ${
            activeFacility === 'escaleras' ? 'filter drop-shadow-[0_0_12px_rgba(99,102,241,0.7)]' : ''
          }`}
        >
          <rect
            x="410"
            y="778"
            width="230"
            height="152"
            fill="#ffffff"
            stroke="#000000"
            strokeWidth="3.5"
          />
          {/* Stair treads */}
          {[794, 808, 822, 836, 850, 864, 878].map((yVal) => (
            <line key={yVal} x1="410" y1={yVal} x2="640" y2={yVal} stroke="#cbd5e1" strokeWidth="1.5" />
          ))}
          {/* Direction indicator arrow */}
          <line x1="458" y1="875" x2="458" y2="795" stroke="#94a3b8" strokeWidth="2" />
          <polygon points="458,788 453,798 463,798" fill="#94a3b8" />

          {/* Curved dashed line for path */}
          <path
            d="M 570 760 L 570 870 C 570 898, 460 898, 460 875"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          <text
            x="512"
            y="896"
            fill="#52525b"
            fontSize="17"
            fontWeight="600"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            Acceso
          </text>
          <text
            x="512"
            y="917"
            fill="#52525b"
            fontSize="17"
            fontWeight="600"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            2° Piso
          </text>
        </g>

        {/* Sofas in hallway */}
        {/* Large sofa in front of Baño Hombres */}
        <g>
          <rect x="258" y="746" width="108" height="28" rx="8" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="312" y1="748" x2="312" y2="772" stroke="#94a3b8" strokeWidth="1" />
        </g>
        {/* Sofa near Stand 15 */}
        <g>
          <rect x="506" y="715" width="58" height="28" rx="6" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="535" y1="716" x2="535" y2="741" stroke="#94a3b8" strokeWidth="1" />
        </g>

        {/* RECEPCIÓN */}
        <g
          className={`cursor-pointer transition-all ${
            activeFacility === 'recepcion' ? 'filter drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]' : ''
          }`}
        >
          {/* L-Shape Reception desk */}
          <path
            d="M 300 86 L 452 86 L 452 148 L 420 148 L 420 110 L 300 110 Z"
            fill="#ffffff"
            stroke="#000000"
            strokeWidth="1.8"
          />
          <text
            x="364"
            y="101"
            fill="#64748b"
            fontSize="12"
            fontWeight="500"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            Recepción
          </text>
        </g>

        {/* CASILLEROS & TELEVISOR on left wall */}
        <g>
          <rect x="16" y="188" width="10" height="80" fill="#7c3aed" stroke="#6d28d9" strokeWidth="1" />
          <text
            x="28"
            y="248"
            fill="#64748b"
            fontSize="11"
            fontFamily="system-ui, -apple-system, sans-serif"
            transform="rotate(-90 28 248)"
          >
            Casilleros
          </text>

          {/* Televisor bracket & label */}
          <line x1="32" y1="140" x2="52" y2="175" stroke="#64748b" strokeWidth="2" />
          <text
            x="58"
            y="152"
            fill="#64748b"
            fontSize="10"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            Televisor
          </text>
        </g>

        {/* TABLERO (WHITEBOARD) ON RIGHT WALL */}
        <g>
          <rect x="603" y="490" width="8" height="48" fill="#d1fae5" stroke="#10b981" strokeWidth="1.2" />
          <text
            x="598"
            y="522"
            fill="#64748b"
            fontSize="10"
            fontFamily="system-ui, -apple-system, sans-serif"
            transform="rotate(90 598 522)"
          >
            Tablero
          </text>
        </g>

        {/* ORGANIC BEANBAGS / PUFFS */}
        {renderBeanbag(
          'M 530 26 C 542 22, 558 26, 555 38 C 552 48, 538 52, 528 44 C 520 38, 522 28, 530 26 Z',
          540,
          36,
          'puff-1'
        )}
        {renderBeanbag(
          'M 580 148 C 592 142, 606 148, 604 162 C 602 172, 586 178, 578 168 C 572 160, 574 152, 580 148 Z',
          590,
          160,
          'puff-2'
        )}
        {renderBeanbag(
          'M 206 422 C 218 416, 234 422, 230 436 C 228 446, 212 452, 204 442 C 198 434, 200 426, 206 422 Z',
          216,
          434,
          'puff-3'
        )}
        {renderBeanbag(
          'M 582 682 C 598 676, 614 686, 610 710 C 606 728, 584 734, 578 720 C 572 708, 574 690, 582 682 Z',
          594,
          704,
          'puff-4'
        )}

        {/* ================= DETAILED STAND FURNITURE ================= */}

        {/* Stand 01 Furniture: Desk, small sofa, 2 purple swivel chairs */}
        <g>
          {/* Side sofa */}
          <rect x="24" y="85" width="16" height="38" rx="4" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
          {/* Desk */}
          <rect x="58" y="88" width="28" height="42" rx="3" fill="#fef3c7" stroke="#d97706" strokeWidth="1" strokeDasharray="3 2" />
          {/* Chairs */}
          {renderPurpleChair(100, 96, -90, 'ch-01-1')}
          {renderPurpleChair(100, 122, -90, 'ch-01-2')}
        </g>

        {/* Stand 02 Furniture: Lounge sofa, 2 light armchairs, cocktail tables */}
        <g>
          {/* Grey sofa at top */}
          <rect x="130" y="28" width="78" height="32" rx="10" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
          {/* Two light cushioned seats */}
          <rect x="138" y="70" width="32" height="32" rx="4" fill="#ffedd5" stroke="#fdba74" strokeWidth="1.2" strokeDasharray="3 2" />
          <rect x="172" y="70" width="32" height="32" rx="4" fill="#ffedd5" stroke="#fdba74" strokeWidth="1.2" strokeDasharray="3 2" />
          {/* Round cocktail tables with 4 yellow stools */}
          <circle cx="225" cy="46" r="10" fill="#ffffff" stroke="#ca8a04" strokeWidth="1.2" />
          <circle cx="215" cy="38" r="4" fill="#fef08a" stroke="#eab308" strokeWidth="1" />
          <circle cx="235" cy="38" r="4" fill="#fef08a" stroke="#eab308" strokeWidth="1" />
          <circle cx="215" cy="54" r="4" fill="#fef08a" stroke="#eab308" strokeWidth="1" />
          <circle cx="235" cy="54" r="4" fill="#fef08a" stroke="#eab308" strokeWidth="1" />

          {/* Another small round table */}
          <circle cx="188" cy="116" r="10" fill="#ffffff" stroke="#ca8a04" strokeWidth="1.2" />
          <circle cx="178" cy="110" r="3.5" fill="#fef08a" stroke="#eab308" strokeWidth="1" />
          <circle cx="198" cy="110" r="3.5" fill="#fef08a" stroke="#eab308" strokeWidth="1" />
          <circle cx="178" cy="122" r="3.5" fill="#fef08a" stroke="#eab308" strokeWidth="1" />
          <circle cx="198" cy="122" r="3.5" fill="#fef08a" stroke="#eab308" strokeWidth="1" />
        </g>

        {/* Stand 03 & 04 Furniture: Honeycomb hexagonal pod cluster */}
        <g>
          {/* Hexagons cluster */}
          {[
            { cx: 138, cy: 185 },
            { cx: 160, cy: 198 },
            { cx: 116, cy: 198 },
            { cx: 138, cy: 235 },
            { cx: 160, cy: 222 },
            { cx: 116, cy: 222 },
          ].map((h, i) => (
            <polygon
              key={i}
              points={`
                ${h.cx},${h.cy - 16}
                ${h.cx + 14},${h.cy - 8}
                ${h.cx + 14},${h.cy + 8}
                ${h.cx},${h.cy + 16}
                ${h.cx - 14},${h.cy + 8}
                ${h.cx - 14},${h.cy - 8}
              `}
              fill="#ffffff"
              stroke="#64748b"
              strokeWidth="1.2"
            />
          ))}

          {/* Chairs around Stand 03 */}
          {renderPurpleChair(138, 154, 180, 'ch-03-top')}
          {renderPurpleChair(90, 185, 90, 'ch-03-left')}
          {renderPurpleChair(186, 185, -90, 'ch-03-right')}

          {/* Chairs around Stand 04 */}
          {renderPurpleChair(138, 266, 0, 'ch-04-bottom')}
          {renderPurpleChair(90, 235, 90, 'ch-04-left')}
          {renderPurpleChair(186, 235, -90, 'ch-04-right')}
        </g>

        {/* Stand 05, 06, 07, 08 Furniture: Four diamond tables with 4 grey chairs each */}
        {[
          { id: '05', cy: 210 },
          { id: '06', cy: 290 },
          { id: '07', cy: 370 },
          { id: '08', cy: 450 },
        ].map((dt) => (
          <g key={dt.id}>
            {/* Diamond table (square rotated 45 deg) */}
            <rect
              x={390 - 24}
              y={dt.cy - 24}
              width="48"
              height="48"
              fill="#fafaf9"
              stroke="#44403c"
              strokeWidth="1.5"
              transform={`rotate(45 390 ${dt.cy})`}
            />
            {/* Inner textured inset */}
            <rect
              x={390 - 18}
              y={dt.cy - 18}
              width="36"
              height="36"
              fill="url(#woodHatch)"
              stroke="#a8a29e"
              strokeWidth="0.8"
              transform={`rotate(45 390 ${dt.cy})`}
            />

            {/* 4 Grey executive chairs along diagonals */}
            {renderGreyChair(390 - 28, dt.cy - 28, -45, `ch-${dt.id}-tl`)}
            {renderGreyChair(390 + 28, dt.cy - 28, 45, `ch-${dt.id}-tr`)}
            {renderGreyChair(390 - 28, dt.cy + 28, -135, `ch-${dt.id}-bl`)}
            {renderGreyChair(390 + 28, dt.cy + 28, 135, `ch-${dt.id}-br`)}

            {/* Red center power outlet */}
            {renderPowerOutlet(390, dt.cy, `pwr-${dt.id}`)}
          </g>
        ))}

        {/* Stand 09, 10, 11, 12 Furniture: Vertical bank along right wall */}
        {[
          { id: '09', cy: 218 },
          { id: '10', cy: 285 },
          { id: '11', cy: 368 },
          { id: '12', cy: 435 },
        ].map((st) => (
          <g key={st.id}>
            {/* Sofa against right wall (wall is at 640) */}
            <rect
              x="606"
              y={st.cy - 24}
              width="28"
              height="48"
              rx="4"
              fill="#cbd5e1"
              stroke="#94a3b8"
              strokeWidth="1.2"
            />
            {/* Desk table */}
            <rect
              x="566"
              y={st.cy - 20}
              width="34"
              height="40"
              rx="2"
              fill="#ffedd5"
              stroke="#fdba74"
              strokeWidth="1"
            />
            {/* Two purple chairs on the left of the desk */}
            {renderPurpleChair(548, st.cy - 12, 90, `ch-${st.id}-1`)}
            {renderPurpleChair(548, st.cy + 12, 90, `ch-${st.id}-2`)}
          </g>
        ))}

        {/* Stand 13 & 14 Furniture: Central tandem double workstation */}
        <g>
          {/* Dotted border enclosure */}
          <rect
            x="515"
            y="490"
            width="76"
            height="132"
            fill="#ffffff"
            stroke="#94a3b8"
            strokeWidth="1.2"
            strokeDasharray="4 3"
          />
          {/* Stand 13 Desk */}
          <rect x="522" y="496" width="62" height="42" fill="#fafaf9" stroke="#64748b" strokeWidth="1" />
          {/* Stand 14 Desk */}
          <rect x="522" y="574" width="62" height="42" fill="#fafaf9" stroke="#64748b" strokeWidth="1" />

          {/* Chairs for 13 */}
          {renderPurpleChair(500, 516, 90, 'ch-13-left')}
          {renderPurpleChair(606, 516, -90, 'ch-13-right')}
          {renderPurpleChair(553, 474, 180, 'ch-13-top')}

          {/* Chairs for 14 */}
          {renderPurpleChair(500, 598, 90, 'ch-14-left')}
          {renderPurpleChair(606, 598, -90, 'ch-14-right')}

          {/* Red sockets in tandem station */}
          {renderPowerOutlet(553, 538, 'pwr-13-a')}
          {renderPowerOutlet(553, 558, 'pwr-13-b')}
          {renderPowerOutlet(553, 576, 'pwr-14')}
        </g>

        {/* Stand 15 Furniture: Lower right lounge area */}
        <g>
          <rect x="540" y="626" width="46" height="26" rx="6" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.2" />
          <rect x="606" y="646" width="22" height="46" rx="4" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.2" />
          <rect x="606" y="694" width="30" height="34" rx="4" fill="#ede9fe" stroke="#c084fc" strokeWidth="1.2" />
        </g>

        {/* Outlets along walls */}
        {renderPowerOutlet(16, 68, 'pwr-w-1')}
        {renderPowerOutlet(16, 146, 'pwr-w-2')}
        {renderPowerOutlet(138, 210, 'pwr-h-mid')}
        {renderPowerOutlet(640, 96, 'pwr-r-1')}
        {renderPowerOutlet(640, 174, 'pwr-r-2')}
        {renderPowerOutlet(640, 252, 'pwr-r-3')}
        {renderPowerOutlet(640, 328, 'pwr-r-4')}
        {renderPowerOutlet(640, 400, 'pwr-r-5')}
        {renderPowerOutlet(640, 574, 'pwr-r-6')}
        {renderPowerOutlet(640, 668, 'pwr-r-7')}
        {renderPowerOutlet(640, 710, 'pwr-r-8')}

        {/* ================= MAIN EXTERNAL ARCHITECTURAL WALLS ================= */}
        {/* Wall path with opening at ENTRADA and recesses */}
        <path
          d="
            M 15 930
            L 15 18
            L 140 18
            L 140 26
            L 215 26
            L 215 18
            L 305 18
            L 305 42
            M 455 42
            L 455 18
            L 640 18
            L 640 930
            L 15 930
          "
          fill="none"
          stroke="#000000"
          strokeWidth="3.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Entrance label above the gap */}
        <text
          x="380"
          y="26"
          fill="#000000"
          fontSize="13"
          fontWeight="600"
          fontFamily="system-ui, -apple-system, sans-serif"
          textAnchor="middle"
          letterSpacing="1"
        >
          ENTRADA
        </text>

        {/* Partition wall above Recepción */}
        <line x1="305" y1="42" x2="305" y2="18" stroke="#000000" strokeWidth="3.5" />
        <line x1="455" y1="42" x2="455" y2="18" stroke="#000000" strokeWidth="3.5" />

        {/* ================= RIGHT COLUMN: CUN LOGO, TITLE & STAND INDEX ================= */}
        {/* Official CUN Logo embedded at top of right column */}
        <image
          href={cunLogoUrl}
          x="685"
          y="20"
          width="215"
          height="56"
          preserveAspectRatio="xMidYMid meet"
        />

        {/* Replaced "Espacios para Exhibición" with "Expositores" */}
        <text
          x="795"
          y="112"
          fill="#0f172a"
          fontSize="26"
          fontWeight="700"
          fontFamily="system-ui, -apple-system, sans-serif"
          textAnchor="middle"
          letterSpacing="0.5"
        >
          Expositores
        </text>

        {/* Vertical list of circular badges (01) through (15) on the right column */}
        {RIGHT_LEGEND_ITEMS.map((item) => {
          const exhibitor = getExhibitor(item.id);
          const isSelected = selectedStandId === item.id;
          const isHovered = hoveredStandId === item.id;
          const isHighlighted = isStandHighlighted(item.id);

          return (
            <g
              key={`legend-${item.id}`}
              className="cursor-pointer transition-transform duration-150"
              onClick={() => onSelectStand(item.id)}
              onMouseEnter={() => onHoverStand(item.id)}
              onMouseLeave={() => onHoverStand(null)}
              style={{
                opacity: isHighlighted ? 1 : 0.25,
                transform: isSelected || isHovered ? 'scale(1.08)' : 'scale(1)',
                transformOrigin: `700px ${item.y}px`,
              }}
            >
              {/* Outer halo when active or hovered */}
              {(isSelected || isHovered) && (
                <circle
                  cx={700}
                  cy={item.y}
                  r={21}
                  fill={exhibitor?.categoryColor || '#3b82f6'}
                  fillOpacity={0.2}
                  stroke={exhibitor?.categoryColor || '#3b82f6'}
                  strokeWidth="2"
                />
              )}

              {/* Badge circle */}
              <circle
                cx={700}
                cy={item.y}
                r={16}
                fill={isSelected ? (exhibitor?.categoryColor || '#1e293b') : '#ffffff'}
                stroke={isSelected ? '#0f172a' : '#000000'}
                strokeWidth={isSelected ? '2.5' : '1.8'}
                filter="url(#badgeShadow)"
              />
              <text
                x={700}
                y={item.y + 5}
                fill={isSelected ? '#ffffff' : '#000000'}
                fontSize="14"
                fontWeight="600"
                fontFamily="system-ui, -apple-system, sans-serif"
                textAnchor="middle"
              >
                {item.id}
              </text>

              {/* Company name preview snippet next to legend badge */}
              {exhibitor && (
                <text
                  x={726}
                  y={item.y + 4}
                  fill={isSelected ? '#2563eb' : '#475569'}
                  fontSize="12"
                  fontWeight={isSelected ? '700' : '500'}
                  fontFamily="system-ui, -apple-system, sans-serif"
                  className="transition-colors"
                >
                  {exhibitor.name.length > 18 ? `${exhibitor.name.substring(0, 18)}…` : exhibitor.name}
                </text>
              )}
            </g>
          );
        })}

        {/* ================= INTERACTIVE STAND BADGES ON FLOOR PLAN ================= */}
        {Object.values(STAND_COORDINATES).map((coord) => {
          const exhibitor = getExhibitor(coord.id);
          const isSelected = selectedStandId === coord.id;
          const isHovered = hoveredStandId === coord.id;
          const isHighlighted = isStandHighlighted(coord.id);

          return (
            <g
              key={`stand-pin-${coord.id}`}
              id={`stand-node-${coord.id}`}
              className="cursor-pointer"
              onClick={() => onSelectStand(coord.id)}
              onMouseEnter={() => onHoverStand(coord.id)}
              onMouseLeave={() => onHoverStand(null)}
              style={{
                opacity: isHighlighted ? 1 : 0.2,
                transition: 'opacity 0.25s ease, transform 0.2s ease',
              }}
            >
              {/* Pulsing ring for selected stand */}
              {isSelected && (
                <>
                  <circle
                    cx={coord.x}
                    cy={coord.y}
                    r={26}
                    fill={exhibitor?.categoryColor || '#3b82f6'}
                    fillOpacity="0.25"
                    className="animate-ping"
                    style={{ animationDuration: '2s' }}
                  />
                  <circle
                    cx={coord.x}
                    cy={coord.y}
                    r={24}
                    fill="none"
                    stroke={exhibitor?.categoryColor || '#2563eb'}
                    strokeWidth="2.5"
                    strokeDasharray="4 2"
                  />
                </>
              )}

              {/* Hover highlight circle */}
              {isHovered && !isSelected && (
                <circle
                  cx={coord.x}
                  cy={coord.y}
                  r={21}
                  fill="#38bdf8"
                  fillOpacity="0.25"
                />
              )}

              {/* Main stand badge circle matching Plano v03.svg */}
              <circle
                cx={coord.x}
                cy={coord.y}
                r={16}
                fill={isSelected ? (exhibitor?.categoryColor || '#2563eb') : '#ffffff'}
                stroke={isSelected ? '#0f172a' : '#000000'}
                strokeWidth={isSelected ? '2.5' : '1.8'}
                filter="url(#badgeShadow)"
              />

              {/* Stand number label */}
              <text
                x={coord.x}
                y={coord.y + 5}
                fill={isSelected ? '#ffffff' : '#000000'}
                fontSize="13"
                fontWeight="700"
                fontFamily="system-ui, -apple-system, sans-serif"
                textAnchor="middle"
              >
                {coord.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Floating mini-tooltip on hover over floor plan */}
      <AnimatePresence>
        {hoveredExhibitor && hoveredCoord && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute pointer-events-none z-20 bg-slate-900/95 text-white text-xs px-3 py-2 rounded-xl shadow-xl border border-slate-700/80 backdrop-blur-md max-w-xs"
            style={{
              left: `${Math.min(Math.max((hoveredCoord.x / 920) * 100, 10), 85)}%`,
              top: `${Math.max((hoveredCoord.y / 1020) * 100 - 9, 4)}%`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div className="flex items-center gap-1.5 font-semibold text-sky-400">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: hoveredExhibitor.categoryColor }} />
              Stand {hoveredExhibitor.standNumber} • {hoveredExhibitor.category}
            </div>
            <div className="font-bold text-white text-sm mt-0.5 leading-tight">{hoveredExhibitor.name}</div>
            <div className="text-slate-300 text-[11px] mt-0.5 line-clamp-1 italic">
              {hoveredExhibitor.slogan}
            </div>
            <div className="text-slate-400 text-[10px] mt-1 flex items-center justify-between border-t border-slate-700/60 pt-1">
              <span>{hoveredCoord.zone}</span>
              <span className="text-sky-300 font-medium">Click para ver más</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
