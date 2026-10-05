import React from 'react';
import { CheckCircle2, Star } from 'lucide-react';

export default function PricingSection() {
  return (
    <section id="planes" className="pt-4 scroll-mt-20">
      <h2 className="text-3xl font-extrabold text-zinc-900 mb-8 flex items-center gap-3 tracking-tight">
        <Star className="w-8 h-8 text-amber-600" /> Nuestros Planes
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Plan Grupal */}
        <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-8 border border-zinc-100 flex flex-col">
          <h3 className="text-2xl font-bold text-zinc-900">Cabalgata Grupal</h3>
          <p className="text-zinc-500 mt-2">Perfecto para fines de semana.</p>
          <div className="my-6">
            <span className="text-4xl font-extrabold text-zinc-900">$100.000</span>
            <span className="text-zinc-500 font-medium"> /jinete</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-center gap-3 text-zinc-700 font-medium"><CheckCircle2 className="w-5 h-5 text-green-500" /> Sábados y Domingos 2:00 PM</li>
            <li className="flex items-center gap-3 text-zinc-700 font-medium"><CheckCircle2 className="w-5 h-5 text-green-500" /> Guía compartido incluido</li>
            <li className="flex items-center gap-3 text-zinc-700 font-medium"><CheckCircle2 className="w-5 h-5 text-green-500" /> Seguro médico de asistencia</li>
          </ul>
        </div>

        {/* Plan Privado */}
        <div className="bg-zinc-900 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl p-8 border border-zinc-800 flex flex-col text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-amber-500 text-zinc-900 font-bold px-4 py-1 rounded-bl-2xl text-sm">Más Exclusivo</div>
          <h3 className="text-2xl font-bold text-white">Cabalgata Privada</h3>
          <p className="text-zinc-400 mt-2">A tu ritmo y con tu grupo.</p>
          <div className="my-6">
            <span className="text-4xl font-extrabold text-white">$100.000</span>
            <span className="text-zinc-400 font-medium"> /jinete</span>
            <div className="text-amber-400 text-sm font-bold mt-2">+ $80.000 (Costo único por guía)</div>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-center gap-3 text-zinc-300 font-medium"><CheckCircle2 className="w-5 h-5 text-amber-500" /> Cualquier día y hora</li>
            <li className="flex items-center gap-3 text-zinc-300 font-medium"><CheckCircle2 className="w-5 h-5 text-amber-500" /> Guía exclusivo solo para ti</li>
            <li className="flex items-center gap-3 text-zinc-300 font-medium"><CheckCircle2 className="w-5 h-5 text-amber-500" /> Seguro médico de asistencia</li>
          </ul>
        </div>

      </div>
    </section>
  );
}