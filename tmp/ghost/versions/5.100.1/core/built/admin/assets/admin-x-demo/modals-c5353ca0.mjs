import { c as e, j as s, u as U, a as le, b as W, d as $, B as O, e as oe, H as S, N as D, f as ne } from "./index-ff63fc71.mjs";
const ie = ({
  shiftY: l,
  footerBgColorClass: i = "bg-white dark:bg-black",
  contentBgColorClass: d = "bg-white dark:bg-black",
  height: o = 96,
  children: g
}) => {
  const m = e(
    "w-100 sticky bottom-[-24px] z-[297] m-0 box-border p-0"
  ), f = l ? `calc(${l} - 24px)` : "-24px", h = `${o + 24}px`, k = e(
    "sticky z-[298] block h-[24px]",
    d
  ), u = "0", j = e(
    "sticky z-[299] mb-[-24px] flex items-center justify-between",
    "h-[96px]",
    i
  ), x = "0", p = `${o}px`, N = "sticky mx-2 block h-[24px] rounded-full shadow-[0_0_0_1px_rgba(0,0,0,.025),0_-8px_16px_-3px_rgba(0,0,0,.08)]", B = l ? `calc(${l} + ${o - 24}px)` : `${o - 24}px`;
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      className: m,
      style: {
        bottom: f,
        height: h
      },
      children: [
        /* @__PURE__ */ s.jsx(
          "div",
          {
            className: k,
            style: {
              bottom: u
            }
          }
        ),
        /* @__PURE__ */ s.jsx(
          "div",
          {
            className: j,
            style: {
              bottom: x,
              height: p
            },
            children: g
          }
        ),
        /* @__PURE__ */ s.jsx(
          "div",
          {
            className: N,
            style: {
              bottom: B
            }
          }
        )
      ]
    }
  );
};
function P(l, i, d = {}) {
  l ? D.show(de, {
    title: "Are you sure you want to leave this page?",
    prompt: /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsx("p", { children: "Hey there! It looks like you didn't save the changes you made." }),
      /* @__PURE__ */ s.jsx("p", { children: "Save before you go!" })
    ] }),
    okLabel: "Leave",
    cancelLabel: "Stay",
    okColor: "red",
    onOk: (o) => {
      i(), o == null || o.remove();
    },
    ...d
  }) : i();
}
const ce = "bg-[rgba(98,109,121,0.2)] backdrop-blur-[3px]", X = ({
  size: l = "md",
  align: i = "center",
  width: d,
  height: o,
  testId: g,
  title: m,
  okLabel: f = "OK",
  okLoading: h = !1,
  cancelLabel: k = "Cancel",
  footer: u,
  header: j,
  leftButtonProps: x,
  buttonsDisabled: p,
  okDisabled: N,
  padding: B = !0,
  onOk: H,
  okColor: q = "black",
  onCancel: C,
  topRightContent: v,
  hideXOnMobile: J = !1,
  afterClose: E,
  children: Q,
  backDrop: R = !0,
  backDropClick: V = !0,
  stickyFooter: G = !1,
  stickyHeader: Z = !1,
  scrolling: Y = !0,
  dirty: M = !1,
  animate: K = !0,
  formSheet: y = !1,
  enableCMDS: ee = !0
}) => {
  const _ = U(), { setGlobalDirtyState: F } = le(), [T, se] = W(!1);
  $(() => {
    F(M);
  }, [M, F]), $(() => {
    const r = (b) => {
      b.key === "Escape" && (document.activeElement && document.activeElement instanceof HTMLElement && document.activeElement.blur(), setTimeout(() => {
        C ? C() : P(M, () => {
          _.remove(), E == null || E();
        });
      }), b.stopPropagation());
    };
    return document.addEventListener("keydown", r), () => {
      document.removeEventListener("keydown", r);
    };
  }, [_, M, E, C]), $(() => {
    const r = setTimeout(() => {
      se(!0);
    }, 250);
    return () => clearTimeout(r);
  }, []), $(() => {
    if (H) {
      const r = (b) => {
        (b.metaKey || b.ctrlKey) && b.key === "s" && (b.preventDefault(), H());
      };
      if (ee)
        return window.addEventListener("keydown", r), () => {
          window.removeEventListener("keydown", r);
        };
    }
  });
  const z = [];
  let A;
  const I = () => {
    P(M, () => {
      _.remove(), E == null || E();
    });
  };
  u || (k && z.push({
    key: "cancel-modal",
    label: k,
    color: "outline",
    onClick: C || (() => {
      I();
    }),
    disabled: p
  }), f && z.push({
    key: "ok-modal",
    label: f,
    color: q,
    className: "min-w-[80px]",
    onClick: H,
    disabled: p || N,
    loading: h
  }));
  let a = e(
    "relative z-50 flex max-h-[100%] w-full flex-col justify-between overflow-x-hidden bg-white dark:bg-black",
    i === "center" && "mx-auto",
    i === "left" && "mr-auto",
    i === "right" && "ml-auto",
    l !== "bleed" && "rounded",
    y ? "shadow-md" : "shadow-xl",
    K && !y && !T && i === "center" && "animate-modal-in",
    K && !y && !T && i === "right" && "animate-modal-in-from-right",
    y && !T && "animate-modal-in-reverse",
    Y ? "overflow-y-auto" : "overflow-y-hidden"
  ), n = e(
    "fixed inset-0 z-[1000] h-[100vh] w-[100vw]"
  ), c = "", t = e(
    !v || v === "close" ? "" : "flex items-center justify-between gap-5"
  );
  switch (Z && (t = e(
    t,
    "sticky top-0 z-[300] -mb-4 bg-white !pb-4 dark:bg-black"
  )), l) {
    case "sm":
      a = e(
        a,
        "max-w-[480px]"
      ), n = e(
        n,
        "p-4 md:p-[8vmin]"
      ), c = "p-8", t = e(
        t,
        "-inset-x-8"
      );
      break;
    case "md":
      a = e(
        a,
        "max-w-[720px]"
      ), n = e(
        n,
        "p-4 md:p-[8vmin]"
      ), c = "p-8", t = e(
        t,
        "-inset-x-8"
      );
      break;
    case "lg":
      a = e(
        a,
        "max-w-[1020px]"
      ), n = e(
        n,
        "p-4 md:p-[4vmin]"
      ), c = "p-7", t = e(
        t,
        "-inset-x-8"
      );
      break;
    case "xl":
      a = e(
        a,
        "max-w-[1240px]0"
      ), n = e(
        n,
        "p-4 md:p-[3vmin]"
      ), c = "p-10", t = e(
        t,
        "-inset-x-10 -top-10"
      );
      break;
    case "full":
      a = e(
        a,
        "h-full"
      ), n = e(
        n,
        "p-4 md:p-[3vmin]"
      ), c = "p-10", t = e(
        t,
        "-inset-x-10"
      );
      break;
    case "bleed":
      a = e(
        a,
        "h-full"
      ), c = "p-10", t = e(
        t,
        "-inset-x-10"
      );
      break;
    default:
      n = e(
        n,
        "p-4 md:p-[8vmin]"
      ), c = "p-8", t = e(
        t,
        "-inset-x-8"
      );
      break;
  }
  B || (c = "p-0"), a = e(
    a
  ), t = e(
    t,
    c,
    "pb-0"
  ), A = e(
    c,
    "py-0"
  ), n = e(
    n,
    "max-[800px]:!pb-20"
  );
  const te = e(
    `${c} ${G ? "py-6" : ""}`,
    "flex w-full items-center justify-between"
  );
  A = e(
    A,
    (l === "full" || l === "bleed" || o === "full" || typeof o == "number") && "grow"
  );
  const ae = (r) => {
    r.target === r.currentTarget && V && I();
  }, L = {};
  typeof d == "number" ? (L.width = "100%", L.maxWidth = d + "px") : d === "full" && (a = e(
    a,
    "w-full"
  )), typeof o == "number" ? (L.height = "100%", L.maxHeight = o + "px") : o === "full" && (a = e(
    a,
    "h-full"
  ));
  let w;
  return u ? w = u : u === !1 ? A += " pb-0 " : w = /* @__PURE__ */ s.jsxs("div", { className: te, children: [
    /* @__PURE__ */ s.jsx("div", { children: x && /* @__PURE__ */ s.jsx(O, { ...x }) }),
    /* @__PURE__ */ s.jsx("div", { className: "flex gap-3", children: /* @__PURE__ */ s.jsx(oe, { buttons: z }) })
  ] }), w = G ? /* @__PURE__ */ s.jsx(ie, { height: 84, children: w }) : /* @__PURE__ */ s.jsx(s.Fragment, { children: w }), /* @__PURE__ */ s.jsxs("div", { className: n, id: "modal-backdrop", onMouseDown: ae, children: [
    /* @__PURE__ */ s.jsx("div", { className: e(
      "pointer-events-none fixed inset-0 z-0",
      R && !y && ce,
      y && "bg-[rgba(98,109,121,0.08)]"
    ) }),
    /* @__PURE__ */ s.jsxs("section", { className: a, "data-testid": g, style: L, children: [
      j === !1 ? "" : !v || v === "close" ? /* @__PURE__ */ s.jsxs("header", { className: t, children: [
        m && /* @__PURE__ */ s.jsx(S, { level: 3, children: m }),
        /* @__PURE__ */ s.jsx("div", { className: `${v !== "close" && "md:!invisible md:!hidden"} ${J && "hidden"} absolute right-6 top-6`, children: /* @__PURE__ */ s.jsx(O, { className: "-m-2 cursor-pointer p-2 opacity-50 hover:opacity-100", icon: "close", iconColorClass: "text-black dark:text-white", size: "sm", testId: "close-modal", unstyled: !0, onClick: I }) })
      ] }) : /* @__PURE__ */ s.jsxs("header", { className: t, children: [
        m && /* @__PURE__ */ s.jsx(S, { level: 3, children: m }),
        v
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: A, children: Q }),
      w
    ] })
  ] });
}, re = ({
  title: l = "Are you sure?",
  prompt: i,
  cancelLabel: d = "Cancel",
  okLabel: o = "OK",
  okRunningLabel: g = "...",
  okColor: m = "black",
  onCancel: f,
  onOk: h,
  customFooter: k,
  formSheet: u = !0
}) => {
  const j = U(), [x, p] = W("");
  return /* @__PURE__ */ s.jsx(
    X,
    {
      backDropClick: !1,
      buttonsDisabled: x === "running",
      cancelLabel: d,
      footer: k,
      formSheet: u,
      okColor: m,
      okLabel: x === "running" ? g : o,
      testId: "confirmation-modal",
      title: l,
      width: 540,
      onCancel: f,
      onOk: async () => {
        p("running");
        try {
          await (h == null ? void 0 : h(j));
        } catch (N) {
          console.error("Unhandled Promise Rejection. Make sure you catch errors in your onOk handler.", N);
        }
        p("");
      },
      children: /* @__PURE__ */ s.jsx("div", { className: "py-4 leading-9", children: i })
    }
  );
}, de = D.create(re), me = D.create(() => {
  const { updateRoute: l } = ne(), i = D.useModal();
  return /* @__PURE__ */ s.jsx(
    X,
    {
      afterClose: () => {
        l("");
      },
      cancelLabel: "",
      okLabel: "Close",
      size: "sm",
      title: "About",
      onOk: () => {
        l(""), i.remove();
      },
      children: /* @__PURE__ */ s.jsxs("div", { className: "mt-3 flex flex-col gap-4", children: [
        /* @__PURE__ */ s.jsx("p", { children: "You're looking at a React app inside Ghost Admin. It uses common AdminX framework and Design System packages, and works seamlessly with the current Admin's routing." }),
        /* @__PURE__ */ s.jsx("p", { children: "At the moment the look and feel follows the current Admin's style to blend in with existing pages. However the system is built in a very flexible way to allow easy updates in the future." }),
        /* @__PURE__ */ s.jsx(S, { className: "-mb-2 mt-4", level: 5, children: "Contents" }),
        /* @__PURE__ */ s.jsxs("p", { children: [
          "The demo uses a mocked list of members — it's ",
          /* @__PURE__ */ s.jsx("strong", { children: "not" }),
          " ",
          "the actual or future design of members in Ghost Admin. Instead, the pages showcase common design patterns like a list and detail, navigation, modals and toasts."
        ] })
      ] })
    }
  );
}), xe = { DemoModal: me };
export {
  xe as default
};
//# sourceMappingURL=modals-c5353ca0.mjs.map
