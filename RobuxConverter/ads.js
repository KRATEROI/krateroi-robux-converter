"use strict";

const ADS = {
  // Replace these values with the IDs from your approved AdSense account.
  enabled: false,
  client: "ca-pub-0000000000000000",
  slots: {
    left: "0000000000",
    right: "0000000000",
    content: "0000000000",
    anchor: "0000000000"
  }
};

function adConfigured() {
  return ADS.enabled && /^ca-pub-\d{16}$/.test(ADS.client);
}

function validSlot(slot) {
  return slot && !/^0+$/.test(slot);
}

function buildAdUnit(container, slot, format) {
  container.innerHTML = "";
  const ins = document.createElement("ins");
  ins.className = "adsbygoogle";
  ins.style.display = "block";
  ins.setAttribute("data-ad-client", ADS.client);
  ins.setAttribute("data-ad-slot", slot);
  if (format === "vertical") {
    ins.style.width = "160px";
    ins.style.height = "600px";
  } else {
    ins.setAttribute("data-ad-format", format === "anchor" ? "horizontal" : "auto");
    ins.setAttribute("data-full-width-responsive", "true");
  }
  container.appendChild(ins);
  (window.adsbygoogle = window.adsbygoogle || []).push({});
}

function setupAnchorClose() {
  const anchor = document.querySelector(".ad-anchor");
  if (!anchor) return;
  const close = anchor.querySelector(".ad-anchor-close");
  if (close) {
    close.addEventListener("click", () => anchor.remove());
  }
}

function initAds() {
  const units = document.querySelectorAll(".ad-unit");
  setupAnchorClose();

  if (!adConfigured()) {
    units.forEach((u) => u.classList.add("ad-placeholder"));
    return;
  }

  document.body.classList.add("ads-live");
  const script = document.createElement("script");
  script.async = true;
  script.src =
    "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" +
    ADS.client;
  script.crossOrigin = "anonymous";
  document.head.appendChild(script);

  units.forEach((u) => {
    const slot = ADS.slots[u.dataset.adSide];
    const format = u.dataset.adFormat || "responsive";
    if (!validSlot(slot)) {
      u.classList.add("ad-placeholder");
      return;
    }
    buildAdUnit(u, slot, format);
  });
}

initAds();
