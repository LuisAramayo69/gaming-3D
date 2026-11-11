import { useState } from 'react';
import { MapPin, Clock, Mail, MessageCircle, Send, CheckCircle2, Copy } from 'lucide-react';
import { WHATSAPP_PHONE } from '../context/CartContext.tsx';

export default function ContactSection() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    asunto: 'Consulta de producto',
    mensaje: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const contactData = {
    direccion: 'San Pedro de Jujuy, Jujuy, Argentina',
    direccionDetalle: 'Taller de producción y entregas coordinadas.',
    horariosSemana: 'Lunes a Viernes: 09:00 a 13:00 hs y 17:00 a 21:00 hs',
    horariosSabado: 'Sábados: 09:30 a 13:30 hs',
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

    const waMsg = `Hola Gaming 3D.\nMi nombre es *${form.nombre}* (${form.email || 'Sin email indicado'}).\n*Asunto:* ${form.asunto}\n*Mensaje:* ${form.mensaje}\n\n_Gaming 3D · San Pedro de Jujuy_`;
    const waUrl = `https://wa.me/${contactData.telefonoRaw}?text=${encodeURIComponent(waMsg)}`;

    setSubmitted(true);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contacto" className="py-20 bg-[#090d16] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span>Atención & Taller</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
            Canales de Contacto
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Información de atención comercial, pedidos especiales y retiro en San Pedro de Jujuy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Information Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Dirección Física */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-slate-800 text-slate-300">
                  <MapPin className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Dirección Física
                </h3>
              </div>
              <p className="text-sm text-slate-200 font-medium pl-10">
                {contactData.direccion}
              </p>
              <p className="text-xs text-slate-500 pl-10">
                {contactData.direccionDetalle}
              </p>
            </div>

            {/* Horarios de Atención */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-slate-800 text-slate-300">
                  <Clock className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Horarios de Atención
                </h3>
              </div>
              <div className="text-xs text-slate-300 space-y-1.5 pl-10">
                <p className="flex justify-between">
                  <span className="text-slate-400">Lunes a Viernes:</span>
                  <span className="font-semibold text-white">09:00 - 13:00 / 17:00 - 21:00 hs</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-slate-400">Sábados:</span>
                  <span className="font-semibold text-white">09:30 - 13:30 hs</span>
                </p>
                <p className="flex justify-between text-slate-500">
                  <span>Domingos y feriados:</span>
                  <span>Consultas digitales</span>
                </p>
              </div>
            </div>

            {/* Correo Electrónico & WhatsApp */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-slate-800 text-slate-300">
                  <Mail className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Correo & Mensajería
                </h3>
              </div>

              <div className="space-y-2 pl-10 text-xs">
                <div>
                  <span className="text-slate-400 block mb-1">Correo electrónico:</span>
                  <div className="flex items-center justify-between bg-slate-950 p-2 rounded border border-slate-800">
                    <span className="font-mono text-slate-300 text-xs">{contactData.emailAlt}</span>
                    <button
                      onClick={handleCopyEmail}
                      className="text-slate-400 hover:text-white cursor-pointer ml-2"
                      title="Copiar correo"
                    >
                      {copiedEmail ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-slate-400 block mb-1">WhatsApp oficial:</span>
                  <a
                    href={`https://wa.me/${contactData.telefonoRaw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-slate-950 border border-slate-800 text-slate-200 hover:text-white transition-colors font-mono text-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{contactData.telefono}</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Contact Form */}
          <div className="lg:col-span-7 bg-slate-900 rounded-xl border border-slate-800 p-6 sm:p-7">
            <h3 className="text-lg font-bold font-display text-white mb-1">
              Envío de Consulta Directa
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              Completa el formulario para iniciar la consulta técnica o solicitar cotización de una pieza especial.
            </p>

            {submitted ? (
              <div className="p-5 rounded-lg bg-slate-950 border border-slate-800 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">Consulta enviada correctamente</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Se ha generado la conversación hacia WhatsApp con los datos de tu consulta.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ nombre: '', email: '', asunto: 'Consulta de producto', mensaje: '' });
                  }}
                  className="mt-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white rounded transition-colors cursor-pointer"
                >
                  Nueva consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Nombre y Apellido *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Lucas Morales"
                      value={form.nombre}
                      onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-slate-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      placeholder="nombre@ejemplo.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-slate-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Motivo
                  </label>
                  <select
                    value={form.asunto}
                    onChange={(e) => setForm({ ...form, asunto: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-slate-600 cursor-pointer"
                  >
                    <option value="Consulta de producto en catálogo">Consulta de producto en catálogo</option>
                    <option value="Cotización de archivo STL / 3D a medida">Cotización de archivo 3D / diseño personalizado</option>
                    <option value="Retiro en persona en San Pedro de Jujuy">Retiro en persona en San Pedro de Jujuy</option>
                    <option value="Otro asunto">Otro asunto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Detalle del Mensaje *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Detalles sobre la pieza, color, cantidad o consultas generales..."
                    value={form.mensaje}
                    onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-slate-600"
                  />
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-white text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Enviar a WhatsApp Oficial</span>
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
