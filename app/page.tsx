"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { 
  Calendar, ShieldCheck, Info, Star, PlayCircle, Camera, X, Gift, Clock, 
  Home, MapPin, BadgeCheck, BookOpen, Image as ImageIcon, Phone, 
  Coffee, Compass, CheckCircle2, Shield, Heart, Sun
} from 'lucide-react';
// import { db } from '../lib/firebase'; 
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import PricingSection from '../components/Planes';

// Datos de demostración inyectados
const defaultData = {
  businessName: "Cabalgatas Bogotá",
  heroTitle: "Cabalgatas cerca a Bogotá",
  heroSubtitle: "Conecta con la naturaleza en la sabana de Bogotá.",
  basePrice: 100000,
  guidePrice: 80000,
  whatsappNumber: "573000000000",
  enableExitIntent: true,
  urgencyText: "¡Pocos cupos para este fin de semana!",
  mapAddress: "La Calera, Cundinamarca",
  googleRating: "5.0",
  googleReviewCount: "150",
  gallery: [
    { id: 1, url: "https://images.unsplash.com/photo-1553755490-67c2957b45f9?q=80&w=1000&auto=format&fit=crop", title: "Nuestros Caballos", desc: "Caballos mansos y bien cuidados." },
    { id: 2, url: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop", title: "Paisajes", desc: "Rutas por la sabana de Bogotá." },
    { id: 3, url: "https://images.unsplash.com/photo-1580210082728-98e6c757c91c?q=80&w=1000&auto=format&fit=crop", title: "Miradores", desc: "Vistas increíbles durante el recorrido." }
  ],
  reviews: [
    { id: 1, author: "María Gómez", text: "Una experiencia increíble, los caballos muy dóciles y los paisajes de la sabana son hermosos.", rating: 5 },
    { id: 2, author: "Carlos Ruiz", text: "Excelente plan para salir de Bogotá el fin de semana. Recomendado al 100%.", rating: 5 }
  ],
  faqs: [
    { id: 1, q: "¿Necesito experiencia previa?", a: "No, nuestros caballos son mansos y el guía te enseñará todo lo básico antes de arrancar." },
    { id: 2, q: "¿Qué incluye el precio?", a: "Incluye el caballo, el recorrido, guía y seguro médico de asistencia." }
  ]
};

export default function ClientePage() {
  
  const [data] = useState<any>(defaultData); 
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('10:00');
  const [jinetes, setJinetes] = useState(2);
  const [telefono, setTelefono] = useState('');
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);

  useEffect(() => {
    if (data?.enableExitIntent && !hasShownPopup) {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0) { setShowExitPopup(true); setHasShownPopup(true); }
      };
      document.addEventListener('mouseleave', handleMouseLeave);
      return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }
  }, [data, hasShownPopup]);

  const trackWhatsAppClick = (ubicacionBoton: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'whatsapp_click', {
        event_category: 'Conversión Contacto',
        event_label: ubicacionBoton,
        value: 1
      });
    }
  };

  const esFinDeSemana = fecha ? [6, 0].includes(new Date(fecha + 'T12:00:00').getDay()) : false;
  const esDosPm = hora === '14:00';
  const esGrupal = esFinDeSemana && esDosPm;
  const precioBase = data?.basePrice || 100000;
  const costoGuia = esGrupal ? 0 : (data?.guidePrice || 80000);
  const totalCalculado = (jinetes * precioBase) + costoGuia;
  const tipoCabalgataStr = esGrupal ? 'Grupal (Sin cobro extra de guía)' : 'Privada (Incluye guía exclusivo)';
  const whatsappNum = data?.whatsappNumber || "573000000000";
  
  const mensajeReserva = `Hola, quiero reservar el ${fecha || 'próximo fin de semana'} a las ${hora}. Somos ${jinetes} personas. Modalidad: ${esGrupal ? 'Grupal' : 'Privada'}. Cotización: $${totalCalculado.toLocaleString()}`;
  const linkCotizador = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(mensajeReserva)}`;
  const linkGancho = `https://wa.me/${whatsappNum}?text=${encodeURIComponent("¡Hola! Quiero información sobre las cabalgatas en Bogotá. 🐎")}`;
  const isValidPhone = telefono.trim().length >= 7;

  const handleReservaWhatsApp = async (e: React.MouseEvent) => {
    e.preventDefault(); 
    if (!isValidPhone) return;
    trackWhatsAppClick('Boton_Cotizador');
    
    // Descomentar cuando Firebase esté configurado
    /*
    try {
      await addDoc(collection(db, 'reservas'), {
        plan: esGrupal ? 'Cabalgata Grupal' : 'Cabalgata Privada',
        fecha: fecha || 'Por definir',
        hora: hora,
        jinetes: jinetes,
        telefono: telefono,
        total: totalCalculado,
        fechaCreacion: serverTimestamp(),
        origen: 'Web Español - Bogotá'
      });
    } catch (error) {
      console.error("Error guardando reserva silenciosa:", error);
    }
    */
    window.open(linkCotizador, '_blank');
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": data?.businessName || "Cabalgatas Bogotá",
    "description": data?.heroSubtitle || "Experiencias únicas a caballo en los paisajes de la sabana de Bogotá.",
    "url": "https://cabalgatasbogota.co",
    "image": "https://cabalgatasbogota.co/cabalgatas-en-bogota.webp",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bogotá",
      "addressRegion": "Cundinamarca",
      "addressCountry": "CO"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "COP",
      "price": precioBase.toString(),
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfbfd] font-sans selection:bg-amber-200 text-zinc-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      <section id="inicio" className="relative h-[85vh] bg-[#fbfbfd] overflow-hidden flex flex-col justify-center">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ maskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)' }}
        >
          <div className="absolute inset-0 bg-zinc-800 w-full h-full"></div> 
          <Image src="https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=2000&auto=format&fit=crop" alt="Jinetes en la Sabana de Bogotá" fill priority={true} quality={75} className="absolute inset-0 w-full h-full object-cover" sizes="(max-width: 768px) 768px, 1200px" />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-20 w-full max-w-4xl mx-auto px-6 pb-24 md:pb-12 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tighter drop-shadow-xl">{data?.heroTitle}</h1>
          <p className="text-zinc-100 text-xl md:text-2xl font-medium mb-10 tracking-wide drop-shadow-md max-w-2xl">{data?.heroSubtitle}</p>
          <a href={linkGancho} target="_blank" rel="noreferrer" onClick={() => trackWhatsAppClick('Boton_Principal_Hero')} className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-transform hover:scale-105">
            Chatear con Asesor
          </a>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 mt-[-60px] md:mt-[-120px] relative z-20 space-y-16">
        
        <section id="cotizador" className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.06)] p-8 md:p-10 border border-white scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4 border-b border-zinc-200/50 pb-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 flex items-center gap-3 tracking-tight"><Calendar className="text-amber-600 w-8 h-8" /> Cotiza y Reserva</h2>
            {data.urgencyText && <div className="bg-red-50 text-red-900 px-4 py-2 rounded-xl text-sm font-bold animate-pulse flex items-center gap-2 border border-red-100"><Clock className="w-4 h-4"/>{data.urgencyText}</div>}
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-bold text-zinc-800 mb-3">1. Selecciona Fecha y Hora</label>
                <div className="flex gap-3">
                  <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} className="w-full p-4 border border-zinc-200/50 rounded-2xl bg-white/50 text-zinc-900 font-bold outline-none focus:border-green-600 focus:ring-4 focus:ring-green-600/10 transition-all shadow-sm" />
                  <select value={hora} onChange={(e) => setHora(e.target.value)} className="w-full p-4 border border-zinc-200/50 rounded-2xl bg-white/50 text-zinc-900 font-bold outline-none focus:border-green-600 focus:ring-4 focus:ring-green-600/10 transition-all shadow-sm">
                    <option value="10:00">10:00 AM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-zinc-800 mb-3">2. Número de Jinetes</label>
                <div className="flex items-center gap-4 bg-white/50 p-2 rounded-2xl border border-zinc-200/50 w-fit shadow-sm">
                  <button onClick={() => setJinetes(Math.max(1, jinetes - 1))} className="w-12 h-12 bg-white hover:bg-zinc-100 text-zinc-900 rounded-xl font-extrabold shadow-sm border border-zinc-100 transition-all">-</button>
                  <span className="w-8 text-center font-extrabold text-2xl text-zinc-900">{jinetes}</span>
                  <button onClick={() => setJinetes(jinetes + 1)} className="w-12 h-12 bg-white hover:bg-zinc-100 text-zinc-900 rounded-xl font-extrabold shadow-sm border border-zinc-100 transition-all">+</button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-800 mb-3">3. Tu número de WhatsApp</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Phone className="h-5 w-5 text-zinc-400" /></div>
                  <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Ej: 300 123 4567" className="w-full pl-12 p-4 border border-zinc-200/50 rounded-2xl bg-white/50 text-zinc-900 font-bold outline-none focus:border-green-600 focus:ring-4 focus:ring-green-600/10 transition-all shadow-sm placeholder-zinc-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-zinc-900 rounded-[2rem] p-8 text-white shadow-2xl flex flex-col justify-between border border-zinc-800">
              <div>
                <p className="text-xs font-bold text-amber-500 mb-5 bg-amber-500/10 inline-block px-4 py-2 rounded-xl uppercase tracking-wider">{tipoCabalgataStr}</p>
                <div className="flex justify-between items-center mb-4"><span className="text-zinc-400 font-medium">{jinetes} Jinetes x ${precioBase.toLocaleString()}</span><span className="font-bold text-xl text-white">${(jinetes * precioBase).toLocaleString()}</span></div>
                {!esGrupal && <div className="flex justify-between items-center mb-4 text-red-300 bg-red-500/10 p-4 rounded-xl border border-red-500/10"><span className="font-semibold text-sm">Costo Guía Exclusivo</span><span className="font-bold">+${costoGuia.toLocaleString()}</span></div>}
                <div className="border-t border-zinc-800 my-6"></div>
                <div className="flex justify-between items-end"><span className="text-lg text-zinc-400 font-medium tracking-tight">Total estimado</span><span className="text-5xl font-extrabold text-amber-500 tracking-tighter">${totalCalculado.toLocaleString()}</span></div>
              </div>
              <button onClick={handleReservaWhatsApp} disabled={!isValidPhone} className={`mt-8 block w-full text-center font-extrabold py-5 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all duration-300 ${isValidPhone ? 'bg-green-600 hover:bg-green-700 text-white cursor-pointer' : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'}`}>
                {isValidPhone ? 'Enviar por WhatsApp' : 'Ingresa tu número'}
              </button>
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-6 scroll-mt-20">
          <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-8 border border-white">
            <h3 className="text-2xl font-extrabold text-zinc-900 mb-6 tracking-tight flex items-center gap-2"><Compass className="w-7 h-7 text-amber-600"/> La Experiencia</h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[1.1rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-200 before:to-transparent">
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-amber-100 text-amber-600 shadow shrink-0 z-10"><Coffee className="w-4 h-4" /></div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/60 p-4 rounded-2xl border border-zinc-100 shadow-sm">
                  <h4 className="font-bold text-zinc-900">1. Bienvenida</h4><p className="text-sm text-zinc-500 mt-1">Llegada a la finca, inducción rápida y tinto campesino.</p>
                </div>
              </div>
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-amber-100 text-amber-600 shadow shrink-0 z-10"><Heart className="w-4 h-4" /></div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/60 p-4 rounded-2xl border border-zinc-100 shadow-sm">
                  <h4 className="font-bold text-zinc-900">2. Conexión</h4><p className="text-sm text-zinc-500 mt-1">Te asignamos el caballo ideal según tu nivel de experiencia.</p>
                </div>
              </div>
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-amber-100 text-amber-600 shadow shrink-0 z-10"><Camera className="w-4 h-4" /></div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/60 p-4 rounded-2xl border border-zinc-100 shadow-sm">
                  <h4 className="font-bold text-zinc-900">3. El Recorrido</h4><p className="text-sm text-zinc-500 mt-1">Ruta guiada por miradores, senderos ecológicos y naturaleza pura.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-8 border border-white">
              <h3 className="text-2xl font-extrabold text-zinc-900 mb-6 tracking-tight flex items-center gap-2"><CheckCircle2 className="w-7 h-7 text-green-600"/> ¿Qué traer?</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 bg-white/60 p-3 rounded-2xl border border-zinc-100 shadow-sm"><div className="bg-white p-2 rounded-xl shadow-sm border border-zinc-50"><Sun className="w-5 h-5 text-amber-500"/></div><span className="font-medium text-zinc-700">Bloqueador solar y gorra</span></li>
                <li className="flex items-center gap-4 bg-white/60 p-3 rounded-2xl border border-zinc-100 shadow-sm"><div className="bg-white p-2 rounded-xl shadow-sm border border-zinc-50"><ShieldCheck className="w-5 h-5 text-zinc-500"/></div><span className="font-medium text-zinc-700">Pantalón largo (jean o sudadera)</span></li>
                <li className="flex items-center gap-4 bg-white/60 p-3 rounded-2xl border border-zinc-100 shadow-sm"><div className="bg-white p-2 rounded-xl shadow-sm border border-zinc-50"><MapPin className="w-5 h-5 text-zinc-500"/></div><span className="font-medium text-zinc-700">Zapatos cerrados (botas o tenis)</span></li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-[2.5rem] shadow-xl p-8 border border-zinc-700 text-white relative overflow-hidden">
              <Shield className="absolute -right-4 -top-4 w-32 h-32 text-white/5 rotate-12" />
              <h3 className="text-xl font-extrabold mb-2 tracking-tight">Viaja Asegurado</h3>
              <p className="text-zinc-300 text-sm leading-relaxed mb-5">Tu bienestar es nuestra prioridad. Todas nuestras rutas incluyen póliza de asistencia médica con <b>Magenta Seguros</b>.</p>
              <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 font-bold px-4 py-2.5 rounded-xl text-sm border border-green-500/30"><ShieldCheck className="w-4 h-4"/> Cobertura Total Incluida</div>
            </div>
          </div>
        </section>

        {/* AQUÍ SE ACTIVA LA SECCIÓN DE PLANES */}
        <PricingSection />

        <section id="ubicacion" className="pt-4 scroll-mt-20">
          <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-white overflow-hidden">
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-zinc-50/50 to-white/50">
              <div>
                <div className="flex items-center gap-2 mb-2"><h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">{data.businessName}</h2><BadgeCheck className="w-6 h-6 text-blue-500 fill-current" aria-hidden="true" /></div>
                <p className="text-zinc-600 font-medium flex items-center gap-2"><MapPin className="w-4 h-4" aria-hidden="true"/> {data.mapAddress}</p>
              </div>
              <div className="flex flex-col items-center md:items-end">
                <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-zinc-100">
                   <span className="text-3xl font-extrabold text-zinc-900 tracking-tight">{data.googleRating}</span>
                   <div className="flex text-amber-400"><Star className="w-5 h-5 fill-current"/><Star className="w-5 h-5 fill-current"/><Star className="w-5 h-5 fill-current"/><Star className="w-5 h-5 fill-current"/><Star className="w-5 h-5 fill-current"/></div>
                </div>
                <p className="text-sm font-medium text-zinc-500 mt-3">Basado en {data.googleReviewCount}+ opiniones</p>
              </div>
            </div>
          </div>
        </section>

        <section id="galeria" className="pt-4 scroll-mt-20">
          <h2 className="text-3xl font-extrabold text-zinc-900 mb-8 flex items-center gap-3 tracking-tight"><Camera className="w-8 h-8 text-amber-600" /> Galería</h2>
          <div className="flex gap-5 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
            {data.gallery.map((item: any) => (
              <div key={item.id} className="min-w-[280px] md:min-w-[320px] snap-center bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 overflow-hidden group">
                <div className="h-56 overflow-hidden relative bg-zinc-100">
                  <Image src={item.url} alt={item.title || 'Foto'} fill quality={75} className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" sizes="(max-width: 768px) 100vw, 320px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent opacity-80"></div>
                  {item.title && <h3 className="absolute bottom-5 left-5 text-white font-bold text-lg tracking-tight">{item.title}</h3>}
                </div>
                {item.desc && <div className="p-5"><p className="text-zinc-600 text-sm leading-relaxed">{item.desc}</p></div>}
              </div>
            ))}
          </div>
        </section>

        <section id="reviews" className="pt-4 scroll-mt-20">
          <h2 className="text-3xl font-extrabold text-zinc-900 mb-8 tracking-tight">Jinetes Felices</h2>
          <div className="flex gap-5 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
            {data.reviews.map((review: any) => (
              <div key={review.id} className="min-w-[300px] bg-white p-7 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 snap-center flex flex-col justify-between">
                <div>
                  <div className="flex text-amber-400 mb-4">{[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}</div>
                  <p className="text-zinc-600 italic mb-5 text-sm leading-relaxed tracking-wide">"{review.text}"</p>
                </div>
                <div className="flex items-center justify-between mt-4 pt-5 border-t border-zinc-100">
                  <span className="font-bold text-sm text-zinc-900">{review.author}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="faq" className="pb-16 scroll-mt-20">
          <h2 className="text-3xl font-extrabold text-zinc-900 mb-10 text-center tracking-tight">Preguntas Frecuentes</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {data.faqs.map((faq: any) => (
              <details key={faq.id} className="group bg-white rounded-2xl border border-zinc-200 cursor-pointer overflow-hidden shadow-sm transition-all hover:border-zinc-300 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center font-bold p-6 text-zinc-800 bg-white group-open:bg-zinc-50/50 transition-colors">{faq.q}</summary>
                <div className="text-zinc-600 px-6 pb-6 bg-zinc-50/50 pt-2 border-t border-zinc-100 leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-zinc-950 text-zinc-400 py-16 text-center relative z-20 mt-12 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-sm font-medium tracking-wide text-zinc-500">© {new Date().getFullYear()} Cabalgatas Bogotá. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}