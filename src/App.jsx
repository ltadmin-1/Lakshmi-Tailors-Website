/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, Ruler, MapPin, Mail, Phone, Award, User, MessageSquare, Send, FileText, Menu, X, ShoppingBag } from 'lucide-react';

const App = () => {
  // 🌟 PAGE NAVIGATION STATE ('home' | 'about')
  const [currentView, setCurrentView] = useState('home');

  // 📱 MOBILE MENU STATE
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 📝 LOCAL ENQUIRY FORM STATE
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);

  // 📬 ENQUIRY FORM SUBMISSION HANDLER
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionError(false);

    const formElement = e.target;
    const payload = new FormData(formElement);

    try {
      const response = await fetch("https://formspree.io/f/xbdvjqvg", {
        method: "POST",
        body: payload,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormData({ name: '', email: '', phone: '', message: '' });
        window.location.href = '/thanks.html';
      } else {
        setIsSubmitting(false);
        setSubmissionError(true);
      }
    } catch (error) {
      setIsSubmitting(false);
      setSubmissionError(true);
    }
  };

  const navigateTo = (view) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
  };

  const slideUpFade = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 15 } }
  };

  return (
    <div className="font-sans text-gray-800 overflow-x-hidden bg-gray-50 min-h-screen flex flex-col">
      
      {/* 🌟 FIXED HEADER 🌟 */}
      <header className="fixed top-0 w-full z-50 bg-brandGreen backdrop-blur-md shadow-lg border-b border-green-800/50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-28">
          <div className="flex justify-between md:grid md:grid-cols-5 h-full items-center">
            
            {/* COLUMN 1: LAKSHMI TAILORS LOGO + MOBILE DETAILS */}
            <div className="flex items-center gap-4">
              <motion.div 
                initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} 
                className="flex items-center gap-3 justify-start cursor-pointer group flex-shrink-0"
                onClick={() => navigateTo('home')}
              >
                <img src="/logo.png" alt="Main Logo" className="h-12 md:h-16 w-auto filter drop-shadow-[0_0_2px_#fff]" />
                <span className="text-white font-black text-lg tracking-tighter hidden lg:block uppercase leading-none group-hover:text-brandYellow transition">LAKSHMI TAILORS</span>
              </motion.div>

              {/* 🌟 MOBILE-VISIBLE DETAILS (Shown on mobile, hidden on large screens) */}
              <div className="flex flex-col md:hidden text-[9px] text-brandYellow font-bold uppercase leading-tight gap-0.5">
                <span>India Wide Service</span>
                <span>ISO 9001:2015</span>
              </div>
            </div>

            {/* COLUMN 2: DESKTOP NAVIGATION MENU */}
            <div className="hidden md:flex items-center justify-center gap-6 text-xs lg:text-sm font-black tracking-widest text-white">
              <button onClick={() => navigateTo('home')} className={`uppercase transition ${currentView === 'home' ? 'text-brandYellow border-b-2 border-brandYellow pb-1' : 'hover:text-brandYellow/80'}`}>Home</button>
              <button onClick={() => navigateTo('about')} className={`uppercase transition ${currentView === 'about' ? 'text-brandYellow border-b-2 border-brandYellow pb-1' : 'hover:text-brandYellow/80'}`}>About</button>
              <a href="/order-online.html" className="uppercase transition flex items-center gap-1.5 hover:text-brandYellow/80"><ShoppingBag size={16}/> Order Online</a>
            </div>

            {/* COLUMN 3: SERVICE BOX */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="hidden md:flex items-center justify-center">
              <div className="flex items-center gap-3 bg-white/10 px-5 py-2.5 rounded-2xl border border-white/20 shadow-xl backdrop-blur-sm">
                <MapPin className="text-brandYellow w-6 h-6" />
                <div className="flex flex-col">
                  <span className="text-white font-bold text-[11px] leading-none uppercase tracking-[0.2em] opacity-80">Service</span>
                  <span className="text-brandYellow font-black text-sm leading-tight uppercase">India Wide</span>
                </div>
              </div>
            </motion.div>

            {/* COLUMN 4: ISO BOX */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="hidden md:flex items-center justify-center">
              <div className="flex items-center gap-3 bg-white/10 px-5 py-2.5 rounded-2xl border border-white/20 shadow-xl backdrop-blur-sm">
                <Award className="text-brandYellow w-6 h-6" />
                <div className="flex flex-col">
                  <span className="text-white font-bold text-[11px] leading-none uppercase tracking-[0.2em] opacity-80">Certified</span>
                  <span className="text-brandYellow font-black text-sm leading-tight uppercase">ISO 9001:2015</span>
                </div>
              </div>
            </motion.div>

            {/* COLUMN 5: AUTHORISED DEALERS & MOBILE HAMBURGER TOGGLE */}
            <div className="flex items-center justify-end gap-4 md:gap-0 flex-shrink-0">
              <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="hidden md:flex flex-col items-end gap-1.5">
                <span className="text-[11.7px] uppercase tracking-[0.15em] text-brandYellow font-black drop-shadow-md text-center">Authorised Dealer for</span>
                <div className="flex items-center gap-2.5">
                  <div className="bg-white p-1 rounded-lg shadow-md border border-white"><img src="/logo2.png" alt="Arvind" className="h-10 w-auto object-contain" /></div>
                  <div className="bg-white p-1 rounded-lg shadow-md border border-white"><img src="/logo3.png" alt="Mafatlal" className="h-10 w-auto object-contain" /></div>
                </div>
              </motion.div>

              {/* MOBILE HAMBURGER BUTTON */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="md:hidden text-white focus:outline-none p-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 transition"
                aria-label="Toggle navigation drawer"
              >
                {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 📱 SLIDE-OUT MOBILE NAVIGATION DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-45 md:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} 
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-72 bg-brandGreen z-50 p-6 shadow-2xl flex flex-col md:hidden border-l border-green-800"
            >
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
                <span className="text-white font-black tracking-tight text-md">MENU CONTROLS</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-white p-2 rounded-xl bg-white/10 border border-white/5 focus:outline-none">
                  <X size={20} />
                </button>
              </div>

              <nav className="flex flex-col gap-4 text-lg font-bold text-white">
                <button onClick={() => navigateTo('home')} className={`flex items-center gap-3 p-3 rounded-2xl transition text-left ${currentView === 'home' ? 'bg-brandYellow text-brandGreen font-black' : 'hover:bg-white/10'}`}>Home</button>
                <button onClick={() => navigateTo('about')} className={`flex items-center gap-3 p-3 rounded-2xl transition text-left ${currentView === 'about' ? 'bg-brandYellow text-brandGreen font-black' : 'hover:bg-white/10'}`}>About Us</button>
                <a href="/order-online.html" className="flex items-center gap-3 p-3 rounded-2xl transition text-left hover:bg-white/10"><ShoppingBag size={20}/> Order Online</a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 🌟 LAYOUT ROUTER CONTENT LAYER 🌟 */}
      <div className="flex-grow pt-28">
        
        {/* VIEW 1: HOME PAGE CONTAINER */}
        {currentView === 'home' && (
          <>
            {/* HERO SECTION */}
            <section className="relative min-h-[85vh] bg-brandGreen flex flex-col items-center justify-center overflow-hidden">
              <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ repeat: Infinity, duration: 8 }} className="absolute top-10 left-10 w-[30rem] h-[30rem] bg-brandYellow rounded-full mix-blend-multiply filter blur-[100px] pointer-events-none" />
              <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ repeat: Infinity, duration: 10, delay: 2 }} className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-brandRed rounded-full mix-blend-multiply filter blur-[100px] pointer-events-none" />
              <motion.div variants={staggerContainer} initial="hidden" animate="show" className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
                <motion.div variants={slideUpFade} className="mb-6"><span className="bg-white/10 text-brandYellow px-6 py-2 rounded-full text-xs font-bold tracking-[0.3em] uppercase border border-white/20 shadow-xl backdrop-blur-sm">Since 1982 Mastery</span></motion.div>
                <motion.h1 variants={slideUpFade} className="text-5xl md:text-8xl font-black text-white mb-6 leading-[1.1] drop-shadow-2xl">Precision in <br/> Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandYellow to-yellow-200">Stitch</span></motion.h1>
                <motion.p variants={slideUpFade} className="text-lg md:text-xl text-green-50 mb-10 max-w-2xl font-light opacity-90">AN ISO 9001:2015 CERTIFIED COMPANY</motion.p>
                <motion.div variants={slideUpFade}><motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} className="text-brandYellow"><Ruler size={48} /></motion.div></motion.div>
              </motion.div>
            </section>

            {/* SERVICES SECTION */}
            <section className="py-24 bg-white border-b border-gray-100">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-4xl font-black text-gray-900 mb-16">Our Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                  {['Custom Suits', 'Designer Blouses', 'Uniforms & Bulk'].map((item, index) => (
                    <motion.div key={index} whileHover={{ y: -12 }} className="bg-gray-50 p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all border border-gray-100 group">
                      <div className="w-16 h-16 bg-brandGreen/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-brandGreen transition-colors duration-300"><Scissors className="text-brandGreen group-hover:text-white transition-colors" /></div>
                      <h3 className="text-2xl font-bold mb-4">{item}</h3>
                      <p className="text-gray-500 font-medium">Meticulously measured and stitched to perfection by our senior masters.</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-20">
                  <h3 className="text-2xl font-bold text-gray-400 uppercase tracking-widest mb-10">Trusted By Our Elite Clients</h3>
                  <div className="flex flex-wrap justify-center items-center gap-12">
                    {[1, 2, 3, 4, 5].map((client) => (
                      <img key={client} src={`/client${client}.png`} alt={`Client ${client}`} className="h-12 md:h-16 w-auto transition-all duration-300 cursor-pointer" onError={(e) => { e.target.style.display = 'none' }} />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* FREE FORMSPREE ENQUIRY FORM */}
            <section className="py-24 bg-gray-50">
              <div className="max-w-3xl mx-auto px-4">
                <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-gray-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brandYellow/10 rounded-bl-[5rem] pointer-events-none flex items-center justify-center text-brandYellow"><MessageSquare size={36} /></div>
                  
                  <h2 className="text-3xl font-black text-gray-900 mb-2">Free Expert Enquiry</h2>
                  <p className="text-gray-500 font-medium mb-8">Have a question regarding matching fabrics, group bookings, or tailored styling? Drop your details below.</p>

                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="relative">
                      <User className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                      <input type="text" name="name" required placeholder="Your Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full pl-12 pr-6 py-4 rounded-2xl border-2 border-gray-100 focus:border-brandGreen focus:outline-none transition" />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                      <input type="email" name="email" required placeholder="Your Email Address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full pl-12 pr-6 py-4 rounded-2xl border-2 border-gray-100 focus:border-brandGreen focus:outline-none transition" />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                      <input type="tel" name="phone" required placeholder="Contact Number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full pl-12 pr-6 py-4 rounded-2xl border-2 border-gray-100 focus:border-brandGreen focus:outline-none transition" />
                    </div>
                    <div className="relative">
                      <FileText className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                      <textarea name="message" required rows="4" placeholder="Describe your tailoring requirement..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full pl-12 pr-6 py-4 rounded-2xl border-2 border-gray-100 focus:border-brandGreen focus:outline-none transition resize-none" />
                    </div>
                    {submissionError && (
                      <p className="text-xs font-bold text-red-600 bg-red-50 p-3 rounded-xl border border-red-100">Submission problem encountered. Please check your inputs and try again.</p>
                    )}
                    <button type="submit" disabled={isSubmitting} className="w-full bg-brandGreen text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-green-800 transition flex items-center justify-center gap-3 disabled:opacity-50">
                      <Send size={18} /> {isSubmitting ? 'Sending Blueprint...' : 'Send Enquiry Now'}
                    </button>
                  </form>
                </div>
              </div>
            </section>
          </>
        )}

        {/* VIEW 2: STANDALONE ABOUT US PAGE */}
        {currentView === 'about' && (
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 max-w-5xl mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-brandGreen font-black tracking-widest text-xs uppercase bg-green-50 px-4 py-2 rounded-full">Our Legacy</span>
              <h2 className="text-4xl md:text-6xl font-black text-brandGreen mt-4 mb-6">About Lakshmi Tailors</h2>
              <div className="w-20 h-1.5 bg-brandRed mx-auto rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-medium">
                <p>Founded in <strong className="text-brandGreen font-black">1982</strong>, Lakshmi Tailors has grown from a local bespoke atelier into an absolute icon of sartorial precision and certified master craftsmanship across India.</p>
                <p>We combine time-tested traditional cutting methods with modern premium machinery, ensuring that every single stitch matches global benchmark parameters. This unwavering commitment earned us our prestigious <strong className="text-brandGreen font-bold">ISO 9001:2015 Certification</strong>.</p>
              </div>
              <div className="bg-brandGreen p-12 rounded-[3rem] text-white space-y-6 shadow-xl relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-white/5 rounded-full pointer-events-none" />
                <h3 className="text-2xl font-black text-brandYellow uppercase tracking-wider">Our Core Commitment</h3>
                <p className="font-light opacity-90 leading-relaxed">"To deliver precise dimensions, luxury wearability, and flawless custom textures that don't just dress your silhouette, but boldly declare your unique prestige to the world."</p>
                <div className="pt-4 border-t border-white/20 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-brandYellow/20 flex items-center justify-center text-brandYellow font-black">40+</div>
                  <span className="text-sm font-bold tracking-wider uppercase">Years of Master Fashion Excellence</span>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </div>

      {/* 🌟 PREMIUM FOOTER 🌟 */}
      <footer className="bg-gray-900 text-white py-16 border-t-[12px] border-brandGreen mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6 flex justify-center">
            <img src="/logo.png" alt="Lakshmi Tailors" className="w-24 h-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-500 cursor-pointer drop-shadow-md" onClick={() => navigateTo('home')} />
          </motion.div>
          <h3 className="text-2xl md:text-3xl font-black mb-10 tracking-[0.2em] uppercase text-gray-300">Connect With Us On</h3>
          <div className="flex justify-center items-center flex-wrap gap-6 mb-16">
            <a href="tel:+914222449943" className="p-5 bg-white/5 rounded-2xl grayscale hover:grayscale-0 hover:bg-brandGreen hover:-translate-y-2 transition-all duration-500 group"><Phone className="w-6 h-6 group-hover:text-white" /></a>
            <a href="mailto:lakshmitailorscbe@gmail.com" className="p-5 bg-white/5 rounded-2xl grayscale hover:grayscale-0 hover:bg-brandRed hover:-translate-y-2 transition-all duration-500 group"><Mail className="w-6 h-6 group-hover:text-white" /></a>
            <a href="https://wa.me/9655074488" target="_blank" rel="noopener noreferrer" className="p-5 bg-white/5 rounded-2xl grayscale hover:grayscale-0 hover:bg-[#25D366] hover:-translate-y-2 transition-all duration-500 group"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" className="group-hover:text-white"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"></path></svg></a>
            <a href="https://instagram.com/lakshmi_tailors_official/" target="_blank" rel="noopener noreferrer" className="p-5 bg-white/5 rounded-2xl grayscale hover:grayscale-0 hover:bg-[#E4405F] hover:-translate-y-2 transition-all duration-500 group"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" className="group-hover:text-white"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
            <a href="https://facebook.com/lakshmitailorsofficial/" target="_blank" rel="noopener noreferrer" className="p-5 bg-white/5 rounded-2xl grayscale hover:grayscale-0 hover:bg-[#1877F2] hover:-translate-y-2 transition-all duration-500 group"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" className="group-hover:text-white"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
          </div>
          <p className="text-gray-500 text-sm font-bold tracking-widest opacity-60 uppercase">© {new Date().getFullYear()} LAKSHMI TAILORS | ALL RIGHTS RESERVED</p>
        </div>
      </footer>

    </div>
  );
};

export default App;