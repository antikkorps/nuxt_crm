var pe=Object.defineProperty;var me=(e,i,n)=>i in e?pe(e,i,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[i]=n;var L=(e,i,n)=>me(e,typeof i!="symbol"?i+"":i,n);import{a2 as ve,e as U,f as de,g as ge,m as ie,T as he,h as be,i as ye,aE as Ie,aF as xe,j as D,r as _,k as Z,n as P,o as E,w as fe,a as ze,p as Q,c as ne,B as Y,q as re,s as d,v as j,D as se,aG as we,P as Se,x as Fe,X as Be,aK as Ae,aL as le,L as oe,y as Ee,aM as $,aN as R,aO as _e,aP as je,Q as ke,R as Ve,aQ as Ce}from"./C-wTnlYi.js";const M=new Map;function Oe(e){const i=ve();function n(c){var g;const o=M.get(e)||new Set;o.add(c),M.set(e,o);const v=()=>l(c);return(g=i==null?void 0:i.cleanups)==null||g.push(v),v}function a(c){function g(...o){l(g),c(...o)}return n(g)}function l(c){const g=M.get(e);g&&(g.delete(c),g.size||u())}function u(){M.delete(e)}function f(c,g){var o;(o=M.get(e))==null||o.forEach(v=>v(c,g))}return{on:n,once:a,off:l,emit:f,reset:u}}const $e={slots:{root:"relative inline-flex items-center",base:["w-full rounded-[calc(var(--ui-radius)*1.5)] border-0 placeholder:text-(--ui-text-dimmed) focus:outline-none disabled:cursor-not-allowed disabled:opacity-75","transition-colors"],leading:"absolute inset-y-0 start-0 flex items-center",leadingIcon:"shrink-0 text-(--ui-text-dimmed)",leadingAvatar:"shrink-0",leadingAvatarSize:"",trailing:"absolute inset-y-0 end-0 flex items-center",trailingIcon:"shrink-0 text-(--ui-text-dimmed)"},variants:{buttonGroup:{horizontal:{root:"group",base:"group-not-only:group-first:rounded-e-none group-not-only:group-last:rounded-s-none group-not-last:group-not-first:rounded-none"},vertical:{root:"group",base:"group-not-only:group-first:rounded-b-none group-not-only:group-last:rounded-t-none group-not-last:group-not-first:rounded-none"}},size:{xs:{base:"px-2 py-1 text-xs gap-1",leading:"ps-2",trailing:"pe-2",leadingIcon:"size-4",leadingAvatarSize:"3xs",trailingIcon:"size-4"},sm:{base:"px-2.5 py-1.5 text-xs gap-1.5",leading:"ps-2.5",trailing:"pe-2.5",leadingIcon:"size-4",leadingAvatarSize:"3xs",trailingIcon:"size-4"},md:{base:"px-2.5 py-1.5 text-sm gap-1.5",leading:"ps-2.5",trailing:"pe-2.5",leadingIcon:"size-5",leadingAvatarSize:"2xs",trailingIcon:"size-5"},lg:{base:"px-3 py-2 text-sm gap-2",leading:"ps-3",trailing:"pe-3",leadingIcon:"size-5",leadingAvatarSize:"2xs",trailingIcon:"size-5"},xl:{base:"px-3 py-2 text-base gap-2",leading:"ps-3",trailing:"pe-3",leadingIcon:"size-6",leadingAvatarSize:"xs",trailingIcon:"size-6"}},variant:{outline:"text-(--ui-text-highlighted) bg-(--ui-bg) ring ring-inset ring-(--ui-border-accented)",soft:"text-(--ui-text-highlighted) bg-(--ui-bg-elevated)/50 hover:bg-(--ui-bg-elevated) focus:bg-(--ui-bg-elevated) disabled:bg-(--ui-bg-elevated)/50",subtle:"text-(--ui-text-highlighted) bg-(--ui-bg-elevated) ring ring-inset ring-(--ui-border-accented)",ghost:"text-(--ui-text-highlighted) bg-transparent hover:bg-(--ui-bg-elevated) focus:bg-(--ui-bg-elevated) disabled:bg-transparent dark:disabled:bg-transparent",none:"text-(--ui-text-highlighted) bg-transparent"},color:{primary:"",secondary:"",success:"",info:"",warning:"",error:"",neutral:""},leading:{true:""},trailing:{true:""},loading:{true:""},highlight:{true:""},type:{file:"file:me-1.5 file:font-medium file:text-(--ui-text-muted) file:outline-none"}},compoundVariants:[{color:"primary",variant:["outline","subtle"],class:"focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-primary)"},{color:"secondary",variant:["outline","subtle"],class:"focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-secondary)"},{color:"success",variant:["outline","subtle"],class:"focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-success)"},{color:"info",variant:["outline","subtle"],class:"focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-info)"},{color:"warning",variant:["outline","subtle"],class:"focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-warning)"},{color:"error",variant:["outline","subtle"],class:"focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-error)"},{color:"primary",highlight:!0,class:"ring ring-inset ring-(--ui-primary)"},{color:"secondary",highlight:!0,class:"ring ring-inset ring-(--ui-secondary)"},{color:"success",highlight:!0,class:"ring ring-inset ring-(--ui-success)"},{color:"info",highlight:!0,class:"ring ring-inset ring-(--ui-info)"},{color:"warning",highlight:!0,class:"ring ring-inset ring-(--ui-warning)"},{color:"error",highlight:!0,class:"ring ring-inset ring-(--ui-error)"},{color:"neutral",variant:["outline","subtle"],class:"focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-border-inverted)"},{color:"neutral",highlight:!0,class:"ring ring-inset ring-(--ui-border-inverted)"},{leading:!0,size:"xs",class:"ps-7"},{leading:!0,size:"sm",class:"ps-8"},{leading:!0,size:"md",class:"ps-9"},{leading:!0,size:"lg",class:"ps-10"},{leading:!0,size:"xl",class:"ps-11"},{trailing:!0,size:"xs",class:"pe-7"},{trailing:!0,size:"sm",class:"pe-8"},{trailing:!0,size:"md",class:"pe-9"},{trailing:!0,size:"lg",class:"pe-10"},{trailing:!0,size:"xl",class:"pe-11"},{loading:!0,leading:!0,class:{leadingIcon:"animate-spin"}},{loading:!0,leading:!1,trailing:!0,class:{trailingIcon:"animate-spin"}}],defaultVariants:{size:"md",color:"primary",variant:"outline"}},Me=["id","type","value","name","placeholder","disabled","required","autocomplete"],Pe=de;var ue;const De=U({extend:U($e),...((ue=Pe.ui)==null?void 0:ue.input)||{}}),rt=ge({inheritAttrs:!1,__name:"Input",props:ie({as:{},id:{},name:{},type:{default:"text"},placeholder:{},color:{},variant:{},size:{},required:{type:Boolean},autocomplete:{default:"off"},autofocus:{type:Boolean},autofocusDelay:{default:0},disabled:{type:Boolean},highlight:{type:Boolean},class:{},ui:{},icon:{},avatar:{},leading:{type:Boolean},leadingIcon:{},trailing:{type:Boolean},trailingIcon:{},loading:{type:Boolean},loadingIcon:{}},{modelValue:{},modelModifiers:{}}),emits:ie(["update:modelValue","blur","change"],["update:modelValue"]),setup(e,{expose:i,emit:n}){const a=e,l=n,u=he(),[f,c]=be(e,"modelValue"),{emitFormBlur:g,emitFormInput:o,emitFormChange:v,size:k,color:N,id:V,name:C,highlight:q,disabled:K,emitFormFocus:I,ariaAttrs:z}=ye(a,{deferInputValidation:!0}),{orientation:T,size:J}=Ie(a),{isLeading:t,isTrailing:s,leadingIconName:p,trailingIconName:b}=xe(a),h=D(()=>J.value||k.value),m=D(()=>De({type:a.type,color:N.value,variant:a.variant,size:h==null?void 0:h.value,loading:a.loading,highlight:q.value,leading:t.value||!!a.avatar||!!u.leading,trailing:s.value||!!u.trailing,buttonGroup:T.value})),y=_(null);function w(){var r;a.autofocus&&((r=y.value)==null||r.focus())}function x(r){c.trim&&(r=(r==null?void 0:r.trim())??null),(c.number||a.type==="number")&&(r=Fe(r)),c.nullify&&(r||(r=null)),f.value=r,o()}function S(r){c.lazy||x(r.target.value)}function F(r){const O=r.target.value;c.lazy&&x(O),c.trim&&(r.target.value=O.trim()),v(),l("change",r)}function B(r){g(),l("blur",r)}return i({inputRef:y}),Z(()=>{setTimeout(()=>{w()},a.autofocusDelay)}),(r,O)=>{var W;return E(),P(d(Se),{as:r.as,class:j(m.value.root({class:[a.class,(W=a.ui)==null?void 0:W.root]}))},{default:fe(()=>{var X,H,ee;return[ze("input",re({id:d(V),ref_key:"inputRef",ref:y,type:r.type,value:d(f),name:d(C),placeholder:r.placeholder,class:m.value.base({class:(X=a.ui)==null?void 0:X.base}),disabled:d(K),required:r.required,autocomplete:r.autocomplete},{...r.$attrs,...d(z)},{onInput:S,onBlur:B,onChange:F,onFocus:O[0]||(O[0]=(...A)=>d(I)&&d(I)(...A))}),null,16,Me),Q(r.$slots,"default"),d(t)||r.avatar||u.leading?(E(),ne("span",{key:0,class:j(m.value.leading({class:(H=a.ui)==null?void 0:H.leading}))},[Q(r.$slots,"leading",{},()=>{var A,te,ae;return[d(t)&&d(p)?(E(),P(se,{key:0,name:d(p),class:j(m.value.leadingIcon({class:(A=a.ui)==null?void 0:A.leadingIcon}))},null,8,["name","class"])):r.avatar?(E(),P(we,re({key:1,size:((te=a.ui)==null?void 0:te.leadingAvatarSize)||m.value.leadingAvatarSize()},r.avatar,{class:m.value.leadingAvatar({class:(ae=a.ui)==null?void 0:ae.leadingAvatar})}),null,16,["size","class"])):Y("",!0)]})],2)):Y("",!0),d(s)||u.trailing?(E(),ne("span",{key:1,class:j(m.value.trailing({class:(ee=a.ui)==null?void 0:ee.trailing}))},[Q(r.$slots,"trailing",{},()=>{var A;return[d(b)?(E(),P(se,{key:0,name:d(b),class:j(m.value.trailingIcon({class:(A=a.ui)==null?void 0:A.trailingIcon}))},null,8,["name","class"])):Y("",!0)]})],2)):Y("",!0)]}),_:3},8,["as","class"])}}});function Ge(e){return e.validate&&e.__isYupSchema__}function Ne(e){return e.inner!==void 0}function qe(e){return"schema"in e&&typeof e.coercer=="function"&&typeof e.validator=="function"&&typeof e.refiner=="function"}function Ke(e){return e.parse!==void 0}function Te(e){return e.validateAsync!==void 0&&e.id!==void 0}function Je(e){return e.isJoi===!0}function Le(e){return"_run"in e||typeof e=="function"&&"schema"in e}function Ye(e){return"~standard"in e}async function Re(e,i){var a;const n=await i["~standard"].validate(e);return n.issues?{errors:((a=n.issues)==null?void 0:a.map(l=>{var u;return{name:((u=l.path)==null?void 0:u.map(f=>typeof f=="object"?f.key:f).join("."))||"",message:l.message}}))||[],result:null}:{errors:null,result:n.value}}async function Qe(e,i){try{return{errors:null,result:await i.validate(e,{abortEarly:!1})}}catch(n){if(Ne(n))return{errors:n.inner.map(l=>({name:l.path??"",message:l.message})),result:null};throw n}}async function Ue(e,i){const[n,a]=i.validate(e);return n?{errors:n.failures().map(u=>({message:u.message,name:u.path.join(".")})),result:null}:{errors:null,result:a}}async function Ze(e,i){const n=await i.safeParseAsync(e);return n.success===!1?{errors:n.error.issues.map(l=>({name:l.path.join("."),message:l.message})),result:null}:{result:n.data,errors:null}}async function We(e,i){try{return{errors:null,result:await i.validateAsync(e,{abortEarly:!1})}}catch(n){if(Je(n))return{errors:n.details.map(l=>({name:l.path.join("."),message:l.message})),result:null};throw n}}async function Xe(e,i){const n=await("_run"in i?i._run({typed:!1,value:e},{}):i(e));return!n.issues||n.issues.length===0?{errors:null,result:"output"in n?n.output:"value"in n?n.value:null}:{errors:n.issues.map(l=>{var u;return{name:((u=l.path)==null?void 0:u.map(f=>f.key).join("."))||"",message:l.message}}),result:null}}function He(e,i){if(Ke(i))return Ze(e,i);if(Te(i))return We(e,i);if(Ye(i))return Re(e,i);if(Le(i))return Xe(e,i);if(Ge(i))return Qe(e,i);if(qe(i))return Ue(e,i);throw new Error("Form validation failed: Unsupported form schema")}class G extends Error{constructor(n,a,l){super("Form validation exception");L(this,"formId");L(this,"errors");L(this,"children");this.formId=n,this.errors=a,this.children=l,Object.setPrototypeOf(this,G.prototype)}}const et={base:""},tt=de;var ce;const at=U({extend:U(et),...((ce=tt.ui)==null?void 0:ce.form)||{}}),st=ge({__name:"Form",props:{id:{},schema:{},state:{},validate:{},validateOn:{default(){return["input","blur","change"]}},disabled:{type:Boolean},validateOnInputDelay:{default:300},class:{},transform:{type:Boolean,default:!0},onSubmit:{}},emits:["submit","error"],setup(e,{expose:i,emit:n}){const a=e,l=n,u=a.id??Be(),f=Oe(`form-${u}`),c=Ae(le,void 0);$(le,f);const g=_(new Map);Z(async()=>{f.on(async t=>{var s;t.type==="attach"?g.value.set(t.formId,{validate:t.validate}):t.type==="detach"?g.value.delete(t.formId):(s=a.validateOn)!=null&&s.includes(t.type)&&!z.value&&(t.type!=="input"?await I({name:t.name,silent:!0,nested:!1}):(t.eager||V.has(t.name))&&await I({name:t.name,silent:!0,nested:!1})),t.type==="blur"&&V.add(t.name),(t.type==="change"||t.type==="input"||t.type==="blur"||t.type==="focus")&&N.add(t.name),(t.type==="change"||t.type==="input")&&k.add(t.name)})}),oe(()=>{f.reset()}),Z(async()=>{c&&(await Ee(),c.emit({type:"attach",validate:I,formId:u}))}),oe(()=>{c&&c.emit({type:"detach",formId:u})});const o=_([]);$("form-errors",o);const v=_({});$(Ce,v);const k=new Set,N=new Set,V=new Set;function C(t){return t.map(s=>{var p;return{...s,id:s!=null&&s.name?(p=v.value[s.name])==null?void 0:p.id:void 0}})}const q=_(null);async function K(){let t=a.validate?await a.validate(a.state)??[]:[];if(a.schema){const{errors:s,result:p}=await He(a.state,a.schema);s?t=t.concat(s):q.value=p}return C(t)}async function I(t={silent:!1,nested:!0,transform:!1}){const s=t.name&&!Array.isArray(t.name)?[t.name]:t.name,p=!s&&t.nested?Array.from(g.value.values()).map(({validate:h})=>h(t).then(()=>{}).catch(m=>{if(!(m instanceof G))throw m;return m})):[];if(s){const h=o.value.filter(y=>!s.some(w=>{var S,F,B;const x=(F=(S=v.value)==null?void 0:S[w])==null?void 0:F.pattern;return w===y.name||x&&((B=y.name)==null?void 0:B.match(x))})),m=(await K()).filter(y=>s.some(w=>{var S,F,B;const x=(F=(S=v.value)==null?void 0:S[w])==null?void 0:F.pattern;return w===y.name||x&&((B=y.name)==null?void 0:B.match(x))}));o.value=h.concat(m)}else o.value=await K();const b=(await Promise.all(p)).filter(h=>h!==void 0);if(o.value.length+b.length>0){if(t.silent)return!1;throw new G(u,o.value,b)}return t.transform&&Object.assign(a.state,q.value),a.state}const z=_(!1);$(_e,R(z));async function T(t){var p;z.value=!0;const s=t;try{s.data=await I({nested:!0,transform:a.transform}),await((p=a.onSubmit)==null?void 0:p.call(a,s))}catch(b){if(!(b instanceof G))throw b;const h={...s,errors:b.errors,children:b.children};l("error",h)}finally{z.value=!1}}const J=D(()=>a.disabled||z.value);return $(je,D(()=>({disabled:J.value,validateOnInputDelay:a.validateOnInputDelay}))),i({validate:I,errors:o,setErrors(t,s){s?o.value=o.value.filter(p=>p.name!==s).concat(C(t)):o.value=C(t)},async submit(){await T(new Event("submit"))},getErrors(t){return t?o.value.filter(s=>s.name===t):o.value},clear(t){t?o.value=o.value.filter(s=>s.name!==t):o.value=[]},disabled:J,dirty:D(()=>!!k.size),dirtyFields:R(k),blurredFields:R(V),touchedFields:R(N)}),(t,s)=>(E(),P(Ve(d(c)?"div":"form"),{id:d(u),class:j(d(at)({class:a.class})),onSubmit:ke(T,["prevent"])},{default:fe(()=>[Q(t.$slots,"default",{errors:o.value})]),_:3},40,["id","class"]))}});export{st as _,rt as a};
