# Krateroi's Robux Converter

Static website by Krateroi for converting Robux to real currencies, comparing official Roblox purchase packages, calculating the 30% marketplace tax, and estimating DevEx earnings.

## Architecture

This project is designed for **static hosting**. It has no authentication, database, private secrets, custom API routes, or server-rendered content. Calculations run in the browser, guides are pre-rendered HTML, and exchange rates are requested client-side with offline fallbacks.

The project includes static-hosting configuration for Netlify and Vercel. GitHub Pages and Cloudflare Pages also work because no build step is required.

Las configuraciones de Netlify y Vercel aplican CSP, proteccion contra clickjacking, HSTS, politica de referrer, bloqueo de plugins y permisos innecesarios del navegador. No se incluyen claves privadas, credenciales, archivos de entorno ni source maps en el proyecto. Los IDs de AdSense son identificadores publicos y solo deben activarse con valores emitidos por Google.

Sin dependencias, sin npm, sin servidor: la app principal es `index.html` + `styles.css` + `app.js`, mas el modulo de anuncios `ads.js`, un set de guias SEO en ingles (`guides.html` + 4 articulos), `privacy.html` y `robots.txt`.

## Run locally

- **Open `index.html`** — double-click it to open the calculator in a browser.
- **VS Code Live Server** — right-click `index.html` and choose "Open with Live Server".

## Free static hosting

The simplest free option is **GitHub Pages**: create a repository, upload this folder, then open **Settings → Pages**, choose **Deploy from a branch**, select the default branch and the `/ (root)` folder, and save. GitHub will provide an HTTPS URL.

Other free options:

- **Netlify**: connect the repository; `netlify.toml` publishes the root folder.
- **Cloudflare Pages**: import the repository, leave the build command empty, and use `.` as the output directory.
- **Vercel**: import the project as a static site; `vercel.json` contains the recommended headers.

Las etiquetas canonical del HTML son relativas para que funcionen sin cambios en cualquier hosting y dominio. Cuando tengas el dominio definitivo, genera un sitemap absoluto para ese dominio y publícalo junto con el sitio; no se incluye uno incompleto con URLs ficticias.

## Features

- **3 languages**: English is the default, with Español and Português available. The browser language is detected when no preference has been saved, and the choice is stored in localStorage.
- **30 monedas** con tasas en vivo via [ExchangeRate-API](https://www.exchangerate-api.com) (gratuita, sin clave), cache maxima de 24 horas en localStorage, refresco automatico al comenzar cada dia UTC y tasas de respaldo sin conexion: USD, CLP, EUR, GBP, BRL, ARS, MXN, COP, PEN, UYU, BOB, PYG, CAD, AUD, NZD, JPY, KRW, CNY, INR, CHF, SEK, NOK, DKK, PLN, TRY, PHP, IDR, THB, MYR, ZAR.
- **Conversor bidireccional** Robux ⇄ moneda con tres tasas de referencia: mejor paquete web, mejor paquete app/consola, o DevEx.
- **Precios y paquetes**: tablas web vs app/consola (la web da mas Robux al mismo precio) + tabla de suscripciones con Robux mensuales (Premium legacy, con nota del reemplazo Roblox Plus). Estos datos se muestran con fecha de ultima revision y deben verificarse cuando Roblox publique cambios oficiales.
- **Costo-beneficio**: combinacion de paquetes mas barata para un objetivo de Robux (knapsack no acotado) comparando plataformas.
- **Impuesto 30%**: recibo por precio de venta, precio necesario para un neto deseado, y tabla rapida de precios comunes.
- **DevEx**: Robux ganados → USD (tasa US$0.0035/R$, con aviso del minimo de 30.000 R$), USD deseado → Robux necesarios, y pipeline completo de una venta: precio → impuesto 30% → neto → DevEx → tu moneda.

## Actualizar datos

Los datos de producto y politica estan al inicio de `app.js`: paquetes (`PLATFORMS`), suscripciones (`SUBSCRIPTIONS`), tasa DevEx (`DEVEX_USD_PER_ROBUX`), minimo de retiro (`DEVEX_MIN_ROBUX`) y monedas (`CURRENCIES` + `FALLBACK_RATES`). Al editar, actualiza `DATA_UPDATED`; esa fecha se muestra al usuario como fecha de revision editorial. Las tasas de moneda no requieren edicion manual: se refrescan una vez por dia y se marcan como offline si no se puede consultar la fuente. Los textos traducidos viven en el objeto `I18N` (es/en/pt).

## Google AdSense

Cuatro ubicaciones de anuncio (dos rieles laterales 160x600, un bloque responsive dentro del contenido y una barra inferior anchor) mas un set de guias SEO en ingles apuntadas a keywords Tier-1 ("robux to usd", "robux calculator", "roblox devex", "roblox 30% tax"), enlazadas desde el home con deep-links por hash. All four ad spaces show placeholders until you add your Google AdSense IDs to the `ADS` block at the top of **`ads.js`** (`enabled`, `client`, `slots.{left,right,content,anchor}`). The complete setup and hosting walkthrough is in [`MONETIZACION.md`](MONETIZACION.md). Copy `ads.txt.example` to `ads.txt` after Google gives you your publisher ID.

## Notas

- Proyecto no oficial, sin afiliacion con Roblox Corporation.
- Los Robux no son convertibles a dinero real salvo por DevEx (desarrolladores elegibles).
- Precios base en USD; los montos regionales reales de Roblox pueden diferir de la simple conversion cambiaria.
