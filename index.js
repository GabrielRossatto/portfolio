const projects = [
  {
    title: "Sistema de Gestão Financeira",
    desc: "Aplicação web para controle de receitas e despesas. Formulários, validações e interface responsiva.",
    tags: ["frontend", "ui"],
    stack: ["HTML", "CSS", "JS"],
    demo: "https://financial-management-app-vert.vercel.app/contasCadastradas",
    repo: "https://github.com/GabrielRossatto/financial-management-app"
  }, 

  {
    title: "Blog Dinâmico com Angular",
    desc: "Aplicação web desenvolvida com Angular para exibição de conteúdos de forma dinâmica, simulando um blog de tecnologia. O projeto utiliza componentização para organizar a estrutura da página, permitindo fácil manutenção e escalabilidade. O foco foi aplicar boas práticas de front-end, organização visual, separação de componentes e renderização dinâmica de dados.",
    tags: ["frontend", "ui"],
    stack: ["Angular", "TypeScript", "TS"],
    demo: "https://gabrielrossatto.github.io/angular-blog/",
    repo: "https://github.com/GabrielRossatto/angular-blog"
  },

  {
    title: "PlayStation Store — Interface de Loja Desenvolvida com Angular",
    desc: "Aplicação front-end desenvolvida com Angular, simulando a interface da PlayStation Store para listagem de jogos. O projeto foca na construção de layout, componentização e renderização dinâmica de cards com informações de produtos. Foi utilizado Angular para estruturar a aplicação, organizar componentes e simular dados de forma dinâmica, reforçando conceitos de front-end e organização de interface.",
    tags: ["frontend", "ui"],
    stack: ["Angular", "TypeScript", "TS"],
    demo: "https://gabrielrossatto.github.io/playstation-store/",
    repo: "https://github.com/GabrielRossatto/angular-blog"
  }


];

const grid = document.getElementById("projectsGrid");
const modalOverlay = document.getElementById("modalOverlay");
const closeModalBtn = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalTags = document.getElementById("modalTags");
const modalDemo = document.getElementById("modalDemo");
const modalRepo = document.getElementById("modalRepo");
const yearEl = document.getElementById("year");
const statProjects = document.getElementById("statProjects");

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

yearEl.textContent = new Date().getFullYear();
statProjects.textContent = projects.length;

function renderProjects(list) {
  grid.innerHTML = "";

  list.forEach((p, idx) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <h3>${p.title}</h3>
      <p>${p.desc}</p>

      <div class="tags">
        ${p.stack.map(t => `<span class="tag">${t}</span>`).join("")}
      </div>

      <div class="cardActions">
        <button class="btn btn--primary" data-open="${idx}">Detalhes</button>
        <a class="btn" href="${p.repo}" target="_blank" rel="noreferrer">Código</a>
      </div>
    `;
    grid.appendChild(card);
  });
}

function openModal(project) {
  modalTitle.textContent = project.title;
  modalDesc.textContent = project.desc;

  modalTags.innerHTML = project.stack.map(t => `<span class="tag">${t}</span>`).join("");

  modalDemo.href = project.demo || "#";
  modalRepo.href = project.repo || "#";

  modalDemo.style.display = project.demo ? "inline-flex" : "none";
  modalRepo.style.display = project.repo ? "inline-flex" : "none";

  modalOverlay.classList.add("is-open");
  modalOverlay.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modalOverlay.classList.remove("is-open");
  modalOverlay.setAttribute("aria-hidden", "true");
}

grid.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-open]");
  if (!btn) return;

  const index = Number(btn.getAttribute("data-open"));
  const project = projects[index];
  if (project) openModal(project);
});

closeModalBtn.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// Filtros
const chips = document.querySelectorAll(".chip");
chips.forEach(chip => {
  chip.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("is-active"));
    chip.classList.add("is-active");

    const filter = chip.dataset.filter;
    if (filter === "all") {
      renderProjects(projects);
      return;
    }
    const filtered = projects.filter(p => p.tags.includes(filter));
    renderProjects(filtered);
  });
});

// Menu mobile
menuBtn.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});

// Render inicial
renderProjects(projects);


