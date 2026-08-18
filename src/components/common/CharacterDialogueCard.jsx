import React from 'react';
import { CHARACTERS } from '../../data/caseData';
import { MessageSquare, User } from 'lucide-react';

export const CharacterDialogueCard = ({ characterId, text, dialogue, title = null, children }) => {
  const char = CHARACTERS[characterId] || CHARACTERS.maya;
  const content = text || dialogue || children || '';

  // Character Avatars mapping
  const avatarIcons = {
    director: { emoji: '👨‍💼', color: 'from-blue-600 to-slate-800', border: 'border-blue-500/40', tagColor: 'bg-blue-500/15 text-blue-300 border-blue-500/30' },
    maya: { emoji: '👩‍🔬', color: 'from-cyan-600 to-slate-800', border: 'border-cyan-500/40', tagColor: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30' },
    leo: { emoji: '👨‍🔬', color: 'from-amber-600 to-slate-800', border: 'border-amber-500/40', tagColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
    ai: { emoji: '🤖', color: 'from-emerald-600 to-slate-800', border: 'border-emerald-500/40', tagColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' }
  };

  const style = avatarIcons[characterId] || avatarIcons.maya;

  return (
    <div className="w-full flex items-start gap-3.5 my-3 font-sans animate-fade-in">
      
      {/* Left Column: Character Avatar Badge */}
      <div className="flex flex-col items-center shrink-0">
        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${style.color} border ${style.border} flex items-center justify-center text-2xl md:text-3xl shadow-md`}>
          <span>{style.emoji}</span>
        </div>
      </div>

      {/* Right Column: Chat Message Bubble */}
      <div className="flex-1 max-w-4xl space-y-1.5">
        
        {/* Character Name & Role Header */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="font-bold text-slate-100 text-sm md:text-base">
            {char.name}
          </span>
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${style.tagColor}`}>
            {char.role}
          </span>
          <span className="text-xs text-slate-400 italic hidden sm:inline">
            • {char.trait}
          </span>
        </div>

        {/* Message Bubble */}
        <div className="glass-card chat-tail-left rounded-2xl rounded-tl-sm p-4 md:p-5 border border-slate-700/60 text-slate-100 shadow-md space-y-1.5">
          {title && (
            <div className="flex items-center gap-1.5 text-xs md:text-sm font-semibold text-sky-400 border-b border-slate-800 pb-1.5 mb-1.5">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{title}</span>
            </div>
          )}
          <p className="text-sm md:text-base leading-relaxed text-slate-200 font-normal">
            "{content}"
          </p>
        </div>

      </div>

    </div>
  );
};
