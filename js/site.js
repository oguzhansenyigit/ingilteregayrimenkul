(function () {
  var menu = document.querySelector("[data-menu]");
  var nav = document.querySelector("[data-nav]");
  if (menu && nav) {
    menu.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      menu.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  document.querySelectorAll("[data-whatsapp-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var data = new FormData(form);
      var name = String(data.get("name") || "").trim();
      var phone = String(data.get("phone") || "").trim();
      var budget = String(data.get("budget") || "").trim();
      var city = String(data.get("city") || "").trim();
      var message = String(data.get("message") || "").trim();
      if (!name || !phone) {
        var note = form.querySelector("[data-form-note]");
        if (note) note.textContent = "Ad ve telefon olmadan görüşme notu iletilemez.";
        return;
      }
      var text = [
        "Merhaba, İngiltere gayrimenkul yatırımı için görüşmek istiyorum.",
        "Ad: " + name,
        "Telefon: " + phone,
        budget ? "Bütçe: " + budget : "",
        city ? "İlgi: " + city : "",
        message ? "Not: " + message : ""
      ].filter(Boolean).join("\n");
      window.open("https://wa.me/447733370729?text=" + encodeURIComponent(text), "_blank", "noopener");
    });
  });

  var grid = document.querySelector("[data-project-grid]");
  if (grid) {
    var cards = Array.prototype.slice.call(grid.querySelectorAll("[data-project]"));
    var search = document.querySelector("[data-project-search]");
    var filters = Array.prototype.slice.call(document.querySelectorAll("[data-filter]"));
    var empty = document.querySelector("[data-empty]");
    var active = "hepsi";

    function apply() {
      var q = search ? search.value.trim().toLocaleLowerCase("tr") : "";
      var visible = 0;
      cards.forEach(function (card) {
        var blob = (card.getAttribute("data-project") || "").toLocaleLowerCase("tr");
        var region = card.getAttribute("data-region") || "";
        var ready = card.getAttribute("data-ready") === "1";
        var ok = !q || blob.indexOf(q) !== -1;
        if (active === "londra") ok = ok && region === "Londra";
        if (active === "sehir") ok = ok && region !== "Londra";
        if (active === "hazir") ok = ok && ready;
        card.hidden = !ok;
        if (ok) visible += 1;
      });
      if (empty) empty.hidden = visible !== 0;
    }

    filters.forEach(function (button) {
      button.addEventListener("click", function () {
        active = button.getAttribute("data-filter");
        filters.forEach(function (item) {
          item.setAttribute("aria-pressed", item === button ? "true" : "false");
        });
        apply();
      });
    });
    if (search) search.addEventListener("input", apply);
  }

  var price = document.querySelector("[data-price]");
  var result = document.querySelector("[data-sdlt]");
  if (price && result) {
    var extra = document.querySelector("[data-extra]");
    var nonres = document.querySelector("[data-nonres]");
    var bands = [125000, 250000, 925000, 1500000, Infinity];
    var base = [0, 0.02, 0.05, 0.1, 0.12];

    function tax(amount, rates) {
      var lower = 0;
      var total = 0;
      for (var i = 0; i < bands.length; i++) {
        var slice = Math.min(Math.max(amount - lower, 0), bands[i] - lower);
        total += slice * rates[i];
        lower = bands[i];
      }
      return total;
    }

    function render() {
      var amount = Number(String(price.value).replace(/[^\d.]/g, ""));
      if (!amount || amount < 40000) {
        result.textContent = "£40.000 ve üzeri bir bedel girin.";
        return;
      }
      var rates = base.map(function (rate) {
        return rate + (extra.checked ? 0.05 : 0) + (nonres.checked ? 0.02 : 0);
      });
      var due = tax(amount, rates);
      var formatted = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
        maximumFractionDigits: 0
      }).format(Math.round(due));
      result.textContent = formatted;
    }

    price.addEventListener("input", render);
    extra.addEventListener("change", render);
    nonres.addEventListener("change", render);
    render();
  }
})();
