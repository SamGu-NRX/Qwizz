// components/CustomScrollbar.js
"use client";

import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

export default function CustomScrollbar({ children }) {
  return (
    <OverlayScrollbarsComponent
      options={{
        paddingAbsolute: true,
        showNativeOverlaidScrollbars: false,
        update: {
          elementEvents: [
            ["img", "load"],
            ["iframe", "load"],
          ],
          debounce: [0, 33],
          attributes: null,
          ignoreMutation: null,
        },
        overflow: {
          x: "hidden",
          y: "scroll",
        },
        scrollbars: {
          theme: "os-theme-dark",
          visibility: "auto",
          autoHide: "leave",
          autoHideDelay: 800,
          autoHideSuspend: false,
          dragScroll: true,
          clickScroll: true,
          pointers: ["mouse", "touch", "pen"],
        },
      }}
      defer
      style={{ height: "100vh", width: "100vw" }}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
}
