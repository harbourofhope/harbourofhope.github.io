/**
 * ==========================================================
 * Harbour of Hope Website
 * Main JavaScript
 * ----------------------------------------------------------
 * Entry point for all global JavaScript.
 * ==========================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // Global initialization

  // Mobile nav toggle — opens/closes the .site-nav__menu dropdown
  // (styles for the open/closed states live in responsive.css).
  var navToggle = document.querySelector(".site-nav__toggle");
  var navMenu = document.querySelector(".site-nav__menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      var isOpen = navMenu.classList.toggle("site-nav__menu--open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      navToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
    });

    // Close the menu after picking a link, so it doesn't stay
    // open over the next page's content.
    navMenu.querySelectorAll(".site-nav__link").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("site-nav__menu--open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open navigation menu");
      });
    });
  }
});

/**
 * ==========================================================
 * Form submission config
 * ----------------------------------------------------------
 * Update these values only — every form on the site (Book
 * Appointment, Write to Esther, Chat on WhatsApp) reads from
 * here, so there's a single place to update for both Telegram
 * and Formspree.
 *
 * Telegram — how to get these:
 * 1. Message @BotFather on Telegram -> /newbot -> follow prompts
 *    -> copy the bot token it gives you.
 * 2. Send any message to your new bot.
 * 3. Visit https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates
 *    in a browser -> copy the "chat":{"id": ...} value.
 *
 * Formspree — how to get this:
 * 1. Sign up at formspree.io and create one form.
 * 2. Copy the endpoint URL it gives you (looks like
 *    https://formspree.io/f/xxxxxxxx).
 * All three forms on the site submit to this same endpoint, so
 * every submission (booking, email, WhatsApp) lands in one
 * Formspree inbox/dashboard.
 * ==========================================================
 */
window.HOH_NOTIFY_CONFIG = {
  telegramBotToken: "REPLACE_WITH_YOUR_TELEGRAM_BOT_TOKEN",
  telegramChatId: "REPLACE_WITH_YOUR_TELEGRAM_CHAT_ID",
  formspreeEndpoint: "https://formspree.io/f/xeeyqlan"
};

/**
 * Sends a plain-text message to the configured Telegram chat.
 * Best-effort: returns the fetch promise so callers can log
 * failures, but a failure here should never block the rest of
 * the form submission flow.
 */
window.sendTelegramNotification = function (text) {
  var cfg = window.HOH_NOTIFY_CONFIG;
  var url = "https://api.telegram.org/bot" + cfg.telegramBotToken + "/sendMessage";

  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: cfg.telegramChatId,
      text: text
    })
  });
};
