import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Landing.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';


function Landing() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: 'ease-in-out',
      once: false,
      mirror: true,
      offset: 100,
    });
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg sticky-top">
        <div className="container-fluid">
          {/* Logo + Marca */}
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img src="/logo2.png" alt="Logo Búho" className="logo-buho" />
            <span className="marca-navbar">EverPlanApp</span>
          </a>

          {/* Botón hamburguesa */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menú colapsable */}
          <div className="collapse navbar-collapse justify-content-between" id="navbarContent">
            <ul className="navbar-nav text-center navbar-enlaces">
              <li className="nav-item"><a className="nav-link" href="#inicio">Inicio</a></li>
              <li className="nav-item"><a className="nav-link" href="#funcionalidades">Funcionalidades</a></li>
              <li className="nav-item"><a className="nav-link" href="#mision-vision">Misión y Visión</a></li>
              <li className="nav-item"><a className="nav-link" href="#nosotros">Nosotros</a></li>
              <li className="nav-item"><a className="nav-link" href="#contacto">Contacto</a></li>
            </ul>

            {/* Botón e ícono */}
            <div className="acciones-navbar">
              <a href="https://forms.gle/oSHN9YNKVDkxviJLA" target="_blank" rel="noreferrer" className="btn-unete">
                Inscríbete ya
              </a>
              <Link to="/login"><img src="/login.png" alt="login" className="login" /></Link>
            </div>
          </div>
        </div>
      </nav>

      {/* LLAMADO A LA ACCIÓN */}
      <section className="cta-section position-relative overflow-hidden">
        <div className="aurora-bg"></div>
        <div className="cta-content container text-center py-5">
          <h2 className="fw-bold">¡Descarga ya nuestra demo!</h2>
          <p className="mb-4">Queremos tu opinión. Tu experiencia nos importa.</p>
          <img src="/demo.png" alt="Logo demo" className="cta-logo mb-4" />
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <img src="/google_play.png" alt="Google Play" height="50" />
            <img src="/app_store.png" alt="App Store" height="50" />
          </div>
        </div>
      </section>

      {/* HERO SECTION */}
      <section id="inicio" className="hero py-5 bg">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="fw-bold">Una app para planificar tu día, organizar tareas y vivir a tu ritmo</h2>
              <p>EverPlanApp es una app pensada para estudiantes neurodivergentes que les ayuda a organizar su estudio, las rutinas diarias y a desarrollar la independencia universitaria, todo en un espacio accesible y amigable.</p>
            </div>
            <div className="col-md-6 text-center">
              <img src="/portada.png" alt="Búho EverPlan" className="img-fluid" style={{ maxHeight: '300px' }} />
            </div>
          </div>
        </div>
      </section>

      {/* CAPACIDADES */}
      <section className="capacidad">
        <div className="container text-center">
          <div className="row">
            {[
              { src: 'list-check.svg', alt: 'Gestión de tareas', title: 'Gestión de tareas', text: 'Planifica tus actividades y lleva un control visual todo el día.' },
              { src: 'calendar-check.svg', alt: 'Rutinas diarias', title: 'Rutinas diarias', text: 'Crea rutinas para estructurar tu día a día.' },
              { src: 'lightbulb.svg', alt: 'Recomendaciones', title: 'Recomendaciones', text: 'Recibe sugerencias adaptadas por tus tareas y estado.' },
              { src: 'emoji-smile.svg', alt: 'Autorregulación', title: 'Autorregulación', text: 'Herramientas que te ayudan a mejorar tu bienestar diario.' }
            ].map(({ src, alt, title, text }, idx) => (
              <div className="col-12 col-sm-6 col-md-3 mb-4" key={idx}>
                <div className="card-capacidad h-100">
                  <img src={`/${src}`} alt={alt} className="mb-3" style={{ height: '50px' }} />
                  <h5>{title}</h5>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FUNCIONALIDADES */}
      <section id="funcionalidades" className="py-5" style={{ backgroundColor: '#E6EDF0' }}>
        <div className="container text-center">
          <h2 className="mb-4 fw-bold">Funcionalidades Clave de EverPlanApp</h2>
          <div id="carouselFunciones" className="carousel slide position-relative" data-bs-ride="carousel">
            <div className="carousel-inner">
              {[1, 2, 3].map((item, index) => (
                <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={item}>
                  <div className="row justify-content-center align-items-center">
                    <div className="col-md-5">
                      <img src="/celular.png" className="img-fluid" alt="Funcionalidad" />
                    </div>
                    <div className="col-md-6 text-start">
                      <div className="text-content">
                        {item === 1 && (
                          <>
                            <h4 className="fw-bold">Organización Académica Simplificada</h4>
                            <p>Diseñada para eliminar el caos de las agendas tradicionales...</p>
                            <ul>
                              <li><strong>Agenda Visual:</strong> pictogramas y colores.</li>
                              <li><strong>Checklist:</strong> pasos simples por tarea.</li>
                              <li><strong>Recordatorios Silenciosos:</strong> vibración o animaciones suaves.</li>
                              <li><strong>Vista calendario:</strong> bloques de rutina.</li>
                            </ul>
                          </>
                        )}
                        {item === 2 && (
                          <>
                            <h4 className="fw-bold">Regulación Sensorial y Emocional</h4>
                            <p>Ayuda al reconocimiento y gestión emocional...</p>
                            <ul>
                              <li><strong>Panel Emocional:</strong> íconos amigables.</li>
                              <li><strong>Herramientas de Autorregulación:</strong> sonidos, respiración, Pomodoro adaptado.</li>
                            </ul>
                          </>
                        )}
                        {item === 3 && (
                          <>
                            <h4 className="fw-bold">Aprendizaje Personalizado y Adaptativo</h4>
                            <p>La app se adapta al estilo del usuario...</p>
                            <ul>
                              <li><strong>Test Inicial:</strong> detecta estilo de aprendizaje.</li>
                              <li><strong>Recomendaciones Inteligentes:</strong> según perfil.</li>
                            </ul>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="carousel-control-prev position-absolute top-50 start-0 translate-middle-y" type="button" data-bs-target="#carouselFunciones" data-bs-slide="prev" style={{ zIndex: 10 }}>
              <span className="carousel-control-prev-icon custom-carousel-icon"></span>
            </button>
            <button className="carousel-control-next position-absolute top-50 end-0 translate-middle-y" type="button" data-bs-target="#carouselFunciones" data-bs-slide="next" style={{ zIndex: 10 }}>
              <span className="carousel-control-next-icon custom-carousel-icon"></span>
            </button>
          </div>
        </div>
      </section>

      {/* MISION Y VISION */}
      <section id="mision-vision" className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4">
              <div className="p-4 bg-mision shadow rounded-4">
                <i className="bi bi-bullseye text-primary fs-1 mb-3"></i>
                <h3 className="text-primary">Misión</h3>
                <p>Diseñar una app inclusiva que facilite la organización de tareas, clases y rutinas, con herramientas de apoyo emocional y recordatorios visuales, para fomentar la autonomía y el bienestar de personas neurodivergentes en su vida académica.</p>
              </div>
            </div>
            <div className="col-md-6 mb-4" data-aos="fade-left">
              <div className="p-4 bg-vision shadow rounded-4">
                <i className="bi bi-eye text-success fs-1 mb-3"></i>
                <h3 className="text-success">Visión</h3>
                <p>Ser la plataforma líder en Latinoamérica que impulsa la autonomía de estudiantes neurodivergentes a través de tecnología inclusiva, personalizada y diseñada para apoyar su organización, aprendizaje y bienestar integral.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" className="container my-5">
        <h2 className="text-center mb-5">Conoce a Nuestro Equipo</h2>
        {[
          { name: 'Sebastián Gallardo', img: 'seba.jpg', desc: 'Desarrollador Backend apasionado por la automatización y la eficiencia.', logo: 'backend.png' },
          { name: 'Michelle Rocha', img: 'michelle.jpg', desc: 'Desarrolladora Frontend centrada en accesibilidad y diseño responsivo.', logo: 'frontend.png', reverse: true },
          { name: 'Alan Mac-kay', img: 'alan_2.jpg', desc: 'Ingeniero DevOps enfocado en integración continua y despliegue eficiente.', logo: 'DevOps.png' }
        ].map(({ name, img, desc, logo, reverse }, idx) => (
          <div className={`row align-items-center mb-5 ${reverse ? 'flex-row-reverse' : ''}`} key={idx}>
            <div className="col-md-4 text-center">
              <img src={`/${img}`} alt={name} className="img-uniforme shadow" />
            </div>
            <div className="col-md-4">
              <h4>{name}</h4>
              <p>{desc}</p>
            </div>
            <div className="col-md-4 text-center">
              <img src={`/${logo}`} alt={`Logo ${name}`} className="logo-equipo" />
            </div>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer id="contacto" className="footer">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-4 mb-4 mb-md-0">
              <img src="/piepagina.png" alt="Logo" className="footer-logo" />
              <p className="footer-text">EverPlanApp es tu aliado para estudiar con autonomía y bienestar.</p>
            </div>
            <div className="col-md-4">
              <h5 className="footer-title">Políticas</h5>
              <ul className="footer-contact">
                <li><a href="#" className="footer-link-visual">Términos y Condiciones</a></li>
                <li><a href="#" className="footer-link-visual">Política de Privacidad</a></li>
                <li><a href="#" className="footer-link-visual">Política de Cookies</a></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5 className="footer-title">Contacto</h5>
              <ul className="footer-contact">
                <li>
                  <a href="mailto:everplanapp.group@gmail.com" className="footer-link-visual">
                    <i className="bi bi-envelope"></i> everplanapp.group@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row justify-content-center mb-3">
            <div className="col-md-6 text-center">
              <h5 className="footer-title">Síguenos</h5>
              <div className="social-icons">
                <a href="https://www.instagram.com/everplanapp/" target="_blank" rel="noreferrer" className="social-icon text-white mx-2"><i className="fab fa-instagram"></i></a>
                <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="social-icon text-white mx-2"><i className="fab fa-linkedin-in"></i></a>
                <a href="mailto:everplanapp.group@gmail.com" className="social-icon text-white mx-2"><i className="fas fa-envelope"></i></a>
              </div>
            </div>
          </div>
          <div className="footer-bottom text-center">
            <p>© 2025 EverPlanApp. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Landing;
