from __future__ import annotations

import re

_HEAD_TAG_RE = re.compile(r"<head[^>]*>", re.IGNORECASE)
_HTML_TAG_RE = re.compile(r"<html[^>]*>", re.IGNORECASE)
_BODY_CLOSE_RE = re.compile(r"</body>", re.IGNORECASE)

_STORAGE_SHIM_SCRIPT = """<script>
(function () {
  function createMemoryStorage() {
    var store = new Map();
    return {
      getItem: function (k) { return store.has(k) ? store.get(k) : null; },
      setItem: function (k, v) { store.set(String(k), String(v)); },
      removeItem: function (k) { store.delete(k); },
      clear: function () { store.clear(); },
      key: function (i) { return Array.from(store.keys())[i] ?? null; },
      get length() { return store.size; },
    };
  }
  function isBlocked(name) {
    try {
      var s = window[name];
      var testKey = "__leme_storage_test__";
      s.setItem(testKey, "1");
      s.removeItem(testKey);
      return false;
    } catch (e) {
      return true;
    }
  }
  ["localStorage", "sessionStorage"].forEach(function (name) {
    if (isBlocked(name)) {
      try {
        Object.defineProperty(window, name, {
          value: createMemoryStorage(),
          configurable: true,
        });
      } catch (e) {}
    }
  });
})();
</script>"""


def inject_storage_shim(html: str) -> str:
    """Insert a same-origin `localStorage`/`sessionStorage` polyfill into a page.

    The sandboxed iframe used to render uploaded HTML omits
    ``allow-same-origin``, which disables Web Storage entirely and makes
    unrelated scripts throw. This inserts a drop-in, non-persistent
    replacement before any script from the uploaded file runs.

    Parameters
    ----------
    html : str
        Raw HTML content of the uploaded page.

    Returns
    -------
    str
        The HTML with the shim inserted as early as possible in the
        document.
    """
    if _HEAD_TAG_RE.search(html):
        return _HEAD_TAG_RE.sub(
            lambda m: f"{m.group(0)}\n{_STORAGE_SHIM_SCRIPT}", html, count=1
        )
    if _HTML_TAG_RE.search(html):
        return _HTML_TAG_RE.sub(
            lambda m: f"{m.group(0)}\n{_STORAGE_SHIM_SCRIPT}", html, count=1
        )
    return f"{_STORAGE_SHIM_SCRIPT}\n{html}"


def _watermark_badge(site_url: str) -> str:
    return f"""
<div style="position:fixed;bottom:12px;right:12px;z-index:2147483647;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <a href="{site_url}" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;gap:6px;background:#111827;color:#fff;padding:6px 12px;border-radius:9999px;font-size:12px;font-weight:600;text-decoration:none;box-shadow:0 4px 12px rgba(0,0,0,.18);">
    <span style="display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;background:#ff6a00;border-radius:9999px;">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="8" stroke="#fff" stroke-width="2.4"/>
        <circle cx="12" cy="12" r="2.5" stroke="#fff" stroke-width="2.4"/>
        <line x1="12" y1="4" x2="12" y2="20" stroke="#fff" stroke-width="2.4"/>
        <line x1="4" y1="12" x2="20" y2="12" stroke="#fff" stroke-width="2.4"/>
      </svg>
    </span>
    made with Leme
  </a>
</div>"""


def inject_watermark(html: str, *, site_url: str) -> str:
    """Insert the "made with Leme" badge before the closing body tag.

    Parameters
    ----------
    html : str
        Raw HTML content of the uploaded page.
    site_url : str
        Public URL the badge should link to.

    Returns
    -------
    str
        The HTML with the badge appended.
    """
    badge = _watermark_badge(site_url)
    if _BODY_CLOSE_RE.search(html):
        return _BODY_CLOSE_RE.sub(lambda m: f"{badge}\n{m.group(0)}", html, count=1)
    return f"{html}\n{badge}"


def render_expired_html() -> str:
    """Render the placeholder page shown for expired pages.

    Returns
    -------
    str
        A minimal, self-contained HTML document.
    """
    return """<!doctype html>
          <html lang="en"><head><meta charset="utf-8" />
          <title>Page expired</title></head>
          <body style="margin:0;display:flex;align-items:center;justify-content:center;height:100vh;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fff;color:#18181c;">
            <div style="text-align:center;">
              <p style="font-size:18px;font-weight:700;margin:0 0 8px;">This page has expired</p>
              <p style="font-size:14px;color:#6b6b76;margin:0;">The author's plan limits how long this page stays live.</p>
            </div>
          </body></html>"""
