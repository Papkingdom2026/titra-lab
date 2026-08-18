import React from 'react';

export const EquipmentIllustration = ({ id, className = "w-28 h-32" }) => {
  switch (id) {
    case 'burette':
      return (
        <svg className={className} viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Metal Stand backdrop */}
          <rect x="25" y="145" width="70" height="8" rx="3" fill="#64748B" />
          <rect x="58" y="10" width="4" height="135" fill="#94A3B8" />
          <path d="M52 65 H68 V75 H52 Z" fill="#475569" />

          {/* Glass Burette Tube */}
          <rect x="42" y="15" width="16" height="110" rx="3" fill="#E2E8F0" fillOpacity="0.5" stroke="#0284C7" strokeWidth="2" />
          {/* Blue Liquid inside */}
          <rect x="44" y="35" width="12" height="85" fill="#38BDF8" fillOpacity="0.75" />
          <ellipse cx="50" cy="35" rx="6" ry="2" fill="#0284C7" />

          {/* Graduation lines */}
          <line x1="53" y1="25" x2="57" y2="25" stroke="#0F172A" strokeWidth="1.5" />
          <line x1="53" y1="45" x2="57" y2="45" stroke="#0F172A" strokeWidth="1.5" />
          <line x1="53" y1="65" x2="57" y2="65" stroke="#0F172A" strokeWidth="1.5" />
          <line x1="53" y1="85" x2="57" y2="85" stroke="#0F172A" strokeWidth="1.5" />
          <line x1="53" y1="105" x2="57" y2="105" stroke="#0F172A" strokeWidth="1.5" />
          <text x="30" y="28" fill="#0F172A" fontSize="9" fontWeight="bold">0</text>
          <text x="25" y="68" fill="#0F172A" fontSize="9" fontWeight="bold">25</text>
          <text x="25" y="108" fill="#0F172A" fontSize="9" fontWeight="bold">50</text>

          {/* Stopcock Valve & Tip */}
          <path d="M46 125 L54 125 L50 140 Z" fill="#0284C7" />
          <rect x="38" y="123" width="24" height="5" rx="2" fill="#0284C7" />
          <circle cx="50" cy="144" r="2" fill="#38BDF8" />
        </svg>
      );

    case 'pipette':
      return (
        <svg className={className} viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Suction Bulb */}
          <ellipse cx="60" cy="22" rx="14" ry="16" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
          <rect x="56" y="38" width="8" height="8" fill="#DC2626" />

          {/* Glass Pipette Tube */}
          <rect x="57" y="46" width="6" height="35" fill="#E2E8F0" stroke="#0284C7" strokeWidth="1.5" />
          
          {/* Pipette Bulb Middle */}
          <ellipse cx="60" cy="95" rx="14" ry="20" fill="#E2E8F0" fillOpacity="0.6" stroke="#0284C7" strokeWidth="2" />
          <ellipse cx="60" cy="95" rx="12" ry="18" fill="#38BDF8" fillOpacity="0.6" />

          {/* Graduation 25mL mark */}
          <line x1="53" y1="65" x2="67" y2="65" stroke="#DC2626" strokeWidth="2" />
          <text x="70" y="68" fill="#DC2626" fontSize="10" fontWeight="bold">25 mL</text>

          {/* Lower Tip */}
          <rect x="58" y="115" width="4" height="35" fill="#E2E8F0" stroke="#0284C7" strokeWidth="1.5" />
          <path d="M58 150 L62 150 L60 156 Z" fill="#0284C7" />
        </svg>
      );

    case 'flask':
      return (
        <svg className={className} viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Flask Neck */}
          <rect x="52" y="20" width="16" height="35" fill="#E2E8F0" fillOpacity="0.5" stroke="#0284C7" strokeWidth="2" />
          {/* Flask Body */}
          <path d="M52 55 L25 130 C22 138 28 145 36 145 H84 C92 145 98 138 95 130 L68 55 Z" fill="#E2E8F0" fillOpacity="0.5" stroke="#0284C7" strokeWidth="2" />

          {/* Pink Liquid inside */}
          <path d="M38 100 L28 128 C26 134 30 140 37 140 H83 C90 140 94 134 92 128 L82 100 Z" fill="#EC4899" fillOpacity="0.8" />
          <ellipse cx="60" cy="100" rx="22" ry="4" fill="#F472B6" />

          {/* Magnetic Stir Bar */}
          <rect x="48" y="132" width="24" height="6" rx="3" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />

          {/* Flask Graduation Marks */}
          <line x1="42" y1="90" x2="52" y2="90" stroke="#0F172A" strokeWidth="1.5" />
          <line x1="38" y1="110" x2="48" y2="110" stroke="#0F172A" strokeWidth="1.5" />
          <text x="54" y="93" fill="#0F172A" fontSize="9" fontWeight="bold">250 mL</text>
        </svg>
      );

    case 'indicator':
      return (
        <svg className={className} viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Dropper Cap */}
          <path d="M50 15 H70 V28 H50 Z" fill="#EF4444" />
          <rect x="54" y="28" width="12" height="12" fill="#334155" />

          {/* Bottle Body */}
          <rect x="35" y="40" width="50" height="95" rx="8" fill="#F8FAFC" stroke="#0284C7" strokeWidth="2" />

          {/* Liquid Level */}
          <rect x="37" y="65" width="46" height="68" rx="4" fill="#EC4899" fillOpacity="0.75" />

          {/* Label */}
          <rect x="40" y="70" width="40" height="40" rx="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
          <text x="60" y="85" textAnchor="middle" fill="#BE185D" fontSize="10" fontWeight="bold">IND</text>
          <text x="60" y="98" textAnchor="middle" fill="#0F172A" fontSize="8" fontWeight="bold">Phenol</text>
        </svg>
      );

    case 'stand':
      return (
        <svg className={className} viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Heavy Base */}
          <rect x="20" y="135" width="80" height="15" rx="4" fill="#334155" stroke="#1E293B" strokeWidth="2" />
          
          {/* Steel Rod */}
          <rect x="57" y="10" width="6" height="125" fill="#94A3B8" stroke="#64748B" strokeWidth="1" />
          
          {/* Double Clamp */}
          <rect x="45" y="55" width="30" height="12" rx="3" fill="#0284C7" />
          <circle cx="60" cy="61" r="4" fill="#FFFFFF" />
          <rect x="35" y="58" width="10" height="6" rx="1" fill="#475569" />
          <rect x="75" y="58" width="10" height="6" rx="1" fill="#475569" />
        </svg>
      );

    case 'wash_bottle':
      return (
        <svg className={className} viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Curved Straw Spout */}
          <path d="M60 30 Q75 10 90 25" fill="none" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
          
          {/* Bottle Cap */}
          <rect x="50" y="28" width="20" height="12" rx="3" fill="#0284C7" />

          {/* Flexible Plastic Body */}
          <rect x="38" y="40" width="44" height="95" rx="12" fill="#E2E8F0" fillOpacity="0.7" stroke="#0284C7" strokeWidth="2" />

          {/* Water Inside */}
          <rect x="40" y="65" width="40" height="68" rx="8" fill="#38BDF8" fillOpacity="0.5" />
          <text x="60" y="105" textAnchor="middle" fill="#0284C7" fontSize="11" fontWeight="bold">H₂O</text>
        </svg>
      );

    case 'cylinder':
      return (
        <svg className={className} viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Base */}
          <ellipse cx="60" cy="145" rx="28" ry="8" fill="#64748B" />
          {/* Cylinder Body */}
          <rect x="45" y="20" width="30" height="125" rx="4" fill="#E2E8F0" fillOpacity="0.5" stroke="#64748B" strokeWidth="2" />
          {/* Water inside */}
          <rect x="47" y="60" width="26" height="83" fill="#38BDF8" fillOpacity="0.5" />

          {/* Coarse graduation lines */}
          <line x1="65" y1="40" x2="72" y2="40" stroke="#0F172A" strokeWidth="1.5" />
          <line x1="65" y1="70" x2="72" y2="70" stroke="#0F172A" strokeWidth="1.5" />
          <line x1="65" y1="100" x2="72" y2="100" stroke="#0F172A" strokeWidth="1.5" />
          <text x="30" y="43" fill="#0F172A" fontSize="9" fontWeight="bold">100</text>
          <text x="35" y="73" fill="#0F172A" fontSize="9" fontWeight="bold">50</text>
        </svg>
      );

    case 'thermometer':
      return (
        <svg className={className} viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Glass Stem */}
          <rect x="55" y="15" width="10" height="120" rx="5" fill="#E2E8F0" fillOpacity="0.6" stroke="#64748B" strokeWidth="2" />
          {/* Bulb */}
          <circle cx="60" cy="140" r="10" fill="#EF4444" stroke="#64748B" strokeWidth="2" />
          
          {/* Red Alcohol Column */}
          <rect x="58" y="55" width="4" height="80" fill="#EF4444" />

          {/* Temperature degree lines */}
          <line x1="50" y1="35" x2="54" y2="35" stroke="#0F172A" strokeWidth="1.5" />
          <line x1="50" y1="65" x2="54" y2="65" stroke="#0F172A" strokeWidth="1.5" />
          <line x1="50" y1="95" x2="54" y2="95" stroke="#0F172A" strokeWidth="1.5" />
          <text x="35" y="38" fill="#0F172A" fontSize="9" fontWeight="bold">100°C</text>
          <text x="40" y="68" fill="#0F172A" fontSize="9" fontWeight="bold">50°C</text>
        </svg>
      );

    default:
      return null;
  }
};
