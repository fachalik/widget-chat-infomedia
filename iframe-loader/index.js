function widgetApi() {
  return new Promise((resolve) => {
    let timeoutId;

    const getApi = () => {
      const event = new Event("getWidgetApi");
      timeoutId = window.setTimeout(getApi, 1000);
      window.dispatchEvent(event);
    };

    const onWidgetApi = (e) => {
      const api = e.detail;
      window.clearTimeout(timeoutId);
      resolve(api);
    };

    window.addEventListener("widgetApi", onWidgetApi, { once: true });
    getApi();
  });
}

// Handle Floating Button
(function () {
  const content = document.getElementById("message");
  const send = document.getElementById("send");
  const hide = document.getElementById("hide");
  const show = document.getElementById("show");
  const toggle = document.getElementById("toggle");

  const changeButtonsState = () => {
    show.disabled = !show.disabled;
    hide.disabled = !show.disabled;
  };

  widgetApi().then((api) => {
    hide.disabled = false;
    toggle.disabled = false;

    send.addEventListener("click", () => {
      const value = content.value;
      if (value.length > 0) {
        api.sendMessage(value);
        content.value = "";
      }
    });

    hide.addEventListener("click", () => {
      changeButtonsState();
      api.hide();
    });

    show.addEventListener("click", () => {
      changeButtonsState();
      api.show();
    });

    toggle.addEventListener("click", () => {
      changeButtonsState();
      api.toggle();
    });

    api.onHide = () => changeButtonsState();
  });
})();

// Handle Body Button
(() => {
  const script = document.currentScript;

  const loadWidget = () => {
    const widget = document.createElement("div");

    const widgetStyle = widget.style;
    widgetStyle.display = "none";
    widgetStyle.boxSizing = "border-box";
    widgetStyle.width = "80px";
    widgetStyle.height = "80px";
    // widgetStyle.width = "350px";
    // widgetStyle.height = "500px";
    widgetStyle.position = "absolute";
    widgetStyle.bottom = "40px";
    widgetStyle.right = "40px";

    const iframe = document.createElement("iframe");

    const iframeStyle = iframe.style;
    iframeStyle.boxSizing = "borderBox";
    iframeStyle.position = "absolute";
    iframeStyle.right = 0;
    iframeStyle.top = 0;
    iframeStyle.width = "100%";
    iframeStyle.height = "100%";
    iframeStyle.border = 0;
    iframeStyle.margin = 0;
    iframeStyle.padding = 0;

    widget.appendChild(iframe);

    const MainColor = script.getAttribute("main-color");

    const api = {
      sendMessage: (message) => {
        iframe.contentWindow.postMessage(
          {
            sendMessage: message,
          },
          "*"
        );
      },

      show: () => {
        widgetStyle.width = "350px";
        widgetStyle.height = "500px";
      },

      hide: () => {
        widgetStyle.width = "80px";
        widgetStyle.height = "80px";
        // widget.style.display = "none";
      },

      toggle: () => {
        const display = window.getComputedStyle(widget, null).display;
        widget.style.display = display === "none" ? "block" : "none";
      },

      onHide: () => {},
    };

    iframe.addEventListener("load", () => {
      window.addEventListener("getWidgetApi", () => {
        const event = new CustomEvent("widgetApi", { detail: api });
        window.dispatchEvent(event);
      });

      window.addEventListener("message", (evt) => {
        console.log("MainColor", MainColor);
        console.log("loader", evt);

        if (evt.origin !== "http://localhost:5173") {
          return;
        }
        if (evt.data === "hide") {
          api.hide();
          api.onHide();
        }
        if (evt.data === "show") {
          api.show();
          // api.onHide();
        }
      });

      // iframe.contentWindow.postMessage({ greeting }, "http://localhost:5173/");
      widgetStyle.display = "block";
    });

    const license = script.getAttribute("data-license");
    const widgetUrl = `http://localhost:5173/?license=${license}`;

    iframe.src = widgetUrl;

    document.body.appendChild(widget);
  };

  if (document.readyState === "complete") {
    loadWidget();
  } else {
    document.addEventListener("readystatechange", () => {
      if (document.readyState === "complete") {
        loadWidget();
      }
    });
  }
})();
