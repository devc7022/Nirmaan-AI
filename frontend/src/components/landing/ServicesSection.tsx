'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  HardHat,
  Users,
  Grid,
  Paintbrush,
  Sparkles,
  Zap,
  Wrench,
  Hammer,
  UserCheck,
  Cog,
  CheckCircle2,
  Droplet,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const services = [
    { title: 'Civil Labour', description: 'Experienced mason & shuttering workforces for structural civil works.', icon: HardHat, color: 'text-orange-400', badge: 'Structural' },
    { title: 'General Labour', description: 'Reliable site helpers for material handling, excavation, and cleaning.', icon: Users, color: 'text-amber-400', badge: 'On-Demand' },
    { title: 'Tile Mason', description: 'Expert tile layers for marble, vitrified, granite, and wall cladding.', icon: Grid, color: 'text-emerald-400', badge: 'Precision' },
    { title: 'POP & Punning', description: 'Skilled plaster of Paris applicators and wall surface smoothing experts.', icon: Layers, color: 'text-purple-400', badge: 'Finishing' },
    { title: 'Primer', description: 'Professional coat priming for interior and exterior concrete prep.', icon: Droplet, color: 'text-blue-400', badge: 'Surface Prep' },
    { title: 'Painting', description: 'Quality emulsion, enamel, and texture paint specialists.', icon: Paintbrush, color: 'text-pink-400', badge: 'Exterior & Interior' },
    { title: 'Chawk Mitti', description: 'Master wall putty & chawk mitti leveling technicians.', icon: Sparkles, color: 'text-indigo-400', badge: 'Wall Prep' },
    { title: 'Polish', description: 'Wood polish, PU, melamine, and marble floor polishing crews.', icon: Sparkles, color: 'text-yellow-400', badge: 'High Gloss' },
    { title: 'Electrician', description: 'Licensed wiremen for conduit piping, DB installation, and fittings.', icon: Zap, color: 'text-amber-400', badge: 'Safety Certified' },
    { title: 'Plumber', description: 'CPVC, UPVC pipe fitters, drainage, and sanitary fixture installers.', icon: Wrench, color: 'text-cyan-400', badge: 'Sanitary & Piping' },
    { title: 'Carpenter', description: 'Formwork carpenters, furniture makers, and door/window fitters.', icon: Hammer, color: 'text-orange-400', badge: 'Woodwork' },
    { title: 'Supervisor', description: 'Experienced site commanders for daily attendance, quality, and safety.', icon: UserCheck, color: 'text-emerald-400', badge: 'Site Lead' },
    { title: 'Machine Operator', description: 'Certified operators for JCB, cranes, concrete mixers, and compactors.', icon: Cog, color: 'text-rose-400', badge: 'Equipment' },
  ];

  return (
    <section id="services" className="py-24 bg-zinc-950 border-t border-zinc-800/80 relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-3.5 py-1.5 rounded-full border border-orange-500/20">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span>Skilled Manpower Catalog</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            What We Do – <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">Skilled Manpower</span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Skilled manpower for every stage of construction, from groundwork civil labour to premium interior finishing.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="relative group rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-4 shadow-xl hover:border-orange-500/40 transition-all duration-300 transform hover:-translate-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform shadow-inner`}>
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md bg-zinc-950 text-orange-400 border border-zinc-800">
                    {item.badge}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors flex items-center justify-between">
                    <span>{item.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-orange-400 opacity-0 group-hover:opacity-100 transition-all" />
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center text-[11px] font-medium text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                  <span>Available for Deployment</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
