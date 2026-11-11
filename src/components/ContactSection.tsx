import { useState } from 'react';
import { MapPin, Clock, Mail, Phone, MessageCircle, Send, CheckCircle2, Copy } from 'lucide-react';
import { WHATSAPP_PHONE } from '../context/CartContext.tsx';

export default function ContactSection() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    asunto: 'Consulta general',
    mensaje: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const contactData = {
    direccion: 'Av. Fascio 942, San Salvador de Jujuy, Jujuy, Argentina (CP 4600)',
    horariosSemana: 'Lunes a Viernes: 09:00 a 13:00 hs y 17:00 a 21:00 hs',
    horariosSabado: 'Sábados: 09:30 a 13:30 hs',
    horariosDomingo: 'Domingos y Feriados: Cerrado al público (consultas por WhatsApp)',
    email: 'contacto@gaming3d.ar',
    emailAlt: 'luisaramayo051@gmail.com',
    telefono: '+54 9 388 459 7391',
    telefonoRaw: WHATSAPP_PHONE
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactData.emailAlt);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.mensaje.trim()) return;

    const waMsg = `¡Hola Gaming 3D! 👋\nMi nombre es *${form.nombre}* (${form.email || 'Sin email especificado'}).\n*Asunto:* ${form.asunto}\n*Mensaje:* ${form.mensaje}\n\n_Vivir y jugar con grandeza._`;
    const waUrl = `https://wa.me/${contactData.telefonoRaw}?text=${encodeURIComponent(waMsg)}`;

    setSubmitted(true);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contacto" className="py-20 bg-slate-950 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            <Mail className="w-4 h-4" />
            <span>Atención Personalizada</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
            Ponte en Contacto con Gaming 3D
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            ¿Buscas una pieza personalizada, cotización para tu setup o retirar tu pedido en nuestro taller en Jujuy? Escríbenos o visítanos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Information Cards (Col 5) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Dirección Física */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-3 text-amber-400">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Dirección Física
                </h3>
              </div>
              <p className="text-sm text-slate-200 font-medium pl-11">
                {contactData.direccion}
              </p>
              <p className="text-xs text-slate-500 pl-11">
                San Salvador de Jujuy, Provincia de Jujuy, República Argentina.
              </p>
            </div>

            {/* Horarios de Atención */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-3 text-amber-400">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Horarios de Atención
                </h3>
              </div>
              <div className="text-xs text-slate-300 space-y-1.5 pl-11">
                <p className="flex justify-between">
                  <span className="text-slate-400">Lunes a Viernes:</span>
                  <span className="font-semibold text-white">09:00 - 13:00 / 17:00 - 21:00</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-slate-400">Sábados:</span>
                  <span className="font-semibold text-white">09:30 - 13:30</span>
                </p>
                <p className="flex justify-between text-slate-500">
                  <span>Domingos y feriados:</span>
                  <span>Cerrado (Online 24/7)</span>
                </p>
              </div>
            </div>

            {/* Correo Electrónico & WhatsApp */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center gap-3 text-amber-400">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Correo Electrónico & Canales
                </h3>
              </div>

              <div className="space-y-2 pl-11 text-xs">
                <div>
                  <span className="text-slate-400 block mb-0.5">Correo principal:</span>
                  <div className="flex items-center justify-between bg-slate-950 p-2 rounded-lg border border-slate-800">
                    <span className="font-mono text-slate-200">{contactData.email}</span>
                    <button
                      onClick={handleCopyEmail}
                      className="text-slate-400 hover:text-amber-400 cursor-pointer"
                      title="Copiar correo"
                    >
                      {copiedEmail ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block mb-0.5">Contacto directo / Soporte:</span>
                  <span className="font-mono text-slate-300 block">{contactData.emailAlt}</span>
                </div>

                <div className="pt-2">
                  <span className="text-slate-400 block mb-1">WhatsApp oficial:</span>
                  <a
                    href={`https://wa.me/${contactData.telefonoRaw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/50 border border-emerald-800/60 text-emerald-300 hover:bg-emerald-900/50 transition-colors font-mono font-semibold"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>{contactData.telefono}</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Contact Form (Col 7) */}
          <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8">
            <h3 className="text-xl font-bold font-display text-white mb-2">
              Envíanos tu Consulta o Solicitud de Fabricación
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Te respondemos en el día con asesoramiento sobre filamentos, tiempos de impresión y costos.
            </p>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">¡Mensaje preparado con éxito!</h4>
                <p className="text-xs text-emerald-300 max-w-sm mx-auto">
                  Se ha generado la conversación con nuestro número de WhatsApp para atenderte de inmediato.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ nombre: '', email: '', asunto: 'Consulta general', mensaje: '' });
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white rounded-lg transition-colors cursor-pointer"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Tu Nombre *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Martín Solís"
                      value={form.nombre}
                      onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      placeholder="tunombre@ejemplo.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Motivo de la Consulta
                  </label>
                  <select
                    value={form.asunto}
                    onChange={(e) => setForm({ ...form, asunto: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer"
                  >
                    <option value="Consulta sobre producto del catálogo">Consulta sobre producto del catálogo</option>
                    <option value="Cotización de pieza 3D a medida">Cotización de pieza 3D a medida (STL / CAD)</option>
                    <option value="Retiro en persona en taller Jujuy">Retiro en persona en taller Jujuy</option>
                    <option value="Ventas por mayor o revendedores">Ventas por mayor o revendedores</option>
                    <option value="Otro asunto">Otro asunto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Detalle del Mensaje *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Cuéntanos qué producto o soporte necesitas, medidas, color o cualquier duda técnica..."
                    value={form.mensaje}
                    onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-amber-500/10 active:scale-95 transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Enviar Consulta a WhatsApp Oficial</span>
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
