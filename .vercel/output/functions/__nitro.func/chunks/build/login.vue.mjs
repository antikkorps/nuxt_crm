import { f as useAppConfig, a as useFormField, t as tv, e as _sfc_main$3, b as _appConfig, g as useNuxtApp, h as useRouter, d as _sfc_main$7, _ as __nuxt_component_0, u as useHead, j as _sfc_main$8 } from './server.mjs';
import { defineComponent, mergeModels, useSlots, useModel, useId, computed, unref, mergeProps, withCtx, createBlock, openBlock, createVNode, renderSlot, createTextVNode, toDisplayString, createCommentVNode, ref, reactive, resolveComponent, isRef, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrInterpolate, ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _sfc_main$4 } from './Card.vue2.mjs';
import { _ as _sfc_main$5, a as _sfc_main$6 } from './Input.vue2.mjs';
import { useForwardProps, Primitive, CheckboxRoot, CheckboxIndicator, Label } from 'reka-ui';
import { reactivePick } from '@vueuse/core';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@iconify/utils';
import 'consola';
import 'node:module';
import 'node:url';
import 'ipx';
import 'vue-router';
import 'os';
import 'tty';
import 'fs';
import 'path';
import 'crypto';
import 'child_process';
import 'fs/promises';
import 'util';
import 'async_hooks';
import 'events';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'unhead/utils';
import 'devalue';
import 'unhead/plugins';
import '@iconify/vue';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';

const theme = {
  "slots": {
    "root": "relative flex items-start",
    "base": "shrink-0 flex items-center justify-center rounded-(--ui-radius) text-(--ui-bg) ring ring-inset ring-(--ui-border-accented) focus-visible:outline-2 focus-visible:outline-offset-2",
    "container": "flex items-center",
    "wrapper": "ms-2",
    "icon": "shrink-0 size-full",
    "label": "block font-medium text-(--ui-text)",
    "description": "text-(--ui-text-muted)"
  },
  "variants": {
    "color": {
      "primary": "focus-visible:outline-(--ui-primary)",
      "secondary": "focus-visible:outline-(--ui-secondary)",
      "success": "focus-visible:outline-(--ui-success)",
      "info": "focus-visible:outline-(--ui-info)",
      "warning": "focus-visible:outline-(--ui-warning)",
      "error": "focus-visible:outline-(--ui-error)",
      "neutral": "focus-visible:outline-(--ui-border-inverted)"
    },
    "size": {
      "xs": {
        "base": "size-3",
        "container": "h-4",
        "wrapper": "text-xs"
      },
      "sm": {
        "base": "size-3.5",
        "container": "h-4",
        "wrapper": "text-xs"
      },
      "md": {
        "base": "size-4",
        "container": "h-5",
        "wrapper": "text-sm"
      },
      "lg": {
        "base": "size-4.5",
        "container": "h-5",
        "wrapper": "text-sm"
      },
      "xl": {
        "base": "size-5",
        "container": "h-6",
        "wrapper": "text-base"
      }
    },
    "required": {
      "true": {
        "label": "after:content-['*'] after:ms-0.5 after:text-(--ui-error)"
      }
    },
    "disabled": {
      "true": {
        "base": "cursor-not-allowed opacity-75",
        "label": "cursor-not-allowed opacity-75",
        "description": "cursor-not-allowed opacity-75"
      }
    },
    "checked": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "checked": true,
      "class": "ring-2 ring-(--ui-primary) bg-(--ui-primary)"
    },
    {
      "color": "secondary",
      "checked": true,
      "class": "ring-2 ring-(--ui-secondary) bg-(--ui-secondary)"
    },
    {
      "color": "success",
      "checked": true,
      "class": "ring-2 ring-(--ui-success) bg-(--ui-success)"
    },
    {
      "color": "info",
      "checked": true,
      "class": "ring-2 ring-(--ui-info) bg-(--ui-info)"
    },
    {
      "color": "warning",
      "checked": true,
      "class": "ring-2 ring-(--ui-warning) bg-(--ui-warning)"
    },
    {
      "color": "error",
      "checked": true,
      "class": "ring-2 ring-(--ui-error) bg-(--ui-error)"
    },
    {
      "color": "neutral",
      "checked": true,
      "class": "ring-2 ring-(--ui-border-inverted) bg-(--ui-bg-inverted)"
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary"
  }
};

var _a;
const appConfigCheckbox = _appConfig;
const checkbox = tv({ extend: tv(theme), ...((_a = appConfigCheckbox.ui) == null ? void 0 : _a.checkbox) || {} });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  ...{ inheritAttrs: false },
  __name: "Checkbox",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    as: {},
    label: {},
    description: {},
    color: {},
    size: {},
    icon: {},
    indeterminateIcon: {},
    class: {},
    ui: {},
    disabled: { type: Boolean },
    required: { type: Boolean },
    name: {},
    value: {},
    id: {},
    defaultValue: { type: [Boolean, String] }
  }, {
    "modelValue": { type: [Boolean, String], ...{ default: void 0 } },
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["change"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const props = __props;
    const slots = useSlots();
    const emits = __emit;
    const modelValue = useModel(__props, "modelValue");
    const rootProps = useForwardProps(reactivePick(props, "required", "value", "defaultValue"));
    const appConfig = useAppConfig();
    const { id: _id, emitFormChange, emitFormInput, size, color, name, disabled, ariaAttrs } = useFormField(props);
    const id = _id.value ?? useId();
    const ui = computed(() => checkbox({
      size: size.value,
      color: color.value,
      required: props.required,
      disabled: disabled.value,
      checked: Boolean(modelValue.value ?? props.defaultValue)
    }));
    function onUpdate(value) {
      const event = new Event("change", { target: { value } });
      emits("change", event);
      emitFormChange();
      emitFormInput();
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: _ctx.as,
        class: ui.value.root({ class: [props.class, (_a2 = props.ui) == null ? void 0 : _a2.root] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a3, _b, _c, _d, _e, _f, _g, _h, _i, _j;
          if (_push2) {
            _push2(`<div class="${ssrRenderClass(ui.value.container({ class: (_a3 = props.ui) == null ? void 0 : _a3.container }))}"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(CheckboxRoot), mergeProps({ id: unref(id) }, { ...unref(rootProps), ..._ctx.$attrs, ...unref(ariaAttrs) }, {
              modelValue: modelValue.value,
              "onUpdate:modelValue": [($event) => modelValue.value = $event, onUpdate],
              name: unref(name),
              disabled: unref(disabled),
              class: ui.value.base({ class: (_b = props.ui) == null ? void 0 : _b.base })
            }), {
              default: withCtx(({ modelValue: modelValue2 }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(CheckboxIndicator), { "as-child": "" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      var _a4, _b2, _c2, _d2;
                      if (_push4) {
                        if (modelValue2 === "indeterminate") {
                          _push4(ssrRenderComponent(_sfc_main$3, {
                            name: _ctx.indeterminateIcon || unref(appConfig).ui.icons.minus,
                            class: ui.value.icon({ class: (_a4 = props.ui) == null ? void 0 : _a4.icon })
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(ssrRenderComponent(_sfc_main$3, {
                            name: _ctx.icon || unref(appConfig).ui.icons.check,
                            class: ui.value.icon({ class: (_b2 = props.ui) == null ? void 0 : _b2.icon })
                          }, null, _parent4, _scopeId3));
                        }
                      } else {
                        return [
                          modelValue2 === "indeterminate" ? (openBlock(), createBlock(_sfc_main$3, {
                            key: 0,
                            name: _ctx.indeterminateIcon || unref(appConfig).ui.icons.minus,
                            class: ui.value.icon({ class: (_c2 = props.ui) == null ? void 0 : _c2.icon })
                          }, null, 8, ["name", "class"])) : (openBlock(), createBlock(_sfc_main$3, {
                            key: 1,
                            name: _ctx.icon || unref(appConfig).ui.icons.check,
                            class: ui.value.icon({ class: (_d2 = props.ui) == null ? void 0 : _d2.icon })
                          }, null, 8, ["name", "class"]))
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(CheckboxIndicator), { "as-child": "" }, {
                      default: withCtx(() => {
                        var _a4, _b2;
                        return [
                          modelValue2 === "indeterminate" ? (openBlock(), createBlock(_sfc_main$3, {
                            key: 0,
                            name: _ctx.indeterminateIcon || unref(appConfig).ui.icons.minus,
                            class: ui.value.icon({ class: (_a4 = props.ui) == null ? void 0 : _a4.icon })
                          }, null, 8, ["name", "class"])) : (openBlock(), createBlock(_sfc_main$3, {
                            key: 1,
                            name: _ctx.icon || unref(appConfig).ui.icons.check,
                            class: ui.value.icon({ class: (_b2 = props.ui) == null ? void 0 : _b2.icon })
                          }, null, 8, ["name", "class"]))
                        ];
                      }),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (_ctx.label || !!slots.label || (_ctx.description || !!slots.description)) {
              _push2(`<div class="${ssrRenderClass(ui.value.wrapper({ class: (_c = props.ui) == null ? void 0 : _c.wrapper }))}"${_scopeId}>`);
              if (_ctx.label || !!slots.label) {
                _push2(ssrRenderComponent(unref(Label), {
                  for: unref(id),
                  class: ui.value.label({ class: (_d = props.ui) == null ? void 0 : _d.label })
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      ssrRenderSlot(_ctx.$slots, "label", { label: _ctx.label }, () => {
                        _push3(`${ssrInterpolate(_ctx.label)}`);
                      }, _push3, _parent3, _scopeId2);
                    } else {
                      return [
                        renderSlot(_ctx.$slots, "label", { label: _ctx.label }, () => [
                          createTextVNode(toDisplayString(_ctx.label), 1)
                        ])
                      ];
                    }
                  }),
                  _: 3
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (_ctx.description || !!slots.description) {
                _push2(`<p class="${ssrRenderClass(ui.value.description({ class: (_e = props.ui) == null ? void 0 : _e.description }))}"${_scopeId}>`);
                ssrRenderSlot(_ctx.$slots, "description", { description: _ctx.description }, () => {
                  _push2(`${ssrInterpolate(_ctx.description)}`);
                }, _push2, _parent2, _scopeId);
                _push2(`</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", {
                class: ui.value.container({ class: (_f = props.ui) == null ? void 0 : _f.container })
              }, [
                createVNode(unref(CheckboxRoot), mergeProps({ id: unref(id) }, { ...unref(rootProps), ..._ctx.$attrs, ...unref(ariaAttrs) }, {
                  modelValue: modelValue.value,
                  "onUpdate:modelValue": [($event) => modelValue.value = $event, onUpdate],
                  name: unref(name),
                  disabled: unref(disabled),
                  class: ui.value.base({ class: (_g = props.ui) == null ? void 0 : _g.base })
                }), {
                  default: withCtx(({ modelValue: modelValue2 }) => [
                    createVNode(unref(CheckboxIndicator), { "as-child": "" }, {
                      default: withCtx(() => {
                        var _a4, _b2;
                        return [
                          modelValue2 === "indeterminate" ? (openBlock(), createBlock(_sfc_main$3, {
                            key: 0,
                            name: _ctx.indeterminateIcon || unref(appConfig).ui.icons.minus,
                            class: ui.value.icon({ class: (_a4 = props.ui) == null ? void 0 : _a4.icon })
                          }, null, 8, ["name", "class"])) : (openBlock(), createBlock(_sfc_main$3, {
                            key: 1,
                            name: _ctx.icon || unref(appConfig).ui.icons.check,
                            class: ui.value.icon({ class: (_b2 = props.ui) == null ? void 0 : _b2.icon })
                          }, null, 8, ["name", "class"]))
                        ];
                      }),
                      _: 2
                    }, 1024)
                  ]),
                  _: 1
                }, 16, ["id", "modelValue", "onUpdate:modelValue", "name", "disabled", "class"])
              ], 2),
              _ctx.label || !!slots.label || (_ctx.description || !!slots.description) ? (openBlock(), createBlock("div", {
                key: 0,
                class: ui.value.wrapper({ class: (_h = props.ui) == null ? void 0 : _h.wrapper })
              }, [
                _ctx.label || !!slots.label ? (openBlock(), createBlock(unref(Label), {
                  key: 0,
                  for: unref(id),
                  class: ui.value.label({ class: (_i = props.ui) == null ? void 0 : _i.label })
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "label", { label: _ctx.label }, () => [
                      createTextVNode(toDisplayString(_ctx.label), 1)
                    ])
                  ]),
                  _: 3
                }, 8, ["for", "class"])) : createCommentVNode("", true),
                _ctx.description || !!slots.description ? (openBlock(), createBlock("p", {
                  key: 1,
                  class: ui.value.description({ class: (_j = props.ui) == null ? void 0 : _j.description })
                }, [
                  renderSlot(_ctx.$slots, "description", { description: _ctx.description }, () => [
                    createTextVNode(toDisplayString(_ctx.description), 1)
                  ])
                ], 2)) : createCommentVNode("", true)
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});

const _sfc_main$1 = {
  __name: "LoginForm",
  __ssrInlineRender: true,
  setup(__props) {
    const { $toast } = useNuxtApp();
    const router = useRouter();
    const loading = ref(false);
    const passwordVisible = ref(false);
    const rememberMe = ref(false);
    const state = reactive({
      email: "",
      password: ""
    });
    const handleLogin = async () => {
      if (!state.email || !state.password) {
        $toast.add({
          title: "Erreur",
          description: "Veuillez remplir tous les champs",
          color: "red",
          icon: "i-heroicons-exclamation-triangle"
        });
        return;
      }
      loading.value = true;
      try {
        if (rememberMe.value) {
          localStorage.setItem("crm_email", state.email);
        } else {
          localStorage.removeItem("crm_email");
        }
        await new Promise((resolve) => setTimeout(resolve, 800));
        router.push("/dashboard");
      } catch (error) {
        console.error("Erreur de connexion:", error);
        $toast.add({
          title: "Échec de connexion",
          description: "Identifiants incorrects. Veuillez réessayer.",
          color: "red",
          icon: "i-heroicons-exclamation-triangle"
        });
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$4;
      const _component_UIcon = _sfc_main$3;
      const _component_UForm = _sfc_main$5;
      const _component_UFormGroup = resolveComponent("UFormGroup");
      const _component_UInput = _sfc_main$6;
      const _component_UInputGroup = resolveComponent("UInputGroup");
      const _component_UButton = _sfc_main$7;
      const _component_UCheckbox = _sfc_main$2;
      const _component_NuxtLink = __nuxt_component_0;
      _push(ssrRenderComponent(_component_UCard, mergeProps({
        ui: {
          base: "relative overflow-hidden backdrop-blur-xl bg-white/80 dark:bg-gray-900/80",
          ring: "ring-1 ring-gray-200 dark:ring-gray-800",
          shadow: "shadow-xl",
          rounded: "rounded-xl"
        },
        class: "w-full max-w-md mx-auto"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-800/50 dark:to-gray-900/50 -z-10 opacity-50"${_scopeId}></div><div class="absolute -top-24 -right-24 w-64 h-64 bg-primary-200 dark:bg-primary-900/20 rounded-full blur-3xl -z-10 opacity-30"${_scopeId}></div><div class="absolute -bottom-24 -left-24 w-64 h-64 bg-primary-300 dark:bg-primary-800/20 rounded-full blur-3xl -z-10 opacity-30"${_scopeId}></div><div class="space-y-8"${_scopeId}><div class="text-center"${_scopeId}><div class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 dark:bg-primary-900/30 mb-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-lock-closed",
              class: "text-primary-500 dark:text-primary-400 h-8 w-8"
            }, null, _parent2, _scopeId));
            _push2(`</div><h2 class="text-2xl font-bold text-gray-900 dark:text-white"${_scopeId}> Bon retour parmi nous </h2><p class="text-gray-500 dark:text-gray-400"${_scopeId}> Connectez-vous pour accéder à votre espace </p></div>`);
            _push2(ssrRenderComponent(_component_UForm, {
              state: unref(state),
              onSubmit: handleLogin
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-6"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UFormGroup, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UInput, {
                          modelValue: unref(state).email,
                          "onUpdate:modelValue": ($event) => unref(state).email = $event,
                          type: "email",
                          placeholder: "Email",
                          autocomplete: "email",
                          icon: "i-heroicons-envelope",
                          size: "lg",
                          ui: {
                            base: "relative block w-full transition duration-100 focus-within:z-10",
                            rounded: "rounded-xl",
                            icon: {
                              base: "text-gray-400"
                            },
                            padding: {
                              lg: "py-3 pl-12 pr-4"
                            }
                          }
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UInput, {
                            modelValue: unref(state).email,
                            "onUpdate:modelValue": ($event) => unref(state).email = $event,
                            type: "email",
                            placeholder: "Email",
                            autocomplete: "email",
                            icon: "i-heroicons-envelope",
                            size: "lg",
                            ui: {
                              base: "relative block w-full transition duration-100 focus-within:z-10",
                              rounded: "rounded-xl",
                              icon: {
                                base: "text-gray-400"
                              },
                              padding: {
                                lg: "py-3 pl-12 pr-4"
                              }
                            }
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UFormGroup, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UInputGroup, null, {
                          append: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UButton, {
                                color: "gray",
                                variant: "ghost",
                                icon: "",
                                class: "absolute right-0 top-0 bottom-0 z-10",
                                padded: false,
                                onClick: ($event) => passwordVisible.value = !unref(passwordVisible)
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_UIcon, {
                                      name: unref(passwordVisible) ? "i-heroicons-eye-slash" : "i-heroicons-eye",
                                      class: "h-5 w-5 text-gray-500"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_UIcon, {
                                        name: unref(passwordVisible) ? "i-heroicons-eye-slash" : "i-heroicons-eye",
                                        class: "h-5 w-5 text-gray-500"
                                      }, null, 8, ["name"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UButton, {
                                  color: "gray",
                                  variant: "ghost",
                                  icon: "",
                                  class: "absolute right-0 top-0 bottom-0 z-10",
                                  padded: false,
                                  onClick: ($event) => passwordVisible.value = !unref(passwordVisible)
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UIcon, {
                                      name: unref(passwordVisible) ? "i-heroicons-eye-slash" : "i-heroicons-eye",
                                      class: "h-5 w-5 text-gray-500"
                                    }, null, 8, ["name"])
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ];
                            }
                          }),
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UInput, {
                                modelValue: unref(state).password,
                                "onUpdate:modelValue": ($event) => unref(state).password = $event,
                                type: unref(passwordVisible) ? "text" : "password",
                                placeholder: "Mot de passe",
                                autocomplete: "current-password",
                                icon: "i-heroicons-lock-closed",
                                size: "lg",
                                ui: {
                                  base: "relative block w-full transition duration-100 focus-within:z-10",
                                  rounded: "rounded-xl",
                                  icon: {
                                    base: "text-gray-400"
                                  },
                                  padding: {
                                    lg: "py-3 pl-12 pr-12"
                                  }
                                }
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UInput, {
                                  modelValue: unref(state).password,
                                  "onUpdate:modelValue": ($event) => unref(state).password = $event,
                                  type: unref(passwordVisible) ? "text" : "password",
                                  placeholder: "Mot de passe",
                                  autocomplete: "current-password",
                                  icon: "i-heroicons-lock-closed",
                                  size: "lg",
                                  ui: {
                                    base: "relative block w-full transition duration-100 focus-within:z-10",
                                    rounded: "rounded-xl",
                                    icon: {
                                      base: "text-gray-400"
                                    },
                                    padding: {
                                      lg: "py-3 pl-12 pr-12"
                                    }
                                  }
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "type"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UInputGroup, null, {
                            append: withCtx(() => [
                              createVNode(_component_UButton, {
                                color: "gray",
                                variant: "ghost",
                                icon: "",
                                class: "absolute right-0 top-0 bottom-0 z-10",
                                padded: false,
                                onClick: ($event) => passwordVisible.value = !unref(passwordVisible)
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_UIcon, {
                                    name: unref(passwordVisible) ? "i-heroicons-eye-slash" : "i-heroicons-eye",
                                    class: "h-5 w-5 text-gray-500"
                                  }, null, 8, ["name"])
                                ]),
                                _: 1
                              }, 8, ["onClick"])
                            ]),
                            default: withCtx(() => [
                              createVNode(_component_UInput, {
                                modelValue: unref(state).password,
                                "onUpdate:modelValue": ($event) => unref(state).password = $event,
                                type: unref(passwordVisible) ? "text" : "password",
                                placeholder: "Mot de passe",
                                autocomplete: "current-password",
                                icon: "i-heroicons-lock-closed",
                                size: "lg",
                                ui: {
                                  base: "relative block w-full transition duration-100 focus-within:z-10",
                                  rounded: "rounded-xl",
                                  icon: {
                                    base: "text-gray-400"
                                  },
                                  padding: {
                                    lg: "py-3 pl-12 pr-12"
                                  }
                                }
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "type"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="flex items-center justify-between mt-1"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UCheckbox, {
                    modelValue: unref(rememberMe),
                    "onUpdate:modelValue": ($event) => isRef(rememberMe) ? rememberMe.value = $event : null,
                    name: "remember",
                    label: "Se souvenir de moi",
                    class: "text-sm"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UButton, {
                    variant: "link",
                    to: "/auth/forgot-password",
                    size: "sm",
                    class: "text-primary-500 dark:text-primary-400 font-medium hover:text-primary-600"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Mot de passe oublié? `);
                      } else {
                        return [
                          createTextVNode(" Mot de passe oublié? ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div><div class="mt-8"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    type: "submit",
                    color: "primary",
                    block: "",
                    loading: unref(loading),
                    ui: {
                      rounded: "rounded-xl",
                      size: {
                        lg: "text-base py-3.5"
                      }
                    },
                    size: "lg"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="font-medium"${_scopeId3}>Se connecter</span>`);
                      } else {
                        return [
                          createVNode("span", { class: "font-medium" }, "Se connecter")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-6" }, [
                      createVNode(_component_UFormGroup, null, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            modelValue: unref(state).email,
                            "onUpdate:modelValue": ($event) => unref(state).email = $event,
                            type: "email",
                            placeholder: "Email",
                            autocomplete: "email",
                            icon: "i-heroicons-envelope",
                            size: "lg",
                            ui: {
                              base: "relative block w-full transition duration-100 focus-within:z-10",
                              rounded: "rounded-xl",
                              icon: {
                                base: "text-gray-400"
                              },
                              padding: {
                                lg: "py-3 pl-12 pr-4"
                              }
                            }
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UFormGroup, null, {
                        default: withCtx(() => [
                          createVNode(_component_UInputGroup, null, {
                            append: withCtx(() => [
                              createVNode(_component_UButton, {
                                color: "gray",
                                variant: "ghost",
                                icon: "",
                                class: "absolute right-0 top-0 bottom-0 z-10",
                                padded: false,
                                onClick: ($event) => passwordVisible.value = !unref(passwordVisible)
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_UIcon, {
                                    name: unref(passwordVisible) ? "i-heroicons-eye-slash" : "i-heroicons-eye",
                                    class: "h-5 w-5 text-gray-500"
                                  }, null, 8, ["name"])
                                ]),
                                _: 1
                              }, 8, ["onClick"])
                            ]),
                            default: withCtx(() => [
                              createVNode(_component_UInput, {
                                modelValue: unref(state).password,
                                "onUpdate:modelValue": ($event) => unref(state).password = $event,
                                type: unref(passwordVisible) ? "text" : "password",
                                placeholder: "Mot de passe",
                                autocomplete: "current-password",
                                icon: "i-heroicons-lock-closed",
                                size: "lg",
                                ui: {
                                  base: "relative block w-full transition duration-100 focus-within:z-10",
                                  rounded: "rounded-xl",
                                  icon: {
                                    base: "text-gray-400"
                                  },
                                  padding: {
                                    lg: "py-3 pl-12 pr-12"
                                  }
                                }
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "type"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "flex items-center justify-between mt-1" }, [
                        createVNode(_component_UCheckbox, {
                          modelValue: unref(rememberMe),
                          "onUpdate:modelValue": ($event) => isRef(rememberMe) ? rememberMe.value = $event : null,
                          name: "remember",
                          label: "Se souvenir de moi",
                          class: "text-sm"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_UButton, {
                          variant: "link",
                          to: "/auth/forgot-password",
                          size: "sm",
                          class: "text-primary-500 dark:text-primary-400 font-medium hover:text-primary-600"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Mot de passe oublié? ")
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    createVNode("div", { class: "mt-8" }, [
                      createVNode(_component_UButton, {
                        type: "submit",
                        color: "primary",
                        block: "",
                        loading: unref(loading),
                        ui: {
                          rounded: "rounded-xl",
                          size: {
                            lg: "text-base py-3.5"
                          }
                        },
                        size: "lg"
                      }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "font-medium" }, "Se connecter")
                        ]),
                        _: 1
                      }, 8, ["loading"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div${_scopeId}><div class="relative py-2"${_scopeId}><div class="absolute inset-0 flex items-center"${_scopeId}><div class="w-full border-t border-gray-200 dark:border-gray-700"${_scopeId}></div></div><div class="relative flex justify-center"${_scopeId}><span class="bg-white dark:bg-gray-900 px-4 text-sm text-gray-500"${_scopeId}> ou continuer avec </span></div></div><div class="grid grid-cols-2 gap-4 mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              color: "white",
              variant: "outline",
              block: "",
              ui: {
                rounded: "rounded-xl",
                padding: {
                  lg: "py-3"
                },
                shadow: "shadow-sm"
              },
              size: "lg",
              class: "flex items-center justify-center gap-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-simple-icons-google",
                    class: "h-5 w-5"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span${_scopeId2}>Google</span>`);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-simple-icons-google",
                      class: "h-5 w-5"
                    }),
                    createVNode("span", null, "Google")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              color: "white",
              variant: "outline",
              block: "",
              ui: {
                rounded: "rounded-xl",
                padding: {
                  lg: "py-3"
                },
                shadow: "shadow-sm"
              },
              size: "lg",
              class: "flex items-center justify-center gap-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-simple-icons-apple",
                    class: "h-5 w-5"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span${_scopeId2}>Apple</span>`);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-simple-icons-apple",
                      class: "h-5 w-5"
                    }),
                    createVNode("span", null, "Apple")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="text-center"${_scopeId}><p class="text-sm text-gray-600 dark:text-gray-400"${_scopeId}> Pas encore de compte? `);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/auth/register",
              class: "text-primary-500 dark:text-primary-400 font-medium hover:text-primary-600"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Créer un compte `);
                } else {
                  return [
                    createTextVNode(" Créer un compte ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-800/50 dark:to-gray-900/50 -z-10 opacity-50" }),
              createVNode("div", { class: "absolute -top-24 -right-24 w-64 h-64 bg-primary-200 dark:bg-primary-900/20 rounded-full blur-3xl -z-10 opacity-30" }),
              createVNode("div", { class: "absolute -bottom-24 -left-24 w-64 h-64 bg-primary-300 dark:bg-primary-800/20 rounded-full blur-3xl -z-10 opacity-30" }),
              createVNode("div", { class: "space-y-8" }, [
                createVNode("div", { class: "text-center" }, [
                  createVNode("div", { class: "inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 dark:bg-primary-900/30 mb-3" }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-lock-closed",
                      class: "text-primary-500 dark:text-primary-400 h-8 w-8"
                    })
                  ]),
                  createVNode("h2", { class: "text-2xl font-bold text-gray-900 dark:text-white" }, " Bon retour parmi nous "),
                  createVNode("p", { class: "text-gray-500 dark:text-gray-400" }, " Connectez-vous pour accéder à votre espace ")
                ]),
                createVNode(_component_UForm, {
                  state: unref(state),
                  onSubmit: handleLogin
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "space-y-6" }, [
                      createVNode(_component_UFormGroup, null, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            modelValue: unref(state).email,
                            "onUpdate:modelValue": ($event) => unref(state).email = $event,
                            type: "email",
                            placeholder: "Email",
                            autocomplete: "email",
                            icon: "i-heroicons-envelope",
                            size: "lg",
                            ui: {
                              base: "relative block w-full transition duration-100 focus-within:z-10",
                              rounded: "rounded-xl",
                              icon: {
                                base: "text-gray-400"
                              },
                              padding: {
                                lg: "py-3 pl-12 pr-4"
                              }
                            }
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UFormGroup, null, {
                        default: withCtx(() => [
                          createVNode(_component_UInputGroup, null, {
                            append: withCtx(() => [
                              createVNode(_component_UButton, {
                                color: "gray",
                                variant: "ghost",
                                icon: "",
                                class: "absolute right-0 top-0 bottom-0 z-10",
                                padded: false,
                                onClick: ($event) => passwordVisible.value = !unref(passwordVisible)
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_UIcon, {
                                    name: unref(passwordVisible) ? "i-heroicons-eye-slash" : "i-heroicons-eye",
                                    class: "h-5 w-5 text-gray-500"
                                  }, null, 8, ["name"])
                                ]),
                                _: 1
                              }, 8, ["onClick"])
                            ]),
                            default: withCtx(() => [
                              createVNode(_component_UInput, {
                                modelValue: unref(state).password,
                                "onUpdate:modelValue": ($event) => unref(state).password = $event,
                                type: unref(passwordVisible) ? "text" : "password",
                                placeholder: "Mot de passe",
                                autocomplete: "current-password",
                                icon: "i-heroicons-lock-closed",
                                size: "lg",
                                ui: {
                                  base: "relative block w-full transition duration-100 focus-within:z-10",
                                  rounded: "rounded-xl",
                                  icon: {
                                    base: "text-gray-400"
                                  },
                                  padding: {
                                    lg: "py-3 pl-12 pr-12"
                                  }
                                }
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "type"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "flex items-center justify-between mt-1" }, [
                        createVNode(_component_UCheckbox, {
                          modelValue: unref(rememberMe),
                          "onUpdate:modelValue": ($event) => isRef(rememberMe) ? rememberMe.value = $event : null,
                          name: "remember",
                          label: "Se souvenir de moi",
                          class: "text-sm"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_UButton, {
                          variant: "link",
                          to: "/auth/forgot-password",
                          size: "sm",
                          class: "text-primary-500 dark:text-primary-400 font-medium hover:text-primary-600"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Mot de passe oublié? ")
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    createVNode("div", { class: "mt-8" }, [
                      createVNode(_component_UButton, {
                        type: "submit",
                        color: "primary",
                        block: "",
                        loading: unref(loading),
                        ui: {
                          rounded: "rounded-xl",
                          size: {
                            lg: "text-base py-3.5"
                          }
                        },
                        size: "lg"
                      }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "font-medium" }, "Se connecter")
                        ]),
                        _: 1
                      }, 8, ["loading"])
                    ])
                  ]),
                  _: 1
                }, 8, ["state"]),
                createVNode("div", null, [
                  createVNode("div", { class: "relative py-2" }, [
                    createVNode("div", { class: "absolute inset-0 flex items-center" }, [
                      createVNode("div", { class: "w-full border-t border-gray-200 dark:border-gray-700" })
                    ]),
                    createVNode("div", { class: "relative flex justify-center" }, [
                      createVNode("span", { class: "bg-white dark:bg-gray-900 px-4 text-sm text-gray-500" }, " ou continuer avec ")
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-2 gap-4 mt-4" }, [
                    createVNode(_component_UButton, {
                      color: "white",
                      variant: "outline",
                      block: "",
                      ui: {
                        rounded: "rounded-xl",
                        padding: {
                          lg: "py-3"
                        },
                        shadow: "shadow-sm"
                      },
                      size: "lg",
                      class: "flex items-center justify-center gap-2"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UIcon, {
                          name: "i-simple-icons-google",
                          class: "h-5 w-5"
                        }),
                        createVNode("span", null, "Google")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UButton, {
                      color: "white",
                      variant: "outline",
                      block: "",
                      ui: {
                        rounded: "rounded-xl",
                        padding: {
                          lg: "py-3"
                        },
                        shadow: "shadow-sm"
                      },
                      size: "lg",
                      class: "flex items-center justify-center gap-2"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UIcon, {
                          name: "i-simple-icons-apple",
                          class: "h-5 w-5"
                        }),
                        createVNode("span", null, "Apple")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                createVNode("div", { class: "text-center" }, [
                  createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, [
                    createTextVNode(" Pas encore de compte? "),
                    createVNode(_component_NuxtLink, {
                      to: "/auth/register",
                      class: "text-primary-500 dark:text-primary-400 font-medium hover:text-primary-600"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Créer un compte ")
                      ]),
                      _: 1
                    })
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LoginForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

const _sfc_main = {
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Connexion - CRM Pro"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$3;
      const _component_NuxtImg = _sfc_main$8;
      const _component_LoginForm = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col md:flex-row" }, _attrs))}><div class="hidden md:flex md:w-1/2 bg-primary-600 flex-col justify-center items-center text-white px-8"><div class="max-w-md mx-auto"><h1 class="text-4xl font-bold mb-4">CRM Pro</h1><p class="text-xl mb-8 opacity-90"> Gérez vos relations clients plus efficacement que jamais avec notre solution CRM complète. </p><div class="bg-white/10 backdrop-blur-md p-6 rounded-xl"><div class="flex items-start mb-4">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-star",
        class: "text-yellow-300 h-5 w-5 shrink-0 mt-1 mr-2"
      }, null, _parent));
      _push(`<p class="italic text-white/90"> &quot;Ce CRM a transformé notre façon de gérer nos clients. Simple et puissant à la fois.&quot; </p></div><div class="flex items-center">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "/images/avatar-testimonial.jpg",
        alt: "Client satisfait",
        class: "h-10 w-10 rounded-full object-cover mr-3",
        onerror: "this.src='https://ui.shadcn.com/avatars/03.png'"
      }, null, _parent));
      _push(`<div><p class="font-medium">Sophie Martin</p><p class="text-sm opacity-75">Directrice des ventes, InnovaTech</p></div></div></div></div></div><div class="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8"><div class="w-full max-w-md"><div class="text-center mb-8 md:hidden"><h1 class="text-2xl font-bold text-primary-600">CRM Pro</h1><p class="text-gray-600">Votre plateforme de gestion client</p></div>`);
      _push(ssrRenderComponent(_component_LoginForm, null, null, _parent));
      _push(`<div class="text-center mt-8 text-xs text-gray-500"><p> En vous connectant, vous acceptez nos <a href="#" class="underline">Conditions d&#39;utilisation</a> et notre <a href="#" class="underline">Politique de confidentialité</a>. </p></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login.vue.mjs.map
