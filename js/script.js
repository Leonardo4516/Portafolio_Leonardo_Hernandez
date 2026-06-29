/* ============================================================
   script.js
   Plantilla de portafolio — JS vanilla, sin dependencias.

   Este archivo está comentado a propósito: además de hacer
   funcionar la plantilla, sirve para repasar conceptos de JS:
   arreglos de objetos, template literals, manipulación del DOM,
   localStorage e IntersectionObserver.
   ============================================================ */

/* ------------------------------------------------------------
   1) DATOS — esto es lo principal que vas a editar.
   Agregá, quitá o modificá objetos en estos dos arreglos.
   ------------------------------------------------------------ */

const proyectos = [
  {
    titulo: "Gestor de herramientas",
    descripcion: "Aplicación de gestión de inventario y préstamos desarrollada en Python puro, con control de acceso por roles (administrador/residente), registro de usuarios y persistencia de datos en JSON. Enfocada en lógica de negocio y manejo de sesiones sin frameworks externos.",
    tipo: "backend", // "frontend" | "backend" | "fullstack"
    tags: ["PYTHON"],
    demo: "../media/Demo_gestor.gif",
    repo: "https://github.com/Leonardo4516/Gestor_de_herramientas"
  },
  {
    titulo: "Portal de autogestión bancaria ACME",
    descripcion: "Portal de autogestión bancaria construido 100% con HTML, CSS y JavaScript vanilla — sin frameworks ni dependencias externas. Incluye autenticación, registro, recuperación de contraseña y dashboard transaccional, usando Web Components personalizados y persistencia de datos en el navegador.",
    tipo: "frontend",
    tags: ["HTML", "CSS", "JavaScript"],
    demo: "https://auto-gestion-bancaria-acme.netlify.app",
    repo: "https://github.com/Leonardo4516/ACME_Bank"
  },
  {
    titulo: "BOT de gestion de pedidos para cafetería",
    descripcion: "Sistema de automatización para digitalizar pedidos de cafetería en entornos institucionales. Integra n8n, Telegram y Google Sheets para eliminar el registro manual y generar reportes de ventas en tiempo real, eliminando filas físicas.",
    tipo: "n8n",
    tags: ["n8n", "Telegram API", "Google sheets API"],
    demo: "https://github.com/Leonardo4516/Chatbot_Gestor_de_pedidos/tree/main/Evidencias/Funcionamiento",
    repo: "https://github.com/Leonardo4516/Chatbot_Gestor_de_pedidos"
  },
  {
    titulo: "Ecommerce de moda",
    descripcion: "Interfaz de ecommerce de moda construida con HTML y CSS puro (sin frameworks ni JavaScript), con diseño mobile-first. Incluye catálogo con búsqueda y filtros por categoría, páginas de detalle de producto, carrito/checkout y menú hamburguesa implementado solo con CSS.",
    tipo: "frontend",
    tags: ["HTML", "CSS"],
    demo: "https://ecommerce-ropa-davinci.netlify.app/",
    repo: "https://github.com/Leonardo4516/Ecommerce_Page"
  }
  // 👉 Copiá uno de estos objetos y modificalo para agregar tu propio proyecto.
];

const habilidadesFrontend = [
  { nombre: "HTML", nivel: "Intermedio" },
  { nombre: "CSS", nivel: "Intermedio" },
  { nombre: "JavaScript", nivel: "Básico → en progreso" }
];

const habilidadesBackend = [
  { nombre: "Python", nivel: "Intermedio" },
  { nombre: "Lógica y estructuras de datos", nivel: "Intermedio" },
  { nombre: "BD (MySQL Workbrench)", nivel: "Básico" },
  { nombre: "N8N", nivel: "Intermedio" }
];

/* ------------------------------------------------------------
   2) RENDERIZADO — convierte los datos de arriba en HTML.
   No necesitás tocar esta parte para usar la plantilla.
   ------------------------------------------------------------ */

const ETIQUETAS_BADGE = {
  frontend: { clase: "badge--frontend", texto: "FRONTEND" },
  backend: { clase: "badge--backend", texto: "PYTHON" },
  fullstack: { clase: "badge--fullstack", texto: "FULL STACK" },
  n8n: { clase: "badge--n8n", texto: "N8N" }
};

function crearTarjetaProyecto(proyecto) {
  const badge = ETIQUETAS_BADGE[proyecto.tipo] ?? ETIQUETAS_BADGE.frontend;

  const tagsHTML = proyecto.tags
    .map((tag) => `<span class="tag">${tag}</span>`)
    .join("");

  return `
    <article class="project-card">
      <div class="project-card__top">
        <h3 class="project-card__title">${proyecto.titulo}</h3>
        <span class="badge ${badge.clase}">${badge.texto}</span>
      </div>
      <p class="project-card__desc">${proyecto.descripcion}</p>
      <div class="project-card__tags">${tagsHTML}</div>
      <div class="project-card__links">
        <a href="${proyecto.demo}" target="_blank" rel="noopener">Ver demo →</a>
        <a href="${proyecto.repo}" target="_blank" rel="noopener">Código ↗</a>
      </div>
    </article>
  `;
}

function renderizarProyectos() {
  const contenedor = document.getElementById("proyectos-grid");
  if (!contenedor) return;

  contenedor.innerHTML = proyectos.map(crearTarjetaProyecto).join("");

  const statProyectos = document.getElementById("stat-proyectos");
  if (statProyectos) statProyectos.textContent = proyectos.length;

  // Una vez insertadas las tarjetas, las observamos para animarlas al hacer scroll
  observarTarjetas();
}

function crearFilaHabilidad(skill) {
  return `<li><span>${skill.nombre}</span><span>${skill.nivel}</span></li>`;
}

function renderizarHabilidades() {
  const frontend = document.getElementById("skills-frontend");
  const backend = document.getElementById("skills-backend");

  if (frontend) frontend.innerHTML = habilidadesFrontend.map(crearFilaHabilidad).join("");
  if (backend) backend.innerHTML = habilidadesBackend.map(crearFilaHabilidad).join("");
}

/* ------------------------------------------------------------
   3) TEMA CLARO / OSCURO — se guarda en localStorage
   ------------------------------------------------------------ */

function inicializarTema() {
  const boton = document.getElementById("theme-toggle");
  const guardado = localStorage.getItem("portfolio-theme");

  if (guardado) {
    document.documentElement.setAttribute("data-theme", guardado);
  }

  boton?.addEventListener("click", () => {
    const actual = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    const siguiente = actual === "light" ? "dark" : "light";

    if (siguiente === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }

    localStorage.setItem("portfolio-theme", siguiente);
  });
}

/* ------------------------------------------------------------
   4) MENÚ MÓVIL
   ------------------------------------------------------------ */

function inicializarMenuMovil() {
  const boton = document.getElementById("menu-btn");
  const menu = document.getElementById("mobile-menu");
  if (!boton || !menu) return;

  boton.addEventListener("click", () => {
    const abierto = menu.classList.toggle("is-open");
    boton.setAttribute("aria-expanded", String(abierto));
  });

  // Cierra el menú al elegir una sección
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      boton.setAttribute("aria-expanded", "false");
    });
  });
}

/* ------------------------------------------------------------
   5) PESTAÑA ACTIVA SEGÚN LA SECCIÓN VISIBLE
   ------------------------------------------------------------ */

function inicializarTabsActivas() {
  const secciones = document.querySelectorAll("main section[id]");
  const tabs = document.querySelectorAll(".tab");

  const observer = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;

        tabs.forEach((tab) => {
          const esActiva = tab.getAttribute("href") === `#${entrada.target.id}`;
          tab.classList.toggle("tab--active", esActiva);
        });
      });
    },
    { rootMargin: "-40% 0px -50% 0px" }
  );

  secciones.forEach((seccion) => observer.observe(seccion));
}

/* ------------------------------------------------------------
   6) ANIMACIÓN DE ENTRADA PARA LAS TARJETAS DE PROYECTO
   ------------------------------------------------------------ */

function observarTarjetas() {
  const tarjetas = document.querySelectorAll(".project-card");

  const prefiereReducirMovimiento = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefiereReducirMovimiento) {
    tarjetas.forEach((t) => t.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          const index = Array.from(tarjetas).indexOf(entrada.target);
          entrada.target.style.setProperty("--card-delay", `${index * 0.1}s`);
          entrada.target.classList.add("is-visible");
          observer.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  tarjetas.forEach((tarjeta) => observer.observe(tarjeta));
}

/* ------------------------------------------------------------
   7) AÑO DEL FOOTER
   ------------------------------------------------------------ */

function actualizarAnio() {
  const span = document.getElementById("year");
  if (span) span.textContent = new Date().getFullYear();
}

/* ------------------------------------------------------------
   8) HEADER CON FONDO DIFUMINADO AL HACER SCROLL
   ------------------------------------------------------------ */

function inicializarScrollHeader() {
  const topbar = document.querySelector(".topbar");
  const hero = document.querySelector(".hero");
  if (!topbar || !hero) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      topbar.classList.toggle("is-scrolled", !entry.isIntersecting);
    },
    { rootMargin: "-1px 0px 0px 0px", threshold: 0 }
  );
  observer.observe(hero);
}

/* ------------------------------------------------------------
   9) REVELACIÓN DE SECCIONES AL HACER SCROLL
   ------------------------------------------------------------ */

function inicializarRevelacionSecciones() {
  const secciones = document.querySelectorAll(".section");
  if (!secciones.length) return;

  const observer = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("is-revealed");
          observer.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  secciones.forEach((seccion) => observer.observe(seccion));
}

/* ------------------------------------------------------------
   10) ANIMACIÓN DE HABILIDADES AL HACER SCROLL
   ------------------------------------------------------------ */

function inicializarAnimacionHabilidades() {
  const listas = document.querySelectorAll(".skills-list");
  if (!listas.length) return;

  const observer = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("is-visible");
          observer.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  listas.forEach((lista) => observer.observe(lista));
}

/* ------------------------------------------------------------
   11) CONTADOR ANIMADO DE ESTADÍSTICAS
   ------------------------------------------------------------ */

function inicializarContadorEstadisticas() {
  const prefiereReducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefiereReducir) return;

  const el = document.getElementById("stat-proyectos");
  if (!el) return;
  const final = parseInt(el.textContent, 10);
  if (isNaN(final) || final < 1) return;

  el.textContent = "0";

  setTimeout(() => {
    let actual = 0;
    const inicio = performance.now();

    function tick(ahora) {
      const t = Math.min((ahora - inicio) / 600, 1);
      actual = Math.floor(t * final);
      el.textContent = actual;
      if (t < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, 900);
}

/* ------------------------------------------------------------
   12) OCULTAR CURSOR PARPADENTE DEL HERO
   ------------------------------------------------------------ */

function inicializarCursorHero() {
  setTimeout(() => {
    document.querySelector(".hero__hello")?.classList.add("cursor-hidden");
  }, 4000);
}

/* ------------------------------------------------------------
   PUNTO DE ENTRADA
   ------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", () => {
  renderizarProyectos();
  renderizarHabilidades();
  inicializarTema();
  inicializarMenuMovil();
  inicializarTabsActivas();
  actualizarAnio();
  inicializarScrollHeader();
  inicializarRevelacionSecciones();
  inicializarAnimacionHabilidades();
  inicializarContadorEstadisticas();
  inicializarCursorHero();
});
