import { useEffect, useState } from "react";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    setContactLoading(true);
    setContactMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setContactMessage("Message sent successfully!");

      setContactForm({
        name: "",
        email: "",
        message: "",
      });

      setTimeout(() => {
        setContactMessage("");
      }, 3000);
    } catch (error) {
      console.error("Contact error:", error);
      setContactMessage("Failed to send message.");
    } finally {
      setContactLoading(false);
    }
  };

  const [contactMessage, setContactMessage] = useState("");
  const [contactLoading, setContactLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/projects")
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          {/* Logo */}
          <a href="#home" className="text-2xl font-bold">
            Nawodya<span className="text-cyan-400">.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            <a href="#" className="text-cyan-400">
              Home
            </a>

            <a
              href="#about"
              className="text-slate-300 transition hover:text-cyan-400"
            >
              About
            </a>

            <a
              href="#skills"
              className="text-slate-300 transition hover:text-cyan-400"
            >
              Skills
            </a>

            <a
              href="#experience"
              className="text-slate-300 transition hover:text-cyan-400"
            >
              Experience
            </a>

            <a
              href="#projects"
              className="text-slate-300 transition hover:text-cyan-400"
            >
              Projects
            </a>

            <a
              href="#education"
              className="text-slate-300 transition hover:text-cyan-400"
            >
              Education
            </a>

            <a
              href="#contact"
              className="text-slate-300 transition hover:text-cyan-400"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg border border-slate-700 px-3 py-2 text-xl text-slate-300 md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-slate-800 px-6 py-5 md:hidden">
            <div className="flex flex-col gap-4">
              <a
                href="#"
                onClick={() => setMenuOpen(false)}
                className="text-cyan-400"
              >
                Home
              </a>

              <a
                href="#about"
                onClick={() => setMenuOpen(false)}
                className="text-slate-300 hover:text-cyan-400"
              >
                About
              </a>

              <a
                href="#skills"
                onClick={() => setMenuOpen(false)}
                className="text-slate-300 hover:text-cyan-400"
              >
                Skills
              </a>

              <a
                href="#experience"
                onClick={() => setMenuOpen(false)}
                className="text-slate-300 hover:text-cyan-400"
              >
                Experience
              </a>

              <a
                href="#projects"
                onClick={() => setMenuOpen(false)}
                className="text-slate-300 hover:text-cyan-400"
              >
                Projects
              </a>

              <a
                href="#education"
                onClick={() => setMenuOpen(false)}
                className="text-slate-300 hover:text-cyan-400"
              >
                Education
              </a>

              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="text-slate-300 hover:text-cyan-400"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl items-center px-6 py-20"
      >
        <div className="grid w-full items-center gap-12 md:grid-cols-2">
          {/* Left Side */}
          <div>
            <p className="mb-4 text-lg font-medium text-cyan-400">Hello, I'm</p>

            <h1 className="text-5xl font-bold leading-tight md:text-6xl">
              J.P.S.
              <span className="block text-cyan-400">Nawodya</span>
            </h1>

            <h2 className="mt-6 text-2xl font-semibold text-slate-300">
              Software Developer
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
              I am a Software Developer with hands-on experience in web
              application development, database integration, and software
              development technologies. I enjoy building practical,
              user-friendly solutions and continuously improving my technical
              skills.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              {/* Projects Button */}
              <a
                href="#projects"
                className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                View My Projects
              </a>

              {/* Contact Button */}
              <a
                href="#contact"
                className="rounded-lg border border-slate-700 px-6 py-3 font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-400"
              >
                Contact Me
              </a>

              {/* Download CV */}
              <a
                href="/Nawodya-CV.pdf"
                download
                aria-label="Download J.P.S. Nawodya CV"
                className="rounded-lg border border-cyan-400 px-6 py-3 font-semibold text-cyan-400 transition hover:bg-cyan-400 hover:text-slate-950"
              >
                Download CV
              </a>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex gap-6">
              <a
                href="https://github.com/SAWANDI2001"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit my GitHub profile"
                className="text-slate-400 transition hover:text-cyan-400"
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/j-p-s-nawodya-23739230a/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit my LinkedIn profile"
                className="text-slate-400 transition hover:text-cyan-400"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-3xl"></div>

              {/* Profile Image */}
              <div className="relative rounded-full border-4 border-cyan-400/40 p-2 shadow-2xl shadow-cyan-500/20">
                <img
                  src="/profile.jpeg"
                  alt="J.P.S. Nawodya"
                  loading="eager"
                  className="h-64 w-64 rounded-full object-cover sm:h-72 sm:w-72 md:h-96 md:w-96"
                />
              </div>

              {/* Small Badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-slate-700 bg-slate-900 px-5 py-2 shadow-lg">
                <span className="text-sm font-semibold text-cyan-400">
                  Software Developer
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="border-t border-slate-800 bg-slate-900/50 px-6 py-20"
      >
        <div className="mx-auto max-w-6xl">
          {/* Section Title */}
          <div className="mb-12 text-center">
            <p className="text-cyan-400">Get To Know Me</p>

            <h2 className="mt-2 text-4xl font-bold">About Me</h2>
          </div>

          {/* About Content */}
          <div className="grid gap-10 md:grid-cols-2">
            {/* Left Side */}
            <div>
              <h3 className="text-2xl font-semibold">Software Developer</h3>

              <p className="mt-5 leading-8 text-slate-400">
                I am a Software Developer with a strong interest in building web
                applications and practical software solutions. I enjoy solving
                problems, learning new technologies, and developing applications
                that are simple, useful, and user-friendly.
              </p>

              <p className="mt-4 leading-8 text-slate-400">
                I have hands-on experience in frontend and backend development,
                database management, and system maintenance. During my
                experience at the Southern Provincial Road Development
                Authority, I worked with web applications, database integration,
                and real-world software development tasks.
              </p>

              <p className="mt-4 leading-8 text-slate-400">
                I am continuously improving my technical skills and exploring
                modern technologies to grow as a software developer.
              </p>
            </div>

            {/* Right Side */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-6">
                <h4 className="text-lg font-semibold text-cyan-400">
                  Education
                </h4>
                <p className="mt-2 text-slate-400">
                  Higher National Diploma in Information Technology
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-6">
                <h4 className="text-lg font-semibold text-cyan-400">
                  Experience
                </h4>
                <p className="mt-2 text-slate-400">Software Development</p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-6">
                <h4 className="text-lg font-semibold text-cyan-400">
                  Development
                </h4>
                <p className="mt-2 text-slate-400">
                  Web Applications &amp; Software Solutions
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-6">
                <h4 className="text-lg font-semibold text-cyan-400">
                  Interests
                </h4>
                <p className="mt-2 text-slate-400">
                  Web Development &amp; Modern Technologies
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="border-t border-slate-800 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          {/* Section Title */}
          <div className="mb-12 text-center">
            <p className="text-cyan-400">What I Work With</p>

            <h2 className="mt-2 text-4xl font-bold">My Skills</h2>
          </div>

          {/* Skills Grid */}
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {/* Frontend */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-center transition hover:-translate-y-1 hover:border-cyan-400">
              <h3 className="text-xl font-semibold">HTML</h3>
              <p className="mt-2 text-sm text-slate-400">Web Structure</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-center transition hover:-translate-y-1 hover:border-cyan-400">
              <h3 className="text-xl font-semibold">CSS</h3>
              <p className="mt-2 text-sm text-slate-400">
                Styling &amp; Responsive Design
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-center transition hover:-translate-y-1 hover:border-cyan-400">
              <h3 className="text-xl font-semibold">JavaScript</h3>
              <p className="mt-2 text-sm text-slate-400">
                Interactive Web Applications
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-center transition hover:-translate-y-1 hover:border-cyan-400">
              <h3 className="text-xl font-semibold">React</h3>
              <p className="mt-2 text-sm text-slate-400">
                Frontend Development
              </p>
            </div>

            {/* Backend */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-center transition hover:-translate-y-1 hover:border-cyan-400">
              <h3 className="text-xl font-semibold">PHP</h3>
              <p className="mt-2 text-sm text-slate-400">Backend Development</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-center transition hover:-translate-y-1 hover:border-cyan-400">
              <h3 className="text-xl font-semibold">Node.js</h3>
              <p className="mt-2 text-sm text-slate-400">Backend Development</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-center transition hover:-translate-y-1 hover:border-cyan-400">
              <h3 className="text-xl font-semibold">Java</h3>
              <p className="mt-2 text-sm text-slate-400">
                Application Development
              </p>
            </div>

            {/* Database */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-center transition hover:-translate-y-1 hover:border-cyan-400">
              <h3 className="text-xl font-semibold">MySQL</h3>
              <p className="mt-2 text-sm text-slate-400">Relational Database</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-center transition hover:-translate-y-1 hover:border-cyan-400">
              <h3 className="text-xl font-semibold">MongoDB</h3>
              <p className="mt-2 text-sm text-slate-400">NoSQL Database</p>
            </div>

            {/* Tools & UI */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-center transition hover:-translate-y-1 hover:border-cyan-400">
              <h3 className="text-xl font-semibold">Bootstrap</h3>
              <p className="mt-2 text-sm text-slate-400">UI Development</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-center transition hover:-translate-y-1 hover:border-cyan-400">
              <h3 className="text-xl font-semibold">Tailwind CSS</h3>
              <p className="mt-2 text-sm text-slate-400">Modern UI Styling</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-center transition hover:-translate-y-1 hover:border-cyan-400">
              <h3 className="text-xl font-semibold">Git</h3>
              <p className="mt-2 text-sm text-slate-400">Version Control</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-center transition hover:-translate-y-1 hover:border-cyan-400">
              <h3 className="text-xl font-semibold">GitHub</h3>
              <p className="mt-2 text-sm text-slate-400">Code Collaboration</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="border-t border-slate-800 bg-slate-900/50 px-6 py-20"
      >
        <div className="mx-auto max-w-6xl">
          {/* Section Title */}
          <div className="mb-12 text-center">
            <p className="text-cyan-400">My Professional Experience</p>

            <h2 className="mt-2 text-4xl font-bold">Experience</h2>
          </div>

          {/* Experience Card */}
          <div className="mx-auto max-w-4xl">
            <div className="relative rounded-2xl border border-slate-800 bg-slate-950 p-8 shadow-lg">
              {/* Timeline Line */}
              <div className="absolute left-0 top-8 h-16 w-1 rounded-r bg-cyan-400"></div>

              <div className="md:flex md:items-start md:justify-between">
                {/* Experience Details */}
                <div>
                  <p className="text-sm font-medium text-cyan-400">
                    Software Development
                  </p>

                  <h3 className="mt-2 text-2xl font-bold">
                    Software Developer Intern
                  </h3>

                  <p className="mt-2 text-lg text-slate-300">
                    Southern Provincial Road Development Authority
                  </p>
                </div>

                {/* Date */}
                <div className="mt-4 md:mt-0">
                  <span className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-400">
                    2025 – 2026
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mt-8">
                <p className="leading-8 text-slate-400">
                  Gained practical experience in web application development,
                  database integration, system maintenance, and technical
                  troubleshooting in a real-world software development
                  environment.
                </p>

                <ul className="mt-6 space-y-3 text-slate-400">
                  <li className="flex gap-3">
                    <span className="text-cyan-400">▹</span>
                    Developed and updated web application features using HTML,
                    CSS, JavaScript, PHP, and Bootstrap.
                  </li>

                  <li className="flex gap-3">
                    <span className="text-cyan-400">▹</span>
                    Connected web application features with database tables and
                    worked with data-related functionality using MySQL.
                  </li>

                  <li className="flex gap-3">
                    <span className="text-cyan-400">▹</span>
                    Worked on system maintenance, feature updates, and
                    improvements to existing web applications.
                  </li>

                  <li className="flex gap-3">
                    <span className="text-cyan-400">▹</span>
                    Identified, investigated, and fixed technical issues during
                    application development and maintenance.
                  </li>

                  <li className="flex gap-3">
                    <span className="text-cyan-400">▹</span>
                    Worked collaboratively with team members to implement and
                    improve system functionality.
                  </li>

                  <li className="flex gap-3">
                    <span className="text-cyan-400">▹</span>
                    Gained practical experience working with Git and GitHub for
                    source code management.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="border-t border-slate-800 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          {/* Section Title */}
          <div className="mb-12 text-center">
            <p className="text-cyan-400">My Recent Work</p>

            <h2 className="mt-2 text-4xl font-bold">Projects</h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Here are some of the projects I have worked on while developing my
              software development skills.
            </p>
          </div>

          {/* Project Cards */}
          {projects.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition duration-300 hover:-translate-y-2 hover:border-cyan-400"
                >
                  {/* Project Image / Placeholder */}
                  <div className="flex h-48 items-center justify-center overflow-hidden bg-slate-800">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={`${project.title} project`}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <span className="text-5xl font-bold text-cyan-400">
                        {project.title.substring(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold">{project.title}</h3>

                    <p className="mt-3 leading-7 text-slate-400">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.technologies.map((technology, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-slate-800 px-3 py-1 text-sm text-cyan-400"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>

                    {/* Project Links */}
                    <div className="mt-6 flex flex-wrap gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg border border-cyan-400 px-4 py-2 text-sm font-semibold text-cyan-400 transition hover:bg-cyan-400 hover:text-slate-950"
                        >
                          GitHub →
                        </a>
                      )}

                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400"
                        >
                          Live Demo →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
              <p className="text-slate-400">
                No projects available at the moment.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Education Section */}
      <section
        id="education"
        className="border-t border-slate-800 bg-slate-900/50 px-6 py-20"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="text-cyan-400">My Education</p>

            <h2 className="mt-2 text-4xl font-bold">Education</h2>
          </div>

          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-medium text-cyan-400">
                    Higher National Diploma
                  </p>

                  <h3 className="mt-2 text-2xl font-bold">
                    Higher National Diploma in Information Technology
                  </h3>

                  <p className="mt-3 text-slate-300">
                    SLIATE - Advanced Technological Institute - Labuduwa
                  </p>
                </div>

                <span className="w-fit rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-400">
                  IT
                </span>
              </div>

              <p className="mt-6 leading-7 text-slate-400">
                Studied software development, web technologies, databases,
                programming, system development and other information technology
                concepts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="border-t border-slate-800 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="text-cyan-400">Let's Connect</p>

            <h2 className="mt-2 text-4xl font-bold">Contact Me</h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Interested in working together or have an opportunity? Feel free
              to get in touch with me.
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            {/* Contact Information */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
              <h3 className="text-2xl font-bold">Get In Touch</h3>

              <p className="mt-4 leading-7 text-slate-400">
                I am open to software development opportunities, internships,
                and projects where I can learn and contribute my skills.
              </p>

              <div className="mt-8 space-y-5">
                <div>
                  <p className="text-sm text-slate-500">Email</p>

                  <a
                    href="mailto:sawandinawodya@gmail.com"
                    className="text-cyan-400 hover:text-cyan-300"
                  >
                    sawandinawodya@gmail.com
                  </a>
                </div>

                <div>
                  <p className="text-sm text-slate-500">GitHub</p>

                  <a
                    href="https://github.com/SAWANDI2001"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300"
                  >
                    github.com/SAWANDI2001
                  </a>
                </div>

                <div>
                  <p className="text-sm text-slate-500">LinkedIn</p>

                  <a
                    href="https://www.linkedin.com/in/j-p-s-nawodya-23739230a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300"
                  >
                    LinkedIn Profile
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
              <form onSubmit={handleContactSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Name
                  </label>

                  <input
                    type="text"
                    placeholder="Your name"
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        name: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Email
                  </label>

                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        email: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Message
                  </label>

                  <textarea
                    rows="5"
                    placeholder="Write your message..."
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        message: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={contactLoading}
                  className="w-full rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {contactLoading ? "Sending..." : "Send Message"}
                </button>

                {contactMessage && (
                  <p className="text-center text-cyan-400">{contactMessage}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-sm text-slate-500">
              © 2026 J.P.S. Nawodya. All rights reserved.
            </p>

            <p className="mt-1 text-xs text-slate-600">Software Developer</p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-5">
            <a
              href="#home"
              className="text-sm text-slate-400 transition hover:text-cyan-400"
            >
              Home
            </a>

            <a
              href="#about"
              className="text-sm text-slate-400 transition hover:text-cyan-400"
            >
              About
            </a>

            <a
              href="#projects"
              className="text-sm text-slate-400 transition hover:text-cyan-400"
            >
              Projects
            </a>

            <a
              href="#contact"
              className="text-sm text-slate-400 transition hover:text-cyan-400"
            >
              Contact
            </a>
          </div>

          {/* Social Links */}
          <div className="flex gap-5">
            <a
              href="https://github.com/SAWANDI2001"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my GitHub profile"
              className="text-sm text-slate-400 transition hover:text-cyan-400"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/j-p-s-nawodya-23739230a/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my LinkedIn profile"
              className="text-sm text-slate-400 transition hover:text-cyan-400"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
