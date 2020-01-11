const { ipcRenderer } = require("electron");

const config = JSON.parse(ipcRenderer.sendSync("get-config"));

// if requested, install our unsafe iframe "workaround"
if (config.allowUnsafeIframes) {
  document.addEventListener("DOMContentLoaded", () => {
    let debounce;
    const mut = new MutationObserver(mutations => {
      if (debounce) {
        clearTimeout(debounce);
      }
      debouce = setTimeout(() => {
        mut.disconnect();

        const frames = document.querySelectorAll("iframe");
        frames.forEach(frame => {
          const allowed = (frame.allow || "").split(";");
          if (!allowed.includes("camera")) {
            allowed.push("camera");
          }
          if (!allowed.includes("microphone")) {
            allowed.push("microphone");
          }
          frame.allow = allowed.join(";");
          frame.removeAttribute("sandbox");
          frame.srcdoc = frame.srcdoc + "\n";
        });
      }, 500);
    });

    mut.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false
    });
  });
}
