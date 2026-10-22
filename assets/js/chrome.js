/* 91112.com — shared page chrome (full footer, lead blocks, consent, mobile call bar). Runs before main.js. */
(function () {
  "use strict";
  var R = document.body.getAttribute("data-root") || "";
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function links(items) { return "<ul>" + items.map(function (i) { return '<li><a href="' + R + i[0] + '">' + i[1] + "</a></li>"; }).join("") + "</ul>"; }
  var mark = '<span class="mark" aria-hidden="true"><span>9</span><span>1</span><span>1</span><span>1</span><span>2</span></span>';

  var foot = document.getElementById("site-foot");
  if (foot) {
    foot.innerHTML = '<div class="wrap"><div class="foot-grid"><div>' +
      '<a class="logo" href="' + R + 'index.html" style="color:#fff">' + mark + "<span>91112</span></a>" +
      '<p style="margin-top:12px">Every country\'s emergency numbers, plain-language first aid and preparedness tools — free, fast and built for the moment it matters.</p>' +
      '<form data-form="Newsletter" data-after="inline" class="no-print"><label for="nl-email" style="color:#fff">Monthly safety briefing</label>' +
      '<div class="newsletter"><input id="nl-email" type="email" name="email" required placeholder="you@email.com" autocomplete="email"><button class="btn btn-red" type="submit">Join</button></div>' +
      '<label class="hp"><input name="_gotcha" tabindex="-1" autocomplete="off"></label><div class="form-msg" role="status"></div></form></div>' +
      "<div><h4>Emergency info</h4>" + links([["numbers.html", "Numbers by country"], ["the-number-91112.html", "911 + 112 explained"], ["first-aid.html", "First aid A–Z"], ["prepare.html", "Disaster preparedness"], ["videos.html", "Video lessons"]]) + "</div>" +
      "<div><h4>Tools</h4>" + links([["tools/emergency-kit-builder.html", "Kit builder"], ["tools/readiness-quiz.html", "Readiness quiz"], ["tools/ice-card.html", "ICE card maker"], ["tools/travel-emergency-card.html", "Travel number card"], ["tools/cpr-metronome.html", "CPR metronome"], ["tools/emergency-phrases.html", "Emergency phrases"]]) + "</div>" +
      "<div><h4>Get involved</h4>" + links([["get-protected.html", "Get protected (free quotes)"], ["support.html", "Donate / support"], ["contests.html", "Contests &amp; prizes"], ["careers.html", "Careers &amp; volunteers"], ["advertise.html", "Advertise &amp; partner"]]) + "</div>" +
      "<div><h4>About</h4>" + links([["about.html", "About &amp; editorial policy"], ["contact.html", "Contact"], ["report-correction.html", "Report a wrong number"], ["privacy.html", "Privacy &amp; cookies"], ["terms.html", "Terms"], ["disclaimer.html", "Medical disclaimer"], ["trademark-copyright.html", "Trademark &amp; copyright"]]) + "</div></div>" +
      '<div class="foot-legal"><p><b>Not an emergency service.</b> 91112.com cannot dispatch help. If someone is in danger, call your local emergency number immediately. Content is general education, not medical advice.</p>' +
      '<p>“911” and “112” are public emergency telephone numbers and are referenced here descriptively. 91112.com is independent and is not affiliated with, endorsed by, or operated by any government, emergency service, telecom regulator, ITU, NENA, EENA, Red Cross/Red Crescent, or any trademark owner. See <a href="' + R + 'trademark-copyright.html">Trademark &amp; Copyright</a>.</p>' +
      '<p>© <span data-year>2026</span> 91112.com · Interested in this website, domain, sponsorship or partnership? <a href="https://web.works/contact" target="_blank" rel="noopener">web.works/contact</a> · <a href="' + R + 'sitemap.html">Sitemap</a></p></div></div>';
  }

  var NEEDS = [["medical-alert", "Medical alert / fall detection"], ["home-security", "Home security &amp; monitoring"], ["cpr-training", "CPR / first-aid training"], ["aed", "AED / defibrillator"], ["workplace-plan", "Workplace emergency plan"], ["kits", "Emergency kits / bulk supplies"], ["travel-insurance", "Travel medical insurance"], ["preparedness", "Family preparedness consult"]];
  Array.prototype.forEach.call(document.querySelectorAll("[data-lead]"), function (el, n) {
    var need = el.getAttribute("data-lead"), title = el.getAttribute("data-title") || "Get matched with trusted safety providers — free", id = "lq" + n;
    var opts = NEEDS.map(function (o) { return '<option value="' + o[0] + '"' + (o[0] === need ? " selected" : "") + ">" + o[1] + "</option>"; }).join("");
    var sec = document.createElement("section"); sec.className = "band"; sec.id = n ? "" : "get-protected";
    sec.innerHTML = '<div class="wrap lead-block"><div><span class="eyebrow">Free · no obligation</span><h2>' + esc(title) + "</h2>" +
      '<p class="muted">Tell us what you need. We route your request to vetted providers of medical alert systems, home monitoring, CPR &amp; first-aid training, AEDs and workplace emergency planning — and they contact you with quotes.</p>' +
      '<ul class="ticks"><li>Medical alert &amp; fall detection for older parents</li><li>Certified CPR / first-aid training for teams and schools</li><li>AEDs, trauma kits and bulk emergency supplies</li><li>Workplace emergency action plans and drills</li></ul>' +
      '<div class="trust"><span>🔒 Your details are never sold</span><span>⏱ Replies within 1–2 business days</span></div></div>' +
      '<form class="card" data-form="Quick quote" novalidate><label for="' + id + '-need">I need</label><select id="' + id + '-need" name="need" required><option value="">Choose one…</option>' + opts + "</select>" +
      '<div class="row"><div><label for="' + id + '-name">Name</label><input id="' + id + '-name" name="name" required autocomplete="name"></div><div><label for="' + id + '-email">Email</label><input id="' + id + '-email" type="email" name="email" required autocomplete="email"></div></div>' +
      '<div class="row"><div><label for="' + id + '-phone">Phone (optional)</label><input id="' + id + '-phone" type="tel" name="phone" autocomplete="tel"></div><div><label for="' + id + '-loc">City / country</label><input id="' + id + '-loc" name="location" required></div></div>' +
      '<label class="check"><input type="checkbox" name="consent" value="yes" required> I agree to be contacted about my request and accept the <a href="' + R + 'privacy.html">privacy policy</a>.</label>' +
      '<label class="hp"><input name="_gotcha" tabindex="-1" autocomplete="off"></label>' +
      '<button class="btn btn-red btn-lg" type="submit" style="width:100%;margin-top:14px">Get my free quotes →</button>' +
      '<p class="muted" style="font-size:.8rem;margin:10px 0 0">Referral disclosure: we may receive a fee from matched providers, at no cost to you. <a href="' + R + 'get-protected.html">Full request form</a>.</p><div class="form-msg" role="status"></div></form></div>';
    el.parentNode.replaceChild(sec, el);
  });

  document.body.insertAdjacentHTML("beforeend",
    '<div class="consent" role="dialog" aria-label="Cookie consent"><b>Cookies &amp; ads</b><p style="margin:.4em 0 0">We use essential storage to remember your country and tools, and Google AdSense to keep this resource free. Choose “Accept all” for personalised ads or “Essential only” for non-personalised ads. <a href="' + R + 'privacy.html">Privacy policy</a>.</p>' +
    '<div class="btns"><button class="btn btn-red btn-sm" data-consent="all">Accept all</button><button class="btn btn-ghost btn-sm" data-consent="essential">Essential only</button></div></div>' +
    '<div class="mcta no-print"><a class="btn btn-red" data-sos-tel href="tel:112">📞 Call <span data-sos-num>112</span></a><a class="btn btn-ghost" style="color:#fff;border-color:#2c4560" href="' + R + 'first-aid.html">First aid</a></div>');
})();
