"use strict";

const PLATFORMS = [
  {
    id: "web",
    labelKey: "platform.web",
    packages: [
      { priceUSD: 4.99, robux: 500 },
      { priceUSD: 9.99, robux: 1000 },
      { priceUSD: 19.99, robux: 2000 },
      { priceUSD: 49.99, robux: 5250 },
      { priceUSD: 99.99, robux: 11000 },
      { priceUSD: 199.99, robux: 24000 }
    ]
  },
  {
    id: "app",
    labelKey: "platform.app",
    packages: [
      { priceUSD: 4.99, robux: 400 },
      { priceUSD: 9.99, robux: 800 },
      { priceUSD: 19.99, robux: 1700 },
      { priceUSD: 49.99, robux: 4500 },
      { priceUSD: 99.99, robux: 10000 },
      { priceUSD: 199.99, robux: 22500 }
    ]
  }
];

const SUBSCRIPTIONS = [
  { name: "Premium 450", priceUSD: 4.99, robuxMonth: 450, legacy: true },
  { name: "Premium 1000", priceUSD: 9.99, robuxMonth: 1000, legacy: true },
  { name: "Premium 2200", priceUSD: 19.99, robuxMonth: 2200, legacy: true }
];

const MARKETPLACE_TAX = 0.3;
const DEVEX_USD_PER_ROBUX = 0.0035;
const DEVEX_MIN_ROBUX = 30000;
const DATA_UPDATED = "2026-09-12";
const TAX_TABLE_PRICES = [5, 10, 25, 50, 100, 250, 500, 1000, 5000, 10000];

const CURRENCIES = [
  { code: "USD", decimals: 2 },
  { code: "CLP", decimals: 0 },
  { code: "EUR", decimals: 2 },
  { code: "GBP", decimals: 2 },
  { code: "BRL", decimals: 2 },
  { code: "ARS", decimals: 2 },
  { code: "MXN", decimals: 2 },
  { code: "COP", decimals: 0 },
  { code: "PEN", decimals: 2 },
  { code: "UYU", decimals: 2 },
  { code: "BOB", decimals: 2 },
  { code: "PYG", decimals: 0 },
  { code: "CAD", decimals: 2 },
  { code: "AUD", decimals: 2 },
  { code: "NZD", decimals: 2 },
  { code: "JPY", decimals: 0 },
  { code: "KRW", decimals: 0 },
  { code: "CNY", decimals: 2 },
  { code: "INR", decimals: 2 },
  { code: "CHF", decimals: 2 },
  { code: "SEK", decimals: 2 },
  { code: "NOK", decimals: 2 },
  { code: "DKK", decimals: 2 },
  { code: "PLN", decimals: 2 },
  { code: "TRY", decimals: 2 },
  { code: "PHP", decimals: 2 },
  { code: "IDR", decimals: 0 },
  { code: "THB", decimals: 2 },
  { code: "MYR", decimals: 2 },
  { code: "ZAR", decimals: 2 }
];

const FALLBACK_RATES = {
  USD: 1, CLP: 930, EUR: 0.92, GBP: 0.78, BRL: 5.45, ARS: 1280, MXN: 18.4,
  COP: 4100, PEN: 3.72, UYU: 40, BOB: 6.9, PYG: 7800, CAD: 1.37, AUD: 1.52,
  NZD: 1.66, JPY: 155, KRW: 1380, CNY: 7.2, INR: 86, CHF: 0.88, SEK: 10.6,
  NOK: 10.9, DKK: 6.9, PLN: 4.0, TRY: 38, PHP: 57, IDR: 16200, THB: 34,
  MYR: 4.5, ZAR: 18
};

const I18N = {
  es: {
    locale: "es-CL",
    "status.loading": "Cargando tasas...",
    "status.live": "Tasas en vivo · {when}",
    "status.offline": "Sin conexion: usando tasas de referencia",
    "tab.converter": "Conversor",
    "tab.packages": "Precios y paquetes",
    "tab.optimizer": "Costo-beneficio",
    "tab.tax": "Impuesto 30%",
    "tab.devex": "DevEx",
    "conv.title": "Conversor Robux ⇄ Moneda",
    "conv.hint": "Escribe en cualquiera de los dos campos y el otro se actualiza al instante.",
    "conv.currency": "Moneda",
    "conv.basis": "Tasa de referencia",
    "basis.web": "Mejor paquete web (comprar Robux)",
    "basis.app": "Mejor paquete app/consola (comprar Robux)",
    "basis.devex": "DevEx — retiro para desarrolladores (US$0.0035 / R$)",
    "note.web": "mejor paquete disponible en la web de Roblox",
    "note.app": "mejor paquete disponible en app/consola",
    "note.devex": "tasa de retiro DevEx para desarrolladores",
    "conv.note": "Tasa usada: <strong>{rate} por 1.000 R$</strong> ({label}). Los Robux no son canjeables directamente por dinero salvo via DevEx.",
    "conv.allCurrencies": "Equivalencia en todas las monedas",
    "th.currency": "Moneda",
    "th.value": "Valor",
    "th.rate1000": "Tasa (por 1.000 R$)",
    "pkg.title": "Precios oficiales de Robux",
    "pkg.hint": "Comprar por la web de Roblox entrega mas Robux que por app movil o consola al mismo precio. Los precios base estan en USD; la columna en moneda local usa la tasa de cambio actual.",
    "pkg.viewIn": "Ver precios en",
    "platform.web": "Web (roblox.com)",
    "platform.app": "App movil / consola",
    "th.robux": "Robux",
    "th.priceUsd": "Precio USD",
    "th.priceLocal": "Precio {code}",
    "th.per1000": "Costo por 1.000 R$",
    "th.perUsd": "R$ por USD",
    "badge.best": "Mejor valor",
    "pkg.subsTitle": "Suscripciones con Robux mensuales",
    "pkg.subsHint": "Roblox Premium dejo de venderse a nuevos usuarios el 30 de abril de 2026 (los suscriptores existentes lo conservan). Su reemplazo, Roblox Plus, ofrece bundles con Robux mensuales cuyos precios varian por region.",
    "th.sub": "Suscripcion",
    "th.monthly": "Robux al mes",
    "th.priceMonth": "Precio mensual",
    "th.subPer1000": "Costo por 1.000 R$",
    "badge.legacy": "Solo suscriptores existentes",
    "pkg.note": "Fuente: paquetes publicados por Roblox (actualizado {date}). Los montos pueden variar por region, promociones y bonos. Las gift cards canjeadas en la web entregan los montos de la columna web y suelen tener descuentos de temporada en tiendas.",
    "opt.title": "Calculadora de costo-beneficio",
    "opt.hint": "Indica cuantos Robux necesitas y calculamos la combinacion de paquetes mas barata, comparando web vs app/consola.",
    "opt.need": "Robux que necesitas",
    "opt.max": "Maximo 500.000 R$ para el calculo.",
    "opt.pack": "{n} × paquete de {r} R$",
    "badge.cheapest": "Mas barato",
    "st.total": "Costo total",
    "st.inLocal": "En {code}",
    "st.got": "Robux obtenidos",
    "st.surplus": "Sobrante",
    "st.per1000": "Costo por 1.000 R$",
    "st.savings": "Ahorro vs alternativa",
    "tax.title": "Calculadora de impuesto del marketplace (30%)",
    "tax.hint": "Roblox retiene el 30% de cada venta dentro de la plataforma (items, pases de juego, productos para desarrolladores). Solo comprar Robux directamente no paga esta comision.",
    "tax.grossTitle": "Vendo a un precio → ¿cuanto recibo?",
    "tax.grossLabel": "Precio de venta (Robux)",
    "tax.netTitle": "Quiero recibir X → ¿a cuanto vendo?",
    "tax.netLabel": "Robux que quieres recibir",
    "tax.receive": "Recibes",
    "tax.fee": "Comision de Roblox ({pct}%)",
    "tax.devexEq": "Equivalente DevEx de lo recibido: {usd}",
    "tax.sellAt": "Debes vender a",
    "tax.youGet": "recibes",
    "tax.roundNote": "El precio se redondea hacia arriba para garantizar el minimo deseado.",
    "tax.tableTitle": "Tabla rapida de precios comunes",
    "th.salePrice": "Precio de venta",
    "th.feeCol": "Comision (30%)",
    "th.youReceive": "Recibes",
    "th.devexUsd": "Valor DevEx",
    "dx.title": "DevEx — cambia Robux por dinero real",
    "dx.hint": "El programa Developer Exchange permite a creadores elegibles cambiar Robux ganados por dinero real a una tasa de US$0.0035 por Robux (100.000 R$ = US$350). Minimo para retirar: 30.000 R$ ganados. Solo aplica a Robux ganados (ventas, pases, etc.), no comprados.",
    "dx.toUsdTitle": "Robux → dinero",
    "dx.robuxLabel": "Robux ganados",
    "dx.toRobuxTitle": "Dinero → Robux necesarios",
    "dx.usdLabel": "Monto deseado (USD)",
    "dx.youGet": "Recibes",
    "dx.inLocal": "En {code}: {amount}",
    "dx.belowMin": "Bajo el minimo de retiro ({min} R$): te faltan {missing} R$.",
    "dx.needRobux": "Necesitas",
    "dx.needNote": "Robux ganados dentro de Roblox (a tasa DevEx).",
    "dx.pipeTitle": "Pipeline de una venta: del precio al bolsillo",
    "dx.pipeHint": "Sigue el recorrido completo de una venta: precio del item → impuesto del 30% → Robux netos → retiro DevEx → tu moneda.",
    "dx.saleLabel": "Precio de venta del item (Robux)",
    "pipe.sale": "Precio de venta",
    "pipe.fee": "Impuesto 30%",
    "pipe.net": "Robux netos",
    "pipe.usd": "DevEx (USD)",
    "pipe.local": "En {code}",
    "dx.note": "Requisitos DevEx: cuenta verificada, 13+ años, cumplir las normas de la comunidad y los terminos del programa. La tasa y el minimo pueden cambiar; verifica en create.roblox.com.",
    "footer": "Proyecto no oficial, sin afiliacion con Roblox Corporation. Tasas de cambio: <a href=\"https://www.exchangerate-api.com\" target=\"_blank\" rel=\"noopener\">ExchangeRate-API</a> (actualizadas diariamente). Datos de productos y politicas revisados: {date}.",
    "ads.label": "Publicidad",
    "guides.title": "Guías y artículos",
    "guides.all": "Todas las guías",
    "footer.privacy": "Política de privacidad"
  },
  en: {
    locale: "en-US",
    "status.loading": "Loading rates...",
    "status.live": "Live rates · {when}",
    "status.offline": "Offline: using reference rates",
    "tab.converter": "Converter",
    "tab.packages": "Prices & packages",
    "tab.optimizer": "Best value",
    "tab.tax": "30% tax",
    "tab.devex": "DevEx",
    "conv.title": "Robux ⇄ Currency converter",
    "conv.hint": "Type in either field and the other updates instantly.",
    "conv.currency": "Currency",
    "conv.basis": "Reference rate",
    "basis.web": "Best web package (buying Robux)",
    "basis.app": "Best app/console package (buying Robux)",
    "basis.devex": "DevEx — developer cash-out (US$0.0035 / R$)",
    "note.web": "best package available on the Roblox website",
    "note.app": "best package available on app/console",
    "note.devex": "DevEx cash-out rate for developers",
    "conv.note": "Rate used: <strong>{rate} per 1,000 R$</strong> ({label}). Robux cannot be redeemed for money directly except through DevEx.",
    "conv.allCurrencies": "Value in every currency",
    "th.currency": "Currency",
    "th.value": "Value",
    "th.rate1000": "Rate (per 1,000 R$)",
    "pkg.title": "Official Robux prices",
    "pkg.hint": "Buying on the Roblox website gives more Robux than mobile app or console at the same price. Base prices are in USD; the local-currency column uses the current exchange rate.",
    "pkg.viewIn": "Show prices in",
    "platform.web": "Web (roblox.com)",
    "platform.app": "Mobile app / console",
    "th.robux": "Robux",
    "th.priceUsd": "USD price",
    "th.priceLocal": "{code} price",
    "th.per1000": "Cost per 1,000 R$",
    "th.perUsd": "R$ per USD",
    "badge.best": "Best value",
    "pkg.subsTitle": "Subscriptions with monthly Robux",
    "pkg.subsHint": "Roblox Premium stopped selling to new users on April 30, 2026 (existing subscribers keep it). Its replacement, Roblox Plus, offers bundles with monthly Robux whose prices vary by region.",
    "th.sub": "Subscription",
    "th.monthly": "Robux / month",
    "th.priceMonth": "Monthly price",
    "th.subPer1000": "Cost per 1,000 R$",
    "badge.legacy": "Existing subscribers only",
    "pkg.note": "Source: packages published by Roblox (updated {date}). Amounts may vary by region, promotions and bonuses. Gift cards redeemed on the website grant the web-column amounts and often go on sale at retailers.",
    "opt.title": "Best-value calculator",
    "opt.hint": "Tell us how many Robux you need and we compute the cheapest package combination, comparing web vs app/console.",
    "opt.need": "Robux you need",
    "opt.max": "Maximum 500,000 R$ for this calculation.",
    "opt.pack": "{n} × {r} R$ package",
    "badge.cheapest": "Cheapest",
    "st.total": "Total cost",
    "st.inLocal": "In {code}",
    "st.got": "Robux obtained",
    "st.surplus": "Surplus",
    "st.per1000": "Cost per 1,000 R$",
    "st.savings": "Savings vs alternative",
    "tax.title": "Marketplace tax calculator (30%)",
    "tax.hint": "Roblox keeps 30% of every sale inside the platform (items, game passes, developer products). Only buying Robux directly is exempt from this fee.",
    "tax.grossTitle": "I sell at a price → how much do I get?",
    "tax.grossLabel": "Sale price (Robux)",
    "tax.netTitle": "I want to receive X → what price do I set?",
    "tax.netLabel": "Robux you want to receive",
    "tax.receive": "You receive",
    "tax.fee": "Roblox fee ({pct}%)",
    "tax.devexEq": "DevEx value of what you receive: {usd}",
    "tax.sellAt": "You must sell at",
    "tax.youGet": "you receive",
    "tax.roundNote": "The price is rounded up to guarantee the desired minimum.",
    "tax.tableTitle": "Quick table for common prices",
    "th.salePrice": "Sale price",
    "th.feeCol": "Fee (30%)",
    "th.youReceive": "You receive",
    "th.devexUsd": "DevEx value",
    "dx.title": "DevEx — exchange Robux for real money",
    "dx.hint": "The Developer Exchange program lets eligible creators exchange earned Robux for real money at US$0.0035 per Robux (100,000 R$ = US$350). Minimum cash-out: 30,000 earned R$. Only earned Robux qualify (sales, passes, etc.), not purchased ones.",
    "dx.toUsdTitle": "Robux → money",
    "dx.robuxLabel": "Earned Robux",
    "dx.toRobuxTitle": "Money → Robux needed",
    "dx.usdLabel": "Desired amount (USD)",
    "dx.youGet": "You receive",
    "dx.inLocal": "In {code}: {amount}",
    "dx.belowMin": "Below the cash-out minimum ({min} R$): you are {missing} R$ short.",
    "dx.needRobux": "You need",
    "dx.needNote": "Robux earned inside Roblox (at the DevEx rate).",
    "dx.pipeTitle": "Sale pipeline: from price to pocket",
    "dx.pipeHint": "Follow a sale end to end: item price → 30% tax → net Robux → DevEx cash-out → your currency.",
    "dx.saleLabel": "Item sale price (Robux)",
    "pipe.sale": "Sale price",
    "pipe.fee": "30% tax",
    "pipe.net": "Net Robux",
    "pipe.usd": "DevEx (USD)",
    "pipe.local": "In {code}",
    "dx.note": "DevEx requirements: verified account, 13+, good standing with community rules and the program terms. Rate and minimum can change; check create.roblox.com.",
    "footer": "Owned and maintained by Krateroi. Unofficial project, not affiliated with Roblox Corporation. Exchange rates: <a href=\"https://www.exchangerate-api.com\" target=\"_blank\" rel=\"noopener\">ExchangeRate-API</a> (updated daily). Product and policy data reviewed: {date}.",
    "ads.label": "Advertisement",
    "guides.title": "Guides & articles",
    "guides.all": "All guides",
    "footer.privacy": "Privacy policy"
  },
  pt: {
    locale: "pt-BR",
    "status.loading": "Carregando taxas...",
    "status.live": "Taxas ao vivo · {when}",
    "status.offline": "Sem conexao: usando taxas de referencia",
    "tab.converter": "Conversor",
    "tab.packages": "Precos e pacotes",
    "tab.optimizer": "Custo-beneficio",
    "tab.tax": "Imposto 30%",
    "tab.devex": "DevEx",
    "conv.title": "Conversor Robux ⇄ Moeda",
    "conv.hint": "Digite em qualquer um dos campos e o outro atualiza na hora.",
    "conv.currency": "Moeda",
    "conv.basis": "Taxa de referencia",
    "basis.web": "Melhor pacote web (comprar Robux)",
    "basis.app": "Melhor pacote app/console (comprar Robux)",
    "basis.devex": "DevEx — saque para desenvolvedores (US$0.0035 / R$)",
    "note.web": "melhor pacote disponivel no site do Roblox",
    "note.app": "melhor pacote disponivel em app/console",
    "note.devex": "taxa de saque DevEx para desenvolvedores",
    "conv.note": "Taxa usada: <strong>{rate} por 1.000 R$</strong> ({label}). Robux nao podem ser trocados por dinheiro diretamente, exceto via DevEx.",
    "conv.allCurrencies": "Equivalencia em todas as moedas",
    "th.currency": "Moeda",
    "th.value": "Valor",
    "th.rate1000": "Taxa (por 1.000 R$)",
    "pkg.title": "Precos oficiais de Robux",
    "pkg.hint": "Comprar pelo site do Roblox entrega mais Robux do que pelo app ou console pelo mesmo preco. Os precos base estao em USD; a coluna em moeda local usa o cambio atual.",
    "pkg.viewIn": "Ver precos em",
    "platform.web": "Web (roblox.com)",
    "platform.app": "App movel / console",
    "th.robux": "Robux",
    "th.priceUsd": "Preco USD",
    "th.priceLocal": "Preco {code}",
    "th.per1000": "Custo por 1.000 R$",
    "th.perUsd": "R$ por USD",
    "badge.best": "Melhor valor",
    "pkg.subsTitle": "Assinaturas com Robux mensais",
    "pkg.subsHint": "O Roblox Premium parou de ser vendido a novos usuarios em 30 de abril de 2026 (assinantes existentes mantem). Seu substituto, o Roblox Plus, oferece bundles com Robux mensais cujos precos variam por regiao.",
    "th.sub": "Assinatura",
    "th.monthly": "Robux / mes",
    "th.priceMonth": "Preco mensal",
    "th.subPer1000": "Custo por 1.000 R$",
    "badge.legacy": "Apenas assinantes existentes",
    "pkg.note": "Fonte: pacotes publicados pela Roblox (atualizado {date}). Os valores podem variar por regiao, promocoes e bonus. Gift cards resgatados no site entregam os valores da coluna web e costumam ter descontos no varejo.",
    "opt.title": "Calculadora de custo-beneficio",
    "opt.hint": "Diga quantos Robux voce precisa e calculamos a combinacao de pacotes mais barata, comparando web vs app/console.",
    "opt.need": "Robux que voce precisa",
    "opt.max": "Maximo de 500.000 R$ para o calculo.",
    "opt.pack": "{n} × pacote de {r} R$",
    "badge.cheapest": "Mais barato",
    "st.total": "Custo total",
    "st.inLocal": "Em {code}",
    "st.got": "Robux obtidos",
    "st.surplus": "Excedente",
    "st.per1000": "Custo por 1.000 R$",
    "st.savings": "Economia vs alternativa",
    "tax.title": "Calculadora do imposto do marketplace (30%)",
    "tax.hint": "A Roblox retem 30% de cada venda dentro da plataforma (itens, passes de jogo, produtos de desenvolvedor). Apenas comprar Robux diretamente nao paga essa taxa.",
    "tax.grossTitle": "Vendo a um preco → quanto recebo?",
    "tax.grossLabel": "Preco de venda (Robux)",
    "tax.netTitle": "Quero receber X → por quanto vendo?",
    "tax.netLabel": "Robux que voce quer receber",
    "tax.receive": "Voce recebe",
    "tax.fee": "Taxa da Roblox ({pct}%)",
    "tax.devexEq": "Equivalente DevEx do que recebe: {usd}",
    "tax.sellAt": "Voce deve vender a",
    "tax.youGet": "voce recebe",
    "tax.roundNote": "O preco e arredondado para cima para garantir o minimo desejado.",
    "tax.tableTitle": "Tabela rapida de precos comuns",
    "th.salePrice": "Preco de venda",
    "th.feeCol": "Taxa (30%)",
    "th.youReceive": "Voce recebe",
    "th.devexUsd": "Valor DevEx",
    "dx.title": "DevEx — troque Robux por dinheiro real",
    "dx.hint": "O programa Developer Exchange permite que criadores elegiveis troquem Robux ganhos por dinheiro real a US$0.0035 por Robux (100.000 R$ = US$350). Minimo para saque: 30.000 R$ ganhos. Apenas Robux ganhos contam (vendas, passes, etc.), nao comprados.",
    "dx.toUsdTitle": "Robux → dinheiro",
    "dx.robuxLabel": "Robux ganhos",
    "dx.toRobuxTitle": "Dinheiro → Robux necessarios",
    "dx.usdLabel": "Valor desejado (USD)",
    "dx.youGet": "Voce recebe",
    "dx.inLocal": "Em {code}: {amount}",
    "dx.belowMin": "Abaixo do minimo de saque ({min} R$): faltam {missing} R$.",
    "dx.needRobux": "Voce precisa de",
    "dx.needNote": "Robux ganhos dentro do Roblox (na taxa DevEx).",
    "dx.pipeTitle": "Pipeline de uma venda: do preco ao bolso",
    "dx.pipeHint": "Acompanhe a venda de ponta a ponta: preco do item → imposto de 30% → Robux liquidos → saque DevEx → sua moeda.",
    "dx.saleLabel": "Preco de venda do item (Robux)",
    "pipe.sale": "Preco de venda",
    "pipe.fee": "Imposto 30%",
    "pipe.net": "Robux liquidos",
    "pipe.usd": "DevEx (USD)",
    "pipe.local": "Em {code}",
    "dx.note": "Requisitos DevEx: conta verificada, 13+, boa reputacao com as regras da comunidade e os termos do programa. Taxa e minimo podem mudar; confira em create.roblox.com.",
    "footer": "Projeto nao oficial, sem afiliacao com a Roblox Corporation. Taxas de cambio: <a href=\"https://www.exchangerate-api.com\" target=\"_blank\" rel=\"noopener\">ExchangeRate-API</a> (atualizadas diariamente). Dados de produtos e politicas revisados: {date}.",
    "ads.label": "Publicidade",
    "guides.title": "Guias e artigos",
    "guides.all": "Todas as guias",
    "footer.privacy": "Política de privacidade"
  }
};

const API_URL = "https://open.er-api.com/v6/latest/USD";
const CACHE_KEY = "robuxconverter_rates";
const LANG_KEY = "robuxconverter_lang";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

let ratesResult = {
  rates: Object.assign({}, FALLBACK_RATES),
  live: false,
  updated: "",
  fetchedAt: 0,
  stale: true
};
let lang = "en";

function $(sel) {
  const el = document.querySelector(sel);
  if (!el) throw new Error("No existe " + sel);
  return el;
}

function t(key, params) {
  let str = (I18N[lang] && I18N[lang][key]) || I18N.es[key] || key;
  if (params) {
    for (const k of Object.keys(params)) {
      str = str.split("{" + k + "}").join(String(params[k]));
    }
  }
  return str;
}

function locale() {
  return I18N[lang].locale;
}

function currencyName(code) {
  try {
    const dn = new Intl.DisplayNames([locale()], { type: "currency" });
    const name = dn.of(code);
    return name && name !== code ? name : code;
  } catch (e) {
    return code;
  }
}

function safeStorageGet(key) {
  try { return localStorage.getItem(key); } catch (e) { return null; }
}

function safeStorageSet(key, value) {
  try { localStorage.setItem(key, value); } catch (e) {}
}

async function loadRates() {
  const raw = safeStorageGet(CACHE_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (
        Date.now() - parsed.cachedAt <= CACHE_TTL_MS &&
        parsed.rates &&
        parsed.rates.ZAR != null
      ) {
        return {
          rates: parsed.rates,
          live: true,
          updated: parsed.updated,
          fetchedAt: parsed.cachedAt,
          stale: false
        };
      }
    } catch (e) {}
  }

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    if (data.result !== "success" || !data.rates) throw new Error("Respuesta invalida");
    const rates = {};
    for (const c of CURRENCIES) {
      rates[c.code] = data.rates[c.code] != null ? data.rates[c.code] : FALLBACK_RATES[c.code];
    }
    const fetchedAt = Date.now();
    const result = {
      rates,
      live: true,
      updated: new Date(fetchedAt).toISOString(),
      fetchedAt,
      stale: false
    };
    safeStorageSet(CACHE_KEY, JSON.stringify({ rates, updated: result.updated, cachedAt: fetchedAt }));
    return result;
  } catch (e) {
    return {
      rates: Object.assign({}, FALLBACK_RATES),
      live: false,
      updated: "",
      fetchedAt: 0,
      stale: true
    };
  }
}

function formatCurrency(amount, code) {
  const info = CURRENCIES.find((c) => c.code === code);
  const decimals = info ? info.decimals : 2;
  return new Intl.NumberFormat(locale(), {
    style: "currency",
    currency: code,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(amount);
}

function formatRobux(amount) {
  return new Intl.NumberFormat(locale(), { maximumFractionDigits: 0 }).format(Math.round(amount));
}

function ratePerThousand(pkg) {
  return (pkg.priceUSD / pkg.robux) * 1000;
}

function bestUsdPerRobux(platformId) {
  const platform = PLATFORMS.find((p) => p.id === platformId) || PLATFORMS[0];
  return Math.min.apply(null, platform.packages.map((p) => p.priceUSD / p.robux));
}

function optimizePurchase(targetRobux, platformId) {
  const platform = PLATFORMS.find((p) => p.id === platformId);
  if (!platform || targetRobux <= 0) return null;

  const packages = platform.packages.slice().sort((a, b) => a.robux - b.robux);
  const maxPack = packages[packages.length - 1].robux;
  const limit = targetRobux + maxPack;

  const INF = Number.POSITIVE_INFINITY;
  const cost = new Float64Array(limit + 1).fill(INF);
  const choice = new Int32Array(limit + 1).fill(-1);
  cost[0] = 0;

  for (let r = 1; r <= limit; r++) {
    for (let i = 0; i < packages.length; i++) {
      const prev = Math.max(0, r - packages[i].robux);
      const c = cost[prev] + packages[i].priceUSD;
      if (c < cost[r] - 1e-9) {
        cost[r] = c;
        choice[r] = i;
      }
    }
  }

  let best = targetRobux;
  for (let r = targetRobux; r <= limit; r++) {
    if (cost[r] < cost[best] - 1e-9) best = r;
  }

  const counts = new Map();
  let r = best;
  while (r > 0 && choice[r] >= 0) {
    const i = choice[r];
    counts.set(i, (counts.get(i) || 0) + 1);
    r = Math.max(0, r - packages[i].robux);
  }

  let totalUSD = 0;
  let totalRobux = 0;
  const items = [];
  const sorted = Array.from(counts.entries()).sort((a, b) => b[0] - a[0]);
  for (const [i, count] of sorted) {
    items.push({ pkg: packages[i], count });
    totalUSD += packages[i].priceUSD * count;
    totalRobux += packages[i].robux * count;
  }

  return {
    items,
    totalUSD: Math.round(totalUSD * 100) / 100,
    totalRobux,
    surplus: totalRobux - targetRobux,
    effectivePerThousand: (totalUSD / totalRobux) * 1000
  };
}

function comparePlatforms(targetRobux) {
  return PLATFORMS.map((p) => ({ platformId: p.id, plan: optimizePurchase(targetRobux, p.id) }))
    .filter((x) => x.plan !== null)
    .sort((a, b) => a.plan.totalUSD - b.plan.totalUSD);
}

function netFromGross(gross) {
  const fee = Math.ceil(gross * MARKETPLACE_TAX);
  return { gross, fee, net: gross - fee };
}

function grossForNet(net) {
  const gross = Math.ceil(net / (1 - MARKETPLACE_TAX));
  const fee = Math.ceil(gross * MARKETPLACE_TAX);
  return { gross, fee, net: gross - fee };
}

function usdPerRobux() {
  const basis = $("#basis-select").value;
  if (basis === "devex") return DEVEX_USD_PER_ROBUX;
  if (basis === "best-app") return bestUsdPerRobux("app");
  return bestUsdPerRobux("web");
}

function toCurrency(usd, code) {
  return usd * (ratesResult.rates[code] != null ? ratesResult.rates[code] : 1);
}

function fromCurrency(amount, code) {
  return amount / (ratesResult.rates[code] != null ? ratesResult.rates[code] : 1);
}

function activateTab(name) {
  const tab = document.querySelector('.tab[data-tab="' + name + '"]');
  const panel = document.getElementById("panel-" + name);
  if (!tab || !panel) return;
  document.querySelectorAll(".tab").forEach((tb) => tb.classList.remove("active"));
  document.querySelectorAll(".panel").forEach((p) => p.classList.remove("active"));
  tab.classList.add("active");
  panel.classList.add("active");
}

function setupTabs() {
  const validTabs = new Set(["converter", "packages", "optimizer", "tax", "devex"]);
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      activateTab(tab.dataset.tab);
      history.replaceState(null, "", "#" + tab.dataset.tab);
    });
  });
  const fromHash = location.hash.replace("#", "");
  if (validTabs.has(fromHash)) activateTab(fromHash);
  window.addEventListener("hashchange", () => {
    const name = location.hash.replace("#", "");
    if (validTabs.has(name)) activateTab(name);
  });
}

function populateCurrencySelects() {
  for (const id of ["#currency-select", "#pkg-currency-select"]) {
    const select = $(id);
    const prev = select.value;
    select.innerHTML = CURRENCIES.map(
      (c) => '<option value="' + c.code + '">' + c.code + " — " + currencyName(c.code) + "</option>"
    ).join("");
    select.value = CURRENCIES.some((c) => c.code === prev) ? prev : "CLP";
  }
}

function renderStatus() {
  const status = $("#rate-status");
  status.classList.remove("live", "offline");
  if (ratesResult.live) {
    const when = new Date(ratesResult.updated).toLocaleString(locale());
    status.textContent = t("status.live", { when });
    status.classList.add("live");
  } else if (ratesResult.loaded || ratesResult.stale) {
    status.textContent = t("status.offline");
    status.classList.add("offline");
  } else {
    status.textContent = t("status.loading");
  }
}

function scheduleDailyRateRefresh() {
  const now = new Date();
  const nextUtcDay = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1,
    0,
    5,
    0
  ));
  const delay = Math.max(nextUtcDay.getTime() - now.getTime(), 60 * 1000);
  window.setTimeout(async () => {
    ratesResult = await loadRates();
    ratesResult.loaded = true;
    renderStatus();
    refreshDynamic();
    scheduleDailyRateRefresh();
  }, delay);
}

function renderConverterNote() {
  const per1000 = usdPerRobux() * 1000;
  const basis = $("#basis-select").value;
  const labelKey = basis === "devex" ? "note.devex" : basis === "best-app" ? "note.app" : "note.web";
  $("#converter-note").innerHTML = t("conv.note", {
    rate: formatCurrency(per1000, "USD"),
    label: t(labelKey)
  });
}

function renderAllCurrencies() {
  const robux = parseFloat($("#robux-input").value) || 0;
  const usd = robux * usdPerRobux();
  const usdPer1000 = usdPerRobux() * 1000;
  $("#all-currencies-table tbody").innerHTML = CURRENCIES.map((c) => {
    const value = toCurrency(usd, c.code);
    const rate = toCurrency(usdPer1000, c.code);
    return (
      "<tr><td>" + c.code + " — " + currencyName(c.code) + "</td>" +
      "<td><strong>" + formatCurrency(value, c.code) + "</strong></td>" +
      "<td>" + formatCurrency(rate, c.code) + "</td></tr>"
    );
  }).join("");
}

function setupConverter() {
  const robuxInput = $("#robux-input");
  const moneyInput = $("#money-input");
  const currencySelect = $("#currency-select");

  const fromRobux = () => {
    const robux = parseFloat(robuxInput.value);
    if (!isFinite(robux)) {
      moneyInput.value = "";
    } else {
      const usd = robux * usdPerRobux();
      moneyInput.value = toCurrency(usd, currencySelect.value).toFixed(2);
    }
    renderAllCurrencies();
    renderConverterNote();
  };

  const fromMoney = () => {
    const amount = parseFloat(moneyInput.value);
    if (!isFinite(amount)) {
      robuxInput.value = "";
    } else {
      const usd = fromCurrency(amount, currencySelect.value);
      robuxInput.value = String(Math.round(usd / usdPerRobux()));
    }
    renderAllCurrencies();
    renderConverterNote();
  };

  robuxInput.addEventListener("input", fromRobux);
  moneyInput.addEventListener("input", fromMoney);
  currencySelect.addEventListener("change", fromRobux);
  $("#basis-select").addEventListener("change", fromRobux);

  robuxInput.value = "1000";
  fromRobux();
}

function renderPackages() {
  const code = $("#pkg-currency-select").value;
  $("#packages-tables").innerHTML = PLATFORMS.map((platform) => {
    const bestRate = Math.min.apply(null, platform.packages.map(ratePerThousand));
    const rows = platform.packages
      .map((pkg) => {
        const per1000 = ratePerThousand(pkg);
        const isBest = Math.abs(per1000 - bestRate) < 1e-9;
        return (
          '<tr class="' + (isBest ? "best" : "") + '">' +
          "<td><strong>" + formatRobux(pkg.robux) + " R$</strong>" +
          (isBest ? '<span class="badge">' + t("badge.best") + "</span>" : "") + "</td>" +
          "<td>" + formatCurrency(pkg.priceUSD, "USD") + "</td>" +
          "<td>" + formatCurrency(toCurrency(pkg.priceUSD, code), code) + "</td>" +
          "<td>" + formatCurrency(toCurrency(per1000, code), code) + "</td>" +
          "<td>" + formatRobux(pkg.robux / pkg.priceUSD) + " R$</td></tr>"
        );
      })
      .join("");
    return (
      '<div class="pkg-table-block"><h3>' + t(platform.labelKey) + "</h3>" +
      '<div class="table-scroll"><table><thead>' +
      "<tr><th>" + t("th.robux") + "</th><th>" + t("th.priceUsd") + "</th><th>" +
      t("th.priceLocal", { code }) + "</th><th>" + t("th.per1000") + "</th><th>" + t("th.perUsd") + "</th></tr>" +
      "</thead><tbody>" + rows + "</tbody></table></div></div>"
    );
  }).join("");

  const subRows = SUBSCRIPTIONS.map((s) => {
    const per1000 = (s.priceUSD / s.robuxMonth) * 1000;
    return (
      "<tr><td><strong>" + s.name + "</strong>" +
      (s.legacy ? '<span class="badge warn">' + t("badge.legacy") + "</span>" : "") + "</td>" +
      "<td>" + formatRobux(s.robuxMonth) + " R$</td>" +
      "<td>" + formatCurrency(s.priceUSD, "USD") + " · " + formatCurrency(toCurrency(s.priceUSD, code), code) + "</td>" +
      "<td>" + formatCurrency(toCurrency(per1000, code), code) + "</td></tr>"
    );
  }).join("");
  $("#subs-table").innerHTML =
    "<table><thead><tr><th>" + t("th.sub") + "</th><th>" + t("th.monthly") + "</th><th>" +
    t("th.priceMonth") + "</th><th>" + t("th.subPer1000") + "</th></tr></thead><tbody>" +
    subRows + "</tbody></table>";

  $("#pkg-note").innerHTML = t("pkg.note", { date: DATA_UPDATED });
}

function setupOptimizer() {
  const input = $("#target-robux");
  const render = () => {
    const target = parseInt(input.value, 10);
    const container = $("#optimizer-results");
    if (!isFinite(target) || target <= 0) {
      container.innerHTML = "";
      return;
    }
    if (target > 500000) {
      container.innerHTML = '<div class="note">' + t("opt.max") + "</div>";
      return;
    }
    const code = $("#currency-select").value;
    const results = comparePlatforms(target);
    container.innerHTML = results
      .map(({ platformId, plan }, idx) => {
        const platform = PLATFORMS.find((p) => p.id === platformId);
        const items = plan.items
          .map(
            (it) =>
              "<li><span>" + t("opt.pack", { n: it.count, r: formatRobux(it.pkg.robux) }) + "</span>" +
              "<span>" + formatCurrency(it.pkg.priceUSD * it.count, "USD") + "</span></li>"
          )
          .join("");
        const savings = idx === 0 && results.length > 1 ? results[1].plan.totalUSD - plan.totalUSD : 0;
        return (
          '<div class="plan-card ' + (idx === 0 ? "winner" : "") + '">' +
          "<h3>" + (platform ? t(platform.labelKey) : platformId) +
          (idx === 0 ? '<span class="badge">' + t("badge.cheapest") + "</span>" : "") + "</h3>" +
          '<ul class="plan-items">' + items + "</ul>" +
          '<div class="plan-summary">' +
          '<div class="stat"><div class="label">' + t("st.total") + '</div><div class="value accent">' + formatCurrency(plan.totalUSD, "USD") + "</div></div>" +
          '<div class="stat"><div class="label">' + t("st.inLocal", { code }) + '</div><div class="value">' + formatCurrency(toCurrency(plan.totalUSD, code), code) + "</div></div>" +
          '<div class="stat"><div class="label">' + t("st.got") + '</div><div class="value">' + formatRobux(plan.totalRobux) + " R$</div></div>" +
          '<div class="stat"><div class="label">' + t("st.surplus") + '</div><div class="value">' + formatRobux(plan.surplus) + " R$</div></div>" +
          '<div class="stat"><div class="label">' + t("st.per1000") + '</div><div class="value">' + formatCurrency(plan.effectivePerThousand, "USD") + "</div></div>" +
          (savings > 0.005
            ? '<div class="stat"><div class="label">' + t("st.savings") + '</div><div class="value accent">' + formatCurrency(savings, "USD") + "</div></div>"
            : "") +
          "</div></div>"
        );
      })
      .join("");
  };
  input.addEventListener("input", render);
  document.querySelectorAll("#preset-chips button").forEach((btn) => {
    btn.addEventListener("click", () => {
      input.value = btn.dataset.r || "";
      render();
    });
  });
  input.value = "6000";
  render();
}

function renderTaxTable() {
  const pct = Math.round(MARKETPLACE_TAX * 100);
  const rows = TAX_TABLE_PRICES.map((price) => {
    const b = netFromGross(price);
    return (
      "<tr><td><strong>" + formatRobux(price) + " R$</strong></td>" +
      '<td class="fee-cell">-' + formatRobux(b.fee) + " R$</td>" +
      "<td>" + formatRobux(b.net) + " R$</td>" +
      "<td>" + formatCurrency(b.net * DEVEX_USD_PER_ROBUX, "USD") + "</td></tr>"
    );
  }).join("");
  $("#tax-table").innerHTML =
    "<table><thead><tr><th>" + t("th.salePrice") + "</th><th>" + t("th.feeCol").split("{pct}").join(pct) +
    "</th><th>" + t("th.youReceive") + "</th><th>" + t("th.devexUsd") + "</th></tr></thead><tbody>" +
    rows + "</tbody></table>";
}

function setupTax() {
  const grossInput = $("#tax-gross");
  const netInput = $("#tax-net");
  const pct = Math.round(MARKETPLACE_TAX * 100);

  const renderGross = () => {
    const gross = parseInt(grossInput.value, 10);
    const out = $("#tax-gross-result");
    if (!isFinite(gross) || gross <= 0) {
      out.innerHTML = "";
      return;
    }
    const b = netFromGross(gross);
    out.innerHTML =
      t("tax.receive") + ' <span class="big">' + formatRobux(b.net) + " R$</span><br />" +
      t("tax.fee", { pct }) + ': <span class="fee">-' + formatRobux(b.fee) + " R$</span>" +
      '<div class="sub">' + t("tax.devexEq", { usd: formatCurrency(b.net * DEVEX_USD_PER_ROBUX, "USD") }) + "</div>";
  };

  const renderNet = () => {
    const net = parseInt(netInput.value, 10);
    const out = $("#tax-net-result");
    if (!isFinite(net) || net <= 0) {
      out.innerHTML = "";
      return;
    }
    const b = grossForNet(net);
    out.innerHTML =
      t("tax.sellAt") + ' <span class="big">' + formatRobux(b.gross) + " R$</span><br />" +
      t("tax.fee", { pct }) + ': <span class="fee">-' + formatRobux(b.fee) + " R$</span> · " +
      t("tax.youGet") + " " + formatRobux(b.net) + " R$" +
      '<div class="sub">' + t("tax.roundNote") + "</div>";
  };

  grossInput.addEventListener("input", renderGross);
  netInput.addEventListener("input", renderNet);
  grossInput.value = "100";
  netInput.value = "70";
  renderGross();
  renderNet();
}

function setupDevEx() {
  const robuxInput = $("#dx-robux");
  const usdInput = $("#dx-usd");
  const saleInput = $("#dx-sale");

  const renderRobux = () => {
    const robux = parseInt(robuxInput.value, 10);
    const out = $("#dx-robux-result");
    if (!isFinite(robux) || robux <= 0) {
      out.innerHTML = "";
      return;
    }
    const usd = robux * DEVEX_USD_PER_ROBUX;
    const code = $("#currency-select").value;
    let html =
      t("dx.youGet") + ' <span class="big">' + formatCurrency(usd, "USD") + "</span>" +
      '<div class="sub">' + t("dx.inLocal", { code, amount: formatCurrency(toCurrency(usd, code), code) }) + "</div>";
    if (robux < DEVEX_MIN_ROBUX) {
      html +=
        '<div class="sub warn-text">' +
        t("dx.belowMin", { min: formatRobux(DEVEX_MIN_ROBUX), missing: formatRobux(DEVEX_MIN_ROBUX - robux) }) +
        "</div>";
    }
    out.innerHTML = html;
  };

  const renderUsd = () => {
    const usd = parseFloat(usdInput.value);
    const out = $("#dx-usd-result");
    if (!isFinite(usd) || usd <= 0) {
      out.innerHTML = "";
      return;
    }
    const robux = Math.ceil(usd / DEVEX_USD_PER_ROBUX);
    out.innerHTML =
      t("dx.needRobux") + ' <span class="big">' + formatRobux(robux) + " R$</span>" +
      '<div class="sub">' + t("dx.needNote") + "</div>";
  };

  const renderPipeline = () => {
    const sale = parseInt(saleInput.value, 10);
    const container = $("#dx-pipeline");
    if (!isFinite(sale) || sale <= 0) {
      container.innerHTML = "";
      return;
    }
    const b = netFromGross(sale);
    const usd = b.net * DEVEX_USD_PER_ROBUX;
    const code = $("#currency-select").value;
    const steps = [
      { label: t("pipe.sale"), value: formatRobux(b.gross) + " R$", cls: "" },
      { label: t("pipe.fee"), value: "-" + formatRobux(b.fee) + " R$", cls: "bad" },
      { label: t("pipe.net"), value: formatRobux(b.net) + " R$", cls: "" },
      { label: t("pipe.usd"), value: formatCurrency(usd, "USD"), cls: "good" },
      { label: t("pipe.local", { code }), value: formatCurrency(toCurrency(usd, code), code), cls: "good" }
    ];
    container.innerHTML = steps
      .map(
        (s, i) =>
          (i > 0 ? '<div class="pipe-arrow">→</div>' : "") +
          '<div class="pipe-step ' + s.cls + '"><div class="label">' + s.label + '</div><div class="value">' + s.value + "</div></div>"
      )
      .join("");
  };

  robuxInput.addEventListener("input", renderRobux);
  usdInput.addEventListener("input", renderUsd);
  saleInput.addEventListener("input", renderPipeline);
  robuxInput.value = "30000";
  usdInput.value = "105";
  saleInput.value = "1000";
  renderRobux();
  renderUsd();
  renderPipeline();

  return { renderRobux, renderUsd, renderPipeline };
}

let devexRenderers = null;

function refreshDynamic() {
  populateCurrencySelects();
  $("#robux-input").dispatchEvent(new Event("input"));
  $("#target-robux").dispatchEvent(new Event("input"));
  $("#tax-gross").dispatchEvent(new Event("input"));
  $("#tax-net").dispatchEvent(new Event("input"));
  renderPackages();
  renderTaxTable();
  renderStatus();
  if (devexRenderers) {
    devexRenderers.renderRobux();
    devexRenderers.renderUsd();
    devexRenderers.renderPipeline();
  }
}

function applyLanguage(newLang) {
  lang = I18N[newLang] ? newLang : "en";
  safeStorageSet(LANG_KEY, lang);
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.innerHTML = t(el.dataset.i18n);
  });
  $("#footer-text").innerHTML = t("footer", { date: DATA_UPDATED });
  refreshDynamic();
}

async function init() {
  setupTabs();
  populateCurrencySelects();
  setupConverter();
  setupOptimizer();
  setupTax();
  devexRenderers = setupDevEx();
  renderPackages();
  renderTaxTable();

  $("#pkg-currency-select").addEventListener("change", renderPackages);
  $("#currency-select").addEventListener("change", () => {
    $("#target-robux").dispatchEvent(new Event("input"));
    if (devexRenderers) {
      devexRenderers.renderRobux();
      devexRenderers.renderPipeline();
    }
  });

  const savedLang = safeStorageGet(LANG_KEY);
  const browserLang = (navigator.language || "en").slice(0, 2).toLowerCase();
  applyLanguage(savedLang || (I18N[browserLang] ? browserLang : "en"));
  $("#lang-select").value = lang;
  $("#lang-select").addEventListener("change", (e) => applyLanguage(e.target.value));

  ratesResult = await loadRates();
  ratesResult.loaded = true;
  renderStatus();
  refreshDynamic();
  scheduleDailyRateRefresh();
}

init();
