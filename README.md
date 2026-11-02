# DIMAPESA — Portafolio v2

Portafolio de Diego Martin Pelayo Salazar. Next.js 15 + Tailwind 4 + Motion + Lenis + Canvas 2D. Basado en la guía `GUIA-DISENO-PORTAFOLIO.md` (MayLiss), con la marca DIMAPESA: llaves `{ }` que cambian con el tema como en la v1 (lima `#B6FF55` en oscuro, violeta `#8247FF` en claro; token `--brace`). El retrato del hero no tiene fondo (`public/img/diego-recorte.webp`, recortado con Vision de macOS) para verse bien en ambos temas.

```bash
npm install
npm run dev        # http://localhost:3000
```

## Lo épico
La primera visita de cada sesión abre con una intro tipo prompt: se escribe una instrucción, se "genera" y las letras se vuelven partículas que forman el `{D}`; después las llaves enmarcan el retrato. Se puede saltar con el botón o con `Escape`, y no aparece con *reduced motion*.
- Motor de partículas: `components/canvas/particulas.ts`
- Hero e intro: `components/sections/Hero.tsx`
- Para volver a ver la intro: cierra la pestaña o borra `sessionStorage` (`dimapesa-intro-vista`).

## Dónde agregar contenido
| Qué | Archivo |
|---|---|
| Correo, redes, navegación | `config/site.ts` |
| Proyectos del inicio, capacidades, filas del archivo | `data/contenido.ts` |
| Visuales con IA, pistas de música, sitios, entradas del blog | `data/archivo.ts` |
| Caso de estudio MayLiss | `app/trabajo/mayliss/page.tsx` |
| Textos de Sobre mí | `app/sobre-mi/page.tsx` |
| Herramientas y lenguajes (con logo) | `components/brand/Herramientas.tsx` |
| CV (experiencia, formación, proyectos) | `data/cv.ts` y `app/cv/page.tsx` |

## CV
`/cv` es una hoja tamaño carta con el mismo sistema visual del sitio. Los PDF de `public/cv/` (claro, oscuro e inglés) se generan imprimiendo esa página con Chrome; si cambias el contenido, vuelve a generarlos (Chrome → Imprimir → Guardar como PDF, tamaño carta, sin márgenes, con gráficos de fondo).

Imágenes en `public/img/` (webp, ~1600px de ancho). MP3 en `public/audio/`. Todas las rutas pasan por `asset()` para funcionar en GitHub Pages.

Todo texto es bilingüe con `<T es="…" en="…" />`; el idioma y el tema se guardan en el navegador.

## Pendiente
- [ ] Imágenes de Visuales con IA, pistas de SUNO y más sitios.
- [ ] Nombres de los cursos de Platzi para el CV (`FORMACION_CONTINUA` en `data/cv.ts`).
- [ ] Blog: cuando exista la primera nota, agregar `app/blog/[slug]/page.tsx` (con `generateStaticParams`) y contenido en MDX.

## Publicación (GitHub Pages)
Cada push a `main` publica con `.github/workflows/deploy.yml`. Para probar el export localmente:

```bash
GITHUB_PAGES=true NEXT_PUBLIC_BASE_PATH=/dimapesa-portafolio npm run build   # genera out/
```
