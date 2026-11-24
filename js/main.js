(function () {
  "use strict";

  var sidebar = document.getElementById("sidebar");
  var scrim = document.querySelector("[data-sidebar-scrim]");
  var toggle = document.querySelector("[data-sidebar-toggle]");
  var toastTimer;

  function setSidebar(open) {
    if (!sidebar || !toggle) return;
    sidebar.classList.toggle("is-open", open);
    if (scrim) scrim.classList.toggle("is-visible", open);
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle(
      "no-scroll",
      open && window.matchMedia("(max-width: 960px)").matches
    );
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      setSidebar(!sidebar.classList.contains("is-open"));
    });
  }

  if (scrim) {
    scrim.addEventListener("click", function () {
      setSidebar(false);
    });
  }

  if (sidebar) {
    sidebar.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setSidebar(false);
      });
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setSidebar(false);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 960) setSidebar(false);
  });

  function showToast(message) {
    var el = document.getElementById("demo-toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "demo-toast";
      el.className = "toast";
      el.setAttribute("role", "status");
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      el.classList.remove("is-visible");
    }, 2600);
  }

  document.querySelectorAll("[data-soon]").forEach(function (el) {
    el.addEventListener("click", function (event) {
      event.preventDefault();
      showToast("Màn hình này sẽ được dựng ở bước tiếp theo.");
    });
  });

  document.querySelectorAll("[data-flashcard]").forEach(function (card) {
    card.addEventListener("click", function () {
      var flipped = card.getAttribute("aria-pressed") === "true";
      card.setAttribute("aria-pressed", String(!flipped));
    });
  });

  document.querySelectorAll("[data-switch]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var checked = btn.getAttribute("aria-checked") === "true";
      btn.setAttribute("aria-checked", String(!checked));
    });
  });

  document.querySelectorAll("table.table--stack").forEach(function (table) {
    if (!table.tHead || !table.tBodies.length) return;
    var heads = Array.prototype.map.call(table.tHead.rows[0].cells, function (th) {
      return th.querySelector(".sr-only") ? "" : th.textContent.trim();
    });
    Array.prototype.forEach.call(table.tBodies[0].rows, function (row) {
      Array.prototype.forEach.call(row.cells, function (cell, index) {
        cell.setAttribute("data-label", heads[index] || "");
      });
    });
  });
})();
