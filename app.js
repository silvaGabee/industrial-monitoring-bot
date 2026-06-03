const STORAGE_THEME = "tagocontrol-theme";
const STORAGE_LANG = "tagocontrol-lang";

const translations = {
  en: {
    pageTitle: "Privacy Policy | TagoControl Bot",
    brandSubtitle: "Privacy Policy",
    telegram: "TELEGRAM",
    themeToLight: "Switch to light theme",
    themeToDark: "Switch to dark theme",
    langEn: "English",
    langPt: "Portuguese (Brazil)",
    eyebrow: "Industrial Data Protection",
    heroTitle: "Privacy Policy",
    lead:
      "TagoControl Bot processes operational information from connected industrial equipment to provide monitoring, dashboard visualization, alerts and remote control.",
    meta1: "CLP Integration",
    meta2: "Node-RED Automation",
    meta3: "TagoIO Dashboard",
    meta4: "Telegram Commands",
    flowTitle: "Processing Flow",
    flowSubtitle: "How operational data is handled",
    flow1Title: "Industrial Equipment",
    flow1Desc: "Equipment status, counters and alarms are received from connected devices.",
    flow2Title: "Node-RED Processing",
    flow2Desc: "Data is processed for automation, routing, commands and notifications.",
    flow3Title: "TagoIO and Telegram",
    flow3Desc: "Information is displayed in dashboards and sent to authorized Telegram users.",
    policyDetails: "Policy Details",
    updated: "Last updated: June 2026",
    card1Title: "Overview",
    card1Text:
      "This bot collects and processes operational data from connected industrial equipment for monitoring and control purposes.",
    card2Title: "Data We Collect",
    card2Items: [
      "Equipment status",
      "Production counters",
      "Alarms and operational events",
      "User commands sent through Telegram",
    ],
    card3Title: "How We Use Data",
    card3Text:
      "Collected information is used exclusively to provide monitoring, control, notification and operational visibility features.",
    card4Title: "Data Sharing",
    card4Text:
      "No personal data is sold, rented or shared with third parties for commercial purposes.",
    card5Title: "User Responsibilities",
    card5Text:
      "Users are responsible for ensuring authorized access to the bot and connected industrial equipment.",
    card6Title: "Operational Alerts",
    card6Text:
      "The bot may send notifications related to equipment status, production events, failures and alarms.",
    contactTitle: "Contact",
    contactText:
      "For questions regarding privacy and data handling, please contact the bot administrator.",
    statusBadge: "AUTHORIZED USE ONLY",
    footer: "© 2026 TagoControl Bot. All rights reserved.",
  },
  pt: {
    pageTitle: "Política de Privacidade | TagoControl Bot",
    brandSubtitle: "Política de Privacidade",
    telegram: "TELEGRAM",
    themeToLight: "Ativar tema claro",
    themeToDark: "Ativar tema escuro",
    langEn: "Inglês",
    langPt: "Português (Brasil)",
    eyebrow: "Proteção de Dados Industriais",
    heroTitle: "Política de Privacidade",
    lead:
      "O TagoControl Bot processa informações operacionais de equipamentos industriais conectados para monitoramento, visualização em dashboard, alertas e controle remoto.",
    meta1: "Integração CLP",
    meta2: "Automação Node-RED",
    meta3: "Dashboard TagoIO",
    meta4: "Comandos Telegram",
    flowTitle: "Fluxo de Processamento",
    flowSubtitle: "Como os dados operacionais são tratados",
    flow1Title: "Equipamento Industrial",
    flow1Desc: "Status, contadores e alarmes são recebidos dos dispositivos conectados.",
    flow2Title: "Processamento Node-RED",
    flow2Desc: "Os dados são processados para automação, roteamento, comandos e notificações.",
    flow3Title: "TagoIO e Telegram",
    flow3Desc: "As informações são exibidas em dashboards e enviadas a usuários autorizados no Telegram.",
    policyDetails: "Detalhes da Política",
    updated: "Última atualização: junho de 2026",
    card1Title: "Visão Geral",
    card1Text:
      "Este bot coleta e processa dados operacionais de equipamentos industriais conectados para fins de monitoramento e controle.",
    card2Title: "Dados Coletados",
    card2Items: [
      "Status dos equipamentos",
      "Contadores de produção",
      "Alarmes e eventos operacionais",
      "Comandos enviados via Telegram",
    ],
    card3Title: "Uso dos Dados",
    card3Text:
      "As informações coletadas são usadas exclusivamente para monitoramento, controle, notificações e visibilidade operacional.",
    card4Title: "Compartilhamento",
    card4Text:
      "Nenhum dado pessoal é vendido, alugado ou compartilhado com terceiros para fins comerciais.",
    card5Title: "Responsabilidades",
    card5Text:
      "Os usuários são responsáveis por garantir acesso autorizado ao bot e aos equipamentos industriais conectados.",
    card6Title: "Alertas Operacionais",
    card6Text:
      "O bot pode enviar notificações sobre status de equipamentos, eventos de produção, falhas e alarmes.",
    contactTitle: "Contato",
    contactText:
      "Para dúvidas sobre privacidade e tratamento de dados, entre em contato com o administrador do bot.",
    statusBadge: "Somente para uso autorizado",
    footer: "© 2026 TagoControl Bot. Todos os direitos reservados.",
  },
};

let currentLang = localStorage.getItem(STORAGE_LANG) || "pt";
let currentTheme = localStorage.getItem(STORAGE_THEME) || "dark";

function t(key) {
  return translations[currentLang][key] ?? translations.en[key] ?? key;
}

function applyTranslations() {
  const dict = translations[currentLang];

  document.documentElement.lang = currentLang === "pt" ? "pt-BR" : "en";
  document.title = dict.pageTitle;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) {
      el.textContent = dict[key];
    }
  });

  const collectList = document.querySelector("[data-i18n-list]");
  if (collectList && dict.card2Items) {
    collectList.innerHTML = dict.card2Items.map((item) => `<li>${item}</li>`).join("");
  }

  updateLangButtons();
  updateThemeButton();
}

function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(STORAGE_THEME, theme);
  updateThemeButton();
}

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem(STORAGE_LANG, lang);
  applyTranslations();
}

function updateLangButtons() {
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    const active = btn.getAttribute("data-lang") === currentLang;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", String(active));
  });
}

function updateThemeButton() {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;

  const isDark = currentTheme === "dark";
  btn.setAttribute("aria-label", isDark ? t("themeToLight") : t("themeToDark"));
}

document.addEventListener("DOMContentLoaded", () => {
  applyTheme(currentTheme);
  applyTranslations();

  document.getElementById("theme-toggle")?.addEventListener("click", () => {
    applyTheme(currentTheme === "dark" ? "light" : "dark");
  });

  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => {
      applyLang(btn.getAttribute("data-lang"));
    });
  });
});
