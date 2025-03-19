import { ref, reactive, resolveComponent, mergeProps, withCtx, unref, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { u as useHead, e as _sfc_main$2, d as _sfc_main$5 } from './server.mjs';
import { _ as _sfc_main$1 } from './Card.vue2.mjs';
import { _ as _sfc_main$3, a as _sfc_main$4 } from './Input.vue2.mjs';
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
import 'reka-ui';
import '@vueuse/core';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';

const _sfc_main = {
  __name: "forgot-password",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Mot de passe oublié - CRM Pro"
    });
    const loading = ref(false);
    const emailSent = ref(false);
    const state = reactive({
      email: ""
    });
    const handleSubmit = async () => {
      loading.value = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Demande de réinitialisation pour:", state.email);
        emailSent.value = true;
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$1;
      const _component_UIcon = _sfc_main$2;
      const _component_UForm = _sfc_main$3;
      const _component_UFormGroup = resolveComponent("UFormGroup");
      const _component_UInput = _sfc_main$4;
      const _component_UButton = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50 dark:bg-gray-900" }, _attrs))}><div class="w-full max-w-md">`);
      _push(ssrRenderComponent(_component_UCard, { ui: {
        base: "relative overflow-hidden backdrop-blur-xl bg-white/80 dark:bg-gray-900/80",
        ring: "ring-1 ring-gray-200 dark:ring-gray-800",
        shadow: "shadow-xl",
        rounded: "rounded-xl"
      } }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-800/50 dark:to-gray-900/50 -z-10 opacity-50"${_scopeId}></div><div class="space-y-6"${_scopeId}><div class="text-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-key",
              class: "text-primary-500 dark:text-primary-400 h-12 w-12 mx-auto mb-3"
            }, null, _parent2, _scopeId));
            _push2(`<h2 class="text-2xl font-bold text-gray-900 dark:text-white"${_scopeId}> Mot de passe oublié </h2><p class="text-gray-500 dark:text-gray-400 mt-1"${_scopeId}> Entrez votre adresse email pour réinitialiser votre mot de passe </p></div>`);
            _push2(ssrRenderComponent(_component_UForm, {
              state: unref(state),
              onSubmit: handleSubmit
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UFormGroup, {
                    label: "Email",
                    name: "email"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UInput, {
                          modelValue: unref(state).email,
                          "onUpdate:modelValue": ($event) => unref(state).email = $event,
                          type: "email",
                          placeholder: "votre@email.com",
                          icon: "i-heroicons-envelope",
                          ui: {
                            rounded: "rounded-lg",
                            size: {
                              md: "py-2.5"
                            }
                          }
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UInput, {
                            modelValue: unref(state).email,
                            "onUpdate:modelValue": ($event) => unref(state).email = $event,
                            type: "email",
                            placeholder: "votre@email.com",
                            icon: "i-heroicons-envelope",
                            ui: {
                              rounded: "rounded-lg",
                              size: {
                                md: "py-2.5"
                              }
                            }
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="mt-6"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    type: "submit",
                    color: "primary",
                    block: "",
                    loading: unref(loading),
                    ui: { rounded: "rounded-lg", size: { md: "py-3" } },
                    icon: "i-heroicons-envelope",
                    trailing: "",
                    disabled: !unref(state).email
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Envoyer les instructions `);
                      } else {
                        return [
                          createTextVNode(" Envoyer les instructions ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode(_component_UFormGroup, {
                      label: "Email",
                      name: "email"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(state).email,
                          "onUpdate:modelValue": ($event) => unref(state).email = $event,
                          type: "email",
                          placeholder: "votre@email.com",
                          icon: "i-heroicons-envelope",
                          ui: {
                            rounded: "rounded-lg",
                            size: {
                              md: "py-2.5"
                            }
                          }
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "mt-6" }, [
                      createVNode(_component_UButton, {
                        type: "submit",
                        color: "primary",
                        block: "",
                        loading: unref(loading),
                        ui: { rounded: "rounded-lg", size: { md: "py-3" } },
                        icon: "i-heroicons-envelope",
                        trailing: "",
                        disabled: !unref(state).email
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Envoyer les instructions ")
                        ]),
                        _: 1
                      }, 8, ["loading", "disabled"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (unref(emailSent)) {
              _push2(`<div class="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 p-4 rounded-lg text-center"${_scopeId}> Instructions envoyées ! Vérifiez votre boîte de réception. </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="text-center pt-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              variant: "link",
              color: "primary",
              to: "/auth/login",
              size: "sm",
              icon: "i-heroicons-arrow-left"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Retour à la connexion `);
                } else {
                  return [
                    createTextVNode(" Retour à la connexion ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-800/50 dark:to-gray-900/50 -z-10 opacity-50" }),
              createVNode("div", { class: "space-y-6" }, [
                createVNode("div", { class: "text-center" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-key",
                    class: "text-primary-500 dark:text-primary-400 h-12 w-12 mx-auto mb-3"
                  }),
                  createVNode("h2", { class: "text-2xl font-bold text-gray-900 dark:text-white" }, " Mot de passe oublié "),
                  createVNode("p", { class: "text-gray-500 dark:text-gray-400 mt-1" }, " Entrez votre adresse email pour réinitialiser votre mot de passe ")
                ]),
                createVNode(_component_UForm, {
                  state: unref(state),
                  onSubmit: handleSubmit
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UFormGroup, {
                      label: "Email",
                      name: "email"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(state).email,
                          "onUpdate:modelValue": ($event) => unref(state).email = $event,
                          type: "email",
                          placeholder: "votre@email.com",
                          icon: "i-heroicons-envelope",
                          ui: {
                            rounded: "rounded-lg",
                            size: {
                              md: "py-2.5"
                            }
                          }
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "mt-6" }, [
                      createVNode(_component_UButton, {
                        type: "submit",
                        color: "primary",
                        block: "",
                        loading: unref(loading),
                        ui: { rounded: "rounded-lg", size: { md: "py-3" } },
                        icon: "i-heroicons-envelope",
                        trailing: "",
                        disabled: !unref(state).email
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Envoyer les instructions ")
                        ]),
                        _: 1
                      }, 8, ["loading", "disabled"])
                    ])
                  ]),
                  _: 1
                }, 8, ["state"]),
                unref(emailSent) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 p-4 rounded-lg text-center"
                }, " Instructions envoyées ! Vérifiez votre boîte de réception. ")) : createCommentVNode("", true),
                createVNode("div", { class: "text-center pt-2" }, [
                  createVNode(_component_UButton, {
                    variant: "link",
                    color: "primary",
                    to: "/auth/login",
                    size: "sm",
                    icon: "i-heroicons-arrow-left"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Retour à la connexion ")
                    ]),
                    _: 1
                  })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/forgot-password.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=forgot-password.vue.mjs.map
