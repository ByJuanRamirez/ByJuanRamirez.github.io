import { blogPosts } from '../data/portfolio.js';

export function createBlog() {
  const section = document.createElement('section');
  section.className = 'blog';
  section.id = 'blog';

  const cards = blogPosts.map((post, i) => {
    const tags = post.tags.map(t => `<span class="blog__tag">${t}</span>`).join('');
    return `
      <article class="blog__card reveal reveal-delay-${(i % 3) + 1}">
        ${post.comingSoon ? `<span class="blog__coming-soon">Próximamente</span>` : `<span class="blog__coming-soon" style="background:var(--green-dim);color:var(--green);border-color:var(--green)">${post.date}</span>`}
        <h3 class="blog__card-title">${post.title}</h3>
        <p class="blog__card-excerpt">${post.excerpt}</p>
        <div class="blog__card-tags">${tags}</div>
      </article>
    `;
  }).join('');

  section.innerHTML = `
    <div class="container">
      <div class="section-header reveal">
        <span class="section-label">Blog</span>
        <h2>Artículos & Notas</h2>
        <p style="max-width:480px;margin:0 auto;">
          Reflexiones técnicas sobre JavaScript, flujos de trabajo con IA y desarrollo en producción.
        </p>
      </div>

      <div class="blog__grid">
        ${cards}
      </div>
    </div>
  `;

  return section;
}
