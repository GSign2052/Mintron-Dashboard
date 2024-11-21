import { u as q, a as v, b as B, c as K, f, d as m, j as a, P as x, e as b, S as T, g as G, N as h, h as j, M as y, L as A, B as L, i as g, k as S, A as F, l as k } from "./index-ab50c736.mjs";
function Q(s) {
  const r = q(s);
  return v(() => {
    r.current = s;
  }), B(() => (...e) => {
    var t;
    return (t = r.current) == null ? void 0 : t.call(r, ...e);
  }, []);
}
var w = "Avatar", [J, oe] = K(w), [W, N] = J(w), R = f(
  (s, r) => {
    const { __scopeAvatar: e, ...t } = s, [n, o] = m("idle");
    return /* @__PURE__ */ a.jsx(
      W,
      {
        scope: e,
        imageLoadingStatus: n,
        onImageLoadingStatusChange: o,
        children: /* @__PURE__ */ a.jsx(x.span, { ...t, ref: r })
      }
    );
  }
);
R.displayName = w;
var C = "AvatarImage", I = f(
  (s, r) => {
    const { __scopeAvatar: e, src: t, onLoadingStatusChange: n = () => {
    }, ...o } = s, l = N(C, e), i = X(t), c = Q((d) => {
      n(d), l.onImageLoadingStatusChange(d);
    });
    return b(() => {
      i !== "idle" && c(i);
    }, [i, c]), i === "loaded" ? /* @__PURE__ */ a.jsx(x.img, { ...o, ref: r, src: t }) : null;
  }
);
I.displayName = C;
var M = "AvatarFallback", U = f(
  (s, r) => {
    const { __scopeAvatar: e, delayMs: t, ...n } = s, o = N(M, e), [l, i] = m(t === void 0);
    return v(() => {
      if (t !== void 0) {
        const c = window.setTimeout(() => i(!0), t);
        return () => window.clearTimeout(c);
      }
    }, [t]), l && o.imageLoadingStatus !== "loaded" ? /* @__PURE__ */ a.jsx(x.span, { ...n, ref: r }) : null;
  }
);
U.displayName = M;
function X(s) {
  const [r, e] = m("idle");
  return b(() => {
    if (!s) {
      e("error");
      return;
    }
    let t = !0;
    const n = new window.Image(), o = (l) => () => {
      t && e(l);
    };
    return e("loading"), n.onload = o("loaded"), n.onerror = o("error"), n.src = s, () => {
      t = !1;
    };
  }, [s]), r;
}
var Y = R, Z = I, H = U;
const $ = ({ image: s, label: r, labelColor: e, bgColor: t, size: n, className: o }) => {
  let l = "", i = " -mb-2 ";
  switch (n) {
    case "sm":
      l = " w-7 h-7 text-sm ";
      break;
    case "lg":
      l = " w-12 h-12 text-xl ";
      break;
    case "xl":
      l = " w-16 h-16 text-2xl ", i = " -mb-3 ";
      break;
    case "2xl":
      l = " w-20 h-20 text-2xl ", i = " -mb-3 ";
      break;
    default:
      l = " w-10 h-10 text-md ";
      break;
  }
  return /* @__PURE__ */ a.jsxs(Y, { className: `relative inline-flex select-none items-center justify-center overflow-hidden rounded-full align-middle ${l}`, children: [
    s ? /* @__PURE__ */ a.jsx(Z, { className: `absolute z-20 h-full w-full object-cover ${o && o}`, src: s }) : /* @__PURE__ */ a.jsx("span", { className: `${e && `text-${e}`} relative z-10 inline-flex h-full w-full items-center justify-center p-2 font-semibold ${o && o}`, style: t ? { backgroundColor: t } : {}, children: r }),
    /* @__PURE__ */ a.jsx(H, { asChild: !0, children: /* @__PURE__ */ a.jsx(T, { className: `${i} absolute z-0 h-full w-full text-grey-300` }) })
  ] });
}, z = ({
  id: s,
  title: r,
  detail: e,
  action: t,
  hideActions: n,
  avatar: o,
  className: l,
  testId: i,
  separator: c = !0,
  bgOnHover: d = !0,
  paddingRight: P = !0,
  onClick: u,
  children: p
}) => {
  const _ = (V) => {
    u == null || u(V);
  }, E = G(
    "group/list-item relative flex items-center justify-between",
    d && "hover:bg-grey-50 dark:hover:bg-grey-950",
    c ? "border-b border-grey-100 last-of-type:border-b-transparent dark:border-grey-900" : "border-y border-transparent",
    u && 'cursor-pointer before:absolute before:inset-0 before:content-[""]',
    "hover:z-10 hover:border-b-transparent",
    "-mb-px pb-px",
    l
  );
  return /* @__PURE__ */ a.jsxs("div", { className: E, "data-testid": i, onClick: _, children: [
    d && /* @__PURE__ */ a.jsx("div", { className: "absolute inset-0 -z-10 -mx-4 rounded-lg bg-grey-50 opacity-0 group-hover/list-item:opacity-100 dark:bg-grey-950" }),
    /* @__PURE__ */ a.jsxs("div", { className: "relative flex w-full items-center justify-between", children: [
      p || /* @__PURE__ */ a.jsxs("div", { className: "flex grow items-center gap-3", children: [
        o && o,
        /* @__PURE__ */ a.jsxs("div", { className: "flex grow flex-col py-3 pr-6", id: s, children: [
          /* @__PURE__ */ a.jsx("span", { children: r }),
          e && /* @__PURE__ */ a.jsx("span", { className: "text-xs text-grey-700", children: e })
        ] })
      ] }),
      t && /* @__PURE__ */ a.jsx("div", { className: `visible py-3 md:pl-2 ${P && "md:pr-2"} ${n ? "group-hover/list-item:visible md:invisible" : ""}`, children: t })
    ] })
  ] });
};
function O(s) {
  var o;
  const e = (o = S().data) == null ? void 0 : o.site, t = (e == null ? void 0 : e.url) ?? window.location.origin, n = new F(
    new URL(t),
    new URL("/ghost/api/admin/identities/", window.location.origin),
    s
  );
  return k({
    queryKey: [`followers:${s}`],
    async queryFn() {
      const l = await n.getFollowers();
      return await Promise.all(l.map((c) => n.getActor(c)));
    }
  });
}
const D = ({}) => {
  const { updateRoute: s } = j(), { data: r = [], isLoading: e } = O("index");
  return /* @__PURE__ */ a.jsx(
    y,
    {
      afterClose: () => {
        s("profile");
      },
      cancelLabel: "",
      footer: !1,
      okLabel: "",
      size: "md",
      title: "Followers",
      topRightContent: "close",
      children: /* @__PURE__ */ a.jsx("div", { className: "mt-3 flex flex-col gap-4 pb-12", children: e ? /* @__PURE__ */ a.jsx("p", { children: "Loading followers..." }) : /* @__PURE__ */ a.jsx(A, { children: r.map((t) => /* @__PURE__ */ a.jsx(
        z,
        {
          action: /* @__PURE__ */ a.jsx(L, { color: "grey", label: "Remove", link: !0 }),
          avatar: /* @__PURE__ */ a.jsx($, { image: t.icon, size: "sm" }),
          detail: g(t),
          id: "list-item",
          title: t.name || g(t)
        },
        t.id
      )) }) })
    }
  );
}, ee = h.create(D);
function te(s) {
  var o;
  const e = (o = S().data) == null ? void 0 : o.site, t = (e == null ? void 0 : e.url) ?? window.location.origin, n = new F(
    new URL(t),
    new URL("/ghost/api/admin/identities/", window.location.origin),
    s
  );
  return k({
    queryKey: [`following:${s}`],
    async queryFn() {
      return n.getFollowing();
    }
  });
}
const ae = ({}) => {
  const { updateRoute: s } = j(), { data: r = [] } = te("index");
  return /* @__PURE__ */ a.jsx(
    y,
    {
      afterClose: () => {
        s("profile");
      },
      cancelLabel: "",
      footer: !1,
      okLabel: "",
      size: "md",
      title: "Following",
      topRightContent: "close",
      children: /* @__PURE__ */ a.jsx("div", { className: "mt-3 flex flex-col gap-4 pb-12", children: /* @__PURE__ */ a.jsx(A, { children: r.map((e) => /* @__PURE__ */ a.jsx(
        z,
        {
          action: /* @__PURE__ */ a.jsx(L, { color: "grey", label: "Unfollow", link: !0 }),
          avatar: /* @__PURE__ */ a.jsx($, { image: e.icon, size: "sm" }),
          detail: g(e),
          id: "list-item",
          title: e.name
        },
        e.id
      )) }) })
    }
  );
}, se = h.create(ae), ne = { ViewFollowing: se, ViewFollowers: ee };
export {
  ne as default
};
//# sourceMappingURL=modals-2e6f9c05.mjs.map
