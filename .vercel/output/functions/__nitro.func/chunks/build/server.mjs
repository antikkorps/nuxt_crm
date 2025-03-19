import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { shallowReactive, reactive, effectScope, getCurrentScope, hasInjectionContext, getCurrentInstance, toRef, inject, shallowRef, isReadonly, isRef, isShallow, isReactive, toRaw, defineAsyncComponent, computed, ref, unref, nextTick, defineComponent, onServerPrefetch, h, mergeProps, useAttrs, provide, watch, withCtx, createVNode, resolveDynamicComponent, createBlock, renderSlot, openBlock, toDisplayString, toValue, resolveComponent, useSlots, createCommentVNode, Fragment, createTextVNode, withModifiers, renderList, markRaw, useId, Suspense, useSSRContext, onErrorCaptured, createApp } from 'vue';
import { j as createHooks, k as getContext, e as createError$1, t as toRouteMatcher, l as createRouter, m as defu, n as hasProtocol, o as joinURL, w as withQuery, s as sanitizeStatusCode, q as isScriptProtocol, v as executeAsync, x as defuFn, y as klona, z as serialize, A as isEqual, B as withLeadingSlash, C as parseURL, D as encodePath, E as encodeParam, F as parseQuery, G as withTrailingSlash, H as withoutTrailingSlash } from '../nitro/nitro.mjs';
import { START_LOCATION, createMemoryHistory, createRouter as createRouter$1, useRoute as useRoute$1, RouterView } from 'vue-router';
import require$$0 from 'os';
import require$$1 from 'tty';
import require$$2 from 'fs';
import require$$3 from 'path';
import require$$4 from 'crypto';
import require$$5 from 'child_process';
import require$$6 from 'fs/promises';
import require$$7 from 'util';
import require$$8 from 'async_hooks';
import require$$9 from 'events';
import { u as useHead$1, h as headSymbol } from '../routes/renderer.mjs';
import { _api, addAPIProvider, setCustomIconsLoader, getIcon, loadIcon as loadIcon$1, Icon } from '@iconify/vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderSlot, ssrRenderVNode, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderStyle, ssrRenderSuspense } from 'vue/server-renderer';
import { useForwardProps, Primitive, useForwardPropsEmits, ToastRoot, ToastTitle, ToastDescription, ToastAction, ToastClose, ToastProvider, ToastPortal, ToastViewport, ConfigProvider, TooltipProvider } from 'reka-ui';
import { createSharedComposable, reactivePick, useDebounceFn, reactiveOmit } from '@vueuse/core';
import { createTV } from 'tailwind-variants';
import { getIconCSS } from '@iconify/utils/lib/css/icon';

const appLayoutTransition = false;
const appPageTransition = false;
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
const asyncDataDefaults = { "value": null, "errorValue": null, "deep": true };
const appId = "nuxt-app";

function getNuxtAppCtx(id = appId) {
  return getContext(id, {
    asyncContext: false
  });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  var _a;
  let hydratingCount = 0;
  const nuxtApp = {
    _id: options.id || appId || "nuxt-app",
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.16.0";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      ...((_a = options.ssrContext) == null ? void 0 : _a.payload) || {},
      data: shallowReactive({}),
      state: reactive({}),
      once: /* @__PURE__ */ new Set(),
      _errors: shallowReactive({})
    }),
    static: {
      data: {}
    },
    runWithContext(fn) {
      if (nuxtApp._scope.active && !getCurrentScope()) {
        return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
      }
      return callWithNuxt(nuxtApp, fn);
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: shallowReactive({}),
    _payloadRevivers: {},
    ...options
  };
  {
    nuxtApp.payload.serverRendered = true;
  }
  if (nuxtApp.ssrContext) {
    nuxtApp.payload.path = nuxtApp.ssrContext.url;
    nuxtApp.ssrContext.nuxt = nuxtApp;
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: nuxtApp.ssrContext.runtimeConfig.public,
      app: nuxtApp.ssrContext.runtimeConfig.app
    };
  }
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin) {
  if (plugin.hooks) {
    nuxtApp.hooks.addHooks(plugin.hooks);
  }
}
async function applyPlugin(nuxtApp, plugin) {
  if (typeof plugin === "function") {
    const { provide } = await nuxtApp.runWithContext(() => plugin(nuxtApp)) || {};
    if (provide && typeof provide === "object") {
      for (const key in provide) {
        nuxtApp.provide(key, provide[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins) {
  var _a, _b, _c, _d;
  const resolvedPlugins = [];
  const unresolvedPlugins = [];
  const parallels = [];
  const errors = [];
  let promiseDepth = 0;
  async function executePlugin(plugin) {
    var _a2;
    const unresolvedPluginsForThisPlugin = ((_a2 = plugin.dependsOn) == null ? void 0 : _a2.filter((name) => plugins.some((p) => p._name === name) && !resolvedPlugins.includes(name))) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin).then(async () => {
        if (plugin._name) {
          resolvedPlugins.push(plugin._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin._name)) {
              dependsOn.delete(plugin._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      });
      if (plugin.parallel) {
        parallels.push(promise.catch((e) => errors.push(e)));
      } else {
        await promise;
      }
    }
  }
  for (const plugin of plugins) {
    if (((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext) && ((_b = plugin.env) == null ? void 0 : _b.islands) === false) {
      continue;
    }
    registerPluginHooks(nuxtApp, plugin);
  }
  for (const plugin of plugins) {
    if (((_c = nuxtApp.ssrContext) == null ? void 0 : _c.islandContext) && ((_d = plugin.env) == null ? void 0 : _d.islands) === false) {
      continue;
    }
    await executePlugin(plugin);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (errors.length) {
    throw errors[0];
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin) {
  if (typeof plugin === "function") {
    return plugin;
  }
  const _name = plugin._name || plugin.name;
  delete plugin.name;
  return Object.assign(plugin.setup || (() => {
  }), plugin, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => setup();
  const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function tryUseNuxtApp(id) {
  var _a;
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = (_a = getCurrentInstance()) == null ? void 0 : _a.appContext.app.$nuxt;
  }
  nuxtAppInstance || (nuxtAppInstance = getNuxtAppCtx(id).tryUse());
  return nuxtAppInstance || null;
}
function useNuxtApp(id) {
  const nuxtAppInstance = tryUseNuxtApp(id);
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}

const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const nuxtApp = useNuxtApp();
    const error2 = useError();
    if (false) ;
    error2.value || (error2.value = nuxtError);
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  return nuxtError;
};

const unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU = defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    nuxtApp.vueApp.use(head);
  }
});

const ROUTE_KEY_PARENTHESES_RE$1 = /(:\w+)\([^)]+\)/g;
const ROUTE_KEY_SYMBOLS_RE$1 = /(:\w+)[?+*]/g;
const ROUTE_KEY_NORMAL_RE$1 = /:\w+/g;
const interpolatePath = (route, match) => {
  return match.path.replace(ROUTE_KEY_PARENTHESES_RE$1, "$1").replace(ROUTE_KEY_SYMBOLS_RE$1, "$1").replace(ROUTE_KEY_NORMAL_RE$1, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey$1 = (routeProps, override) => {
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a;
    return ((_a = m.components) == null ? void 0 : _a.default) === routeProps.Component.type;
  });
  const source = override ?? (matchedRoute == null ? void 0 : matchedRoute.meta.key) ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
  return typeof source === "function" ? source(routeProps.route) : source;
};
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}

async function getRouteRules(arg) {
  const path = typeof arg === "string" ? arg : arg.path;
  {
    useNuxtApp().ssrContext._preloadManifest = true;
    const _routeRulesMatcher = toRouteMatcher(
      createRouter({ routes: useRuntimeConfig().nitro.routeRules })
    );
    return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
  }
}

const LayoutMetaSymbol = Symbol("layout-meta");
const PageRouteSymbol = Symbol("route");

const useRouter = () => {
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const URL_QUOTE_RE = /"/g;
const navigateTo = (to, options) => {
  to || (to = "/");
  const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
  const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
  const isExternal = (options == null ? void 0 : options.external) || isExternalHost;
  if (isExternal) {
    if (!(options == null ? void 0 : options.external)) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const { protocol } = new URL(toPath, "http://localhost");
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL(useRuntimeConfig().app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(URL_QUOTE_RE, "%22");
        const encodedHeader = encodeURL(location2, isExternalHost);
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode((options == null ? void 0 : options.redirectCode) || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: encodedHeader }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options == null ? void 0 : options.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
function resolveRouteObject(to) {
  return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
function encodeURL(location2, isExternalHost = false) {
  const url = new URL(location2, "http://localhost");
  if (!isExternalHost) {
    return url.pathname + url.search + url.hash;
  }
  if (location2.startsWith("//")) {
    return url.toString().replace(url.protocol, "");
  }
  return url.toString();
}

const __nuxt_page_meta$3 = {
  auth: false
};

const __nuxt_page_meta$2 = {
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/dashboard"
  }
};

const __nuxt_page_meta$1 = {
  layout: "auth",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/dashboard"
  }
};

const __nuxt_page_meta = {
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/"
  }
};

function handleHotUpdate(_router, _generateRoutes) {
}
const _routes = [
  {
    name: "auth-demo",
    path: "/auth/demo",
    meta: __nuxt_page_meta$3 || {},
    component: () => import('./demo.vue.mjs')
  },
  {
    name: "auth-forgot-password",
    path: "/auth/forgot-password",
    meta: __nuxt_page_meta$2 || {},
    component: () => import('./forgot-password.vue.mjs')
  },
  {
    name: "auth-login",
    path: "/auth/login",
    meta: __nuxt_page_meta$1 || {},
    component: () => import('./login.vue.mjs')
  },
  {
    name: "auth-register",
    path: "/auth/register",
    meta: __nuxt_page_meta || {},
    component: () => import('./register.vue.mjs')
  },
  {
    name: "dashboard",
    path: "/dashboard",
    component: () => import('./dashboard.vue.mjs')
  },
  {
    name: "index",
    path: "/",
    component: () => import('./index.vue.mjs')
  }
];

const _wrapInTransition = (props, children) => {
  return { default: () => {
    var _a;
    return (_a = children.default) == null ? void 0 : _a.call(children);
  } };
};
const ROUTE_KEY_PARENTHESES_RE = /(:\w+)\([^)]+\)/g;
const ROUTE_KEY_SYMBOLS_RE = /(:\w+)[?+*]/g;
const ROUTE_KEY_NORMAL_RE = /:\w+/g;
function generateRouteKey(route) {
  const source = (route == null ? void 0 : route.meta.key) ?? route.path.replace(ROUTE_KEY_PARENTHESES_RE, "$1").replace(ROUTE_KEY_SYMBOLS_RE, "$1").replace(ROUTE_KEY_NORMAL_RE, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
  if (to === from || from === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index) => {
      var _a, _b;
      return comp.components && comp.components.default === ((_b = (_a = from.matched[index]) == null ? void 0 : _a.components) == null ? void 0 : _b.default);
    }
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}

const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    var _a;
    const nuxtApp = useNuxtApp();
    const behavior = ((_a = useRouter().options) == null ? void 0 : _a.scrollBehaviorType) ?? "auto";
    let position = savedPosition || void 0;
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (!position && from && to && routeAllowsScrollToTop !== false && isChangingPage(to, from)) {
      position = { left: 0, top: 0 };
    }
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
      }
      return false;
    }
    const hasTransition = (route) => !!(route.meta.pageTransition ?? appPageTransition);
    const hookToWait = hasTransition(from) && hasTransition(to) ? "page:transition:finish" : "page:finish";
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await new Promise((resolve2) => setTimeout(resolve2, 0));
        if (to.hash) {
          position = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
        }
        resolve(position);
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
    }
  } catch {
  }
  return 0;
}

const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};

const validate = defineNuxtRouteMiddleware(async (to) => {
  var _a;
  let __temp, __restore;
  if (!((_a = to.meta) == null ? void 0 : _a.validate)) {
    return;
  }
  const nuxtApp = useNuxtApp();
  const router = useRouter();
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  const error = createError({
    statusCode: result && result.statusCode || 404,
    statusMessage: result && result.statusMessage || `Page Not Found: ${to.fullPath}`,
    data: {
      path: to.fullPath
    }
  });
  const unsub = router.beforeResolve((final) => {
    unsub();
    if (final === to) {
      const unsub2 = router.afterEach(async () => {
        unsub2();
        await nuxtApp.runWithContext(() => showError(error));
      });
      return false;
    }
  });
});

const manifest_45route_45rule = defineNuxtRouteMiddleware(async (to) => {
  {
    return;
  }
});

const globalMiddleware = [
  validate,
  manifest_45route_45rule
];
const namedMiddleware = {};

const plugin = defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    var _a, _b, _c, _d;
    let __temp, __restore;
    let routerBase = useRuntimeConfig().app.baseURL;
    const history = ((_b = (_a = routerOptions).history) == null ? void 0 : _b.call(_a, routerBase)) ?? createMemoryHistory(routerBase);
    const routes = routerOptions.routes ? ([__temp, __restore] = executeAsync(() => routerOptions.routes(_routes)), __temp = await __temp, __restore(), __temp) ?? _routes : _routes;
    let startPosition;
    const router = createRouter$1({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes
    });
    handleHotUpdate(router, routerOptions.routes ? routerOptions.routes : (routes2) => routes2);
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const initialURL = nuxtApp.ssrContext.url;
    const _route = shallowRef(router.currentRoute.value);
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from) => {
      var _a2, _b2, _c2, _d2;
      if (((_b2 = (_a2 = to.matched[0]) == null ? void 0 : _a2.components) == null ? void 0 : _b2.default) === ((_d2 = (_c2 = from.matched[0]) == null ? void 0 : _c2.components) == null ? void 0 : _d2.default)) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key],
        enumerable: true
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware || (nuxtApp._middleware = {
      global: [],
      named: {}
    });
    useError();
    if (!((_c = nuxtApp.ssrContext) == null ? void 0 : _c.islandContext)) {
      router.afterEach(async (to, _from, failure) => {
        delete nuxtApp._processingMiddleware;
        if (failure) {
          await nuxtApp.callHook("page:loading:end");
        }
        if ((failure == null ? void 0 : failure.type) === 4) {
          return;
        }
        if (to.redirectedFrom && to.fullPath !== initialURL) {
          await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
        }
      });
    }
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const resolvedInitialRoute = router.currentRoute.value;
    syncCurrentRoute();
    if ((_d = nuxtApp.ssrContext) == null ? void 0 : _d.islandContext) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      var _a2, _b2, _c2;
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!((_a2 = nuxtApp.ssrContext) == null ? void 0 : _a2.islandContext)) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry of toArray(componentMiddleware)) {
            middlewareEntries.add(entry);
          }
        }
        {
          const routeRules = await nuxtApp.runWithContext(() => getRouteRules({ path: to.path }));
          if (routeRules.appMiddleware) {
            for (const key in routeRules.appMiddleware) {
              if (routeRules.appMiddleware[key]) {
                middlewareEntries.add(key);
              } else {
                middlewareEntries.delete(key);
              }
            }
          }
        }
        for (const entry of middlewareEntries) {
          const middleware = typeof entry === "string" ? nuxtApp._middleware.named[entry] || await ((_c2 = (_b2 = namedMiddleware)[entry]) == null ? void 0 : _c2.call(_b2).then((r) => r.default || r)) : entry;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry}'.`);
          }
          const result = await nuxtApp.runWithContext(() => middleware(to, from));
          {
            if (result === false || result instanceof Error) {
              const error2 = result || createError$1({
                statusCode: 404,
                statusMessage: `Page Not Found: ${initialURL}`
              });
              await nuxtApp.runWithContext(() => showError(error2));
              return false;
            }
          }
          if (result === true) {
            continue;
          }
          if (result || result === false) {
            return result;
          }
        }
      }
    });
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    router.afterEach(async (to, _from) => {
      if (to.matched.length === 0) {
        await nuxtApp.runWithContext(() => showError(createError$1({
          statusCode: 404,
          fatal: false,
          statusMessage: `Page not found: ${to.fullPath}`,
          data: {
            path: to.fullPath
          }
        })));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        if ("name" in resolvedInitialRoute) {
          resolvedInitialRoute.name = void 0;
        }
        await router.replace({
          ...resolvedInitialRoute,
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});

var client = {};

var library;
var hasRequiredLibrary;
function requireLibrary() {
  if (hasRequiredLibrary) return library;
  hasRequiredLibrary = 1;
  var mu = Object.create;
  var Jt = Object.defineProperty;
  var fu = Object.getOwnPropertyDescriptor;
  var gu = Object.getOwnPropertyNames;
  var hu = Object.getPrototypeOf, yu = Object.prototype.hasOwnProperty;
  var Eu = (e10, t, r) => t in e10 ? Jt(e10, t, { enumerable: true, configurable: true, writable: true, value: r }) : e10[t] = r;
  var K = (e10, t) => () => (t || e10((t = { exports: {} }).exports, t), t.exports), Wt = (e10, t) => {
    for (var r in t) Jt(e10, r, { get: t[r], enumerable: true });
  }, Ao = (e10, t, r, n) => {
    if (t && typeof t == "object" || typeof t == "function") for (let i of gu(t)) !yu.call(e10, i) && i !== r && Jt(e10, i, { get: () => t[i], enumerable: !(n = fu(t, i)) || n.enumerable });
    return e10;
  };
  var D = (e10, t, r) => (r = e10 != null ? mu(hu(e10)) : {}, Ao(!e10 || !e10.__esModule ? Jt(r, "default", { value: e10, enumerable: true }) : r, e10)), bu = (e10) => Ao(Jt({}, "__esModule", { value: true }), e10);
  var d = (e10, t, r) => Eu(e10, typeof t != "symbol" ? t + "" : t, r);
  var Zo = K((Kf, pi) => {
    var v = pi.exports;
    pi.exports.default = v;
    var N = "\x1B[", Zt = "\x1B]", gt = "\x07", Kr = ";", zo = process.env.TERM_PROGRAM === "Apple_Terminal";
    v.cursorTo = (e10, t) => {
      if (typeof e10 != "number") throw new TypeError("The `x` argument is required");
      return typeof t != "number" ? N + (e10 + 1) + "G" : N + (t + 1) + ";" + (e10 + 1) + "H";
    };
    v.cursorMove = (e10, t) => {
      if (typeof e10 != "number") throw new TypeError("The `x` argument is required");
      let r = "";
      return e10 < 0 ? r += N + -e10 + "D" : e10 > 0 && (r += N + e10 + "C"), t < 0 ? r += N + -t + "A" : t > 0 && (r += N + t + "B"), r;
    };
    v.cursorUp = (e10 = 1) => N + e10 + "A";
    v.cursorDown = (e10 = 1) => N + e10 + "B";
    v.cursorForward = (e10 = 1) => N + e10 + "C";
    v.cursorBackward = (e10 = 1) => N + e10 + "D";
    v.cursorLeft = N + "G";
    v.cursorSavePosition = zo ? "\x1B7" : N + "s";
    v.cursorRestorePosition = zo ? "\x1B8" : N + "u";
    v.cursorGetPosition = N + "6n";
    v.cursorNextLine = N + "E";
    v.cursorPrevLine = N + "F";
    v.cursorHide = N + "?25l";
    v.cursorShow = N + "?25h";
    v.eraseLines = (e10) => {
      let t = "";
      for (let r = 0; r < e10; r++) t += v.eraseLine + (r < e10 - 1 ? v.cursorUp() : "");
      return e10 && (t += v.cursorLeft), t;
    };
    v.eraseEndLine = N + "K";
    v.eraseStartLine = N + "1K";
    v.eraseLine = N + "2K";
    v.eraseDown = N + "J";
    v.eraseUp = N + "1J";
    v.eraseScreen = N + "2J";
    v.scrollUp = N + "S";
    v.scrollDown = N + "T";
    v.clearScreen = "\x1Bc";
    v.clearTerminal = process.platform === "win32" ? `${v.eraseScreen}${N}0f` : `${v.eraseScreen}${N}3J${N}H`;
    v.beep = gt;
    v.link = (e10, t) => [Zt, "8", Kr, Kr, t, gt, e10, Zt, "8", Kr, Kr, gt].join("");
    v.image = (e10, t = {}) => {
      let r = `${Zt}1337;File=inline=1`;
      return t.width && (r += `;width=${t.width}`), t.height && (r += `;height=${t.height}`), t.preserveAspectRatio === false && (r += ";preserveAspectRatio=0"), r + ":" + e10.toString("base64") + gt;
    };
    v.iTerm = { setCwd: (e10 = process.cwd()) => `${Zt}50;CurrentDir=${e10}${gt}`, annotation: (e10, t = {}) => {
      let r = `${Zt}1337;`, n = typeof t.x < "u", i = typeof t.y < "u";
      if ((n || i) && !(n && i && typeof t.length < "u")) throw new Error("`x`, `y` and `length` must be defined when `x` or `y` is defined");
      return e10 = e10.replace(/\|/g, ""), r += t.isHidden ? "AddHiddenAnnotation=" : "AddAnnotation=", t.length > 0 ? r += (n ? [e10, t.length, t.x, t.y] : [t.length, e10]).join("|") : r += e10, r + gt;
    } };
  });
  var di = K((Yf, Xo) => {
    Xo.exports = (e10, t = process.argv) => {
      let r = e10.startsWith("-") ? "" : e10.length === 1 ? "-" : "--", n = t.indexOf(r + e10), i = t.indexOf("--");
      return n !== -1 && (i === -1 || n < i);
    };
  });
  var rs = K((zf, ts) => {
    var ac = require$$0, es = require$$1, he = di(), { env: W } = process, We;
    he("no-color") || he("no-colors") || he("color=false") || he("color=never") ? We = 0 : (he("color") || he("colors") || he("color=true") || he("color=always")) && (We = 1);
    "FORCE_COLOR" in W && (W.FORCE_COLOR === "true" ? We = 1 : W.FORCE_COLOR === "false" ? We = 0 : We = W.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(W.FORCE_COLOR, 10), 3));
    function mi(e10) {
      return e10 === 0 ? false : { level: e10, hasBasic: true, has256: e10 >= 2, has16m: e10 >= 3 };
    }
    function fi(e10, t) {
      if (We === 0) return 0;
      if (he("color=16m") || he("color=full") || he("color=truecolor")) return 3;
      if (he("color=256")) return 2;
      if (e10 && !t && We === void 0) return 0;
      let r = We || 0;
      if (W.TERM === "dumb") return r;
      if (process.platform === "win32") {
        let n = ac.release().split(".");
        return Number(n[0]) >= 10 && Number(n[2]) >= 10586 ? Number(n[2]) >= 14931 ? 3 : 2 : 1;
      }
      if ("CI" in W) return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((n) => n in W) || W.CI_NAME === "codeship" ? 1 : r;
      if ("TEAMCITY_VERSION" in W) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(W.TEAMCITY_VERSION) ? 1 : 0;
      if (W.COLORTERM === "truecolor") return 3;
      if ("TERM_PROGRAM" in W) {
        let n = parseInt((W.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (W.TERM_PROGRAM) {
          case "iTerm.app":
            return n >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      return /-256(color)?$/i.test(W.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(W.TERM) || "COLORTERM" in W ? 1 : r;
    }
    function lc(e10) {
      let t = fi(e10, e10 && e10.isTTY);
      return mi(t);
    }
    ts.exports = { supportsColor: lc, stdout: mi(fi(true, es.isatty(1))), stderr: mi(fi(true, es.isatty(2))) };
  });
  var os = K((Zf, is) => {
    var uc = rs(), ht = di();
    function ns(e10) {
      if (/^\d{3,4}$/.test(e10)) {
        let r = /(\d{1,2})(\d{2})/.exec(e10);
        return { major: 0, minor: parseInt(r[1], 10), patch: parseInt(r[2], 10) };
      }
      let t = (e10 || "").split(".").map((r) => parseInt(r, 10));
      return { major: t[0], minor: t[1], patch: t[2] };
    }
    function gi(e10) {
      let { env: t } = process;
      if ("FORCE_HYPERLINK" in t) return !(t.FORCE_HYPERLINK.length > 0 && parseInt(t.FORCE_HYPERLINK, 10) === 0);
      if (ht("no-hyperlink") || ht("no-hyperlinks") || ht("hyperlink=false") || ht("hyperlink=never")) return false;
      if (ht("hyperlink=true") || ht("hyperlink=always") || "NETLIFY" in t) return true;
      if (!uc.supportsColor(e10) || e10 && !e10.isTTY || process.platform === "win32" || "CI" in t || "TEAMCITY_VERSION" in t) return false;
      if ("TERM_PROGRAM" in t) {
        let r = ns(t.TERM_PROGRAM_VERSION);
        switch (t.TERM_PROGRAM) {
          case "iTerm.app":
            return r.major === 3 ? r.minor >= 1 : r.major > 3;
          case "WezTerm":
            return r.major >= 20200620;
          case "vscode":
            return r.major > 1 || r.major === 1 && r.minor >= 72;
        }
      }
      if ("VTE_VERSION" in t) {
        if (t.VTE_VERSION === "0.50.0") return false;
        let r = ns(t.VTE_VERSION);
        return r.major > 0 || r.minor >= 50;
      }
      return false;
    }
    is.exports = { supportsHyperlink: gi, stdout: gi(process.stdout), stderr: gi(process.stderr) };
  });
  var as = K((Xf, Xt) => {
    var cc = Zo(), hi = os(), ss = (e10, t, { target: r = "stdout", ...n } = {}) => hi[r] ? cc.link(e10, t) : n.fallback === false ? e10 : typeof n.fallback == "function" ? n.fallback(e10, t) : `${e10} (​${t}​)`;
    Xt.exports = (e10, t, r = {}) => ss(e10, t, r);
    Xt.exports.stderr = (e10, t, r = {}) => ss(e10, t, { target: "stderr", ...r });
    Xt.exports.isSupported = hi.stdout;
    Xt.exports.stderr.isSupported = hi.stderr;
  });
  var us = K((ug, pc) => {
    pc.exports = { name: "@prisma/internals", version: "6.5.0", description: "This package is intended for Prisma's internal use", main: "dist/index.js", types: "dist/index.d.ts", repository: { type: "git", url: "https://github.com/prisma/prisma.git", directory: "packages/internals" }, homepage: "https://www.prisma.io", author: "Tim Suchanek <suchanek@prisma.io>", bugs: "https://github.com/prisma/prisma/issues", license: "Apache-2.0", scripts: { dev: "DEV=true tsx helpers/build.ts", build: "tsx helpers/build.ts", test: "dotenv -e ../../.db.env -- jest --silent", prepublishOnly: "pnpm run build" }, files: ["README.md", "dist", "!**/libquery_engine*", "!dist/get-generators/engines/*", "scripts"], devDependencies: { "@antfu/ni": "0.21.12", "@babel/helper-validator-identifier": "7.25.9", "@opentelemetry/api": "1.9.0", "@swc/core": "1.11.5", "@swc/jest": "0.2.37", "@types/babel__helper-validator-identifier": "7.15.2", "@types/jest": "29.5.14", "@types/node": "18.19.76", "@types/resolve": "1.20.6", archiver: "6.0.2", "checkpoint-client": "1.1.33", "cli-truncate": "4.0.0", dotenv: "16.4.7", esbuild: "0.24.2", "escape-string-regexp": "4.0.0", execa: "5.1.1", "fast-glob": "3.3.3", "find-up": "7.0.0", "fp-ts": "2.16.9", "fs-extra": "11.3.0", "fs-jetpack": "5.1.0", "global-dirs": "4.0.0", globby: "11.1.0", "identifier-regex": "1.0.0", "indent-string": "4.0.0", "is-windows": "1.0.2", "is-wsl": "3.1.0", jest: "29.7.0", "jest-junit": "16.0.0", kleur: "4.1.5", "mock-stdin": "1.0.0", "new-github-issue-url": "0.2.1", "node-fetch": "3.3.2", "npm-packlist": "5.1.3", open: "7.4.2", "p-map": "4.0.0", "read-package-up": "11.0.0", resolve: "1.22.10", "string-width": "4.2.3", "strip-ansi": "6.0.1", "strip-indent": "3.0.0", "temp-dir": "2.0.0", tempy: "1.0.1", "terminal-link": "2.1.1", tmp: "0.2.3", "ts-node": "10.9.2", "ts-pattern": "5.6.2", "ts-toolbelt": "9.6.0", typescript: "5.4.5", yarn: "1.22.22" }, dependencies: { "@prisma/config": "workspace:*", "@prisma/debug": "workspace:*", "@prisma/engines": "workspace:*", "@prisma/fetch-engine": "workspace:*", "@prisma/generator-helper": "workspace:*", "@prisma/get-platform": "workspace:*", "@prisma/prisma-schema-wasm": "6.5.0-73.173f8d54f8d52e692c7e27e72a88314ec7aeff60", "@prisma/schema-files-loader": "workspace:*", arg: "5.0.2", prompts: "2.4.2" }, peerDependencies: { typescript: ">=5.1.0" }, peerDependenciesMeta: { typescript: { optional: true } }, sideEffects: false };
  });
  var bi = K((pg, mc) => {
    mc.exports = { name: "@prisma/engines-version", version: "6.5.0-73.173f8d54f8d52e692c7e27e72a88314ec7aeff60", main: "index.js", types: "index.d.ts", license: "Apache-2.0", author: "Tim Suchanek <suchanek@prisma.io>", prisma: { enginesVersion: "173f8d54f8d52e692c7e27e72a88314ec7aeff60" }, repository: { type: "git", url: "https://github.com/prisma/engines-wrapper.git", directory: "packages/engines-version" }, devDependencies: { "@types/node": "18.19.76", typescript: "4.9.5" }, files: ["index.js", "index.d.ts"], scripts: { build: "tsc -d" } };
  });
  var wi = K((Yr) => {
    Object.defineProperty(Yr, "__esModule", { value: true });
    Yr.enginesVersion = void 0;
    Yr.enginesVersion = bi().prisma.enginesVersion;
  });
  var ds = K((kg, hc) => {
    hc.exports = { name: "dotenv", version: "16.4.7", description: "Loads environment variables from .env file", main: "lib/main.js", types: "lib/main.d.ts", exports: { ".": { types: "./lib/main.d.ts", require: "./lib/main.js", default: "./lib/main.js" }, "./config": "./config.js", "./config.js": "./config.js", "./lib/env-options": "./lib/env-options.js", "./lib/env-options.js": "./lib/env-options.js", "./lib/cli-options": "./lib/cli-options.js", "./lib/cli-options.js": "./lib/cli-options.js", "./package.json": "./package.json" }, scripts: { "dts-check": "tsc --project tests/types/tsconfig.json", lint: "standard", pretest: "npm run lint && npm run dts-check", test: "tap run --allow-empty-coverage --disable-coverage --timeout=60000", "test:coverage": "tap run --show-full-coverage --timeout=60000 --coverage-report=lcov", prerelease: "npm test", release: "standard-version" }, repository: { type: "git", url: "git://github.com/motdotla/dotenv.git" }, funding: "https://dotenvx.com", keywords: ["dotenv", "env", ".env", "environment", "variables", "config", "settings"], readmeFilename: "README.md", license: "BSD-2-Clause", devDependencies: { "@types/node": "^18.11.3", decache: "^4.6.2", sinon: "^14.0.1", standard: "^17.0.0", "standard-version": "^9.5.0", tap: "^19.2.0", typescript: "^4.8.4" }, engines: { node: ">=12" }, browser: { fs: false } };
  });
  var hs = K((Og, Fe) => {
    var Ti = require$$2, Ci = require$$3, yc = require$$0, Ec = require$$4, bc = ds(), Ri = bc.version, wc = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function xc(e10) {
      let t = {}, r = e10.toString();
      r = r.replace(/\r\n?/mg, `
`);
      let n;
      for (; (n = wc.exec(r)) != null; ) {
        let i = n[1], o = n[2] || "";
        o = o.trim();
        let s = o[0];
        o = o.replace(/^(['"`])([\s\S]*)\1$/mg, "$2"), s === '"' && (o = o.replace(/\\n/g, `
`), o = o.replace(/\\r/g, "\r")), t[i] = o;
      }
      return t;
    }
    function Pc(e10) {
      let t = gs(e10), r = G.configDotenv({ path: t });
      if (!r.parsed) {
        let s = new Error(`MISSING_DATA: Cannot parse ${t} for an unknown reason`);
        throw s.code = "MISSING_DATA", s;
      }
      let n = fs(e10).split(","), i = n.length, o;
      for (let s = 0; s < i; s++) try {
        let a = n[s].trim(), l = Cc(r, a);
        o = G.decrypt(l.ciphertext, l.key);
        break;
      } catch (a) {
        if (s + 1 >= i) throw a;
      }
      return G.parse(o);
    }
    function vc(e10) {
      console.log(`[dotenv@${Ri}][INFO] ${e10}`);
    }
    function Tc(e10) {
      console.log(`[dotenv@${Ri}][WARN] ${e10}`);
    }
    function zr(e10) {
      console.log(`[dotenv@${Ri}][DEBUG] ${e10}`);
    }
    function fs(e10) {
      return e10 && e10.DOTENV_KEY && e10.DOTENV_KEY.length > 0 ? e10.DOTENV_KEY : process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0 ? process.env.DOTENV_KEY : "";
    }
    function Cc(e10, t) {
      let r;
      try {
        r = new URL(t);
      } catch (a) {
        if (a.code === "ERR_INVALID_URL") {
          let l = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
          throw l.code = "INVALID_DOTENV_KEY", l;
        }
        throw a;
      }
      let n = r.password;
      if (!n) {
        let a = new Error("INVALID_DOTENV_KEY: Missing key part");
        throw a.code = "INVALID_DOTENV_KEY", a;
      }
      let i = r.searchParams.get("environment");
      if (!i) {
        let a = new Error("INVALID_DOTENV_KEY: Missing environment part");
        throw a.code = "INVALID_DOTENV_KEY", a;
      }
      let o = `DOTENV_VAULT_${i.toUpperCase()}`, s = e10.parsed[o];
      if (!s) {
        let a = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${o} in your .env.vault file.`);
        throw a.code = "NOT_FOUND_DOTENV_ENVIRONMENT", a;
      }
      return { ciphertext: s, key: n };
    }
    function gs(e10) {
      let t = null;
      if (e10 && e10.path && e10.path.length > 0) if (Array.isArray(e10.path)) for (let r of e10.path) Ti.existsSync(r) && (t = r.endsWith(".vault") ? r : `${r}.vault`);
      else t = e10.path.endsWith(".vault") ? e10.path : `${e10.path}.vault`;
      else t = Ci.resolve(process.cwd(), ".env.vault");
      return Ti.existsSync(t) ? t : null;
    }
    function ms(e10) {
      return e10[0] === "~" ? Ci.join(yc.homedir(), e10.slice(1)) : e10;
    }
    function Rc(e10) {
      vc("Loading env from encrypted .env.vault");
      let t = G._parseVault(e10), r = process.env;
      return e10 && e10.processEnv != null && (r = e10.processEnv), G.populate(r, t, e10), { parsed: t };
    }
    function Sc(e10) {
      let t = Ci.resolve(process.cwd(), ".env"), r = "utf8", n = !!(e10 && e10.debug);
      e10 && e10.encoding ? r = e10.encoding : n && zr("No encoding is specified. UTF-8 is used by default");
      let i = [t];
      if (e10 && e10.path) if (!Array.isArray(e10.path)) i = [ms(e10.path)];
      else {
        i = [];
        for (let l of e10.path) i.push(ms(l));
      }
      let o, s = {};
      for (let l of i) try {
        let u = G.parse(Ti.readFileSync(l, { encoding: r }));
        G.populate(s, u, e10);
      } catch (u) {
        n && zr(`Failed to load ${l} ${u.message}`), o = u;
      }
      let a = process.env;
      return e10 && e10.processEnv != null && (a = e10.processEnv), G.populate(a, s, e10), o ? { parsed: s, error: o } : { parsed: s };
    }
    function Ac(e10) {
      if (fs(e10).length === 0) return G.configDotenv(e10);
      let t = gs(e10);
      return t ? G._configVault(e10) : (Tc(`You set DOTENV_KEY but you are missing a .env.vault file at ${t}. Did you forget to build it?`), G.configDotenv(e10));
    }
    function Ic(e10, t) {
      let r = Buffer.from(t.slice(-64), "hex"), n = Buffer.from(e10, "base64"), i = n.subarray(0, 12), o = n.subarray(-16);
      n = n.subarray(12, -16);
      try {
        let s = Ec.createDecipheriv("aes-256-gcm", r, i);
        return s.setAuthTag(o), `${s.update(n)}${s.final()}`;
      } catch (s) {
        let a = s instanceof RangeError, l = s.message === "Invalid key length", u = s.message === "Unsupported state or unable to authenticate data";
        if (a || l) {
          let c = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
          throw c.code = "INVALID_DOTENV_KEY", c;
        } else if (u) {
          let c = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
          throw c.code = "DECRYPTION_FAILED", c;
        } else throw s;
      }
    }
    function kc(e10, t, r = {}) {
      let n = !!(r && r.debug), i = !!(r && r.override);
      if (typeof t != "object") {
        let o = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
        throw o.code = "OBJECT_REQUIRED", o;
      }
      for (let o of Object.keys(t)) Object.prototype.hasOwnProperty.call(e10, o) ? (i === true && (e10[o] = t[o]), n && zr(i === true ? `"${o}" is already defined and WAS overwritten` : `"${o}" is already defined and was NOT overwritten`)) : e10[o] = t[o];
    }
    var G = { configDotenv: Sc, _configVault: Rc, _parseVault: Pc, config: Ac, decrypt: Ic, parse: xc, populate: kc };
    Fe.exports.configDotenv = G.configDotenv;
    Fe.exports._configVault = G._configVault;
    Fe.exports._parseVault = G._parseVault;
    Fe.exports.config = G.config;
    Fe.exports.decrypt = G.decrypt;
    Fe.exports.parse = G.parse;
    Fe.exports.populate = G.populate;
    Fe.exports = G;
  });
  var Ps = K(($g, xs) => {
    xs.exports = (e10) => {
      let t = e10.match(/^[ \t]*(?=\S)/gm);
      return t ? t.reduce((r, n) => Math.min(r, n.length), 1 / 0) : 0;
    };
  });
  var Ts = K((qg, vs) => {
    var Nc = Ps();
    vs.exports = (e10) => {
      let t = Nc(e10);
      if (t === 0) return e10;
      let r = new RegExp(`^[ \\t]{${t}}`, "gm");
      return e10.replace(r, "");
    };
  });
  var Oi = K((Jg, Rs) => {
    Rs.exports = (e10, t = 1, r) => {
      if (r = { indent: " ", includeEmptyLines: false, ...r }, typeof e10 != "string") throw new TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof e10}\``);
      if (typeof t != "number") throw new TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof t}\``);
      if (typeof r.indent != "string") throw new TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof r.indent}\``);
      if (t === 0) return e10;
      let n = r.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
      return e10.replace(n, r.indent.repeat(t));
    };
  });
  var ks = K((Kg, Is) => {
    Is.exports = ({ onlyFirst: e10 = false } = {}) => {
      let t = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"].join("|");
      return new RegExp(t, e10 ? void 0 : "g");
    };
  });
  var Li = K((Yg, Os) => {
    var Bc = ks();
    Os.exports = (e10) => typeof e10 == "string" ? e10.replace(Bc(), "") : e10;
  });
  var _s = K((Xg, tn) => {
    tn.exports = (e10 = {}) => {
      let t;
      if (e10.repoUrl) t = e10.repoUrl;
      else if (e10.user && e10.repo) t = `https://github.com/${e10.user}/${e10.repo}`;
      else throw new Error("You need to specify either the `repoUrl` option or both the `user` and `repo` options");
      let r = new URL(`${t}/issues/new`), n = ["body", "title", "labels", "template", "milestone", "assignee", "projects"];
      for (let i of n) {
        let o = e10[i];
        if (o !== void 0) {
          if (i === "labels" || i === "projects") {
            if (!Array.isArray(o)) throw new TypeError(`The \`${i}\` option should be an array`);
            o = o.join(",");
          }
          r.searchParams.set(i, o);
        }
      }
      return r.toString();
    };
    tn.exports.default = tn.exports;
  });
  var Qi = K((hy, ea) => {
    ea.exports = /* @__PURE__ */ function() {
      function e10(t, r, n, i, o) {
        return t < r || n < r ? t > n ? n + 1 : t + 1 : i === o ? r : r + 1;
      }
      return function(t, r) {
        if (t === r) return 0;
        if (t.length > r.length) {
          var n = t;
          t = r, r = n;
        }
        for (var i = t.length, o = r.length; i > 0 && t.charCodeAt(i - 1) === r.charCodeAt(o - 1); ) i--, o--;
        for (var s = 0; s < i && t.charCodeAt(s) === r.charCodeAt(s); ) s++;
        if (i -= s, o -= s, i === 0 || o < 3) return o;
        var a = 0, l, u, c, p, m, g, h, y, O, T, S, R, _ = [];
        for (l = 0; l < i; l++) _.push(l + 1), _.push(t.charCodeAt(s + l));
        for (var I = _.length - 1; a < o - 3; ) for (O = r.charCodeAt(s + (u = a)), T = r.charCodeAt(s + (c = a + 1)), S = r.charCodeAt(s + (p = a + 2)), R = r.charCodeAt(s + (m = a + 3)), g = a += 4, l = 0; l < I; l += 2) h = _[l], y = _[l + 1], u = e10(h, u, c, O, y), c = e10(u, c, p, T, y), p = e10(c, p, m, S, y), g = e10(p, m, g, R, y), _[l] = g, m = p, p = c, c = u, u = h;
        for (; a < o; ) for (O = r.charCodeAt(s + (u = a)), g = ++a, l = 0; l < I; l += 2) h = _[l], _[l] = g = e10(h, u, g, O, _[l + 1]), u = h;
        return g;
      };
    }();
  });
  var pf = {};
  Wt(pf, { Debug: () => ri, Decimal: () => Ce, Extensions: () => Kn, MetricsClient: () => Dt, PrismaClientInitializationError: () => C, PrismaClientKnownRequestError: () => te, PrismaClientRustPanicError: () => pe, PrismaClientUnknownRequestError: () => U, PrismaClientValidationError: () => re, Public: () => Yn, Sql: () => le, createParam: () => xa, defineDmmfProperty: () => Aa, deserializeJsonResponse: () => Pt, deserializeRawResult: () => Jn, dmmfToRuntimeDataModel: () => Sa, empty: () => Oa, getPrismaClient: () => cu, getRuntime: () => Fn, join: () => ka, makeStrictEnum: () => pu, makeTypedQueryFactory: () => Ia, objectEnumValues: () => Pn, raw: () => Xi, serializeJsonQuery: () => In, skip: () => An, sqltag: () => eo, warnEnvConflicts: () => du, warnOnce: () => or });
  library = bu(pf);
  var Kn = {};
  Wt(Kn, { defineExtension: () => Io, getExtensionContext: () => ko });
  function Io(e10) {
    return typeof e10 == "function" ? e10 : (t) => t.$extends(e10);
  }
  function ko(e10) {
    return e10;
  }
  var Yn = {};
  Wt(Yn, { validator: () => Oo });
  function Oo(...e10) {
    return (t) => t;
  }
  function zn(e10) {
    return e10.name === "DriverAdapterError" && typeof e10.cause == "object";
  }
  function qr(e10) {
    return { ok: true, value: e10, map(t) {
      return qr(t(e10));
    }, flatMap(t) {
      return t(e10);
    } };
  }
  function nt(e10) {
    return { ok: false, error: e10, map() {
      return nt(e10);
    }, flatMap() {
      return nt(e10);
    } };
  }
  var Zn = class {
    constructor() {
      d(this, "registeredErrors", []);
    }
    consumeError(t) {
      return this.registeredErrors[t];
    }
    registerNewError(t) {
      let r = 0;
      for (; this.registeredErrors[r] !== void 0; ) r++;
      return this.registeredErrors[r] = { error: t }, r;
    }
  }, Xn = (e10) => {
    let t = new Zn(), r = me(t, e10.transactionContext.bind(e10)), n = { adapterName: e10.adapterName, errorRegistry: t, queryRaw: me(t, e10.queryRaw.bind(e10)), executeRaw: me(t, e10.executeRaw.bind(e10)), executeScript: me(t, e10.executeScript.bind(e10)), dispose: me(t, e10.dispose.bind(e10)), provider: e10.provider, transactionContext: async (...i) => (await r(...i)).map((s) => wu(t, s)) };
    return e10.getConnectionInfo && (n.getConnectionInfo = Pu(t, e10.getConnectionInfo.bind(e10))), n;
  }, wu = (e10, t) => {
    let r = me(e10, t.startTransaction.bind(t));
    return { adapterName: t.adapterName, provider: t.provider, queryRaw: me(e10, t.queryRaw.bind(t)), executeRaw: me(e10, t.executeRaw.bind(t)), startTransaction: async (...n) => (await r(...n)).map((o) => xu(e10, o)) };
  }, xu = (e10, t) => ({ adapterName: t.adapterName, provider: t.provider, options: t.options, queryRaw: me(e10, t.queryRaw.bind(t)), executeRaw: me(e10, t.executeRaw.bind(t)), commit: me(e10, t.commit.bind(t)), rollback: me(e10, t.rollback.bind(t)) });
  function me(e10, t) {
    return async (...r) => {
      try {
        return qr(await t(...r));
      } catch (n) {
        if (zn(n)) return nt(n.cause);
        let i = e10.registerNewError(n);
        return nt({ kind: "GenericJs", id: i });
      }
    };
  }
  function Pu(e10, t) {
    return (...r) => {
      try {
        return qr(t(...r));
      } catch (n) {
        if (zn(n)) return nt(n.cause);
        let i = e10.registerNewError(n);
        return nt({ kind: "GenericJs", id: i });
      }
    };
  }
  var Vr = {};
  Wt(Vr, { $: () => Fo, bgBlack: () => _u, bgBlue: () => Fu, bgCyan: () => $u, bgGreen: () => Nu, bgMagenta: () => Mu, bgRed: () => Du, bgWhite: () => qu, bgYellow: () => Lu, black: () => Au, blue: () => it, bold: () => Y, cyan: () => Ne, dim: () => _e, gray: () => Ht, green: () => je, grey: () => Ou, hidden: () => Ru, inverse: () => Cu, italic: () => Tu, magenta: () => Iu, red: () => fe, reset: () => vu, strikethrough: () => Su, underline: () => ee, white: () => ku, yellow: () => De });
  var ei, _o, Do, No, Lo = true;
  typeof process < "u" && ({ FORCE_COLOR: ei, NODE_DISABLE_COLORS: _o, NO_COLOR: Do, TERM: No } = process.env || {}, Lo = process.stdout && process.stdout.isTTY);
  var Fo = { enabled: !_o && Do == null && No !== "dumb" && (ei != null && ei !== "0" || Lo) };
  function q(e10, t) {
    let r = new RegExp(`\\x1b\\[${t}m`, "g"), n = `\x1B[${e10}m`, i = `\x1B[${t}m`;
    return function(o) {
      return !Fo.enabled || o == null ? o : n + (~("" + o).indexOf(i) ? o.replace(r, i + n) : o) + i;
    };
  }
  var vu = q(0, 0), Y = q(1, 22), _e = q(2, 22), Tu = q(3, 23), ee = q(4, 24), Cu = q(7, 27), Ru = q(8, 28), Su = q(9, 29), Au = q(30, 39), fe = q(31, 39), je = q(32, 39), De = q(33, 39), it = q(34, 39), Iu = q(35, 39), Ne = q(36, 39), ku = q(37, 39), Ht = q(90, 39), Ou = q(90, 39), _u = q(40, 49), Du = q(41, 49), Nu = q(42, 49), Lu = q(43, 49), Fu = q(44, 49), Mu = q(45, 49), $u = q(46, 49), qu = q(47, 49);
  var Vu = 100, Mo = ["green", "yellow", "blue", "magenta", "cyan", "red"], Kt = [], $o = Date.now(), ju = 0, ti = typeof process < "u" ? process.env : {};
  globalThis.DEBUG ?? (globalThis.DEBUG = ti.DEBUG ?? "");
  globalThis.DEBUG_COLORS ?? (globalThis.DEBUG_COLORS = ti.DEBUG_COLORS ? ti.DEBUG_COLORS === "true" : true);
  var Yt = { enable(e10) {
    typeof e10 == "string" && (globalThis.DEBUG = e10);
  }, disable() {
    let e10 = globalThis.DEBUG;
    return globalThis.DEBUG = "", e10;
  }, enabled(e10) {
    let t = globalThis.DEBUG.split(",").map((i) => i.replace(/[.+?^${}()|[\]\\]/g, "\\$&")), r = t.some((i) => i === "" || i[0] === "-" ? false : e10.match(RegExp(i.split("*").join(".*") + "$"))), n = t.some((i) => i === "" || i[0] !== "-" ? false : e10.match(RegExp(i.slice(1).split("*").join(".*") + "$")));
    return r && !n;
  }, log: (...e10) => {
    let [t, r, ...n] = e10;
    (console.warn ?? console.log)(`${t} ${r}`, ...n);
  }, formatters: {} };
  function Bu(e10) {
    let t = { color: Mo[ju++ % Mo.length], enabled: Yt.enabled(e10), namespace: e10, log: Yt.log, extend: () => {
    } }, r = (...n) => {
      let { enabled: i, namespace: o, color: s, log: a } = t;
      if (n.length !== 0 && Kt.push([o, ...n]), Kt.length > Vu && Kt.shift(), Yt.enabled(o) || i) {
        let l = n.map((c) => typeof c == "string" ? c : Uu(c)), u = `+${Date.now() - $o}ms`;
        $o = Date.now(), globalThis.DEBUG_COLORS ? a(Vr[s](Y(o)), ...l, Vr[s](u)) : a(o, ...l, u);
      }
    };
    return new Proxy(r, { get: (n, i) => t[i], set: (n, i, o) => t[i] = o });
  }
  var ri = new Proxy(Bu, { get: (e10, t) => Yt[t], set: (e10, t, r) => Yt[t] = r });
  function Uu(e10, t = 2) {
    let r = /* @__PURE__ */ new Set();
    return JSON.stringify(e10, (n, i) => {
      if (typeof i == "object" && i !== null) {
        if (r.has(i)) return "[Circular *]";
        r.add(i);
      } else if (typeof i == "bigint") return i.toString();
      return i;
    }, t);
  }
  function qo(e10 = 7500) {
    let t = Kt.map(([r, ...n]) => `${r} ${n.map((i) => typeof i == "string" ? i : JSON.stringify(i)).join(" ")}`).join(`
`);
    return t.length < e10 ? t : t.slice(-e10);
  }
  function Vo() {
    Kt.length = 0;
  }
  var M = ri;
  var jo = D(require$$2);
  function ni() {
    let e10 = process.env.PRISMA_QUERY_ENGINE_LIBRARY;
    if (!(e10 && jo.default.existsSync(e10)) && process.arch === "ia32") throw new Error('The default query engine type (Node-API, "library") is currently not supported for 32bit Node. Please set `engineType = "binary"` in the "generator" block of your "schema.prisma" file (or use the environment variables "PRISMA_CLIENT_ENGINE_TYPE=binary" and/or "PRISMA_CLI_QUERY_ENGINE_TYPE=binary".)');
  }
  var ii = ["darwin", "darwin-arm64", "debian-openssl-1.0.x", "debian-openssl-1.1.x", "debian-openssl-3.0.x", "rhel-openssl-1.0.x", "rhel-openssl-1.1.x", "rhel-openssl-3.0.x", "linux-arm64-openssl-1.1.x", "linux-arm64-openssl-1.0.x", "linux-arm64-openssl-3.0.x", "linux-arm-openssl-1.1.x", "linux-arm-openssl-1.0.x", "linux-arm-openssl-3.0.x", "linux-musl", "linux-musl-openssl-3.0.x", "linux-musl-arm64-openssl-1.1.x", "linux-musl-arm64-openssl-3.0.x", "linux-nixos", "linux-static-x64", "linux-static-arm64", "windows", "freebsd11", "freebsd12", "freebsd13", "freebsd14", "freebsd15", "openbsd", "netbsd", "arm"];
  var jr = "libquery_engine";
  function Br(e10, t) {
    return e10.includes("windows") ? `query_engine-${e10}.dll.node` : e10.includes("darwin") ? `${jr}-${e10}.dylib.node` : `${jr}-${e10}.so.node`;
  }
  var Go = D(require$$5), ui = D(require$$6), Wr = D(require$$0);
  var Le = Symbol.for("@ts-pattern/matcher"), Qu = Symbol.for("@ts-pattern/isVariadic"), Qr = "@ts-pattern/anonymous-select-key", oi = (e10) => !!(e10 && typeof e10 == "object"), Ur = (e10) => e10 && !!e10[Le], Pe = (e10, t, r) => {
    if (Ur(e10)) {
      let n = e10[Le](), { matched: i, selections: o } = n.match(t);
      return i && o && Object.keys(o).forEach((s) => r(s, o[s])), i;
    }
    if (oi(e10)) {
      if (!oi(t)) return false;
      if (Array.isArray(e10)) {
        if (!Array.isArray(t)) return false;
        let n = [], i = [], o = [];
        for (let s of e10.keys()) {
          let a = e10[s];
          Ur(a) && a[Qu] ? o.push(a) : o.length ? i.push(a) : n.push(a);
        }
        if (o.length) {
          if (o.length > 1) throw new Error("Pattern error: Using `...P.array(...)` several times in a single pattern is not allowed.");
          if (t.length < n.length + i.length) return false;
          let s = t.slice(0, n.length), a = i.length === 0 ? [] : t.slice(-i.length), l = t.slice(n.length, i.length === 0 ? 1 / 0 : -i.length);
          return n.every((u, c) => Pe(u, s[c], r)) && i.every((u, c) => Pe(u, a[c], r)) && (o.length === 0 || Pe(o[0], l, r));
        }
        return e10.length === t.length && e10.every((s, a) => Pe(s, t[a], r));
      }
      return Reflect.ownKeys(e10).every((n) => {
        let i = e10[n];
        return (n in t || Ur(o = i) && o[Le]().matcherType === "optional") && Pe(i, t[n], r);
        var o;
      });
    }
    return Object.is(t, e10);
  }, Je = (e10) => {
    var t, r, n;
    return oi(e10) ? Ur(e10) ? (t = (r = (n = e10[Le]()).getSelectionKeys) == null ? void 0 : r.call(n)) != null ? t : [] : Array.isArray(e10) ? zt(e10, Je) : zt(Object.values(e10), Je) : [];
  }, zt = (e10, t) => e10.reduce((r, n) => r.concat(t(n)), []);
  function ge(e10) {
    return Object.assign(e10, { optional: () => Gu(e10), and: (t) => B(e10, t), or: (t) => Ju(e10, t), select: (t) => t === void 0 ? Bo(e10) : Bo(t, e10) });
  }
  function Gu(e10) {
    return ge({ [Le]: () => ({ match: (t) => {
      let r = {}, n = (i, o) => {
        r[i] = o;
      };
      return t === void 0 ? (Je(e10).forEach((i) => n(i, void 0)), { matched: true, selections: r }) : { matched: Pe(e10, t, n), selections: r };
    }, getSelectionKeys: () => Je(e10), matcherType: "optional" }) });
  }
  function B(...e10) {
    return ge({ [Le]: () => ({ match: (t) => {
      let r = {}, n = (i, o) => {
        r[i] = o;
      };
      return { matched: e10.every((i) => Pe(i, t, n)), selections: r };
    }, getSelectionKeys: () => zt(e10, Je), matcherType: "and" }) });
  }
  function Ju(...e10) {
    return ge({ [Le]: () => ({ match: (t) => {
      let r = {}, n = (i, o) => {
        r[i] = o;
      };
      return zt(e10, Je).forEach((i) => n(i, void 0)), { matched: e10.some((i) => Pe(i, t, n)), selections: r };
    }, getSelectionKeys: () => zt(e10, Je), matcherType: "or" }) });
  }
  function k(e10) {
    return { [Le]: () => ({ match: (t) => ({ matched: !!e10(t) }) }) };
  }
  function Bo(...e10) {
    let t = typeof e10[0] == "string" ? e10[0] : void 0, r = e10.length === 2 ? e10[1] : typeof e10[0] == "string" ? void 0 : e10[0];
    return ge({ [Le]: () => ({ match: (n) => {
      let i = { [t ?? Qr]: n };
      return { matched: r === void 0 || Pe(r, n, (o, s) => {
        i[o] = s;
      }), selections: i };
    }, getSelectionKeys: () => [t ?? Qr].concat(r === void 0 ? [] : Je(r)) }) });
  }
  function we(e10) {
    return typeof e10 == "number";
  }
  function Be(e10) {
    return typeof e10 == "string";
  }
  function Ue(e10) {
    return typeof e10 == "bigint";
  }
  ge(k(function(e10) {
    return true;
  }));
  var Qe = (e10) => Object.assign(ge(e10), { startsWith: (t) => {
    return Qe(B(e10, (r = t, k((n) => Be(n) && n.startsWith(r)))));
    var r;
  }, endsWith: (t) => {
    return Qe(B(e10, (r = t, k((n) => Be(n) && n.endsWith(r)))));
    var r;
  }, minLength: (t) => Qe(B(e10, ((r) => k((n) => Be(n) && n.length >= r))(t))), length: (t) => Qe(B(e10, ((r) => k((n) => Be(n) && n.length === r))(t))), maxLength: (t) => Qe(B(e10, ((r) => k((n) => Be(n) && n.length <= r))(t))), includes: (t) => {
    return Qe(B(e10, (r = t, k((n) => Be(n) && n.includes(r)))));
    var r;
  }, regex: (t) => {
    return Qe(B(e10, (r = t, k((n) => Be(n) && !!n.match(r)))));
    var r;
  } });
  Qe(k(Be));
  var xe = (e10) => Object.assign(ge(e10), { between: (t, r) => xe(B(e10, ((n, i) => k((o) => we(o) && n <= o && i >= o))(t, r))), lt: (t) => xe(B(e10, ((r) => k((n) => we(n) && n < r))(t))), gt: (t) => xe(B(e10, ((r) => k((n) => we(n) && n > r))(t))), lte: (t) => xe(B(e10, ((r) => k((n) => we(n) && n <= r))(t))), gte: (t) => xe(B(e10, ((r) => k((n) => we(n) && n >= r))(t))), int: () => xe(B(e10, k((t) => we(t) && Number.isInteger(t)))), finite: () => xe(B(e10, k((t) => we(t) && Number.isFinite(t)))), positive: () => xe(B(e10, k((t) => we(t) && t > 0))), negative: () => xe(B(e10, k((t) => we(t) && t < 0))) });
  xe(k(we));
  var Ge = (e10) => Object.assign(ge(e10), { between: (t, r) => Ge(B(e10, ((n, i) => k((o) => Ue(o) && n <= o && i >= o))(t, r))), lt: (t) => Ge(B(e10, ((r) => k((n) => Ue(n) && n < r))(t))), gt: (t) => Ge(B(e10, ((r) => k((n) => Ue(n) && n > r))(t))), lte: (t) => Ge(B(e10, ((r) => k((n) => Ue(n) && n <= r))(t))), gte: (t) => Ge(B(e10, ((r) => k((n) => Ue(n) && n >= r))(t))), positive: () => Ge(B(e10, k((t) => Ue(t) && t > 0))), negative: () => Ge(B(e10, k((t) => Ue(t) && t < 0))) });
  Ge(k(Ue));
  ge(k(function(e10) {
    return typeof e10 == "boolean";
  }));
  ge(k(function(e10) {
    return typeof e10 == "symbol";
  }));
  ge(k(function(e10) {
    return e10 == null;
  }));
  ge(k(function(e10) {
    return e10 != null;
  }));
  var si = class extends Error {
    constructor(t) {
      let r;
      try {
        r = JSON.stringify(t);
      } catch {
        r = t;
      }
      super(`Pattern matching error: no pattern matches value ${r}`), this.input = void 0, this.input = t;
    }
  }, ai = { matched: false, value: void 0 };
  function ft(e10) {
    return new li(e10, ai);
  }
  var li = class e {
    constructor(t, r) {
      this.input = void 0, this.state = void 0, this.input = t, this.state = r;
    }
    with(...t) {
      if (this.state.matched) return this;
      let r = t[t.length - 1], n = [t[0]], i;
      t.length === 3 && typeof t[1] == "function" ? i = t[1] : t.length > 2 && n.push(...t.slice(1, t.length - 1));
      let o = false, s = {}, a = (u, c) => {
        o = true, s[u] = c;
      }, l = !n.some((u) => Pe(u, this.input, a)) || i && !i(this.input) ? ai : { matched: true, value: r(o ? Qr in s ? s[Qr] : s : this.input, this.input) };
      return new e(this.input, l);
    }
    when(t, r) {
      if (this.state.matched) return this;
      let n = !!t(this.input);
      return new e(this.input, n ? { matched: true, value: r(this.input, this.input) } : ai);
    }
    otherwise(t) {
      return this.state.matched ? this.state.value : t(this.input);
    }
    exhaustive() {
      if (this.state.matched) return this.state.value;
      throw new si(this.input);
    }
    run() {
      return this.exhaustive();
    }
    returnType() {
      return this;
    }
  };
  var Jo = require$$7;
  var Wu = { warn: De("prisma:warn") }, Hu = { warn: () => !process.env.PRISMA_DISABLE_WARNINGS };
  function Gr(e10, ...t) {
    Hu.warn() && console.warn(`${Wu.warn} ${e10}`, ...t);
  }
  var Ku = (0, Jo.promisify)(Go.default.exec), ie = M("prisma:get-platform"), Yu = ["1.0.x", "1.1.x", "3.0.x"];
  async function Wo() {
    let e10 = Wr.default.platform(), t = process.arch;
    if (e10 === "freebsd") {
      let s = await Hr("freebsd-version");
      if (s && s.trim().length > 0) {
        let l = /^(\d+)\.?/.exec(s);
        if (l) return { platform: "freebsd", targetDistro: `freebsd${l[1]}`, arch: t };
      }
    }
    if (e10 !== "linux") return { platform: e10, arch: t };
    let r = await Zu(), n = await sc(), i = ec({ arch: t, archFromUname: n, familyDistro: r.familyDistro }), { libssl: o } = await tc(i);
    return { platform: "linux", libssl: o, arch: t, archFromUname: n, ...r };
  }
  function zu(e10) {
    let t = /^ID="?([^"\n]*)"?$/im, r = /^ID_LIKE="?([^"\n]*)"?$/im, n = t.exec(e10), i = n && n[1] && n[1].toLowerCase() || "", o = r.exec(e10), s = o && o[1] && o[1].toLowerCase() || "", a = ft({ id: i, idLike: s }).with({ id: "alpine" }, ({ id: l }) => ({ targetDistro: "musl", familyDistro: l, originalDistro: l })).with({ id: "raspbian" }, ({ id: l }) => ({ targetDistro: "arm", familyDistro: "debian", originalDistro: l })).with({ id: "nixos" }, ({ id: l }) => ({ targetDistro: "nixos", originalDistro: l, familyDistro: "nixos" })).with({ id: "debian" }, { id: "ubuntu" }, ({ id: l }) => ({ targetDistro: "debian", familyDistro: "debian", originalDistro: l })).with({ id: "rhel" }, { id: "centos" }, { id: "fedora" }, ({ id: l }) => ({ targetDistro: "rhel", familyDistro: "rhel", originalDistro: l })).when(({ idLike: l }) => l.includes("debian") || l.includes("ubuntu"), ({ id: l }) => ({ targetDistro: "debian", familyDistro: "debian", originalDistro: l })).when(({ idLike: l }) => i === "arch" || l.includes("arch"), ({ id: l }) => ({ targetDistro: "debian", familyDistro: "arch", originalDistro: l })).when(({ idLike: l }) => l.includes("centos") || l.includes("fedora") || l.includes("rhel") || l.includes("suse"), ({ id: l }) => ({ targetDistro: "rhel", familyDistro: "rhel", originalDistro: l })).otherwise(({ id: l }) => ({ targetDistro: void 0, familyDistro: void 0, originalDistro: l }));
    return ie(`Found distro info:
${JSON.stringify(a, null, 2)}`), a;
  }
  async function Zu() {
    let e10 = "/etc/os-release";
    try {
      let t = await ui.default.readFile(e10, { encoding: "utf-8" });
      return zu(t);
    } catch {
      return { targetDistro: void 0, familyDistro: void 0, originalDistro: void 0 };
    }
  }
  function Xu(e10) {
    let t = /^OpenSSL\s(\d+\.\d+)\.\d+/.exec(e10);
    if (t) {
      let r = `${t[1]}.x`;
      return Ho(r);
    }
  }
  function Uo(e10) {
    let t = /libssl\.so\.(\d)(\.\d)?/.exec(e10);
    if (t) {
      let r = `${t[1]}${t[2] ?? ".0"}.x`;
      return Ho(r);
    }
  }
  function Ho(e10) {
    let t = (() => {
      if (Yo(e10)) return e10;
      let r = e10.split(".");
      return r[1] = "0", r.join(".");
    })();
    if (Yu.includes(t)) return t;
  }
  function ec(e10) {
    return ft(e10).with({ familyDistro: "musl" }, () => (ie('Trying platform-specific paths for "alpine"'), ["/lib", "/usr/lib"])).with({ familyDistro: "debian" }, ({ archFromUname: t }) => (ie('Trying platform-specific paths for "debian" (and "ubuntu")'), [`/usr/lib/${t}-linux-gnu`, `/lib/${t}-linux-gnu`])).with({ familyDistro: "rhel" }, () => (ie('Trying platform-specific paths for "rhel"'), ["/lib64", "/usr/lib64"])).otherwise(({ familyDistro: t, arch: r, archFromUname: n }) => (ie(`Don't know any platform-specific paths for "${t}" on ${r} (${n})`), []));
  }
  async function tc(e10) {
    let t = 'grep -v "libssl.so.0"', r = await Qo(e10);
    if (r) {
      ie(`Found libssl.so file using platform-specific paths: ${r}`);
      let o = Uo(r);
      if (ie(`The parsed libssl version is: ${o}`), o) return { libssl: o, strategy: "libssl-specific-path" };
    }
    ie('Falling back to "ldconfig" and other generic paths');
    let n = await Hr(`ldconfig -p | sed "s/.*=>s*//" | sed "s|.*/||" | grep libssl | sort | ${t}`);
    if (n || (n = await Qo(["/lib64", "/usr/lib64", "/lib", "/usr/lib"])), n) {
      ie(`Found libssl.so file using "ldconfig" or other generic paths: ${n}`);
      let o = Uo(n);
      if (ie(`The parsed libssl version is: ${o}`), o) return { libssl: o, strategy: "ldconfig" };
    }
    let i = await Hr("openssl version -v");
    if (i) {
      ie(`Found openssl binary with version: ${i}`);
      let o = Xu(i);
      if (ie(`The parsed openssl version is: ${o}`), o) return { libssl: o, strategy: "openssl-binary" };
    }
    return ie("Couldn't find any version of libssl or OpenSSL in the system"), {};
  }
  async function Qo(e10) {
    for (let t of e10) {
      let r = await rc(t);
      if (r) return r;
    }
  }
  async function rc(e10) {
    try {
      return (await ui.default.readdir(e10)).find((r) => r.startsWith("libssl.so.") && !r.startsWith("libssl.so.0"));
    } catch (t) {
      if (t.code === "ENOENT") return;
      throw t;
    }
  }
  async function ot() {
    let { binaryTarget: e10 } = await Ko();
    return e10;
  }
  function nc(e10) {
    return e10.binaryTarget !== void 0;
  }
  async function ci() {
    let { memoized: e10, ...t } = await Ko();
    return t;
  }
  var Jr = {};
  async function Ko() {
    if (nc(Jr)) return Promise.resolve({ ...Jr, memoized: true });
    let e10 = await Wo(), t = ic(e10);
    return Jr = { ...e10, binaryTarget: t }, { ...Jr, memoized: false };
  }
  function ic(e10) {
    let { platform: t, arch: r, archFromUname: n, libssl: i, targetDistro: o, familyDistro: s, originalDistro: a } = e10;
    t === "linux" && !["x64", "arm64"].includes(r) && Gr(`Prisma only officially supports Linux on amd64 (x86_64) and arm64 (aarch64) system architectures (detected "${r}" instead). If you are using your own custom Prisma engines, you can ignore this warning, as long as you've compiled the engines for your system architecture "${n}".`);
    let l = "1.1.x";
    if (t === "linux" && i === void 0) {
      let c = ft({ familyDistro: s }).with({ familyDistro: "debian" }, () => "Please manually install OpenSSL via `apt-get update -y && apt-get install -y openssl` and try installing Prisma again. If you're running Prisma on Docker, add this command to your Dockerfile, or switch to an image that already has OpenSSL installed.").otherwise(() => "Please manually install OpenSSL and try installing Prisma again.");
      Gr(`Prisma failed to detect the libssl/openssl version to use, and may not work as expected. Defaulting to "openssl-${l}".
${c}`);
    }
    let u = "debian";
    if (t === "linux" && o === void 0 && ie(`Distro is "${a}". Falling back to Prisma engines built for "${u}".`), t === "darwin" && r === "arm64") return "darwin-arm64";
    if (t === "darwin") return "darwin";
    if (t === "win32") return "windows";
    if (t === "freebsd") return o;
    if (t === "openbsd") return "openbsd";
    if (t === "netbsd") return "netbsd";
    if (t === "linux" && o === "nixos") return "linux-nixos";
    if (t === "linux" && r === "arm64") return `${o === "musl" ? "linux-musl-arm64" : "linux-arm64"}-openssl-${i || l}`;
    if (t === "linux" && r === "arm") return `linux-arm-openssl-${i || l}`;
    if (t === "linux" && o === "musl") {
      let c = "linux-musl";
      return !i || Yo(i) ? c : `${c}-openssl-${i}`;
    }
    return t === "linux" && o && i ? `${o}-openssl-${i}` : (t !== "linux" && Gr(`Prisma detected unknown OS "${t}" and may not work as expected. Defaulting to "linux".`), i ? `${u}-openssl-${i}` : o ? `${o}-openssl-${l}` : `${u}-openssl-${l}`);
  }
  async function oc(e10) {
    try {
      return await e10();
    } catch {
      return;
    }
  }
  function Hr(e10) {
    return oc(async () => {
      let t = await Ku(e10);
      return ie(`Command "${e10}" successfully returned "${t.stdout}"`), t.stdout;
    });
  }
  async function sc() {
    var _a2;
    return typeof Wr.default.machine == "function" ? Wr.default.machine() : (_a2 = await Hr("uname -m")) == null ? void 0 : _a2.trim();
  }
  function Yo(e10) {
    return e10.startsWith("1.");
  }
  var ls = D(as());
  function yi(e10) {
    return (0, ls.default)(e10, e10, { fallback: ee });
  }
  var dc = us(), Ei = dc.version;
  D(wi());
  var V = D(require$$3);
  D(wi());
  M("prisma:engines");
  function cs() {
    return V.default.join(globalThis._importMeta_.url, "../");
  }
  V.default.join(globalThis._importMeta_.url, "../query-engine-darwin");
  V.default.join(globalThis._importMeta_.url, "../query-engine-darwin-arm64");
  V.default.join(globalThis._importMeta_.url, "../query-engine-debian-openssl-1.0.x");
  V.default.join(globalThis._importMeta_.url, "../query-engine-debian-openssl-1.1.x");
  V.default.join(globalThis._importMeta_.url, "../query-engine-debian-openssl-3.0.x");
  V.default.join(globalThis._importMeta_.url, "../query-engine-linux-static-x64");
  V.default.join(globalThis._importMeta_.url, "../query-engine-linux-static-arm64");
  V.default.join(globalThis._importMeta_.url, "../query-engine-rhel-openssl-1.0.x");
  V.default.join(globalThis._importMeta_.url, "../query-engine-rhel-openssl-1.1.x");
  V.default.join(globalThis._importMeta_.url, "../query-engine-rhel-openssl-3.0.x");
  V.default.join(globalThis._importMeta_.url, "../libquery_engine-darwin.dylib.node");
  V.default.join(globalThis._importMeta_.url, "../libquery_engine-darwin-arm64.dylib.node");
  V.default.join(globalThis._importMeta_.url, "../libquery_engine-debian-openssl-1.0.x.so.node");
  V.default.join(globalThis._importMeta_.url, "../libquery_engine-debian-openssl-1.1.x.so.node");
  V.default.join(globalThis._importMeta_.url, "../libquery_engine-debian-openssl-3.0.x.so.node");
  V.default.join(globalThis._importMeta_.url, "../libquery_engine-linux-arm64-openssl-1.0.x.so.node");
  V.default.join(globalThis._importMeta_.url, "../libquery_engine-linux-arm64-openssl-1.1.x.so.node");
  V.default.join(globalThis._importMeta_.url, "../libquery_engine-linux-arm64-openssl-3.0.x.so.node");
  V.default.join(globalThis._importMeta_.url, "../libquery_engine-linux-musl.so.node");
  V.default.join(globalThis._importMeta_.url, "../libquery_engine-linux-musl-openssl-3.0.x.so.node");
  V.default.join(globalThis._importMeta_.url, "../libquery_engine-rhel-openssl-1.0.x.so.node");
  V.default.join(globalThis._importMeta_.url, "../libquery_engine-rhel-openssl-1.1.x.so.node");
  V.default.join(globalThis._importMeta_.url, "../libquery_engine-rhel-openssl-3.0.x.so.node");
  V.default.join(globalThis._importMeta_.url, "../query_engine-windows.dll.node");
  D(require$$2);
  M("chmodPlusX");
  function vi(e10) {
    let t = e10.e, r = (a) => `Prisma cannot find the required \`${a}\` system library in your system`, n = t.message.includes("cannot open shared object file"), i = `Please refer to the documentation about Prisma's system requirements: ${yi("https://pris.ly/d/system-requirements")}`, o = `Unable to require(\`${_e(e10.id)}\`).`, s = ft({ message: t.message, code: t.code }).with({ code: "ENOENT" }, () => "File does not exist.").when(({ message: a }) => n && a.includes("libz"), () => `${r("libz")}. Please install it and try again.`).when(({ message: a }) => n && a.includes("libgcc_s"), () => `${r("libgcc_s")}. Please install it and try again.`).when(({ message: a }) => n && a.includes("libssl"), () => {
      let a = e10.platformInfo.libssl ? `openssl-${e10.platformInfo.libssl}` : "openssl";
      return `${r("libssl")}. Please install ${a} and try again.`;
    }).when(({ message: a }) => a.includes("GLIBC"), () => `Prisma has detected an incompatible version of the \`glibc\` C standard library installed in your system. This probably means your system may be too old to run Prisma. ${i}`).when(({ message: a }) => e10.platformInfo.platform === "linux" && a.includes("symbol not found"), () => `The Prisma engines are not compatible with your system ${e10.platformInfo.originalDistro} on (${e10.platformInfo.archFromUname}) which uses the \`${e10.platformInfo.binaryTarget}\` binaryTarget by default. ${i}`).otherwise(() => `The Prisma engines do not seem to be compatible with your system. ${i}`);
    return `${o}
${s}

Details: ${t.message}`;
  }
  var Ai = D(hs()), Zr = D(require$$2);
  var yt = D(require$$3);
  function ys(e10) {
    let t = e10.ignoreProcessEnv ? {} : process.env, r = (n) => {
      var _a2;
      return ((_a2 = n.match(/(.?\${(?:[a-zA-Z0-9_]+)?})/g)) == null ? void 0 : _a2.reduce(function(o, s) {
        let a = /(.?)\${([a-zA-Z0-9_]+)?}/g.exec(s);
        if (!a) return o;
        let l = a[1], u, c;
        if (l === "\\") c = a[0], u = c.replace("\\$", "$");
        else {
          let p = a[2];
          c = a[0].substring(l.length), u = Object.hasOwnProperty.call(t, p) ? t[p] : e10.parsed[p] || "", u = r(u);
        }
        return o.replace(c, u);
      }, n)) ?? n;
    };
    for (let n in e10.parsed) {
      let i = Object.hasOwnProperty.call(t, n) ? t[n] : e10.parsed[n];
      e10.parsed[n] = r(i);
    }
    for (let n in e10.parsed) t[n] = e10.parsed[n];
    return e10;
  }
  var Si = M("prisma:tryLoadEnv");
  function er({ rootEnvPath: e10, schemaEnvPath: t }, r = { conflictCheck: "none" }) {
    var _a2, _b;
    let n = Es(e10);
    r.conflictCheck !== "none" && Oc(n, t, r.conflictCheck);
    let i = null;
    return bs(n == null ? void 0 : n.path, t) || (i = Es(t)), !n && !i && Si("No Environment variables loaded"), (i == null ? void 0 : i.dotenvResult.error) ? console.error(fe(Y("Schema Env Error: ")) + i.dotenvResult.error) : { message: [n == null ? void 0 : n.message, i == null ? void 0 : i.message].filter(Boolean).join(`
`), parsed: { ...(_a2 = n == null ? void 0 : n.dotenvResult) == null ? void 0 : _a2.parsed, ...(_b = i == null ? void 0 : i.dotenvResult) == null ? void 0 : _b.parsed } };
  }
  function Oc(e10, t, r) {
    let n = e10 == null ? void 0 : e10.dotenvResult.parsed, i = !bs(e10 == null ? void 0 : e10.path, t);
    if (n && t && i && Zr.default.existsSync(t)) {
      let o = Ai.default.parse(Zr.default.readFileSync(t)), s = [];
      for (let a in o) n[a] === o[a] && s.push(a);
      if (s.length > 0) {
        let a = yt.default.relative(process.cwd(), e10.path), l = yt.default.relative(process.cwd(), t);
        if (r === "error") {
          let u = `There is a conflict between env var${s.length > 1 ? "s" : ""} in ${ee(a)} and ${ee(l)}
Conflicting env vars:
${s.map((c) => `  ${Y(c)}`).join(`
`)}

We suggest to move the contents of ${ee(l)} to ${ee(a)} to consolidate your env vars.
`;
          throw new Error(u);
        } else if (r === "warn") {
          let u = `Conflict for env var${s.length > 1 ? "s" : ""} ${s.map((c) => Y(c)).join(", ")} in ${ee(a)} and ${ee(l)}
Env vars from ${ee(l)} overwrite the ones from ${ee(a)}
      `;
          console.warn(`${De("warn(prisma)")} ${u}`);
        }
      }
    }
  }
  function Es(e10) {
    if (_c(e10)) {
      Si(`Environment variables loaded from ${e10}`);
      let t = Ai.default.config({ path: e10, debug: process.env.DOTENV_CONFIG_DEBUG ? true : void 0 });
      return { dotenvResult: ys(t), message: _e(`Environment variables loaded from ${yt.default.relative(process.cwd(), e10)}`), path: e10 };
    } else Si(`Environment variables not found at ${e10}`);
    return null;
  }
  function bs(e10, t) {
    return e10 && t && yt.default.resolve(e10) === yt.default.resolve(t);
  }
  function _c(e10) {
    return !!(e10 && Zr.default.existsSync(e10));
  }
  var ws = "library";
  function Et(e10) {
    let t = Dc();
    return t || ((e10 == null ? void 0 : e10.config.engineType) === "library" ? "library" : (e10 == null ? void 0 : e10.config.engineType) === "binary" ? "binary" : (e10 == null ? void 0 : e10.config.engineType) === "client" ? "client" : ws);
  }
  function Dc() {
    let e10 = process.env.PRISMA_CLIENT_ENGINE_TYPE;
    return e10 === "library" ? "library" : e10 === "binary" ? "binary" : e10 === "client" ? "client" : void 0;
  }
  var Cs = "prisma+postgres", Xr = `${Cs}:`;
  function Ii(e10) {
    return (e10 == null ? void 0 : e10.startsWith(`${Xr}//`)) ?? false;
  }
  var tr;
  ((t) => {
    ((I) => (I.findUnique = "findUnique", I.findUniqueOrThrow = "findUniqueOrThrow", I.findFirst = "findFirst", I.findFirstOrThrow = "findFirstOrThrow", I.findMany = "findMany", I.create = "create", I.createMany = "createMany", I.createManyAndReturn = "createManyAndReturn", I.update = "update", I.updateMany = "updateMany", I.updateManyAndReturn = "updateManyAndReturn", I.upsert = "upsert", I.delete = "delete", I.deleteMany = "deleteMany", I.groupBy = "groupBy", I.count = "count", I.aggregate = "aggregate", I.findRaw = "findRaw", I.aggregateRaw = "aggregateRaw"))(t.ModelAction || (t.ModelAction = {}));
  })(tr || (tr = {}));
  var rr = D(require$$3);
  function ki(e10) {
    return rr.default.sep === rr.default.posix.sep ? e10 : e10.split(rr.default.sep).join(rr.default.posix.sep);
  }
  var Ss = D(Oi());
  function Di(e10) {
    return String(new _i(e10));
  }
  var _i = class {
    constructor(t) {
      this.config = t;
    }
    toString() {
      let { config: t } = this, r = t.provider.fromEnvVar ? `env("${t.provider.fromEnvVar}")` : t.provider.value, n = JSON.parse(JSON.stringify({ provider: r, binaryTargets: Lc(t.binaryTargets) }));
      return `generator ${t.name} {
${(0, Ss.default)(Fc(n), 2)}
}`;
    }
  };
  function Lc(e10) {
    let t;
    if (e10.length > 0) {
      let r = e10.find((n) => n.fromEnvVar !== null);
      r ? t = `env("${r.fromEnvVar}")` : t = e10.map((n) => n.native ? "native" : n.value);
    } else t = void 0;
    return t;
  }
  function Fc(e10) {
    let t = Object.keys(e10).reduce((r, n) => Math.max(r, n.length), 0);
    return Object.entries(e10).map(([r, n]) => `${r.padEnd(t)} = ${Mc(n)}`).join(`
`);
  }
  function Mc(e10) {
    return JSON.parse(JSON.stringify(e10, (t, r) => Array.isArray(r) ? `[${r.map((n) => JSON.stringify(n)).join(", ")}]` : JSON.stringify(r)));
  }
  var ir = {};
  Wt(ir, { error: () => Vc, info: () => qc, log: () => $c, query: () => jc, should: () => As, tags: () => nr, warn: () => Ni });
  var nr = { error: fe("prisma:error"), warn: De("prisma:warn"), info: Ne("prisma:info"), query: it("prisma:query") }, As = { warn: () => !process.env.PRISMA_DISABLE_WARNINGS };
  function $c(...e10) {
    console.log(...e10);
  }
  function Ni(e10, ...t) {
    As.warn() && console.warn(`${nr.warn} ${e10}`, ...t);
  }
  function qc(e10, ...t) {
    console.info(`${nr.info} ${e10}`, ...t);
  }
  function Vc(e10, ...t) {
    console.error(`${nr.error} ${e10}`, ...t);
  }
  function jc(e10, ...t) {
    console.log(`${nr.query} ${e10}`, ...t);
  }
  function en(e10, t) {
    if (!e10) throw new Error(`${t}. This should never happen. If you see this error, please, open an issue at https://pris.ly/prisma-prisma-bug-report`);
  }
  function Me(e10, t) {
    throw new Error(t);
  }
  function Fi(e10, t) {
    return Object.prototype.hasOwnProperty.call(e10, t);
  }
  var Mi = (e10, t) => e10.reduce((r, n) => (r[t(n)] = n, r), {});
  function bt(e10, t) {
    let r = {};
    for (let n of Object.keys(e10)) r[n] = t(e10[n], n);
    return r;
  }
  function $i(e10, t) {
    if (e10.length === 0) return;
    let r = e10[0];
    for (let n = 1; n < e10.length; n++) t(r, e10[n]) < 0 && (r = e10[n]);
    return r;
  }
  function x(e10, t) {
    Object.defineProperty(e10, "name", { value: t, configurable: true });
  }
  var Ds = /* @__PURE__ */ new Set(), or = (e10, t, ...r) => {
    Ds.has(e10) || (Ds.add(e10), Ni(t, ...r));
  };
  var C = class e2 extends Error {
    constructor(r, n, i) {
      super(r);
      d(this, "clientVersion");
      d(this, "errorCode");
      d(this, "retryable");
      this.name = "PrismaClientInitializationError", this.clientVersion = n, this.errorCode = i, Error.captureStackTrace(e2);
    }
    get [Symbol.toStringTag]() {
      return "PrismaClientInitializationError";
    }
  };
  x(C, "PrismaClientInitializationError");
  var te = class extends Error {
    constructor(r, { code: n, clientVersion: i, meta: o, batchRequestIdx: s }) {
      super(r);
      d(this, "code");
      d(this, "meta");
      d(this, "clientVersion");
      d(this, "batchRequestIdx");
      this.name = "PrismaClientKnownRequestError", this.code = n, this.clientVersion = i, this.meta = o, Object.defineProperty(this, "batchRequestIdx", { value: s, enumerable: false, writable: true });
    }
    get [Symbol.toStringTag]() {
      return "PrismaClientKnownRequestError";
    }
  };
  x(te, "PrismaClientKnownRequestError");
  var pe = class extends Error {
    constructor(r, n) {
      super(r);
      d(this, "clientVersion");
      this.name = "PrismaClientRustPanicError", this.clientVersion = n;
    }
    get [Symbol.toStringTag]() {
      return "PrismaClientRustPanicError";
    }
  };
  x(pe, "PrismaClientRustPanicError");
  var U = class extends Error {
    constructor(r, { clientVersion: n, batchRequestIdx: i }) {
      super(r);
      d(this, "clientVersion");
      d(this, "batchRequestIdx");
      this.name = "PrismaClientUnknownRequestError", this.clientVersion = n, Object.defineProperty(this, "batchRequestIdx", { value: i, writable: true, enumerable: false });
    }
    get [Symbol.toStringTag]() {
      return "PrismaClientUnknownRequestError";
    }
  };
  x(U, "PrismaClientUnknownRequestError");
  var re = class extends Error {
    constructor(r, { clientVersion: n }) {
      super(r);
      d(this, "name", "PrismaClientValidationError");
      d(this, "clientVersion");
      this.clientVersion = n;
    }
    get [Symbol.toStringTag]() {
      return "PrismaClientValidationError";
    }
  };
  x(re, "PrismaClientValidationError");
  var wt = 9e15, ze = 1e9, qi = "0123456789abcdef", sn = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058", an = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789", Vi = { precision: 20, rounding: 4, modulo: 1, toExpNeg: -7, toExpPos: 21, minE: -9e15, maxE: wt, crypto: false }, Ms, $e, w = true, un = "[DecimalError] ", Ye = un + "Invalid argument: ", $s = un + "Precision limit exceeded", qs = un + "crypto unavailable", Vs = "[object Decimal]", ne = Math.floor, J = Math.pow, Uc = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i, Qc = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i, Gc = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i, js = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, ye = 1e7, b = 7, Jc = 9007199254740991, Wc = sn.length - 1, ji = an.length - 1, f = { toStringTag: Vs };
  f.absoluteValue = f.abs = function() {
    var e10 = new this.constructor(this);
    return e10.s < 0 && (e10.s = 1), E(e10);
  };
  f.ceil = function() {
    return E(new this.constructor(this), this.e + 1, 2);
  };
  f.clampedTo = f.clamp = function(e10, t) {
    var r, n = this, i = n.constructor;
    if (e10 = new i(e10), t = new i(t), !e10.s || !t.s) return new i(NaN);
    if (e10.gt(t)) throw Error(Ye + t);
    return r = n.cmp(e10), r < 0 ? e10 : n.cmp(t) > 0 ? t : new i(n);
  };
  f.comparedTo = f.cmp = function(e10) {
    var t, r, n, i, o = this, s = o.d, a = (e10 = new o.constructor(e10)).d, l = o.s, u = e10.s;
    if (!s || !a) return !l || !u ? NaN : l !== u ? l : s === a ? 0 : !s ^ l < 0 ? 1 : -1;
    if (!s[0] || !a[0]) return s[0] ? l : a[0] ? -u : 0;
    if (l !== u) return l;
    if (o.e !== e10.e) return o.e > e10.e ^ l < 0 ? 1 : -1;
    for (n = s.length, i = a.length, t = 0, r = n < i ? n : i; t < r; ++t) if (s[t] !== a[t]) return s[t] > a[t] ^ l < 0 ? 1 : -1;
    return n === i ? 0 : n > i ^ l < 0 ? 1 : -1;
  };
  f.cosine = f.cos = function() {
    var e10, t, r = this, n = r.constructor;
    return r.d ? r.d[0] ? (e10 = n.precision, t = n.rounding, n.precision = e10 + Math.max(r.e, r.sd()) + b, n.rounding = 1, r = Hc(n, Js(n, r)), n.precision = e10, n.rounding = t, E($e == 2 || $e == 3 ? r.neg() : r, e10, t, true)) : new n(1) : new n(NaN);
  };
  f.cubeRoot = f.cbrt = function() {
    var e10, t, r, n, i, o, s, a, l, u, c = this, p = c.constructor;
    if (!c.isFinite() || c.isZero()) return new p(c);
    for (w = false, o = c.s * J(c.s * c, 1 / 3), !o || Math.abs(o) == 1 / 0 ? (r = z(c.d), e10 = c.e, (o = (e10 - r.length + 1) % 3) && (r += o == 1 || o == -2 ? "0" : "00"), o = J(r, 1 / 3), e10 = ne((e10 + 1) / 3) - (e10 % 3 == (e10 < 0 ? -1 : 2)), o == 1 / 0 ? r = "5e" + e10 : (r = o.toExponential(), r = r.slice(0, r.indexOf("e") + 1) + e10), n = new p(r), n.s = c.s) : n = new p(o.toString()), s = (e10 = p.precision) + 3; ; ) if (a = n, l = a.times(a).times(a), u = l.plus(c), n = $(u.plus(c).times(a), u.plus(l), s + 2, 1), z(a.d).slice(0, s) === (r = z(n.d)).slice(0, s)) if (r = r.slice(s - 3, s + 1), r == "9999" || !i && r == "4999") {
      if (!i && (E(a, e10 + 1, 0), a.times(a).times(a).eq(c))) {
        n = a;
        break;
      }
      s += 4, i = 1;
    } else {
      (!+r || !+r.slice(1) && r.charAt(0) == "5") && (E(n, e10 + 1, 1), t = !n.times(n).times(n).eq(c));
      break;
    }
    return w = true, E(n, e10, p.rounding, t);
  };
  f.decimalPlaces = f.dp = function() {
    var e10, t = this.d, r = NaN;
    if (t) {
      if (e10 = t.length - 1, r = (e10 - ne(this.e / b)) * b, e10 = t[e10], e10) for (; e10 % 10 == 0; e10 /= 10) r--;
      r < 0 && (r = 0);
    }
    return r;
  };
  f.dividedBy = f.div = function(e10) {
    return $(this, new this.constructor(e10));
  };
  f.dividedToIntegerBy = f.divToInt = function(e10) {
    var t = this, r = t.constructor;
    return E($(t, new r(e10), 0, 1, 1), r.precision, r.rounding);
  };
  f.equals = f.eq = function(e10) {
    return this.cmp(e10) === 0;
  };
  f.floor = function() {
    return E(new this.constructor(this), this.e + 1, 3);
  };
  f.greaterThan = f.gt = function(e10) {
    return this.cmp(e10) > 0;
  };
  f.greaterThanOrEqualTo = f.gte = function(e10) {
    var t = this.cmp(e10);
    return t == 1 || t === 0;
  };
  f.hyperbolicCosine = f.cosh = function() {
    var e10, t, r, n, i, o = this, s = o.constructor, a = new s(1);
    if (!o.isFinite()) return new s(o.s ? 1 / 0 : NaN);
    if (o.isZero()) return a;
    r = s.precision, n = s.rounding, s.precision = r + Math.max(o.e, o.sd()) + 4, s.rounding = 1, i = o.d.length, i < 32 ? (e10 = Math.ceil(i / 3), t = (1 / pn(4, e10)).toString()) : (e10 = 16, t = "2.3283064365386962890625e-10"), o = xt(s, 1, o.times(t), new s(1), true);
    for (var l, u = e10, c = new s(8); u--; ) l = o.times(o), o = a.minus(l.times(c.minus(l.times(c))));
    return E(o, s.precision = r, s.rounding = n, true);
  };
  f.hyperbolicSine = f.sinh = function() {
    var e10, t, r, n, i = this, o = i.constructor;
    if (!i.isFinite() || i.isZero()) return new o(i);
    if (t = o.precision, r = o.rounding, o.precision = t + Math.max(i.e, i.sd()) + 4, o.rounding = 1, n = i.d.length, n < 3) i = xt(o, 2, i, i, true);
    else {
      e10 = 1.4 * Math.sqrt(n), e10 = e10 > 16 ? 16 : e10 | 0, i = i.times(1 / pn(5, e10)), i = xt(o, 2, i, i, true);
      for (var s, a = new o(5), l = new o(16), u = new o(20); e10--; ) s = i.times(i), i = i.times(a.plus(s.times(l.times(s).plus(u))));
    }
    return o.precision = t, o.rounding = r, E(i, t, r, true);
  };
  f.hyperbolicTangent = f.tanh = function() {
    var e10, t, r = this, n = r.constructor;
    return r.isFinite() ? r.isZero() ? new n(r) : (e10 = n.precision, t = n.rounding, n.precision = e10 + 7, n.rounding = 1, $(r.sinh(), r.cosh(), n.precision = e10, n.rounding = t)) : new n(r.s);
  };
  f.inverseCosine = f.acos = function() {
    var e10 = this, t = e10.constructor, r = e10.abs().cmp(1), n = t.precision, i = t.rounding;
    return r !== -1 ? r === 0 ? e10.isNeg() ? ve(t, n, i) : new t(0) : new t(NaN) : e10.isZero() ? ve(t, n + 4, i).times(0.5) : (t.precision = n + 6, t.rounding = 1, e10 = new t(1).minus(e10).div(e10.plus(1)).sqrt().atan(), t.precision = n, t.rounding = i, e10.times(2));
  };
  f.inverseHyperbolicCosine = f.acosh = function() {
    var e10, t, r = this, n = r.constructor;
    return r.lte(1) ? new n(r.eq(1) ? 0 : NaN) : r.isFinite() ? (e10 = n.precision, t = n.rounding, n.precision = e10 + Math.max(Math.abs(r.e), r.sd()) + 4, n.rounding = 1, w = false, r = r.times(r).minus(1).sqrt().plus(r), w = true, n.precision = e10, n.rounding = t, r.ln()) : new n(r);
  };
  f.inverseHyperbolicSine = f.asinh = function() {
    var e10, t, r = this, n = r.constructor;
    return !r.isFinite() || r.isZero() ? new n(r) : (e10 = n.precision, t = n.rounding, n.precision = e10 + 2 * Math.max(Math.abs(r.e), r.sd()) + 6, n.rounding = 1, w = false, r = r.times(r).plus(1).sqrt().plus(r), w = true, n.precision = e10, n.rounding = t, r.ln());
  };
  f.inverseHyperbolicTangent = f.atanh = function() {
    var e10, t, r, n, i = this, o = i.constructor;
    return i.isFinite() ? i.e >= 0 ? new o(i.abs().eq(1) ? i.s / 0 : i.isZero() ? i : NaN) : (e10 = o.precision, t = o.rounding, n = i.sd(), Math.max(n, e10) < 2 * -i.e - 1 ? E(new o(i), e10, t, true) : (o.precision = r = n - i.e, i = $(i.plus(1), new o(1).minus(i), r + e10, 1), o.precision = e10 + 4, o.rounding = 1, i = i.ln(), o.precision = e10, o.rounding = t, i.times(0.5))) : new o(NaN);
  };
  f.inverseSine = f.asin = function() {
    var e10, t, r, n, i = this, o = i.constructor;
    return i.isZero() ? new o(i) : (t = i.abs().cmp(1), r = o.precision, n = o.rounding, t !== -1 ? t === 0 ? (e10 = ve(o, r + 4, n).times(0.5), e10.s = i.s, e10) : new o(NaN) : (o.precision = r + 6, o.rounding = 1, i = i.div(new o(1).minus(i.times(i)).sqrt().plus(1)).atan(), o.precision = r, o.rounding = n, i.times(2)));
  };
  f.inverseTangent = f.atan = function() {
    var e10, t, r, n, i, o, s, a, l, u = this, c = u.constructor, p = c.precision, m = c.rounding;
    if (u.isFinite()) {
      if (u.isZero()) return new c(u);
      if (u.abs().eq(1) && p + 4 <= ji) return s = ve(c, p + 4, m).times(0.25), s.s = u.s, s;
    } else {
      if (!u.s) return new c(NaN);
      if (p + 4 <= ji) return s = ve(c, p + 4, m).times(0.5), s.s = u.s, s;
    }
    for (c.precision = a = p + 10, c.rounding = 1, r = Math.min(28, a / b + 2 | 0), e10 = r; e10; --e10) u = u.div(u.times(u).plus(1).sqrt().plus(1));
    for (w = false, t = Math.ceil(a / b), n = 1, l = u.times(u), s = new c(u), i = u; e10 !== -1; ) if (i = i.times(l), o = s.minus(i.div(n += 2)), i = i.times(l), s = o.plus(i.div(n += 2)), s.d[t] !== void 0) for (e10 = t; s.d[e10] === o.d[e10] && e10--; ) ;
    return r && (s = s.times(2 << r - 1)), w = true, E(s, c.precision = p, c.rounding = m, true);
  };
  f.isFinite = function() {
    return !!this.d;
  };
  f.isInteger = f.isInt = function() {
    return !!this.d && ne(this.e / b) > this.d.length - 2;
  };
  f.isNaN = function() {
    return !this.s;
  };
  f.isNegative = f.isNeg = function() {
    return this.s < 0;
  };
  f.isPositive = f.isPos = function() {
    return this.s > 0;
  };
  f.isZero = function() {
    return !!this.d && this.d[0] === 0;
  };
  f.lessThan = f.lt = function(e10) {
    return this.cmp(e10) < 0;
  };
  f.lessThanOrEqualTo = f.lte = function(e10) {
    return this.cmp(e10) < 1;
  };
  f.logarithm = f.log = function(e10) {
    var t, r, n, i, o, s, a, l, u = this, c = u.constructor, p = c.precision, m = c.rounding, g = 5;
    if (e10 == null) e10 = new c(10), t = true;
    else {
      if (e10 = new c(e10), r = e10.d, e10.s < 0 || !r || !r[0] || e10.eq(1)) return new c(NaN);
      t = e10.eq(10);
    }
    if (r = u.d, u.s < 0 || !r || !r[0] || u.eq(1)) return new c(r && !r[0] ? -1 / 0 : u.s != 1 ? NaN : r ? 0 : 1 / 0);
    if (t) if (r.length > 1) o = true;
    else {
      for (i = r[0]; i % 10 === 0; ) i /= 10;
      o = i !== 1;
    }
    if (w = false, a = p + g, s = Ke(u, a), n = t ? ln(c, a + 10) : Ke(e10, a), l = $(s, n, a, 1), sr(l.d, i = p, m)) do
      if (a += 10, s = Ke(u, a), n = t ? ln(c, a + 10) : Ke(e10, a), l = $(s, n, a, 1), !o) {
        +z(l.d).slice(i + 1, i + 15) + 1 == 1e14 && (l = E(l, p + 1, 0));
        break;
      }
    while (sr(l.d, i += 10, m));
    return w = true, E(l, p, m);
  };
  f.minus = f.sub = function(e10) {
    var t, r, n, i, o, s, a, l, u, c, p, m, g = this, h = g.constructor;
    if (e10 = new h(e10), !g.d || !e10.d) return !g.s || !e10.s ? e10 = new h(NaN) : g.d ? e10.s = -e10.s : e10 = new h(e10.d || g.s !== e10.s ? g : NaN), e10;
    if (g.s != e10.s) return e10.s = -e10.s, g.plus(e10);
    if (u = g.d, m = e10.d, a = h.precision, l = h.rounding, !u[0] || !m[0]) {
      if (m[0]) e10.s = -e10.s;
      else if (u[0]) e10 = new h(g);
      else return new h(l === 3 ? -0 : 0);
      return w ? E(e10, a, l) : e10;
    }
    if (r = ne(e10.e / b), c = ne(g.e / b), u = u.slice(), o = c - r, o) {
      for (p = o < 0, p ? (t = u, o = -o, s = m.length) : (t = m, r = c, s = u.length), n = Math.max(Math.ceil(a / b), s) + 2, o > n && (o = n, t.length = 1), t.reverse(), n = o; n--; ) t.push(0);
      t.reverse();
    } else {
      for (n = u.length, s = m.length, p = n < s, p && (s = n), n = 0; n < s; n++) if (u[n] != m[n]) {
        p = u[n] < m[n];
        break;
      }
      o = 0;
    }
    for (p && (t = u, u = m, m = t, e10.s = -e10.s), s = u.length, n = m.length - s; n > 0; --n) u[s++] = 0;
    for (n = m.length; n > o; ) {
      if (u[--n] < m[n]) {
        for (i = n; i && u[--i] === 0; ) u[i] = ye - 1;
        --u[i], u[n] += ye;
      }
      u[n] -= m[n];
    }
    for (; u[--s] === 0; ) u.pop();
    for (; u[0] === 0; u.shift()) --r;
    return u[0] ? (e10.d = u, e10.e = cn(u, r), w ? E(e10, a, l) : e10) : new h(l === 3 ? -0 : 0);
  };
  f.modulo = f.mod = function(e10) {
    var t, r = this, n = r.constructor;
    return e10 = new n(e10), !r.d || !e10.s || e10.d && !e10.d[0] ? new n(NaN) : !e10.d || r.d && !r.d[0] ? E(new n(r), n.precision, n.rounding) : (w = false, n.modulo == 9 ? (t = $(r, e10.abs(), 0, 3, 1), t.s *= e10.s) : t = $(r, e10, 0, n.modulo, 1), t = t.times(e10), w = true, r.minus(t));
  };
  f.naturalExponential = f.exp = function() {
    return Bi(this);
  };
  f.naturalLogarithm = f.ln = function() {
    return Ke(this);
  };
  f.negated = f.neg = function() {
    var e10 = new this.constructor(this);
    return e10.s = -e10.s, E(e10);
  };
  f.plus = f.add = function(e10) {
    var t, r, n, i, o, s, a, l, u, c, p = this, m = p.constructor;
    if (e10 = new m(e10), !p.d || !e10.d) return !p.s || !e10.s ? e10 = new m(NaN) : p.d || (e10 = new m(e10.d || p.s === e10.s ? p : NaN)), e10;
    if (p.s != e10.s) return e10.s = -e10.s, p.minus(e10);
    if (u = p.d, c = e10.d, a = m.precision, l = m.rounding, !u[0] || !c[0]) return c[0] || (e10 = new m(p)), w ? E(e10, a, l) : e10;
    if (o = ne(p.e / b), n = ne(e10.e / b), u = u.slice(), i = o - n, i) {
      for (i < 0 ? (r = u, i = -i, s = c.length) : (r = c, n = o, s = u.length), o = Math.ceil(a / b), s = o > s ? o + 1 : s + 1, i > s && (i = s, r.length = 1), r.reverse(); i--; ) r.push(0);
      r.reverse();
    }
    for (s = u.length, i = c.length, s - i < 0 && (i = s, r = c, c = u, u = r), t = 0; i; ) t = (u[--i] = u[i] + c[i] + t) / ye | 0, u[i] %= ye;
    for (t && (u.unshift(t), ++n), s = u.length; u[--s] == 0; ) u.pop();
    return e10.d = u, e10.e = cn(u, n), w ? E(e10, a, l) : e10;
  };
  f.precision = f.sd = function(e10) {
    var t, r = this;
    if (e10 !== void 0 && e10 !== !!e10 && e10 !== 1 && e10 !== 0) throw Error(Ye + e10);
    return r.d ? (t = Bs(r.d), e10 && r.e + 1 > t && (t = r.e + 1)) : t = NaN, t;
  };
  f.round = function() {
    var e10 = this, t = e10.constructor;
    return E(new t(e10), e10.e + 1, t.rounding);
  };
  f.sine = f.sin = function() {
    var e10, t, r = this, n = r.constructor;
    return r.isFinite() ? r.isZero() ? new n(r) : (e10 = n.precision, t = n.rounding, n.precision = e10 + Math.max(r.e, r.sd()) + b, n.rounding = 1, r = Yc(n, Js(n, r)), n.precision = e10, n.rounding = t, E($e > 2 ? r.neg() : r, e10, t, true)) : new n(NaN);
  };
  f.squareRoot = f.sqrt = function() {
    var e10, t, r, n, i, o, s = this, a = s.d, l = s.e, u = s.s, c = s.constructor;
    if (u !== 1 || !a || !a[0]) return new c(!u || u < 0 && (!a || a[0]) ? NaN : a ? s : 1 / 0);
    for (w = false, u = Math.sqrt(+s), u == 0 || u == 1 / 0 ? (t = z(a), (t.length + l) % 2 == 0 && (t += "0"), u = Math.sqrt(t), l = ne((l + 1) / 2) - (l < 0 || l % 2), u == 1 / 0 ? t = "5e" + l : (t = u.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + l), n = new c(t)) : n = new c(u.toString()), r = (l = c.precision) + 3; ; ) if (o = n, n = o.plus($(s, o, r + 2, 1)).times(0.5), z(o.d).slice(0, r) === (t = z(n.d)).slice(0, r)) if (t = t.slice(r - 3, r + 1), t == "9999" || !i && t == "4999") {
      if (!i && (E(o, l + 1, 0), o.times(o).eq(s))) {
        n = o;
        break;
      }
      r += 4, i = 1;
    } else {
      (!+t || !+t.slice(1) && t.charAt(0) == "5") && (E(n, l + 1, 1), e10 = !n.times(n).eq(s));
      break;
    }
    return w = true, E(n, l, c.rounding, e10);
  };
  f.tangent = f.tan = function() {
    var e10, t, r = this, n = r.constructor;
    return r.isFinite() ? r.isZero() ? new n(r) : (e10 = n.precision, t = n.rounding, n.precision = e10 + 10, n.rounding = 1, r = r.sin(), r.s = 1, r = $(r, new n(1).minus(r.times(r)).sqrt(), e10 + 10, 0), n.precision = e10, n.rounding = t, E($e == 2 || $e == 4 ? r.neg() : r, e10, t, true)) : new n(NaN);
  };
  f.times = f.mul = function(e10) {
    var t, r, n, i, o, s, a, l, u, c = this, p = c.constructor, m = c.d, g = (e10 = new p(e10)).d;
    if (e10.s *= c.s, !m || !m[0] || !g || !g[0]) return new p(!e10.s || m && !m[0] && !g || g && !g[0] && !m ? NaN : !m || !g ? e10.s / 0 : e10.s * 0);
    for (r = ne(c.e / b) + ne(e10.e / b), l = m.length, u = g.length, l < u && (o = m, m = g, g = o, s = l, l = u, u = s), o = [], s = l + u, n = s; n--; ) o.push(0);
    for (n = u; --n >= 0; ) {
      for (t = 0, i = l + n; i > n; ) a = o[i] + g[n] * m[i - n - 1] + t, o[i--] = a % ye | 0, t = a / ye | 0;
      o[i] = (o[i] + t) % ye | 0;
    }
    for (; !o[--s]; ) o.pop();
    return t ? ++r : o.shift(), e10.d = o, e10.e = cn(o, r), w ? E(e10, p.precision, p.rounding) : e10;
  };
  f.toBinary = function(e10, t) {
    return Ui(this, 2, e10, t);
  };
  f.toDecimalPlaces = f.toDP = function(e10, t) {
    var r = this, n = r.constructor;
    return r = new n(r), e10 === void 0 ? r : (ae(e10, 0, ze), t === void 0 ? t = n.rounding : ae(t, 0, 8), E(r, e10 + r.e + 1, t));
  };
  f.toExponential = function(e10, t) {
    var r, n = this, i = n.constructor;
    return e10 === void 0 ? r = Te(n, true) : (ae(e10, 0, ze), t === void 0 ? t = i.rounding : ae(t, 0, 8), n = E(new i(n), e10 + 1, t), r = Te(n, true, e10 + 1)), n.isNeg() && !n.isZero() ? "-" + r : r;
  };
  f.toFixed = function(e10, t) {
    var r, n, i = this, o = i.constructor;
    return e10 === void 0 ? r = Te(i) : (ae(e10, 0, ze), t === void 0 ? t = o.rounding : ae(t, 0, 8), n = E(new o(i), e10 + i.e + 1, t), r = Te(n, false, e10 + n.e + 1)), i.isNeg() && !i.isZero() ? "-" + r : r;
  };
  f.toFraction = function(e10) {
    var t, r, n, i, o, s, a, l, u, c, p, m, g = this, h = g.d, y = g.constructor;
    if (!h) return new y(g);
    if (u = r = new y(1), n = l = new y(0), t = new y(n), o = t.e = Bs(h) - g.e - 1, s = o % b, t.d[0] = J(10, s < 0 ? b + s : s), e10 == null) e10 = o > 0 ? t : u;
    else {
      if (a = new y(e10), !a.isInt() || a.lt(u)) throw Error(Ye + a);
      e10 = a.gt(t) ? o > 0 ? t : u : a;
    }
    for (w = false, a = new y(z(h)), c = y.precision, y.precision = o = h.length * b * 2; p = $(a, t, 0, 1, 1), i = r.plus(p.times(n)), i.cmp(e10) != 1; ) r = n, n = i, i = u, u = l.plus(p.times(i)), l = i, i = t, t = a.minus(p.times(i)), a = i;
    return i = $(e10.minus(r), n, 0, 1, 1), l = l.plus(i.times(u)), r = r.plus(i.times(n)), l.s = u.s = g.s, m = $(u, n, o, 1).minus(g).abs().cmp($(l, r, o, 1).minus(g).abs()) < 1 ? [u, n] : [l, r], y.precision = c, w = true, m;
  };
  f.toHexadecimal = f.toHex = function(e10, t) {
    return Ui(this, 16, e10, t);
  };
  f.toNearest = function(e10, t) {
    var r = this, n = r.constructor;
    if (r = new n(r), e10 == null) {
      if (!r.d) return r;
      e10 = new n(1), t = n.rounding;
    } else {
      if (e10 = new n(e10), t === void 0 ? t = n.rounding : ae(t, 0, 8), !r.d) return e10.s ? r : e10;
      if (!e10.d) return e10.s && (e10.s = r.s), e10;
    }
    return e10.d[0] ? (w = false, r = $(r, e10, 0, t, 1).times(e10), w = true, E(r)) : (e10.s = r.s, r = e10), r;
  };
  f.toNumber = function() {
    return +this;
  };
  f.toOctal = function(e10, t) {
    return Ui(this, 8, e10, t);
  };
  f.toPower = f.pow = function(e10) {
    var t, r, n, i, o, s, a = this, l = a.constructor, u = +(e10 = new l(e10));
    if (!a.d || !e10.d || !a.d[0] || !e10.d[0]) return new l(J(+a, u));
    if (a = new l(a), a.eq(1)) return a;
    if (n = l.precision, o = l.rounding, e10.eq(1)) return E(a, n, o);
    if (t = ne(e10.e / b), t >= e10.d.length - 1 && (r = u < 0 ? -u : u) <= Jc) return i = Us(l, a, r, n), e10.s < 0 ? new l(1).div(i) : E(i, n, o);
    if (s = a.s, s < 0) {
      if (t < e10.d.length - 1) return new l(NaN);
      if (e10.d[t] & 1 || (s = 1), a.e == 0 && a.d[0] == 1 && a.d.length == 1) return a.s = s, a;
    }
    return r = J(+a, u), t = r == 0 || !isFinite(r) ? ne(u * (Math.log("0." + z(a.d)) / Math.LN10 + a.e + 1)) : new l(r + "").e, t > l.maxE + 1 || t < l.minE - 1 ? new l(t > 0 ? s / 0 : 0) : (w = false, l.rounding = a.s = 1, r = Math.min(12, (t + "").length), i = Bi(e10.times(Ke(a, n + r)), n), i.d && (i = E(i, n + 5, 1), sr(i.d, n, o) && (t = n + 10, i = E(Bi(e10.times(Ke(a, t + r)), t), t + 5, 1), +z(i.d).slice(n + 1, n + 15) + 1 == 1e14 && (i = E(i, n + 1, 0)))), i.s = s, w = true, l.rounding = o, E(i, n, o));
  };
  f.toPrecision = function(e10, t) {
    var r, n = this, i = n.constructor;
    return e10 === void 0 ? r = Te(n, n.e <= i.toExpNeg || n.e >= i.toExpPos) : (ae(e10, 1, ze), t === void 0 ? t = i.rounding : ae(t, 0, 8), n = E(new i(n), e10, t), r = Te(n, e10 <= n.e || n.e <= i.toExpNeg, e10)), n.isNeg() && !n.isZero() ? "-" + r : r;
  };
  f.toSignificantDigits = f.toSD = function(e10, t) {
    var r = this, n = r.constructor;
    return e10 === void 0 ? (e10 = n.precision, t = n.rounding) : (ae(e10, 1, ze), t === void 0 ? t = n.rounding : ae(t, 0, 8)), E(new n(r), e10, t);
  };
  f.toString = function() {
    var e10 = this, t = e10.constructor, r = Te(e10, e10.e <= t.toExpNeg || e10.e >= t.toExpPos);
    return e10.isNeg() && !e10.isZero() ? "-" + r : r;
  };
  f.truncated = f.trunc = function() {
    return E(new this.constructor(this), this.e + 1, 1);
  };
  f.valueOf = f.toJSON = function() {
    var e10 = this, t = e10.constructor, r = Te(e10, e10.e <= t.toExpNeg || e10.e >= t.toExpPos);
    return e10.isNeg() ? "-" + r : r;
  };
  function z(e10) {
    var t, r, n, i = e10.length - 1, o = "", s = e10[0];
    if (i > 0) {
      for (o += s, t = 1; t < i; t++) n = e10[t] + "", r = b - n.length, r && (o += He(r)), o += n;
      s = e10[t], n = s + "", r = b - n.length, r && (o += He(r));
    } else if (s === 0) return "0";
    for (; s % 10 === 0; ) s /= 10;
    return o + s;
  }
  function ae(e10, t, r) {
    if (e10 !== ~~e10 || e10 < t || e10 > r) throw Error(Ye + e10);
  }
  function sr(e10, t, r, n) {
    var i, o, s, a;
    for (o = e10[0]; o >= 10; o /= 10) --t;
    return --t < 0 ? (t += b, i = 0) : (i = Math.ceil((t + 1) / b), t %= b), o = J(10, b - t), a = e10[i] % o | 0, n == null ? t < 3 ? (t == 0 ? a = a / 100 | 0 : t == 1 && (a = a / 10 | 0), s = r < 4 && a == 99999 || r > 3 && a == 49999 || a == 5e4 || a == 0) : s = (r < 4 && a + 1 == o || r > 3 && a + 1 == o / 2) && (e10[i + 1] / o / 100 | 0) == J(10, t - 2) - 1 || (a == o / 2 || a == 0) && (e10[i + 1] / o / 100 | 0) == 0 : t < 4 ? (t == 0 ? a = a / 1e3 | 0 : t == 1 ? a = a / 100 | 0 : t == 2 && (a = a / 10 | 0), s = (n || r < 4) && a == 9999 || !n && r > 3 && a == 4999) : s = ((n || r < 4) && a + 1 == o || !n && r > 3 && a + 1 == o / 2) && (e10[i + 1] / o / 1e3 | 0) == J(10, t - 3) - 1, s;
  }
  function nn(e10, t, r) {
    for (var n, i = [0], o, s = 0, a = e10.length; s < a; ) {
      for (o = i.length; o--; ) i[o] *= t;
      for (i[0] += qi.indexOf(e10.charAt(s++)), n = 0; n < i.length; n++) i[n] > r - 1 && (i[n + 1] === void 0 && (i[n + 1] = 0), i[n + 1] += i[n] / r | 0, i[n] %= r);
    }
    return i.reverse();
  }
  function Hc(e10, t) {
    var r, n, i;
    if (t.isZero()) return t;
    n = t.d.length, n < 32 ? (r = Math.ceil(n / 3), i = (1 / pn(4, r)).toString()) : (r = 16, i = "2.3283064365386962890625e-10"), e10.precision += r, t = xt(e10, 1, t.times(i), new e10(1));
    for (var o = r; o--; ) {
      var s = t.times(t);
      t = s.times(s).minus(s).times(8).plus(1);
    }
    return e10.precision -= r, t;
  }
  var $ = /* @__PURE__ */ function() {
    function e10(n, i, o) {
      var s, a = 0, l = n.length;
      for (n = n.slice(); l--; ) s = n[l] * i + a, n[l] = s % o | 0, a = s / o | 0;
      return a && n.unshift(a), n;
    }
    function t(n, i, o, s) {
      var a, l;
      if (o != s) l = o > s ? 1 : -1;
      else for (a = l = 0; a < o; a++) if (n[a] != i[a]) {
        l = n[a] > i[a] ? 1 : -1;
        break;
      }
      return l;
    }
    function r(n, i, o, s) {
      for (var a = 0; o--; ) n[o] -= a, a = n[o] < i[o] ? 1 : 0, n[o] = a * s + n[o] - i[o];
      for (; !n[0] && n.length > 1; ) n.shift();
    }
    return function(n, i, o, s, a, l) {
      var u, c, p, m, g, h, y, O, T, S, R, _, I, ce, Gt, Q, se, Oe, Z, mt, $r = n.constructor, Hn = n.s == i.s ? 1 : -1, X = n.d, F = i.d;
      if (!X || !X[0] || !F || !F[0]) return new $r(!n.s || !i.s || (X ? F && X[0] == F[0] : !F) ? NaN : X && X[0] == 0 || !F ? Hn * 0 : Hn / 0);
      for (l ? (g = 1, c = n.e - i.e) : (l = ye, g = b, c = ne(n.e / g) - ne(i.e / g)), Z = F.length, se = X.length, T = new $r(Hn), S = T.d = [], p = 0; F[p] == (X[p] || 0); p++) ;
      if (F[p] > (X[p] || 0) && c--, o == null ? (ce = o = $r.precision, s = $r.rounding) : a ? ce = o + (n.e - i.e) + 1 : ce = o, ce < 0) S.push(1), h = true;
      else {
        if (ce = ce / g + 2 | 0, p = 0, Z == 1) {
          for (m = 0, F = F[0], ce++; (p < se || m) && ce--; p++) Gt = m * l + (X[p] || 0), S[p] = Gt / F | 0, m = Gt % F | 0;
          h = m || p < se;
        } else {
          for (m = l / (F[0] + 1) | 0, m > 1 && (F = e10(F, m, l), X = e10(X, m, l), Z = F.length, se = X.length), Q = Z, R = X.slice(0, Z), _ = R.length; _ < Z; ) R[_++] = 0;
          mt = F.slice(), mt.unshift(0), Oe = F[0], F[1] >= l / 2 && ++Oe;
          do
            m = 0, u = t(F, R, Z, _), u < 0 ? (I = R[0], Z != _ && (I = I * l + (R[1] || 0)), m = I / Oe | 0, m > 1 ? (m >= l && (m = l - 1), y = e10(F, m, l), O = y.length, _ = R.length, u = t(y, R, O, _), u == 1 && (m--, r(y, Z < O ? mt : F, O, l))) : (m == 0 && (u = m = 1), y = F.slice()), O = y.length, O < _ && y.unshift(0), r(R, y, _, l), u == -1 && (_ = R.length, u = t(F, R, Z, _), u < 1 && (m++, r(R, Z < _ ? mt : F, _, l))), _ = R.length) : u === 0 && (m++, R = [0]), S[p++] = m, u && R[0] ? R[_++] = X[Q] || 0 : (R = [X[Q]], _ = 1);
          while ((Q++ < se || R[0] !== void 0) && ce--);
          h = R[0] !== void 0;
        }
        S[0] || S.shift();
      }
      if (g == 1) T.e = c, Ms = h;
      else {
        for (p = 1, m = S[0]; m >= 10; m /= 10) p++;
        T.e = p + c * g - 1, E(T, a ? o + T.e + 1 : o, s, h);
      }
      return T;
    };
  }();
  function E(e10, t, r, n) {
    var i, o, s, a, l, u, c, p, m, g = e10.constructor;
    e: if (t != null) {
      if (p = e10.d, !p) return e10;
      for (i = 1, a = p[0]; a >= 10; a /= 10) i++;
      if (o = t - i, o < 0) o += b, s = t, c = p[m = 0], l = c / J(10, i - s - 1) % 10 | 0;
      else if (m = Math.ceil((o + 1) / b), a = p.length, m >= a) if (n) {
        for (; a++ <= m; ) p.push(0);
        c = l = 0, i = 1, o %= b, s = o - b + 1;
      } else break e;
      else {
        for (c = a = p[m], i = 1; a >= 10; a /= 10) i++;
        o %= b, s = o - b + i, l = s < 0 ? 0 : c / J(10, i - s - 1) % 10 | 0;
      }
      if (n = n || t < 0 || p[m + 1] !== void 0 || (s < 0 ? c : c % J(10, i - s - 1)), u = r < 4 ? (l || n) && (r == 0 || r == (e10.s < 0 ? 3 : 2)) : l > 5 || l == 5 && (r == 4 || n || r == 6 && (o > 0 ? s > 0 ? c / J(10, i - s) : 0 : p[m - 1]) % 10 & 1 || r == (e10.s < 0 ? 8 : 7)), t < 1 || !p[0]) return p.length = 0, u ? (t -= e10.e + 1, p[0] = J(10, (b - t % b) % b), e10.e = -t || 0) : p[0] = e10.e = 0, e10;
      if (o == 0 ? (p.length = m, a = 1, m--) : (p.length = m + 1, a = J(10, b - o), p[m] = s > 0 ? (c / J(10, i - s) % J(10, s) | 0) * a : 0), u) for (; ; ) if (m == 0) {
        for (o = 1, s = p[0]; s >= 10; s /= 10) o++;
        for (s = p[0] += a, a = 1; s >= 10; s /= 10) a++;
        o != a && (e10.e++, p[0] == ye && (p[0] = 1));
        break;
      } else {
        if (p[m] += a, p[m] != ye) break;
        p[m--] = 0, a = 1;
      }
      for (o = p.length; p[--o] === 0; ) p.pop();
    }
    return w && (e10.e > g.maxE ? (e10.d = null, e10.e = NaN) : e10.e < g.minE && (e10.e = 0, e10.d = [0])), e10;
  }
  function Te(e10, t, r) {
    if (!e10.isFinite()) return Gs(e10);
    var n, i = e10.e, o = z(e10.d), s = o.length;
    return t ? (r && (n = r - s) > 0 ? o = o.charAt(0) + "." + o.slice(1) + He(n) : s > 1 && (o = o.charAt(0) + "." + o.slice(1)), o = o + (e10.e < 0 ? "e" : "e+") + e10.e) : i < 0 ? (o = "0." + He(-i - 1) + o, r && (n = r - s) > 0 && (o += He(n))) : i >= s ? (o += He(i + 1 - s), r && (n = r - i - 1) > 0 && (o = o + "." + He(n))) : ((n = i + 1) < s && (o = o.slice(0, n) + "." + o.slice(n)), r && (n = r - s) > 0 && (i + 1 === s && (o += "."), o += He(n))), o;
  }
  function cn(e10, t) {
    var r = e10[0];
    for (t *= b; r >= 10; r /= 10) t++;
    return t;
  }
  function ln(e10, t, r) {
    if (t > Wc) throw w = true, r && (e10.precision = r), Error($s);
    return E(new e10(sn), t, 1, true);
  }
  function ve(e10, t, r) {
    if (t > ji) throw Error($s);
    return E(new e10(an), t, r, true);
  }
  function Bs(e10) {
    var t = e10.length - 1, r = t * b + 1;
    if (t = e10[t], t) {
      for (; t % 10 == 0; t /= 10) r--;
      for (t = e10[0]; t >= 10; t /= 10) r++;
    }
    return r;
  }
  function He(e10) {
    for (var t = ""; e10--; ) t += "0";
    return t;
  }
  function Us(e10, t, r, n) {
    var i, o = new e10(1), s = Math.ceil(n / b + 4);
    for (w = false; ; ) {
      if (r % 2 && (o = o.times(t), Ls(o.d, s) && (i = true)), r = ne(r / 2), r === 0) {
        r = o.d.length - 1, i && o.d[r] === 0 && ++o.d[r];
        break;
      }
      t = t.times(t), Ls(t.d, s);
    }
    return w = true, o;
  }
  function Ns(e10) {
    return e10.d[e10.d.length - 1] & 1;
  }
  function Qs(e10, t, r) {
    for (var n, i, o = new e10(t[0]), s = 0; ++s < t.length; ) {
      if (i = new e10(t[s]), !i.s) {
        o = i;
        break;
      }
      n = o.cmp(i), (n === r || n === 0 && o.s === r) && (o = i);
    }
    return o;
  }
  function Bi(e10, t) {
    var r, n, i, o, s, a, l, u = 0, c = 0, p = 0, m = e10.constructor, g = m.rounding, h = m.precision;
    if (!e10.d || !e10.d[0] || e10.e > 17) return new m(e10.d ? e10.d[0] ? e10.s < 0 ? 0 : 1 / 0 : 1 : e10.s ? e10.s < 0 ? 0 : e10 : NaN);
    for (t == null ? (w = false, l = h) : l = t, a = new m(0.03125); e10.e > -2; ) e10 = e10.times(a), p += 5;
    for (n = Math.log(J(2, p)) / Math.LN10 * 2 + 5 | 0, l += n, r = o = s = new m(1), m.precision = l; ; ) {
      if (o = E(o.times(e10), l, 1), r = r.times(++c), a = s.plus($(o, r, l, 1)), z(a.d).slice(0, l) === z(s.d).slice(0, l)) {
        for (i = p; i--; ) s = E(s.times(s), l, 1);
        if (t == null) if (u < 3 && sr(s.d, l - n, g, u)) m.precision = l += 10, r = o = a = new m(1), c = 0, u++;
        else return E(s, m.precision = h, g, w = true);
        else return m.precision = h, s;
      }
      s = a;
    }
  }
  function Ke(e10, t) {
    var r, n, i, o, s, a, l, u, c, p, m, g = 1, h = 10, y = e10, O = y.d, T = y.constructor, S = T.rounding, R = T.precision;
    if (y.s < 0 || !O || !O[0] || !y.e && O[0] == 1 && O.length == 1) return new T(O && !O[0] ? -1 / 0 : y.s != 1 ? NaN : O ? 0 : y);
    if (t == null ? (w = false, c = R) : c = t, T.precision = c += h, r = z(O), n = r.charAt(0), Math.abs(o = y.e) < 15e14) {
      for (; n < 7 && n != 1 || n == 1 && r.charAt(1) > 3; ) y = y.times(e10), r = z(y.d), n = r.charAt(0), g++;
      o = y.e, n > 1 ? (y = new T("0." + r), o++) : y = new T(n + "." + r.slice(1));
    } else return u = ln(T, c + 2, R).times(o + ""), y = Ke(new T(n + "." + r.slice(1)), c - h).plus(u), T.precision = R, t == null ? E(y, R, S, w = true) : y;
    for (p = y, l = s = y = $(y.minus(1), y.plus(1), c, 1), m = E(y.times(y), c, 1), i = 3; ; ) {
      if (s = E(s.times(m), c, 1), u = l.plus($(s, new T(i), c, 1)), z(u.d).slice(0, c) === z(l.d).slice(0, c)) if (l = l.times(2), o !== 0 && (l = l.plus(ln(T, c + 2, R).times(o + ""))), l = $(l, new T(g), c, 1), t == null) if (sr(l.d, c - h, S, a)) T.precision = c += h, u = s = y = $(p.minus(1), p.plus(1), c, 1), m = E(y.times(y), c, 1), i = a = 1;
      else return E(l, T.precision = R, S, w = true);
      else return T.precision = R, l;
      l = u, i += 2;
    }
  }
  function Gs(e10) {
    return String(e10.s * e10.s / 0);
  }
  function on(e10, t) {
    var r, n, i;
    for ((r = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (n = t.search(/e/i)) > 0 ? (r < 0 && (r = n), r += +t.slice(n + 1), t = t.substring(0, n)) : r < 0 && (r = t.length), n = 0; t.charCodeAt(n) === 48; n++) ;
    for (i = t.length; t.charCodeAt(i - 1) === 48; --i) ;
    if (t = t.slice(n, i), t) {
      if (i -= n, e10.e = r = r - n - 1, e10.d = [], n = (r + 1) % b, r < 0 && (n += b), n < i) {
        for (n && e10.d.push(+t.slice(0, n)), i -= b; n < i; ) e10.d.push(+t.slice(n, n += b));
        t = t.slice(n), n = b - t.length;
      } else n -= i;
      for (; n--; ) t += "0";
      e10.d.push(+t), w && (e10.e > e10.constructor.maxE ? (e10.d = null, e10.e = NaN) : e10.e < e10.constructor.minE && (e10.e = 0, e10.d = [0]));
    } else e10.e = 0, e10.d = [0];
    return e10;
  }
  function Kc(e10, t) {
    var r, n, i, o, s, a, l, u, c;
    if (t.indexOf("_") > -1) {
      if (t = t.replace(/(\d)_(?=\d)/g, "$1"), js.test(t)) return on(e10, t);
    } else if (t === "Infinity" || t === "NaN") return +t || (e10.s = NaN), e10.e = NaN, e10.d = null, e10;
    if (Qc.test(t)) r = 16, t = t.toLowerCase();
    else if (Uc.test(t)) r = 2;
    else if (Gc.test(t)) r = 8;
    else throw Error(Ye + t);
    for (o = t.search(/p/i), o > 0 ? (l = +t.slice(o + 1), t = t.substring(2, o)) : t = t.slice(2), o = t.indexOf("."), s = o >= 0, n = e10.constructor, s && (t = t.replace(".", ""), a = t.length, o = a - o, i = Us(n, new n(r), o, o * 2)), u = nn(t, r, ye), c = u.length - 1, o = c; u[o] === 0; --o) u.pop();
    return o < 0 ? new n(e10.s * 0) : (e10.e = cn(u, c), e10.d = u, w = false, s && (e10 = $(e10, i, a * 4)), l && (e10 = e10.times(Math.abs(l) < 54 ? J(2, l) : st.pow(2, l))), w = true, e10);
  }
  function Yc(e10, t) {
    var r, n = t.d.length;
    if (n < 3) return t.isZero() ? t : xt(e10, 2, t, t);
    r = 1.4 * Math.sqrt(n), r = r > 16 ? 16 : r | 0, t = t.times(1 / pn(5, r)), t = xt(e10, 2, t, t);
    for (var i, o = new e10(5), s = new e10(16), a = new e10(20); r--; ) i = t.times(t), t = t.times(o.plus(i.times(s.times(i).minus(a))));
    return t;
  }
  function xt(e10, t, r, n, i) {
    var o, s, a, l, c = e10.precision, p = Math.ceil(c / b);
    for (w = false, l = r.times(r), a = new e10(n); ; ) {
      if (s = $(a.times(l), new e10(t++ * t++), c, 1), a = i ? n.plus(s) : n.minus(s), n = $(s.times(l), new e10(t++ * t++), c, 1), s = a.plus(n), s.d[p] !== void 0) {
        for (o = p; s.d[o] === a.d[o] && o--; ) ;
        if (o == -1) break;
      }
      o = a, a = n, n = s, s = o;
    }
    return w = true, s.d.length = p + 1, s;
  }
  function pn(e10, t) {
    for (var r = e10; --t; ) r *= e10;
    return r;
  }
  function Js(e10, t) {
    var r, n = t.s < 0, i = ve(e10, e10.precision, 1), o = i.times(0.5);
    if (t = t.abs(), t.lte(o)) return $e = n ? 4 : 1, t;
    if (r = t.divToInt(i), r.isZero()) $e = n ? 3 : 2;
    else {
      if (t = t.minus(r.times(i)), t.lte(o)) return $e = Ns(r) ? n ? 2 : 3 : n ? 4 : 1, t;
      $e = Ns(r) ? n ? 1 : 4 : n ? 3 : 2;
    }
    return t.minus(i).abs();
  }
  function Ui(e10, t, r, n) {
    var i, o, s, a, l, u, c, p, m, g = e10.constructor, h = r !== void 0;
    if (h ? (ae(r, 1, ze), n === void 0 ? n = g.rounding : ae(n, 0, 8)) : (r = g.precision, n = g.rounding), !e10.isFinite()) c = Gs(e10);
    else {
      for (c = Te(e10), s = c.indexOf("."), h ? (i = 2, t == 16 ? r = r * 4 - 3 : t == 8 && (r = r * 3 - 2)) : i = t, s >= 0 && (c = c.replace(".", ""), m = new g(1), m.e = c.length - s, m.d = nn(Te(m), 10, i), m.e = m.d.length), p = nn(c, 10, i), o = l = p.length; p[--l] == 0; ) p.pop();
      if (!p[0]) c = h ? "0p+0" : "0";
      else {
        if (s < 0 ? o-- : (e10 = new g(e10), e10.d = p, e10.e = o, e10 = $(e10, m, r, n, 0, i), p = e10.d, o = e10.e, u = Ms), s = p[r], a = i / 2, u = u || p[r + 1] !== void 0, u = n < 4 ? (s !== void 0 || u) && (n === 0 || n === (e10.s < 0 ? 3 : 2)) : s > a || s === a && (n === 4 || u || n === 6 && p[r - 1] & 1 || n === (e10.s < 0 ? 8 : 7)), p.length = r, u) for (; ++p[--r] > i - 1; ) p[r] = 0, r || (++o, p.unshift(1));
        for (l = p.length; !p[l - 1]; --l) ;
        for (s = 0, c = ""; s < l; s++) c += qi.charAt(p[s]);
        if (h) {
          if (l > 1) if (t == 16 || t == 8) {
            for (s = t == 16 ? 4 : 3, --l; l % s; l++) c += "0";
            for (p = nn(c, i, t), l = p.length; !p[l - 1]; --l) ;
            for (s = 1, c = "1."; s < l; s++) c += qi.charAt(p[s]);
          } else c = c.charAt(0) + "." + c.slice(1);
          c = c + (o < 0 ? "p" : "p+") + o;
        } else if (o < 0) {
          for (; ++o; ) c = "0" + c;
          c = "0." + c;
        } else if (++o > l) for (o -= l; o--; ) c += "0";
        else o < l && (c = c.slice(0, o) + "." + c.slice(o));
      }
      c = (t == 16 ? "0x" : t == 2 ? "0b" : t == 8 ? "0o" : "") + c;
    }
    return e10.s < 0 ? "-" + c : c;
  }
  function Ls(e10, t) {
    if (e10.length > t) return e10.length = t, true;
  }
  function zc(e10) {
    return new this(e10).abs();
  }
  function Zc(e10) {
    return new this(e10).acos();
  }
  function Xc(e10) {
    return new this(e10).acosh();
  }
  function ep(e10, t) {
    return new this(e10).plus(t);
  }
  function tp(e10) {
    return new this(e10).asin();
  }
  function rp(e10) {
    return new this(e10).asinh();
  }
  function np(e10) {
    return new this(e10).atan();
  }
  function ip(e10) {
    return new this(e10).atanh();
  }
  function op(e10, t) {
    e10 = new this(e10), t = new this(t);
    var r, n = this.precision, i = this.rounding, o = n + 4;
    return !e10.s || !t.s ? r = new this(NaN) : !e10.d && !t.d ? (r = ve(this, o, 1).times(t.s > 0 ? 0.25 : 0.75), r.s = e10.s) : !t.d || e10.isZero() ? (r = t.s < 0 ? ve(this, n, i) : new this(0), r.s = e10.s) : !e10.d || t.isZero() ? (r = ve(this, o, 1).times(0.5), r.s = e10.s) : t.s < 0 ? (this.precision = o, this.rounding = 1, r = this.atan($(e10, t, o, 1)), t = ve(this, o, 1), this.precision = n, this.rounding = i, r = e10.s < 0 ? r.minus(t) : r.plus(t)) : r = this.atan($(e10, t, o, 1)), r;
  }
  function sp(e10) {
    return new this(e10).cbrt();
  }
  function ap(e10) {
    return E(e10 = new this(e10), e10.e + 1, 2);
  }
  function lp(e10, t, r) {
    return new this(e10).clamp(t, r);
  }
  function up(e10) {
    if (!e10 || typeof e10 != "object") throw Error(un + "Object expected");
    var t, r, n, i = e10.defaults === true, o = ["precision", 1, ze, "rounding", 0, 8, "toExpNeg", -9e15, 0, "toExpPos", 0, wt, "maxE", 0, wt, "minE", -9e15, 0, "modulo", 0, 9];
    for (t = 0; t < o.length; t += 3) if (r = o[t], i && (this[r] = Vi[r]), (n = e10[r]) !== void 0) if (ne(n) === n && n >= o[t + 1] && n <= o[t + 2]) this[r] = n;
    else throw Error(Ye + r + ": " + n);
    if (r = "crypto", i && (this[r] = Vi[r]), (n = e10[r]) !== void 0) if (n === true || n === false || n === 0 || n === 1) if (n) if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes)) this[r] = true;
    else throw Error(qs);
    else this[r] = false;
    else throw Error(Ye + r + ": " + n);
    return this;
  }
  function cp(e10) {
    return new this(e10).cos();
  }
  function pp(e10) {
    return new this(e10).cosh();
  }
  function Ws(e10) {
    var t, r, n;
    function i(o) {
      var s, a, l, u = this;
      if (!(u instanceof i)) return new i(o);
      if (u.constructor = i, Fs(o)) {
        u.s = o.s, w ? !o.d || o.e > i.maxE ? (u.e = NaN, u.d = null) : o.e < i.minE ? (u.e = 0, u.d = [0]) : (u.e = o.e, u.d = o.d.slice()) : (u.e = o.e, u.d = o.d ? o.d.slice() : o.d);
        return;
      }
      if (l = typeof o, l === "number") {
        if (o === 0) {
          u.s = 1 / o < 0 ? -1 : 1, u.e = 0, u.d = [0];
          return;
        }
        if (o < 0 ? (o = -o, u.s = -1) : u.s = 1, o === ~~o && o < 1e7) {
          for (s = 0, a = o; a >= 10; a /= 10) s++;
          w ? s > i.maxE ? (u.e = NaN, u.d = null) : s < i.minE ? (u.e = 0, u.d = [0]) : (u.e = s, u.d = [o]) : (u.e = s, u.d = [o]);
          return;
        }
        if (o * 0 !== 0) {
          o || (u.s = NaN), u.e = NaN, u.d = null;
          return;
        }
        return on(u, o.toString());
      }
      if (l === "string") return (a = o.charCodeAt(0)) === 45 ? (o = o.slice(1), u.s = -1) : (a === 43 && (o = o.slice(1)), u.s = 1), js.test(o) ? on(u, o) : Kc(u, o);
      if (l === "bigint") return o < 0 ? (o = -o, u.s = -1) : u.s = 1, on(u, o.toString());
      throw Error(Ye + o);
    }
    if (i.prototype = f, i.ROUND_UP = 0, i.ROUND_DOWN = 1, i.ROUND_CEIL = 2, i.ROUND_FLOOR = 3, i.ROUND_HALF_UP = 4, i.ROUND_HALF_DOWN = 5, i.ROUND_HALF_EVEN = 6, i.ROUND_HALF_CEIL = 7, i.ROUND_HALF_FLOOR = 8, i.EUCLID = 9, i.config = i.set = up, i.clone = Ws, i.isDecimal = Fs, i.abs = zc, i.acos = Zc, i.acosh = Xc, i.add = ep, i.asin = tp, i.asinh = rp, i.atan = np, i.atanh = ip, i.atan2 = op, i.cbrt = sp, i.ceil = ap, i.clamp = lp, i.cos = cp, i.cosh = pp, i.div = dp, i.exp = mp, i.floor = fp, i.hypot = gp, i.ln = hp, i.log = yp, i.log10 = bp, i.log2 = Ep, i.max = wp, i.min = xp, i.mod = Pp, i.mul = vp, i.pow = Tp, i.random = Cp, i.round = Rp, i.sign = Sp, i.sin = Ap, i.sinh = Ip, i.sqrt = kp, i.sub = Op, i.sum = _p, i.tan = Dp, i.tanh = Np, i.trunc = Lp, e10 === void 0 && (e10 = {}), e10 && e10.defaults !== true) for (n = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"], t = 0; t < n.length; ) e10.hasOwnProperty(r = n[t++]) || (e10[r] = this[r]);
    return i.config(e10), i;
  }
  function dp(e10, t) {
    return new this(e10).div(t);
  }
  function mp(e10) {
    return new this(e10).exp();
  }
  function fp(e10) {
    return E(e10 = new this(e10), e10.e + 1, 3);
  }
  function gp() {
    var e10, t, r = new this(0);
    for (w = false, e10 = 0; e10 < arguments.length; ) if (t = new this(arguments[e10++]), t.d) r.d && (r = r.plus(t.times(t)));
    else {
      if (t.s) return w = true, new this(1 / 0);
      r = t;
    }
    return w = true, r.sqrt();
  }
  function Fs(e10) {
    return e10 instanceof st || e10 && e10.toStringTag === Vs || false;
  }
  function hp(e10) {
    return new this(e10).ln();
  }
  function yp(e10, t) {
    return new this(e10).log(t);
  }
  function Ep(e10) {
    return new this(e10).log(2);
  }
  function bp(e10) {
    return new this(e10).log(10);
  }
  function wp() {
    return Qs(this, arguments, -1);
  }
  function xp() {
    return Qs(this, arguments, 1);
  }
  function Pp(e10, t) {
    return new this(e10).mod(t);
  }
  function vp(e10, t) {
    return new this(e10).mul(t);
  }
  function Tp(e10, t) {
    return new this(e10).pow(t);
  }
  function Cp(e10) {
    var t, r, n, i, o = 0, s = new this(1), a = [];
    if (e10 === void 0 ? e10 = this.precision : ae(e10, 1, ze), n = Math.ceil(e10 / b), this.crypto) if (crypto.getRandomValues) for (t = crypto.getRandomValues(new Uint32Array(n)); o < n; ) i = t[o], i >= 429e7 ? t[o] = crypto.getRandomValues(new Uint32Array(1))[0] : a[o++] = i % 1e7;
    else if (crypto.randomBytes) {
      for (t = crypto.randomBytes(n *= 4); o < n; ) i = t[o] + (t[o + 1] << 8) + (t[o + 2] << 16) + ((t[o + 3] & 127) << 24), i >= 214e7 ? crypto.randomBytes(4).copy(t, o) : (a.push(i % 1e7), o += 4);
      o = n / 4;
    } else throw Error(qs);
    else for (; o < n; ) a[o++] = Math.random() * 1e7 | 0;
    for (n = a[--o], e10 %= b, n && e10 && (i = J(10, b - e10), a[o] = (n / i | 0) * i); a[o] === 0; o--) a.pop();
    if (o < 0) r = 0, a = [0];
    else {
      for (r = -1; a[0] === 0; r -= b) a.shift();
      for (n = 1, i = a[0]; i >= 10; i /= 10) n++;
      n < b && (r -= b - n);
    }
    return s.e = r, s.d = a, s;
  }
  function Rp(e10) {
    return E(e10 = new this(e10), e10.e + 1, this.rounding);
  }
  function Sp(e10) {
    return e10 = new this(e10), e10.d ? e10.d[0] ? e10.s : 0 * e10.s : e10.s || NaN;
  }
  function Ap(e10) {
    return new this(e10).sin();
  }
  function Ip(e10) {
    return new this(e10).sinh();
  }
  function kp(e10) {
    return new this(e10).sqrt();
  }
  function Op(e10, t) {
    return new this(e10).sub(t);
  }
  function _p() {
    var e10 = 0, t = arguments, r = new this(t[e10]);
    for (w = false; r.s && ++e10 < t.length; ) r = r.plus(t[e10]);
    return w = true, E(r, this.precision, this.rounding);
  }
  function Dp(e10) {
    return new this(e10).tan();
  }
  function Np(e10) {
    return new this(e10).tanh();
  }
  function Lp(e10) {
    return E(e10 = new this(e10), e10.e + 1, 1);
  }
  f[Symbol.for("nodejs.util.inspect.custom")] = f.toString;
  f[Symbol.toStringTag] = "Decimal";
  var st = f.constructor = Ws(Vi);
  sn = new st(sn);
  an = new st(an);
  var Ce = st;
  function Pt(e10) {
    return e10 === null ? e10 : Array.isArray(e10) ? e10.map(Pt) : typeof e10 == "object" ? Fp(e10) ? Mp(e10) : bt(e10, Pt) : e10;
  }
  function Fp(e10) {
    return e10 !== null && typeof e10 == "object" && typeof e10.$type == "string";
  }
  function Mp({ $type: e10, value: t }) {
    switch (e10) {
      case "BigInt":
        return BigInt(t);
      case "Bytes": {
        let { buffer: r, byteOffset: n, byteLength: i } = Buffer.from(t, "base64");
        return new Uint8Array(r, n, i);
      }
      case "DateTime":
        return new Date(t);
      case "Decimal":
        return new Ce(t);
      case "Json":
        return JSON.parse(t);
      default:
        Me(t, "Unknown tagged value");
    }
  }
  function vt(e10) {
    return e10.substring(0, 1).toLowerCase() + e10.substring(1);
  }
  function Tt(e10) {
    return e10 instanceof Date || Object.prototype.toString.call(e10) === "[object Date]";
  }
  function dn(e10) {
    return e10.toString() !== "Invalid Date";
  }
  function Ct(e10) {
    return st.isDecimal(e10) ? true : e10 !== null && typeof e10 == "object" && typeof e10.s == "number" && typeof e10.e == "number" && typeof e10.toFixed == "function" && Array.isArray(e10.d);
  }
  D(Oi());
  D(require$$2);
  var Hs = { keyword: Ne, entity: Ne, value: (e10) => Y(it(e10)), punctuation: it, directive: Ne, function: Ne, variable: (e10) => Y(it(e10)), string: (e10) => Y(je(e10)), boolean: De, number: Ne, comment: Ht };
  var $p = (e10) => e10, mn = {}, qp = 0, P = { manual: mn.Prism && mn.Prism.manual, disableWorkerMessageHandler: mn.Prism && mn.Prism.disableWorkerMessageHandler, util: { encode: function(e10) {
    if (e10 instanceof Ee) {
      let t = e10;
      return new Ee(t.type, P.util.encode(t.content), t.alias);
    } else return Array.isArray(e10) ? e10.map(P.util.encode) : e10.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
  }, type: function(e10) {
    return Object.prototype.toString.call(e10).slice(8, -1);
  }, objId: function(e10) {
    return e10.__id || Object.defineProperty(e10, "__id", { value: ++qp }), e10.__id;
  }, clone: function e3(t, r) {
    let n, i, o = P.util.type(t);
    switch (r = r || {}, o) {
      case "Object":
        if (i = P.util.objId(t), r[i]) return r[i];
        n = {}, r[i] = n;
        for (let s in t) t.hasOwnProperty(s) && (n[s] = e3(t[s], r));
        return n;
      case "Array":
        return i = P.util.objId(t), r[i] ? r[i] : (n = [], r[i] = n, t.forEach(function(s, a) {
          n[a] = e3(s, r);
        }), n);
      default:
        return t;
    }
  } }, languages: { extend: function(e10, t) {
    let r = P.util.clone(P.languages[e10]);
    for (let n in t) r[n] = t[n];
    return r;
  }, insertBefore: function(e10, t, r, n) {
    n = n || P.languages;
    let i = n[e10], o = {};
    for (let a in i) if (i.hasOwnProperty(a)) {
      if (a == t) for (let l in r) r.hasOwnProperty(l) && (o[l] = r[l]);
      r.hasOwnProperty(a) || (o[a] = i[a]);
    }
    let s = n[e10];
    return n[e10] = o, P.languages.DFS(P.languages, function(a, l) {
      l === s && a != e10 && (this[a] = o);
    }), o;
  }, DFS: function e4(t, r, n, i) {
    i = i || {};
    let o = P.util.objId;
    for (let s in t) if (t.hasOwnProperty(s)) {
      r.call(t, s, t[s], n || s);
      let a = t[s], l = P.util.type(a);
      l === "Object" && !i[o(a)] ? (i[o(a)] = true, e4(a, r, null, i)) : l === "Array" && !i[o(a)] && (i[o(a)] = true, e4(a, r, s, i));
    }
  } }};
  P.languages.clike = { comment: [{ pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: true }, { pattern: /(^|[^\\:])\/\/.*/, lookbehind: true, greedy: true }], string: { pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: true }, "class-name": { pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i, lookbehind: true, inside: { punctuation: /[.\\]/ } }, keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/, boolean: /\b(?:true|false)\b/, function: /\w+(?=\()/, number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i, operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/, punctuation: /[{}[\];(),.:]/ };
  P.languages.javascript = P.languages.extend("clike", { "class-name": [P.languages.clike["class-name"], { pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/, lookbehind: true }], keyword: [{ pattern: /((?:^|})\s*)(?:catch|finally)\b/, lookbehind: true }, { pattern: /(^|[^.])\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/, lookbehind: true }], number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/, function: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/, operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/ });
  P.languages.javascript["class-name"][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/;
  P.languages.insertBefore("javascript", "keyword", { regex: { pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=\s*($|[\r\n,.;})\]]))/, lookbehind: true, greedy: true }, "function-variable": { pattern: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/, alias: "function" }, parameter: [{ pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/, lookbehind: true, inside: P.languages.javascript }, { pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i, inside: P.languages.javascript }, { pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/, lookbehind: true, inside: P.languages.javascript }, { pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/, lookbehind: true, inside: P.languages.javascript }], constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/ });
  P.languages.markup && P.languages.markup.tag.addInlined("script", "javascript");
  P.languages.js = P.languages.javascript;
  P.languages.typescript = P.languages.extend("javascript", { keyword: /\b(?:abstract|as|async|await|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|is|keyof|let|module|namespace|new|null|of|package|private|protected|public|readonly|return|require|set|static|super|switch|this|throw|try|type|typeof|var|void|while|with|yield)\b/, builtin: /\b(?:string|Function|any|number|boolean|Array|symbol|console|Promise|unknown|never)\b/ });
  P.languages.ts = P.languages.typescript;
  function Ee(e10, t, r, n, i) {
    this.type = e10, this.content = t, this.alias = r, this.length = (n || "").length | 0, this.greedy = !!i;
  }
  Ee.stringify = function(e10, t) {
    return typeof e10 == "string" ? e10 : Array.isArray(e10) ? e10.map(function(r) {
      return Ee.stringify(r, t);
    }).join("") : Vp(e10.type)(e10.content);
  };
  function Vp(e10) {
    return Hs[e10] || $p;
  }
  D(Ts());
  var Bp = { red: fe, gray: Ht, dim: _e, bold: Y, underline: ee, highlightSource: (e10) => e10.highlight() }, Up = { red: (e10) => e10, gray: (e10) => e10, dim: (e10) => e10, bold: (e10) => e10, underline: (e10) => e10, highlightSource: (e10) => e10 };
  function Qp({ message: e10, originalMethod: t, isPanic: r, callArguments: n }) {
    return { functionName: `prisma.${t}()`, message: e10, isPanic: r ?? false, callArguments: n };
  }
  function Gp({ callsite: e10, message: t, originalMethod: r, isPanic: n, callArguments: i }, o) {
    let s = Qp({ message: t, originalMethod: r, isPanic: n, callArguments: i });
    return s;
  }
  function Hp({ functionName: e10, location: t, message: r, isPanic: n, contextLines: i, callArguments: o }, s) {
    let a = [""], l = t ? " in" : ":";
    if (n ? (a.push(s.red(`Oops, an unknown error occurred! This is ${s.bold("on us")}, you did nothing wrong.`)), a.push(s.red(`It occurred in the ${s.bold(`\`${e10}\``)} invocation${l}`))) : a.push(s.red(`Invalid ${s.bold(`\`${e10}\``)} invocation${l}`)), t && a.push(s.underline(Kp(t))), i) {
      a.push("");
      let u = [i.toString()];
      o && (u.push(o), u.push(s.dim(")"))), a.push(u.join("")), o && a.push("");
    } else a.push(""), o && a.push(o), a.push("");
    return a.push(r), a.join(`
`);
  }
  function Kp(e10) {
    let t = [e10.fileName];
    return e10.lineNumber && t.push(String(e10.lineNumber)), e10.columnNumber && t.push(String(e10.columnNumber)), t.join(":");
  }
  function gn(e10) {
    let t = e10.showColors ? Bp : Up, r;
    return r = Gp(e10), Hp(r, t);
  }
  var sa = D(Qi());
  function na(e10, t, r) {
    let n = ia(e10), i = Yp(n), o = Zp(i);
    o ? hn(o, t, r) : t.addErrorMessage(() => "Unknown error");
  }
  function ia(e10) {
    return e10.errors.flatMap((t) => t.kind === "Union" ? ia(t) : [t]);
  }
  function Yp(e10) {
    let t = /* @__PURE__ */ new Map(), r = [];
    for (let n of e10) {
      if (n.kind !== "InvalidArgumentType") {
        r.push(n);
        continue;
      }
      let i = `${n.selectionPath.join(".")}:${n.argumentPath.join(".")}`, o = t.get(i);
      o ? t.set(i, { ...n, argument: { ...n.argument, typeNames: zp(o.argument.typeNames, n.argument.typeNames) } }) : t.set(i, n);
    }
    return r.push(...t.values()), r;
  }
  function zp(e10, t) {
    return [...new Set(e10.concat(t))];
  }
  function Zp(e10) {
    return $i(e10, (t, r) => {
      let n = ta(t), i = ta(r);
      return n !== i ? n - i : ra(t) - ra(r);
    });
  }
  function ta(e10) {
    let t = 0;
    return Array.isArray(e10.selectionPath) && (t += e10.selectionPath.length), Array.isArray(e10.argumentPath) && (t += e10.argumentPath.length), t;
  }
  function ra(e10) {
    switch (e10.kind) {
      case "InvalidArgumentValue":
      case "ValueTooLarge":
        return 20;
      case "InvalidArgumentType":
        return 10;
      case "RequiredArgumentMissing":
        return -10;
      default:
        return 0;
    }
  }
  var de = class {
    constructor(t, r) {
      this.name = t;
      this.value = r;
      d(this, "isRequired", false);
    }
    makeRequired() {
      return this.isRequired = true, this;
    }
    write(t) {
      let { colors: { green: r } } = t.context;
      t.addMarginSymbol(r(this.isRequired ? "+" : "?")), t.write(r(this.name)), this.isRequired || t.write(r("?")), t.write(r(": ")), typeof this.value == "string" ? t.write(r(this.value)) : t.write(this.value);
    }
  };
  var Rt = class {
    constructor(t = 0, r) {
      this.context = r;
      d(this, "lines", []);
      d(this, "currentLine", "");
      d(this, "currentIndent", 0);
      d(this, "marginSymbol");
      d(this, "afterNextNewLineCallback");
      this.currentIndent = t;
    }
    write(t) {
      return typeof t == "string" ? this.currentLine += t : t.write(this), this;
    }
    writeJoined(t, r, n = (i, o) => o.write(i)) {
      let i = r.length - 1;
      for (let o = 0; o < r.length; o++) n(r[o], this), o !== i && this.write(t);
      return this;
    }
    writeLine(t) {
      return this.write(t).newLine();
    }
    newLine() {
      this.lines.push(this.indentedCurrentLine()), this.currentLine = "", this.marginSymbol = void 0;
      let t = this.afterNextNewLineCallback;
      return this.afterNextNewLineCallback = void 0, t == null ? void 0 : t(), this;
    }
    withIndent(t) {
      return this.indent(), t(this), this.unindent(), this;
    }
    afterNextNewline(t) {
      return this.afterNextNewLineCallback = t, this;
    }
    indent() {
      return this.currentIndent++, this;
    }
    unindent() {
      return this.currentIndent > 0 && this.currentIndent--, this;
    }
    addMarginSymbol(t) {
      return this.marginSymbol = t, this;
    }
    toString() {
      return this.lines.concat(this.indentedCurrentLine()).join(`
`);
    }
    getCurrentLineLength() {
      return this.currentLine.length;
    }
    indentedCurrentLine() {
      let t = this.currentLine.padStart(this.currentLine.length + 2 * this.currentIndent);
      return this.marginSymbol ? this.marginSymbol + t.slice(1) : t;
    }
  };
  var yn = class {
    constructor(t) {
      this.value = t;
    }
    write(t) {
      t.write(this.value);
    }
    markAsError() {
      this.value.markAsError();
    }
  };
  var En = (e10) => e10, bn = { bold: En, red: En, green: En, dim: En, enabled: false }, oa = { bold: Y, red: fe, green: je, dim: _e, enabled: true }, St = { write(e10) {
    e10.writeLine(",");
  } };
  var Re = class {
    constructor(t) {
      this.contents = t;
      d(this, "isUnderlined", false);
      d(this, "color", (t2) => t2);
    }
    underline() {
      return this.isUnderlined = true, this;
    }
    setColor(t) {
      return this.color = t, this;
    }
    write(t) {
      let r = t.getCurrentLineLength();
      t.write(this.color(this.contents)), this.isUnderlined && t.afterNextNewline(() => {
        t.write(" ".repeat(r)).writeLine(this.color("~".repeat(this.contents.length)));
      });
    }
  };
  var Ze = class {
    constructor() {
      d(this, "hasError", false);
    }
    markAsError() {
      return this.hasError = true, this;
    }
  };
  var At = class extends Ze {
    constructor() {
      super(...arguments);
      d(this, "items", []);
    }
    addItem(r) {
      return this.items.push(new yn(r)), this;
    }
    getField(r) {
      return this.items[r];
    }
    getPrintWidth() {
      return this.items.length === 0 ? 2 : Math.max(...this.items.map((n) => n.value.getPrintWidth())) + 2;
    }
    write(r) {
      if (this.items.length === 0) {
        this.writeEmpty(r);
        return;
      }
      this.writeWithItems(r);
    }
    writeEmpty(r) {
      let n = new Re("[]");
      this.hasError && n.setColor(r.context.colors.red).underline(), r.write(n);
    }
    writeWithItems(r) {
      let { colors: n } = r.context;
      r.writeLine("[").withIndent(() => r.writeJoined(St, this.items).newLine()).write("]"), this.hasError && r.afterNextNewline(() => {
        r.writeLine(n.red("~".repeat(this.getPrintWidth())));
      });
    }
    asObject() {
    }
  };
  var It = class e6 extends Ze {
    constructor() {
      super(...arguments);
      d(this, "fields", {});
      d(this, "suggestions", []);
    }
    addField(r) {
      this.fields[r.name] = r;
    }
    addSuggestion(r) {
      this.suggestions.push(r);
    }
    getField(r) {
      return this.fields[r];
    }
    getDeepField(r) {
      let [n, ...i] = r, o = this.getField(n);
      if (!o) return;
      let s = o;
      for (let a of i) {
        let l;
        if (s.value instanceof e6 ? l = s.value.getField(a) : s.value instanceof At && (l = s.value.getField(Number(a))), !l) return;
        s = l;
      }
      return s;
    }
    getDeepFieldValue(r) {
      var _a2;
      return r.length === 0 ? this : (_a2 = this.getDeepField(r)) == null ? void 0 : _a2.value;
    }
    hasField(r) {
      return !!this.getField(r);
    }
    removeAllFields() {
      this.fields = {};
    }
    removeField(r) {
      delete this.fields[r];
    }
    getFields() {
      return this.fields;
    }
    isEmpty() {
      return Object.keys(this.fields).length === 0;
    }
    getFieldValue(r) {
      var _a2;
      return (_a2 = this.getField(r)) == null ? void 0 : _a2.value;
    }
    getDeepSubSelectionValue(r) {
      let n = this;
      for (let i of r) {
        if (!(n instanceof e6)) return;
        let o = n.getSubSelectionValue(i);
        if (!o) return;
        n = o;
      }
      return n;
    }
    getDeepSelectionParent(r) {
      let n = this.getSelectionParent();
      if (!n) return;
      let i = n;
      for (let o of r) {
        let s = i.value.getFieldValue(o);
        if (!s || !(s instanceof e6)) return;
        let a = s.getSelectionParent();
        if (!a) return;
        i = a;
      }
      return i;
    }
    getSelectionParent() {
      var _a2, _b;
      let r = (_a2 = this.getField("select")) == null ? void 0 : _a2.value.asObject();
      if (r) return { kind: "select", value: r };
      let n = (_b = this.getField("include")) == null ? void 0 : _b.value.asObject();
      if (n) return { kind: "include", value: n };
    }
    getSubSelectionValue(r) {
      var _a2;
      return (_a2 = this.getSelectionParent()) == null ? void 0 : _a2.value.fields[r].value;
    }
    getPrintWidth() {
      let r = Object.values(this.fields);
      return r.length == 0 ? 2 : Math.max(...r.map((i) => i.getPrintWidth())) + 2;
    }
    write(r) {
      let n = Object.values(this.fields);
      if (n.length === 0 && this.suggestions.length === 0) {
        this.writeEmpty(r);
        return;
      }
      this.writeWithContents(r, n);
    }
    asObject() {
      return this;
    }
    writeEmpty(r) {
      let n = new Re("{}");
      this.hasError && n.setColor(r.context.colors.red).underline(), r.write(n);
    }
    writeWithContents(r, n) {
      r.writeLine("{").withIndent(() => {
        r.writeJoined(St, [...n, ...this.suggestions]).newLine();
      }), r.write("}"), this.hasError && r.afterNextNewline(() => {
        r.writeLine(r.context.colors.red("~".repeat(this.getPrintWidth())));
      });
    }
  };
  var H = class extends Ze {
    constructor(r) {
      super();
      this.text = r;
    }
    getPrintWidth() {
      return this.text.length;
    }
    write(r) {
      let n = new Re(this.text);
      this.hasError && n.underline().setColor(r.context.colors.red), r.write(n);
    }
    asObject() {
    }
  };
  var ar = class {
    constructor() {
      d(this, "fields", []);
    }
    addField(t, r) {
      return this.fields.push({ write(n) {
        let { green: i, dim: o } = n.context.colors;
        n.write(i(o(`${t}: ${r}`))).addMarginSymbol(i(o("+")));
      } }), this;
    }
    write(t) {
      let { colors: { green: r } } = t.context;
      t.writeLine(r("{")).withIndent(() => {
        t.writeJoined(St, this.fields).newLine();
      }).write(r("}")).addMarginSymbol(r("+"));
    }
  };
  function hn(e10, t, r) {
    switch (e10.kind) {
      case "MutuallyExclusiveFields":
        ed(e10, t);
        break;
      case "IncludeOnScalar":
        td(e10, t);
        break;
      case "EmptySelection":
        rd(e10, t, r);
        break;
      case "UnknownSelectionField":
        sd(e10, t);
        break;
      case "InvalidSelectionValue":
        ad(e10, t);
        break;
      case "UnknownArgument":
        ld(e10, t);
        break;
      case "UnknownInputField":
        ud(e10, t);
        break;
      case "RequiredArgumentMissing":
        cd(e10, t);
        break;
      case "InvalidArgumentType":
        pd(e10, t);
        break;
      case "InvalidArgumentValue":
        dd(e10, t);
        break;
      case "ValueTooLarge":
        md(e10, t);
        break;
      case "SomeFieldsMissing":
        fd(e10, t);
        break;
      case "TooManyFieldsGiven":
        gd(e10, t);
        break;
      case "Union":
        na(e10, t, r);
        break;
      default:
        throw new Error("not implemented: " + e10.kind);
    }
  }
  function ed(e10, t) {
    var _a2, _b, _c2;
    let r = (_a2 = t.arguments.getDeepSubSelectionValue(e10.selectionPath)) == null ? void 0 : _a2.asObject();
    r && ((_b = r.getField(e10.firstField)) == null ? void 0 : _b.markAsError(), (_c2 = r.getField(e10.secondField)) == null ? void 0 : _c2.markAsError()), t.addErrorMessage((n) => `Please ${n.bold("either")} use ${n.green(`\`${e10.firstField}\``)} or ${n.green(`\`${e10.secondField}\``)}, but ${n.red("not both")} at the same time.`);
  }
  function td(e10, t) {
    var _a2, _b;
    let [r, n] = lr(e10.selectionPath), i = e10.outputType, o = (_a2 = t.arguments.getDeepSelectionParent(r)) == null ? void 0 : _a2.value;
    if (o && ((_b = o.getField(n)) == null ? void 0 : _b.markAsError(), i)) for (let s of i.fields) s.isRelation && o.addSuggestion(new de(s.name, "true"));
    t.addErrorMessage((s) => {
      let a = `Invalid scalar field ${s.red(`\`${n}\``)} for ${s.bold("include")} statement`;
      return i ? a += ` on model ${s.bold(i.name)}. ${ur(s)}` : a += ".", a += `
Note that ${s.bold("include")} statements only accept relation fields.`, a;
    });
  }
  function rd(e10, t, r) {
    var _a2, _b;
    let n = (_a2 = t.arguments.getDeepSubSelectionValue(e10.selectionPath)) == null ? void 0 : _a2.asObject();
    if (n) {
      let i = (_b = n.getField("omit")) == null ? void 0 : _b.value.asObject();
      if (i) {
        nd(e10, t, i);
        return;
      }
      if (n.hasField("select")) {
        id(e10, t);
        return;
      }
    }
    if (r == null ? void 0 : r[vt(e10.outputType.name)]) {
      od(e10, t);
      return;
    }
    t.addErrorMessage(() => `Unknown field at "${e10.selectionPath.join(".")} selection"`);
  }
  function nd(e10, t, r) {
    r.removeAllFields();
    for (let n of e10.outputType.fields) r.addSuggestion(new de(n.name, "false"));
    t.addErrorMessage((n) => `The ${n.red("omit")} statement includes every field of the model ${n.bold(e10.outputType.name)}. At least one field must be included in the result`);
  }
  function id(e10, t) {
    var _a2;
    let r = e10.outputType, n = (_a2 = t.arguments.getDeepSelectionParent(e10.selectionPath)) == null ? void 0 : _a2.value, i = (n == null ? void 0 : n.isEmpty()) ?? false;
    n && (n.removeAllFields(), ua(n, r)), t.addErrorMessage((o) => i ? `The ${o.red("`select`")} statement for type ${o.bold(r.name)} must not be empty. ${ur(o)}` : `The ${o.red("`select`")} statement for type ${o.bold(r.name)} needs ${o.bold("at least one truthy value")}.`);
  }
  function od(e10, t) {
    var _a2, _b;
    let r = new ar();
    for (let i of e10.outputType.fields) i.isRelation || r.addField(i.name, "false");
    let n = new de("omit", r).makeRequired();
    if (e10.selectionPath.length === 0) t.arguments.addSuggestion(n);
    else {
      let [i, o] = lr(e10.selectionPath), a = (_b = (_a2 = t.arguments.getDeepSelectionParent(i)) == null ? void 0 : _a2.value.asObject()) == null ? void 0 : _b.getField(o);
      if (a) {
        let l = (a == null ? void 0 : a.value.asObject()) ?? new It();
        l.addSuggestion(n), a.value = l;
      }
    }
    t.addErrorMessage((i) => `The global ${i.red("omit")} configuration excludes every field of the model ${i.bold(e10.outputType.name)}. At least one field must be included in the result`);
  }
  function sd(e10, t) {
    let r = ca(e10.selectionPath, t);
    if (r.parentKind !== "unknown") {
      r.field.markAsError();
      let n = r.parent;
      switch (r.parentKind) {
        case "select":
          ua(n, e10.outputType);
          break;
        case "include":
          hd(n, e10.outputType);
          break;
        case "omit":
          yd(n, e10.outputType);
          break;
      }
    }
    t.addErrorMessage((n) => {
      let i = [`Unknown field ${n.red(`\`${r.fieldName}\``)}`];
      return r.parentKind !== "unknown" && i.push(`for ${n.bold(r.parentKind)} statement`), i.push(`on model ${n.bold(`\`${e10.outputType.name}\``)}.`), i.push(ur(n)), i.join(" ");
    });
  }
  function ad(e10, t) {
    let r = ca(e10.selectionPath, t);
    r.parentKind !== "unknown" && r.field.value.markAsError(), t.addErrorMessage((n) => `Invalid value for selection field \`${n.red(r.fieldName)}\`: ${e10.underlyingError}`);
  }
  function ld(e10, t) {
    var _a2, _b;
    let r = e10.argumentPath[0], n = (_a2 = t.arguments.getDeepSubSelectionValue(e10.selectionPath)) == null ? void 0 : _a2.asObject();
    n && ((_b = n.getField(r)) == null ? void 0 : _b.markAsError(), Ed(n, e10.arguments)), t.addErrorMessage((i) => aa(i, r, e10.arguments.map((o) => o.name)));
  }
  function ud(e10, t) {
    var _a2, _b, _c2;
    let [r, n] = lr(e10.argumentPath), i = (_a2 = t.arguments.getDeepSubSelectionValue(e10.selectionPath)) == null ? void 0 : _a2.asObject();
    if (i) {
      (_b = i.getDeepField(e10.argumentPath)) == null ? void 0 : _b.markAsError();
      let o = (_c2 = i.getDeepFieldValue(r)) == null ? void 0 : _c2.asObject();
      o && pa(o, e10.inputType);
    }
    t.addErrorMessage((o) => aa(o, n, e10.inputType.fields.map((s) => s.name)));
  }
  function aa(e10, t, r) {
    let n = [`Unknown argument \`${e10.red(t)}\`.`], i = wd(t, r);
    return i && n.push(`Did you mean \`${e10.green(i)}\`?`), r.length > 0 && n.push(ur(e10)), n.join(" ");
  }
  function cd(e10, t) {
    var _a2, _b;
    let r;
    t.addErrorMessage((l) => (r == null ? void 0 : r.value) instanceof H && r.value.text === "null" ? `Argument \`${l.green(o)}\` must not be ${l.red("null")}.` : `Argument \`${l.green(o)}\` is missing.`);
    let n = (_a2 = t.arguments.getDeepSubSelectionValue(e10.selectionPath)) == null ? void 0 : _a2.asObject();
    if (!n) return;
    let [i, o] = lr(e10.argumentPath), s = new ar(), a = (_b = n.getDeepFieldValue(i)) == null ? void 0 : _b.asObject();
    if (a) if (r = a.getField(o), r && a.removeField(o), e10.inputTypes.length === 1 && e10.inputTypes[0].kind === "object") {
      for (let l of e10.inputTypes[0].fields) s.addField(l.name, l.typeNames.join(" | "));
      a.addSuggestion(new de(o, s).makeRequired());
    } else {
      let l = e10.inputTypes.map(la).join(" | ");
      a.addSuggestion(new de(o, l).makeRequired());
    }
  }
  function la(e10) {
    return e10.kind === "list" ? `${la(e10.elementType)}[]` : e10.name;
  }
  function pd(e10, t) {
    var _a2, _b;
    let r = e10.argument.name, n = (_a2 = t.arguments.getDeepSubSelectionValue(e10.selectionPath)) == null ? void 0 : _a2.asObject();
    n && ((_b = n.getDeepFieldValue(e10.argumentPath)) == null ? void 0 : _b.markAsError()), t.addErrorMessage((i) => {
      let o = wn("or", e10.argument.typeNames.map((s) => i.green(s)));
      return `Argument \`${i.bold(r)}\`: Invalid value provided. Expected ${o}, provided ${i.red(e10.inferredType)}.`;
    });
  }
  function dd(e10, t) {
    var _a2, _b;
    let r = e10.argument.name, n = (_a2 = t.arguments.getDeepSubSelectionValue(e10.selectionPath)) == null ? void 0 : _a2.asObject();
    n && ((_b = n.getDeepFieldValue(e10.argumentPath)) == null ? void 0 : _b.markAsError()), t.addErrorMessage((i) => {
      let o = [`Invalid value for argument \`${i.bold(r)}\``];
      if (e10.underlyingError && o.push(`: ${e10.underlyingError}`), o.push("."), e10.argument.typeNames.length > 0) {
        let s = wn("or", e10.argument.typeNames.map((a) => i.green(a)));
        o.push(` Expected ${s}.`);
      }
      return o.join("");
    });
  }
  function md(e10, t) {
    var _a2, _b;
    let r = e10.argument.name, n = (_a2 = t.arguments.getDeepSubSelectionValue(e10.selectionPath)) == null ? void 0 : _a2.asObject(), i;
    if (n) {
      let s = (_b = n.getDeepField(e10.argumentPath)) == null ? void 0 : _b.value;
      s == null ? void 0 : s.markAsError(), s instanceof H && (i = s.text);
    }
    t.addErrorMessage((o) => {
      let s = ["Unable to fit value"];
      return i && s.push(o.red(i)), s.push(`into a 64-bit signed integer for field \`${o.bold(r)}\``), s.join(" ");
    });
  }
  function fd(e10, t) {
    var _a2, _b;
    let r = e10.argumentPath[e10.argumentPath.length - 1], n = (_a2 = t.arguments.getDeepSubSelectionValue(e10.selectionPath)) == null ? void 0 : _a2.asObject();
    if (n) {
      let i = (_b = n.getDeepFieldValue(e10.argumentPath)) == null ? void 0 : _b.asObject();
      i && pa(i, e10.inputType);
    }
    t.addErrorMessage((i) => {
      let o = [`Argument \`${i.bold(r)}\` of type ${i.bold(e10.inputType.name)} needs`];
      return e10.constraints.minFieldCount === 1 ? e10.constraints.requiredFields ? o.push(`${i.green("at least one of")} ${wn("or", e10.constraints.requiredFields.map((s) => `\`${i.bold(s)}\``))} arguments.`) : o.push(`${i.green("at least one")} argument.`) : o.push(`${i.green(`at least ${e10.constraints.minFieldCount}`)} arguments.`), o.push(ur(i)), o.join(" ");
    });
  }
  function gd(e10, t) {
    var _a2, _b;
    let r = e10.argumentPath[e10.argumentPath.length - 1], n = (_a2 = t.arguments.getDeepSubSelectionValue(e10.selectionPath)) == null ? void 0 : _a2.asObject(), i = [];
    if (n) {
      let o = (_b = n.getDeepFieldValue(e10.argumentPath)) == null ? void 0 : _b.asObject();
      o && (o.markAsError(), i = Object.keys(o.getFields()));
    }
    t.addErrorMessage((o) => {
      let s = [`Argument \`${o.bold(r)}\` of type ${o.bold(e10.inputType.name)} needs`];
      return e10.constraints.minFieldCount === 1 && e10.constraints.maxFieldCount == 1 ? s.push(`${o.green("exactly one")} argument,`) : e10.constraints.maxFieldCount == 1 ? s.push(`${o.green("at most one")} argument,`) : s.push(`${o.green(`at most ${e10.constraints.maxFieldCount}`)} arguments,`), s.push(`but you provided ${wn("and", i.map((a) => o.red(a)))}. Please choose`), e10.constraints.maxFieldCount === 1 ? s.push("one.") : s.push(`${e10.constraints.maxFieldCount}.`), s.join(" ");
    });
  }
  function ua(e10, t) {
    for (let r of t.fields) e10.hasField(r.name) || e10.addSuggestion(new de(r.name, "true"));
  }
  function hd(e10, t) {
    for (let r of t.fields) r.isRelation && !e10.hasField(r.name) && e10.addSuggestion(new de(r.name, "true"));
  }
  function yd(e10, t) {
    for (let r of t.fields) !e10.hasField(r.name) && !r.isRelation && e10.addSuggestion(new de(r.name, "true"));
  }
  function Ed(e10, t) {
    for (let r of t) e10.hasField(r.name) || e10.addSuggestion(new de(r.name, r.typeNames.join(" | ")));
  }
  function ca(e10, t) {
    var _a2, _b, _c2, _d2;
    let [r, n] = lr(e10), i = (_a2 = t.arguments.getDeepSubSelectionValue(r)) == null ? void 0 : _a2.asObject();
    if (!i) return { parentKind: "unknown", fieldName: n };
    let o = (_b = i.getFieldValue("select")) == null ? void 0 : _b.asObject(), s = (_c2 = i.getFieldValue("include")) == null ? void 0 : _c2.asObject(), a = (_d2 = i.getFieldValue("omit")) == null ? void 0 : _d2.asObject(), l = o == null ? void 0 : o.getField(n);
    return o && l ? { parentKind: "select", parent: o, field: l, fieldName: n } : (l = s == null ? void 0 : s.getField(n), s && l ? { parentKind: "include", field: l, parent: s, fieldName: n } : (l = a == null ? void 0 : a.getField(n), a && l ? { parentKind: "omit", field: l, parent: a, fieldName: n } : { parentKind: "unknown", fieldName: n }));
  }
  function pa(e10, t) {
    if (t.kind === "object") for (let r of t.fields) e10.hasField(r.name) || e10.addSuggestion(new de(r.name, r.typeNames.join(" | ")));
  }
  function lr(e10) {
    let t = [...e10], r = t.pop();
    if (!r) throw new Error("unexpected empty path");
    return [t, r];
  }
  function ur({ green: e10, enabled: t }) {
    return "Available options are " + (t ? `listed in ${e10("green")}` : "marked with ?") + ".";
  }
  function wn(e10, t) {
    if (t.length === 1) return t[0];
    let r = [...t], n = r.pop();
    return `${r.join(", ")} ${e10} ${n}`;
  }
  var bd = 3;
  function wd(e10, t) {
    let r = 1 / 0, n;
    for (let i of t) {
      let o = (0, sa.default)(e10, i);
      o > bd || o < r && (r = o, n = i);
    }
    return n;
  }
  function da(e10) {
    return e10.substring(0, 1).toLowerCase() + e10.substring(1);
  }
  var cr = class {
    constructor(t, r, n, i, o) {
      d(this, "modelName");
      d(this, "name");
      d(this, "typeName");
      d(this, "isList");
      d(this, "isEnum");
      this.modelName = t, this.name = r, this.typeName = n, this.isList = i, this.isEnum = o;
    }
    _toGraphQLInputType() {
      let t = this.isList ? "List" : "", r = this.isEnum ? "Enum" : "";
      return `${t}${r}${this.typeName}FieldRefInput<${this.modelName}>`;
    }
  };
  function kt(e10) {
    return e10 instanceof cr;
  }
  var xn = Symbol(), Gi = /* @__PURE__ */ new WeakMap(), qe = class {
    constructor(t) {
      t === xn ? Gi.set(this, `Prisma.${this._getName()}`) : Gi.set(this, `new Prisma.${this._getNamespace()}.${this._getName()}()`);
    }
    _getName() {
      return this.constructor.name;
    }
    toString() {
      return Gi.get(this);
    }
  }, pr = class extends qe {
    _getNamespace() {
      return "NullTypes";
    }
  }, dr = class extends pr {
  };
  Ji(dr, "DbNull");
  var mr = class extends pr {
  };
  Ji(mr, "JsonNull");
  var fr = class extends pr {
  };
  Ji(fr, "AnyNull");
  var Pn = { classes: { DbNull: dr, JsonNull: mr, AnyNull: fr }, instances: { DbNull: new dr(xn), JsonNull: new mr(xn), AnyNull: new fr(xn) } };
  function Ji(e10, t) {
    Object.defineProperty(e10, "name", { value: t, configurable: true });
  }
  var ma = ": ", vn = class {
    constructor(t, r) {
      this.name = t;
      this.value = r;
      d(this, "hasError", false);
    }
    markAsError() {
      this.hasError = true;
    }
    getPrintWidth() {
      return this.name.length + this.value.getPrintWidth() + ma.length;
    }
    write(t) {
      let r = new Re(this.name);
      this.hasError && r.underline().setColor(t.context.colors.red), t.write(r).write(ma).write(this.value);
    }
  };
  var Wi = class {
    constructor(t) {
      d(this, "arguments");
      d(this, "errorMessages", []);
      this.arguments = t;
    }
    write(t) {
      t.write(this.arguments);
    }
    addErrorMessage(t) {
      this.errorMessages.push(t);
    }
    renderAllMessages(t) {
      return this.errorMessages.map((r) => r(t)).join(`
`);
    }
  };
  function Ot(e10) {
    return new Wi(fa(e10));
  }
  function fa(e10) {
    let t = new It();
    for (let [r, n] of Object.entries(e10)) {
      let i = new vn(r, ga(n));
      t.addField(i);
    }
    return t;
  }
  function ga(e10) {
    if (typeof e10 == "string") return new H(JSON.stringify(e10));
    if (typeof e10 == "number" || typeof e10 == "boolean") return new H(String(e10));
    if (typeof e10 == "bigint") return new H(`${e10}n`);
    if (e10 === null) return new H("null");
    if (e10 === void 0) return new H("undefined");
    if (Ct(e10)) return new H(`new Prisma.Decimal("${e10.toFixed()}")`);
    if (e10 instanceof Uint8Array) return Buffer.isBuffer(e10) ? new H(`Buffer.alloc(${e10.byteLength})`) : new H(`new Uint8Array(${e10.byteLength})`);
    if (e10 instanceof Date) {
      let t = dn(e10) ? e10.toISOString() : "Invalid Date";
      return new H(`new Date("${t}")`);
    }
    return e10 instanceof qe ? new H(`Prisma.${e10._getName()}`) : kt(e10) ? new H(`prisma.${da(e10.modelName)}.$fields.${e10.name}`) : Array.isArray(e10) ? xd(e10) : typeof e10 == "object" ? fa(e10) : new H(Object.prototype.toString.call(e10));
  }
  function xd(e10) {
    let t = new At();
    for (let r of e10) t.addItem(ga(r));
    return t;
  }
  function Tn(e10, t) {
    let r = t === "pretty" ? oa : bn, n = e10.renderAllMessages(r), i = new Rt(0, { colors: r }).write(e10).toString();
    return { message: n, args: i };
  }
  function Cn({ args: e10, errors: t, errorFormat: r, callsite: n, originalMethod: i, clientVersion: o, globalOmit: s }) {
    let a = Ot(e10);
    for (let p of t) hn(p, a, s);
    let { message: l, args: u } = Tn(a, r), c = gn({ message: l, callsite: n, originalMethod: i, showColors: r === "pretty", callArguments: u });
    throw new re(c, { clientVersion: o });
  }
  var Se = class {
    constructor() {
      d(this, "_map", /* @__PURE__ */ new Map());
    }
    get(t) {
      var _a2;
      return (_a2 = this._map.get(t)) == null ? void 0 : _a2.value;
    }
    set(t, r) {
      this._map.set(t, { value: r });
    }
    getOrCreate(t, r) {
      let n = this._map.get(t);
      if (n) return n.value;
      let i = r();
      return this.set(t, i), i;
    }
  };
  function gr(e10) {
    let t;
    return { get() {
      return t || (t = { value: e10() }), t.value;
    } };
  }
  function Ae(e10) {
    return e10.replace(/^./, (t) => t.toLowerCase());
  }
  function ya(e10, t, r) {
    let n = Ae(r);
    return !t.result || !(t.result.$allModels || t.result[n]) ? e10 : Pd({ ...e10, ...ha(t.name, e10, t.result.$allModels), ...ha(t.name, e10, t.result[n]) });
  }
  function Pd(e10) {
    let t = new Se(), r = (n, i) => t.getOrCreate(n, () => i.has(n) ? [n] : (i.add(n), e10[n] ? e10[n].needs.flatMap((o) => r(o, i)) : [n]));
    return bt(e10, (n) => ({ ...n, needs: r(n.name, /* @__PURE__ */ new Set()) }));
  }
  function ha(e10, t, r) {
    return r ? bt(r, ({ needs: n, compute: i }, o) => ({ name: o, needs: n ? Object.keys(n).filter((s) => n[s]) : [], compute: vd(t, o, i) })) : {};
  }
  function vd(e10, t, r) {
    var _a2;
    let n = (_a2 = e10 == null ? void 0 : e10[t]) == null ? void 0 : _a2.compute;
    return n ? (i) => r({ ...i, [t]: n(i) }) : r;
  }
  function Ea(e10, t) {
    if (!t) return e10;
    let r = { ...e10 };
    for (let n of Object.values(t)) if (e10[n.name]) for (let i of n.needs) r[i] = true;
    return r;
  }
  function ba(e10, t) {
    if (!t) return e10;
    let r = { ...e10 };
    for (let n of Object.values(t)) if (!e10[n.name]) for (let i of n.needs) delete r[i];
    return r;
  }
  var Rn = class {
    constructor(t, r) {
      this.extension = t;
      this.previous = r;
      d(this, "computedFieldsCache", new Se());
      d(this, "modelExtensionsCache", new Se());
      d(this, "queryCallbacksCache", new Se());
      d(this, "clientExtensions", gr(() => {
        var _a2, _b;
        return this.extension.client ? { ...(_a2 = this.previous) == null ? void 0 : _a2.getAllClientExtensions(), ...this.extension.client } : (_b = this.previous) == null ? void 0 : _b.getAllClientExtensions();
      }));
      d(this, "batchCallbacks", gr(() => {
        var _a2, _b;
        let t2 = ((_a2 = this.previous) == null ? void 0 : _a2.getAllBatchQueryCallbacks()) ?? [], r2 = (_b = this.extension.query) == null ? void 0 : _b.$__internalBatch;
        return r2 ? t2.concat(r2) : t2;
      }));
    }
    getAllComputedFields(t) {
      return this.computedFieldsCache.getOrCreate(t, () => {
        var _a2;
        return ya((_a2 = this.previous) == null ? void 0 : _a2.getAllComputedFields(t), this.extension, t);
      });
    }
    getAllClientExtensions() {
      return this.clientExtensions.get();
    }
    getAllModelExtensions(t) {
      return this.modelExtensionsCache.getOrCreate(t, () => {
        var _a2, _b;
        let r = Ae(t);
        return !this.extension.model || !(this.extension.model[r] || this.extension.model.$allModels) ? (_a2 = this.previous) == null ? void 0 : _a2.getAllModelExtensions(t) : { ...(_b = this.previous) == null ? void 0 : _b.getAllModelExtensions(t), ...this.extension.model.$allModels, ...this.extension.model[r] };
      });
    }
    getAllQueryCallbacks(t, r) {
      return this.queryCallbacksCache.getOrCreate(`${t}:${r}`, () => {
        var _a2;
        let n = ((_a2 = this.previous) == null ? void 0 : _a2.getAllQueryCallbacks(t, r)) ?? [], i = [], o = this.extension.query;
        return !o || !(o[t] || o.$allModels || o[r] || o.$allOperations) ? n : (o[t] !== void 0 && (o[t][r] !== void 0 && i.push(o[t][r]), o[t].$allOperations !== void 0 && i.push(o[t].$allOperations)), t !== "$none" && o.$allModels !== void 0 && (o.$allModels[r] !== void 0 && i.push(o.$allModels[r]), o.$allModels.$allOperations !== void 0 && i.push(o.$allModels.$allOperations)), o[r] !== void 0 && i.push(o[r]), o.$allOperations !== void 0 && i.push(o.$allOperations), n.concat(i));
      });
    }
    getAllBatchQueryCallbacks() {
      return this.batchCallbacks.get();
    }
  }, _t = class e7 {
    constructor(t) {
      this.head = t;
    }
    static empty() {
      return new e7();
    }
    static single(t) {
      return new e7(new Rn(t));
    }
    isEmpty() {
      return this.head === void 0;
    }
    append(t) {
      return new e7(new Rn(t, this.head));
    }
    getAllComputedFields(t) {
      var _a2;
      return (_a2 = this.head) == null ? void 0 : _a2.getAllComputedFields(t);
    }
    getAllClientExtensions() {
      var _a2;
      return (_a2 = this.head) == null ? void 0 : _a2.getAllClientExtensions();
    }
    getAllModelExtensions(t) {
      var _a2;
      return (_a2 = this.head) == null ? void 0 : _a2.getAllModelExtensions(t);
    }
    getAllQueryCallbacks(t, r) {
      var _a2;
      return ((_a2 = this.head) == null ? void 0 : _a2.getAllQueryCallbacks(t, r)) ?? [];
    }
    getAllBatchQueryCallbacks() {
      var _a2;
      return ((_a2 = this.head) == null ? void 0 : _a2.getAllBatchQueryCallbacks()) ?? [];
    }
  };
  var Sn = class {
    constructor(t) {
      this.name = t;
    }
  };
  function wa(e10) {
    return e10 instanceof Sn;
  }
  function xa(e10) {
    return new Sn(e10);
  }
  var Pa = Symbol(), hr = class {
    constructor(t) {
      if (t !== Pa) throw new Error("Skip instance can not be constructed directly");
    }
    ifUndefined(t) {
      return t === void 0 ? An : t;
    }
  }, An = new hr(Pa);
  function Ie(e10) {
    return e10 instanceof hr;
  }
  var Td = { findUnique: "findUnique", findUniqueOrThrow: "findUniqueOrThrow", findFirst: "findFirst", findFirstOrThrow: "findFirstOrThrow", findMany: "findMany", count: "aggregate", create: "createOne", createMany: "createMany", createManyAndReturn: "createManyAndReturn", update: "updateOne", updateMany: "updateMany", updateManyAndReturn: "updateManyAndReturn", upsert: "upsertOne", delete: "deleteOne", deleteMany: "deleteMany", executeRaw: "executeRaw", queryRaw: "queryRaw", aggregate: "aggregate", groupBy: "groupBy", runCommandRaw: "runCommandRaw", findRaw: "findRaw", aggregateRaw: "aggregateRaw" }, va = "explicitly `undefined` values are not allowed";
  function In({ modelName: e10, action: t, args: r, runtimeDataModel: n, extensions: i = _t.empty(), callsite: o, clientMethod: s, errorFormat: a, clientVersion: l, previewFeatures: u, globalOmit: c }) {
    let p = new Hi({ runtimeDataModel: n, modelName: e10, action: t, rootArgs: r, callsite: o, extensions: i, selectionPath: [], argumentPath: [], originalMethod: s, errorFormat: a, clientVersion: l, previewFeatures: u, globalOmit: c });
    return { modelName: e10, action: Td[t], query: yr(r, p) };
  }
  function yr({ select: e10, include: t, ...r } = {}, n) {
    let i = r.omit;
    return delete r.omit, { arguments: Ca(r, n), selection: Cd(e10, t, i, n) };
  }
  function Cd(e10, t, r, n) {
    return e10 ? (t ? n.throwValidationError({ kind: "MutuallyExclusiveFields", firstField: "include", secondField: "select", selectionPath: n.getSelectionPath() }) : r && n.throwValidationError({ kind: "MutuallyExclusiveFields", firstField: "omit", secondField: "select", selectionPath: n.getSelectionPath() }), Id(e10, n)) : Rd(n, t, r);
  }
  function Rd(e10, t, r) {
    let n = {};
    return e10.modelOrType && !e10.isRawAction() && (n.$composites = true, n.$scalars = true), t && Sd(n, t, e10), Ad(n, r, e10), n;
  }
  function Sd(e10, t, r) {
    for (let [n, i] of Object.entries(t)) {
      if (Ie(i)) continue;
      let o = r.nestSelection(n);
      if (Ki(i, o), i === false || i === void 0) {
        e10[n] = false;
        continue;
      }
      let s = r.findField(n);
      if (s && s.kind !== "object" && r.throwValidationError({ kind: "IncludeOnScalar", selectionPath: r.getSelectionPath().concat(n), outputType: r.getOutputTypeDescription() }), s) {
        e10[n] = yr(i === true ? {} : i, o);
        continue;
      }
      if (i === true) {
        e10[n] = true;
        continue;
      }
      e10[n] = yr(i, o);
    }
  }
  function Ad(e10, t, r) {
    let n = r.getComputedFields(), i = { ...r.getGlobalOmit(), ...t }, o = ba(i, n);
    for (let [s, a] of Object.entries(o)) {
      if (Ie(a)) continue;
      Ki(a, r.nestSelection(s));
      let l = r.findField(s);
      (n == null ? void 0 : n[s]) && !l || (e10[s] = !a);
    }
  }
  function Id(e10, t) {
    let r = {}, n = t.getComputedFields(), i = Ea(e10, n);
    for (let [o, s] of Object.entries(i)) {
      if (Ie(s)) continue;
      let a = t.nestSelection(o);
      Ki(s, a);
      let l = t.findField(o);
      if (!((n == null ? void 0 : n[o]) && !l)) {
        if (s === false || s === void 0 || Ie(s)) {
          r[o] = false;
          continue;
        }
        if (s === true) {
          (l == null ? void 0 : l.kind) === "object" ? r[o] = yr({}, a) : r[o] = true;
          continue;
        }
        r[o] = yr(s, a);
      }
    }
    return r;
  }
  function Ta(e10, t) {
    if (e10 === null) return null;
    if (typeof e10 == "string" || typeof e10 == "number" || typeof e10 == "boolean") return e10;
    if (typeof e10 == "bigint") return { $type: "BigInt", value: String(e10) };
    if (Tt(e10)) {
      if (dn(e10)) return { $type: "DateTime", value: e10.toISOString() };
      t.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: t.getSelectionPath(), argumentPath: t.getArgumentPath(), argument: { name: t.getArgumentName(), typeNames: ["Date"] }, underlyingError: "Provided Date object is invalid" });
    }
    if (wa(e10)) return { $type: "Param", value: e10.name };
    if (kt(e10)) return { $type: "FieldRef", value: { _ref: e10.name, _container: e10.modelName } };
    if (Array.isArray(e10)) return kd(e10, t);
    if (ArrayBuffer.isView(e10)) {
      let { buffer: r, byteOffset: n, byteLength: i } = e10;
      return { $type: "Bytes", value: Buffer.from(r, n, i).toString("base64") };
    }
    if (Od(e10)) return e10.values;
    if (Ct(e10)) return { $type: "Decimal", value: e10.toFixed() };
    if (e10 instanceof qe) {
      if (e10 !== Pn.instances[e10._getName()]) throw new Error("Invalid ObjectEnumValue");
      return { $type: "Enum", value: e10._getName() };
    }
    if (_d(e10)) return e10.toJSON();
    if (typeof e10 == "object") return Ca(e10, t);
    t.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: t.getSelectionPath(), argumentPath: t.getArgumentPath(), argument: { name: t.getArgumentName(), typeNames: [] }, underlyingError: `We could not serialize ${Object.prototype.toString.call(e10)} value. Serialize the object to JSON or implement a ".toJSON()" method on it` });
  }
  function Ca(e10, t) {
    if (e10.$type) return { $type: "Raw", value: e10 };
    let r = {};
    for (let n in e10) {
      let i = e10[n], o = t.nestArgument(n);
      Ie(i) || (i !== void 0 ? r[n] = Ta(i, o) : t.isPreviewFeatureOn("strictUndefinedChecks") && t.throwValidationError({ kind: "InvalidArgumentValue", argumentPath: o.getArgumentPath(), selectionPath: t.getSelectionPath(), argument: { name: t.getArgumentName(), typeNames: [] }, underlyingError: va }));
    }
    return r;
  }
  function kd(e10, t) {
    let r = [];
    for (let n = 0; n < e10.length; n++) {
      let i = t.nestArgument(String(n)), o = e10[n];
      if (o === void 0 || Ie(o)) {
        let s = o === void 0 ? "undefined" : "Prisma.skip";
        t.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: i.getSelectionPath(), argumentPath: i.getArgumentPath(), argument: { name: `${t.getArgumentName()}[${n}]`, typeNames: [] }, underlyingError: `Can not use \`${s}\` value within array. Use \`null\` or filter out \`${s}\` values` });
      }
      r.push(Ta(o, i));
    }
    return r;
  }
  function Od(e10) {
    return typeof e10 == "object" && e10 !== null && e10.__prismaRawParameters__ === true;
  }
  function _d(e10) {
    return typeof e10 == "object" && e10 !== null && typeof e10.toJSON == "function";
  }
  function Ki(e10, t) {
    e10 === void 0 && t.isPreviewFeatureOn("strictUndefinedChecks") && t.throwValidationError({ kind: "InvalidSelectionValue", selectionPath: t.getSelectionPath(), underlyingError: va });
  }
  var Hi = class e8 {
    constructor(t) {
      this.params = t;
      d(this, "modelOrType");
      this.params.modelName && (this.modelOrType = this.params.runtimeDataModel.models[this.params.modelName] ?? this.params.runtimeDataModel.types[this.params.modelName]);
    }
    throwValidationError(t) {
      Cn({ errors: [t], originalMethod: this.params.originalMethod, args: this.params.rootArgs ?? {}, callsite: this.params.callsite, errorFormat: this.params.errorFormat, clientVersion: this.params.clientVersion, globalOmit: this.params.globalOmit });
    }
    getSelectionPath() {
      return this.params.selectionPath;
    }
    getArgumentPath() {
      return this.params.argumentPath;
    }
    getArgumentName() {
      return this.params.argumentPath[this.params.argumentPath.length - 1];
    }
    getOutputTypeDescription() {
      if (!(!this.params.modelName || !this.modelOrType)) return { name: this.params.modelName, fields: this.modelOrType.fields.map((t) => ({ name: t.name, typeName: "boolean", isRelation: t.kind === "object" })) };
    }
    isRawAction() {
      return ["executeRaw", "queryRaw", "runCommandRaw", "findRaw", "aggregateRaw"].includes(this.params.action);
    }
    isPreviewFeatureOn(t) {
      return this.params.previewFeatures.includes(t);
    }
    getComputedFields() {
      if (this.params.modelName) return this.params.extensions.getAllComputedFields(this.params.modelName);
    }
    findField(t) {
      var _a2;
      return (_a2 = this.modelOrType) == null ? void 0 : _a2.fields.find((r) => r.name === t);
    }
    nestSelection(t) {
      let r = this.findField(t), n = (r == null ? void 0 : r.kind) === "object" ? r.type : void 0;
      return new e8({ ...this.params, modelName: n, selectionPath: this.params.selectionPath.concat(t) });
    }
    getGlobalOmit() {
      var _a2;
      return this.params.modelName && this.shouldApplyGlobalOmit() ? ((_a2 = this.params.globalOmit) == null ? void 0 : _a2[vt(this.params.modelName)]) ?? {} : {};
    }
    shouldApplyGlobalOmit() {
      switch (this.params.action) {
        case "findFirst":
        case "findFirstOrThrow":
        case "findUniqueOrThrow":
        case "findMany":
        case "upsert":
        case "findUnique":
        case "createManyAndReturn":
        case "create":
        case "update":
        case "updateManyAndReturn":
        case "delete":
          return true;
        case "executeRaw":
        case "aggregateRaw":
        case "runCommandRaw":
        case "findRaw":
        case "createMany":
        case "deleteMany":
        case "groupBy":
        case "updateMany":
        case "count":
        case "aggregate":
        case "queryRaw":
          return false;
        default:
          Me(this.params.action, "Unknown action");
      }
    }
    nestArgument(t) {
      return new e8({ ...this.params, argumentPath: this.params.argumentPath.concat(t) });
    }
  };
  function Ra(e10) {
    if (!e10._hasPreviewFlag("metrics")) throw new re("`metrics` preview feature must be enabled in order to access metrics API", { clientVersion: e10._clientVersion });
  }
  var Dt = class {
    constructor(t) {
      d(this, "_client");
      this._client = t;
    }
    prometheus(t) {
      return Ra(this._client), this._client._engine.metrics({ format: "prometheus", ...t });
    }
    json(t) {
      return Ra(this._client), this._client._engine.metrics({ format: "json", ...t });
    }
  };
  function Sa(e10) {
    return { models: Yi(e10.models), enums: Yi(e10.enums), types: Yi(e10.types) };
  }
  function Yi(e10) {
    let t = {};
    for (let { name: r, ...n } of e10) t[r] = n;
    return t;
  }
  function Aa(e10, t) {
    let r = gr(() => Dd(t));
    Object.defineProperty(e10, "dmmf", { get: () => r.get() });
  }
  function Dd(e10) {
    return { datamodel: { models: zi(e10.models), enums: zi(e10.enums), types: zi(e10.types) } };
  }
  function zi(e10) {
    return Object.entries(e10).map(([t, r]) => ({ name: t, ...r }));
  }
  var Zi = /* @__PURE__ */ new WeakMap(), kn = "$$PrismaTypedSql", Er = class {
    constructor(t, r) {
      Zi.set(this, { sql: t, values: r }), Object.defineProperty(this, kn, { value: kn });
    }
    get sql() {
      return Zi.get(this).sql;
    }
    get values() {
      return Zi.get(this).values;
    }
  };
  function Ia(e10) {
    return (...t) => new Er(e10, t);
  }
  function On(e10) {
    return e10 != null && e10[kn] === kn;
  }
  var su = D(bi());
  var au = require$$8, lu = require$$9, uu = D(require$$2), Mr = D(require$$3);
  var le = class e9 {
    constructor(t, r) {
      if (t.length - 1 !== r.length) throw t.length === 0 ? new TypeError("Expected at least 1 string") : new TypeError(`Expected ${t.length} strings to have ${t.length - 1} values`);
      let n = r.reduce((s, a) => s + (a instanceof e9 ? a.values.length : 1), 0);
      this.values = new Array(n), this.strings = new Array(n + 1), this.strings[0] = t[0];
      let i = 0, o = 0;
      for (; i < r.length; ) {
        let s = r[i++], a = t[i];
        if (s instanceof e9) {
          this.strings[o] += s.strings[0];
          let l = 0;
          for (; l < s.values.length; ) this.values[o++] = s.values[l++], this.strings[o] = s.strings[l];
          this.strings[o] += a;
        } else this.values[o++] = s, this.strings[o] = a;
      }
    }
    get sql() {
      let t = this.strings.length, r = 1, n = this.strings[0];
      for (; r < t; ) n += `?${this.strings[r++]}`;
      return n;
    }
    get statement() {
      let t = this.strings.length, r = 1, n = this.strings[0];
      for (; r < t; ) n += `:${r}${this.strings[r++]}`;
      return n;
    }
    get text() {
      let t = this.strings.length, r = 1, n = this.strings[0];
      for (; r < t; ) n += `$${r}${this.strings[r++]}`;
      return n;
    }
    inspect() {
      return { sql: this.sql, statement: this.statement, text: this.text, values: this.values };
    }
  };
  function ka(e10, t = ",", r = "", n = "") {
    if (e10.length === 0) throw new TypeError("Expected `join([])` to be called with an array of multiple elements, but got an empty array");
    return new le([r, ...Array(e10.length - 1).fill(t), n], e10);
  }
  function Xi(e10) {
    return new le([e10], []);
  }
  var Oa = Xi("");
  function eo(e10, ...t) {
    return new le(e10, t);
  }
  function br(e10) {
    return { getKeys() {
      return Object.keys(e10);
    }, getPropertyValue(t) {
      return e10[t];
    } };
  }
  function oe(e10, t) {
    return { getKeys() {
      return [e10];
    }, getPropertyValue() {
      return t();
    } };
  }
  function at(e10) {
    let t = new Se();
    return { getKeys() {
      return e10.getKeys();
    }, getPropertyValue(r) {
      return t.getOrCreate(r, () => e10.getPropertyValue(r));
    }, getPropertyDescriptor(r) {
      var _a2;
      return (_a2 = e10.getPropertyDescriptor) == null ? void 0 : _a2.call(e10, r);
    } };
  }
  var _n = { enumerable: true, configurable: true, writable: true };
  function Dn(e10) {
    let t = new Set(e10);
    return { getPrototypeOf: () => Object.prototype, getOwnPropertyDescriptor: () => _n, has: (r, n) => t.has(n), set: (r, n, i) => t.add(n) && Reflect.set(r, n, i), ownKeys: () => [...t] };
  }
  var _a = Symbol.for("nodejs.util.inspect.custom");
  function be(e10, t) {
    let r = Nd(t), n = /* @__PURE__ */ new Set(), i = new Proxy(e10, { get(o, s) {
      if (n.has(s)) return o[s];
      let a = r.get(s);
      return a ? a.getPropertyValue(s) : o[s];
    }, has(o, s) {
      var _a2;
      if (n.has(s)) return true;
      let a = r.get(s);
      return a ? ((_a2 = a.has) == null ? void 0 : _a2.call(a, s)) ?? true : Reflect.has(o, s);
    }, ownKeys(o) {
      let s = Da(Reflect.ownKeys(o), r), a = Da(Array.from(r.keys()), r);
      return [.../* @__PURE__ */ new Set([...s, ...a, ...n])];
    }, set(o, s, a) {
      var _a2, _b, _c2;
      return ((_c2 = (_b = (_a2 = r.get(s)) == null ? void 0 : _a2.getPropertyDescriptor) == null ? void 0 : _b.call(_a2, s)) == null ? void 0 : _c2.writable) === false ? false : (n.add(s), Reflect.set(o, s, a));
    }, getOwnPropertyDescriptor(o, s) {
      let a = Reflect.getOwnPropertyDescriptor(o, s);
      if (a && !a.configurable) return a;
      let l = r.get(s);
      return l ? l.getPropertyDescriptor ? { ..._n, ...l == null ? void 0 : l.getPropertyDescriptor(s) } : _n : a;
    }, defineProperty(o, s, a) {
      return n.add(s), Reflect.defineProperty(o, s, a);
    }, getPrototypeOf: () => Object.prototype });
    return i[_a] = function() {
      let o = { ...this };
      return delete o[_a], o;
    }, i;
  }
  function Nd(e10) {
    let t = /* @__PURE__ */ new Map();
    for (let r of e10) {
      let n = r.getKeys();
      for (let i of n) t.set(i, r);
    }
    return t;
  }
  function Da(e10, t) {
    return e10.filter((r) => {
      var _a2, _b;
      return ((_b = (_a2 = t.get(r)) == null ? void 0 : _a2.has) == null ? void 0 : _b.call(_a2, r)) ?? true;
    });
  }
  function Nt(e10) {
    return { getKeys() {
      return e10;
    }, has() {
      return false;
    }, getPropertyValue() {
    } };
  }
  function Lt(e10, t) {
    return { batch: e10, transaction: (t == null ? void 0 : t.kind) === "batch" ? { isolationLevel: t.options.isolationLevel } : void 0 };
  }
  function Na(e10) {
    if (e10 === void 0) return "";
    let t = Ot(e10);
    return new Rt(0, { colors: bn }).write(t).toString();
  }
  var Ld = "P2037";
  function Ft({ error: e10, user_facing_error: t }, r, n) {
    return t.error_code ? new te(Fd(t, n), { code: t.error_code, clientVersion: r, meta: t.meta, batchRequestIdx: t.batch_request_idx }) : new U(e10, { clientVersion: r, batchRequestIdx: t.batch_request_idx });
  }
  function Fd(e10, t) {
    let r = e10.message;
    return (t === "postgresql" || t === "postgres" || t === "mysql") && e10.error_code === Ld && (r += `
Prisma Accelerate has built-in connection pooling to prevent such errors: https://pris.ly/client/error-accelerate`), r;
  }
  var wr = "<unknown>";
  function La(e10) {
    var t = e10.split(`
`);
    return t.reduce(function(r, n) {
      var i = qd(n) || jd(n) || Qd(n) || Hd(n) || Jd(n);
      return i && r.push(i), r;
    }, []);
  }
  var Md = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|rsc|<anonymous>|\/|[a-z]:\\|\\\\).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, $d = /\((\S*)(?::(\d+))(?::(\d+))\)/;
  function qd(e10) {
    var t = Md.exec(e10);
    if (!t) return null;
    var r = t[2] && t[2].indexOf("native") === 0, n = t[2] && t[2].indexOf("eval") === 0, i = $d.exec(t[2]);
    return n && i != null && (t[2] = i[1], t[3] = i[2], t[4] = i[3]), { file: r ? null : t[2], methodName: t[1] || wr, arguments: r ? [t[2]] : [], lineNumber: t[3] ? +t[3] : null, column: t[4] ? +t[4] : null };
  }
  var Vd = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|rsc|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
  function jd(e10) {
    var t = Vd.exec(e10);
    return t ? { file: t[2], methodName: t[1] || wr, arguments: [], lineNumber: +t[3], column: t[4] ? +t[4] : null } : null;
  }
  var Bd = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|rsc|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i, Ud = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
  function Qd(e10) {
    var t = Bd.exec(e10);
    if (!t) return null;
    var r = t[3] && t[3].indexOf(" > eval") > -1, n = Ud.exec(t[3]);
    return r && n != null && (t[3] = n[1], t[4] = n[2], t[5] = null), { file: t[3], methodName: t[1] || wr, arguments: t[2] ? t[2].split(",") : [], lineNumber: t[4] ? +t[4] : null, column: t[5] ? +t[5] : null };
  }
  var Gd = /^\s*(?:([^@]*)(?:\((.*?)\))?@)?(\S.*?):(\d+)(?::(\d+))?\s*$/i;
  function Jd(e10) {
    var t = Gd.exec(e10);
    return t ? { file: t[3], methodName: t[1] || wr, arguments: [], lineNumber: +t[4], column: t[5] ? +t[5] : null } : null;
  }
  var Wd = /^\s*at (?:((?:\[object object\])?[^\\/]+(?: \[as \S+\])?) )?\(?(.*?):(\d+)(?::(\d+))?\)?\s*$/i;
  function Hd(e10) {
    var t = Wd.exec(e10);
    return t ? { file: t[2], methodName: t[1] || wr, arguments: [], lineNumber: +t[3], column: t[4] ? +t[4] : null } : null;
  }
  var to = class {
    getLocation() {
      return null;
    }
  }, ro = class {
    constructor() {
      d(this, "_error");
      this._error = new Error();
    }
    getLocation() {
      let t = this._error.stack;
      if (!t) return null;
      let n = La(t).find((i) => {
        if (!i.file) return false;
        let o = ki(i.file);
        return o !== "<anonymous>" && !o.includes("@prisma") && !o.includes("/packages/client/src/runtime/") && !o.endsWith("/runtime/binary.js") && !o.endsWith("/runtime/library.js") && !o.endsWith("/runtime/edge.js") && !o.endsWith("/runtime/edge-esm.js") && !o.startsWith("internal/") && !i.methodName.includes("new ") && !i.methodName.includes("getCallSite") && !i.methodName.includes("Proxy.") && i.methodName.split(".").length < 4;
      });
      return !n || !n.file ? null : { fileName: n.file, lineNumber: n.lineNumber, columnNumber: n.column };
    }
  };
  function Xe(e10) {
    return e10 === "minimal" ? typeof $EnabledCallSite == "function" && e10 !== "minimal" ? new $EnabledCallSite() : new to() : new ro();
  }
  var Fa = { _avg: true, _count: true, _sum: true, _min: true, _max: true };
  function Mt(e10 = {}) {
    let t = Yd(e10);
    return Object.entries(t).reduce((n, [i, o]) => (Fa[i] !== void 0 ? n.select[i] = { select: o } : n[i] = o, n), { select: {} });
  }
  function Yd(e10 = {}) {
    return typeof e10._count == "boolean" ? { ...e10, _count: { _all: e10._count } } : e10;
  }
  function Nn(e10 = {}) {
    return (t) => (typeof e10._count == "boolean" && (t._count = t._count._all), t);
  }
  function Ma(e10, t) {
    let r = Nn(e10);
    return t({ action: "aggregate", unpacker: r, argsMapper: Mt })(e10);
  }
  function zd(e10 = {}) {
    let { select: t, ...r } = e10;
    return typeof t == "object" ? Mt({ ...r, _count: t }) : Mt({ ...r, _count: { _all: true } });
  }
  function Zd(e10 = {}) {
    return typeof e10.select == "object" ? (t) => Nn(e10)(t)._count : (t) => Nn(e10)(t)._count._all;
  }
  function $a(e10, t) {
    return t({ action: "count", unpacker: Zd(e10), argsMapper: zd })(e10);
  }
  function Xd(e10 = {}) {
    let t = Mt(e10);
    if (Array.isArray(t.by)) for (let r of t.by) typeof r == "string" && (t.select[r] = true);
    else typeof t.by == "string" && (t.select[t.by] = true);
    return t;
  }
  function em(e10 = {}) {
    return (t) => (typeof (e10 == null ? void 0 : e10._count) == "boolean" && t.forEach((r) => {
      r._count = r._count._all;
    }), t);
  }
  function qa(e10, t) {
    return t({ action: "groupBy", unpacker: em(e10), argsMapper: Xd })(e10);
  }
  function Va(e10, t, r) {
    if (t === "aggregate") return (n) => Ma(n, r);
    if (t === "count") return (n) => $a(n, r);
    if (t === "groupBy") return (n) => qa(n, r);
  }
  function ja(e10, t) {
    let r = t.fields.filter((i) => !i.relationName), n = Mi(r, (i) => i.name);
    return new Proxy({}, { get(i, o) {
      if (o in i || typeof o == "symbol") return i[o];
      let s = n[o];
      if (s) return new cr(e10, o, s.type, s.isList, s.kind === "enum");
    }, ...Dn(Object.keys(n)) });
  }
  var Ba = (e10) => Array.isArray(e10) ? e10 : e10.split("."), no = (e10, t) => Ba(t).reduce((r, n) => r && r[n], e10), Ua = (e10, t, r) => Ba(t).reduceRight((n, i, o, s) => Object.assign({}, no(e10, s.slice(0, o)), { [i]: n }), r);
  function tm(e10, t) {
    return e10 === void 0 || t === void 0 ? [] : [...t, "select", e10];
  }
  function rm(e10, t, r) {
    return t === void 0 ? e10 ?? {} : Ua(t, r, e10 || true);
  }
  function io(e10, t, r, n, i, o) {
    let a = e10._runtimeDataModel.models[t].fields.reduce((l, u) => ({ ...l, [u.name]: u }), {});
    return (l) => {
      let u = Xe(e10._errorFormat), c = tm(n, i), p = rm(l, o, c), m = r({ dataPath: c, callsite: u })(p), g = nm(e10, t);
      return new Proxy(m, { get(h, y) {
        if (!g.includes(y)) return h[y];
        let T = [a[y].type, r, y], S = [c, p];
        return io(e10, ...T, ...S);
      }, ...Dn([...g, ...Object.getOwnPropertyNames(m)]) });
    };
  }
  function nm(e10, t) {
    return e10._runtimeDataModel.models[t].fields.filter((r) => r.kind === "object").map((r) => r.name);
  }
  var im = ["findUnique", "findUniqueOrThrow", "findFirst", "findFirstOrThrow", "create", "update", "upsert", "delete"], om = ["aggregate", "count", "groupBy"];
  function oo(e10, t) {
    let r = e10._extensions.getAllModelExtensions(t) ?? {}, n = [sm(e10, t), lm(e10, t), br(r), oe("name", () => t), oe("$name", () => t), oe("$parent", () => e10._appliedParent)];
    return be({}, n);
  }
  function sm(e10, t) {
    let r = Ae(t), n = Object.keys(tr.ModelAction).concat("count");
    return { getKeys() {
      return n;
    }, getPropertyValue(i) {
      let o = i, s = (a) => (l) => {
        let u = Xe(e10._errorFormat);
        return e10._createPrismaPromise((c) => {
          let p = { args: l, dataPath: [], action: o, model: t, clientMethod: `${r}.${i}`, jsModelName: r, transaction: c, callsite: u };
          return e10._request({ ...p, ...a });
        }, { action: o, args: l, model: t });
      };
      return im.includes(o) ? io(e10, t, s) : am(i) ? Va(e10, i, s) : s({});
    } };
  }
  function am(e10) {
    return om.includes(e10);
  }
  function lm(e10, t) {
    return at(oe("fields", () => {
      let r = e10._runtimeDataModel.models[t];
      return ja(t, r);
    }));
  }
  function Qa(e10) {
    return e10.replace(/^./, (t) => t.toUpperCase());
  }
  var so = Symbol();
  function xr(e10) {
    let t = [um(e10), cm(e10), oe(so, () => e10), oe("$parent", () => e10._appliedParent)], r = e10._extensions.getAllClientExtensions();
    return r && t.push(br(r)), be(e10, t);
  }
  function um(e10) {
    let t = Object.getPrototypeOf(e10._originalClient), r = [...new Set(Object.getOwnPropertyNames(t))];
    return { getKeys() {
      return r;
    }, getPropertyValue(n) {
      return e10[n];
    } };
  }
  function cm(e10) {
    let t = Object.keys(e10._runtimeDataModel.models), r = t.map(Ae), n = [...new Set(t.concat(r))];
    return at({ getKeys() {
      return n;
    }, getPropertyValue(i) {
      let o = Qa(i);
      if (e10._runtimeDataModel.models[o] !== void 0) return oo(e10, o);
      if (e10._runtimeDataModel.models[i] !== void 0) return oo(e10, i);
    }, getPropertyDescriptor(i) {
      if (!r.includes(i)) return { enumerable: false };
    } });
  }
  function Ga(e10) {
    return e10[so] ? e10[so] : e10;
  }
  function Ja(e10) {
    var _a2;
    if (typeof e10 == "function") return e10(this);
    if ((_a2 = e10.client) == null ? void 0 : _a2.__AccelerateEngine) {
      let r = e10.client.__AccelerateEngine;
      this._originalClient._engine = new r(this._originalClient._accelerateEngineConfig);
    }
    let t = Object.create(this._originalClient, { _extensions: { value: this._extensions.append(e10) }, _appliedParent: { value: this, configurable: true }, $use: { value: void 0 }, $on: { value: void 0 } });
    return xr(t);
  }
  function Wa({ result: e10, modelName: t, select: r, omit: n, extensions: i }) {
    let o = i.getAllComputedFields(t);
    if (!o) return e10;
    let s = [], a = [];
    for (let l of Object.values(o)) {
      if (n) {
        if (n[l.name]) continue;
        let u = l.needs.filter((c) => n[c]);
        u.length > 0 && a.push(Nt(u));
      } else if (r) {
        if (!r[l.name]) continue;
        let u = l.needs.filter((c) => !r[c]);
        u.length > 0 && a.push(Nt(u));
      }
      pm(e10, l.needs) && s.push(dm(l, be(e10, s)));
    }
    return s.length > 0 || a.length > 0 ? be(e10, [...s, ...a]) : e10;
  }
  function pm(e10, t) {
    return t.every((r) => Fi(e10, r));
  }
  function dm(e10, t) {
    return at(oe(e10.name, () => e10.compute(t)));
  }
  function Ln({ visitor: e10, result: t, args: r, runtimeDataModel: n, modelName: i }) {
    if (Array.isArray(t)) {
      for (let s = 0; s < t.length; s++) t[s] = Ln({ result: t[s], args: r, modelName: i, runtimeDataModel: n, visitor: e10 });
      return t;
    }
    let o = e10(t, i, r) ?? t;
    return r.include && Ha({ includeOrSelect: r.include, result: o, parentModelName: i, runtimeDataModel: n, visitor: e10 }), r.select && Ha({ includeOrSelect: r.select, result: o, parentModelName: i, runtimeDataModel: n, visitor: e10 }), o;
  }
  function Ha({ includeOrSelect: e10, result: t, parentModelName: r, runtimeDataModel: n, visitor: i }) {
    for (let [o, s] of Object.entries(e10)) {
      if (!s || t[o] == null || Ie(s)) continue;
      let l = n.models[r].fields.find((c) => c.name === o);
      if (!l || l.kind !== "object" || !l.relationName) continue;
      let u = typeof s == "object" ? s : {};
      t[o] = Ln({ visitor: i, result: t[o], args: u, modelName: l.type, runtimeDataModel: n });
    }
  }
  function Ka({ result: e10, modelName: t, args: r, extensions: n, runtimeDataModel: i, globalOmit: o }) {
    return n.isEmpty() || e10 == null || typeof e10 != "object" || !i.models[t] ? e10 : Ln({ result: e10, args: r ?? {}, modelName: t, runtimeDataModel: i, visitor: (a, l, u) => {
      let c = Ae(l);
      return Wa({ result: a, modelName: c, select: u.select, omit: u.select ? void 0 : { ...o == null ? void 0 : o[c], ...u.omit }, extensions: n });
    } });
  }
  var mm = ["$connect", "$disconnect", "$on", "$transaction", "$use", "$extends"], Ya = mm;
  function za(e10) {
    if (e10 instanceof le) return fm(e10);
    if (On(e10)) return gm(e10);
    if (Array.isArray(e10)) {
      let r = [e10[0]];
      for (let n = 1; n < e10.length; n++) r[n] = Pr(e10[n]);
      return r;
    }
    let t = {};
    for (let r in e10) t[r] = Pr(e10[r]);
    return t;
  }
  function fm(e10) {
    return new le(e10.strings, e10.values);
  }
  function gm(e10) {
    return new Er(e10.sql, e10.values);
  }
  function Pr(e10) {
    if (typeof e10 != "object" || e10 == null || e10 instanceof qe || kt(e10)) return e10;
    if (Ct(e10)) return new Ce(e10.toFixed());
    if (Tt(e10)) return /* @__PURE__ */ new Date(+e10);
    if (ArrayBuffer.isView(e10)) return e10.slice(0);
    if (Array.isArray(e10)) {
      let t = e10.length, r;
      for (r = Array(t); t--; ) r[t] = Pr(e10[t]);
      return r;
    }
    if (typeof e10 == "object") {
      let t = {};
      for (let r in e10) r === "__proto__" ? Object.defineProperty(t, r, { value: Pr(e10[r]), configurable: true, enumerable: true, writable: true }) : t[r] = Pr(e10[r]);
      return t;
    }
    Me(e10, "Unknown value");
  }
  function Xa(e10, t, r, n = 0) {
    return e10._createPrismaPromise((i) => {
      var _a2;
      let o = t.customDataProxyFetch;
      return "transaction" in t && i !== void 0 && (((_a2 = t.transaction) == null ? void 0 : _a2.kind) === "batch" && t.transaction.lock.then(), t.transaction = i), n === r.length ? e10._executeRequest(t) : r[n]({ model: t.model, operation: t.model ? t.action : t.clientMethod, args: za(t.args ?? {}), __internalParams: t, query: (s, a = t) => {
        let l = a.customDataProxyFetch;
        return a.customDataProxyFetch = nl(o, l), a.args = s, Xa(e10, a, r, n + 1);
      } });
    });
  }
  function el(e10, t) {
    let { jsModelName: r, action: n, clientMethod: i } = t, o = r ? n : i;
    if (e10._extensions.isEmpty()) return e10._executeRequest(t);
    let s = e10._extensions.getAllQueryCallbacks(r ?? "$none", o);
    return Xa(e10, t, s);
  }
  function tl(e10) {
    return (t) => {
      let r = { requests: t }, n = t[0].extensions.getAllBatchQueryCallbacks();
      return n.length ? rl(r, n, 0, e10) : e10(r);
    };
  }
  function rl(e10, t, r, n) {
    if (r === t.length) return n(e10);
    let i = e10.customDataProxyFetch, o = e10.requests[0].transaction;
    return t[r]({ args: { queries: e10.requests.map((s) => ({ model: s.modelName, operation: s.action, args: s.args })), transaction: o ? { isolationLevel: o.kind === "batch" ? o.isolationLevel : void 0 } : void 0 }, __internalParams: e10, query(s, a = e10) {
      let l = a.customDataProxyFetch;
      return a.customDataProxyFetch = nl(i, l), rl(a, t, r + 1, n);
    } });
  }
  var Za = (e10) => e10;
  function nl(e10 = Za, t = Za) {
    return (r) => e10(t(r));
  }
  var il = M("prisma:client"), ol = { Vercel: "vercel", "Netlify CI": "netlify" };
  function sl({ postinstall: e10, ciName: t, clientVersion: r }) {
    if (il("checkPlatformCaching:postinstall", e10), il("checkPlatformCaching:ciName", t), e10 === true && t && t in ol) {
      let n = `Prisma has detected that this project was built on ${t}, which caches dependencies. This leads to an outdated Prisma Client because Prisma's auto-generation isn't triggered. To fix this, make sure to run the \`prisma generate\` command during the build process.

Learn how: https://pris.ly/d/${ol[t]}-build`;
      throw console.error(n), new C(n, r);
    }
  }
  function al(e10, t) {
    return e10 ? e10.datasources ? e10.datasources : e10.datasourceUrl ? { [t[0]]: { url: e10.datasourceUrl } } : {} : {};
  }
  var hm = () => {
    var _a2, _b;
    return ((_b = (_a2 = globalThis.process) == null ? void 0 : _a2.release) == null ? void 0 : _b.name) === "node";
  }, ym = () => {
    var _a2, _b;
    return !!globalThis.Bun || !!((_b = (_a2 = globalThis.process) == null ? void 0 : _a2.versions) == null ? void 0 : _b.bun);
  }, Em = () => !!globalThis.Deno, bm = () => typeof globalThis.Netlify == "object", wm = () => typeof globalThis.EdgeRuntime == "object", xm = () => {
    var _a2;
    return ((_a2 = globalThis.navigator) == null ? void 0 : _a2.userAgent) === "Cloudflare-Workers";
  };
  function Pm() {
    return [[bm, "netlify"], [wm, "edge-light"], [xm, "workerd"], [Em, "deno"], [ym, "bun"], [hm, "node"]].flatMap((r) => r[0]() ? [r[1]] : []).at(0) ?? "";
  }
  var vm = { node: "Node.js", workerd: "Cloudflare Workers", deno: "Deno and Deno Deploy", netlify: "Netlify Edge Functions", "edge-light": "Edge Runtime (Vercel Edge Functions, Vercel Edge Middleware, Next.js (Pages Router) Edge API Routes, Next.js (App Router) Edge Route Handlers or Next.js Middleware)" };
  function Fn() {
    let e10 = Pm();
    return { id: e10, prettyName: vm[e10] || e10, isEdge: ["workerd", "deno", "netlify", "edge-light"].includes(e10) };
  }
  var dl = D(require$$2), vr = D(require$$3);
  function Mn(e10) {
    let { runtimeBinaryTarget: t } = e10;
    return `Add "${t}" to \`binaryTargets\` in the "schema.prisma" file and run \`prisma generate\` after saving it:

${Tm(e10)}`;
  }
  function Tm(e10) {
    let { generator: t, generatorBinaryTargets: r, runtimeBinaryTarget: n } = e10, i = { fromEnvVar: null, value: n }, o = [...r, i];
    return Di({ ...t, binaryTargets: o });
  }
  function et(e10) {
    let { runtimeBinaryTarget: t } = e10;
    return `Prisma Client could not locate the Query Engine for runtime "${t}".`;
  }
  function tt(e10) {
    let { searchedLocations: t } = e10;
    return `The following locations have been searched:
${[...new Set(t)].map((i) => `  ${i}`).join(`
`)}`;
  }
  function ll(e10) {
    let { runtimeBinaryTarget: t } = e10;
    return `${et(e10)}

This happened because \`binaryTargets\` have been pinned, but the actual deployment also required "${t}".
${Mn(e10)}

${tt(e10)}`;
  }
  function $n(e10) {
    return `We would appreciate if you could take the time to share some information with us.
Please help us by answering a few questions: https://pris.ly/${e10}`;
  }
  function qn(e10) {
    let { errorStack: t } = e10;
    return (t == null ? void 0 : t.match(/\/\.next|\/next@|\/next\//)) ? `

We detected that you are using Next.js, learn how to fix this: https://pris.ly/d/engine-not-found-nextjs.` : "";
  }
  function ul(e10) {
    let { queryEngineName: t } = e10;
    return `${et(e10)}${qn(e10)}

This is likely caused by a bundler that has not copied "${t}" next to the resulting bundle.
Ensure that "${t}" has been copied next to the bundle or in "${e10.expectedLocation}".

${$n("engine-not-found-bundler-investigation")}

${tt(e10)}`;
  }
  function cl(e10) {
    let { runtimeBinaryTarget: t, generatorBinaryTargets: r } = e10, n = r.find((i) => i.native);
    return `${et(e10)}

This happened because Prisma Client was generated for "${(n == null ? void 0 : n.value) ?? "unknown"}", but the actual deployment required "${t}".
${Mn(e10)}

${tt(e10)}`;
  }
  function pl(e10) {
    let { queryEngineName: t } = e10;
    return `${et(e10)}${qn(e10)}

This is likely caused by tooling that has not copied "${t}" to the deployment folder.
Ensure that you ran \`prisma generate\` and that "${t}" has been copied to "${e10.expectedLocation}".

${$n("engine-not-found-tooling-investigation")}

${tt(e10)}`;
  }
  var Cm = M("prisma:client:engines:resolveEnginePath"), Rm = () => new RegExp("runtime[\\\\/]library\\.m?js$");
  async function ml(e10, t) {
    var _a2;
    let r = { binary: process.env.PRISMA_QUERY_ENGINE_BINARY, library: process.env.PRISMA_QUERY_ENGINE_LIBRARY }[e10] ?? t.prismaPath;
    if (r !== void 0) return r;
    let { enginePath: n, searchedLocations: i } = await Sm(e10, t);
    if (Cm("enginePath", n), n !== void 0) return t.prismaPath = n;
    let o = await ot(), s = ((_a2 = t.generator) == null ? void 0 : _a2.binaryTargets) ?? [], a = s.some((m) => m.native), l = !s.some((m) => m.value === o), u = __filename.match(Rm()) === null, c = { searchedLocations: i, generatorBinaryTargets: s, generator: t.generator, runtimeBinaryTarget: o, queryEngineName: fl(e10, o), expectedLocation: vr.default.relative(process.cwd(), t.dirname), errorStack: new Error().stack }, p;
    throw a && l ? p = cl(c) : l ? p = ll(c) : u ? p = ul(c) : p = pl(c), new C(p, t.clientVersion);
  }
  async function Sm(engineType, config) {
    var _a2, _b;
    let binaryTarget = await ot(), searchedLocations = [], dirname = eval("__dirname"), searchLocations = [config.dirname, vr.default.resolve(dirname, ".."), ((_b = (_a2 = config.generator) == null ? void 0 : _a2.output) == null ? void 0 : _b.value) ?? dirname, vr.default.resolve(dirname, "../../../.prisma/client"), "/tmp/prisma-engines", config.cwd];
    __filename.includes("resolveEnginePath") && searchLocations.push(cs());
    for (let e10 of searchLocations) {
      let t = fl(engineType, binaryTarget), r = vr.default.join(e10, t);
      if (searchedLocations.push(e10), dl.default.existsSync(r)) return { enginePath: r, searchedLocations };
    }
    return { enginePath: void 0, searchedLocations };
  }
  function fl(e10, t) {
    return Br(t);
  }
  var ao = D(Li());
  function gl(e10) {
    return e10 ? e10.replace(/".*"/g, '"X"').replace(/[\s:\[]([+-]?([0-9]*[.])?[0-9]+)/g, (t) => `${t[0]}5`) : "";
  }
  function hl(e10) {
    return e10.split(`
`).map((t) => t.replace(/^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)\s*/, "").replace(/\+\d+\s*ms$/, "")).join(`
`);
  }
  var yl = D(_s());
  function El({ title: e10, user: t = "prisma", repo: r = "prisma", template: n = "bug_report.yml", body: i }) {
    return (0, yl.default)({ user: t, repo: r, template: n, title: e10, body: i });
  }
  function bl({ version: e10, binaryTarget: t, title: r, description: n, engineVersion: i, database: o, query: s }) {
    var _a2;
    let a = qo(6e3 - ((s == null ? void 0 : s.length) ?? 0)), l = hl((0, ao.default)(a)), u = n ? `# Description
\`\`\`
${n}
\`\`\`` : "", c = (0, ao.default)(`Hi Prisma Team! My Prisma Client just crashed. This is the report:
## Versions

| Name            | Version            |
|-----------------|--------------------|
| Node            | ${(_a2 = process.version) == null ? void 0 : _a2.padEnd(19)}| 
| OS              | ${t == null ? void 0 : t.padEnd(19)}|
| Prisma Client   | ${e10 == null ? void 0 : e10.padEnd(19)}|
| Query Engine    | ${i == null ? void 0 : i.padEnd(19)}|
| Database        | ${o == null ? void 0 : o.padEnd(19)}|

${u}

## Logs
\`\`\`
${l}
\`\`\`

## Client Snippet
\`\`\`ts
// PLEASE FILL YOUR CODE SNIPPET HERE
\`\`\`

## Schema
\`\`\`prisma
// PLEASE ADD YOUR SCHEMA HERE IF POSSIBLE
\`\`\`

## Prisma Engine Query
\`\`\`
${s ? gl(s) : ""}
\`\`\`
`), p = El({ title: r, body: c });
    return `${r}

This is a non-recoverable error which probably happens when the Prisma Query Engine has a panic.

${ee(p)}

If you want the Prisma team to look into it, please open the link above 🙏
To increase the chance of success, please post your schema and a snippet of
how you used Prisma Client in the issue. 
`;
  }
  function $t({ inlineDatasources: e10, overrideDatasources: t, env: r, clientVersion: n }) {
    var _a2, _b;
    let i, o = Object.keys(e10)[0], s = (_a2 = e10[o]) == null ? void 0 : _a2.url, a = (_b = t[o]) == null ? void 0 : _b.url;
    if (o === void 0 ? i = void 0 : a ? i = a : (s == null ? void 0 : s.value) ? i = s.value : (s == null ? void 0 : s.fromEnvVar) && (i = r[s.fromEnvVar]), (s == null ? void 0 : s.fromEnvVar) !== void 0 && i === void 0) throw new C(`error: Environment variable not found: ${s.fromEnvVar}.`, n);
    if (i === void 0) throw new C("error: Missing URL environment variable, value, or override.", n);
    return i;
  }
  var Vn = class extends Error {
    constructor(r, n) {
      super(r);
      d(this, "clientVersion");
      d(this, "cause");
      this.clientVersion = n.clientVersion, this.cause = n.cause;
    }
    get [Symbol.toStringTag]() {
      return this.name;
    }
  };
  var ue = class extends Vn {
    constructor(r, n) {
      super(r, n);
      d(this, "isRetryable");
      this.isRetryable = n.isRetryable ?? true;
    }
  };
  function A(e10, t) {
    return { ...e10, isRetryable: t };
  }
  var qt = class extends ue {
    constructor(r) {
      super("This request must be retried", A(r, true));
      d(this, "name", "ForcedRetryError");
      d(this, "code", "P5001");
    }
  };
  x(qt, "ForcedRetryError");
  var lt = class extends ue {
    constructor(r, n) {
      super(r, A(n, false));
      d(this, "name", "InvalidDatasourceError");
      d(this, "code", "P6001");
    }
  };
  x(lt, "InvalidDatasourceError");
  var ut = class extends ue {
    constructor(r, n) {
      super(r, A(n, false));
      d(this, "name", "NotImplementedYetError");
      d(this, "code", "P5004");
    }
  };
  x(ut, "NotImplementedYetError");
  var j = class extends ue {
    constructor(r, n) {
      super(r, n);
      d(this, "response");
      this.response = n.response;
      let i = this.response.headers.get("prisma-request-id");
      if (i) {
        let o = `(The request id was: ${i})`;
        this.message = this.message + " " + o;
      }
    }
  };
  var ct = class extends j {
    constructor(r) {
      super("Schema needs to be uploaded", A(r, true));
      d(this, "name", "SchemaMissingError");
      d(this, "code", "P5005");
    }
  };
  x(ct, "SchemaMissingError");
  var lo = "This request could not be understood by the server", Tr = class extends j {
    constructor(r, n, i) {
      super(n || lo, A(r, false));
      d(this, "name", "BadRequestError");
      d(this, "code", "P5000");
      i && (this.code = i);
    }
  };
  x(Tr, "BadRequestError");
  var Cr = class extends j {
    constructor(r, n) {
      super("Engine not started: healthcheck timeout", A(r, true));
      d(this, "name", "HealthcheckTimeoutError");
      d(this, "code", "P5013");
      d(this, "logs");
      this.logs = n;
    }
  };
  x(Cr, "HealthcheckTimeoutError");
  var Rr = class extends j {
    constructor(r, n, i) {
      super(n, A(r, true));
      d(this, "name", "EngineStartupError");
      d(this, "code", "P5014");
      d(this, "logs");
      this.logs = i;
    }
  };
  x(Rr, "EngineStartupError");
  var Sr = class extends j {
    constructor(r) {
      super("Engine version is not supported", A(r, false));
      d(this, "name", "EngineVersionNotSupportedError");
      d(this, "code", "P5012");
    }
  };
  x(Sr, "EngineVersionNotSupportedError");
  var uo = "Request timed out", Ar = class extends j {
    constructor(r, n = uo) {
      super(n, A(r, false));
      d(this, "name", "GatewayTimeoutError");
      d(this, "code", "P5009");
    }
  };
  x(Ar, "GatewayTimeoutError");
  var Am = "Interactive transaction error", Ir = class extends j {
    constructor(r, n = Am) {
      super(n, A(r, false));
      d(this, "name", "InteractiveTransactionError");
      d(this, "code", "P5015");
    }
  };
  x(Ir, "InteractiveTransactionError");
  var Im = "Request parameters are invalid", kr = class extends j {
    constructor(r, n = Im) {
      super(n, A(r, false));
      d(this, "name", "InvalidRequestError");
      d(this, "code", "P5011");
    }
  };
  x(kr, "InvalidRequestError");
  var co = "Requested resource does not exist", Or = class extends j {
    constructor(r, n = co) {
      super(n, A(r, false));
      d(this, "name", "NotFoundError");
      d(this, "code", "P5003");
    }
  };
  x(Or, "NotFoundError");
  var po = "Unknown server error", Vt = class extends j {
    constructor(r, n, i) {
      super(n || po, A(r, true));
      d(this, "name", "ServerError");
      d(this, "code", "P5006");
      d(this, "logs");
      this.logs = i;
    }
  };
  x(Vt, "ServerError");
  var mo = "Unauthorized, check your connection string", _r = class extends j {
    constructor(r, n = mo) {
      super(n, A(r, false));
      d(this, "name", "UnauthorizedError");
      d(this, "code", "P5007");
    }
  };
  x(_r, "UnauthorizedError");
  var fo = "Usage exceeded, retry again later", Dr = class extends j {
    constructor(r, n = fo) {
      super(n, A(r, true));
      d(this, "name", "UsageExceededError");
      d(this, "code", "P5008");
    }
  };
  x(Dr, "UsageExceededError");
  async function km(e10) {
    let t;
    try {
      t = await e10.text();
    } catch {
      return { type: "EmptyError" };
    }
    try {
      let r = JSON.parse(t);
      if (typeof r == "string") switch (r) {
        case "InternalDataProxyError":
          return { type: "DataProxyError", body: r };
        default:
          return { type: "UnknownTextError", body: r };
      }
      if (typeof r == "object" && r !== null) {
        if ("is_panic" in r && "message" in r && "error_code" in r) return { type: "QueryEngineError", body: r };
        if ("EngineNotStarted" in r || "InteractiveTransactionMisrouted" in r || "InvalidRequestError" in r) {
          let n = Object.values(r)[0].reason;
          return typeof n == "string" && !["SchemaMissing", "EngineVersionNotSupported"].includes(n) ? { type: "UnknownJsonError", body: r } : { type: "DataProxyError", body: r };
        }
      }
      return { type: "UnknownJsonError", body: r };
    } catch {
      return t === "" ? { type: "EmptyError" } : { type: "UnknownTextError", body: t };
    }
  }
  async function Nr(e10, t) {
    if (e10.ok) return;
    let r = { clientVersion: t, response: e10 }, n = await km(e10);
    if (n.type === "QueryEngineError") throw new te(n.body.message, { code: n.body.error_code, clientVersion: t });
    if (n.type === "DataProxyError") {
      if (n.body === "InternalDataProxyError") throw new Vt(r, "Internal Data Proxy error");
      if ("EngineNotStarted" in n.body) {
        if (n.body.EngineNotStarted.reason === "SchemaMissing") return new ct(r);
        if (n.body.EngineNotStarted.reason === "EngineVersionNotSupported") throw new Sr(r);
        if ("EngineStartupError" in n.body.EngineNotStarted.reason) {
          let { msg: i, logs: o } = n.body.EngineNotStarted.reason.EngineStartupError;
          throw new Rr(r, i, o);
        }
        if ("KnownEngineStartupError" in n.body.EngineNotStarted.reason) {
          let { msg: i, error_code: o } = n.body.EngineNotStarted.reason.KnownEngineStartupError;
          throw new C(i, t, o);
        }
        if ("HealthcheckTimeout" in n.body.EngineNotStarted.reason) {
          let { logs: i } = n.body.EngineNotStarted.reason.HealthcheckTimeout;
          throw new Cr(r, i);
        }
      }
      if ("InteractiveTransactionMisrouted" in n.body) {
        let i = { IDParseError: "Could not parse interactive transaction ID", NoQueryEngineFoundError: "Could not find Query Engine for the specified host and transaction ID", TransactionStartError: "Could not start interactive transaction" };
        throw new Ir(r, i[n.body.InteractiveTransactionMisrouted.reason]);
      }
      if ("InvalidRequestError" in n.body) throw new kr(r, n.body.InvalidRequestError.reason);
    }
    if (e10.status === 401 || e10.status === 403) throw new _r(r, jt(mo, n));
    if (e10.status === 404) return new Or(r, jt(co, n));
    if (e10.status === 429) throw new Dr(r, jt(fo, n));
    if (e10.status === 504) throw new Ar(r, jt(uo, n));
    if (e10.status >= 500) throw new Vt(r, jt(po, n));
    if (e10.status >= 400) throw new Tr(r, jt(lo, n));
  }
  function jt(e10, t) {
    return t.type === "EmptyError" ? e10 : `${e10}: ${JSON.stringify(t)}`;
  }
  function wl(e10) {
    let t = Math.pow(2, e10) * 50, r = Math.ceil(Math.random() * t) - Math.ceil(t / 2), n = t + r;
    return new Promise((i) => setTimeout(() => i(n), n));
  }
  var Ve = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  function xl(e10) {
    let t = new TextEncoder().encode(e10), r = "", n = t.byteLength, i = n % 3, o = n - i, s, a, l, u, c;
    for (let p = 0; p < o; p = p + 3) c = t[p] << 16 | t[p + 1] << 8 | t[p + 2], s = (c & 16515072) >> 18, a = (c & 258048) >> 12, l = (c & 4032) >> 6, u = c & 63, r += Ve[s] + Ve[a] + Ve[l] + Ve[u];
    return i == 1 ? (c = t[o], s = (c & 252) >> 2, a = (c & 3) << 4, r += Ve[s] + Ve[a] + "==") : i == 2 && (c = t[o] << 8 | t[o + 1], s = (c & 64512) >> 10, a = (c & 1008) >> 4, l = (c & 15) << 2, r += Ve[s] + Ve[a] + Ve[l] + "="), r;
  }
  function Pl(e10) {
    var _a2;
    if (!!((_a2 = e10.generator) == null ? void 0 : _a2.previewFeatures.some((r) => r.toLowerCase().includes("metrics")))) throw new C("The `metrics` preview feature is not yet available with Accelerate.\nPlease remove `metrics` from the `previewFeatures` in your schema.\n\nMore information about Accelerate: https://pris.ly/d/accelerate", e10.clientVersion);
  }
  function Om(e10) {
    return e10[0] * 1e3 + e10[1] / 1e6;
  }
  function go(e10) {
    return new Date(Om(e10));
  }
  var vl = { "@prisma/engines-version": "6.5.0-73.173f8d54f8d52e692c7e27e72a88314ec7aeff60" };
  var Lr = class extends ue {
    constructor(r, n) {
      super(`Cannot fetch data from service:
${r}`, A(n, true));
      d(this, "name", "RequestError");
      d(this, "code", "P5010");
    }
  };
  x(Lr, "RequestError");
  async function pt(e10, t, r = (n) => n) {
    let { clientVersion: n, ...i } = t, o = r(fetch);
    try {
      return await o(e10, i);
    } catch (s) {
      let a = s.message ?? "Unknown error";
      throw new Lr(a, { clientVersion: n, cause: s });
    }
  }
  var Dm = /^[1-9][0-9]*\.[0-9]+\.[0-9]+$/, Tl = M("prisma:client:dataproxyEngine");
  async function Nm(e10, t) {
    let r = vl["@prisma/engines-version"], n = t.clientVersion ?? "unknown";
    if (process.env.PRISMA_CLIENT_DATA_PROXY_CLIENT_VERSION) return process.env.PRISMA_CLIENT_DATA_PROXY_CLIENT_VERSION;
    if (e10.includes("accelerate") && n !== "0.0.0" && n !== "in-memory") return n;
    let [i, o] = (n == null ? void 0 : n.split("-")) ?? [];
    if (o === void 0 && Dm.test(i)) return i;
    if (o !== void 0 || n === "0.0.0" || n === "in-memory") {
      if (e10.startsWith("localhost") || e10.startsWith("127.0.0.1")) return "0.0.0";
      let [s] = r.split("-") ?? [], [a, l, u] = s.split("."), c = Lm(`<=${a}.${l}.${u}`), p = await pt(c, { clientVersion: n });
      if (!p.ok) throw new Error(`Failed to fetch stable Prisma version, unpkg.com status ${p.status} ${p.statusText}, response body: ${await p.text() || "<empty body>"}`);
      let m = await p.text();
      Tl("length of body fetched from unpkg.com", m.length);
      let g;
      try {
        g = JSON.parse(m);
      } catch (h) {
        throw console.error("JSON.parse error: body fetched from unpkg.com: ", m), h;
      }
      return g.version;
    }
    throw new ut("Only `major.minor.patch` versions are supported by Accelerate.", { clientVersion: n });
  }
  async function Cl(e10, t) {
    let r = await Nm(e10, t);
    return Tl("version", r), r;
  }
  function Lm(e10) {
    return encodeURI(`https://unpkg.com/prisma@${e10}/package.json`);
  }
  var Rl = 3, jn = M("prisma:client:dataproxyEngine"), ho = class {
    constructor({ apiKey: t, tracingHelper: r, logLevel: n, logQueries: i, engineHash: o }) {
      d(this, "apiKey");
      d(this, "tracingHelper");
      d(this, "logLevel");
      d(this, "logQueries");
      d(this, "engineHash");
      this.apiKey = t, this.tracingHelper = r, this.logLevel = n, this.logQueries = i, this.engineHash = o;
    }
    build({ traceparent: t, interactiveTransaction: r } = {}) {
      let n = { Authorization: `Bearer ${this.apiKey}`, "Prisma-Engine-Hash": this.engineHash };
      this.tracingHelper.isEnabled() && (n.traceparent = t ?? this.tracingHelper.getTraceParent()), r && (n["X-transaction-id"] = r.id);
      let i = this.buildCaptureSettings();
      return i.length > 0 && (n["X-capture-telemetry"] = i.join(", ")), n;
    }
    buildCaptureSettings() {
      let t = [];
      return this.tracingHelper.isEnabled() && t.push("tracing"), this.logLevel && t.push(this.logLevel), this.logQueries && t.push("query"), t;
    }
  }, Fr = class {
    constructor(t) {
      d(this, "name", "DataProxyEngine");
      d(this, "inlineSchema");
      d(this, "inlineSchemaHash");
      d(this, "inlineDatasources");
      d(this, "config");
      d(this, "logEmitter");
      d(this, "env");
      d(this, "clientVersion");
      d(this, "engineHash");
      d(this, "tracingHelper");
      d(this, "remoteClientVersion");
      d(this, "host");
      d(this, "headerBuilder");
      d(this, "startPromise");
      Pl(t), this.config = t, this.env = { ...t.env, ...typeof process < "u" ? process.env : {} }, this.inlineSchema = xl(t.inlineSchema), this.inlineDatasources = t.inlineDatasources, this.inlineSchemaHash = t.inlineSchemaHash, this.clientVersion = t.clientVersion, this.engineHash = t.engineVersion, this.logEmitter = t.logEmitter, this.tracingHelper = t.tracingHelper;
    }
    apiKey() {
      return this.headerBuilder.apiKey;
    }
    version() {
      return this.engineHash;
    }
    async start() {
      this.startPromise !== void 0 && await this.startPromise, this.startPromise = (async () => {
        let [t, r] = this.extractHostAndApiKey();
        this.host = t, this.headerBuilder = new ho({ apiKey: r, tracingHelper: this.tracingHelper, logLevel: this.config.logLevel, logQueries: this.config.logQueries, engineHash: this.engineHash }), this.remoteClientVersion = await Cl(t, this.config), jn("host", this.host);
      })(), await this.startPromise;
    }
    async stop() {
    }
    propagateResponseExtensions(t) {
      var _a2, _b;
      ((_a2 = t == null ? void 0 : t.logs) == null ? void 0 : _a2.length) && t.logs.forEach((r) => {
        switch (r.level) {
          case "debug":
          case "trace":
            jn(r);
            break;
          case "error":
          case "warn":
          case "info": {
            this.logEmitter.emit(r.level, { timestamp: go(r.timestamp), message: r.attributes.message ?? "", target: r.target });
            break;
          }
          case "query": {
            this.logEmitter.emit("query", { query: r.attributes.query ?? "", timestamp: go(r.timestamp), duration: r.attributes.duration_ms ?? 0, params: r.attributes.params ?? "", target: r.target });
            break;
          }
          default:
            r.level;
        }
      }), ((_b = t == null ? void 0 : t.traces) == null ? void 0 : _b.length) && this.tracingHelper.dispatchEngineSpans(t.traces);
    }
    onBeforeExit() {
      throw new Error('"beforeExit" hook is not applicable to the remote query engine');
    }
    async url(t) {
      return await this.start(), `https://${this.host}/${this.remoteClientVersion}/${this.inlineSchemaHash}/${t}`;
    }
    async uploadSchema() {
      let t = { name: "schemaUpload", internal: true };
      return this.tracingHelper.runInChildSpan(t, async () => {
        let r = await pt(await this.url("schema"), { method: "PUT", headers: this.headerBuilder.build(), body: this.inlineSchema, clientVersion: this.clientVersion });
        r.ok || jn("schema response status", r.status);
        let n = await Nr(r, this.clientVersion);
        if (n) throw this.logEmitter.emit("warn", { message: `Error while uploading schema: ${n.message}`, timestamp: /* @__PURE__ */ new Date(), target: "" }), n;
        this.logEmitter.emit("info", { message: `Schema (re)uploaded (hash: ${this.inlineSchemaHash})`, timestamp: /* @__PURE__ */ new Date(), target: "" });
      });
    }
    request(t, { traceparent: r, interactiveTransaction: n, customDataProxyFetch: i }) {
      return this.requestInternal({ body: t, traceparent: r, interactiveTransaction: n, customDataProxyFetch: i });
    }
    async requestBatch(t, { traceparent: r, transaction: n, customDataProxyFetch: i }) {
      let o = (n == null ? void 0 : n.kind) === "itx" ? n.options : void 0, s = Lt(t, n);
      return (await this.requestInternal({ body: s, customDataProxyFetch: i, interactiveTransaction: o, traceparent: r })).map((l) => (l.extensions && this.propagateResponseExtensions(l.extensions), "errors" in l ? this.convertProtocolErrorsToClientError(l.errors) : l));
    }
    requestInternal({ body: t, traceparent: r, customDataProxyFetch: n, interactiveTransaction: i }) {
      return this.withRetry({ actionGerund: "querying", callback: async ({ logHttpCall: o }) => {
        let s = i ? `${i.payload.endpoint}/graphql` : await this.url("graphql");
        o(s);
        let a = await pt(s, { method: "POST", headers: this.headerBuilder.build({ traceparent: r, interactiveTransaction: i }), body: JSON.stringify(t), clientVersion: this.clientVersion }, n);
        a.ok || jn("graphql response status", a.status), await this.handleError(await Nr(a, this.clientVersion));
        let l = await a.json();
        if (l.extensions && this.propagateResponseExtensions(l.extensions), "errors" in l) throw this.convertProtocolErrorsToClientError(l.errors);
        return "batchResult" in l ? l.batchResult : l;
      } });
    }
    async transaction(t, r, n) {
      let i = { start: "starting", commit: "committing", rollback: "rolling back" };
      return this.withRetry({ actionGerund: `${i[t]} transaction`, callback: async ({ logHttpCall: o }) => {
        if (t === "start") {
          let s = JSON.stringify({ max_wait: n.maxWait, timeout: n.timeout, isolation_level: n.isolationLevel }), a = await this.url("transaction/start");
          o(a);
          let l = await pt(a, { method: "POST", headers: this.headerBuilder.build({ traceparent: r.traceparent }), body: s, clientVersion: this.clientVersion });
          await this.handleError(await Nr(l, this.clientVersion));
          let u = await l.json(), { extensions: c } = u;
          c && this.propagateResponseExtensions(c);
          let p = u.id, m = u["data-proxy"].endpoint;
          return { id: p, payload: { endpoint: m } };
        } else {
          let s = `${n.payload.endpoint}/${t}`;
          o(s);
          let a = await pt(s, { method: "POST", headers: this.headerBuilder.build({ traceparent: r.traceparent }), clientVersion: this.clientVersion });
          await this.handleError(await Nr(a, this.clientVersion));
          let l = await a.json(), { extensions: u } = l;
          u && this.propagateResponseExtensions(u);
          return;
        }
      } });
    }
    extractHostAndApiKey() {
      let t = { clientVersion: this.clientVersion }, r = Object.keys(this.inlineDatasources)[0], n = $t({ inlineDatasources: this.inlineDatasources, overrideDatasources: this.config.overrideDatasources, clientVersion: this.clientVersion, env: this.env }), i;
      try {
        i = new URL(n);
      } catch {
        throw new lt(`Error validating datasource \`${r}\`: the URL must start with the protocol \`prisma://\``, t);
      }
      let { protocol: o, host: s, searchParams: a } = i;
      if (o !== "prisma:" && o !== Xr) throw new lt(`Error validating datasource \`${r}\`: the URL must start with the protocol \`prisma://\``, t);
      let l = a.get("api_key");
      if (l === null || l.length < 1) throw new lt(`Error validating datasource \`${r}\`: the URL must contain a valid API key`, t);
      return [s, l];
    }
    metrics() {
      throw new ut("Metrics are not yet supported for Accelerate", { clientVersion: this.clientVersion });
    }
    async withRetry(t) {
      for (let r = 0; ; r++) {
        let n = (i) => {
          this.logEmitter.emit("info", { message: `Calling ${i} (n=${r})`, timestamp: /* @__PURE__ */ new Date(), target: "" });
        };
        try {
          return await t.callback({ logHttpCall: n });
        } catch (i) {
          if (!(i instanceof ue) || !i.isRetryable) throw i;
          if (r >= Rl) throw i instanceof qt ? i.cause : i;
          this.logEmitter.emit("warn", { message: `Attempt ${r + 1}/${Rl} failed for ${t.actionGerund}: ${i.message ?? "(unknown)"}`, timestamp: /* @__PURE__ */ new Date(), target: "" });
          let o = await wl(r);
          this.logEmitter.emit("warn", { message: `Retrying after ${o}ms`, timestamp: /* @__PURE__ */ new Date(), target: "" });
        }
      }
    }
    async handleError(t) {
      if (t instanceof ct) throw await this.uploadSchema(), new qt({ clientVersion: this.clientVersion, cause: t });
      if (t) throw t;
    }
    convertProtocolErrorsToClientError(t) {
      return t.length === 1 ? Ft(t[0], this.config.clientVersion, this.config.activeProvider) : new U(JSON.stringify(t), { clientVersion: this.config.clientVersion });
    }
    applyPendingMigrations() {
      throw new Error("Method not implemented.");
    }
  };
  function Sl(e10) {
    if ((e10 == null ? void 0 : e10.kind) === "itx") return e10.options.id;
  }
  var Eo = D(require$$0), Al = D(require$$3);
  var yo = Symbol("PrismaLibraryEngineCache");
  function Fm() {
    let e10 = globalThis;
    return e10[yo] === void 0 && (e10[yo] = {}), e10[yo];
  }
  function Mm(e10) {
    let t = Fm();
    if (t[e10] !== void 0) return t[e10];
    let r = Al.default.toNamespacedPath(e10), n = { exports: {} }, i = 0;
    return process.platform !== "win32" && (i = Eo.default.constants.dlopen.RTLD_LAZY | Eo.default.constants.dlopen.RTLD_DEEPBIND), process.dlopen(n, r, i), t[e10] = n.exports, n.exports;
  }
  var Il = { async loadLibrary(e10) {
    let t = await ci(), r = await ml("library", e10);
    try {
      return e10.tracingHelper.runInChildSpan({ name: "loadLibrary", internal: true }, () => Mm(r));
    } catch (n) {
      let i = vi({ e: n, platformInfo: t, id: r });
      throw new C(i, e10.clientVersion);
    }
  } };
  var bo, kl = { async loadLibrary(e10) {
    let { clientVersion: t, adapter: r, engineWasm: n } = e10;
    if (r === void 0) throw new C(`The \`adapter\` option for \`PrismaClient\` is required in this context (${Fn().prettyName})`, t);
    if (n === void 0) throw new C("WASM engine was unexpectedly `undefined`", t);
    bo === void 0 && (bo = (async () => {
      let o = n.getRuntime(), s = await n.getQueryEngineWasmModule();
      if (s == null) throw new C("The loaded wasm module was unexpectedly `undefined` or `null` once loaded", t);
      let a = { "./query_engine_bg.js": o }, l = new WebAssembly.Instance(s, a), u = l.exports.__wbindgen_start;
      return o.__wbg_set_wasm(l.exports), u(), o.QueryEngine;
    })());
    let i = await bo;
    return { debugPanic() {
      return Promise.reject("{}");
    }, dmmf() {
      return Promise.resolve("{}");
    }, version() {
      return { commit: "unknown", version: "unknown" };
    }, QueryEngine: i };
  } };
  var $m = "P2036", ke = M("prisma:client:libraryEngine");
  function qm(e10) {
    return e10.item_type === "query" && "query" in e10;
  }
  function Vm(e10) {
    return "level" in e10 ? e10.level === "error" && e10.message === "PANIC" : false;
  }
  var Ol = [...ii, "native"], jm = 0xffffffffffffffffn, wo = 1n;
  function Bm() {
    let e10 = wo++;
    return wo > jm && (wo = 1n), e10;
  }
  var Bt = class {
    constructor(t, r) {
      var _a2;
      d(this, "name", "LibraryEngine");
      d(this, "engine");
      d(this, "libraryInstantiationPromise");
      d(this, "libraryStartingPromise");
      d(this, "libraryStoppingPromise");
      d(this, "libraryStarted");
      d(this, "executingQueryPromise");
      d(this, "config");
      d(this, "QueryEngineConstructor");
      d(this, "libraryLoader");
      d(this, "library");
      d(this, "logEmitter");
      d(this, "libQueryEnginePath");
      d(this, "binaryTarget");
      d(this, "datasourceOverrides");
      d(this, "datamodel");
      d(this, "logQueries");
      d(this, "logLevel");
      d(this, "lastQuery");
      d(this, "loggerRustPanic");
      d(this, "tracingHelper");
      d(this, "versionInfo");
      this.libraryLoader = r ?? Il, t.engineWasm !== void 0 && (this.libraryLoader = r ?? kl), this.config = t, this.libraryStarted = false, this.logQueries = t.logQueries ?? false, this.logLevel = t.logLevel ?? "error", this.logEmitter = t.logEmitter, this.datamodel = t.inlineSchema, this.tracingHelper = t.tracingHelper, t.enableDebugLogs && (this.logLevel = "debug");
      let n = Object.keys(t.overrideDatasources)[0], i = (_a2 = t.overrideDatasources[n]) == null ? void 0 : _a2.url;
      n !== void 0 && i !== void 0 && (this.datasourceOverrides = { [n]: i }), this.libraryInstantiationPromise = this.instantiateLibrary();
    }
    wrapEngine(t) {
      var _a2, _b, _c2;
      return { applyPendingMigrations: (_a2 = t.applyPendingMigrations) == null ? void 0 : _a2.bind(t), commitTransaction: this.withRequestId(t.commitTransaction.bind(t)), connect: this.withRequestId(t.connect.bind(t)), disconnect: this.withRequestId(t.disconnect.bind(t)), metrics: (_b = t.metrics) == null ? void 0 : _b.bind(t), query: this.withRequestId(t.query.bind(t)), rollbackTransaction: this.withRequestId(t.rollbackTransaction.bind(t)), sdlSchema: (_c2 = t.sdlSchema) == null ? void 0 : _c2.bind(t), startTransaction: this.withRequestId(t.startTransaction.bind(t)), trace: t.trace.bind(t) };
    }
    withRequestId(t) {
      return async (...r) => {
        var _a2;
        let n = Bm().toString();
        try {
          return await t(...r, n);
        } finally {
          if (this.tracingHelper.isEnabled()) {
            let i = await ((_a2 = this.engine) == null ? void 0 : _a2.trace(n));
            if (i) {
              let o = JSON.parse(i);
              this.tracingHelper.dispatchEngineSpans(o.spans);
            }
          }
        }
      };
    }
    async applyPendingMigrations() {
      throw new Error("Cannot call this method from this type of engine instance");
    }
    async transaction(t, r, n) {
      var _a2, _b, _c2;
      await this.start();
      let i = JSON.stringify(r), o;
      if (t === "start") {
        let a = JSON.stringify({ max_wait: n.maxWait, timeout: n.timeout, isolation_level: n.isolationLevel });
        o = await ((_a2 = this.engine) == null ? void 0 : _a2.startTransaction(a, i));
      } else t === "commit" ? o = await ((_b = this.engine) == null ? void 0 : _b.commitTransaction(n.id, i)) : t === "rollback" && (o = await ((_c2 = this.engine) == null ? void 0 : _c2.rollbackTransaction(n.id, i)));
      let s = this.parseEngineResponse(o);
      if (Um(s)) {
        let a = this.getExternalAdapterError(s);
        throw a ? a.error : new te(s.message, { code: s.error_code, clientVersion: this.config.clientVersion, meta: s.meta });
      } else if (typeof s.message == "string") throw new U(s.message, { clientVersion: this.config.clientVersion });
      return s;
    }
    async instantiateLibrary() {
      if (ke("internalSetup"), this.libraryInstantiationPromise) return this.libraryInstantiationPromise;
      ni(), this.binaryTarget = await this.getCurrentBinaryTarget(), await this.tracingHelper.runInChildSpan("load_engine", () => this.loadEngine()), this.version();
    }
    async getCurrentBinaryTarget() {
      {
        if (this.binaryTarget) return this.binaryTarget;
        let t = await this.tracingHelper.runInChildSpan("detect_platform", () => ot());
        if (!Ol.includes(t)) throw new C(`Unknown ${fe("PRISMA_QUERY_ENGINE_LIBRARY")} ${fe(Y(t))}. Possible binaryTargets: ${je(Ol.join(", "))} or a path to the query engine library.
You may have to run ${je("prisma generate")} for your changes to take effect.`, this.config.clientVersion);
        return t;
      }
    }
    parseEngineResponse(t) {
      if (!t) throw new U("Response from the Engine was empty", { clientVersion: this.config.clientVersion });
      try {
        return JSON.parse(t);
      } catch {
        throw new U("Unable to JSON.parse response from engine", { clientVersion: this.config.clientVersion });
      }
    }
    async loadEngine() {
      if (!this.engine) {
        this.QueryEngineConstructor || (this.library = await this.libraryLoader.loadLibrary(this.config), this.QueryEngineConstructor = this.library.QueryEngine);
        try {
          let t = new WeakRef(this), { adapter: r } = this.config;
          r && ke("Using driver adapter: %O", r), this.engine = this.wrapEngine(new this.QueryEngineConstructor({ datamodel: this.datamodel, env: process.env, logQueries: this.config.logQueries ?? false, ignoreEnvVarErrors: true, datasourceOverrides: this.datasourceOverrides ?? {}, logLevel: this.logLevel, configDir: this.config.cwd, engineProtocol: "json", enableTracing: this.tracingHelper.isEnabled() }, (n) => {
            var _a2;
            (_a2 = t.deref()) == null ? void 0 : _a2.logger(n);
          }, r));
        } catch (t) {
          let r = t, n = this.parseInitError(r.message);
          throw typeof n == "string" ? r : new C(n.message, this.config.clientVersion, n.error_code);
        }
      }
    }
    logger(t) {
      let r = this.parseEngineResponse(t);
      r && (r.level = (r == null ? void 0 : r.level.toLowerCase()) ?? "unknown", qm(r) ? this.logEmitter.emit("query", { timestamp: /* @__PURE__ */ new Date(), query: r.query, params: r.params, duration: Number(r.duration_ms), target: r.module_path }) : Vm(r) ? this.loggerRustPanic = new pe(xo(this, `${r.message}: ${r.reason} in ${r.file}:${r.line}:${r.column}`), this.config.clientVersion) : this.logEmitter.emit(r.level, { timestamp: /* @__PURE__ */ new Date(), message: r.message, target: r.module_path }));
    }
    parseInitError(t) {
      try {
        return JSON.parse(t);
      } catch {
      }
      return t;
    }
    parseRequestError(t) {
      try {
        return JSON.parse(t);
      } catch {
      }
      return t;
    }
    onBeforeExit() {
      throw new Error('"beforeExit" hook is not applicable to the library engine since Prisma 5.0.0, it is only relevant and implemented for the binary engine. Please add your event listener to the `process` object directly instead.');
    }
    async start() {
      if (await this.libraryInstantiationPromise, await this.libraryStoppingPromise, this.libraryStartingPromise) return ke(`library already starting, this.libraryStarted: ${this.libraryStarted}`), this.libraryStartingPromise;
      if (this.libraryStarted) return;
      let t = async () => {
        var _a2;
        ke("library starting");
        try {
          let r = { traceparent: this.tracingHelper.getTraceParent() };
          await ((_a2 = this.engine) == null ? void 0 : _a2.connect(JSON.stringify(r))), this.libraryStarted = true, ke("library started");
        } catch (r) {
          let n = this.parseInitError(r.message);
          throw typeof n == "string" ? r : new C(n.message, this.config.clientVersion, n.error_code);
        } finally {
          this.libraryStartingPromise = void 0;
        }
      };
      return this.libraryStartingPromise = this.tracingHelper.runInChildSpan("connect", t), this.libraryStartingPromise;
    }
    async stop() {
      if (await this.libraryStartingPromise, await this.executingQueryPromise, this.libraryStoppingPromise) return ke("library is already stopping"), this.libraryStoppingPromise;
      if (!this.libraryStarted) return;
      let t = async () => {
        var _a2;
        await new Promise((n) => setTimeout(n, 5)), ke("library stopping");
        let r = { traceparent: this.tracingHelper.getTraceParent() };
        await ((_a2 = this.engine) == null ? void 0 : _a2.disconnect(JSON.stringify(r))), this.libraryStarted = false, this.libraryStoppingPromise = void 0, ke("library stopped");
      };
      return this.libraryStoppingPromise = this.tracingHelper.runInChildSpan("disconnect", t), this.libraryStoppingPromise;
    }
    version() {
      var _a2, _b;
      return this.versionInfo = (_a2 = this.library) == null ? void 0 : _a2.version(), ((_b = this.versionInfo) == null ? void 0 : _b.version) ?? "unknown";
    }
    debugPanic(t) {
      var _a2;
      return (_a2 = this.library) == null ? void 0 : _a2.debugPanic(t);
    }
    async request(t, { traceparent: r, interactiveTransaction: n }) {
      var _a2, _b;
      ke(`sending request, this.libraryStarted: ${this.libraryStarted}`);
      let i = JSON.stringify({ traceparent: r }), o = JSON.stringify(t);
      try {
        await this.start(), this.executingQueryPromise = (_a2 = this.engine) == null ? void 0 : _a2.query(o, i, n == null ? void 0 : n.id), this.lastQuery = o;
        let s = this.parseEngineResponse(await this.executingQueryPromise);
        if (s.errors) throw s.errors.length === 1 ? this.buildQueryError(s.errors[0]) : new U(JSON.stringify(s.errors), { clientVersion: this.config.clientVersion });
        if (this.loggerRustPanic) throw this.loggerRustPanic;
        return { data: s };
      } catch (s) {
        if (s instanceof C) throw s;
        if (s.code === "GenericFailure" && ((_b = s.message) == null ? void 0 : _b.startsWith("PANIC:"))) throw new pe(xo(this, s.message), this.config.clientVersion);
        let a = this.parseRequestError(s.message);
        throw typeof a == "string" ? s : new U(`${a.message}
${a.backtrace}`, { clientVersion: this.config.clientVersion });
      }
    }
    async requestBatch(t, { transaction: r, traceparent: n }) {
      ke("requestBatch");
      let i = Lt(t, r);
      await this.start(), this.lastQuery = JSON.stringify(i), this.executingQueryPromise = this.engine.query(this.lastQuery, JSON.stringify({ traceparent: n }), Sl(r));
      let o = await this.executingQueryPromise, s = this.parseEngineResponse(o);
      if (s.errors) throw s.errors.length === 1 ? this.buildQueryError(s.errors[0]) : new U(JSON.stringify(s.errors), { clientVersion: this.config.clientVersion });
      let { batchResult: a, errors: l } = s;
      if (Array.isArray(a)) return a.map((u) => u.errors && u.errors.length > 0 ? this.loggerRustPanic ?? this.buildQueryError(u.errors[0]) : { data: u });
      throw l && l.length === 1 ? new Error(l[0].error) : new Error(JSON.stringify(s));
    }
    buildQueryError(t) {
      if (t.user_facing_error.is_panic) return new pe(xo(this, t.user_facing_error.message), this.config.clientVersion);
      let r = this.getExternalAdapterError(t.user_facing_error);
      return r ? r.error : Ft(t, this.config.clientVersion, this.config.activeProvider);
    }
    getExternalAdapterError(t) {
      var _a2;
      if (t.error_code === $m && this.config.adapter) {
        let r = (_a2 = t.meta) == null ? void 0 : _a2.id;
        en(typeof r == "number", "Malformed external JS error received from the engine");
        let n = this.config.adapter.errorRegistry.consumeError(r);
        return en(n, "External error with reported id was not registered"), n;
      }
    }
    async metrics(t) {
      await this.start();
      let r = await this.engine.metrics(JSON.stringify(t));
      return t.format === "prometheus" ? r : this.parseEngineResponse(r);
    }
  };
  function Um(e10) {
    return typeof e10 == "object" && e10 !== null && e10.error_code !== void 0;
  }
  function xo(e10, t) {
    var _a2;
    return bl({ binaryTarget: e10.binaryTarget, title: t, version: e10.config.clientVersion, engineVersion: (_a2 = e10.versionInfo) == null ? void 0 : _a2.commit, database: e10.config.activeProvider, query: e10.lastQuery });
  }
  function _l({ copyEngine: e10 = true }, t) {
    let r;
    try {
      r = $t({ inlineDatasources: t.inlineDatasources, overrideDatasources: t.overrideDatasources, env: { ...t.env, ...process.env }, clientVersion: t.clientVersion });
    } catch {
    }
    let n = !!((r == null ? void 0 : r.startsWith("prisma://")) || Ii(r));
    e10 && n && or("recommend--no-engine", "In production, we recommend using `prisma generate --no-engine` (See: `prisma generate --help`)");
    let i = Et(t.generator), o = n || !e10, s = !!t.adapter, a = i === "library";
    if (o && s || s && false) {
      let c;
      throw e10 ? (r == null ? void 0 : r.startsWith("prisma://")) ? c = ["Prisma Client was configured to use the `adapter` option but the URL was a `prisma://` URL.", "Please either use the `prisma://` URL or remove the `adapter` from the Prisma Client constructor."] : c = ["Prisma Client was configured to use both the `adapter` and Accelerate, please chose one."] : c = ["Prisma Client was configured to use the `adapter` option but `prisma generate` was run with `--no-engine`.", "Please run `prisma generate` without `--no-engine` to be able to use Prisma Client with the adapter."], new re(c.join(`
`), { clientVersion: t.clientVersion });
    }
    return o ? new Fr(t) : a ? new Bt(t) : new Bt(t);
  }
  function Bn({ generator: e10 }) {
    return (e10 == null ? void 0 : e10.previewFeatures) ?? [];
  }
  var Dl = (e10) => ({ command: e10 });
  var Nl = (e10) => e10.strings.reduce((t, r, n) => `${t}@P${n}${r}`);
  function Ut(e10) {
    try {
      return Ll(e10, "fast");
    } catch {
      return Ll(e10, "slow");
    }
  }
  function Ll(e10, t) {
    return JSON.stringify(e10.map((r) => Ml(r, t)));
  }
  function Ml(e10, t) {
    if (Array.isArray(e10)) return e10.map((r) => Ml(r, t));
    if (typeof e10 == "bigint") return { prisma__type: "bigint", prisma__value: e10.toString() };
    if (Tt(e10)) return { prisma__type: "date", prisma__value: e10.toJSON() };
    if (Ce.isDecimal(e10)) return { prisma__type: "decimal", prisma__value: e10.toJSON() };
    if (Buffer.isBuffer(e10)) return { prisma__type: "bytes", prisma__value: e10.toString("base64") };
    if (Qm(e10)) return { prisma__type: "bytes", prisma__value: Buffer.from(e10).toString("base64") };
    if (ArrayBuffer.isView(e10)) {
      let { buffer: r, byteOffset: n, byteLength: i } = e10;
      return { prisma__type: "bytes", prisma__value: Buffer.from(r, n, i).toString("base64") };
    }
    return typeof e10 == "object" && t === "slow" ? $l(e10) : e10;
  }
  function Qm(e10) {
    return e10 instanceof ArrayBuffer || e10 instanceof SharedArrayBuffer ? true : typeof e10 == "object" && e10 !== null ? e10[Symbol.toStringTag] === "ArrayBuffer" || e10[Symbol.toStringTag] === "SharedArrayBuffer" : false;
  }
  function $l(e10) {
    if (typeof e10 != "object" || e10 === null) return e10;
    if (typeof e10.toJSON == "function") return e10.toJSON();
    if (Array.isArray(e10)) return e10.map(Fl);
    let t = {};
    for (let r of Object.keys(e10)) t[r] = Fl(e10[r]);
    return t;
  }
  function Fl(e10) {
    return typeof e10 == "bigint" ? e10.toString() : $l(e10);
  }
  var Gm = /^(\s*alter\s)/i, ql = M("prisma:client");
  function Po(e10, t, r, n) {
    if (!(e10 !== "postgresql" && e10 !== "cockroachdb") && r.length > 0 && Gm.exec(t)) throw new Error(`Running ALTER using ${n} is not supported
Using the example below you can still execute your query with Prisma, but please note that it is vulnerable to SQL injection attacks and requires you to take care of input sanitization.

Example:
  await prisma.$executeRawUnsafe(\`ALTER USER prisma WITH PASSWORD '\${password}'\`)

More Information: https://pris.ly/d/execute-raw
`);
  }
  var vo = ({ clientMethod: e10, activeProvider: t }) => (r) => {
    let n = "", i;
    if (On(r)) n = r.sql, i = { values: Ut(r.values), __prismaRawParameters__: true };
    else if (Array.isArray(r)) {
      let [o, ...s] = r;
      n = o, i = { values: Ut(s || []), __prismaRawParameters__: true };
    } else switch (t) {
      case "sqlite":
      case "mysql": {
        n = r.sql, i = { values: Ut(r.values), __prismaRawParameters__: true };
        break;
      }
      case "cockroachdb":
      case "postgresql":
      case "postgres": {
        n = r.text, i = { values: Ut(r.values), __prismaRawParameters__: true };
        break;
      }
      case "sqlserver": {
        n = Nl(r), i = { values: Ut(r.values), __prismaRawParameters__: true };
        break;
      }
      default:
        throw new Error(`The ${t} provider does not support ${e10}`);
    }
    return (i == null ? void 0 : i.values) ? ql(`prisma.${e10}(${n}, ${i.values})`) : ql(`prisma.${e10}(${n})`), { query: n, parameters: i };
  }, Vl = { requestArgsToMiddlewareArgs(e10) {
    return [e10.strings, ...e10.values];
  }, middlewareArgsToRequestArgs(e10) {
    let [t, ...r] = e10;
    return new le(t, r);
  } }, jl = { requestArgsToMiddlewareArgs(e10) {
    return [e10];
  }, middlewareArgsToRequestArgs(e10) {
    return e10[0];
  } };
  function To(e10) {
    return function(r, n) {
      let i, o = (s = e10) => {
        try {
          return s === void 0 || (s == null ? void 0 : s.kind) === "itx" ? i ?? (i = Bl(r(s))) : Bl(r(s));
        } catch (a) {
          return Promise.reject(a);
        }
      };
      return { get spec() {
        return n;
      }, then(s, a) {
        return o().then(s, a);
      }, catch(s) {
        return o().catch(s);
      }, finally(s) {
        return o().finally(s);
      }, requestTransaction(s) {
        let a = o(s);
        return a.requestTransaction ? a.requestTransaction(s) : a;
      }, [Symbol.toStringTag]: "PrismaPromise" };
    };
  }
  function Bl(e10) {
    return typeof e10.then == "function" ? e10 : Promise.resolve(e10);
  }
  var Jm = Ei.split(".")[0], Wm = { isEnabled() {
    return false;
  }, getTraceParent() {
    return "00-10-10-00";
  }, dispatchEngineSpans() {
  }, getActiveContext() {
  }, runInChildSpan(e10, t) {
    return t();
  } }, Co = class {
    isEnabled() {
      return this.getGlobalTracingHelper().isEnabled();
    }
    getTraceParent(t) {
      return this.getGlobalTracingHelper().getTraceParent(t);
    }
    dispatchEngineSpans(t) {
      return this.getGlobalTracingHelper().dispatchEngineSpans(t);
    }
    getActiveContext() {
      return this.getGlobalTracingHelper().getActiveContext();
    }
    runInChildSpan(t, r) {
      return this.getGlobalTracingHelper().runInChildSpan(t, r);
    }
    getGlobalTracingHelper() {
      let t = globalThis[`V${Jm}_PRISMA_INSTRUMENTATION`], r = globalThis.PRISMA_INSTRUMENTATION;
      return (t == null ? void 0 : t.helper) ?? (r == null ? void 0 : r.helper) ?? Wm;
    }
  };
  function Ul() {
    return new Co();
  }
  function Ql(e10, t = () => {
  }) {
    let r, n = new Promise((i) => r = i);
    return { then(i) {
      return --e10 === 0 && r(t()), i == null ? void 0 : i(n);
    } };
  }
  function Gl(e10) {
    return typeof e10 == "string" ? e10 : e10.reduce((t, r) => {
      let n = typeof r == "string" ? r : r.level;
      return n === "query" ? t : t && (r === "info" || t === "info") ? "info" : n;
    }, void 0);
  }
  var Un = class {
    constructor() {
      d(this, "_middlewares", []);
    }
    use(t) {
      this._middlewares.push(t);
    }
    get(t) {
      return this._middlewares[t];
    }
    has(t) {
      return !!this._middlewares[t];
    }
    length() {
      return this._middlewares.length;
    }
  };
  var Wl = D(Li());
  function Qn(e10) {
    return typeof e10.batchRequestIdx == "number";
  }
  function Jl(e10) {
    if (e10.action !== "findUnique" && e10.action !== "findUniqueOrThrow") return;
    let t = [];
    return e10.modelName && t.push(e10.modelName), e10.query.arguments && t.push(Ro(e10.query.arguments)), t.push(Ro(e10.query.selection)), t.join("");
  }
  function Ro(e10) {
    return `(${Object.keys(e10).sort().map((r) => {
      let n = e10[r];
      return typeof n == "object" && n !== null ? `(${r} ${Ro(n)})` : r;
    }).join(" ")})`;
  }
  var Hm = { aggregate: false, aggregateRaw: false, createMany: true, createManyAndReturn: true, createOne: true, deleteMany: true, deleteOne: true, executeRaw: true, findFirst: false, findFirstOrThrow: false, findMany: false, findRaw: false, findUnique: false, findUniqueOrThrow: false, groupBy: false, queryRaw: false, runCommandRaw: true, updateMany: true, updateManyAndReturn: true, updateOne: true, upsertOne: true };
  function So(e10) {
    return Hm[e10];
  }
  var Gn = class {
    constructor(t) {
      this.options = t;
      d(this, "batches");
      d(this, "tickActive", false);
      this.batches = {};
    }
    request(t) {
      let r = this.options.batchBy(t);
      return r ? (this.batches[r] || (this.batches[r] = [], this.tickActive || (this.tickActive = true, process.nextTick(() => {
        this.dispatchBatches(), this.tickActive = false;
      }))), new Promise((n, i) => {
        this.batches[r].push({ request: t, resolve: n, reject: i });
      })) : this.options.singleLoader(t);
    }
    dispatchBatches() {
      for (let t in this.batches) {
        let r = this.batches[t];
        delete this.batches[t], r.length === 1 ? this.options.singleLoader(r[0].request).then((n) => {
          n instanceof Error ? r[0].reject(n) : r[0].resolve(n);
        }).catch((n) => {
          r[0].reject(n);
        }) : (r.sort((n, i) => this.options.batchOrder(n.request, i.request)), this.options.batchLoader(r.map((n) => n.request)).then((n) => {
          if (n instanceof Error) for (let i = 0; i < r.length; i++) r[i].reject(n);
          else for (let i = 0; i < r.length; i++) {
            let o = n[i];
            o instanceof Error ? r[i].reject(o) : r[i].resolve(o);
          }
        }).catch((n) => {
          for (let i = 0; i < r.length; i++) r[i].reject(n);
        }));
      }
    }
    get [Symbol.toStringTag]() {
      return "DataLoader";
    }
  };
  function dt(e10, t) {
    if (t === null) return t;
    switch (e10) {
      case "bigint":
        return BigInt(t);
      case "bytes": {
        let { buffer: r, byteOffset: n, byteLength: i } = Buffer.from(t, "base64");
        return new Uint8Array(r, n, i);
      }
      case "decimal":
        return new Ce(t);
      case "datetime":
      case "date":
        return new Date(t);
      case "time":
        return /* @__PURE__ */ new Date(`1970-01-01T${t}Z`);
      case "bigint-array":
        return t.map((r) => dt("bigint", r));
      case "bytes-array":
        return t.map((r) => dt("bytes", r));
      case "decimal-array":
        return t.map((r) => dt("decimal", r));
      case "datetime-array":
        return t.map((r) => dt("datetime", r));
      case "date-array":
        return t.map((r) => dt("date", r));
      case "time-array":
        return t.map((r) => dt("time", r));
      default:
        return t;
    }
  }
  function Jn(e10) {
    let t = [], r = Km(e10);
    for (let n = 0; n < e10.rows.length; n++) {
      let i = e10.rows[n], o = { ...r };
      for (let s = 0; s < i.length; s++) o[e10.columns[s]] = dt(e10.types[s], i[s]);
      t.push(o);
    }
    return t;
  }
  function Km(e10) {
    let t = {};
    for (let r = 0; r < e10.columns.length; r++) t[e10.columns[r]] = null;
    return t;
  }
  var Ym = M("prisma:client:request_handler"), Wn = class {
    constructor(t, r) {
      d(this, "client");
      d(this, "dataloader");
      d(this, "logEmitter");
      this.logEmitter = r, this.client = t, this.dataloader = new Gn({ batchLoader: tl(async ({ requests: n, customDataProxyFetch: i }) => {
        let { transaction: o, otelParentCtx: s } = n[0], a = n.map((p) => p.protocolQuery), l = this.client._tracingHelper.getTraceParent(s), u = n.some((p) => So(p.protocolQuery.action));
        return (await this.client._engine.requestBatch(a, { traceparent: l, transaction: zm(o), containsWrite: u, customDataProxyFetch: i })).map((p, m) => {
          if (p instanceof Error) return p;
          try {
            return this.mapQueryEngineResult(n[m], p);
          } catch (g) {
            return g;
          }
        });
      }), singleLoader: async (n) => {
        var _a2;
        let i = ((_a2 = n.transaction) == null ? void 0 : _a2.kind) === "itx" ? Hl(n.transaction) : void 0, o = await this.client._engine.request(n.protocolQuery, { traceparent: this.client._tracingHelper.getTraceParent(), interactiveTransaction: i, isWrite: So(n.protocolQuery.action), customDataProxyFetch: n.customDataProxyFetch });
        return this.mapQueryEngineResult(n, o);
      }, batchBy: (n) => {
        var _a2;
        return ((_a2 = n.transaction) == null ? void 0 : _a2.id) ? `transaction-${n.transaction.id}` : Jl(n.protocolQuery);
      }, batchOrder(n, i) {
        var _a2, _b;
        return ((_a2 = n.transaction) == null ? void 0 : _a2.kind) === "batch" && ((_b = i.transaction) == null ? void 0 : _b.kind) === "batch" ? n.transaction.index - i.transaction.index : 0;
      } });
    }
    async request(t) {
      try {
        return await this.dataloader.request(t);
      } catch (r) {
        let { clientMethod: n, callsite: i, transaction: o, args: s, modelName: a } = t;
        this.handleAndLogRequestError({ error: r, clientMethod: n, callsite: i, transaction: o, args: s, modelName: a, globalOmit: t.globalOmit });
      }
    }
    mapQueryEngineResult({ dataPath: t, unpacker: r }, n) {
      let i = n == null ? void 0 : n.data, o = this.unpack(i, t, r);
      return process.env.PRISMA_CLIENT_GET_TIME ? { data: o } : o;
    }
    handleAndLogRequestError(t) {
      try {
        this.handleRequestError(t);
      } catch (r) {
        throw this.logEmitter && this.logEmitter.emit("error", { message: r.message, target: t.clientMethod, timestamp: /* @__PURE__ */ new Date() }), r;
      }
    }
    handleRequestError({ error: t, clientMethod: r, callsite: n, transaction: i, args: o, modelName: s, globalOmit: a }) {
      if (Ym(t), Zm(t, i)) throw t;
      if (t instanceof te && Xm(t)) {
        let u = Kl(t.meta);
        Cn({ args: o, errors: [u], callsite: n, errorFormat: this.client._errorFormat, originalMethod: r, clientVersion: this.client._clientVersion, globalOmit: a });
      }
      let l = t.message;
      if (n && (l = gn({ callsite: n, originalMethod: r, isPanic: t.isPanic, showColors: this.client._errorFormat === "pretty", message: l })), l = this.sanitizeMessage(l), t.code) {
        let u = s ? { modelName: s, ...t.meta } : t.meta;
        throw new te(l, { code: t.code, clientVersion: this.client._clientVersion, meta: u, batchRequestIdx: t.batchRequestIdx });
      } else {
        if (t.isPanic) throw new pe(l, this.client._clientVersion);
        if (t instanceof U) throw new U(l, { clientVersion: this.client._clientVersion, batchRequestIdx: t.batchRequestIdx });
        if (t instanceof C) throw new C(l, this.client._clientVersion);
        if (t instanceof pe) throw new pe(l, this.client._clientVersion);
      }
      throw t.clientVersion = this.client._clientVersion, t;
    }
    sanitizeMessage(t) {
      return this.client._errorFormat && this.client._errorFormat !== "pretty" ? (0, Wl.default)(t) : t;
    }
    unpack(t, r, n) {
      if (!t || (t.data && (t = t.data), !t)) return t;
      let i = Object.keys(t)[0], o = Object.values(t)[0], s = r.filter((u) => u !== "select" && u !== "include"), a = no(o, s), l = i === "queryRaw" ? Jn(a) : Pt(a);
      return n ? n(l) : l;
    }
    get [Symbol.toStringTag]() {
      return "RequestHandler";
    }
  };
  function zm(e10) {
    if (e10) {
      if (e10.kind === "batch") return { kind: "batch", options: { isolationLevel: e10.isolationLevel } };
      if (e10.kind === "itx") return { kind: "itx", options: Hl(e10) };
      Me(e10, "Unknown transaction kind");
    }
  }
  function Hl(e10) {
    return { id: e10.id, payload: e10.payload };
  }
  function Zm(e10, t) {
    return Qn(e10) && (t == null ? void 0 : t.kind) === "batch" && e10.batchRequestIdx !== t.index;
  }
  function Xm(e10) {
    return e10.code === "P2009" || e10.code === "P2012";
  }
  function Kl(e10) {
    if (e10.kind === "Union") return { kind: "Union", errors: e10.errors.map(Kl) };
    if (Array.isArray(e10.selectionPath)) {
      let [, ...t] = e10.selectionPath;
      return { ...e10, selectionPath: t };
    }
    return e10;
  }
  var Yl = "6.5.0";
  var zl = Yl;
  var ru = D(Qi());
  var L = class extends Error {
    constructor(t) {
      super(t + `
Read more at https://pris.ly/d/client-constructor`), this.name = "PrismaClientConstructorValidationError";
    }
    get [Symbol.toStringTag]() {
      return "PrismaClientConstructorValidationError";
    }
  };
  x(L, "PrismaClientConstructorValidationError");
  var Zl = ["datasources", "datasourceUrl", "errorFormat", "adapter", "log", "transactionOptions", "omit", "__internal"], Xl = ["pretty", "colorless", "minimal"], eu = ["info", "query", "warn", "error"], tf = { datasources: (e10, { datasourceNames: t }) => {
    if (e10) {
      if (typeof e10 != "object" || Array.isArray(e10)) throw new L(`Invalid value ${JSON.stringify(e10)} for "datasources" provided to PrismaClient constructor`);
      for (let [r, n] of Object.entries(e10)) {
        if (!t.includes(r)) {
          let i = Qt(r, t) || ` Available datasources: ${t.join(", ")}`;
          throw new L(`Unknown datasource ${r} provided to PrismaClient constructor.${i}`);
        }
        if (typeof n != "object" || Array.isArray(n)) throw new L(`Invalid value ${JSON.stringify(e10)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
        if (n && typeof n == "object") for (let [i, o] of Object.entries(n)) {
          if (i !== "url") throw new L(`Invalid value ${JSON.stringify(e10)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
          if (typeof o != "string") throw new L(`Invalid value ${JSON.stringify(o)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
        }
      }
    }
  }, adapter: (e10, t) => {
    if (!e10 && Et(t.generator) === "client") throw new L('Using engine type "client" requires a driver adapter to be provided to PrismaClient constructor.');
    if (e10 === null) return;
    if (e10 === void 0) throw new L('"adapter" property must not be undefined, use null to conditionally disable driver adapters.');
    if (!Bn(t).includes("driverAdapters")) throw new L('"adapter" property can only be provided to PrismaClient constructor when "driverAdapters" preview feature is enabled.');
    if (Et(t.generator) === "binary") throw new L('Cannot use a driver adapter with the "binary" Query Engine. Please use the "library" Query Engine.');
  }, datasourceUrl: (e10) => {
    if (typeof e10 < "u" && typeof e10 != "string") throw new L(`Invalid value ${JSON.stringify(e10)} for "datasourceUrl" provided to PrismaClient constructor.
Expected string or undefined.`);
  }, errorFormat: (e10) => {
    if (e10) {
      if (typeof e10 != "string") throw new L(`Invalid value ${JSON.stringify(e10)} for "errorFormat" provided to PrismaClient constructor.`);
      if (!Xl.includes(e10)) {
        let t = Qt(e10, Xl);
        throw new L(`Invalid errorFormat ${e10} provided to PrismaClient constructor.${t}`);
      }
    }
  }, log: (e10) => {
    if (!e10) return;
    if (!Array.isArray(e10)) throw new L(`Invalid value ${JSON.stringify(e10)} for "log" provided to PrismaClient constructor.`);
    function t(r) {
      if (typeof r == "string" && !eu.includes(r)) {
        let n = Qt(r, eu);
        throw new L(`Invalid log level "${r}" provided to PrismaClient constructor.${n}`);
      }
    }
    for (let r of e10) {
      t(r);
      let n = { level: t, emit: (i) => {
        let o = ["stdout", "event"];
        if (!o.includes(i)) {
          let s = Qt(i, o);
          throw new L(`Invalid value ${JSON.stringify(i)} for "emit" in logLevel provided to PrismaClient constructor.${s}`);
        }
      } };
      if (r && typeof r == "object") for (let [i, o] of Object.entries(r)) if (n[i]) n[i](o);
      else throw new L(`Invalid property ${i} for "log" provided to PrismaClient constructor`);
    }
  }, transactionOptions: (e10) => {
    if (!e10) return;
    let t = e10.maxWait;
    if (t != null && t <= 0) throw new L(`Invalid value ${t} for maxWait in "transactionOptions" provided to PrismaClient constructor. maxWait needs to be greater than 0`);
    let r = e10.timeout;
    if (r != null && r <= 0) throw new L(`Invalid value ${r} for timeout in "transactionOptions" provided to PrismaClient constructor. timeout needs to be greater than 0`);
  }, omit: (e10, t) => {
    if (typeof e10 != "object") throw new L('"omit" option is expected to be an object.');
    if (e10 === null) throw new L('"omit" option can not be `null`');
    let r = [];
    for (let [n, i] of Object.entries(e10)) {
      let o = nf(n, t.runtimeDataModel);
      if (!o) {
        r.push({ kind: "UnknownModel", modelKey: n });
        continue;
      }
      for (let [s, a] of Object.entries(i)) {
        let l = o.fields.find((u) => u.name === s);
        if (!l) {
          r.push({ kind: "UnknownField", modelKey: n, fieldName: s });
          continue;
        }
        if (l.relationName) {
          r.push({ kind: "RelationInOmit", modelKey: n, fieldName: s });
          continue;
        }
        typeof a != "boolean" && r.push({ kind: "InvalidFieldValue", modelKey: n, fieldName: s });
      }
    }
    if (r.length > 0) throw new L(of(e10, r));
  }, __internal: (e10) => {
    if (!e10) return;
    let t = ["debug", "engine", "configOverride"];
    if (typeof e10 != "object") throw new L(`Invalid value ${JSON.stringify(e10)} for "__internal" to PrismaClient constructor`);
    for (let [r] of Object.entries(e10)) if (!t.includes(r)) {
      let n = Qt(r, t);
      throw new L(`Invalid property ${JSON.stringify(r)} for "__internal" provided to PrismaClient constructor.${n}`);
    }
  } };
  function nu(e10, t) {
    for (let [r, n] of Object.entries(e10)) {
      if (!Zl.includes(r)) {
        let i = Qt(r, Zl);
        throw new L(`Unknown property ${r} provided to PrismaClient constructor.${i}`);
      }
      tf[r](n, t);
    }
    if (e10.datasourceUrl && e10.datasources) throw new L('Can not use "datasourceUrl" and "datasources" options at the same time. Pick one of them');
  }
  function Qt(e10, t) {
    if (t.length === 0 || typeof e10 != "string") return "";
    let r = rf(e10, t);
    return r ? ` Did you mean "${r}"?` : "";
  }
  function rf(e10, t) {
    if (t.length === 0) return null;
    let r = t.map((i) => ({ value: i, distance: (0, ru.default)(e10, i) }));
    r.sort((i, o) => i.distance < o.distance ? -1 : 1);
    let n = r[0];
    return n.distance < 3 ? n.value : null;
  }
  function nf(e10, t) {
    return tu(t.models, e10) ?? tu(t.types, e10);
  }
  function tu(e10, t) {
    let r = Object.keys(e10).find((n) => vt(n) === t);
    if (r) return e10[r];
  }
  function of(e10, t) {
    var _a2, _b, _c2, _d2;
    let r = Ot(e10);
    for (let o of t) switch (o.kind) {
      case "UnknownModel":
        (_a2 = r.arguments.getField(o.modelKey)) == null ? void 0 : _a2.markAsError(), r.addErrorMessage(() => `Unknown model name: ${o.modelKey}.`);
        break;
      case "UnknownField":
        (_b = r.arguments.getDeepField([o.modelKey, o.fieldName])) == null ? void 0 : _b.markAsError(), r.addErrorMessage(() => `Model "${o.modelKey}" does not have a field named "${o.fieldName}".`);
        break;
      case "RelationInOmit":
        (_c2 = r.arguments.getDeepField([o.modelKey, o.fieldName])) == null ? void 0 : _c2.markAsError(), r.addErrorMessage(() => 'Relations are already excluded by default and can not be specified in "omit".');
        break;
      case "InvalidFieldValue":
        (_d2 = r.arguments.getDeepFieldValue([o.modelKey, o.fieldName])) == null ? void 0 : _d2.markAsError(), r.addErrorMessage(() => "Omit field option value must be a boolean.");
        break;
    }
    let { message: n, args: i } = Tn(r, "colorless");
    return `Error validating "omit" option:

${i}

${n}`;
  }
  function iu(e10) {
    return e10.length === 0 ? Promise.resolve([]) : new Promise((t, r) => {
      let n = new Array(e10.length), i = null, o = false, s = 0, a = () => {
        o || (s++, s === e10.length && (o = true, i ? r(i) : t(n)));
      }, l = (u) => {
        o || (o = true, r(u));
      };
      for (let u = 0; u < e10.length; u++) e10[u].then((c) => {
        n[u] = c, a();
      }, (c) => {
        if (!Qn(c)) {
          l(c);
          return;
        }
        c.batchRequestIdx === u ? l(c) : (i || (i = c), a());
      });
    });
  }
  var rt = M("prisma:client");
  typeof globalThis == "object" && (globalThis.NODE_CLIENT = true);
  var sf = { requestArgsToMiddlewareArgs: (e10) => e10, middlewareArgsToRequestArgs: (e10) => e10 }, af = Symbol.for("prisma.client.transaction.id"), lf = { id: 0, nextId() {
    return ++this.id;
  } };
  function cu(e10) {
    class t {
      constructor(n) {
        var _a2, _b, _c2, _d2, _e2, _f;
        d(this, "_originalClient", this);
        d(this, "_runtimeDataModel");
        d(this, "_requestHandler");
        d(this, "_connectionPromise");
        d(this, "_disconnectionPromise");
        d(this, "_engineConfig");
        d(this, "_accelerateEngineConfig");
        d(this, "_clientVersion");
        d(this, "_errorFormat");
        d(this, "_tracingHelper");
        d(this, "_middlewares", new Un());
        d(this, "_previewFeatures");
        d(this, "_activeProvider");
        d(this, "_globalOmit");
        d(this, "_extensions");
        d(this, "_engine");
        d(this, "_appliedParent");
        d(this, "_createPrismaPromise", To());
        d(this, "$metrics", new Dt(this));
        d(this, "$extends", Ja);
        e10 = ((_b = (_a2 = n == null ? void 0 : n.__internal) == null ? void 0 : _a2.configOverride) == null ? void 0 : _b.call(_a2, e10)) ?? e10, sl(e10), n && nu(n, e10);
        let i = new lu.EventEmitter().on("error", () => {
        });
        this._extensions = _t.empty(), this._previewFeatures = Bn(e10), this._clientVersion = e10.clientVersion ?? zl, this._activeProvider = e10.activeProvider, this._globalOmit = n == null ? void 0 : n.omit, this._tracingHelper = Ul();
        let o = { rootEnvPath: e10.relativeEnvPaths.rootEnvPath && Mr.default.resolve(e10.dirname, e10.relativeEnvPaths.rootEnvPath), schemaEnvPath: e10.relativeEnvPaths.schemaEnvPath && Mr.default.resolve(e10.dirname, e10.relativeEnvPaths.schemaEnvPath) }, s;
        if (n == null ? void 0 : n.adapter) {
          s = Xn(n.adapter);
          let l = e10.activeProvider === "postgresql" ? "postgres" : e10.activeProvider;
          if (s.provider !== l) throw new C(`The Driver Adapter \`${s.adapterName}\`, based on \`${s.provider}\`, is not compatible with the provider \`${l}\` specified in the Prisma schema.`, this._clientVersion);
          if (n.datasources || n.datasourceUrl !== void 0) throw new C("Custom datasource configuration is not compatible with Prisma Driver Adapters. Please define the database connection string directly in the Driver Adapter configuration.", this._clientVersion);
        }
        let a = !s && er(o, { conflictCheck: "none" }) || ((_c2 = e10.injectableEdgeEnv) == null ? void 0 : _c2.call(e10));
        try {
          let l = n ?? {}, u = l.__internal ?? {}, c = u.debug === true;
          c && M.enable("prisma:client");
          let p = Mr.default.resolve(e10.dirname, e10.relativePath);
          uu.default.existsSync(p) || (p = e10.dirname), rt("dirname", e10.dirname), rt("relativePath", e10.relativePath), rt("cwd", p);
          let m = u.engine || {};
          if (l.errorFormat ? this._errorFormat = l.errorFormat : "production" === "production" ? this._errorFormat = "minimal" : process.env.NO_COLOR ? this._errorFormat = "colorless" : this._errorFormat = "colorless", this._runtimeDataModel = e10.runtimeDataModel, this._engineConfig = { cwd: p, dirname: e10.dirname, enableDebugLogs: c, allowTriggerPanic: m.allowTriggerPanic, datamodelPath: Mr.default.join(e10.dirname, e10.filename ?? "schema.prisma"), prismaPath: m.binaryPath ?? void 0, engineEndpoint: m.endpoint, generator: e10.generator, showColors: this._errorFormat === "pretty", logLevel: l.log && Gl(l.log), logQueries: l.log && !!(typeof l.log == "string" ? l.log === "query" : l.log.find((g) => typeof g == "string" ? g === "query" : g.level === "query")), env: (a == null ? void 0 : a.parsed) ?? {}, flags: [], engineWasm: e10.engineWasm, compilerWasm: e10.compilerWasm, clientVersion: e10.clientVersion, engineVersion: e10.engineVersion, previewFeatures: this._previewFeatures, activeProvider: e10.activeProvider, inlineSchema: e10.inlineSchema, overrideDatasources: al(l, e10.datasourceNames), inlineDatasources: e10.inlineDatasources, inlineSchemaHash: e10.inlineSchemaHash, tracingHelper: this._tracingHelper, transactionOptions: { maxWait: ((_d2 = l.transactionOptions) == null ? void 0 : _d2.maxWait) ?? 2e3, timeout: ((_e2 = l.transactionOptions) == null ? void 0 : _e2.timeout) ?? 5e3, isolationLevel: (_f = l.transactionOptions) == null ? void 0 : _f.isolationLevel }, logEmitter: i, isBundled: e10.isBundled, adapter: s }, this._accelerateEngineConfig = { ...this._engineConfig, accelerateUtils: { resolveDatasourceUrl: $t, getBatchRequestPayload: Lt, prismaGraphQLToJSError: Ft, PrismaClientUnknownRequestError: U, PrismaClientInitializationError: C, PrismaClientKnownRequestError: te, debug: M("prisma:client:accelerateEngine"), engineVersion: su.version, clientVersion: e10.clientVersion } }, rt("clientVersion", e10.clientVersion), this._engine = _l(e10, this._engineConfig), this._requestHandler = new Wn(this, i), l.log) for (let g of l.log) {
            let h = typeof g == "string" ? g : g.emit === "stdout" ? g.level : null;
            h && this.$on(h, (y) => {
              ir.log(`${ir.tags[h] ?? ""}`, y.message || y.query);
            });
          }
        } catch (l) {
          throw l.clientVersion = this._clientVersion, l;
        }
        return this._appliedParent = xr(this);
      }
      get [Symbol.toStringTag]() {
        return "PrismaClient";
      }
      $use(n) {
        this._middlewares.use(n);
      }
      $on(n, i) {
        return n === "beforeExit" ? this._engine.onBeforeExit(i) : n && this._engineConfig.logEmitter.on(n, i), this;
      }
      $connect() {
        try {
          return this._engine.start();
        } catch (n) {
          throw n.clientVersion = this._clientVersion, n;
        }
      }
      async $disconnect() {
        try {
          await this._engine.stop();
        } catch (n) {
          throw n.clientVersion = this._clientVersion, n;
        } finally {
          Vo();
        }
      }
      $executeRawInternal(n, i, o, s) {
        let a = this._activeProvider;
        return this._request({ action: "executeRaw", args: o, transaction: n, clientMethod: i, argsMapper: vo({ clientMethod: i, activeProvider: a }), callsite: Xe(this._errorFormat), dataPath: [], middlewareArgsMapper: s });
      }
      $executeRaw(n, ...i) {
        return this._createPrismaPromise((o) => {
          if (n.raw !== void 0 || n.sql !== void 0) {
            let [s, a] = ou(n, i);
            return Po(this._activeProvider, s.text, s.values, Array.isArray(n) ? "prisma.$executeRaw`<SQL>`" : "prisma.$executeRaw(sql`<SQL>`)"), this.$executeRawInternal(o, "$executeRaw", s, a);
          }
          throw new re("`$executeRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#executeraw\n", { clientVersion: this._clientVersion });
        });
      }
      $executeRawUnsafe(n, ...i) {
        return this._createPrismaPromise((o) => (Po(this._activeProvider, n, i, "prisma.$executeRawUnsafe(<SQL>, [...values])"), this.$executeRawInternal(o, "$executeRawUnsafe", [n, ...i])));
      }
      $runCommandRaw(n) {
        if (e10.activeProvider !== "mongodb") throw new re(`The ${e10.activeProvider} provider does not support $runCommandRaw. Use the mongodb provider.`, { clientVersion: this._clientVersion });
        return this._createPrismaPromise((i) => this._request({ args: n, clientMethod: "$runCommandRaw", dataPath: [], action: "runCommandRaw", argsMapper: Dl, callsite: Xe(this._errorFormat), transaction: i }));
      }
      async $queryRawInternal(n, i, o, s) {
        let a = this._activeProvider;
        return this._request({ action: "queryRaw", args: o, transaction: n, clientMethod: i, argsMapper: vo({ clientMethod: i, activeProvider: a }), callsite: Xe(this._errorFormat), dataPath: [], middlewareArgsMapper: s });
      }
      $queryRaw(n, ...i) {
        return this._createPrismaPromise((o) => {
          if (n.raw !== void 0 || n.sql !== void 0) return this.$queryRawInternal(o, "$queryRaw", ...ou(n, i));
          throw new re("`$queryRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#queryraw\n", { clientVersion: this._clientVersion });
        });
      }
      $queryRawTyped(n) {
        return this._createPrismaPromise((i) => {
          if (!this._hasPreviewFlag("typedSql")) throw new re("`typedSql` preview feature must be enabled in order to access $queryRawTyped API", { clientVersion: this._clientVersion });
          return this.$queryRawInternal(i, "$queryRawTyped", n);
        });
      }
      $queryRawUnsafe(n, ...i) {
        return this._createPrismaPromise((o) => this.$queryRawInternal(o, "$queryRawUnsafe", [n, ...i]));
      }
      _transactionWithArray({ promises: n, options: i }) {
        let o = lf.nextId(), s = Ql(n.length), a = n.map((l, u) => {
          var _a2;
          if ((l == null ? void 0 : l[Symbol.toStringTag]) !== "PrismaPromise") throw new Error("All elements of the array need to be Prisma Client promises. Hint: Please make sure you are not awaiting the Prisma client calls you intended to pass in the $transaction function.");
          let c = (i == null ? void 0 : i.isolationLevel) ?? this._engineConfig.transactionOptions.isolationLevel, p = { kind: "batch", id: o, index: u, isolationLevel: c, lock: s };
          return ((_a2 = l.requestTransaction) == null ? void 0 : _a2.call(l, p)) ?? l;
        });
        return iu(a);
      }
      async _transactionWithCallback({ callback: n, options: i }) {
        let o = { traceparent: this._tracingHelper.getTraceParent() }, s = { maxWait: (i == null ? void 0 : i.maxWait) ?? this._engineConfig.transactionOptions.maxWait, timeout: (i == null ? void 0 : i.timeout) ?? this._engineConfig.transactionOptions.timeout, isolationLevel: (i == null ? void 0 : i.isolationLevel) ?? this._engineConfig.transactionOptions.isolationLevel }, a = await this._engine.transaction("start", o, s), l;
        try {
          let u = { kind: "itx", ...a };
          l = await n(this._createItxClient(u)), await this._engine.transaction("commit", o, a);
        } catch (u) {
          throw await this._engine.transaction("rollback", o, a).catch(() => {
          }), u;
        }
        return l;
      }
      _createItxClient(n) {
        return be(xr(be(Ga(this), [oe("_appliedParent", () => this._appliedParent._createItxClient(n)), oe("_createPrismaPromise", () => To(n)), oe(af, () => n.id)])), [Nt(Ya)]);
      }
      $transaction(n, i) {
        var _a2;
        let o;
        typeof n == "function" ? ((_a2 = this._engineConfig.adapter) == null ? void 0 : _a2.adapterName) === "@prisma/adapter-d1" ? o = () => {
          throw new Error("Cloudflare D1 does not support interactive transactions. We recommend you to refactor your queries with that limitation in mind, and use batch transactions with `prisma.$transactions([])` where applicable.");
        } : o = () => this._transactionWithCallback({ callback: n, options: i }) : o = () => this._transactionWithArray({ promises: n, options: i });
        let s = { name: "transaction", attributes: { method: "$transaction" } };
        return this._tracingHelper.runInChildSpan(s, o);
      }
      _request(n) {
        n.otelParentCtx = this._tracingHelper.getActiveContext();
        let i = n.middlewareArgsMapper ?? sf, o = { args: i.requestArgsToMiddlewareArgs(n.args), dataPath: n.dataPath, runInTransaction: !!n.transaction, action: n.action, model: n.model }, s = { middleware: { name: "middleware", middleware: true, attributes: { method: "$use" }, active: false }, operation: { name: "operation", attributes: { method: o.action, model: o.model, name: o.model ? `${o.model}.${o.action}` : o.action } } }, a = -1, l = async (u) => {
          let c = this._middlewares.get(++a);
          if (c) return this._tracingHelper.runInChildSpan(s.middleware, (O) => c(u, (T) => (O == null ? void 0 : O.end(), l(T))));
          let { runInTransaction: p, args: m, ...g } = u, h = { ...n, ...g };
          m && (h.args = i.middlewareArgsToRequestArgs(m)), n.transaction !== void 0 && p === false && delete h.transaction;
          let y = await el(this, h);
          return h.model ? Ka({ result: y, modelName: h.model, args: h.args, extensions: this._extensions, runtimeDataModel: this._runtimeDataModel, globalOmit: this._globalOmit }) : y;
        };
        return this._tracingHelper.runInChildSpan(s.operation, () => new au.AsyncResource("prisma-client-request").runInAsyncScope(() => l(o)));
      }
      async _executeRequest({ args: n, clientMethod: i, dataPath: o, callsite: s, action: a, model: l, argsMapper: u, transaction: c, unpacker: p, otelParentCtx: m, customDataProxyFetch: g }) {
        try {
          n = u ? u(n) : n;
          let h = { name: "serialize" }, y = this._tracingHelper.runInChildSpan(h, () => In({ modelName: l, runtimeDataModel: this._runtimeDataModel, action: a, args: n, clientMethod: i, callsite: s, extensions: this._extensions, errorFormat: this._errorFormat, clientVersion: this._clientVersion, previewFeatures: this._previewFeatures, globalOmit: this._globalOmit }));
          return M.enabled("prisma:client") && (rt("Prisma Client call:"), rt(`prisma.${i}(${Na(n)})`), rt("Generated request:"), rt(JSON.stringify(y, null, 2) + `
`)), (c == null ? void 0 : c.kind) === "batch" && await c.lock, this._requestHandler.request({ protocolQuery: y, modelName: l, action: a, clientMethod: i, dataPath: o, callsite: s, args: n, extensions: this._extensions, transaction: c, unpacker: p, otelParentCtx: m, otelChildCtx: this._tracingHelper.getActiveContext(), globalOmit: this._globalOmit, customDataProxyFetch: g });
        } catch (h) {
          throw h.clientVersion = this._clientVersion, h;
        }
      }
      _hasPreviewFlag(n) {
        var _a2;
        return !!((_a2 = this._engineConfig.previewFeatures) == null ? void 0 : _a2.includes(n));
      }
      $applyPendingMigrations() {
        return this._engine.applyPendingMigrations();
      }
    }
    return t;
  }
  function ou(e10, t) {
    return uf(e10) ? [new le(e10, t), Vl] : [e10, jl];
  }
  function uf(e10) {
    return Array.isArray(e10) && Array.isArray(e10.raw);
  }
  var cf = /* @__PURE__ */ new Set(["toJSON", "$$typeof", "asymmetricMatch", Symbol.iterator, Symbol.toStringTag, Symbol.isConcatSpreadable, Symbol.toPrimitive]);
  function pu(e10) {
    return new Proxy(e10, { get(t, r) {
      if (r in t) return t[r];
      if (!cf.has(r)) throw new TypeError(`Invalid enum value: ${String(r)}`);
    } });
  }
  function du(e10) {
    er(e10, { conflictCheck: "warn" });
  }
  /*! Bundled license information:
  
  	decimal.js/decimal.mjs:
  	  (*!
  	   *  decimal.js v10.5.0
  	   *  An arbitrary-precision Decimal type for JavaScript.
  	   *  https://github.com/MikeMcl/decimal.js
  	   *  Copyright (c) 2025 Michael Mclaughlin <M8ch88l@gmail.com>
  	   *  MIT Licence
  	   *)
  	*/
  return library;
}

var hasRequiredClient;
function requireClient() {
  if (hasRequiredClient) return client;
  hasRequiredClient = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    const {
      PrismaClientKnownRequestError,
      PrismaClientUnknownRequestError,
      PrismaClientRustPanicError,
      PrismaClientInitializationError,
      PrismaClientValidationError,
      getPrismaClient,
      sqltag,
      empty,
      join,
      raw,
      skip,
      Decimal,
      Debug,
      objectEnumValues,
      makeStrictEnum,
      Extensions,
      warnOnce,
      defineDmmfProperty,
      Public,
      getRuntime,
      createParam
    } = /* @__PURE__ */ requireLibrary();
    const Prisma = {};
    exports.Prisma = Prisma;
    exports.$Enums = {};
    Prisma.prismaVersion = {
      client: "6.5.0",
      engine: "173f8d54f8d52e692c7e27e72a88314ec7aeff60"
    };
    Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
    Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError;
    Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError;
    Prisma.PrismaClientInitializationError = PrismaClientInitializationError;
    Prisma.PrismaClientValidationError = PrismaClientValidationError;
    Prisma.Decimal = Decimal;
    Prisma.sql = sqltag;
    Prisma.empty = empty;
    Prisma.join = join;
    Prisma.raw = raw;
    Prisma.validator = Public.validator;
    Prisma.getExtensionContext = Extensions.getExtensionContext;
    Prisma.defineExtension = Extensions.defineExtension;
    Prisma.DbNull = objectEnumValues.instances.DbNull;
    Prisma.JsonNull = objectEnumValues.instances.JsonNull;
    Prisma.AnyNull = objectEnumValues.instances.AnyNull;
    Prisma.NullTypes = {
      DbNull: objectEnumValues.classes.DbNull,
      JsonNull: objectEnumValues.classes.JsonNull,
      AnyNull: objectEnumValues.classes.AnyNull
    };
    const path = require$$3;
    exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
      ReadUncommitted: "ReadUncommitted",
      ReadCommitted: "ReadCommitted",
      RepeatableRead: "RepeatableRead",
      Serializable: "Serializable"
    });
    exports.Prisma.TenantScalarFieldEnum = {
      id: "id",
      name: "name",
      domain: "domain",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.UserScalarFieldEnum = {
      id: "id",
      email: "email",
      password: "password",
      firstName: "firstName",
      lastName: "lastName",
      isActive: "isActive",
      roleId: "roleId",
      tenantId: "tenantId",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.ContactScalarFieldEnum = {
      id: "id",
      firstName: "firstName",
      lastName: "lastName",
      email: "email",
      phone: "phone",
      position: "position",
      statusId: "statusId",
      companyId: "companyId",
      assignedToId: "assignedToId",
      tenantId: "tenantId",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.CompanyScalarFieldEnum = {
      id: "id",
      name: "name",
      website: "website",
      industry: "industry",
      address: "address",
      city: "city",
      zipCode: "zipCode",
      country: "country",
      statusId: "statusId",
      assignedToId: "assignedToId",
      tenantId: "tenantId",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.NoteScalarFieldEnum = {
      id: "id",
      content: "content",
      contactId: "contactId",
      companyId: "companyId",
      createdById: "createdById",
      tenantId: "tenantId",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.RoleScalarFieldEnum = {
      id: "id",
      name: "name",
      permissions: "permissions",
      tenantId: "tenantId",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.StatusScalarFieldEnum = {
      id: "id",
      name: "name",
      type: "type",
      color: "color",
      order: "order",
      tenantId: "tenantId",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.SortOrder = {
      asc: "asc",
      desc: "desc"
    };
    exports.Prisma.NullableJsonNullValueInput = {
      DbNull: Prisma.DbNull,
      JsonNull: Prisma.JsonNull
    };
    exports.Prisma.QueryMode = {
      default: "default",
      insensitive: "insensitive"
    };
    exports.Prisma.NullsOrder = {
      first: "first",
      last: "last"
    };
    exports.Prisma.JsonNullValueFilter = {
      DbNull: Prisma.DbNull,
      JsonNull: Prisma.JsonNull,
      AnyNull: Prisma.AnyNull
    };
    exports.StatusType = exports.$Enums.StatusType = {
      CONTACT: "CONTACT",
      COMPANY: "COMPANY"
    };
    exports.Prisma.ModelName = {
      Tenant: "Tenant",
      User: "User",
      Contact: "Contact",
      Company: "Company",
      Note: "Note",
      Role: "Role",
      Status: "Status"
    };
    const config = {
      "generator": {
        "name": "client",
        "provider": {
          "fromEnvVar": null,
          "value": "prisma-client-js"
        },
        "output": {
          "value": "/home/franck/projects/perso/nuxt_crm/node_modules/@prisma/client",
          "fromEnvVar": null
        },
        "config": {
          "engineType": "library"
        },
        "binaryTargets": [
          {
            "fromEnvVar": null,
            "value": "debian-openssl-3.0.x",
            "native": true
          }
        ],
        "previewFeatures": [],
        "sourceFilePath": "/home/franck/projects/perso/nuxt_crm/prisma/schema.prisma"
      },
      "relativeEnvPaths": {
        "rootEnvPath": null
      },
      "relativePath": "../../../prisma",
      "clientVersion": "6.5.0",
      "engineVersion": "173f8d54f8d52e692c7e27e72a88314ec7aeff60",
      "datasourceNames": [
        "db"
      ],
      "activeProvider": "postgresql",
      "postinstall": false,
      "inlineDatasources": {
        "db": {
          "url": {
            "fromEnvVar": "DATABASE_URL",
            "value": null
          }
        }
      },
      "inlineSchema": '// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client-js"\n}\n\ndatasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}\n\nmodel Tenant {\n  id        String    @id @default(uuid())\n  name      String\n  domain    String?   @unique\n  createdAt DateTime  @default(now())\n  updatedAt DateTime  @updatedAt\n  users     User[]\n  contacts  Contact[]\n  companies Company[]\n  notes     Note[]\n  roles     Role[]\n  statuses  Status[]\n}\n\nmodel User {\n  id        String   @id @default(uuid())\n  email     String\n  password  String\n  firstName String\n  lastName  String\n  isActive  Boolean  @default(true)\n  roleId    String\n  tenantId  String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  role   Role   @relation(fields: [roleId], references: [id])\n  tenant Tenant @relation(fields: [tenantId], references: [id])\n\n  contacts  Contact[]\n  companies Company[]\n  notes     Note[]\n\n  @@unique([email, tenantId])\n}\n\nmodel Contact {\n  id           String   @id @default(uuid())\n  firstName    String\n  lastName     String\n  email        String?\n  phone        String?\n  position     String?\n  statusId     String\n  companyId    String?\n  assignedToId String?\n  tenantId     String\n  createdAt    DateTime @default(now())\n  updatedAt    DateTime @updatedAt\n\n  status     Status   @relation(fields: [statusId], references: [id])\n  company    Company? @relation(fields: [companyId], references: [id])\n  assignedTo User?    @relation(fields: [assignedToId], references: [id])\n  tenant     Tenant   @relation(fields: [tenantId], references: [id])\n\n  notes Note[]\n}\n\nmodel Company {\n  id           String   @id @default(uuid())\n  name         String\n  website      String?\n  industry     String?\n  address      String?\n  city         String?\n  zipCode      String?\n  country      String?\n  statusId     String\n  assignedToId String?\n  tenantId     String\n  createdAt    DateTime @default(now())\n  updatedAt    DateTime @updatedAt\n\n  status     Status @relation(fields: [statusId], references: [id])\n  assignedTo User?  @relation(fields: [assignedToId], references: [id])\n  tenant     Tenant @relation(fields: [tenantId], references: [id])\n\n  contacts Contact[]\n  notes    Note[]\n}\n\nmodel Note {\n  id          String   @id @default(uuid())\n  content     String\n  contactId   String?\n  companyId   String?\n  createdById String\n  tenantId    String\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n\n  contact   Contact? @relation(fields: [contactId], references: [id])\n  company   Company? @relation(fields: [companyId], references: [id])\n  createdBy User     @relation(fields: [createdById], references: [id])\n  tenant    Tenant   @relation(fields: [tenantId], references: [id])\n}\n\nmodel Role {\n  id          String   @id @default(uuid())\n  name        String\n  permissions Json? // stocké comme un tableau JSON de permissions\n  tenantId    String\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n\n  tenant Tenant @relation(fields: [tenantId], references: [id])\n  users  User[]\n\n  @@unique([name, tenantId])\n}\n\nmodel Status {\n  id        String     @id @default(uuid())\n  name      String\n  type      StatusType // CONTACT ou COMPANY\n  color     String?\n  order     Int        @default(0)\n  tenantId  String\n  createdAt DateTime   @default(now())\n  updatedAt DateTime   @updatedAt\n\n  tenant    Tenant    @relation(fields: [tenantId], references: [id])\n  contacts  Contact[]\n  companies Company[]\n\n  @@unique([name, type, tenantId])\n}\n\nenum StatusType {\n  CONTACT\n  COMPANY\n}\n',
      "inlineSchemaHash": "720525eb403eea0ba34d9067acf6f4c855c761229af9293207d7a5518efa40ff",
      "copyEngine": true
    };
    const fs = require$$2;
    config.dirname = globalThis._importMeta_.url;
    if (!fs.existsSync(path.join(globalThis._importMeta_.url, "schema.prisma"))) {
      const alternativePaths = [
        "node_modules/.prisma/client",
        ".prisma/client"
      ];
      const alternativePath = alternativePaths.find((altPath) => {
        return fs.existsSync(path.join(process.cwd(), altPath, "schema.prisma"));
      }) ?? alternativePaths[0];
      config.dirname = path.join(process.cwd(), alternativePath);
      config.isBundled = true;
    }
    config.runtimeDataModel = JSON.parse('{"models":{"Tenant":{"dbName":null,"schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"domain","kind":"scalar","isList":false,"isRequired":false,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"users","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"TenantToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"contacts","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Contact","nativeType":null,"relationName":"ContactToTenant","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"companies","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Company","nativeType":null,"relationName":"CompanyToTenant","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"notes","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Note","nativeType":null,"relationName":"NoteToTenant","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"roles","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Role","nativeType":null,"relationName":"RoleToTenant","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"statuses","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Status","nativeType":null,"relationName":"StatusToTenant","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"User":{"dbName":null,"schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"email","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"password","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"firstName","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"lastName","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"isActive","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","nativeType":null,"default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"roleId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"tenantId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"role","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Role","nativeType":null,"relationName":"RoleToUser","relationFromFields":["roleId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false},{"name":"tenant","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Tenant","nativeType":null,"relationName":"TenantToUser","relationFromFields":["tenantId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false},{"name":"contacts","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Contact","nativeType":null,"relationName":"ContactToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"companies","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Company","nativeType":null,"relationName":"CompanyToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"notes","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Note","nativeType":null,"relationName":"NoteToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[["email","tenantId"]],"uniqueIndexes":[{"name":null,"fields":["email","tenantId"]}],"isGenerated":false},"Contact":{"dbName":null,"schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"firstName","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"lastName","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"email","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"phone","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"position","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"statusId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"companyId","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"assignedToId","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"tenantId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"status","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Status","nativeType":null,"relationName":"ContactToStatus","relationFromFields":["statusId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false},{"name":"company","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Company","nativeType":null,"relationName":"CompanyToContact","relationFromFields":["companyId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false},{"name":"assignedTo","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"ContactToUser","relationFromFields":["assignedToId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false},{"name":"tenant","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Tenant","nativeType":null,"relationName":"ContactToTenant","relationFromFields":["tenantId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false},{"name":"notes","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Note","nativeType":null,"relationName":"ContactToNote","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Company":{"dbName":null,"schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"website","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"industry","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"address","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"city","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"zipCode","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"country","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"statusId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"assignedToId","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"tenantId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"status","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Status","nativeType":null,"relationName":"CompanyToStatus","relationFromFields":["statusId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false},{"name":"assignedTo","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"CompanyToUser","relationFromFields":["assignedToId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false},{"name":"tenant","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Tenant","nativeType":null,"relationName":"CompanyToTenant","relationFromFields":["tenantId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false},{"name":"contacts","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Contact","nativeType":null,"relationName":"CompanyToContact","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"notes","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Note","nativeType":null,"relationName":"CompanyToNote","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Note":{"dbName":null,"schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"content","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"contactId","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"companyId","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdById","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"tenantId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"contact","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Contact","nativeType":null,"relationName":"ContactToNote","relationFromFields":["contactId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false},{"name":"company","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Company","nativeType":null,"relationName":"CompanyToNote","relationFromFields":["companyId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false},{"name":"createdBy","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"NoteToUser","relationFromFields":["createdById"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false},{"name":"tenant","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Tenant","nativeType":null,"relationName":"NoteToTenant","relationFromFields":["tenantId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Role":{"dbName":null,"schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"permissions","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Json","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"tenantId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"tenant","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Tenant","nativeType":null,"relationName":"RoleToTenant","relationFromFields":["tenantId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false},{"name":"users","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"RoleToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[["name","tenantId"]],"uniqueIndexes":[{"name":null,"fields":["name","tenantId"]}],"isGenerated":false},"Status":{"dbName":null,"schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"type","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"StatusType","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"color","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"order","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"tenantId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"tenant","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Tenant","nativeType":null,"relationName":"StatusToTenant","relationFromFields":["tenantId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false},{"name":"contacts","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Contact","nativeType":null,"relationName":"ContactToStatus","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"companies","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Company","nativeType":null,"relationName":"CompanyToStatus","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[["name","type","tenantId"]],"uniqueIndexes":[{"name":null,"fields":["name","type","tenantId"]}],"isGenerated":false}},"enums":{"StatusType":{"values":[{"name":"CONTACT","dbName":null},{"name":"COMPANY","dbName":null}],"dbName":null}},"types":{}}');
    defineDmmfProperty(exports.Prisma, config.runtimeDataModel);
    config.engineWasm = void 0;
    config.compilerWasm = void 0;
    const { warnEnvConflicts } = /* @__PURE__ */ requireLibrary();
    warnEnvConflicts({
      rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.rootEnvPath),
      schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.schemaEnvPath)
    });
    const PrismaClient = getPrismaClient(config);
    exports.PrismaClient = PrismaClient;
    Object.assign(exports, Prisma);
    path.join(globalThis._importMeta_.url, "libquery_engine-debian-openssl-3.0.x.so.node");
    path.join(process.cwd(), "node_modules/.prisma/client/libquery_engine-debian-openssl-3.0.x.so.node");
    path.join(globalThis._importMeta_.url, "schema.prisma");
    path.join(process.cwd(), "node_modules/.prisma/client/schema.prisma");
  })(client);
  return client;
}

var _default;
var hasRequired_default;
function require_default() {
  if (hasRequired_default) return _default;
  hasRequired_default = 1;
  _default = {
    ...requireClient()
  };
  return _default;
}

var _defaultExports = /* @__PURE__ */ require_default();

const prismaClientSingleton = () => {
  return new _defaultExports.PrismaClient();
};
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

const plugin_9RP0IG4IZsdQGtc6t7gn_tuFRgHqjDGAVBd8w_WCy6s = defineNuxtPlugin({
  name: "prisma-client",
  enforce: "pre",
  async setup() {
    return {
      provide: {
        prisma
      }
    };
  },
  env: {
    islands: true
  }
});

function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext._payloadReducers[name] = reduce;
  }
}

const reducers = [
  ["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
  ["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
  ["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
  ["Ref", (data) => isRef(data) && data.value],
  ["Reactive", (data) => isReactive(data) && toRaw(data)]
];
{
  reducers.push(["Island", (data) => data && (data == null ? void 0 : data.__nuxt_island)]);
}
const revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms = defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const [reducer, fn] of reducers) {
      definePayloadReducer(reducer, fn);
    }
  }
});

const LazyIcon = defineAsyncComponent(() => Promise.resolve().then(function () { return index2; }).then((r) => r["default"] || r.default || r));

const lazyGlobalComponents = [
  ["Icon", LazyIcon]
];
const components_plugin_z4hgvsiddfKkfXTP6M8M4zG5Cb7sGnDhcryKVM45Di4 = defineNuxtPlugin({
  name: "nuxt:global-components",
  setup(nuxtApp) {
    for (const [name, component] of lazyGlobalComponents) {
      nuxtApp.vueApp.component(name, component);
      nuxtApp.vueApp.component("Lazy" + name, component);
    }
  }
});

const inlineConfig = {
  "nuxt": {},
  "icon": {
    "provider": "server",
    "class": "",
    "aliases": {},
    "iconifyApiEndpoint": "https://api.iconify.design",
    "localApiEndpoint": "/api/_nuxt_icon",
    "fallbackToApi": true,
    "cssSelectorPrefix": "i-",
    "cssWherePseudo": true,
    "mode": "css",
    "attrs": {
      "aria-hidden": true
    },
    "collections": [
      "academicons",
      "akar-icons",
      "ant-design",
      "arcticons",
      "basil",
      "bi",
      "bitcoin-icons",
      "bpmn",
      "brandico",
      "bx",
      "bxl",
      "bxs",
      "bytesize",
      "carbon",
      "catppuccin",
      "cbi",
      "charm",
      "ci",
      "cib",
      "cif",
      "cil",
      "circle-flags",
      "circum",
      "clarity",
      "codicon",
      "covid",
      "cryptocurrency",
      "cryptocurrency-color",
      "dashicons",
      "devicon",
      "devicon-plain",
      "ei",
      "el",
      "emojione",
      "emojione-monotone",
      "emojione-v1",
      "entypo",
      "entypo-social",
      "eos-icons",
      "ep",
      "et",
      "eva",
      "f7",
      "fa",
      "fa-brands",
      "fa-regular",
      "fa-solid",
      "fa6-brands",
      "fa6-regular",
      "fa6-solid",
      "fad",
      "fe",
      "feather",
      "file-icons",
      "flag",
      "flagpack",
      "flat-color-icons",
      "flat-ui",
      "flowbite",
      "fluent",
      "fluent-emoji",
      "fluent-emoji-flat",
      "fluent-emoji-high-contrast",
      "fluent-mdl2",
      "fontelico",
      "fontisto",
      "formkit",
      "foundation",
      "fxemoji",
      "gala",
      "game-icons",
      "geo",
      "gg",
      "gis",
      "gravity-ui",
      "gridicons",
      "grommet-icons",
      "guidance",
      "healthicons",
      "heroicons",
      "heroicons-outline",
      "heroicons-solid",
      "hugeicons",
      "humbleicons",
      "ic",
      "icomoon-free",
      "icon-park",
      "icon-park-outline",
      "icon-park-solid",
      "icon-park-twotone",
      "iconamoon",
      "iconoir",
      "icons8",
      "il",
      "ion",
      "iwwa",
      "jam",
      "la",
      "lets-icons",
      "line-md",
      "logos",
      "ls",
      "lucide",
      "lucide-lab",
      "mage",
      "majesticons",
      "maki",
      "map",
      "marketeq",
      "material-symbols",
      "material-symbols-light",
      "mdi",
      "mdi-light",
      "medical-icon",
      "memory",
      "meteocons",
      "mi",
      "mingcute",
      "mono-icons",
      "mynaui",
      "nimbus",
      "nonicons",
      "noto",
      "noto-v1",
      "octicon",
      "oi",
      "ooui",
      "openmoji",
      "oui",
      "pajamas",
      "pepicons",
      "pepicons-pencil",
      "pepicons-pop",
      "pepicons-print",
      "ph",
      "pixelarticons",
      "prime",
      "ps",
      "quill",
      "radix-icons",
      "raphael",
      "ri",
      "rivet-icons",
      "si-glyph",
      "simple-icons",
      "simple-line-icons",
      "skill-icons",
      "solar",
      "streamline",
      "streamline-emojis",
      "subway",
      "svg-spinners",
      "system-uicons",
      "tabler",
      "tdesign",
      "teenyicons",
      "token",
      "token-branded",
      "topcoat",
      "twemoji",
      "typcn",
      "uil",
      "uim",
      "uis",
      "uit",
      "uiw",
      "unjs",
      "vaadin",
      "vs",
      "vscode-icons",
      "websymbol",
      "weui",
      "whh",
      "wi",
      "wpf",
      "zmdi",
      "zondicons"
    ],
    "fetchTimeout": 1500
  },
  "ui": {
    "colors": {
      "primary": "green",
      "secondary": "blue",
      "success": "green",
      "info": "blue",
      "warning": "yellow",
      "error": "red",
      "neutral": "slate"
    },
    "icons": {
      "arrowLeft": "i-lucide-arrow-left",
      "arrowRight": "i-lucide-arrow-right",
      "check": "i-lucide-check",
      "chevronDoubleLeft": "i-lucide-chevrons-left",
      "chevronDoubleRight": "i-lucide-chevrons-right",
      "chevronDown": "i-lucide-chevron-down",
      "chevronLeft": "i-lucide-chevron-left",
      "chevronRight": "i-lucide-chevron-right",
      "chevronUp": "i-lucide-chevron-up",
      "close": "i-lucide-x",
      "ellipsis": "i-lucide-ellipsis",
      "external": "i-lucide-arrow-up-right",
      "folder": "i-lucide-folder",
      "folderOpen": "i-lucide-folder-open",
      "loading": "i-lucide-refresh-cw",
      "minus": "i-lucide-minus",
      "plus": "i-lucide-plus",
      "search": "i-lucide-search"
    }
  }
};
const _appConfig = /* @__PURE__ */ defuFn(inlineConfig);

function useAppConfig() {
  const nuxtApp = useNuxtApp();
  nuxtApp._appConfig || (nuxtApp._appConfig = klona(_appConfig));
  return nuxtApp._appConfig;
}

function injectHead(nuxtApp) {
  var _a;
  const nuxt = nuxtApp || tryUseNuxtApp();
  return ((_a = nuxt == null ? void 0 : nuxt.ssrContext) == null ? void 0 : _a.head) || (nuxt == null ? void 0 : nuxt.runWithContext(() => {
    if (hasInjectionContext()) {
      return inject(headSymbol);
    }
  }));
}
function useHead(input, options = {}) {
  const head = injectHead(options.nuxt);
  if (head) {
    return useHead$1(input, { head, ...options });
  }
}

const colors_E7kSti5pGZ28QhUUurq6gGRU3l65WuXO_KJC3GQgzFo = defineNuxtPlugin(() => {
  const appConfig = useAppConfig();
  const nuxtApp = useNuxtApp();
  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  function generateShades(key, value) {
    return `${shades.map((shade) => `--ui-color-${key}-${shade}: var(--color-${value === "neutral" ? "old-neutral" : value}-${shade});`).join("\n  ")}`;
  }
  function generateColor(key, shade) {
    return `--ui-${key}: var(--ui-color-${key}-${shade});`;
  }
  const root = computed(() => {
    const { neutral, ...colors } = appConfig.ui.colors;
    return `@layer base {
  :root {
  ${Object.entries(appConfig.ui.colors).map(([key, value]) => generateShades(key, value)).join("\n  ")}
  }
  :root, .light {
  ${Object.keys(colors).map((key) => generateColor(key, 500)).join("\n  ")}
  }
  .dark {
  ${Object.keys(colors).map((key) => generateColor(key, 400)).join("\n  ")}
  }
}`;
  });
  const headData = {
    style: [{
      innerHTML: () => root.value,
      tagPriority: -2,
      id: "nuxt-ui-colors",
      type: "text/css"
    }]
  };
  if (!nuxtApp.isVue) {
    useHead(headData);
  }
});

const preference = "system";

const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = useNuxtApp();
  const state = toRef(nuxtApp.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}

const plugin_server_9Ca9_HhnjAGwBWpwAydRauMHxWoxTDY60BrArRnXN_A = defineNuxtPlugin((nuxtApp) => {
  var _a;
  const colorMode = ((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext) ? ref({}) : useState("color-mode", () => reactive({
    preference,
    value: preference,
    unknown: true,
    forced: false
  })).value;
  const htmlAttrs = {};
  {
    useHead({ htmlAttrs });
  }
  useRouter().afterEach((to) => {
    const forcedColorMode = to.meta.colorMode;
    if (forcedColorMode && forcedColorMode !== "system") {
      colorMode.value = htmlAttrs["data-color-mode-forced"] = forcedColorMode;
      colorMode.forced = true;
    } else if (forcedColorMode === "system") {
      console.warn("You cannot force the colorMode to system at the page level.");
    }
  });
  nuxtApp.provide("colorMode", colorMode);
});

const plugin_MeUvTuoKUi51yb_kBguab6hdcExVXeTtZtTg9TZZBB8 = defineNuxtPlugin({
  name: "@nuxt/icon",
  setup() {
    var _a, _b;
    const configs = useRuntimeConfig();
    const options = useAppConfig().icon;
    _api.setFetch($fetch.native);
    const resources = [];
    if (options.provider === "server") {
      const baseURL = ((_b = (_a = configs.app) == null ? void 0 : _a.baseURL) == null ? void 0 : _b.replace(/\/$/, "")) ?? "";
      resources.push(baseURL + (options.localApiEndpoint || "/api/_nuxt_icon"));
      if (options.fallbackToApi === true || options.fallbackToApi === "client-only") {
        resources.push(options.iconifyApiEndpoint);
      }
    } else {
      resources.push(options.iconifyApiEndpoint);
    }
    async function customIconLoader(icons, prefix) {
      try {
        const data = await $fetch(resources[0] + "/" + prefix + ".json", {
          query: {
            icons: icons.join(",")
          }
        });
        if (!data || data.prefix !== prefix || !data.icons)
          throw new Error("Invalid data" + JSON.stringify(data));
        return data;
      } catch (e) {
        console.error("Failed to load custom icons", e);
        return null;
      }
    }
    addAPIProvider("", { resources });
    for (const prefix of options.customCollections || []) {
      if (prefix)
        setCustomIconsLoader(customIconLoader, prefix);
    }
  }
  // For type portability
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
});

const plugins = [
  unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU,
  plugin,
  plugin_9RP0IG4IZsdQGtc6t7gn_tuFRgHqjDGAVBd8w_WCy6s,
  revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms,
  components_plugin_z4hgvsiddfKkfXTP6M8M4zG5Cb7sGnDhcryKVM45Di4,
  colors_E7kSti5pGZ28QhUUurq6gGRU3l65WuXO_KJC3GQgzFo,
  plugin_server_9Ca9_HhnjAGwBWpwAydRauMHxWoxTDY60BrArRnXN_A,
  plugin_MeUvTuoKUi51yb_kBguab6hdcExVXeTtZtTg9TZZBB8
];

function diff(obj1, obj2) {
  const h1 = _toHashedObject(obj1);
  const h2 = _toHashedObject(obj2);
  return _diff(h1, h2);
}
function _diff(h1, h2) {
  const diffs = [];
  const allProps = /* @__PURE__ */ new Set([
    ...Object.keys(h1.props || {}),
    ...Object.keys(h2.props || {})
  ]);
  if (h1.props && h2.props) {
    for (const prop of allProps) {
      const p1 = h1.props[prop];
      const p2 = h2.props[prop];
      if (p1 && p2) {
        diffs.push(..._diff(h1.props?.[prop], h2.props?.[prop]));
      } else if (p1 || p2) {
        diffs.push(
          new DiffEntry((p2 || p1).key, p1 ? "removed" : "added", p2, p1)
        );
      }
    }
  }
  if (allProps.size === 0 && h1.hash !== h2.hash) {
    diffs.push(new DiffEntry((h2 || h1).key, "changed", h2, h1));
  }
  return diffs;
}
function _toHashedObject(obj, key = "") {
  if (obj && typeof obj !== "object") {
    return new DiffHashedObject(key, obj, serialize(obj));
  }
  const props = {};
  const hashes = [];
  for (const _key in obj) {
    props[_key] = _toHashedObject(obj[_key], key ? `${key}.${_key}` : _key);
    hashes.push(props[_key].hash);
  }
  return new DiffHashedObject(key, obj, `{${hashes.join(":")}}`, props);
}
class DiffEntry {
  constructor(key, type, newValue, oldValue) {
    this.key = key;
    this.type = type;
    this.newValue = newValue;
    this.oldValue = oldValue;
  }
  toString() {
    return this.toJSON();
  }
  toJSON() {
    switch (this.type) {
      case "added": {
        return `Added   \`${this.key}\``;
      }
      case "removed": {
        return `Removed \`${this.key}\``;
      }
      case "changed": {
        return `Changed \`${this.key}\` from \`${this.oldValue?.toString() || "-"}\` to \`${this.newValue.toString()}\``;
      }
    }
  }
}
class DiffHashedObject {
  constructor(key, value, hash, props) {
    this.key = key;
    this.value = value;
    this.hash = hash;
    this.props = props;
  }
  toString() {
    if (this.props) {
      return `{${Object.keys(this.props).join(",")}}`;
    } else {
      return JSON.stringify(this.value);
    }
  }
  toJSON() {
    const k = this.key || ".";
    if (this.props) {
      return `${k}({${Object.keys(this.props).join(",")}})`;
    }
    return `${k}(${this.value})`;
  }
}

function omit(data, keys) {
  const result = { ...data };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}
function get(object, path, defaultValue) {
  if (typeof path === "string") {
    path = path.split(".").map((key) => {
      const numKey = Number(key);
      return Number.isNaN(numKey) ? key : numKey;
    });
  }
  let result = object;
  for (const key of path) {
    if (result === void 0 || result === null) {
      return defaultValue;
    }
    result = result[key];
  }
  return result !== void 0 ? result : defaultValue;
}
function looseToNumber(val) {
  const n = Number.parseFloat(val);
  return Number.isNaN(n) ? val : n;
}
function compare(value, currentValue, comparator) {
  if (value === void 0 || currentValue === void 0) {
    return false;
  }
  if (typeof value === "string") {
    return value === currentValue;
  }
  return isEqual(value, currentValue);
}

function buildTranslator(locale) {
  return (path, option) => translate(path, option, unref(locale));
}
function translate(path, option, locale) {
  const prop = get(locale, `messages.${path}`, path);
  return prop.replace(
    /\{(\w+)\}/g,
    (_, key) => `${(option == null ? void 0 : option[key]) ?? `{${key}}`}`
  );
}
function buildLocaleContext(locale) {
  const lang = computed(() => unref(locale).name);
  const code = computed(() => unref(locale).code);
  const dir = computed(() => unref(locale).dir);
  const localeRef = isRef(locale) ? locale : ref(locale);
  return {
    lang,
    code,
    dir,
    locale: localeRef,
    t: buildTranslator(locale)
  };
}

function defineLocale(options) {
  return defu(options, { dir: "ltr" });
}

const en = defineLocale({
  name: "English",
  code: "en",
  messages: {
    inputMenu: {
      noMatch: "No matching data",
      noData: "No data",
      create: 'Create "{label}"'
    },
    calendar: {
      prevYear: "Previous year",
      nextYear: "Next year",
      prevMonth: "Previous month",
      nextMonth: "Next month"
    },
    inputNumber: {
      increment: "Increment",
      decrement: "Decrement"
    },
    commandPalette: {
      placeholder: "Type a command or search...",
      noMatch: "No matching data",
      noData: "No data",
      close: "Close"
    },
    selectMenu: {
      noMatch: "No matching data",
      noData: "No data",
      create: 'Create "{label}"',
      search: "Search..."
    },
    toast: {
      close: "Close"
    },
    carousel: {
      prev: "Prev",
      next: "Next",
      goto: "Go to slide {slide}"
    },
    modal: {
      close: "Close"
    },
    slideover: {
      close: "Close"
    },
    alert: {
      close: "Close"
    },
    table: {
      noData: "No data"
    }
  }
});

const localeContextInjectionKey = Symbol("nuxt-ui.locale-context");
const _useLocale = (localeOverrides) => {
  const locale = localeOverrides || toRef(inject(localeContextInjectionKey));
  return buildLocaleContext(computed(() => locale.value || en));
};
const useLocale = createSharedComposable(_useLocale);

function useToast() {
  const toasts = useState("toasts", () => []);
  const running = ref(false);
  const queue = [];
  const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  async function processQueue() {
    if (running.value || queue.length === 0) {
      return;
    }
    running.value = true;
    while (queue.length > 0) {
      const toast = queue.shift();
      await nextTick();
      toasts.value = [...toasts.value, toast].slice(-5);
    }
    running.value = false;
  }
  function add(toast) {
    const body = {
      id: generateId(),
      open: true,
      ...toast
    };
    queue.push(body);
    processQueue();
    return body;
  }
  function update(id, toast) {
    const index = toasts.value.findIndex((t) => t.id === id);
    if (index !== -1) {
      toasts.value[index] = {
        ...toasts.value[index],
        ...toast
      };
    }
  }
  function remove(id) {
    const index = toasts.value.findIndex((t) => t.id === id);
    if (index !== -1) {
      toasts.value[index] = {
        ...toasts.value[index],
        open: false
      };
    }
    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id);
    }, 200);
  }
  function clear() {
    toasts.value = [];
  }
  return {
    toasts,
    add,
    update,
    remove,
    clear
  };
}

async function loadIcon(name, timeout) {
  if (!name)
    return null;
  const _icon = getIcon(name);
  if (_icon)
    return _icon;
  let timeoutWarn;
  const load = loadIcon$1(name).catch(() => {
    console.warn(`[Icon] failed to load icon \`${name}\``);
    return null;
  });
  if (timeout > 0)
    await Promise.race([
      load,
      new Promise((resolve) => {
        timeoutWarn = setTimeout(() => {
          console.warn(`[Icon] loading icon \`${name}\` timed out after ${timeout}ms`);
          resolve();
        }, timeout);
      })
    ]).finally(() => clearTimeout(timeoutWarn));
  else
    await load;
  return getIcon(name);
}
function useResolvedName(getName) {
  const options = useAppConfig().icon;
  const collections = (options.collections || []).sort((a, b) => b.length - a.length);
  return computed(() => {
    var _a;
    const name = getName();
    const bare = name.startsWith(options.cssSelectorPrefix) ? name.slice(options.cssSelectorPrefix.length) : name;
    const resolved = ((_a = options.aliases) == null ? void 0 : _a[bare]) || bare;
    if (!resolved.includes(":")) {
      const collection = collections.find((c) => resolved.startsWith(c + "-"));
      return collection ? collection + ":" + resolved.slice(collection.length + 1) : resolved;
    }
    return resolved;
  });
}

const SYMBOL_SERVER_CSS = "NUXT_ICONS_SERVER_CSS";
function escapeCssSelector(selector) {
  return selector.replace(/([^\w-])/g, "\\$1");
}
const NuxtIconCss = /* @__PURE__ */ defineComponent({
  name: "NuxtIconCss",
  props: {
    name: {
      type: String,
      required: true
    },
    customize: {
      type: Function,
      required: false
    }
  },
  setup(props) {
    const nuxt = useNuxtApp();
    const options = useAppConfig().icon;
    const cssClass = computed(() => props.name ? options.cssSelectorPrefix + props.name : "");
    const selector = computed(() => "." + escapeCssSelector(cssClass.value));
    function getCSS(icon, withLayer = true) {
      let iconSelector = selector.value;
      if (options.cssWherePseudo) {
        iconSelector = `:where(${iconSelector})`;
      }
      const css = getIconCSS(icon, {
        iconSelector,
        format: "compressed",
        customise: props.customize ?? options.customize
      });
      if (options.cssLayer && withLayer) {
        return `@layer ${options.cssLayer} { ${css} }`;
      }
      return css;
    }
    onServerPrefetch(async () => {
      var _a;
      {
        const configs = useRuntimeConfig().icon || {};
        if (!((_a = configs == null ? void 0 : configs.serverKnownCssClasses) == null ? void 0 : _a.includes(cssClass.value))) {
          const icon = await loadIcon(props.name, options.fetchTimeout).catch(() => null);
          if (!icon)
            return null;
          let ssrCSS = nuxt.vueApp._context.provides[SYMBOL_SERVER_CSS];
          if (!ssrCSS) {
            ssrCSS = nuxt.vueApp._context.provides[SYMBOL_SERVER_CSS] = /* @__PURE__ */ new Map();
            nuxt.runWithContext(() => {
              useHead({
                style: [
                  () => {
                    const sep = "";
                    let css = Array.from(ssrCSS.values()).sort().join(sep);
                    if (options.cssLayer) {
                      css = `@layer ${options.cssLayer} {${sep}${css}${sep}}`;
                    }
                    return { innerHTML: css };
                  }
                ]
              }, {
                tagPriority: "low"
              });
            });
          }
          if (props.name && !ssrCSS.has(props.name)) {
            const css = getCSS(icon, false);
            ssrCSS.set(props.name, css);
          }
          return null;
        }
      }
    });
    return () => h("span", { class: ["iconify", cssClass.value] });
  }
});

const isDefer = (dedupe) => dedupe === "defer" || dedupe === false;
function useAsyncData(...args) {
  var _b;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, _handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof _handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  const nuxtApp = useNuxtApp();
  const handler = _handler ;
  const getDefault = () => asyncDataDefaults.value;
  const getDefaultCachedData = () => nuxtApp.isHydrating ? nuxtApp.payload.data[key] : nuxtApp.static.data[key];
  options.server ?? (options.server = true);
  options.default ?? (options.default = getDefault);
  options.getCachedData ?? (options.getCachedData = getDefaultCachedData);
  options.lazy ?? (options.lazy = false);
  options.immediate ?? (options.immediate = true);
  options.deep ?? (options.deep = asyncDataDefaults.deep);
  options.dedupe ?? (options.dedupe = "cancel");
  const initialCachedData = options.getCachedData(key, nuxtApp);
  const hasCachedData = initialCachedData != null;
  if (!nuxtApp._asyncData[key] || !options.immediate) {
    (_b = nuxtApp.payload._errors)[key] ?? (_b[key] = asyncDataDefaults.errorValue);
    const _ref = options.deep ? ref : shallowRef;
    nuxtApp._asyncData[key] = {
      data: _ref(hasCachedData ? initialCachedData : options.default()),
      pending: ref(!hasCachedData),
      error: toRef(nuxtApp.payload._errors, key),
      status: ref("idle"),
      _default: options.default
    };
  }
  const asyncData = { ...nuxtApp._asyncData[key] };
  delete asyncData._default;
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    if (nuxtApp._asyncDataPromises[key]) {
      if (isDefer(opts.dedupe ?? options.dedupe)) {
        return nuxtApp._asyncDataPromises[key];
      }
      nuxtApp._asyncDataPromises[key].cancelled = true;
    }
    if (opts._initial || nuxtApp.isHydrating && opts._initial !== false) {
      const cachedData = opts._initial ? initialCachedData : options.getCachedData(key, nuxtApp);
      if (cachedData != null) {
        return Promise.resolve(cachedData);
      }
    }
    asyncData.pending.value = true;
    asyncData.status.value = "pending";
    const promise = new Promise(
      (resolve, reject) => {
        try {
          resolve(handler(nuxtApp));
        } catch (err) {
          reject(err);
        }
      }
    ).then(async (_result) => {
      if (promise.cancelled) {
        return nuxtApp._asyncDataPromises[key];
      }
      let result = _result;
      if (options.transform) {
        result = await options.transform(_result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      nuxtApp.payload.data[key] = result;
      asyncData.data.value = result;
      asyncData.error.value = asyncDataDefaults.errorValue;
      asyncData.status.value = "success";
    }).catch((error) => {
      if (promise.cancelled) {
        return nuxtApp._asyncDataPromises[key];
      }
      asyncData.error.value = createError(error);
      asyncData.data.value = unref(options.default());
      asyncData.status.value = "error";
    }).finally(() => {
      if (promise.cancelled) {
        return;
      }
      asyncData.pending.value = false;
      delete nuxtApp._asyncDataPromises[key];
    });
    nuxtApp._asyncDataPromises[key] = promise;
    return nuxtApp._asyncDataPromises[key];
  };
  asyncData.clear = () => clearNuxtDataByKey(nuxtApp, key);
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxtApp.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxtApp.hook("app:created", async () => {
        await promise;
      });
    }
  }
  const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function clearNuxtDataByKey(nuxtApp, key) {
  if (key in nuxtApp.payload.data) {
    nuxtApp.payload.data[key] = void 0;
  }
  if (key in nuxtApp.payload._errors) {
    nuxtApp.payload._errors[key] = asyncDataDefaults.errorValue;
  }
  if (nuxtApp._asyncData[key]) {
    nuxtApp._asyncData[key].data.value = void 0;
    nuxtApp._asyncData[key].error.value = asyncDataDefaults.errorValue;
    nuxtApp._asyncData[key].pending.value = false;
    nuxtApp._asyncData[key].status.value = "idle";
  }
  if (key in nuxtApp._asyncDataPromises) {
    if (nuxtApp._asyncDataPromises[key]) {
      nuxtApp._asyncDataPromises[key].cancelled = true;
    }
    nuxtApp._asyncDataPromises[key] = void 0;
  }
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}

const NuxtIconSvg = /* @__PURE__ */ defineComponent({
  name: "NuxtIconSvg",
  props: {
    name: {
      type: String,
      required: true
    },
    customize: {
      type: Function,
      required: false
    }
  },
  setup(props, { slots }) {
    useNuxtApp();
    const options = useAppConfig().icon;
    const name = useResolvedName(() => props.name);
    const storeKey = "i-" + name.value;
    if (name.value) {
      {
        useAsyncData(
          storeKey,
          () => loadIcon(name.value, options.fetchTimeout),
          { deep: false }
        );
      }
    }
    return () => h(Icon, {
      icon: name.value,
      ssr: true,
      // Iconify uses `customise`, where we expose `customize` for consistency
      customise: props.customize ?? options.customize
    }, slots);
  }
});

const __nuxt_component_0$1 = defineComponent({
  name: "NuxtIcon",
  props: {
    name: {
      type: String,
      required: true
    },
    mode: {
      type: String,
      required: false,
      default: null
    },
    size: {
      type: [Number, String],
      required: false,
      default: null
    },
    customize: {
      type: Function,
      required: false
    }
  },
  setup(props, { slots }) {
    const nuxtApp = useNuxtApp();
    const runtimeOptions = useAppConfig().icon;
    const name = useResolvedName(() => props.name);
    const component = computed(
      () => {
        var _a;
        return ((_a = nuxtApp.vueApp) == null ? void 0 : _a.component(name.value)) || ((props.mode || runtimeOptions.mode) === "svg" ? NuxtIconSvg : NuxtIconCss);
      }
    );
    const style = computed(() => {
      const size = props.size || runtimeOptions.size;
      return size ? { fontSize: Number.isNaN(+size) ? size : size + "px" } : null;
    });
    const customize = props.customize || runtimeOptions.customize;
    return () => h(
      component.value,
      {
        ...runtimeOptions.attrs,
        name: name.value,
        class: runtimeOptions.class,
        style: style.value,
        customize
      },
      slots
    );
  }
});

const index2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: __nuxt_component_0$1
});

const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "Icon",
  __ssrInlineRender: true,
  props: {
    name: {},
    mode: {},
    size: {},
    customize: { type: Function }
  },
  setup(__props) {
    const props = __props;
    const iconProps = useForwardProps(reactivePick(props, "name", "mode", "size", "customize"));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_Icon, mergeProps(unref(iconProps), _attrs), null, _parent));
    };
  }
});

async function imageMeta(_ctx, url) {
  const meta = await _imageMeta(url).catch((err) => {
    console.error("Failed to get image meta for " + url, err + "");
    return {
      width: 0,
      height: 0,
      ratio: 0
    };
  });
  return meta;
}
async function _imageMeta(url) {
  {
    const imageMeta2 = await import('image-meta').then((r) => r.imageMeta);
    const data = await fetch(url).then((res) => res.buffer());
    const metadata = imageMeta2(data);
    if (!metadata) {
      throw new Error(`No metadata could be extracted from the image \`${url}\`.`);
    }
    const { width, height } = metadata;
    const meta = {
      width,
      height,
      ratio: width && height ? width / height : void 0
    };
    return meta;
  }
}

function createMapper(map) {
  return (key) => {
    return key ? map[key] || key : map.missingValue;
  };
}
function createOperationsGenerator({ formatter, keyMap, joinWith = "/", valueMap } = {}) {
  if (!formatter) {
    formatter = (key, value) => `${key}=${value}`;
  }
  if (keyMap && typeof keyMap !== "function") {
    keyMap = createMapper(keyMap);
  }
  const map = valueMap || {};
  Object.keys(map).forEach((valueKey) => {
    if (typeof map[valueKey] !== "function") {
      map[valueKey] = createMapper(map[valueKey]);
    }
  });
  return (modifiers = {}) => {
    const operations = Object.entries(modifiers).filter(([_, value]) => typeof value !== "undefined").map(([key, value]) => {
      const mapper = map[key];
      if (typeof mapper === "function") {
        value = mapper(modifiers[key]);
      }
      key = typeof keyMap === "function" ? keyMap(key) : key;
      return formatter(key, value);
    });
    return operations.join(joinWith);
  };
}
function parseSize(input = "") {
  if (typeof input === "number") {
    return input;
  }
  if (typeof input === "string") {
    if (input.replace("px", "").match(/^\d+$/g)) {
      return Number.parseInt(input, 10);
    }
  }
}
function parseDensities(input = "") {
  if (input === void 0 || !input.length) {
    return [];
  }
  const densities = /* @__PURE__ */ new Set();
  for (const density of input.split(" ")) {
    const d = Number.parseInt(density.replace("x", ""));
    if (d) {
      densities.add(d);
    }
  }
  return Array.from(densities);
}
function checkDensities(densities) {
  if (densities.length === 0) {
    throw new Error("`densities` must not be empty, configure to `1` to render regular size only (DPR 1.0)");
  }
}
function parseSizes(input) {
  const sizes = {};
  if (typeof input === "string") {
    for (const entry of input.split(/[\s,]+/).filter((e) => e)) {
      const s = entry.split(":");
      if (s.length !== 2) {
        sizes["1px"] = s[0].trim();
      } else {
        sizes[s[0].trim()] = s[1].trim();
      }
    }
  } else {
    Object.assign(sizes, input);
  }
  return sizes;
}

function createImage(globalOptions) {
  const ctx = {
    options: globalOptions
  };
  const getImage = (input, options = {}) => {
    const image = resolveImage(ctx, input, options);
    return image;
  };
  const $img = (input, modifiers = {}, options = {}) => {
    return getImage(input, {
      ...options,
      modifiers: defu(modifiers, options.modifiers || {})
    }).url;
  };
  for (const presetName in globalOptions.presets) {
    $img[presetName] = (source, modifiers, options) => $img(source, modifiers, { ...globalOptions.presets[presetName], ...options });
  }
  $img.options = globalOptions;
  $img.getImage = getImage;
  $img.getMeta = (input, options) => getMeta(ctx, input, options);
  $img.getSizes = (input, options) => getSizes(ctx, input, options);
  ctx.$img = $img;
  return $img;
}
async function getMeta(ctx, input, options) {
  const image = resolveImage(ctx, input, { ...options });
  if (typeof image.getMeta === "function") {
    return await image.getMeta();
  } else {
    return await imageMeta(ctx, image.url);
  }
}
function resolveImage(ctx, input, options) {
  var _a, _b;
  if (input && typeof input !== "string") {
    throw new TypeError(`input must be a string (received ${typeof input}: ${JSON.stringify(input)})`);
  }
  if (!input || input.startsWith("data:")) {
    return {
      url: input
    };
  }
  const { provider, defaults } = getProvider(ctx, options.provider || ctx.options.provider);
  const preset = getPreset(ctx, options.preset);
  input = hasProtocol(input) ? input : withLeadingSlash(input);
  if (!provider.supportsAlias) {
    for (const base in ctx.options.alias) {
      if (input.startsWith(base)) {
        const alias = ctx.options.alias[base];
        if (alias) {
          input = joinURL(alias, input.slice(base.length));
        }
      }
    }
  }
  if (provider.validateDomains && hasProtocol(input)) {
    const inputHost = parseURL(input).host;
    if (!ctx.options.domains.find((d) => d === inputHost)) {
      return {
        url: input
      };
    }
  }
  const _options = defu(options, preset, defaults);
  _options.modifiers = { ..._options.modifiers };
  const expectedFormat = _options.modifiers.format;
  if ((_a = _options.modifiers) == null ? void 0 : _a.width) {
    _options.modifiers.width = parseSize(_options.modifiers.width);
  }
  if ((_b = _options.modifiers) == null ? void 0 : _b.height) {
    _options.modifiers.height = parseSize(_options.modifiers.height);
  }
  const image = provider.getImage(input, _options, ctx);
  image.format = image.format || expectedFormat || "";
  return image;
}
function getProvider(ctx, name) {
  const provider = ctx.options.providers[name];
  if (!provider) {
    throw new Error("Unknown provider: " + name);
  }
  return provider;
}
function getPreset(ctx, name) {
  if (!name) {
    return {};
  }
  if (!ctx.options.presets[name]) {
    throw new Error("Unknown preset: " + name);
  }
  return ctx.options.presets[name];
}
function getSizes(ctx, input, opts) {
  var _a, _b, _c, _d, _e;
  const width = parseSize((_a = opts.modifiers) == null ? void 0 : _a.width);
  const height = parseSize((_b = opts.modifiers) == null ? void 0 : _b.height);
  const sizes = parseSizes(opts.sizes);
  const densities = ((_c = opts.densities) == null ? void 0 : _c.trim()) ? parseDensities(opts.densities.trim()) : ctx.options.densities;
  checkDensities(densities);
  const hwRatio = width && height ? height / width : 0;
  const sizeVariants = [];
  const srcsetVariants = [];
  if (Object.keys(sizes).length >= 1) {
    for (const key in sizes) {
      const variant = getSizesVariant(key, String(sizes[key]), height, hwRatio, ctx);
      if (variant === void 0) {
        continue;
      }
      sizeVariants.push({
        size: variant.size,
        screenMaxWidth: variant.screenMaxWidth,
        media: `(max-width: ${variant.screenMaxWidth}px)`
      });
      for (const density of densities) {
        srcsetVariants.push({
          width: variant._cWidth * density,
          src: getVariantSrc(ctx, input, opts, variant, density)
        });
      }
    }
    finaliseSizeVariants(sizeVariants);
  } else {
    for (const density of densities) {
      const key = Object.keys(sizes)[0];
      let variant = key ? getSizesVariant(key, String(sizes[key]), height, hwRatio, ctx) : void 0;
      if (variant === void 0) {
        variant = {
          size: "",
          screenMaxWidth: 0,
          _cWidth: (_d = opts.modifiers) == null ? void 0 : _d.width,
          _cHeight: (_e = opts.modifiers) == null ? void 0 : _e.height
        };
      }
      srcsetVariants.push({
        width: density,
        src: getVariantSrc(ctx, input, opts, variant, density)
      });
    }
  }
  finaliseSrcsetVariants(srcsetVariants);
  const defaultVariant = srcsetVariants[srcsetVariants.length - 1];
  const sizesVal = sizeVariants.length ? sizeVariants.map((v) => `${v.media ? v.media + " " : ""}${v.size}`).join(", ") : void 0;
  const suffix = sizesVal ? "w" : "x";
  const srcsetVal = srcsetVariants.map((v) => `${v.src} ${v.width}${suffix}`).join(", ");
  return {
    sizes: sizesVal,
    srcset: srcsetVal,
    src: defaultVariant == null ? void 0 : defaultVariant.src
  };
}
function getSizesVariant(key, size, height, hwRatio, ctx) {
  const screenMaxWidth = ctx.options.screens && ctx.options.screens[key] || Number.parseInt(key);
  const isFluid = size.endsWith("vw");
  if (!isFluid && /^\d+$/.test(size)) {
    size = size + "px";
  }
  if (!isFluid && !size.endsWith("px")) {
    return void 0;
  }
  let _cWidth = Number.parseInt(size);
  if (!screenMaxWidth || !_cWidth) {
    return void 0;
  }
  if (isFluid) {
    _cWidth = Math.round(_cWidth / 100 * screenMaxWidth);
  }
  const _cHeight = hwRatio ? Math.round(_cWidth * hwRatio) : height;
  return {
    size,
    screenMaxWidth,
    _cWidth,
    _cHeight
  };
}
function getVariantSrc(ctx, input, opts, variant, density) {
  return ctx.$img(
    input,
    {
      ...opts.modifiers,
      width: variant._cWidth ? variant._cWidth * density : void 0,
      height: variant._cHeight ? variant._cHeight * density : void 0
    },
    opts
  );
}
function finaliseSizeVariants(sizeVariants) {
  var _a;
  sizeVariants.sort((v1, v2) => v1.screenMaxWidth - v2.screenMaxWidth);
  let previousMedia = null;
  for (let i = sizeVariants.length - 1; i >= 0; i--) {
    const sizeVariant = sizeVariants[i];
    if (sizeVariant.media === previousMedia) {
      sizeVariants.splice(i, 1);
    }
    previousMedia = sizeVariant.media;
  }
  for (let i = 0; i < sizeVariants.length; i++) {
    sizeVariants[i].media = ((_a = sizeVariants[i + 1]) == null ? void 0 : _a.media) || "";
  }
}
function finaliseSrcsetVariants(srcsetVariants) {
  srcsetVariants.sort((v1, v2) => v1.width - v2.width);
  let previousWidth = null;
  for (let i = srcsetVariants.length - 1; i >= 0; i--) {
    const sizeVariant = srcsetVariants[i];
    if (sizeVariant.width === previousWidth) {
      srcsetVariants.splice(i, 1);
    }
    previousWidth = sizeVariant.width;
  }
}

const operationsGenerator = createOperationsGenerator({
  keyMap: {
    format: "f",
    fit: "fit",
    width: "w",
    height: "h",
    resize: "s",
    quality: "q",
    background: "b"
  },
  joinWith: "&",
  formatter: (key, val) => encodeParam(key) + "_" + encodeParam(val)
});
const getImage = (src, { modifiers = {}, baseURL } = {}, ctx) => {
  if (modifiers.width && modifiers.height) {
    modifiers.resize = `${modifiers.width}x${modifiers.height}`;
    delete modifiers.width;
    delete modifiers.height;
  }
  const params = operationsGenerator(modifiers) || "_";
  if (!baseURL) {
    baseURL = joinURL(ctx.options.nuxt.baseURL, "/_ipx");
  }
  return {
    url: joinURL(baseURL, params, encodePath(src))
  };
};
const validateDomains = true;
const supportsAlias = true;

const ipx = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getImage: getImage,
  supportsAlias: supportsAlias,
  validateDomains: validateDomains
});

const imageOptions = {
  "screens": {
    "xs": 320,
    "sm": 640,
    "md": 768,
    "lg": 1024,
    "xl": 1280,
    "xxl": 1536,
    "2xl": 1536
  },
  "presets": {},
  "provider": "ipx",
  "domains": [],
  "alias": {},
  "densities": [
    1,
    2
  ],
  "format": [
    "webp"
  ]
};
imageOptions.providers = {
  ["ipx"]: { provider: ipx, defaults: {} }
};

const useImage = () => {
  const config = useRuntimeConfig();
  const nuxtApp = useNuxtApp();
  return nuxtApp.$img || nuxtApp._img || (nuxtApp._img = createImage({
    ...imageOptions,
    nuxt: {
      baseURL: config.app.baseURL
    },
    runtimeConfig: config
  }));
};

const baseImageProps = {
  // input source
  src: { type: String, required: false },
  // modifiers
  format: { type: String, required: false },
  quality: { type: [Number, String], required: false },
  background: { type: String, required: false },
  fit: { type: String, required: false },
  modifiers: { type: Object, required: false },
  // options
  preset: { type: String, required: false },
  provider: { type: String, required: false },
  sizes: { type: [Object, String], required: false },
  densities: { type: String, required: false },
  preload: {
    type: [Boolean, Object],
    required: false
  },
  // <img> attributes
  width: { type: [String, Number], required: false },
  height: { type: [String, Number], required: false },
  alt: { type: String, required: false },
  referrerpolicy: { type: String, required: false },
  usemap: { type: String, required: false },
  longdesc: { type: String, required: false },
  ismap: { type: Boolean, required: false },
  loading: {
    type: String,
    required: false,
    validator: (val) => ["lazy", "eager"].includes(val)
  },
  crossorigin: {
    type: [Boolean, String],
    required: false,
    validator: (val) => ["anonymous", "use-credentials", "", true, false].includes(val)
  },
  decoding: {
    type: String,
    required: false,
    validator: (val) => ["async", "auto", "sync"].includes(val)
  },
  // csp
  nonce: { type: [String], required: false }
};
const useBaseImage = (props) => {
  const options = computed(() => {
    return {
      provider: props.provider,
      preset: props.preset
    };
  });
  const attrs = computed(() => {
    return {
      width: parseSize(props.width),
      height: parseSize(props.height),
      alt: props.alt,
      referrerpolicy: props.referrerpolicy,
      usemap: props.usemap,
      longdesc: props.longdesc,
      ismap: props.ismap,
      crossorigin: props.crossorigin === true ? "anonymous" : props.crossorigin || void 0,
      loading: props.loading,
      decoding: props.decoding,
      nonce: props.nonce
    };
  });
  const $img = useImage();
  const modifiers = computed(() => {
    return {
      ...props.modifiers,
      width: parseSize(props.width),
      height: parseSize(props.height),
      format: props.format,
      quality: props.quality || $img.options.quality,
      background: props.background,
      fit: props.fit
    };
  });
  return {
    options,
    attrs,
    modifiers
  };
};
const imgProps = {
  ...baseImageProps,
  placeholder: { type: [Boolean, String, Number, Array], required: false },
  placeholderClass: { type: String, required: false },
  custom: { type: Boolean, required: false }
};

const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "NuxtImg",
  __ssrInlineRender: true,
  props: imgProps,
  emits: ["load", "error"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const attrs = useAttrs();
    const isServer = true;
    const $img = useImage();
    const _base = useBaseImage(props);
    const placeholderLoaded = ref(false);
    const imgEl = ref();
    const sizes = computed(() => $img.getSizes(props.src, {
      ..._base.options.value,
      sizes: props.sizes,
      densities: props.densities,
      modifiers: {
        ..._base.modifiers.value,
        width: parseSize(props.width),
        height: parseSize(props.height)
      }
    }));
    const imgAttrs = computed(() => {
      const attrs2 = { ..._base.attrs.value, "data-nuxt-img": "" };
      if (!props.placeholder || placeholderLoaded.value) {
        attrs2.sizes = sizes.value.sizes;
        attrs2.srcset = sizes.value.srcset;
      }
      return attrs2;
    });
    const placeholder = computed(() => {
      let placeholder2 = props.placeholder;
      if (placeholder2 === "") {
        placeholder2 = true;
      }
      if (!placeholder2 || placeholderLoaded.value) {
        return false;
      }
      if (typeof placeholder2 === "string") {
        return placeholder2;
      }
      const size = Array.isArray(placeholder2) ? placeholder2 : typeof placeholder2 === "number" ? [placeholder2, placeholder2] : [10, 10];
      return $img(props.src, {
        ..._base.modifiers.value,
        width: size[0],
        height: size[1],
        quality: size[2] || 50,
        blur: size[3] || 3
      }, _base.options.value);
    });
    const mainSrc = computed(
      () => props.sizes ? sizes.value.src : $img(props.src, _base.modifiers.value, _base.options.value)
    );
    const src = computed(() => placeholder.value ? placeholder.value : mainSrc.value);
    if (props.preload) {
      const isResponsive = Object.values(sizes.value).every((v) => v);
      useHead({
        link: [{
          rel: "preload",
          as: "image",
          nonce: props.nonce,
          ...!isResponsive ? { href: src.value } : {
            href: sizes.value.src,
            imagesizes: sizes.value.sizes,
            imagesrcset: sizes.value.srcset
          },
          ...typeof props.preload !== "boolean" && props.preload.fetchPriority ? { fetchpriority: props.preload.fetchPriority } : {}
        }]
      });
    }
    const nuxtApp = useNuxtApp();
    nuxtApp.isHydrating;
    return (_ctx, _push, _parent, _attrs) => {
      if (!_ctx.custom) {
        _push(`<img${ssrRenderAttrs(mergeProps({
          ref_key: "imgEl",
          ref: imgEl,
          class: props.placeholder && !placeholderLoaded.value ? props.placeholderClass : void 0
        }, {
          ...unref(isServer) ? { onerror: "this.setAttribute('data-error', 1)" } : {},
          ...imgAttrs.value,
          ...unref(attrs)
        }, { src: src.value }, _attrs))}>`);
      } else {
        ssrRenderSlot(_ctx.$slots, "default", {
          ...unref(isServer) ? { onerror: "this.setAttribute('data-error', 1)" } : {},
          imgAttrs: {
            ...imgAttrs.value,
            ...unref(attrs)
          },
          isLoaded: placeholderLoaded.value,
          src: src.value
        }, null, _push, _parent);
      }
    };
  }
});

const avatarGroupInjectionKey = Symbol("nuxt-ui.avatar-group");
function useAvatarGroup(props) {
  const avatarGroup = inject(avatarGroupInjectionKey, void 0);
  const size = computed(() => props.size ?? (avatarGroup == null ? void 0 : avatarGroup.value.size));
  provide(avatarGroupInjectionKey, computed(() => ({ size: size.value })));
  return {
    size
  };
}

const theme$4 = {
  "slots": {
    "root": "inline-flex items-center justify-center shrink-0 select-none overflow-hidden rounded-full align-middle bg-(--ui-bg-elevated)",
    "image": "h-full w-full rounded-[inherit] object-cover",
    "fallback": "font-medium leading-none text-(--ui-text-muted) truncate",
    "icon": "text-(--ui-text-muted) shrink-0"
  },
  "variants": {
    "size": {
      "3xs": {
        "root": "size-4 text-[8px]"
      },
      "2xs": {
        "root": "size-5 text-[10px]"
      },
      "xs": {
        "root": "size-6 text-xs"
      },
      "sm": {
        "root": "size-7 text-sm"
      },
      "md": {
        "root": "size-8 text-base"
      },
      "lg": {
        "root": "size-9 text-lg"
      },
      "xl": {
        "root": "size-10 text-xl"
      },
      "2xl": {
        "root": "size-11 text-[22px]"
      },
      "3xl": {
        "root": "size-12 text-2xl"
      }
    }
  },
  "defaultVariants": {
    "size": "md"
  }
};

var _a$5;
const appConfigTv = _appConfig;
const tv = createTV((_a$5 = appConfigTv.ui) == null ? void 0 : _a$5.tv);

var _a$4;
const appConfigAvatar = _appConfig;
const avatar = tv({ extend: tv(theme$4), ...((_a$4 = appConfigAvatar.ui) == null ? void 0 : _a$4.avatar) || {} });
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  ...{ inheritAttrs: false },
  __name: "Avatar",
  __ssrInlineRender: true,
  props: {
    as: { default: "span" },
    src: {},
    alt: {},
    icon: {},
    text: {},
    size: {},
    class: {},
    style: {},
    ui: {}
  },
  setup(__props) {
    const props = __props;
    const fallback = computed(() => props.text || (props.alt || "").split(" ").map((word) => word.charAt(0)).join("").substring(0, 2));
    const { size } = useAvatarGroup(props);
    const ui = computed(() => avatar({
      size: size.value
    }));
    const sizePx = computed(() => ({
      "3xs": 16,
      "2xs": 20,
      "xs": 24,
      "sm": 28,
      "md": 32,
      "lg": 36,
      "xl": 40,
      "2xl": 44,
      "3xl": 48
    })[props.size || "md"]);
    const error = ref(false);
    watch(() => props.src, () => {
      if (error.value) {
        error.value = false;
      }
    });
    function onError() {
      error.value = true;
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: _ctx.as,
        class: ui.value.root({ class: [props.class, (_a2 = props.ui) == null ? void 0 : _a2.root] }),
        style: props.style
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a3, _b;
          if (_push2) {
            if (_ctx.src && !error.value) {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(unref(_sfc_main$b)), mergeProps({
                role: "img",
                src: _ctx.src,
                alt: _ctx.alt,
                width: sizePx.value,
                height: sizePx.value
              }, _ctx.$attrs, {
                class: ui.value.image({ class: (_a3 = props.ui) == null ? void 0 : _a3.image }),
                onError
              }), null), _parent2, _scopeId);
            } else {
              ssrRenderSlot(_ctx.$slots, "default", {}, () => {
                var _a4, _b2;
                if (_ctx.icon) {
                  _push2(ssrRenderComponent(_sfc_main$c, {
                    name: _ctx.icon,
                    class: ui.value.icon({ class: (_a4 = props.ui) == null ? void 0 : _a4.icon })
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<span class="${ssrRenderClass(ui.value.fallback({ class: (_b2 = props.ui) == null ? void 0 : _b2.fallback }))}"${_scopeId}>${ssrInterpolate(fallback.value || " ")}</span>`);
                }
              }, _push2, _parent2, _scopeId);
            }
          } else {
            return [
              _ctx.src && !error.value ? (openBlock(), createBlock(resolveDynamicComponent(unref(_sfc_main$b)), mergeProps({
                key: 0,
                role: "img",
                src: _ctx.src,
                alt: _ctx.alt,
                width: sizePx.value,
                height: sizePx.value
              }, _ctx.$attrs, {
                class: ui.value.image({ class: (_b = props.ui) == null ? void 0 : _b.image }),
                onError
              }), null, 16, ["src", "alt", "width", "height", "class"])) : renderSlot(_ctx.$slots, "default", { key: 1 }, () => {
                var _a4, _b2;
                return [
                  _ctx.icon ? (openBlock(), createBlock(_sfc_main$c, {
                    key: 0,
                    name: _ctx.icon,
                    class: ui.value.icon({ class: (_a4 = props.ui) == null ? void 0 : _a4.icon })
                  }, null, 8, ["name", "class"])) : (openBlock(), createBlock("span", {
                    key: 1,
                    class: ui.value.fallback({ class: (_b2 = props.ui) == null ? void 0 : _b2.fallback })
                  }, toDisplayString(fallback.value || " "), 3))
                ];
              })
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});

function useComponentIcons(componentProps) {
  const appConfig = useAppConfig();
  const props = computed(() => toValue(componentProps));
  const isLeading = computed(() => props.value.icon && props.value.leading || props.value.icon && !props.value.trailing || props.value.loading && !props.value.trailing || !!props.value.leadingIcon);
  const isTrailing = computed(() => props.value.icon && props.value.trailing || props.value.loading && props.value.trailing || !!props.value.trailingIcon);
  const leadingIconName = computed(() => {
    if (props.value.loading) {
      return props.value.loadingIcon || appConfig.ui.icons.loading;
    }
    return props.value.leadingIcon || props.value.icon;
  });
  const trailingIconName = computed(() => {
    if (props.value.loading && !isLeading.value) {
      return props.value.loadingIcon || appConfig.ui.icons.loading;
    }
    return props.value.trailingIcon || props.value.icon;
  });
  return {
    isLeading,
    isTrailing,
    leadingIconName,
    trailingIconName
  };
}

const buttonGroupInjectionKey = Symbol("nuxt-ui.button-group");
function useButtonGroup(props) {
  const buttonGroup = inject(buttonGroupInjectionKey, void 0);
  return {
    orientation: computed(() => buttonGroup == null ? void 0 : buttonGroup.value.orientation),
    size: computed(() => (props == null ? void 0 : props.size) ?? (buttonGroup == null ? void 0 : buttonGroup.value.size))
  };
}

const formOptionsInjectionKey = Symbol("nuxt-ui.form-options");
const formBusInjectionKey = Symbol("nuxt-ui.form-events");
const formFieldInjectionKey = Symbol("nuxt-ui.form-field");
const inputIdInjectionKey = Symbol("nuxt-ui.input-id");
const formInputsInjectionKey = Symbol("nuxt-ui.form-inputs");
const formLoadingInjectionKey = Symbol("nuxt-ui.form-loading");
function useFormField(props, opts) {
  const formOptions = inject(formOptionsInjectionKey, void 0);
  const formBus = inject(formBusInjectionKey, void 0);
  const formField = inject(formFieldInjectionKey, void 0);
  const formInputs = inject(formInputsInjectionKey, void 0);
  const inputId = inject(inputIdInjectionKey, void 0);
  if (formField && inputId) {
    if ((opts == null ? void 0 : opts.bind) === false) {
      inputId.value = void 0;
    } else if (props == null ? void 0 : props.id) {
      inputId.value = props == null ? void 0 : props.id;
    }
    if (formInputs && formField.value.name && inputId.value) {
      formInputs.value[formField.value.name] = { id: inputId.value, pattern: formField.value.errorPattern };
    }
  }
  function emitFormEvent(type, name, eager) {
    if (formBus && formField && name) {
      formBus.emit({ type, name, eager });
    }
  }
  function emitFormBlur() {
    emitFormEvent("blur", formField == null ? void 0 : formField.value.name);
  }
  function emitFormFocus() {
    emitFormEvent("focus", formField == null ? void 0 : formField.value.name);
  }
  function emitFormChange() {
    emitFormEvent("change", formField == null ? void 0 : formField.value.name);
  }
  const emitFormInput = useDebounceFn(
    () => {
      emitFormEvent("input", formField == null ? void 0 : formField.value.name, !(opts == null ? void 0 : opts.deferInputValidation) || (formField == null ? void 0 : formField.value.eagerValidation));
    },
    (formField == null ? void 0 : formField.value.validateOnInputDelay) ?? (formOptions == null ? void 0 : formOptions.value.validateOnInputDelay) ?? 0
  );
  return {
    id: computed(() => (props == null ? void 0 : props.id) ?? (inputId == null ? void 0 : inputId.value)),
    name: computed(() => (props == null ? void 0 : props.name) ?? (formField == null ? void 0 : formField.value.name)),
    size: computed(() => (props == null ? void 0 : props.size) ?? (formField == null ? void 0 : formField.value.size)),
    color: computed(() => (formField == null ? void 0 : formField.value.error) ? "error" : props == null ? void 0 : props.color),
    highlight: computed(() => (formField == null ? void 0 : formField.value.error) ? true : props == null ? void 0 : props.highlight),
    disabled: computed(() => (formOptions == null ? void 0 : formOptions.value.disabled) || (props == null ? void 0 : props.disabled)),
    emitFormBlur,
    emitFormInput,
    emitFormChange,
    emitFormFocus,
    ariaAttrs: computed(() => {
      if (!(formField == null ? void 0 : formField.value)) return;
      const descriptiveAttrs = ["error", "hint", "description"].filter((type) => {
        var _a;
        return (_a = formField == null ? void 0 : formField.value) == null ? void 0 : _a[type];
      }).map((type) => `${formField == null ? void 0 : formField.value.ariaId}-${type}`) || [];
      return {
        "aria-describedby": descriptiveAttrs.join(" "),
        "aria-invalid": !!(formField == null ? void 0 : formField.value.error)
      };
    })
  };
}

function pickLinkProps(link) {
  return reactivePick(link, "active", "activeClass", "ariaCurrentValue", "ariaLabel", "as", "disabled", "exact", "exactActiveClass", "exactHash", "exactQuery", "external", "href", "inactiveClass", "noPrefetch", "noRel", "prefetch", "prefetchedClass", "rel", "replace", "target", "to", "type", "title");
}

const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
// @__NO_SIDE_EFFECTS__
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  function isHashLinkWithoutHashMode(link) {
    return typeof link === "string" && link.startsWith("#");
  }
  function resolveTrailingSlashBehavior(to, resolve) {
    if (!to || options.trailingSlash !== "append" && options.trailingSlash !== "remove") {
      return to;
    }
    if (typeof to === "string") {
      return applyTrailingSlashBehavior(to, options.trailingSlash);
    }
    const path = "path" in to && to.path !== void 0 ? to.path : resolve(to).path;
    const resolvedPath = {
      ...to,
      name: void 0,
      // named routes would otherwise always override trailing slash behavior
      path: applyTrailingSlashBehavior(path, options.trailingSlash)
    };
    return resolvedPath;
  }
  function useNuxtLink(props) {
    const router = useRouter();
    const config = useRuntimeConfig();
    const hasTarget = computed(() => !!props.target && props.target !== "_self");
    const isAbsoluteUrl = computed(() => {
      const path = props.to || props.href || "";
      return typeof path === "string" && hasProtocol(path, { acceptRelative: true });
    });
    const builtinRouterLink = resolveComponent("RouterLink");
    const useBuiltinLink = builtinRouterLink && typeof builtinRouterLink !== "string" ? builtinRouterLink.useLink : void 0;
    const isExternal = computed(() => {
      if (props.external) {
        return true;
      }
      const path = props.to || props.href || "";
      if (typeof path === "object") {
        return false;
      }
      return path === "" || isAbsoluteUrl.value;
    });
    const to = computed(() => {
      const path = props.to || props.href || "";
      if (isExternal.value) {
        return path;
      }
      return resolveTrailingSlashBehavior(path, router.resolve);
    });
    const link = isExternal.value ? void 0 : useBuiltinLink == null ? void 0 : useBuiltinLink({ ...props, to });
    const href = computed(() => {
      var _a;
      if (!to.value || isAbsoluteUrl.value || isHashLinkWithoutHashMode(to.value)) {
        return to.value;
      }
      if (isExternal.value) {
        const path = typeof to.value === "object" && "path" in to.value ? resolveRouteObject(to.value) : to.value;
        const href2 = typeof path === "object" ? router.resolve(path).href : path;
        return resolveTrailingSlashBehavior(
          href2,
          router.resolve
          /* will not be called */
        );
      }
      if (typeof to.value === "object") {
        return ((_a = router.resolve(to.value)) == null ? void 0 : _a.href) ?? null;
      }
      return resolveTrailingSlashBehavior(
        joinURL(config.app.baseURL, to.value),
        router.resolve
        /* will not be called */
      );
    });
    return {
      to,
      hasTarget,
      isAbsoluteUrl,
      isExternal,
      //
      href,
      isActive: (link == null ? void 0 : link.isActive) ?? computed(() => to.value === router.currentRoute.value.path),
      isExactActive: (link == null ? void 0 : link.isExactActive) ?? computed(() => to.value === router.currentRoute.value.path),
      route: (link == null ? void 0 : link.route) ?? computed(() => router.resolve(to.value)),
      async navigate(_e) {
        await navigateTo(href.value, { replace: props.replace, external: isExternal.value || hasTarget.value });
      }
    };
  }
  return defineComponent({
    name: componentName,
    props: {
      // Routing
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      // Attributes
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Prefetching
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      prefetchOn: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Styling
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      // Vue Router's `<RouterLink>` additional props
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      // Edge cases handling
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Slot API
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      }
    },
    useLink: useNuxtLink,
    setup(props, { slots }) {
      useRouter();
      const { to, href, navigate, isExternal, hasTarget, isAbsoluteUrl } = useNuxtLink(props);
      ref(false);
      const el = void 0;
      const elRef = void 0;
      async function prefetch(nuxtApp = useNuxtApp()) {
        {
          return;
        }
      }
      return () => {
        var _a;
        if (!isExternal.value && !hasTarget.value && !isHashLinkWithoutHashMode(to.value)) {
          const routerLinkProps = {
            ref: elRef,
            to: to.value,
            activeClass: props.activeClass || options.activeClass,
            exactActiveClass: props.exactActiveClass || options.exactActiveClass,
            replace: props.replace,
            ariaCurrentValue: props.ariaCurrentValue,
            custom: props.custom
          };
          if (!props.custom) {
            routerLinkProps.rel = props.rel || void 0;
          }
          return h(
            resolveComponent("RouterLink"),
            routerLinkProps,
            slots.default
          );
        }
        const target = props.target || null;
        const rel = firstNonUndefined(
          // converts `""` to `null` to prevent the attribute from being added as empty (`rel=""`)
          props.noRel ? "" : props.rel,
          options.externalRelAttribute,
          /*
          * A fallback rel of `noopener noreferrer` is applied for external links or links that open in a new tab.
          * This solves a reverse tabnapping security flaw in browsers pre-2021 as well as improving privacy.
          */
          isAbsoluteUrl.value || hasTarget.value ? "noopener noreferrer" : ""
        ) || null;
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href: href.value,
            navigate,
            prefetch,
            get route() {
              if (!href.value) {
                return void 0;
              }
              const url = new URL(href.value, "http://localhost");
              return {
                path: url.pathname,
                fullPath: url.pathname,
                get query() {
                  return parseQuery(url.search);
                },
                hash: url.hash,
                params: {},
                name: void 0,
                matched: [],
                redirectedFrom: void 0,
                meta: {},
                href: href.value
              };
            },
            rel,
            target,
            isExternal: isExternal.value || hasTarget.value,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", { ref: el, href: href.value || null, rel, target }, (_a = slots.default) == null ? void 0 : _a.call(slots));
      };
    }
    // }) as unknown as DefineComponent<NuxtLinkProps, object, object, ComputedOptions, MethodOptions, object, object, EmitsOptions, string, object, NuxtLinkProps, object, SlotsType<NuxtLinkSlots>>
  });
}
const __nuxt_component_0 = /* @__PURE__ */ defineNuxtLink(nuxtLinkDefaults);
function applyTrailingSlashBehavior(to, trailingSlash) {
  const normalizeFn = trailingSlash === "append" ? withTrailingSlash : withoutTrailingSlash;
  const hasProtocolDifferentFromHttp = hasProtocol(to) && !to.startsWith("http");
  if (hasProtocolDifferentFromHttp) {
    return to;
  }
  return normalizeFn(to, true);
}

const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "LinkBase",
  __ssrInlineRender: true,
  props: {
    as: { default: "button" },
    type: { default: "button" },
    disabled: { type: Boolean },
    onClick: {},
    href: {},
    navigate: {},
    target: {},
    rel: {},
    isExternal: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    function onClickWrapper(e) {
      if (props.disabled) {
        e.stopPropagation();
        e.preventDefault();
        return;
      }
      if (props.onClick) {
        for (const onClick of Array.isArray(props.onClick) ? props.onClick : [props.onClick]) {
          onClick(e);
        }
      }
      if (props.href && props.navigate && !props.isExternal) {
        props.navigate(e);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps(_ctx.href ? {
        "as": "a",
        "href": _ctx.disabled ? void 0 : _ctx.href,
        "aria-disabled": _ctx.disabled ? "true" : void 0,
        "role": _ctx.disabled ? "link" : void 0,
        "tabindex": _ctx.disabled ? -1 : void 0
      } : _ctx.as === "button" ? {
        as: _ctx.as,
        type: _ctx.type,
        disabled: _ctx.disabled
      } : {
        as: _ctx.as
      }, {
        rel: _ctx.rel,
        target: _ctx.target,
        onClick: onClickWrapper
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});

const theme$3 = {
  "base": "focus-visible:outline-(--ui-primary)",
  "variants": {
    "active": {
      "true": "text-(--ui-primary)",
      "false": [
        "text-(--ui-text-muted) hover:text-(--ui-text)",
        "transition-colors"
      ]
    },
    "disabled": {
      "true": "cursor-not-allowed opacity-75"
    }
  }
};

var _a$3;
const appConfigLink = _appConfig;
const link = tv({ extend: tv(theme$3), ...((_a$3 = appConfigLink.ui) == null ? void 0 : _a$3.link) || {} });
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  ...{ inheritAttrs: false },
  __name: "Link",
  __ssrInlineRender: true,
  props: {
    as: { default: "button" },
    type: { default: "button" },
    disabled: { type: Boolean },
    active: { type: Boolean, default: void 0 },
    exact: { type: Boolean },
    exactQuery: { type: [Boolean, String] },
    exactHash: { type: Boolean },
    inactiveClass: { default: "" },
    custom: { type: Boolean },
    raw: { type: Boolean },
    class: {},
    to: {},
    href: {},
    external: { type: Boolean },
    target: {},
    rel: {},
    noRel: { type: Boolean },
    prefetchedClass: {},
    prefetch: { type: Boolean },
    prefetchOn: {},
    noPrefetch: { type: Boolean },
    activeClass: { default: "" },
    exactActiveClass: {},
    ariaCurrentValue: {},
    viewTransition: { type: Boolean },
    replace: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const route = useRoute();
    const nuxtLinkProps = useForwardProps(reactiveOmit(props, "as", "type", "disabled", "active", "exact", "exactQuery", "exactHash", "activeClass", "inactiveClass", "raw", "class"));
    const ui = computed(() => tv({
      extend: link,
      variants: {
        active: {
          true: props.activeClass,
          false: props.inactiveClass
        }
      }
    }));
    function isPartiallyEqual(item1, item2) {
      const diffedKeys = diff(item1, item2).reduce((filtered, q) => {
        if (q.type === "added") {
          filtered.add(q.key);
        }
        return filtered;
      }, /* @__PURE__ */ new Set());
      const item1Filtered = Object.fromEntries(Object.entries(item1).filter(([key]) => !diffedKeys.has(key)));
      const item2Filtered = Object.fromEntries(Object.entries(item2).filter(([key]) => !diffedKeys.has(key)));
      return isEqual(item1Filtered, item2Filtered);
    }
    function isLinkActive({ route: linkRoute, isActive, isExactActive }) {
      if (props.active !== void 0) {
        return props.active;
      }
      if (props.exactQuery === "partial") {
        if (!isPartiallyEqual(linkRoute.query, route.query)) return false;
      } else if (props.exactQuery === true) {
        if (!isEqual(linkRoute.query, route.query)) return false;
      }
      if (props.exactHash && linkRoute.hash !== route.hash) {
        return false;
      }
      if (props.exact && isExactActive) {
        return true;
      }
      if (!props.exact && isActive) {
        return true;
      }
      return false;
    }
    function resolveLinkClass({ route: route2, isActive, isExactActive }) {
      const active = isLinkActive({ route: route2, isActive, isExactActive });
      if (props.raw) {
        return [props.class, active ? props.activeClass : props.inactiveClass];
      }
      return ui.value({ class: props.class, active, disabled: props.disabled });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps(unref(nuxtLinkProps), { custom: "" }, _attrs), {
        default: withCtx(({ href, navigate, route: linkRoute, rel, target, isExternal, isActive, isExactActive }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (_ctx.custom) {
              ssrRenderSlot(_ctx.$slots, "default", {
                ..._ctx.$attrs,
                as: _ctx.as,
                type: _ctx.type,
                disabled: _ctx.disabled,
                href,
                navigate,
                rel,
                target,
                isExternal,
                active: isLinkActive({ route: linkRoute, isActive, isExactActive })
              }, null, _push2, _parent2, _scopeId);
            } else {
              _push2(ssrRenderComponent(_sfc_main$9, mergeProps({
                ..._ctx.$attrs,
                as: _ctx.as,
                type: _ctx.type,
                disabled: _ctx.disabled,
                href,
                navigate,
                rel,
                target,
                isExternal
              }, {
                class: resolveLinkClass({ route: linkRoute, isActive, isExactActive })
              }), {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "default", {
                      active: isLinkActive({ route: linkRoute, isActive, isExactActive })
                    }, null, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "default", {
                        active: isLinkActive({ route: linkRoute, isActive, isExactActive })
                      })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            }
          } else {
            return [
              _ctx.custom ? renderSlot(_ctx.$slots, "default", mergeProps({ key: 0 }, {
                ..._ctx.$attrs,
                as: _ctx.as,
                type: _ctx.type,
                disabled: _ctx.disabled,
                href,
                navigate,
                rel,
                target,
                isExternal,
                active: isLinkActive({ route: linkRoute, isActive, isExactActive })
              })) : (openBlock(), createBlock(_sfc_main$9, mergeProps({ key: 1 }, {
                ..._ctx.$attrs,
                as: _ctx.as,
                type: _ctx.type,
                disabled: _ctx.disabled,
                href,
                navigate,
                rel,
                target,
                isExternal
              }, {
                class: resolveLinkClass({ route: linkRoute, isActive, isExactActive })
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", {
                    active: isLinkActive({ route: linkRoute, isActive, isExactActive })
                  })
                ]),
                _: 2
              }, 1040, ["class"]))
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});

const theme$2 = {
  "slots": {
    "base": [
      "rounded-[calc(var(--ui-radius)*1.5)] font-medium inline-flex items-center focus:outline-hidden disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75",
      "transition-colors"
    ],
    "label": "truncate",
    "leadingIcon": "shrink-0",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailingIcon": "shrink-0"
  },
  "variants": {
    "buttonGroup": {
      "horizontal": "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none",
      "vertical": "not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none"
    },
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "variant": {
      "solid": "",
      "outline": "",
      "soft": "",
      "subtle": "",
      "ghost": "",
      "link": ""
    },
    "size": {
      "xs": {
        "base": "px-2 py-1 text-xs gap-1",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "sm": {
        "base": "px-2.5 py-1.5 text-xs gap-1.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "md": {
        "base": "px-2.5 py-1.5 text-sm gap-1.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "lg": {
        "base": "px-3 py-2 text-sm gap-2",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "xl": {
        "base": "px-3 py-2 text-base gap-2",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs",
        "trailingIcon": "size-6"
      }
    },
    "block": {
      "true": {
        "base": "w-full justify-center",
        "trailingIcon": "ms-auto"
      }
    },
    "square": {
      "true": ""
    },
    "leading": {
      "true": ""
    },
    "trailing": {
      "true": ""
    },
    "loading": {
      "true": ""
    },
    "active": {
      "true": {
        "base": ""
      },
      "false": {
        "base": ""
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": "solid",
      "class": "text-(--ui-bg) bg-(--ui-primary) hover:bg-(--ui-primary)/75 disabled:bg-(--ui-primary) aria-disabled:bg-(--ui-primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-primary)"
    },
    {
      "color": "secondary",
      "variant": "solid",
      "class": "text-(--ui-bg) bg-(--ui-secondary) hover:bg-(--ui-secondary)/75 disabled:bg-(--ui-secondary) aria-disabled:bg-(--ui-secondary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-secondary)"
    },
    {
      "color": "success",
      "variant": "solid",
      "class": "text-(--ui-bg) bg-(--ui-success) hover:bg-(--ui-success)/75 disabled:bg-(--ui-success) aria-disabled:bg-(--ui-success) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-success)"
    },
    {
      "color": "info",
      "variant": "solid",
      "class": "text-(--ui-bg) bg-(--ui-info) hover:bg-(--ui-info)/75 disabled:bg-(--ui-info) aria-disabled:bg-(--ui-info) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-info)"
    },
    {
      "color": "warning",
      "variant": "solid",
      "class": "text-(--ui-bg) bg-(--ui-warning) hover:bg-(--ui-warning)/75 disabled:bg-(--ui-warning) aria-disabled:bg-(--ui-warning) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-warning)"
    },
    {
      "color": "error",
      "variant": "solid",
      "class": "text-(--ui-bg) bg-(--ui-error) hover:bg-(--ui-error)/75 disabled:bg-(--ui-error) aria-disabled:bg-(--ui-error) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-error)"
    },
    {
      "color": "primary",
      "variant": "outline",
      "class": "ring ring-inset ring-(--ui-primary)/50 text-(--ui-primary) hover:bg-(--ui-primary)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-(--ui-primary)"
    },
    {
      "color": "secondary",
      "variant": "outline",
      "class": "ring ring-inset ring-(--ui-secondary)/50 text-(--ui-secondary) hover:bg-(--ui-secondary)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-(--ui-secondary)"
    },
    {
      "color": "success",
      "variant": "outline",
      "class": "ring ring-inset ring-(--ui-success)/50 text-(--ui-success) hover:bg-(--ui-success)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-(--ui-success)"
    },
    {
      "color": "info",
      "variant": "outline",
      "class": "ring ring-inset ring-(--ui-info)/50 text-(--ui-info) hover:bg-(--ui-info)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-(--ui-info)"
    },
    {
      "color": "warning",
      "variant": "outline",
      "class": "ring ring-inset ring-(--ui-warning)/50 text-(--ui-warning) hover:bg-(--ui-warning)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-(--ui-warning)"
    },
    {
      "color": "error",
      "variant": "outline",
      "class": "ring ring-inset ring-(--ui-error)/50 text-(--ui-error) hover:bg-(--ui-error)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-(--ui-error)"
    },
    {
      "color": "primary",
      "variant": "soft",
      "class": "text-(--ui-primary) bg-(--ui-primary)/10 hover:bg-(--ui-primary)/15 focus-visible:bg-(--ui-primary)/15 disabled:bg-(--ui-primary)/10 aria-disabled:bg-(--ui-primary)/10"
    },
    {
      "color": "secondary",
      "variant": "soft",
      "class": "text-(--ui-secondary) bg-(--ui-secondary)/10 hover:bg-(--ui-secondary)/15 focus-visible:bg-(--ui-secondary)/15 disabled:bg-(--ui-secondary)/10 aria-disabled:bg-(--ui-secondary)/10"
    },
    {
      "color": "success",
      "variant": "soft",
      "class": "text-(--ui-success) bg-(--ui-success)/10 hover:bg-(--ui-success)/15 focus-visible:bg-(--ui-success)/15 disabled:bg-(--ui-success)/10 aria-disabled:bg-(--ui-success)/10"
    },
    {
      "color": "info",
      "variant": "soft",
      "class": "text-(--ui-info) bg-(--ui-info)/10 hover:bg-(--ui-info)/15 focus-visible:bg-(--ui-info)/15 disabled:bg-(--ui-info)/10 aria-disabled:bg-(--ui-info)/10"
    },
    {
      "color": "warning",
      "variant": "soft",
      "class": "text-(--ui-warning) bg-(--ui-warning)/10 hover:bg-(--ui-warning)/15 focus-visible:bg-(--ui-warning)/15 disabled:bg-(--ui-warning)/10 aria-disabled:bg-(--ui-warning)/10"
    },
    {
      "color": "error",
      "variant": "soft",
      "class": "text-(--ui-error) bg-(--ui-error)/10 hover:bg-(--ui-error)/15 focus-visible:bg-(--ui-error)/15 disabled:bg-(--ui-error)/10 aria-disabled:bg-(--ui-error)/10"
    },
    {
      "color": "primary",
      "variant": "subtle",
      "class": "text-(--ui-primary) ring ring-inset ring-(--ui-primary)/25 bg-(--ui-primary)/10 hover:bg-(--ui-primary)/15 disabled:bg-(--ui-primary)/10 aria-disabled:bg-(--ui-primary)/10 focus-visible:ring-2 focus-visible:ring-(--ui-primary)"
    },
    {
      "color": "secondary",
      "variant": "subtle",
      "class": "text-(--ui-secondary) ring ring-inset ring-(--ui-secondary)/25 bg-(--ui-secondary)/10 hover:bg-(--ui-secondary)/15 disabled:bg-(--ui-secondary)/10 aria-disabled:bg-(--ui-secondary)/10 focus-visible:ring-2 focus-visible:ring-(--ui-secondary)"
    },
    {
      "color": "success",
      "variant": "subtle",
      "class": "text-(--ui-success) ring ring-inset ring-(--ui-success)/25 bg-(--ui-success)/10 hover:bg-(--ui-success)/15 disabled:bg-(--ui-success)/10 aria-disabled:bg-(--ui-success)/10 focus-visible:ring-2 focus-visible:ring-(--ui-success)"
    },
    {
      "color": "info",
      "variant": "subtle",
      "class": "text-(--ui-info) ring ring-inset ring-(--ui-info)/25 bg-(--ui-info)/10 hover:bg-(--ui-info)/15 disabled:bg-(--ui-info)/10 aria-disabled:bg-(--ui-info)/10 focus-visible:ring-2 focus-visible:ring-(--ui-info)"
    },
    {
      "color": "warning",
      "variant": "subtle",
      "class": "text-(--ui-warning) ring ring-inset ring-(--ui-warning)/25 bg-(--ui-warning)/10 hover:bg-(--ui-warning)/15 disabled:bg-(--ui-warning)/10 aria-disabled:bg-(--ui-warning)/10 focus-visible:ring-2 focus-visible:ring-(--ui-warning)"
    },
    {
      "color": "error",
      "variant": "subtle",
      "class": "text-(--ui-error) ring ring-inset ring-(--ui-error)/25 bg-(--ui-error)/10 hover:bg-(--ui-error)/15 disabled:bg-(--ui-error)/10 aria-disabled:bg-(--ui-error)/10 focus-visible:ring-2 focus-visible:ring-(--ui-error)"
    },
    {
      "color": "primary",
      "variant": "ghost",
      "class": "text-(--ui-primary) hover:bg-(--ui-primary)/10 focus-visible:bg-(--ui-primary)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "secondary",
      "variant": "ghost",
      "class": "text-(--ui-secondary) hover:bg-(--ui-secondary)/10 focus-visible:bg-(--ui-secondary)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "success",
      "variant": "ghost",
      "class": "text-(--ui-success) hover:bg-(--ui-success)/10 focus-visible:bg-(--ui-success)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "info",
      "variant": "ghost",
      "class": "text-(--ui-info) hover:bg-(--ui-info)/10 focus-visible:bg-(--ui-info)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "warning",
      "variant": "ghost",
      "class": "text-(--ui-warning) hover:bg-(--ui-warning)/10 focus-visible:bg-(--ui-warning)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "error",
      "variant": "ghost",
      "class": "text-(--ui-error) hover:bg-(--ui-error)/10 focus-visible:bg-(--ui-error)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "primary",
      "variant": "link",
      "class": "text-(--ui-primary) hover:text-(--ui-primary)/75 disabled:text-(--ui-primary) aria-disabled:text-(--ui-primary) focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-primary)"
    },
    {
      "color": "secondary",
      "variant": "link",
      "class": "text-(--ui-secondary) hover:text-(--ui-secondary)/75 disabled:text-(--ui-secondary) aria-disabled:text-(--ui-secondary) focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-secondary)"
    },
    {
      "color": "success",
      "variant": "link",
      "class": "text-(--ui-success) hover:text-(--ui-success)/75 disabled:text-(--ui-success) aria-disabled:text-(--ui-success) focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-success)"
    },
    {
      "color": "info",
      "variant": "link",
      "class": "text-(--ui-info) hover:text-(--ui-info)/75 disabled:text-(--ui-info) aria-disabled:text-(--ui-info) focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-info)"
    },
    {
      "color": "warning",
      "variant": "link",
      "class": "text-(--ui-warning) hover:text-(--ui-warning)/75 disabled:text-(--ui-warning) aria-disabled:text-(--ui-warning) focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-warning)"
    },
    {
      "color": "error",
      "variant": "link",
      "class": "text-(--ui-error) hover:text-(--ui-error)/75 disabled:text-(--ui-error) aria-disabled:text-(--ui-error) focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-error)"
    },
    {
      "color": "neutral",
      "variant": "solid",
      "class": "text-(--ui-bg) bg-(--ui-bg-inverted) hover:bg-(--ui-bg-inverted)/90 disabled:bg-(--ui-bg-inverted) aria-disabled:bg-(--ui-bg-inverted) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-border-inverted)"
    },
    {
      "color": "neutral",
      "variant": "outline",
      "class": "ring ring-inset ring-(--ui-border-accented) text-(--ui-text) bg-(--ui-bg) hover:bg-(--ui-bg-elevated) disabled:bg-(--ui-bg) aria-disabled:bg-(--ui-bg) focus-visible:ring-2 focus-visible:ring-(--ui-border-inverted)"
    },
    {
      "color": "neutral",
      "variant": "soft",
      "class": "text-(--ui-text) bg-(--ui-bg-elevated) hover:bg-(--ui-bg-accented)/75 focus-visible:bg-(--ui-bg-accented)/75 disabled:bg-(--ui-bg-elevated) aria-disabled:bg-(--ui-bg-elevated)"
    },
    {
      "color": "neutral",
      "variant": "subtle",
      "class": "ring ring-inset ring-(--ui-border-accented) text-(--ui-text) bg-(--ui-bg-elevated) hover:bg-(--ui-bg-accented)/75 disabled:bg-(--ui-bg-elevated) aria-disabled:bg-(--ui-bg-elevated) focus-visible:ring-2 focus-visible:ring-(--ui-border-inverted)"
    },
    {
      "color": "neutral",
      "variant": "ghost",
      "class": "text-(--ui-text) hover:bg-(--ui-bg-elevated) focus-visible:bg-(--ui-bg-elevated) hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent"
    },
    {
      "color": "neutral",
      "variant": "link",
      "class": "text-(--ui-text-muted) hover:text-(--ui-text) disabled:text-(--ui-text-muted) aria-disabled:text-(--ui-text-muted) focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-(--ui-border-inverted)"
    },
    {
      "size": "xs",
      "square": true,
      "class": "p-1"
    },
    {
      "size": "sm",
      "square": true,
      "class": "p-1.5"
    },
    {
      "size": "md",
      "square": true,
      "class": "p-1.5"
    },
    {
      "size": "lg",
      "square": true,
      "class": "p-2"
    },
    {
      "size": "xl",
      "square": true,
      "class": "p-2"
    },
    {
      "loading": true,
      "leading": true,
      "class": {
        "leadingIcon": "animate-spin"
      }
    },
    {
      "loading": true,
      "leading": false,
      "trailing": true,
      "class": {
        "trailingIcon": "animate-spin"
      }
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "variant": "solid",
    "size": "md"
  }
};

var _a$2;
const appConfigButton = _appConfig;
const button = tv({ extend: tv(theme$2), ...((_a$2 = appConfigButton.ui) == null ? void 0 : _a$2.button) || {} });
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "Button",
  __ssrInlineRender: true,
  props: {
    label: {},
    color: {},
    activeColor: {},
    variant: {},
    activeVariant: {},
    size: {},
    square: { type: Boolean },
    block: { type: Boolean },
    loadingAuto: { type: Boolean },
    onClick: {},
    class: {},
    ui: {},
    icon: {},
    avatar: {},
    leading: { type: Boolean },
    leadingIcon: {},
    trailing: { type: Boolean },
    trailingIcon: {},
    loading: { type: Boolean },
    loadingIcon: {},
    as: {},
    type: {},
    disabled: { type: Boolean },
    active: { type: Boolean, default: void 0 },
    exact: { type: Boolean },
    exactQuery: { type: [Boolean, String] },
    exactHash: { type: Boolean },
    inactiveClass: { default: "" },
    to: {},
    href: {},
    external: { type: Boolean },
    target: {},
    rel: {},
    noRel: { type: Boolean },
    prefetchedClass: {},
    prefetch: { type: Boolean },
    prefetchOn: {},
    noPrefetch: { type: Boolean },
    activeClass: { default: "" },
    exactActiveClass: {},
    ariaCurrentValue: {},
    viewTransition: { type: Boolean },
    replace: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const linkProps = useForwardProps(pickLinkProps(props));
    const { orientation, size: buttonSize } = useButtonGroup(props);
    const loadingAutoState = ref(false);
    const formLoading = inject(formLoadingInjectionKey, void 0);
    async function onClickWrapper(event) {
      loadingAutoState.value = true;
      const callbacks = Array.isArray(props.onClick) ? props.onClick : [props.onClick];
      try {
        await Promise.all(callbacks.map((fn) => fn == null ? void 0 : fn(event)));
      } finally {
        loadingAutoState.value = false;
      }
    }
    const isLoading = computed(() => {
      return props.loading || props.loadingAuto && (loadingAutoState.value || (formLoading == null ? void 0 : formLoading.value) && props.type === "submit");
    });
    const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(
      computed(() => ({ ...props, loading: isLoading.value }))
    );
    const ui = computed(() => tv({
      extend: button,
      variants: {
        active: {
          true: {
            base: props.activeClass
          },
          false: {
            base: props.inactiveClass
          }
        }
      }
    })({
      color: props.color,
      variant: props.variant,
      size: buttonSize.value,
      loading: isLoading.value,
      block: props.block,
      square: props.square || !slots.default && !props.label,
      leading: isLeading.value,
      trailing: isTrailing.value,
      buttonGroup: orientation.value
    }));
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      _push(ssrRenderComponent(_sfc_main$8, mergeProps({
        type: _ctx.type,
        disabled: _ctx.disabled || isLoading.value,
        class: ui.value.base({ class: [props.class, (_a2 = props.ui) == null ? void 0 : _a2.base] })
      }, unref(omit)(unref(linkProps), ["type", "disabled"]), { custom: "" }, _attrs), {
        default: withCtx(({ active, ...slotProps }, _push2, _parent2, _scopeId) => {
          var _a3, _b;
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$9, mergeProps(slotProps, {
              class: ui.value.base({
                class: [props.class, (_a3 = props.ui) == null ? void 0 : _a3.base],
                active,
                ...active && _ctx.activeVariant ? { variant: _ctx.activeVariant } : {},
                ...active && _ctx.activeColor ? { color: _ctx.activeColor } : {}
              }),
              onClick: onClickWrapper
            }), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "leading", {}, () => {
                    var _a4, _b2, _c;
                    if (unref(isLeading) && unref(leadingIconName)) {
                      _push3(ssrRenderComponent(_sfc_main$c, {
                        name: unref(leadingIconName),
                        class: ui.value.leadingIcon({ class: (_a4 = props.ui) == null ? void 0 : _a4.leadingIcon, active })
                      }, null, _parent3, _scopeId2));
                    } else if (!!_ctx.avatar) {
                      _push3(ssrRenderComponent(_sfc_main$a, mergeProps({
                        size: ((_b2 = props.ui) == null ? void 0 : _b2.leadingAvatarSize) || ui.value.leadingAvatarSize()
                      }, _ctx.avatar, {
                        class: ui.value.leadingAvatar({ class: (_c = props.ui) == null ? void 0 : _c.leadingAvatar, active })
                      }), null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  }, _push3, _parent3, _scopeId2);
                  ssrRenderSlot(_ctx.$slots, "default", {}, () => {
                    var _a4;
                    if (_ctx.label) {
                      _push3(`<span class="${ssrRenderClass(ui.value.label({ class: (_a4 = props.ui) == null ? void 0 : _a4.label, active }))}"${_scopeId2}>${ssrInterpolate(_ctx.label)}</span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                  }, _push3, _parent3, _scopeId2);
                  ssrRenderSlot(_ctx.$slots, "trailing", {}, () => {
                    var _a4;
                    if (unref(isTrailing) && unref(trailingIconName)) {
                      _push3(ssrRenderComponent(_sfc_main$c, {
                        name: unref(trailingIconName),
                        class: ui.value.trailingIcon({ class: (_a4 = props.ui) == null ? void 0 : _a4.trailingIcon, active })
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  }, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "leading", {}, () => {
                      var _a4, _b2, _c;
                      return [
                        unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$c, {
                          key: 0,
                          name: unref(leadingIconName),
                          class: ui.value.leadingIcon({ class: (_a4 = props.ui) == null ? void 0 : _a4.leadingIcon, active })
                        }, null, 8, ["name", "class"])) : !!_ctx.avatar ? (openBlock(), createBlock(_sfc_main$a, mergeProps({
                          key: 1,
                          size: ((_b2 = props.ui) == null ? void 0 : _b2.leadingAvatarSize) || ui.value.leadingAvatarSize()
                        }, _ctx.avatar, {
                          class: ui.value.leadingAvatar({ class: (_c = props.ui) == null ? void 0 : _c.leadingAvatar, active })
                        }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                      ];
                    }),
                    renderSlot(_ctx.$slots, "default", {}, () => {
                      var _a4;
                      return [
                        _ctx.label ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: ui.value.label({ class: (_a4 = props.ui) == null ? void 0 : _a4.label, active })
                        }, toDisplayString(_ctx.label), 3)) : createCommentVNode("", true)
                      ];
                    }),
                    renderSlot(_ctx.$slots, "trailing", {}, () => {
                      var _a4;
                      return [
                        unref(isTrailing) && unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$c, {
                          key: 0,
                          name: unref(trailingIconName),
                          class: ui.value.trailingIcon({ class: (_a4 = props.ui) == null ? void 0 : _a4.trailingIcon, active })
                        }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                      ];
                    })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$9, mergeProps(slotProps, {
                class: ui.value.base({
                  class: [props.class, (_b = props.ui) == null ? void 0 : _b.base],
                  active,
                  ...active && _ctx.activeVariant ? { variant: _ctx.activeVariant } : {},
                  ...active && _ctx.activeColor ? { color: _ctx.activeColor } : {}
                }),
                onClick: onClickWrapper
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "leading", {}, () => {
                    var _a4, _b2, _c;
                    return [
                      unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$c, {
                        key: 0,
                        name: unref(leadingIconName),
                        class: ui.value.leadingIcon({ class: (_a4 = props.ui) == null ? void 0 : _a4.leadingIcon, active })
                      }, null, 8, ["name", "class"])) : !!_ctx.avatar ? (openBlock(), createBlock(_sfc_main$a, mergeProps({
                        key: 1,
                        size: ((_b2 = props.ui) == null ? void 0 : _b2.leadingAvatarSize) || ui.value.leadingAvatarSize()
                      }, _ctx.avatar, {
                        class: ui.value.leadingAvatar({ class: (_c = props.ui) == null ? void 0 : _c.leadingAvatar, active })
                      }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                    ];
                  }),
                  renderSlot(_ctx.$slots, "default", {}, () => {
                    var _a4;
                    return [
                      _ctx.label ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: ui.value.label({ class: (_a4 = props.ui) == null ? void 0 : _a4.label, active })
                      }, toDisplayString(_ctx.label), 3)) : createCommentVNode("", true)
                    ];
                  }),
                  renderSlot(_ctx.$slots, "trailing", {}, () => {
                    var _a4;
                    return [
                      unref(isTrailing) && unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$c, {
                        key: 0,
                        name: unref(trailingIconName),
                        class: ui.value.trailingIcon({ class: (_a4 = props.ui) == null ? void 0 : _a4.trailingIcon, active })
                      }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                    ];
                  })
                ]),
                _: 2
              }, 1040, ["class"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});

const theme$1 = {
  "slots": {
    "root": "relative group overflow-hidden bg-(--ui-bg) shadow-lg rounded-[calc(var(--ui-radius)*2)] ring ring-(--ui-border) p-4 flex gap-2.5 focus:outline-none",
    "wrapper": "w-0 flex-1 flex flex-col",
    "title": "text-sm font-medium text-(--ui-text-highlighted)",
    "description": "text-sm text-(--ui-text-muted)",
    "icon": "shrink-0 size-5",
    "avatar": "shrink-0",
    "avatarSize": "2xl",
    "actions": "flex gap-1.5 shrink-0",
    "progress": "absolute inset-x-0 bottom-0 h-1 z-[-1]",
    "close": "p-0"
  },
  "variants": {
    "color": {
      "primary": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-primary)",
        "icon": "text-(--ui-primary)",
        "progress": "bg-(--ui-primary)"
      },
      "secondary": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-secondary)",
        "icon": "text-(--ui-secondary)",
        "progress": "bg-(--ui-secondary)"
      },
      "success": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-success)",
        "icon": "text-(--ui-success)",
        "progress": "bg-(--ui-success)"
      },
      "info": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-info)",
        "icon": "text-(--ui-info)",
        "progress": "bg-(--ui-info)"
      },
      "warning": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-warning)",
        "icon": "text-(--ui-warning)",
        "progress": "bg-(--ui-warning)"
      },
      "error": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-error)",
        "icon": "text-(--ui-error)",
        "progress": "bg-(--ui-error)"
      },
      "neutral": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-border-inverted)",
        "icon": "text-(--ui-text-highlighted)",
        "progress": "bg-(--ui-bg-inverted)"
      }
    },
    "orientation": {
      "horizontal": {
        "root": "items-center",
        "actions": "items-center"
      },
      "vertical": {
        "root": "items-start",
        "actions": "items-start mt-2.5"
      }
    },
    "title": {
      "true": {
        "description": "mt-1"
      }
    }
  },
  "defaultVariants": {
    "color": "primary"
  }
};

var _a$1;
const appConfigToast = _appConfig;
const toast = tv({ extend: tv(theme$1), ...((_a$1 = appConfigToast.ui) == null ? void 0 : _a$1.toast) || {} });
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "Toast",
  __ssrInlineRender: true,
  props: {
    as: {},
    title: {},
    description: {},
    icon: {},
    avatar: {},
    color: {},
    orientation: { default: "vertical" },
    actions: {},
    close: { type: [Boolean, Object], default: true },
    closeIcon: {},
    class: {},
    ui: {},
    defaultOpen: { type: Boolean },
    open: { type: Boolean },
    type: {},
    duration: {}
  },
  emits: ["escapeKeyDown", "pause", "resume", "swipeStart", "swipeMove", "swipeCancel", "swipeEnd", "update:open"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const { t } = useLocale();
    const appConfig = useAppConfig();
    const rootProps = useForwardPropsEmits(reactivePick(props, "as", "defaultOpen", "open", "duration", "type"), emits);
    const ui = computed(() => toast({
      color: props.color,
      orientation: props.orientation,
      title: !!props.title || !!slots.title
    }));
    const el = ref();
    const height = ref(0);
    __expose({
      height
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      _push(ssrRenderComponent(unref(ToastRoot), mergeProps({
        ref_key: "el",
        ref: el
      }, unref(rootProps), {
        "data-orientation": _ctx.orientation,
        class: ui.value.root({ class: [props.class, (_a2 = props.ui) == null ? void 0 : _a2.root] }),
        style: { "--height": height.value }
      }, _attrs), {
        default: withCtx(({ remaining, duration }, _push2, _parent2, _scopeId) => {
          var _a3, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "leading", {}, () => {
              var _a4, _b2, _c2;
              if (_ctx.avatar) {
                _push2(ssrRenderComponent(_sfc_main$a, mergeProps({
                  size: ((_a4 = props.ui) == null ? void 0 : _a4.avatarSize) || ui.value.avatarSize()
                }, _ctx.avatar, {
                  class: ui.value.avatar({ class: (_b2 = props.ui) == null ? void 0 : _b2.avatar })
                }), null, _parent2, _scopeId));
              } else if (_ctx.icon) {
                _push2(ssrRenderComponent(_sfc_main$c, {
                  name: _ctx.icon,
                  class: ui.value.icon({ class: (_c2 = props.ui) == null ? void 0 : _c2.icon })
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
            _push2(`<div class="${ssrRenderClass(ui.value.wrapper({ class: (_a3 = props.ui) == null ? void 0 : _a3.wrapper }))}"${_scopeId}>`);
            if (_ctx.title || !!slots.title) {
              _push2(ssrRenderComponent(unref(ToastTitle), {
                class: ui.value.title({ class: (_b = props.ui) == null ? void 0 : _b.title })
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                      if (typeof _ctx.title === "function") {
                        ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(_ctx.title()), null, null), _parent3, _scopeId2);
                      } else if (typeof _ctx.title === "object") {
                        ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(_ctx.title), null, null), _parent3, _scopeId2);
                      } else {
                        _push3(`<!--[-->${ssrInterpolate(_ctx.title)}<!--]-->`);
                      }
                    }, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "title", {}, () => [
                        typeof _ctx.title === "function" ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.title()), { key: 0 })) : typeof _ctx.title === "object" ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.title), { key: 1 })) : (openBlock(), createBlock(Fragment, { key: 2 }, [
                          createTextVNode(toDisplayString(_ctx.title), 1)
                        ], 64))
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.description || !!slots.description) {
              _push2(ssrRenderComponent(unref(ToastDescription), {
                class: ui.value.description({ class: (_c = props.ui) == null ? void 0 : _c.description })
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                      if (typeof _ctx.description === "function") {
                        ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(_ctx.description()), null, null), _parent3, _scopeId2);
                      } else if (typeof _ctx.description === "object") {
                        ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(_ctx.description), null, null), _parent3, _scopeId2);
                      } else {
                        _push3(`<!--[-->${ssrInterpolate(_ctx.description)}<!--]-->`);
                      }
                    }, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "description", {}, () => [
                        typeof _ctx.description === "function" ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.description()), { key: 0 })) : typeof _ctx.description === "object" ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.description), { key: 1 })) : (openBlock(), createBlock(Fragment, { key: 2 }, [
                          createTextVNode(toDisplayString(_ctx.description), 1)
                        ], 64))
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.orientation === "vertical" && ((_d = _ctx.actions) == null ? void 0 : _d.length)) {
              _push2(`<div class="${ssrRenderClass(ui.value.actions({ class: (_e = props.ui) == null ? void 0 : _e.actions }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "actions", {}, () => {
                _push2(`<!--[-->`);
                ssrRenderList(_ctx.actions, (action, index) => {
                  _push2(ssrRenderComponent(unref(ToastAction), {
                    key: index,
                    "alt-text": action.label || "Action",
                    "as-child": "",
                    onClick: () => {
                    }
                  }, {
                    default: withCtx((_, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(ssrRenderComponent(_sfc_main$7, mergeProps({
                          size: "xs",
                          color: _ctx.color,
                          ref_for: true
                        }, action), null, _parent3, _scopeId2));
                      } else {
                        return [
                          createVNode(_sfc_main$7, mergeProps({
                            size: "xs",
                            color: _ctx.color,
                            ref_for: true
                          }, action), null, 16, ["color"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                });
                _push2(`<!--]-->`);
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (_ctx.orientation === "horizontal" && ((_f = _ctx.actions) == null ? void 0 : _f.length) || _ctx.close) {
              _push2(`<div class="${ssrRenderClass(ui.value.actions({ class: (_g = props.ui) == null ? void 0 : _g.actions, orientation: "horizontal" }))}"${_scopeId}>`);
              if (_ctx.orientation === "horizontal" && ((_h = _ctx.actions) == null ? void 0 : _h.length)) {
                ssrRenderSlot(_ctx.$slots, "actions", {}, () => {
                  _push2(`<!--[-->`);
                  ssrRenderList(_ctx.actions, (action, index) => {
                    _push2(ssrRenderComponent(unref(ToastAction), {
                      key: index,
                      "alt-text": action.label || "Action",
                      "as-child": "",
                      onClick: () => {
                      }
                    }, {
                      default: withCtx((_, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(ssrRenderComponent(_sfc_main$7, mergeProps({
                            size: "xs",
                            color: _ctx.color,
                            ref_for: true
                          }, action), null, _parent3, _scopeId2));
                        } else {
                          return [
                            createVNode(_sfc_main$7, mergeProps({
                              size: "xs",
                              color: _ctx.color,
                              ref_for: true
                            }, action), null, 16, ["color"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent2, _scopeId));
                  });
                  _push2(`<!--]-->`);
                }, _push2, _parent2, _scopeId);
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(unref(ToastClose), { "as-child": "" }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "close", { ui: ui.value }, () => {
                      var _a4;
                      if (_ctx.close) {
                        _push3(ssrRenderComponent(_sfc_main$7, mergeProps({
                          icon: _ctx.closeIcon || unref(appConfig).ui.icons.close,
                          size: "md",
                          color: "neutral",
                          variant: "link",
                          "aria-label": unref(t)("toast.close")
                        }, typeof _ctx.close === "object" ? _ctx.close : {}, {
                          class: ui.value.close({ class: (_a4 = props.ui) == null ? void 0 : _a4.close }),
                          onClick: () => {
                          }
                        }), null, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                    }, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => {
                        var _a4;
                        return [
                          _ctx.close ? (openBlock(), createBlock(_sfc_main$7, mergeProps({
                            key: 0,
                            icon: _ctx.closeIcon || unref(appConfig).ui.icons.close,
                            size: "md",
                            color: "neutral",
                            variant: "link",
                            "aria-label": unref(t)("toast.close")
                          }, typeof _ctx.close === "object" ? _ctx.close : {}, {
                            class: ui.value.close({ class: (_a4 = props.ui) == null ? void 0 : _a4.close }),
                            onClick: withModifiers(() => {
                            }, ["stop"])
                          }), null, 16, ["icon", "aria-label", "class", "onClick"])) : createCommentVNode("", true)
                        ];
                      })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (remaining > 0 && duration) {
              _push2(`<div class="${ssrRenderClass(ui.value.progress({ class: (_i = props.ui) == null ? void 0 : _i.progress }))}" style="${ssrRenderStyle({ width: `${remaining / duration * 100}%` })}"${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              renderSlot(_ctx.$slots, "leading", {}, () => {
                var _a4, _b2, _c2;
                return [
                  _ctx.avatar ? (openBlock(), createBlock(_sfc_main$a, mergeProps({
                    key: 0,
                    size: ((_a4 = props.ui) == null ? void 0 : _a4.avatarSize) || ui.value.avatarSize()
                  }, _ctx.avatar, {
                    class: ui.value.avatar({ class: (_b2 = props.ui) == null ? void 0 : _b2.avatar })
                  }), null, 16, ["size", "class"])) : _ctx.icon ? (openBlock(), createBlock(_sfc_main$c, {
                    key: 1,
                    name: _ctx.icon,
                    class: ui.value.icon({ class: (_c2 = props.ui) == null ? void 0 : _c2.icon })
                  }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                ];
              }),
              createVNode("div", {
                class: ui.value.wrapper({ class: (_j = props.ui) == null ? void 0 : _j.wrapper })
              }, [
                _ctx.title || !!slots.title ? (openBlock(), createBlock(unref(ToastTitle), {
                  key: 0,
                  class: ui.value.title({ class: (_k = props.ui) == null ? void 0 : _k.title })
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "title", {}, () => [
                      typeof _ctx.title === "function" ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.title()), { key: 0 })) : typeof _ctx.title === "object" ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.title), { key: 1 })) : (openBlock(), createBlock(Fragment, { key: 2 }, [
                        createTextVNode(toDisplayString(_ctx.title), 1)
                      ], 64))
                    ])
                  ]),
                  _: 3
                }, 8, ["class"])) : createCommentVNode("", true),
                _ctx.description || !!slots.description ? (openBlock(), createBlock(unref(ToastDescription), {
                  key: 1,
                  class: ui.value.description({ class: (_l = props.ui) == null ? void 0 : _l.description })
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "description", {}, () => [
                      typeof _ctx.description === "function" ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.description()), { key: 0 })) : typeof _ctx.description === "object" ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.description), { key: 1 })) : (openBlock(), createBlock(Fragment, { key: 2 }, [
                        createTextVNode(toDisplayString(_ctx.description), 1)
                      ], 64))
                    ])
                  ]),
                  _: 3
                }, 8, ["class"])) : createCommentVNode("", true),
                _ctx.orientation === "vertical" && ((_m = _ctx.actions) == null ? void 0 : _m.length) ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: ui.value.actions({ class: (_n = props.ui) == null ? void 0 : _n.actions })
                }, [
                  renderSlot(_ctx.$slots, "actions", {}, () => [
                    (openBlock(true), createBlock(Fragment, null, renderList(_ctx.actions, (action, index) => {
                      return openBlock(), createBlock(unref(ToastAction), {
                        key: index,
                        "alt-text": action.label || "Action",
                        "as-child": "",
                        onClick: withModifiers(() => {
                        }, ["stop"])
                      }, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$7, mergeProps({
                            size: "xs",
                            color: _ctx.color,
                            ref_for: true
                          }, action), null, 16, ["color"])
                        ]),
                        _: 2
                      }, 1032, ["alt-text", "onClick"]);
                    }), 128))
                  ])
                ], 2)) : createCommentVNode("", true)
              ], 2),
              _ctx.orientation === "horizontal" && ((_o = _ctx.actions) == null ? void 0 : _o.length) || _ctx.close ? (openBlock(), createBlock("div", {
                key: 0,
                class: ui.value.actions({ class: (_p = props.ui) == null ? void 0 : _p.actions, orientation: "horizontal" })
              }, [
                _ctx.orientation === "horizontal" && ((_q = _ctx.actions) == null ? void 0 : _q.length) ? renderSlot(_ctx.$slots, "actions", { key: 0 }, () => [
                  (openBlock(true), createBlock(Fragment, null, renderList(_ctx.actions, (action, index) => {
                    return openBlock(), createBlock(unref(ToastAction), {
                      key: index,
                      "alt-text": action.label || "Action",
                      "as-child": "",
                      onClick: withModifiers(() => {
                      }, ["stop"])
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$7, mergeProps({
                          size: "xs",
                          color: _ctx.color,
                          ref_for: true
                        }, action), null, 16, ["color"])
                      ]),
                      _: 2
                    }, 1032, ["alt-text", "onClick"]);
                  }), 128))
                ]) : createCommentVNode("", true),
                createVNode(unref(ToastClose), { "as-child": "" }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => {
                      var _a4;
                      return [
                        _ctx.close ? (openBlock(), createBlock(_sfc_main$7, mergeProps({
                          key: 0,
                          icon: _ctx.closeIcon || unref(appConfig).ui.icons.close,
                          size: "md",
                          color: "neutral",
                          variant: "link",
                          "aria-label": unref(t)("toast.close")
                        }, typeof _ctx.close === "object" ? _ctx.close : {}, {
                          class: ui.value.close({ class: (_a4 = props.ui) == null ? void 0 : _a4.close }),
                          onClick: withModifiers(() => {
                          }, ["stop"])
                        }), null, 16, ["icon", "aria-label", "class", "onClick"])) : createCommentVNode("", true)
                      ];
                    })
                  ]),
                  _: 3
                })
              ], 2)) : createCommentVNode("", true),
              remaining > 0 && duration ? (openBlock(), createBlock("div", {
                key: 1,
                class: ui.value.progress({ class: (_r = props.ui) == null ? void 0 : _r.progress }),
                style: { width: `${remaining / duration * 100}%` }
              }, null, 6)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});

const theme = {
  "slots": {
    "viewport": "fixed flex flex-col w-[calc(100%-2rem)] sm:w-96 z-[100] data-[expanded=true]:h-(--height) focus:outline-none",
    "base": "pointer-events-auto absolute inset-x-0 z-(--index) transform-(--transform) data-[expanded=false]:data-[front=false]:h-(--front-height) data-[expanded=false]:data-[front=false]:*:invisible data-[state=closed]:animate-[toast-closed_200ms_ease-in-out] data-[state=closed]:data-[expanded=false]:data-[front=false]:animate-[toast-collapsed-closed_200ms_ease-in-out] data-[swipe=move]:transition-none transition-[transform,translate,height] duration-200 ease-out"
  },
  "variants": {
    "position": {
      "top-left": {
        "viewport": "left-4"
      },
      "top-center": {
        "viewport": "left-1/2 transform -translate-x-1/2"
      },
      "top-right": {
        "viewport": "right-4"
      },
      "bottom-left": {
        "viewport": "left-4"
      },
      "bottom-center": {
        "viewport": "left-1/2 transform -translate-x-1/2"
      },
      "bottom-right": {
        "viewport": "right-4"
      }
    },
    "swipeDirection": {
      "up": "data-[swipe=end]:animate-[toast-slide-up_200ms_ease-out]",
      "right": "data-[swipe=end]:animate-[toast-slide-right_200ms_ease-out]",
      "down": "data-[swipe=end]:animate-[toast-slide-down_200ms_ease-out]",
      "left": "data-[swipe=end]:animate-[toast-slide-left_200ms_ease-out]"
    }
  },
  "compoundVariants": [
    {
      "position": [
        "top-left",
        "top-center",
        "top-right"
      ],
      "class": {
        "viewport": "top-4",
        "base": "top-0 data-[state=open]:animate-[slide-in-from-top_200ms_ease-in-out]"
      }
    },
    {
      "position": [
        "bottom-left",
        "bottom-center",
        "bottom-right"
      ],
      "class": {
        "viewport": "bottom-4",
        "base": "bottom-0 data-[state=open]:animate-[slide-in-from-bottom_200ms_ease-in-out]"
      }
    },
    {
      "swipeDirection": [
        "left",
        "right"
      ],
      "class": "data-[swipe=move]:translate-x-(--reka-toast-swipe-move-x) data-[swipe=end]:translate-x-(--reka-toast-swipe-end-x) data-[swipe=cancel]:translate-x-0"
    },
    {
      "swipeDirection": [
        "up",
        "down"
      ],
      "class": "data-[swipe=move]:translate-y-(--reka-toast-swipe-move-y) data-[swipe=end]:translate-y-(--reka-toast-swipe-end-y) data-[swipe=cancel]:translate-y-0"
    }
  ],
  "defaultVariants": {
    "position": "bottom-right"
  }
};

var _a;
const appConfigToaster = _appConfig;
const toaster = tv({ extend: tv(theme), ...((_a = appConfigToaster.ui) == null ? void 0 : _a.toaster) || {} });
const __default__$1 = {
  name: "Toaster"
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  ...__default__$1,
  __ssrInlineRender: true,
  props: {
    position: {},
    expand: { type: Boolean, default: true },
    portal: { type: Boolean, default: true },
    class: {},
    ui: {},
    label: {},
    duration: { default: 5e3 },
    swipeThreshold: {}
  },
  setup(__props) {
    const props = __props;
    const providerProps = useForwardProps(reactivePick(props, "duration", "label", "swipeThreshold"));
    const { toasts, remove } = useToast();
    const swipeDirection = computed(() => {
      switch (props.position) {
        case "top-center":
          return "up";
        case "top-right":
        case "bottom-right":
          return "right";
        case "bottom-center":
          return "down";
        case "top-left":
        case "bottom-left":
          return "left";
      }
      return "right";
    });
    const ui = computed(() => toaster({
      position: props.position,
      swipeDirection: swipeDirection.value
    }));
    function onUpdateOpen(value, id) {
      if (value) {
        return;
      }
      remove(id);
    }
    const hovered = ref(false);
    const expanded = computed(() => props.expand || hovered.value);
    const refs = ref([]);
    const height = computed(() => refs.value.reduce((acc, { height: height2 }) => acc + height2 + 16, 0));
    const frontHeight = computed(() => {
      var _a2;
      return ((_a2 = refs.value[refs.value.length - 1]) == null ? void 0 : _a2.height) || 0;
    });
    function getOffset(index) {
      return refs.value.slice(index + 1).reduce((acc, { height: height2 }) => acc + height2 + 16, 0);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ToastProvider), mergeProps({ "swipe-direction": swipeDirection.value }, unref(providerProps), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`<!--[-->`);
            ssrRenderList(unref(toasts), (toast, index) => {
              _push2(ssrRenderComponent(_sfc_main$6, mergeProps({
                key: toast.id,
                ref_for: true,
                ref_key: "refs",
                ref: refs
              }, unref(omit)(toast, ["id", "close"]), {
                close: toast.close,
                "data-expanded": expanded.value,
                "data-front": !expanded.value && index === unref(toasts).length - 1,
                style: {
                  "--index": index - unref(toasts).length + unref(toasts).length,
                  "--before": unref(toasts).length - 1 - index,
                  "--offset": getOffset(index),
                  "--scale": expanded.value ? "1" : "calc(1 - var(--before) * var(--scale-factor))",
                  "--translate": expanded.value ? "calc(var(--offset) * var(--translate-factor))" : "calc(var(--before) * var(--gap))",
                  "--transform": "translateY(var(--translate)) scale(var(--scale))"
                },
                class: [ui.value.base(), {
                  "cursor-pointer": !!toast.onClick
                }],
                "onUpdate:open": ($event) => onUpdateOpen($event, toast.id),
                onClick: ($event) => toast.onClick && toast.onClick(toast)
              }), null, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
            _push2(ssrRenderComponent(unref(ToastPortal), {
              disabled: !_ctx.portal
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a2, _b, _c, _d, _e, _f;
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ToastViewport), {
                    "data-expanded": expanded.value,
                    class: ui.value.viewport({ class: [props.class, (_a2 = props.ui) == null ? void 0 : _a2.viewport] }),
                    style: {
                      "--scale-factor": "0.05",
                      "--translate-factor": ((_b = _ctx.position) == null ? void 0 : _b.startsWith("top")) ? "1px" : "-1px",
                      "--gap": ((_c = _ctx.position) == null ? void 0 : _c.startsWith("top")) ? "16px" : "-16px",
                      "--front-height": `${frontHeight.value}px`,
                      "--height": `${height.value}px`
                    },
                    onMouseenter: ($event) => hovered.value = true,
                    onMouseleave: ($event) => hovered.value = false
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ToastViewport), {
                      "data-expanded": expanded.value,
                      class: ui.value.viewport({ class: [props.class, (_d = props.ui) == null ? void 0 : _d.viewport] }),
                      style: {
                        "--scale-factor": "0.05",
                        "--translate-factor": ((_e = _ctx.position) == null ? void 0 : _e.startsWith("top")) ? "1px" : "-1px",
                        "--gap": ((_f = _ctx.position) == null ? void 0 : _f.startsWith("top")) ? "16px" : "-16px",
                        "--front-height": `${frontHeight.value}px`,
                        "--height": `${height.value}px`
                      },
                      onMouseenter: ($event) => hovered.value = true,
                      onMouseleave: ($event) => hovered.value = false
                    }, null, 8, ["data-expanded", "class", "style", "onMouseenter", "onMouseleave"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              renderSlot(_ctx.$slots, "default"),
              (openBlock(true), createBlock(Fragment, null, renderList(unref(toasts), (toast, index) => {
                return openBlock(), createBlock(_sfc_main$6, mergeProps({
                  key: toast.id,
                  ref_for: true,
                  ref_key: "refs",
                  ref: refs
                }, unref(omit)(toast, ["id", "close"]), {
                  close: toast.close,
                  "data-expanded": expanded.value,
                  "data-front": !expanded.value && index === unref(toasts).length - 1,
                  style: {
                    "--index": index - unref(toasts).length + unref(toasts).length,
                    "--before": unref(toasts).length - 1 - index,
                    "--offset": getOffset(index),
                    "--scale": expanded.value ? "1" : "calc(1 - var(--before) * var(--scale-factor))",
                    "--translate": expanded.value ? "calc(var(--offset) * var(--translate-factor))" : "calc(var(--before) * var(--gap))",
                    "--transform": "translateY(var(--translate)) scale(var(--scale))"
                  },
                  class: [ui.value.base(), {
                    "cursor-pointer": !!toast.onClick
                  }],
                  "onUpdate:open": ($event) => onUpdateOpen($event, toast.id),
                  onClick: ($event) => toast.onClick && toast.onClick(toast)
                }), null, 16, ["close", "data-expanded", "data-front", "style", "class", "onUpdate:open", "onClick"]);
              }), 128)),
              createVNode(unref(ToastPortal), {
                disabled: !_ctx.portal
              }, {
                default: withCtx(() => {
                  var _a2, _b, _c;
                  return [
                    createVNode(unref(ToastViewport), {
                      "data-expanded": expanded.value,
                      class: ui.value.viewport({ class: [props.class, (_a2 = props.ui) == null ? void 0 : _a2.viewport] }),
                      style: {
                        "--scale-factor": "0.05",
                        "--translate-factor": ((_b = _ctx.position) == null ? void 0 : _b.startsWith("top")) ? "1px" : "-1px",
                        "--gap": ((_c = _ctx.position) == null ? void 0 : _c.startsWith("top")) ? "16px" : "-16px",
                        "--front-height": `${frontHeight.value}px`,
                        "--height": `${height.value}px`
                      },
                      onMouseenter: ($event) => hovered.value = true,
                      onMouseleave: ($event) => hovered.value = false
                    }, null, 8, ["data-expanded", "class", "style", "onMouseenter", "onMouseleave"])
                  ];
                }),
                _: 1
              }, 8, ["disabled"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});

function _useOverlay() {
  const overlays = shallowReactive([]);
  const create = (component, _options) => {
    const { props, defaultOpen, destroyOnClose } = _options || {};
    const options = reactive({
      id: Symbol(""),
      modelValue: !!defaultOpen,
      component: markRaw(component),
      isMounted: !!defaultOpen,
      destroyOnClose: !!destroyOnClose,
      props: props || {}
    });
    overlays.push(options);
    return {
      open: (props2) => open(options.id, props2),
      close: (value) => close(options.id, value),
      patch: (props2) => patch(options.id, props2)
    };
  };
  const open = (id, props) => {
    const overlay = getOverlay(id);
    if (props) {
      patch(overlay.id, props);
    }
    overlay.modelValue = true;
    overlay.isMounted = true;
    return new Promise((resolve) => {
      overlay.resolvePromise = resolve;
    });
  };
  const close = (id, value) => {
    const overlay = getOverlay(id);
    overlay.modelValue = false;
    if (overlay.resolvePromise) {
      overlay.resolvePromise(value);
      overlay.resolvePromise = void 0;
    }
  };
  const unMount = (id) => {
    const overlay = getOverlay(id);
    overlay.isMounted = false;
    if (overlay.destroyOnClose) {
      const index = overlays.findIndex((overlay2) => overlay2.id === id);
      overlays.splice(index, 1);
    }
  };
  const patch = (id, props) => {
    const overlay = getOverlay(id);
    Object.entries(props).forEach(([key, value]) => {
      overlay.props[key] = value;
    });
  };
  const getOverlay = (id) => {
    const overlay = overlays.find((overlay2) => overlay2.id === id);
    if (!overlay) {
      throw new Error("Overlay not found");
    }
    return overlay;
  };
  return {
    overlays,
    open,
    close,
    create,
    patch,
    unMount
  };
}
const useOverlay = createSharedComposable(_useOverlay);

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "OverlayProvider",
  __ssrInlineRender: true,
  setup(__props) {
    const { overlays, unMount, close } = useOverlay();
    const mountedOverlays = computed(() => overlays.filter((overlay) => overlay.isMounted));
    const onAfterLeave = (id) => {
      close(id);
      unMount(id);
    };
    const onClose = (id, value) => {
      close(id, value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      ssrRenderList(mountedOverlays.value, (overlay) => {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(overlay.component), mergeProps({
          key: overlay.id,
          ref_for: true
        }, overlay.props, {
          open: overlay.modelValue,
          "onUpdate:open": ($event) => overlay.modelValue = $event,
          onClose: (value) => onClose(overlay.id, value),
          "onAfter:leave": ($event) => onAfterLeave(overlay.id)
        }), null), _parent);
      });
      _push(`<!--]-->`);
    };
  }
});

const __default__ = {
  name: "App"
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  props: {
    tooltip: {},
    toaster: {},
    locale: {},
    scrollBody: { type: [Boolean, Object] },
    nonce: {}
  },
  setup(__props) {
    const props = __props;
    const configProviderProps = useForwardProps(reactivePick(props, "scrollBody"));
    const tooltipProps = toRef(() => props.tooltip);
    const toasterProps = toRef(() => props.toaster);
    const locale = toRef(() => props.locale);
    provide(localeContextInjectionKey, locale);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      _push(ssrRenderComponent(unref(ConfigProvider), mergeProps({
        "use-id": () => useId(),
        dir: (_a = locale.value) == null ? void 0 : _a.dir,
        locale: (_b = locale.value) == null ? void 0 : _b.code
      }, unref(configProviderProps), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(TooltipProvider), tooltipProps.value, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (_ctx.toaster !== null) {
                    _push3(ssrRenderComponent(_sfc_main$5, toasterProps.value, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          ssrRenderSlot(_ctx.$slots, "default", {}, null, _push4, _parent4, _scopeId3);
                        } else {
                          return [
                            renderSlot(_ctx.$slots, "default")
                          ];
                        }
                      }),
                      _: 3
                    }, _parent3, _scopeId2));
                  } else {
                    ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                  }
                  _push3(ssrRenderComponent(_sfc_main$4, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    _ctx.toaster !== null ? (openBlock(), createBlock(_sfc_main$5, mergeProps({ key: 0 }, toasterProps.value), {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "default")
                      ]),
                      _: 3
                    }, 16)) : renderSlot(_ctx.$slots, "default", { key: 1 }),
                    createVNode(_sfc_main$4)
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(TooltipProvider), tooltipProps.value, {
                default: withCtx(() => [
                  _ctx.toaster !== null ? (openBlock(), createBlock(_sfc_main$5, mergeProps({ key: 0 }, toasterProps.value), {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "default")
                    ]),
                    _: 3
                  }, 16)) : renderSlot(_ctx.$slots, "default", { key: 1 }),
                  createVNode(_sfc_main$4)
                ]),
                _: 3
              }, 16)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});

const layouts = {
  auth: defineAsyncComponent(() => import('./auth.vue.mjs').then((m) => m.default || m)),
  default: defineAsyncComponent(() => import('./default.vue.mjs').then((m) => m.default || m))
};

const LayoutLoader = defineComponent({
  name: "LayoutLoader",
  inheritAttrs: false,
  props: {
    name: String,
    layoutProps: Object
  },
  setup(props, context) {
    return () => h(layouts[props.name], props.layoutProps, context.slots);
  }
});
const nuxtLayoutProps = {
  name: {
    type: [String, Boolean, Object],
    default: null
  },
  fallback: {
    type: [String, Object],
    default: null
  }
};
const __nuxt_component_1$1 = defineComponent({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: nuxtLayoutProps,
  setup(props, context) {
    const nuxtApp = useNuxtApp();
    const injectedRoute = inject(PageRouteSymbol);
    const route = injectedRoute === useRoute() ? useRoute$1() : injectedRoute;
    const layout = computed(() => {
      let layout2 = unref(props.name) ?? route.meta.layout ?? "default";
      if (layout2 && !(layout2 in layouts)) {
        if (props.fallback) {
          layout2 = unref(props.fallback);
        }
      }
      return layout2;
    });
    const layoutRef = ref();
    context.expose({ layoutRef });
    const done = nuxtApp.deferHydration();
    return () => {
      const hasLayout = layout.value && layout.value in layouts;
      const transitionProps = route.meta.layoutTransition ?? appLayoutTransition;
      return _wrapInTransition(hasLayout && transitionProps, {
        default: () => h(Suspense, { suspensible: true, onResolve: () => {
          nextTick(done);
        } }, {
          default: () => h(
            LayoutProvider,
            {
              layoutProps: mergeProps(context.attrs, { ref: layoutRef }),
              key: layout.value || void 0,
              name: layout.value,
              shouldProvide: !props.name,
              hasTransition: !!transitionProps
            },
            context.slots
          )
        })
      }).default();
    };
  }
});
const LayoutProvider = defineComponent({
  name: "NuxtLayoutProvider",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean]
    },
    layoutProps: {
      type: Object
    },
    hasTransition: {
      type: Boolean
    },
    shouldProvide: {
      type: Boolean
    }
  },
  setup(props, context) {
    const name = props.name;
    if (props.shouldProvide) {
      provide(LayoutMetaSymbol, {
        isCurrent: (route) => name === (route.meta.layout ?? "default")
      });
    }
    return () => {
      var _a, _b;
      if (!name || typeof name === "string" && !(name in layouts)) {
        return (_b = (_a = context.slots).default) == null ? void 0 : _b.call(_a);
      }
      return h(
        LayoutLoader,
        { key: name, layoutProps: props.layoutProps, name },
        context.slots
      );
    };
  }
});

function defaultEstimatedProgress(duration, elapsed) {
  const completionPercentage = elapsed / duration * 100;
  return 2 / Math.PI * 100 * Math.atan(completionPercentage / 50);
}
function createLoadingIndicator(opts = {}) {
  const { duration = 2e3, throttle = 200, hideDelay = 500, resetDelay = 400 } = opts;
  opts.estimatedProgress || defaultEstimatedProgress;
  const nuxtApp = useNuxtApp();
  const progress = ref(0);
  const isLoading = ref(false);
  const error = ref(false);
  const start = (opts2 = {}) => {
    error.value = false;
    set(0, opts2);
  };
  function set(at = 0, opts2 = {}) {
    if (nuxtApp.isHydrating) {
      return;
    }
    if (at >= 100) {
      return finish({ force: opts2.force });
    }
    progress.value = at < 0 ? 0 : at;
    opts2.force ? 0 : throttle;
    {
      isLoading.value = true;
    }
  }
  function finish(opts2 = {}) {
    progress.value = 100;
    if (opts2.error) {
      error.value = true;
    }
    if (opts2.force) {
      progress.value = 0;
      isLoading.value = false;
    }
  }
  function clear() {
  }
  let _cleanup = () => {
  };
  return {
    _cleanup,
    progress: computed(() => progress.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    start,
    set,
    finish,
    clear
  };
}
function useLoadingIndicator(opts = {}) {
  const nuxtApp = useNuxtApp();
  const indicator = nuxtApp._loadingIndicator || (nuxtApp._loadingIndicator = createLoadingIndicator(opts));
  return indicator;
}

const __nuxt_component_2 = defineComponent({
  name: "NuxtLoadingIndicator",
  props: {
    throttle: {
      type: Number,
      default: 200
    },
    duration: {
      type: Number,
      default: 2e3
    },
    height: {
      type: Number,
      default: 3
    },
    color: {
      type: [String, Boolean],
      default: "repeating-linear-gradient(to right,#00dc82 0%,#34cdfe 50%,#0047e1 100%)"
    },
    errorColor: {
      type: String,
      default: "repeating-linear-gradient(to right,#f87171 0%,#ef4444 100%)"
    },
    estimatedProgress: {
      type: Function,
      required: false
    }
  },
  setup(props, { slots, expose }) {
    const { progress, isLoading, error, start, finish, clear } = useLoadingIndicator({
      duration: props.duration,
      throttle: props.throttle,
      estimatedProgress: props.estimatedProgress
    });
    expose({
      progress,
      isLoading,
      error,
      start,
      finish,
      clear
    });
    return () => h("div", {
      class: "nuxt-loading-indicator",
      style: {
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        pointerEvents: "none",
        width: "auto",
        height: `${props.height}px`,
        opacity: isLoading.value ? 1 : 0,
        background: error.value ? props.errorColor : props.color || void 0,
        backgroundSize: `${100 / progress.value * 100}% auto`,
        transform: `scaleX(${progress.value}%)`,
        transformOrigin: "left",
        transition: "transform 0.1s, height 0.4s, opacity 0.4s",
        zIndex: 999999
      }
    }, slots);
  }
});

const defineRouteProvider = (name = "RouteProvider") => defineComponent({
  name,
  props: {
    vnode: {
      type: Object,
      required: true
    },
    route: {
      type: Object,
      required: true
    },
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key],
        enumerable: true
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const RouteProvider = defineRouteProvider();

const __nuxt_component_1 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, slots, expose }) {
    const nuxtApp = useNuxtApp();
    const pageRef = ref();
    const forkRoute = inject(PageRouteSymbol, null);
    let previousPageKey;
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    let vnode;
    const done = nuxtApp.deferHydration();
    if (props.pageKey) {
      watch(() => props.pageKey, (next, prev) => {
        if (next !== prev) {
          nuxtApp.callHook("page:loading:start");
        }
      });
    }
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          if (!routeProps.Component) {
            done();
            return;
          }
          const key = generateRouteKey$1(routeProps, props.pageKey);
          if (!nuxtApp.isHydrating && !hasChildrenRoutes(forkRoute, routeProps.route, routeProps.Component) && previousPageKey === key) {
            nuxtApp.callHook("page:loading:end");
          }
          previousPageKey = key;
          {
            vnode = h(Suspense, {
              suspensible: true
            }, {
              default: () => {
                const providerVNode = h(RouteProvider, {
                  key: key || void 0,
                  vnode: slots.default ? normalizeSlot(slots.default, routeProps) : routeProps.Component,
                  route: routeProps.route,
                  renderKey: key || void 0,
                  vnodeRef: pageRef
                });
                return providerVNode;
              }
            });
            return vnode;
          }
        }
      });
    };
  }
});
function hasChildrenRoutes(fork, newRoute, Component) {
  if (!fork) {
    return false;
  }
  const index = newRoute.matched.findIndex((m) => {
    var _a;
    return ((_a = m.components) == null ? void 0 : _a.default) === (Component == null ? void 0 : Component.type);
  });
  return index < newRoute.matched.length - 1;
}
function normalizeSlot(slot, data) {
  const slotContent = slot(data);
  return slotContent.length === 1 ? h(slotContent[0]) : h(Fragment, void 0, slotContent);
}

const _sfc_main$2 = {
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    const appConfig = useAppConfig();
    appConfig.ui = appConfig.ui || {};
    appConfig.ui.primary = "indigo";
    appConfig.ui.gray = "slate";
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UApp = _sfc_main$3;
      const _component_NuxtLayout = __nuxt_component_1$1;
      const _component_NuxtLoadingIndicator = __nuxt_component_2;
      const _component_NuxtPage = __nuxt_component_1;
      _push(ssrRenderComponent(_component_UApp, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLayout, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtLoadingIndicator, { color: "primary" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtPage, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtLoadingIndicator, { color: "primary" }),
                    createVNode(_component_NuxtPage)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtLayout, null, {
                default: withCtx(() => [
                  createVNode(_component_NuxtLoadingIndicator, { color: "primary" }),
                  createVNode(_component_NuxtPage)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};

const _sfc_main$1 = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const _error = props.error;
    _error.stack ? _error.stack.split("\n").splice(1).map((line) => {
      const text = line.replace("webpack:/", "").replace(".vue", ".js").trim();
      return {
        text,
        internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
      };
    }).map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n") : "";
    const statusCode = Number(_error.statusCode || 500);
    const is404 = statusCode === 404;
    const statusMessage = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
    const description = _error.message || _error.toString();
    const stack = void 0;
    const _Error404 = defineAsyncComponent(() => import('./error-404.vue.mjs'));
    const _Error = defineAsyncComponent(() => import('./error-500.vue.mjs'));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({ statusCode: unref(statusCode), statusMessage: unref(statusMessage), description: unref(description), stack: unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = defineAsyncComponent(() => import('./island-renderer.mjs').then((r) => r.default || r));
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(_sfc_main$2), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    var _a;
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      (_a = nuxt.payload).error || (_a.error = createError(error));
    }
    if (ssrContext == null ? void 0 : ssrContext._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ssrContext) => entry(ssrContext);

const server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: entry$1
});

export { __nuxt_component_0 as _, useFormField as a, _appConfig as b, createError as c, _sfc_main$7 as d, _sfc_main$c as e, useAppConfig as f, useNuxtApp as g, useRouter as h, injectHead as i, _sfc_main$b as j, useAvatarGroup as k, looseToNumber as l, useButtonGroup as m, useComponentIcons as n, _sfc_main$a as o, get as p, compare as q, formBusInjectionKey as r, formInputsInjectionKey as s, tv as t, useHead as u, formLoadingInjectionKey as v, formOptionsInjectionKey as w, __nuxt_component_1 as x, server as y };
//# sourceMappingURL=server.mjs.map
