import React, { useEffect, useState, useRef } from "react";
import cicadaImg from "C:/Users/shiva/cicada-3301/src/assets/cicada.png";
import globeImg from "C:/Users/shiva/cicada-3301/src/assets/globe.png";

// MatrixRain Component with email validation
function MatrixRain({ onComplete }) {
  const canvasRef = useRef(null);
  const [email, setEmail] = useState("");
  const [inputEnabled, setInputEnabled] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const letters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const fontSize = 16;
    const columns = Math.floor(width / fontSize);

    const drops = new Array(columns).fill(1);

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#0F0"; // bright green text
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const intervalId = setInterval(draw, 50);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Validate email ends with @mvsrec.edu.in
  const isValidEmail = (email) =>
    email.trim().toLowerCase().endsWith("@mvsrec.edu.in");

  // Auto submit after 3 seconds if valid email entered
  useEffect(() => {
    if (!inputEnabled) return;

    if (email && isValidEmail(email)) {
      const timer = setTimeout(() => {
        setInputEnabled(false);
        onComplete(email);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [email, inputEnabled, onComplete]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (isValidEmail(email)) {
        setInputEnabled(false);
        onComplete(email);
      } else {
        setError("Email must end with @mvsrec.edu.in");
      }
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "black",
        color: "#0F0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0 }} />
      <div
        style={{
          position: "relative",
          zIndex: 10,
          backgroundColor: "rgba(0,0,0,0.7)",
          padding: "1rem 2rem",
          borderRadius: "8px",
          fontFamily: "monospace",
          textAlign: "center",
          minWidth: 320,
        }}
      >
        <label htmlFor="email" style={{ marginRight: 10, fontSize: 18 }}>
          College Email:
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={!inputEnabled}
          autoFocus
          placeholder="your.email@mvsrec.edu.in"
          style={{
            fontSize: 18,
            padding: "4px 8px",
            backgroundColor: "black",
            color: "#0F0",
            border: "1px solid #0F0",
            borderRadius: 4,
            width: 280,
            outline: inputEnabled ? "1px solid #0F0" : "none",
          }}
        />
        {error && (
          <p style={{ color: "red", marginTop: 6, fontSize: 14 }}>{error}</p>
        )}
        {!inputEnabled && (
          <p style={{ marginTop: 10, fontSize: 14 }}>Loading...</p>
        )}
        <p style={{ marginTop: 10, fontSize: 14, color: "#0F0" }}>
          Press Enter to confirm or wait 3 seconds (valid email only)
        </p>
      </div>
    </div>
  );
}

// Your original HomePage component
function HomePage() {
  const [flicker, setFlicker] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlicker(Math.random() * 0.11 + 0.04);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const section = document.querySelector(href);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

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

      {/* Main content */}
      <div className="relative z-40 flex flex-col items-center text-center px-4 pt-8 border-none">
        <h1 className="text-8xl md:text-10xl font-bold neonGlitch mb-6">
          CICADA 3301
        </h1>

        <img
          src={cicadaImg}
          alt="Cicada"
          className="w-64 md:w-80 my-6 animate-fly"
        />
        <p className="text-lg md:text-xl">Welcome to</p>
        <h2 className="text-2xl md:text-4xl font-bold neonGlitch">
          MVSR CYBERSECURITY CLUB
        </h2>
        <p className="text-sm md:text-base max-w-xl px-2">
          Greetings. The Cybersecurity Club is about Capture flags, crack codes,
          and uncover digital secrets...
        </p>
        
        
        </div>
      {/* Dummy sections for scrolling */}

      <section
  id="about"
  className="min-h-screen px-8 py-20 text-green-400  bg-black relative"
>
  {/* Glitch Heading */}
  <h2 className="text-4xl md:text-5xl font-bold neonGlitch mb-6 relative">
    <span className="animate-typewriter">
      Who We Are
    </span>
  </h2>

  {/* Glowing text block */}
    <div className="max-w-4xl mx-auto text-lg md:text-xl leading-relaxed bg-black/70 p-6 rounded-xl border border-green-600 shadow-lg shadow-green-500/20 backdrop-blur-md">

    <p className="mb-4">
      Welcome to the <span className="font-bold text-green-300">MVSR Cybersecurity Club</span> — where firewalls fall and minds rise.
    </p>
    <p className="mb-4">
      We're a community of curious minds focused on <span className="text-green-300">CTF ,cohorts</span>, <span className="text-green-300">hands-on workshops</span>, and <span className="text-green-300">IRL meetups</span> that decode the digital world.
    </p>
    <p className="mb-4">
      Our goal is to make cybersecurity and hacking accessible for everyone — students, hackers, and enthusiasts alike.
    </p>
    <p className="italic text-green-200">
      "The quieter you become, the more you are able to hear."
    </p>
    <p className="mt-4">Join us. Learn the language of machines. Defend the net.</p>
  </div>

  {/* Custom Animation Styles */}
  <style>{`
    .animate-typewriter {
      overflow: hidden;
      white-space: nowrap;
      animation: typing 3s steps(20, end), blink 0.75s step-end infinite;
    }

    @keyframes typing {
      from { width: 0 }
      to { width: 100% }
    }

    @keyframes blink {
      from, to { border-color: transparent }
      50% { border-color: #22c55e } /* Tailwind green-400 */
    }

    .neonGlitch {
      text-shadow:
        0 0 5px #00ff99,
        0 0 10px #00ff99,
        0 0 20px #00ff99,
        0 0 40px #00ff99;
    }
  `}</style>
</section>

      <section
  id="events"
  className="min-h-screen px-8 py-20 text-green-400 bg-black relative overflow-hidden"
>
  <div className="max-w-3xl mx-auto animate-fadeInUp text-center bg-black/70 p-6 rounded-xl border border-green-600 shadow-xl shadow-green-500/30 backdrop-blur-sm">
    <h2 className="text-4xl font-bold mb-6 neonGlitch">Events </h2>
    <p className="text-xl md:text-2xl leading-relaxed">
       No events are currently scheduled.
    </p>
    <p className="mt-4 text-base md:text-lg text-green-300">
      Stay tuned for exciting workshops, CTFs, and meetups will be announced soon!
    </p>
  </div>
</section>


      <section
        id="blog"
        className="min-h-screen px-8 py-20 text-green-400 neonGlitch"
      >
        <h2 className="text-8xl font-bold mb-4">Blogs</h2>
        <p>coming soon</p>
      </section>
<section
  id="picture"
  className="min-h-screen px-8 py-20 text-green-400 flex flex-col items-center justify-center"
>
  <h2 className="text-4xl font-bold mb-6 neonGlitch">Pictures</h2>
 
  <p className="text-yellow-300 text-xl font-semibold animate-pulse">
     No photos available here for now updated after some events.
  </p>
</section>

   
<section
  id="login"
  className="min-h-screen px-8 py-20 text-green-400 neonGlitch flex flex-col items-center justify-center"
>
  <h2 className="text-4xl font-bold mb-6">Alumni</h2>

  <p className="text-red-400 text-xl ">
     No alumni data available yet.
  </p>
</section>



   <section
  id="contact"
  className="min-h-screen px-8 py-20 bg-black text-green-400"
>
  <h2 className="text-4xl font-bold mb-10 text-center animate-fade-in-down">
    Contact Section
  </h2>

  {/* Member Cards */}
  <div className="grid md:grid-cols-3 gap-8">
    {[
      {
        role: "President",
        name: "sai punith",
        email: "245123749060@mvsrec.edu.in",
        phone: "+91 95158 42305",
        image: "/images/president.jpg",
      },
      {
        role: "Vice President",
        name: "kavya kacham",
        email: "245123749060@mvsrec.edu.in",
        phone: "+91 9123456780",
        image: "/images/vp.jpg",
      },
  
    ].map((member, index) => (
      <div
        key={index}
        className="bg-gray-900 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-green-400/50 neon-card animate-fade-in-up"
      >
        <img
          src={member.image}
          alt={member.name}
          className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-green-400 animate-pulse"
        />
        <h3 className="text-2xl font-bold mb-1">{member.role}</h3>
        <p className="text-lg mb-2">{member.name}</p>
        <p className="text-sm text-gray-400 mb-1">📧 {member.email}</p>
        <p className="text-sm text-gray-400">📞 {member.phone}</p>
      </div>
    ))}
  </div>

  {/* Instagram Icon */}
  <div className="relative flex justify-center items-center mt-12">
  <a
    href="https://instagram.com/cicada3301_mvsr"
    target="_blank"
    rel="noopener noreferrer"
    className="relative w-20 h-20 flex items-center justify-center neon-box"
  >
    {/* Main Icon */}
    <svg
      className="w-10 h-10 text-green-400 neon-glow"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.3.1 2 .3 2.5.5.6.2 1 .6 1.4 1.1.4.5.8.9 1.1 1.5.2.5.4 1.2.5 2.5.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.3-.3 2-.5 2.5-.2.6-.6 1-1.1 1.4-.5.4-.9.8-1.5 1.1-.5.2-1.2.4-2.5.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.3-.1-2-.3-2.5-.5-.6-.2-1-.6-1.4-1.1-.4-.5-.8-.9-1.1-1.5-.2-.5-.4-1.2-.5-2.5C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.3.3-2 .5-2.5.2-.6.6-1 1.1-1.4.5-.4.9-.8 1.5-1.1.5-.2 1.2-.4 2.5-.5C8.4 2.2 8.8 2.2 12 2.2z" />
      <circle cx="12" cy="12" r="3.5" />
    </svg>

    {/* Big Center Circle */}
    <div className="absolute w-16 h-16 rounded-full border-4 border-green-400 neon-glow" />

    {/* Small Top-Right Circle */}
    <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-green-400 neon-glow" />
  </a>
</div>

</section>


      {/* Navigation */}
      <nav className="fixed right-8 top-1/4 flex flex-col items-end space-y-2 text-2xl font-bold tracking-widest z-50">
        {[
          { href: "#", text: "HOME" },
          { href: "#about", text: "ABOUT" },
          { href: "#events", text: "EVENTS" },
          { href: "#blog", text: "BLOG" },
          { href: "#picture", text: "PICTURE" },
          { href: "#login", text: "ALUMNI" },
          { href: "#contact", text: "CONTACT" },
        ].map((link, index) => (
          <a
            key={index}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className="border-2 border-black bg-green text-black px-2 py-1 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:bg-black hover:text-green-400"
          >
            {link.text}
          </a>
        ))}
      </nav>

      {/* Bottom padding for scroll */}
      <div className="h-32" />

      {/* Globe rotation CSS */}
      <style>{`
        @keyframes globeRotate {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        .globe-rotate {
          animation: globeRotate 20s linear infinite;
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
}

// Main App component that controls initial MatrixRain then HomePage
export default function App() {
  const [emailEntered, setEmailEntered] = useState(null);

  return emailEntered ? (
    <HomePage />
  ) : (
    <MatrixRain onComplete={(email) => setEmailEntered(email)} />
  );
}