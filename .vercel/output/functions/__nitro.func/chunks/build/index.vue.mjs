import { defineComponent, unref, mergeProps, withCtx, renderSlot, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper.mjs';
import { Primitive } from 'reka-ui';
import { t as tv, b as _appConfig, d as _sfc_main$2, e as _sfc_main$4, o as _sfc_main$5 } from './server.mjs';
import { _ as _sfc_main$3 } from './Card.vue2.mjs';
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
import '@vueuse/core';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';

const theme = {
  "base": "max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8"
};

var _a;
const appConfigContainer = _appConfig;
const container = tv({ extend: tv(theme), ...((_a = appConfigContainer.ui) == null ? void 0 : _a.container) || {} });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Container",
  __ssrInlineRender: true,
  props: {
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: _ctx.as,
        class: unref(container)({ class: props.class })
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

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_UContainer = _sfc_main$1;
  const _component_UButton = _sfc_main$2;
  const _component_UCard = _sfc_main$3;
  const _component_UIcon = _sfc_main$4;
  const _component_UAvatar = _sfc_main$5;
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_UContainer, { class: "py-20" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="flex flex-col md:flex-row items-center"${_scopeId}><div class="md:w-1/2 md:pr-12"${_scopeId}><h1 class="text-4xl md:text-5xl font-bold mb-4 text-primary-600"${_scopeId}> Gérez vos clients en toute simplicité </h1><p class="text-lg text-gray-600 mb-8"${_scopeId}> Une solution CRM complète et intuitive pour gérer vos contacts, entreprises et opportunités. Boostez votre productivité et améliorez vos relations clients. </p><div class="flex flex-col sm:flex-row gap-4"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_UButton, {
          size: "xl",
          color: "primary",
          to: "/auth/register",
          icon: "i-heroicons-arrow-right-20-solid",
          trailing: ""
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Commencer gratuitement `);
            } else {
              return [
                createTextVNode(" Commencer gratuitement ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_UButton, {
          size: "xl",
          color: "neutral",
          variant: "outline",
          to: "/auth/login"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Se connecter `);
            } else {
              return [
                createTextVNode(" Se connecter ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div></div><div class="md:w-1/2 mt-12 md:mt-0"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_UCard, { class: "shadow-xl" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` image `);
            } else {
              return [
                createTextVNode(" image ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div></div>`);
      } else {
        return [
          createVNode("div", { class: "flex flex-col md:flex-row items-center" }, [
            createVNode("div", { class: "md:w-1/2 md:pr-12" }, [
              createVNode("h1", { class: "text-4xl md:text-5xl font-bold mb-4 text-primary-600" }, " Gérez vos clients en toute simplicité "),
              createVNode("p", { class: "text-lg text-gray-600 mb-8" }, " Une solution CRM complète et intuitive pour gérer vos contacts, entreprises et opportunités. Boostez votre productivité et améliorez vos relations clients. "),
              createVNode("div", { class: "flex flex-col sm:flex-row gap-4" }, [
                createVNode(_component_UButton, {
                  size: "xl",
                  color: "primary",
                  to: "/auth/register",
                  icon: "i-heroicons-arrow-right-20-solid",
                  trailing: ""
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Commencer gratuitement ")
                  ]),
                  _: 1
                }),
                createVNode(_component_UButton, {
                  size: "xl",
                  color: "neutral",
                  variant: "outline",
                  to: "/auth/login"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Se connecter ")
                  ]),
                  _: 1
                })
              ])
            ]),
            createVNode("div", { class: "md:w-1/2 mt-12 md:mt-0" }, [
              createVNode(_component_UCard, { class: "shadow-xl" }, {
                default: withCtx(() => [
                  createTextVNode(" image ")
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
  _push(`<div class="bg-gray-50 py-20">`);
  _push(ssrRenderComponent(_component_UContainer, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="text-center mb-16"${_scopeId}><h2 class="text-3xl font-bold mb-4"${_scopeId}> Tout ce dont vous avez besoin pour réussir </h2><p class="text-gray-600 max-w-2xl mx-auto"${_scopeId}> Notre CRM multi-tenants offre des fonctionnalités complètes pour gérer efficacement vos relations clients. </p></div><div class="grid md:grid-cols-3 gap-8"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_UCard, null, {
          header: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="p-4 flex items-center"${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-users",
                class: "text-4xl text-primary-500 mr-4"
              }, null, _parent3, _scopeId2));
              _push3(`<h3 class="text-xl font-semibold"${_scopeId2}>Gestion des contacts</h3></div>`);
            } else {
              return [
                createVNode("div", { class: "p-4 flex items-center" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-users",
                    class: "text-4xl text-primary-500 mr-4"
                  }),
                  createVNode("h3", { class: "text-xl font-semibold" }, "Gestion des contacts")
                ])
              ];
            }
          }),
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p class="text-gray-600"${_scopeId2}> Centralisez toutes les informations de vos clients et prospects. Accédez à l&#39;historique complet des interactions et aux détails importants en un clin d&#39;œil. </p>`);
            } else {
              return [
                createVNode("p", { class: "text-gray-600" }, " Centralisez toutes les informations de vos clients et prospects. Accédez à l'historique complet des interactions et aux détails importants en un clin d'œil. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_UCard, null, {
          header: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="p-4 flex items-center"${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-building-office",
                class: "text-4xl text-primary-500 mr-4"
              }, null, _parent3, _scopeId2));
              _push3(`<h3 class="text-xl font-semibold"${_scopeId2}>Gestion des entreprises</h3></div>`);
            } else {
              return [
                createVNode("div", { class: "p-4 flex items-center" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-building-office",
                    class: "text-4xl text-primary-500 mr-4"
                  }),
                  createVNode("h3", { class: "text-xl font-semibold" }, "Gestion des entreprises")
                ])
              ];
            }
          }),
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p class="text-gray-600"${_scopeId2}> Suivez vos comptes clients avec toutes les informations pertinentes. Visualisez les contacts associés et gérez efficacement les opportunités commerciales. </p>`);
            } else {
              return [
                createVNode("p", { class: "text-gray-600" }, " Suivez vos comptes clients avec toutes les informations pertinentes. Visualisez les contacts associés et gérez efficacement les opportunités commerciales. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_UCard, null, {
          header: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="p-4 flex items-center"${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-chart-bar",
                class: "text-4xl text-primary-500 mr-4"
              }, null, _parent3, _scopeId2));
              _push3(`<h3 class="text-xl font-semibold"${_scopeId2}>Tableaux de bord</h3></div>`);
            } else {
              return [
                createVNode("div", { class: "p-4 flex items-center" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-chart-bar",
                    class: "text-4xl text-primary-500 mr-4"
                  }),
                  createVNode("h3", { class: "text-xl font-semibold" }, "Tableaux de bord")
                ])
              ];
            }
          }),
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p class="text-gray-600"${_scopeId2}> Suivez vos performances avec des tableaux de bord personnalisables. Visualisez vos KPIs et prenez des décisions éclairées basées sur des données réelles. </p>`);
            } else {
              return [
                createVNode("p", { class: "text-gray-600" }, " Suivez vos performances avec des tableaux de bord personnalisables. Visualisez vos KPIs et prenez des décisions éclairées basées sur des données réelles. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div>`);
      } else {
        return [
          createVNode("div", { class: "text-center mb-16" }, [
            createVNode("h2", { class: "text-3xl font-bold mb-4" }, " Tout ce dont vous avez besoin pour réussir "),
            createVNode("p", { class: "text-gray-600 max-w-2xl mx-auto" }, " Notre CRM multi-tenants offre des fonctionnalités complètes pour gérer efficacement vos relations clients. ")
          ]),
          createVNode("div", { class: "grid md:grid-cols-3 gap-8" }, [
            createVNode(_component_UCard, null, {
              header: withCtx(() => [
                createVNode("div", { class: "p-4 flex items-center" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-users",
                    class: "text-4xl text-primary-500 mr-4"
                  }),
                  createVNode("h3", { class: "text-xl font-semibold" }, "Gestion des contacts")
                ])
              ]),
              default: withCtx(() => [
                createVNode("p", { class: "text-gray-600" }, " Centralisez toutes les informations de vos clients et prospects. Accédez à l'historique complet des interactions et aux détails importants en un clin d'œil. ")
              ]),
              _: 1
            }),
            createVNode(_component_UCard, null, {
              header: withCtx(() => [
                createVNode("div", { class: "p-4 flex items-center" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-building-office",
                    class: "text-4xl text-primary-500 mr-4"
                  }),
                  createVNode("h3", { class: "text-xl font-semibold" }, "Gestion des entreprises")
                ])
              ]),
              default: withCtx(() => [
                createVNode("p", { class: "text-gray-600" }, " Suivez vos comptes clients avec toutes les informations pertinentes. Visualisez les contacts associés et gérez efficacement les opportunités commerciales. ")
              ]),
              _: 1
            }),
            createVNode(_component_UCard, null, {
              header: withCtx(() => [
                createVNode("div", { class: "p-4 flex items-center" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-chart-bar",
                    class: "text-4xl text-primary-500 mr-4"
                  }),
                  createVNode("h3", { class: "text-xl font-semibold" }, "Tableaux de bord")
                ])
              ]),
              default: withCtx(() => [
                createVNode("p", { class: "text-gray-600" }, " Suivez vos performances avec des tableaux de bord personnalisables. Visualisez vos KPIs et prenez des décisions éclairées basées sur des données réelles. ")
              ]),
              _: 1
            })
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
  _push(ssrRenderComponent(_component_UContainer, { class: "py-20" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="text-center mb-16"${_scopeId}><h2 class="text-3xl font-bold mb-4"${_scopeId}>Ce que disent nos clients</h2><p class="text-gray-600 max-w-2xl mx-auto"${_scopeId}> Découvrez comment notre CRM aide les entreprises à optimiser leurs relations clients. </p></div><div class="grid md:grid-cols-2 gap-8"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_UCard, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<blockquote class="text-gray-600 italic"${_scopeId2}> &quot;Ce CRM a transformé notre approche commerciale. La simplicité d&#39;utilisation et l&#39;organisation multi-tenants nous ont permis d&#39;améliorer notre efficacité de 40%.&quot; </blockquote><div class="mt-4 flex items-center"${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_UAvatar, {
                src: "/api/placeholder/100/100",
                alt: "Marie Dubois",
                class: "mr-3"
              }, null, _parent3, _scopeId2));
              _push3(`<div${_scopeId2}><p class="font-semibold"${_scopeId2}>Marie Dubois</p><p class="text-sm text-gray-500"${_scopeId2}>Directrice Commerciale, Innova</p></div></div>`);
            } else {
              return [
                createVNode("blockquote", { class: "text-gray-600 italic" }, ` "Ce CRM a transformé notre approche commerciale. La simplicité d'utilisation et l'organisation multi-tenants nous ont permis d'améliorer notre efficacité de 40%." `),
                createVNode("div", { class: "mt-4 flex items-center" }, [
                  createVNode(_component_UAvatar, {
                    src: "/api/placeholder/100/100",
                    alt: "Marie Dubois",
                    class: "mr-3"
                  }),
                  createVNode("div", null, [
                    createVNode("p", { class: "font-semibold" }, "Marie Dubois"),
                    createVNode("p", { class: "text-sm text-gray-500" }, "Directrice Commerciale, Innova")
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_UCard, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<blockquote class="text-gray-600 italic"${_scopeId2}> &quot;L&#39;organisation des contacts et des entreprises est parfaitement adaptée à nos besoins. Le support client est également exceptionnel!&quot; </blockquote><div class="mt-4 flex items-center"${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_UAvatar, {
                src: "/api/placeholder/100/100",
                alt: "Thomas Martin",
                class: "mr-3"
              }, null, _parent3, _scopeId2));
              _push3(`<div${_scopeId2}><p class="font-semibold"${_scopeId2}>Thomas Martin</p><p class="text-sm text-gray-500"${_scopeId2}>PDG, TechSolutions</p></div></div>`);
            } else {
              return [
                createVNode("blockquote", { class: "text-gray-600 italic" }, ` "L'organisation des contacts et des entreprises est parfaitement adaptée à nos besoins. Le support client est également exceptionnel!" `),
                createVNode("div", { class: "mt-4 flex items-center" }, [
                  createVNode(_component_UAvatar, {
                    src: "/api/placeholder/100/100",
                    alt: "Thomas Martin",
                    class: "mr-3"
                  }),
                  createVNode("div", null, [
                    createVNode("p", { class: "font-semibold" }, "Thomas Martin"),
                    createVNode("p", { class: "text-sm text-gray-500" }, "PDG, TechSolutions")
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div>`);
      } else {
        return [
          createVNode("div", { class: "text-center mb-16" }, [
            createVNode("h2", { class: "text-3xl font-bold mb-4" }, "Ce que disent nos clients"),
            createVNode("p", { class: "text-gray-600 max-w-2xl mx-auto" }, " Découvrez comment notre CRM aide les entreprises à optimiser leurs relations clients. ")
          ]),
          createVNode("div", { class: "grid md:grid-cols-2 gap-8" }, [
            createVNode(_component_UCard, null, {
              default: withCtx(() => [
                createVNode("blockquote", { class: "text-gray-600 italic" }, ` "Ce CRM a transformé notre approche commerciale. La simplicité d'utilisation et l'organisation multi-tenants nous ont permis d'améliorer notre efficacité de 40%." `),
                createVNode("div", { class: "mt-4 flex items-center" }, [
                  createVNode(_component_UAvatar, {
                    src: "/api/placeholder/100/100",
                    alt: "Marie Dubois",
                    class: "mr-3"
                  }),
                  createVNode("div", null, [
                    createVNode("p", { class: "font-semibold" }, "Marie Dubois"),
                    createVNode("p", { class: "text-sm text-gray-500" }, "Directrice Commerciale, Innova")
                  ])
                ])
              ]),
              _: 1
            }),
            createVNode(_component_UCard, null, {
              default: withCtx(() => [
                createVNode("blockquote", { class: "text-gray-600 italic" }, ` "L'organisation des contacts et des entreprises est parfaitement adaptée à nos besoins. Le support client est également exceptionnel!" `),
                createVNode("div", { class: "mt-4 flex items-center" }, [
                  createVNode(_component_UAvatar, {
                    src: "/api/placeholder/100/100",
                    alt: "Thomas Martin",
                    class: "mr-3"
                  }),
                  createVNode("div", null, [
                    createVNode("p", { class: "font-semibold" }, "Thomas Martin"),
                    createVNode("p", { class: "text-sm text-gray-500" }, "PDG, TechSolutions")
                  ])
                ])
              ]),
              _: 1
            })
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<div class="bg-primary-500 text-white py-20">`);
  _push(ssrRenderComponent(_component_UContainer, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="text-center max-w-3xl mx-auto"${_scopeId}><h2 class="text-3xl font-bold mb-4"${_scopeId}> Prêt à transformer vos relations clients? </h2><p class="text-xl opacity-90 mb-8"${_scopeId}> Commencez dès aujourd&#39;hui avec notre essai gratuit de 14 jours. Aucune carte de crédit requise. </p>`);
        _push2(ssrRenderComponent(_component_UButton, {
          size: "xl",
          color: "neutral",
          variant: "solid",
          to: "/auth/register",
          class: "bg-white text-primary-500"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Démarrer votre essai gratuit `);
            } else {
              return [
                createTextVNode(" Démarrer votre essai gratuit ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div>`);
      } else {
        return [
          createVNode("div", { class: "text-center max-w-3xl mx-auto" }, [
            createVNode("h2", { class: "text-3xl font-bold mb-4" }, " Prêt à transformer vos relations clients? "),
            createVNode("p", { class: "text-xl opacity-90 mb-8" }, " Commencez dès aujourd'hui avec notre essai gratuit de 14 jours. Aucune carte de crédit requise. "),
            createVNode(_component_UButton, {
              size: "xl",
              color: "neutral",
              variant: "solid",
              to: "/auth/register",
              class: "bg-white text-primary-500"
            }, {
              default: withCtx(() => [
                createTextVNode(" Démarrer votre essai gratuit ")
              ]),
              _: 1
            })
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
  _push(ssrRenderComponent(_component_UContainer, { class: "py-10" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="flex flex-col md:flex-row justify-between items-center"${_scopeId}><div class="mb-6 md:mb-0"${_scopeId}><h3 class="text-xl font-bold text-primary-600"${_scopeId}>CRM Pro</h3><p class="text-gray-500"${_scopeId}>© 2025 Tous droits réservés</p></div><div class="flex gap-6"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_UButton, {
          to: "/features",
          variant: "ghost",
          color: "neutral"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Fonctionnalités `);
            } else {
              return [
                createTextVNode(" Fonctionnalités ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_UButton, {
          to: "/pricing",
          variant: "ghost",
          color: "neutral"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Tarifs `);
            } else {
              return [
                createTextVNode(" Tarifs ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_UButton, {
          to: "/contact",
          variant: "ghost",
          color: "neutral"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Contact `);
            } else {
              return [
                createTextVNode(" Contact ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div></div>`);
      } else {
        return [
          createVNode("div", { class: "flex flex-col md:flex-row justify-between items-center" }, [
            createVNode("div", { class: "mb-6 md:mb-0" }, [
              createVNode("h3", { class: "text-xl font-bold text-primary-600" }, "CRM Pro"),
              createVNode("p", { class: "text-gray-500" }, "© 2025 Tous droits réservés")
            ]),
            createVNode("div", { class: "flex gap-6" }, [
              createVNode(_component_UButton, {
                to: "/features",
                variant: "ghost",
                color: "neutral"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Fonctionnalités ")
                ]),
                _: 1
              }),
              createVNode(_component_UButton, {
                to: "/pricing",
                variant: "ghost",
                color: "neutral"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Tarifs ")
                ]),
                _: 1
              }),
              createVNode(_component_UButton, {
                to: "/contact",
                variant: "ghost",
                color: "neutral"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Contact ")
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
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index.vue.mjs.map
