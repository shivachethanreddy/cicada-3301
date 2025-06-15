import React, { useEffect, useState } from "react";
import cicadaImg from "../assets/cicada.png";
import eventQr from "../assets/tt.jpg";
import saiImg from "../assets/sai.jpg";
import ev1 from "../assets/ev1-1.jpg";
import ev2 from "../assets/ev2-1.jpg";
import ev3 from "../assets/ev3-1.jpg";
import ev4 from "../assets/ev-4-1.jpg";
import ev5 from "../assets/ev-5-1.jpg";
import ev6 from "../assets/ev-6-1.jpg";
import ev7 from "../assets/ev-7-1.jpg";


// Add this above the HomePage function
function WordReveal({ text, delay = 350, className = "" }) {
  const words = text.split(" ");
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount < words.length) {
      const timeout = setTimeout(() => setVisibleCount(visibleCount + 1), delay);
      return () => clearTimeout(timeout);
    }
  }, [visibleCount, words.length, delay]);

  return (
    <span className={className}>
      {words.slice(0, visibleCount).join(" ")}
      {visibleCount < words.length && <span className="blinking-cursor">|</span>}
    </span>
  );
}

// Your original HomePage component
function HomePage() {
  const [flicker, setFlicker] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null);
  const [showEventPics, setShowEventPics] = useState(false); 

  useEffect(() => {
    const interval = setInterval(() => {
      setFlicker(Math.random() * 0.11 + 0.04);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  // Handle scroll events to update current section
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id') || 'home';

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setCurrentSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);

    const targetId = href.replace('#', '');
    setCurrentSection(targetId || 'home');

    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const section = document.querySelector(href);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { href: "#", text: "HOME" },
    { href: "#about", text: "ABOUT" },
    { href: "#events", text: "EVENTS" },
    { href: "#blog", text: "BLOG" },
    { href: "#picture", text: "PICTURE" },
    { href: "#login", text: "ALUMNI" },
    { href: "#contact", text: "CONTACT" },
  ];

  return (
    <div
      className="relative w-full min-h-screen bg-black text-green-400 font-mono overflow-x-hidden overflow-y-auto"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* Scanlines overlay */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {Array.from({ length: 120 }).map((_, i) => (
          <div
            key={i}
            className="absolute left-0 w-full h-[1px]"
            style={{
              top: `${i * 0.83}%`,
              background: `rgba(0,0,0,${flicker})`,
              mixBlendMode: "multiply",
            }}
          />
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-4 right-4 z-[100] md:hidden p-2 rounded-lg border border-green-400/80 hover:bg-green-400/10"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Main content */}
      <div className="relative z-40 flex flex-col items-center text-center px-4 pt-8 md:pt-16 border-none min-h-screen w-full">
        <div className="w-full max-w-7xl mx-auto mb-20">
          <WordReveal text="CICADA 3301" className="text-4xl sm:text-6xl md:text-8xl lg:text-10xl font-bold neonGlitch mb-4 md:mb-6 break-words px-4" delay={350} />

          <img
            src={cicadaImg}
            alt="Cicada"
            className="w-48 sm:w-64 md:w-80 my-4 md:my-6 animate-fly mx-auto"
          />
          <p className="text-base sm:text-lg md:text-xl">Welcome to</p>
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold neonGlitch break-words px-4">
            MVSR CYBERSECURITY CLUB
          </h2>
          <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4 mt-2 break-words">
            Greetings. The Cybersecurity Club is about Capture flags, crack codes,
            and uncover digital secrets...
          </p>
        </div>
      </div>

      {/* Navigation - Desktop */}
      <nav className="hidden md:flex fixed right-8 top-1/4 flex-col items-end space-y-2 text-2xl font-bold tracking-widest z-[90]">
        {navItems.map((link, index) => (
          <a
            key={index}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className="border-2 border-black bg-black text-green-400/80 px-2 py-1 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:bg-black hover:text-green-400"
          >
            {link.text}
          </a>
        ))}
      </nav>

      {/* Navigation - Mobile */}
      <nav
        className={`md:hidden fixed inset-0 bg-black/95 z-[95] transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-6">
          {navItems.map((link, index) => (
            <a
              key={index}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-2xl font-bold text-green-400/80 hover:text-green-400 transition-colors"
            >
              {link.text}
            </a>
          ))}
        </div>
      </nav>

      {/* About Section */}
      <section
        id="about"
        className="min-h-screen px-4 sm:px-8 py-12 sm:py-20 text-green-400 bg-black relative mt-20"
      >
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold neonGlitch mb-6 relative px-4">
            <span className="animate-typewriter">Who We Are</span>
          </h2>

          <div className="max-w-4xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed bg-black/70 p-4 sm:p-6 rounded-xl border border-green-600 shadow-lg shadow-green-500/20 backdrop-blur-md">
            <p className="mb-4 break-words">
              Welcome to the <span className="font-bold text-green-300">MVSR Cybersecurity Club</span> — where firewalls fall and minds rise.
            </p>
            <p className="mb-4 break-words">
              We're a community of curious minds focused on <span className="text-green-300">CTF ,cohorts</span>, <span className="text-green-300">hands-on workshops</span>, and <span className="text-green-300">IRL meetups</span> that decode the digital world.
            </p>
            <p className="mb-4 break-words">
              Our goal is to make cybersecurity and hacking accessible for everyone — students, hackers, and enthusiasts alike.
            </p>
            <p className="italic text-green-200 break-words">
              "The quieter you become, the more you are able to hear."
            </p>
            <p className="mt-4 break-words">Join us. Learn the language of machines. Defend the net.</p>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section
        id="events"
        className="min-h-screen px-4 sm:px-8 py-12 sm:py-20 text-green-400 bg-black relative overflow-hidden z-40"
      >
        <div className="max-w-4xl mx-auto animate-fadeInUp text-center bg-black/70 p-4 sm:p-6 rounded-xl border border-green-600 shadow-xl shadow-green-500/30 backdrop-blur-sm relative">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 neonGlitch">Events</h2>
          
          <div className="text-left space-y-6 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
            <div className="space-y-2">
              <WordReveal text="📢 CICADA-3301 Cybersecurity Club Inauguration" className="text-xl sm:text-2xl font-bold text-green-300" delay={350} />
              <p className="text-sm sm:text-base">📍 Venue: CSE Seminar Hall, Maturi Venkata Subba Rao (MVSR) Engineering College</p>
              <p className="text-sm sm:text-base">📅 Date: 14th June 2025</p>
              <p className="text-sm sm:text-base">🕥 Time: 10:30 AM onwards</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-lg sm:text-xl font-bold text-green-300">🎯 Event Description:</h4>
              <p className="text-sm sm:text-base">
                Join us for the inauguration of the CICADA-3301 Cybersecurity Club at MVSR Engineering College! This exciting event is designed to ignite passion for cybersecurity and create a space for learning, innovation, and collaboration among students.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-lg sm:text-xl font-bold text-green-300">🗓️ Schedule:</h4>
              <div className="pl-4 space-y-2">
                <p className="text-sm sm:text-base font-semibold">🔹 Morning Session (10:30 AM onwards):</p>
                <p className="text-sm sm:text-base">Club Inauguration & Keynote Address</p>
                <p className="text-sm sm:text-base">Chief Guest: Mr. Sai Ram, CEO of Cyberekta Security Solutions Pvt. Ltd.</p>
                
                <p className="text-sm sm:text-base font-semibold mt-4">🔹 Afternoon Session:</p>
                <p className="text-sm sm:text-base">Hands-on Cybersecurity Workshop</p>
                <p className="text-sm sm:text-base">Location: Lab 6, CSE Department (CSED)</p>
                <p className="text-sm sm:text-base">Learn directly from cybersecurity experts and level up your skills with interactive, practical knowledge.</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-lg sm:text-xl font-bold text-green-300">🎓 Who Can Attend?</h4>
              <p className="text-sm sm:text-base">Open to all students from all branches and years.</p>
              <p className="text-sm sm:text-base">No prior experience needed – just bring your curiosity!</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-lg sm:text-xl font-bold text-green-300">👥 Coordinators:</h4>
              <div className="pl-4 space-y-2">
                <p className="text-sm sm:text-base font-semibold">Student Coordinators:</p>
                <p className="text-sm sm:text-base">S Sai Puneeth </p>
                <p className="text-sm sm:text-base">Avula Satwika </p>
                
                <p className="text-sm sm:text-base font-semibold mt-4">Faculty Coordinators:</p>
                <p className="text-sm sm:text-base">Dr. Sirisha Daggubati, Sr. Associate Professor, CSED</p>
                <p className="text-sm sm:text-base">Dr. M.V.R Jyothishree, Associate Professor, CSED</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-lg sm:text-xl font-bold text-green-300">✅ Registration:</h4>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
                <p className="text-sm sm:text-base mb-2 sm:mb-0">Scan the QR code to register. Limited seats available for the workshop – hurry!</p>
                <div className="flex flex-col items-center mt-2 sm:mt-0">
                  <span className="text-xs text-green-300 mb-1">Scan to Register</span>
                  <img src={eventQr} alt="Event Registration QR" className="w-28 h-28 sm:w-32 sm:h-32 rounded bg-white p-1 border border-green-400 shadow-md" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              
              <p className="text-sm sm:text-base">🎖 Sponsored by: Computer Society of India (CSI)</p>
            </div>
          </div>

       
        </div>

        {/* Custom Scrollbar Styles */}
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.3);
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(34, 197, 94, 0.5);
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(34, 197, 94, 0.7);
          }
          .typewriter-effect {
            overflow: hidden;
            white-space: nowrap;
            border-right: 2px solid #22c55e;
            animation: typing 2.5s steps(40, end), blink-caret 0.75s step-end infinite;
            width: 0;
            display: inline-block;
          }
          @keyframes typing {
            from { width: 0 }
            to { width: 100% }
          }
          @keyframes blink-caret {
            from, to { border-color: transparent }
            50% { border-color: #22c55e; }
          }
          .blinking-cursor {
            display: inline-block;
            width: 1ch;
            color: #22c55e;
            animation: blink-caret-word 0.75s step-end infinite;
          }
          @keyframes blink-caret-word {
            from, to { opacity: 0; }
            50% { opacity: 1; }
          }
        `}</style>
      </section>

      {/* Blog Section */}
      <section
        id="blog"
        className="min-h-screen px-4 sm:px-8 py-12 sm:py-20 text-green-400 neonGlitch"
      >
        <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4">Blogs</h2>
        <p className="text-lg sm:text-xl">coming soon</p>
      </section>

   {/* Picture Section */}
      <section
        id="picture"
        className="min-h-screen px-4 sm:px-8 py-12 sm:py-20 text-green-400 flex flex-col items-center justify-center"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 neonGlitch">Pictures</h2>
        <button
          className={`w-full max-w-2xl mb-6 py-4 px-6 rounded-xl font-bold text-xl sm:text-2xl neonGlitch border-2 border-green-400 bg-black/80 text-green-300 shadow-lg hover:bg-green-900/30 transition-all duration-300 flex items-center justify-between`}
          onClick={() => setShowEventPics((prev) => !prev)}
        >
          CICADA-3301 Cybersecurity Club Inauguration
          <span className="ml-4">{showEventPics ? '▲' : '▼'}</span>
        </button>
        {showEventPics && (
          <div className="w-full max-w-5xl overflow-x-auto pb-4">
            <div className="flex gap-6 min-w-[700px]">
              {[ev1, ev2, ev3, ev4, ev5, ev6, ev7].map((img, idx) => (
                <div key={idx} className="rounded-xl overflow-hidden border-4 border-green-600 shadow-lg bg-black/80 min-w-[300px] max-w-xs flex-shrink-0 cursor-pointer"
                  onClick={() => { setModalImg(img); setModalOpen(true); }}
                >
                  <img src={img} alt={`Event ${idx + 1}`} className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300" />
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Modal for large event image */}
        {modalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80" onClick={() => setModalOpen(false)}>
            <div className="relative" onClick={e => e.stopPropagation()}>
              <img src={modalImg} alt="Large Event" className="max-w-[90vw] max-h-[80vh] rounded-2xl border-4 border-green-400 shadow-2xl" />
              <button
                className="absolute top-2 right-2 bg-black/70 text-green-400 rounded-full p-2 hover:bg-green-400 hover:text-black transition"
                onClick={() => setModalOpen(false)}
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Alumni Section */}
      <section
        id="login"
        className="min-h-screen px-4 sm:px-8 py-12 sm:py-20 text-green-400 neonGlitch flex flex-col items-center justify-center"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Alumni</h2>
        <p className="text-red-400 text-lg sm:text-xl text-center">
          No alumni data available yet.
        </p>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen px-4 sm:px-8 py-12 sm:py-20 bg-black text-green-400"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10 text-center animate-fade-in-down">
          Contact Section
        </h2>

        {/* Member Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 max-w-5xl mx-auto px-4 sm:px-8">
          {[
            {
              role: "President",
              name: "Sai Puneeth",
              email: "245123749061@mvsrec.edu.in",
              image: saiImg,
              isModal: true,
            },
            {
              role: "President",
              name: "Avula Satwika",
              email: "245123749032@mvsrec.edu.in",
              image: "/images/vp.jpg",
              isModal: false,
            },
          ].map((member, index) => (
            <div
              key={index}
              className="bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-lg flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-green-400/50 neon-card animate-fade-in-up"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover mb-4 border-4 border-green-400 animate-pulse cursor-pointer"
                onClick={() => member.isModal && (setModalImg(member.image), setModalOpen(true))}
              />
              <h3 className="text-xl sm:text-2xl font-bold mb-2">{member.role}</h3>
              <p className="text-base sm:text-lg mb-2">{member.name}</p>
              <p className="text-sm sm:text-base text-gray-400">📧 {member.email}</p>
            </div>
          ))}
        </div>

        {/* Modal for large image */}
        {modalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80" onClick={() => setModalOpen(false)}>
            <div className="relative" onClick={e => e.stopPropagation()}>
              <img src={modalImg} alt="Large" className="max-w-[90vw] max-h-[80vh] rounded-2xl border-4 border-green-400 shadow-2xl" />
              <button
                className="absolute top-2 right-2 bg-black/70 text-green-400 rounded-full p-2 hover:bg-green-400 hover:text-black transition"
                onClick={() => setModalOpen(false)}
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
        )}

        {/* Instagram Icon */}
        <div className="relative flex justify-center items-center mt-8 sm:mt-12">
          <a
            href="https://instagram.com/cicada3301_mvsr"
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center neon-box"
          >
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-green-400 neon-glow"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.3.1 2 .3 2.5.5.6.2 1 .6 1.4 1.1.4.5.8.9 1.1 1.5.2.5.4 1.2.5 2.5.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.3-.3 2-.5 2.5-.2.6-.6 1-1.1 1.4-.5.4-.9.8-1.5 1.1-.5.2-1.2.4-2.5.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.3-.1-2-.3-2.5-.5-.6-.2-1-.6-1.4-1.1-.4-.5-.8-.9-1.1-1.5-.2-.5-.4-1.2-.5-2.5C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.3.3-2 .5-2.5.2-.6.6-1 1.1-1.4.5-.4.9-.8 1.5-1.1.5-.2 1.2-.4 2.5-.5C8.4 2.2 8.8 2.2 12 2.2z" />
              <circle cx="12" cy="12" r="3.5" />
            </svg>
            <div className="absolute w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-green-400 neon-glow" />
            <div className="absolute top-1 right-1 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-400 neon-glow" />
          </a>
        </div>
      </section>

      {/* Add smooth scroll behavior to the entire page */}
      <style jsx>{`
        html {
          scroll-behavior: smooth;
        }
        section {
          scroll-margin-top: 2rem;
        }
      `}</style>

      {/* Bottom padding for scroll */}
      <div className="h-16 sm:h-32" />
    </div>
  );
}

// Main App component
export default function App() {
  return <HomePage />;
}
