/* 91112.com — core interactions. No frameworks, no trackers beyond Google AdSense. */
(function () {
  "use strict";
  var S = window.SITE || {};
  var ROOT = (document.body && document.body.getAttribute("data-root")) || "";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem("91112:" + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem("91112:" + k, JSON.stringify(v)); } catch (e) {} }
  };
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function toast(msg) {
    var t = $(".toast"); if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("show"); clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove("show"); }, 3200);
  }
  window.toast91112 = toast;

  /* ---------- Theme + menu ---------- */
  var savedTheme = store.get("theme", null);
  if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);
  $$(".theme-btn").forEach(function (b) {
    b.addEventListener("click", function () {
      var cur = document.documentElement.getAttribute("data-theme");
      var dark = cur ? cur === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
      var next = dark ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next); store.set("theme", next);
    });
  });
  var mb = $(".menu-btn"), nav = $(".nav");
  if (mb && nav) mb.addEventListener("click", function () { var o = nav.classList.toggle("open"); mb.setAttribute("aria-expanded", o); });

  /* ---------- Consent banner ---------- */
  var consent = $(".consent");
  if (consent && !store.get("consent", null)) consent.classList.add("show");
  $$("[data-consent]").forEach(function (b) {
    b.addEventListener("click", function () {
      var v = b.getAttribute("data-consent"); store.set("consent", v);
      consent.classList.remove("show");
      if (v === "essential") { (window.adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 1; }
    });
  });
  if (store.get("consent", null) === "essential") { (window.adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 1; }

  /* ---------- Country detection ---------- */
  var C = window.COUNTRIES || [];
  var byIso = {}; C.forEach(function (c) { byIso[c.iso] = c; });
  var TZ = {
    "Asia/Kolkata": "IN", "Asia/Calcutta": "IN", "America/Toronto": "CA", "America/Vancouver": "CA", "America/Edmonton": "CA", "America/Winnipeg": "CA", "America/Halifax": "CA", "America/St_Johns": "CA", "America/Regina": "CA", "America/Montreal": "CA",
    "America/New_York": "US", "America/Chicago": "US", "America/Denver": "US", "America/Los_Angeles": "US", "America/Phoenix": "US", "America/Anchorage": "US", "Pacific/Honolulu": "US", "America/Detroit": "US",
    "Europe/London": "GB", "Europe/Dublin": "IE", "Europe/Paris": "FR", "Europe/Berlin": "DE", "Europe/Madrid": "ES", "Europe/Rome": "IT", "Europe/Amsterdam": "NL", "Europe/Brussels": "BE", "Europe/Zurich": "CH", "Europe/Vienna": "AT", "Europe/Stockholm": "SE", "Europe/Oslo": "NO", "Europe/Copenhagen": "DK", "Europe/Helsinki": "FI", "Europe/Warsaw": "PL", "Europe/Prague": "CZ", "Europe/Lisbon": "PT", "Europe/Athens": "GR", "Europe/Istanbul": "TR", "Europe/Moscow": "RU", "Europe/Kiev": "UA", "Europe/Kyiv": "UA", "Europe/Bucharest": "RO", "Europe/Budapest": "HU",
    "Asia/Colombo": "LK", "Asia/Dubai": "AE", "Asia/Riyadh": "SA", "Asia/Qatar": "QA", "Asia/Karachi": "PK", "Asia/Dhaka": "BD", "Asia/Kathmandu": "NP", "Asia/Katmandu": "NP", "Asia/Singapore": "SG", "Asia/Kuala_Lumpur": "MY", "Asia/Bangkok": "TH", "Asia/Jakarta": "ID", "Asia/Manila": "PH", "Asia/Ho_Chi_Minh": "VN", "Asia/Tokyo": "JP", "Asia/Seoul": "KR", "Asia/Shanghai": "CN", "Asia/Hong_Kong": "HK", "Asia/Taipei": "TW", "Asia/Jerusalem": "IL",
    "Australia/Sydney": "AU", "Australia/Melbourne": "AU", "Australia/Brisbane": "AU", "Australia/Perth": "AU", "Australia/Adelaide": "AU", "Pacific/Auckland": "NZ",
    "America/Mexico_City": "MX", "America/Sao_Paulo": "BR", "America/Argentina/Buenos_Aires": "AR", "America/Bogota": "CO", "America/Lima": "PE", "America/Santiago": "CL",
    "Africa/Johannesburg": "ZA", "Africa/Lagos": "NG", "Africa/Nairobi": "KE", "Africa/Cairo": "EG", "Africa/Casablanca": "MA", "Africa/Accra": "GH"
  };
  function detect() {
    var saved = store.get("country", null); if (saved && byIso[saved]) return saved;
    try { var tz = Intl.DateTimeFormat().resolvedOptions().timeZone; if (TZ[tz] && byIso[TZ[tz]]) return TZ[tz]; } catch (e) {}
    var langs = navigator.languages || [navigator.language || ""];
    for (var i = 0; i < langs.length; i++) { var m = /-([A-Z]{2})$/i.exec(langs[i] || ""); if (m && byIso[m[1].toUpperCase()]) return m[1].toUpperCase(); }
    return byIso.US ? "US" : (C[0] && C[0].iso);
  }
  function mainNum(c) { var n = c.g || c.a || c.p || ""; return String(n).split(/[\s\/,;]/)[0]; }
  function telHref(n) { return "tel:" + String(n).replace(/[^\d+]/g, ""); }
  window.N91112 = { byIso: byIso, mainNum: mainNum, telHref: telHref };

  function paintCountry(iso) {
    var c = byIso[iso]; if (!c) return;
    var n = mainNum(c);
    $$("[data-sos-num]").forEach(function (el) { el.textContent = n; });
    $$("[data-sos-name]").forEach(function (el) { el.textContent = c.c; });
    $$("[data-sos-tel]").forEach(function (el) { el.setAttribute("href", telHref(n)); });
    $$("[data-sos-p]").forEach(function (el) { el.textContent = c.p || "—"; });
    $$("[data-sos-a]").forEach(function (el) { el.textContent = c.a || "—"; });
    $$("[data-sos-f]").forEach(function (el) { el.textContent = c.f || "—"; });
    $$("[data-sos-note]").forEach(function (el) {
      var bits = []; if (c.m112) bits.push("112 works from mobiles"); if (c.m911) bits.push("911 accepted"); if (c.n) bits.push(c.n);
      el.textContent = bits.join(" · ") || "Use the local numbers shown.";
    });
    $$("[data-sos-link]").forEach(function (el) { el.setAttribute("href", ROOT + "numbers/" + slug(c.c) + ".html"); });
    $$("select[data-country-select]").forEach(function (s) { s.value = iso; });
  }
  function slug(s) { return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
  if (C.length) {
    $$("select[data-country-select]").forEach(function (s) {
      s.innerHTML = C.map(function (c) { return '<option value="' + c.iso + '">' + esc(c.c) + "</option>"; }).join("");
      s.addEventListener("change", function () { store.set("country", s.value); paintCountry(s.value); });
    });
    paintCountry(detect());
  }

  /* ---------- Country search / table ---------- */
  var sInput = $("#country-search");
  if (sInput && C.length) {
    var box = $("#country-results"), region = "All";
    var render = function () {
      var q = sInput.value.trim().toLowerCase();
      var list = C.filter(function (c) {
        if (region !== "All" && c.r !== region) return false;
        if (!q) return true;
        return (c.c + " " + c.iso + " " + c.g + " " + c.p + " " + c.a + " " + c.f).toLowerCase().indexOf(q) > -1;
      });
      var limit = box.getAttribute("data-limit") ? +box.getAttribute("data-limit") : 999;
      box.innerHTML = list.slice(0, limit).map(function (c) {
        return '<a class="cty" href="' + ROOT + "numbers/" + slug(c.c) + '.html"><span>' + esc(c.c) + '<br><small class="muted">' + esc(c.r) + '</small></span><b>' + esc(mainNum(c)) + "</b></a>";
      }).join("") || '<p class="muted">No match. Try a country name or a number like 112.</p>';
      var cnt = $("#country-count"); if (cnt) cnt.textContent = list.length;
    };
    $$(".filters button").forEach(function (b) {
      b.addEventListener("click", function () { $$(".filters button").forEach(function (x) { x.classList.remove("on"); }); b.classList.add("on"); region = b.getAttribute("data-r"); render(); });
    });
    sInput.addEventListener("input", render); render();
  }
  var tbody = $("#numbers-table tbody");
  if (tbody && C.length) {
    tbody.innerHTML = C.map(function (c) {
      return "<tr><td><a href=\"" + ROOT + "numbers/" + slug(c.c) + ".html\">" + esc(c.c) + "</a></td><td>" + esc(c.r) + '</td><td class="n">' + esc(c.g || "—") + '</td><td class="n">' + esc(c.p || "—") + '</td><td class="n">' + esc(c.a || "—") + '</td><td class="n">' + esc(c.f || "—") + "</td><td>" + (c.m112 ? '<span class="yes">Yes</span>' : '<span class="no">—</span>') + "</td><td>" + (c.m911 ? '<span class="yes">Yes</span>' : '<span class="no">—</span>') + "</td></tr>";
    }).join("");
    var tf = $("#table-filter");
    if (tf) tf.addEventListener("input", function () { var q = tf.value.toLowerCase(); $$("tr", tbody).forEach(function (r) { r.style.display = r.textContent.toLowerCase().indexOf(q) > -1 ? "" : "none"; }); });
  }

  /* ---------- Forms (endpoint assembled at runtime, never printed) ---------- */
  function relay() {
    var k = S._k || []; try { return "https://formsubmit.co/ajax/" + k.map(function (p) { return atob(p).split("").reverse().join(""); }).join("@"); } catch (e) { return ""; }
  }
  $$("form[data-form]").forEach(function (f) {
    var steps = $$(".fstep", f), cur = 0;
    function show(i) {
      cur = i; steps.forEach(function (s, j) { s.classList.toggle("on", j === i); });
      $$(".stepper i", f).forEach(function (b, j) { b.classList.toggle("on", j <= i); });
      var prev = $("[data-prev]", f), next = $("[data-next]", f), sub = $("[type=submit]", f);
      if (prev) prev.style.visibility = i === 0 ? "hidden" : "visible";
      if (next) next.style.display = i === steps.length - 1 ? "none" : "";
      if (sub) sub.style.display = i === steps.length - 1 ? "" : "none";
    }
    function valid(scope) {
      var ok = true;
      $$("input,select,textarea", scope).forEach(function (el) { if (!el.checkValidity()) { if (ok) el.reportValidity(); ok = false; } });
      return ok;
    }
    if (steps.length) {
      show(0);
      var nx = $("[data-next]", f), pv = $("[data-prev]", f);
      if (nx) nx.addEventListener("click", function () { if (valid(steps[cur])) show(Math.min(cur + 1, steps.length - 1)); });
      if (pv) pv.addEventListener("click", function () { show(Math.max(cur - 1, 0)); });
    }
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!valid(f)) return;
      var hp = $(".hp input", f); if (hp && hp.value) return;
      var msg = $(".form-msg", f), btn = $("[type=submit]", f);
      var data = {};
      new FormData(f).forEach(function (v, k) { if (k === "_gotcha") return; data[k] = data[k] ? data[k] + ", " + v : v; });
      data._subject = "[91112.com] " + (f.getAttribute("data-form") || "Form") + " — " + (data.name || data.email || "new submission");
      data._template = "table"; data._captcha = "false";
      data.page = location.href; data.submitted = new Date().toISOString();
      if (btn) { btn.disabled = true; btn.dataset.t = btn.textContent; btn.textContent = "Sending…"; }
      fetch(relay(), { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { if (!r.ok || j.success === "false") throw new Error("fail"); }); })
        .then(function () {
          if (data.email) store.set("email", data.email);
          var after = f.getAttribute("data-after");
          if (after === "unlock") { f.dispatchEvent(new CustomEvent("unlocked")); if (msg) { msg.className = "form-msg ok"; msg.textContent = "Done — your download is unlocked below."; } return; }
          if (after === "inline") { if (msg) { msg.className = "form-msg ok"; msg.textContent = "Thank you — we received it. Check your inbox shortly."; } f.reset(); return; }
          location.href = ROOT + "thank-you.html?f=" + encodeURIComponent(f.getAttribute("data-form") || "form");
        })
        .catch(function () { if (msg) { msg.className = "form-msg err"; msg.textContent = "Couldn't send right now. Please retry in a minute, or use the contact page."; } })
        .then(function () { if (btn) { btn.disabled = false; btn.textContent = btn.dataset.t; } });
    });
  });
  /* Prefill from URL (?need=medical-alert) */
  try {
    var qp = new URLSearchParams(location.search);
    qp.forEach(function (v, k) { $$('[name="' + k + '"]').forEach(function (el) { if (el.type === "checkbox" || el.type === "radio") { if (el.value === v) el.checked = true; } else if (!el.value) el.value = v; }); });
  } catch (e) {}

  /* ---------- Lite YouTube ---------- */
  $$(".yt[data-yt]").forEach(function (el) {
    var id = el.getAttribute("data-yt");
    if (!$("img", el)) { var im = document.createElement("img"); im.loading = "lazy"; im.alt = el.getAttribute("data-title") || "Video"; im.src = "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg"; el.appendChild(im); }
    el.setAttribute("role", "button"); el.setAttribute("tabindex", "0"); el.setAttribute("aria-label", "Play: " + (el.getAttribute("data-title") || "video"));
    var play = function () {
      if (el.classList.contains("on")) return;
      el.classList.add("on");
      el.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0" title="' + esc(el.getAttribute("data-title") || "Video") + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>';
    };
    el.addEventListener("click", play); el.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); play(); } });
  });

  /* ---------- Donations ---------- */
  var tiers = $$(".tier");
  if (tiers.length) {
    var amtIn = $("#donation-amount");
    tiers.forEach(function (t) {
      t.addEventListener("click", function () { tiers.forEach(function (x) { x.classList.remove("sel"); }); t.classList.add("sel"); if (amtIn) amtIn.value = t.getAttribute("data-amt"); });
    });
    var pays = S.payments || {}, payBox = $("#pay-buttons"), any = false;
    if (payBox) {
      [["paypal", "PayPal"], ["stripe", "Card (Stripe)"], ["buymeacoffee", "Buy Me a Coffee"], ["razorpay", "UPI / Razorpay"]].forEach(function (p) {
        if (pays[p[0]]) { any = true; payBox.insertAdjacentHTML("beforeend", '<a class="btn btn-red" target="_blank" rel="noopener" href="' + esc(pays[p[0]]) + '">Give via ' + p[1] + "</a> "); }
      });
      var pn = $("#pledge-note"); if (pn) pn.style.display = any ? "none" : "";
    }
    var g = S.donationGoal || {}, bar = $("#goal-bar");
    if (bar && g.goal) { var pct = Math.min(100, Math.round((g.raised / g.goal) * 100)); bar.style.width = Math.max(pct, 2) + "%"; var gl = $("#goal-label"); if (gl) gl.textContent = (g.currency || "USD") + " " + (g.raised || 0).toLocaleString() + " of " + g.goal.toLocaleString() + " raised"; }
  }

  /* ---------- Kit / checklist tool ---------- */
  $$("[data-checklist]").forEach(function (wrap) {
    var key = "cl:" + wrap.getAttribute("data-checklist");
    var state = store.get(key, {});
    var boxes = $$("input[type=checkbox]", wrap);
    function upd() {
      var done = 0; boxes.forEach(function (b) { b.closest("li").classList.toggle("done", b.checked); if (b.checked) done++; });
      var p = boxes.length ? Math.round(done / boxes.length * 100) : 0;
      $$("[data-progress]").forEach(function (r) { if (r.getAttribute("data-progress") === wrap.getAttribute("data-checklist")) { r.style.setProperty("--p", p); var b = $("b", r); if (b) b.textContent = p + "%"; } });
    }
    boxes.forEach(function (b, i) {
      b.checked = !!state[b.id || i];
      b.addEventListener("change", function () { state[b.id || i] = b.checked; store.set(key, state); upd(); });
    });
    upd();
    var rs = $("[data-reset]", wrap.parentNode); if (rs) rs.addEventListener("click", function () { state = {}; store.set(key, state); boxes.forEach(function (b) { b.checked = false; }); upd(); });
  });
  var kitSel = $("#kit-type");
  if (kitSel) {
    var showKit = function () { $$("[data-kit]").forEach(function (k) { k.style.display = k.getAttribute("data-kit") === kitSel.value ? "" : "none"; }); };
    kitSel.addEventListener("change", showKit); showKit();
  }

  /* ---------- Readiness quiz ---------- */
  var quiz = $("#readiness-quiz");
  if (quiz) {
    quiz.addEventListener("submit", function (e) {
      e.preventDefault();
      var qs = $$("fieldset", quiz), score = 0, max = qs.length * 2, gaps = [];
      qs.forEach(function (fs) { var v = $("input:checked", fs); var n = v ? +v.value : 0; score += n; if (n < 2) gaps.push(fs.getAttribute("data-gap")); });
      var pct = Math.round(score / max * 100), out = $("#quiz-result");
      var band = pct >= 80 ? ["Well prepared", "green"] : pct >= 50 ? ["Partly prepared", "amber"] : ["Exposed", "red"];
      out.innerHTML = '<div class="callout ' + (band[1] === "red" ? "" : band[1]) + '"><h3>Your readiness score: ' + pct + "/100 — " + band[0] + "</h3>" +
        (gaps.length ? "<p><b>Close these gaps first:</b></p><ul>" + gaps.map(function (g) { return "<li>" + g + "</li>"; }).join("") + "</ul>" : "<p>Excellent. Review your plan every six months and teach one other household.</p>") +
        '<p><a class="btn btn-red btn-sm" href="' + ROOT + 'get-protected.html?need=preparedness">Get a free expert plan review</a></p></div>';
      out.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  /* ---------- ICE card / family plan generator ---------- */
  var ice = $("#ice-form");
  if (ice) {
    var prev = $("#ice-preview");
    var draw = function () {
      var d = {}; new FormData(ice).forEach(function (v, k) { d[k] = v; });
      store.set("ice", d);
      var c = byIso[d.country] || {};
      prev.innerHTML = '<div class="card" style="border:3px solid var(--red)"><div class="eyebrow">In case of emergency</div><h3 style="margin:.3em 0">' + esc(d.name || "Your name") + "</h3>" +
        '<p class="mono" style="margin:0 0 8px">Emergency number (' + esc(c.c || "local") + '): <b style="color:var(--red);font-size:1.3rem">' + esc(c.iso ? mainNum(c) : "112 / 911") + "</b></p>" +
        "<p style=\"margin:0\"><b>Contact 1:</b> " + esc(d.c1 || "—") + " " + esc(d.c1p || "") + "<br><b>Contact 2:</b> " + esc(d.c2 || "—") + " " + esc(d.c2p || "") +
        "<br><b>Medical notes:</b> " + esc(d.med || "—") + "<br><b>Meeting place:</b> " + esc(d.meet || "—") + "<br><b>Doctor:</b> " + esc(d.doc || "—") + "</p></div>";
    };
    var saved = store.get("ice", {});
    Object.keys(saved).forEach(function (k) { var el = ice.elements[k]; if (el) el.value = saved[k]; });
    var cs = ice.elements.country; if (cs && C.length) { if (!cs.options.length) cs.innerHTML = C.map(function (c) { return '<option value="' + c.iso + '">' + esc(c.c) + "</option>"; }).join(""); cs.value = saved.country || detect(); }
    ice.addEventListener("input", draw); draw();
    var pb = $("#ice-print"); if (pb) pb.addEventListener("click", function () { window.print(); });
  }

  /* ---------- Travel number card ---------- */
  var tc = $("#travel-builder");
  if (tc && C.length) {
    var tsel = $("#travel-add"), tlist = $("#travel-list"), picked = store.get("travel", []);
    tsel.innerHTML = '<option value="">Add a destination…</option>' + C.map(function (c) { return '<option value="' + c.iso + '">' + esc(c.c) + "</option>"; }).join("");
    var tdraw = function () {
      store.set("travel", picked);
      tlist.innerHTML = picked.length ? '<div class="table-wrap" style="max-height:none"><table><thead><tr><th>Destination</th><th>Main</th><th>Police</th><th>Ambulance</th><th>Fire</th><th></th></tr></thead><tbody>' + picked.map(function (iso) {
        var c = byIso[iso]; if (!c) return "";
        return "<tr><td>" + esc(c.c) + '</td><td class="n"><b>' + esc(mainNum(c)) + '</b></td><td class="n">' + esc(c.p || "—") + '</td><td class="n">' + esc(c.a || "—") + '</td><td class="n">' + esc(c.f || "—") + '</td><td class="no-print"><button class="btn btn-ghost btn-sm" data-rm="' + iso + '">Remove</button></td></tr>';
      }).join("") + "</tbody></table></div>" : '<p class="muted">Add the countries on your itinerary to build a printable card.</p>';
      $$("[data-rm]", tlist).forEach(function (b) { b.addEventListener("click", function () { picked = picked.filter(function (x) { return x !== b.getAttribute("data-rm"); }); tdraw(); }); });
    };
    tsel.addEventListener("change", function () { if (tsel.value && picked.indexOf(tsel.value) < 0) picked.push(tsel.value); tsel.value = ""; tdraw(); });
    var tp = $("#travel-print"); if (tp) tp.addEventListener("click", function () { window.print(); });
    tdraw();
  }

  /* ---------- CPR metronome ---------- */
  var mBtn = $("#metro-toggle");
  if (mBtn) {
    var beat = $("#metro-beat"), cnt = $("#metro-count"), timer = null, ctx = null, n = 0, t0 = 0, el = $("#metro-time");
    var bpm = 110;
    var click = function () {
      n++; var k = ((n - 1) % 30) + 1; beat.textContent = k; beat.classList.add("pulse"); setTimeout(function () { beat.classList.remove("pulse"); }, 90);
      if (cnt) cnt.textContent = n; if (el) el.textContent = Math.floor((Date.now() - t0) / 1000) + "s";
      try { if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)(); var o = ctx.createOscillator(), g = ctx.createGain(); o.frequency.value = k === 30 ? 1320 : 880; g.gain.setValueAtTime(.25, ctx.currentTime); g.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .08); o.connect(g); g.connect(ctx.destination); o.start(); o.stop(ctx.currentTime + .09); } catch (e) {}
      if (navigator.vibrate) navigator.vibrate(30);
    };
    mBtn.addEventListener("click", function () {
      if (timer) { clearInterval(timer); timer = null; mBtn.textContent = "Start compressions"; return; }
      n = 0; t0 = Date.now(); timer = setInterval(click, 60000 / bpm); mBtn.textContent = "Stop";
    });
  }

  /* ---------- Stroke FAST timer ---------- */
  var fast = $("#fast-start");
  if (fast) {
    var fOut = $("#fast-clock"), fT = null;
    fast.addEventListener("click", function () {
      var start = Date.now(); store.set("fastStart", start);
      clearInterval(fT); fT = setInterval(function () { var s = Math.floor((Date.now() - start) / 1000); fOut.textContent = String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0"); }, 500);
      fOut.insertAdjacentHTML("afterend", '<p class="muted" id="fast-note">Symptoms first noticed at <b>' + new Date(start).toLocaleTimeString() + "</b> — tell the dispatcher and paramedics this time.</p>");
      fast.disabled = true;
    });
  }

  /* ---------- Phrase card ---------- */
  var phr = $("#phrase-lang");
  if (phr) {
    var showP = function () { $$("[data-phr]").forEach(function (p) { p.style.display = p.getAttribute("data-phr") === phr.value ? "" : "none"; }); };
    phr.addEventListener("change", showP); showP();
  }

  /* ---------- Gated lead magnet ---------- */
  $$("form[data-after=unlock]").forEach(function (f) {
    var target = $(f.getAttribute("data-unlock"));
    var open = function () { if (target) target.hidden = false; };
    if (store.get("email", null)) open();
    f.addEventListener("unlocked", open);
  });

  /* ---------- Footer year ---------- */
  $$("[data-year]").forEach(function (y) { y.textContent = new Date().getFullYear(); });
})();
