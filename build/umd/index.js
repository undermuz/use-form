/*! For license information please see index.js.LICENSE.txt */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.exampleTypescriptPackage=t():e.exampleTypescriptPackage=t()}(this,(()=>(()=>{"use strict";var e={418:e=>{var t=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable;function n(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var o={};return"abcdefghijklmnopqrst".split("").forEach((function(e){o[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},o)).join("")}catch(e){return!1}}()?Object.assign:function(e,s){for(var u,a,l=n(e),i=1;i<arguments.length;i++){for(var c in u=Object(arguments[i]))r.call(u,c)&&(l[c]=u[c]);if(t){a=t(u);for(var f=0;f<a.length;f++)o.call(u,a[f])&&(l[a[f]]=u[a[f]])}}return l}},251:(e,t,r)=>{r(418);var o=r(294),n=60103;if(t.Fragment=60107,"function"==typeof Symbol&&Symbol.for){var s=Symbol.for;n=s("react.element"),t.Fragment=s("react.fragment")}var u=o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,a=Object.prototype.hasOwnProperty,l={key:!0,ref:!0,__self:!0,__source:!0};function i(e,t,r){var o,s={},i=null,c=null;for(o in void 0!==r&&(i=""+r),void 0!==t.key&&(i=""+t.key),void 0!==t.ref&&(c=t.ref),t)a.call(t,o)&&!l.hasOwnProperty(o)&&(s[o]=t[o]);if(e&&e.defaultProps)for(o in t=e.defaultProps)void 0===s[o]&&(s[o]=t[o]);return{$$typeof:n,type:e,key:i,ref:c,props:s,_owner:u.current}}t.jsx=i,t.jsxs=i},408:(e,t,r)=>{var o=r(418),n=60103,s=60106;t.Fragment=60107,t.StrictMode=60108,t.Profiler=60114;var u=60109,a=60110,l=60112;t.Suspense=60113;var i=60115,c=60116;if("function"==typeof Symbol&&Symbol.for){var f=Symbol.for;n=f("react.element"),s=f("react.portal"),t.Fragment=f("react.fragment"),t.StrictMode=f("react.strict_mode"),t.Profiler=f("react.profiler"),u=f("react.provider"),a=f("react.context"),l=f("react.forward_ref"),t.Suspense=f("react.suspense"),i=f("react.memo"),c=f("react.lazy")}var d="function"==typeof Symbol&&Symbol.iterator;function p(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var y={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},m={};function _(e,t,r){this.props=e,this.context=t,this.refs=m,this.updater=r||y}function S(){}function E(e,t,r){this.props=e,this.context=t,this.refs=m,this.updater=r||y}_.prototype.isReactComponent={},_.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(p(85));this.updater.enqueueSetState(this,e,t,"setState")},_.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},S.prototype=_.prototype;var v=E.prototype=new S;v.constructor=E,o(v,_.prototype),v.isPureReactComponent=!0;var h={current:null},b=Object.prototype.hasOwnProperty,g={key:!0,ref:!0,__self:!0,__source:!0};function F(e,t,r){var o,s={},u=null,a=null;if(null!=t)for(o in void 0!==t.ref&&(a=t.ref),void 0!==t.key&&(u=""+t.key),t)b.call(t,o)&&!g.hasOwnProperty(o)&&(s[o]=t[o]);var l=arguments.length-2;if(1===l)s.children=r;else if(1<l){for(var i=Array(l),c=0;c<l;c++)i[c]=arguments[c+2];s.children=i}if(e&&e.defaultProps)for(o in l=e.defaultProps)void 0===s[o]&&(s[o]=l[o]);return{$$typeof:n,type:e,key:u,ref:a,props:s,_owner:h.current}}function O(e){return"object"==typeof e&&null!==e&&e.$$typeof===n}var T=/\/+/g;function R(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function w(e,t,r,o,u){var a=typeof e;"undefined"!==a&&"boolean"!==a||(e=null);var l=!1;if(null===e)l=!0;else switch(a){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case n:case s:l=!0}}if(l)return u=u(l=e),e=""===o?"."+R(l,0):o,Array.isArray(u)?(r="",null!=e&&(r=e.replace(T,"$&/")+"/"),w(u,t,r,"",(function(e){return e}))):null!=u&&(O(u)&&(u=function(e,t){return{$$typeof:n,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(u,r+(!u.key||l&&l.key===u.key?"":(""+u.key).replace(T,"$&/")+"/")+e)),t.push(u)),1;if(l=0,o=""===o?".":o+":",Array.isArray(e))for(var i=0;i<e.length;i++){var c=o+R(a=e[i],i);l+=w(a,t,r,c,u)}else if(c=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=d&&e[d]||e["@@iterator"])?e:null}(e),"function"==typeof c)for(e=c.call(e),i=0;!(a=e.next()).done;)l+=w(a=a.value,t,r,c=o+R(a,i++),u);else if("object"===a)throw t=""+e,Error(p(31,"[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t));return l}function C(e,t,r){if(null==e)return e;var o=[],n=0;return w(e,o,"","",(function(e){return t.call(r,e,n++)})),o}function I(e){if(-1===e._status){var t=e._result;t=t(),e._status=0,e._result=t,t.then((function(t){0===e._status&&(t=t.default,e._status=1,e._result=t)}),(function(t){0===e._status&&(e._status=2,e._result=t)}))}if(1===e._status)return e._result;throw e._result}var j={current:null};function P(){var e=j.current;if(null===e)throw Error(p(321));return e}var x={ReactCurrentDispatcher:j,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:h,IsSomeRendererActing:{current:!1},assign:o};t.Children={map:C,forEach:function(e,t,r){C(e,(function(){t.apply(this,arguments)}),r)},count:function(e){var t=0;return C(e,(function(){t++})),t},toArray:function(e){return C(e,(function(e){return e}))||[]},only:function(e){if(!O(e))throw Error(p(143));return e}},t.Component=_,t.PureComponent=E,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=x,t.cloneElement=function(e,t,r){if(null==e)throw Error(p(267,e));var s=o({},e.props),u=e.key,a=e.ref,l=e._owner;if(null!=t){if(void 0!==t.ref&&(a=t.ref,l=h.current),void 0!==t.key&&(u=""+t.key),e.type&&e.type.defaultProps)var i=e.type.defaultProps;for(c in t)b.call(t,c)&&!g.hasOwnProperty(c)&&(s[c]=void 0===t[c]&&void 0!==i?i[c]:t[c])}var c=arguments.length-2;if(1===c)s.children=r;else if(1<c){i=Array(c);for(var f=0;f<c;f++)i[f]=arguments[f+2];s.children=i}return{$$typeof:n,type:e.type,key:u,ref:a,props:s,_owner:l}},t.createContext=function(e,t){return void 0===t&&(t=null),(e={$$typeof:a,_calculateChangedBits:t,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:u,_context:e},e.Consumer=e},t.createElement=F,t.createFactory=function(e){var t=F.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:l,render:e}},t.isValidElement=O,t.lazy=function(e){return{$$typeof:c,_payload:{_status:-1,_result:e},_init:I}},t.memo=function(e,t){return{$$typeof:i,type:e,compare:void 0===t?null:t}},t.useCallback=function(e,t){return P().useCallback(e,t)},t.useContext=function(e,t){return P().useContext(e,t)},t.useDebugValue=function(){},t.useEffect=function(e,t){return P().useEffect(e,t)},t.useImperativeHandle=function(e,t,r){return P().useImperativeHandle(e,t,r)},t.useLayoutEffect=function(e,t){return P().useLayoutEffect(e,t)},t.useMemo=function(e,t){return P().useMemo(e,t)},t.useReducer=function(e,t,r){return P().useReducer(e,t,r)},t.useRef=function(e){return P().useRef(e)},t.useState=function(e){return P().useState(e)},t.version="17.0.2"},294:(e,t,r)=>{e.exports=r(408)},893:(e,t,r)=>{e.exports=r(251)},907:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useFormContext=t.defaultValidate=void 0;const o=r(294),n=r(445);t.defaultValidate=({errors:e={}})=>e;const s={...(0,n.getInitialState)(),send:()=>Promise.resolve(),IsFormValid:e=>!0,setValue:(e,t,r,o,n)=>{},setTouchedByName:(e,t,r)=>{},setTouched:(e,t,r)=>{},setValues:(e,t,r,o)=>{},setTests:(e,t,r)=>{},setValidate:(e,t,r)=>{},setErrors:e=>{},store:{getState:()=>(0,n.getInitialState)(),dispatch:(...e)=>{}},dispatch:(...e)=>{}},u=(0,o.createContext)(s);u.displayName="FormContext",t.useFormContext=()=>{const e=(0,o.useContext)(u);if(!e)throw new Error("You must wrap your component in form provider");return e},t.default=u},495:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=r(294),n=r(907);t.default=e=>{var t,r;const[s,u]=(0,o.useState)(!1),{IsFilled:a=Boolean,name:l,inputName:i,disabled:c,type:f="connect-to-form",onRefInput:d,onRef:p}=e,y=(0,n.useFormContext)(),{isSending:m=!1,values:_={},touched:S=[],errors:E=[],fields:v={},setValue:h,setTouchedByName:b}=y,g=_[l],F=E[l],O=S.indexOf(l)>-1,T=a(g),R=Boolean(F)&&O,w=!R&&O&&a(g),C=(0,o.useMemo)((()=>{if(d)return e=>{d(l,e)}}),[l,d]),I=(0,o.useMemo)((()=>{if(p)return e=>{p(l,e)}}),[l,p]),j=(0,o.useCallback)((()=>{u(!0)}),[]),P=(0,o.useCallback)((()=>{b(l),u(!1)}),[b]),x=(0,o.useCallback)((e=>{h(l,e,!1,!0,f)}),[h,l,f]);return e.children?(0,o.cloneElement)(e.children,{name:i||l,value:g,label:(null===(r=null===(t=e.children)||void 0===t?void 0:t.props)||void 0===r?void 0:r.label)||v[l],focused:s,touched:O,filled:T,disabled:m||c,isError:R,isSuccess:w,error:!!R&&F,success:w,onChange:x,onFocus:j,onBlur:P,onRefInput:C,onRef:I}):(console.error("ConnectToForm must have a children"),null)}},842:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=r(893),n=r(506);t.default=e=>{const{children:t,isCanceling:r=!1,isSending:s=!1,isSuccess:u=!1,hasErrors:a}=e,l=(0,n.useIsFormHasErrors)(),i=(0,n.useIsFormSuccess)(),c=(0,n.useIsFormCanceling)(),f=(0,n.useIsFormSending)();return a&&!l||u&&!i||r&&!c||s&&!f?null:(0,o.jsx)(o.Fragment,{children:t})}},492:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.FormSendError=t.FormValidateError=void 0;class r extends Error{constructor(e,t){super(e),this.name="FormValidateError",this.errors=t,this.message=e,Object.setPrototypeOf(this,r.prototype)}}t.FormValidateError=r;class o extends Error{constructor(e,t,r){super(e),this.name="FormSendError",this.catchError=t,this.errors=r,this.message=e,Object.setPrototypeOf(this,o.prototype)}}t.FormSendError=o},387:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useSetValidate=t.useSetFieldTouched=t.useSetFieldValue=t.useSetErrors=t.useSetTests=t.useSetValues=t.useSetTouched=t.useIsFormValid=t.isFormHasErrors=void 0;const o=r(294),n=r(266),s=r(365);t.isFormHasErrors=(e,t,r=!0)=>{const{debug:o}=e,n=t.getState(),{validate:u,touched:a,fields:l}=n,i=(null!=u?u:s.getFormErrors)({...n,touched:r?a:Object.keys(l)},o);return[Object.keys(i).length>0,i]},t.useIsFormValid=(e,r,n)=>(0,o.useCallback)(((o=!0)=>!(0,t.isFormHasErrors)(e,r,o)[0]),[]),t.useSetTouched=(e,t,r)=>(0,o.useCallback)(((e,t=!1,o=!0)=>{r({type:n.SET_TOUCHED,payload:{touched:e},silent:t,checkOnlyFilled:o})}),[]),t.useSetValues=(e,t,r)=>(0,o.useCallback)(((e,t=!1,o=!0,s="system")=>{r({type:n.SET_VALUES,payload:{values:e,type:s},silent:t,checkOnlyFilled:o})}),[]),t.useSetTests=(e,t,r)=>(0,o.useCallback)(((e,t=!1,o=!0)=>{r({type:n.SET_TESTS,payload:{tests:e},silent:t,checkOnlyFilled:o})}),[]),t.useSetErrors=(e,t,r)=>(0,o.useCallback)((e=>{r({type:n.SET_ERRORS,payload:{errors:e}})}),[]),t.useSetFieldValue=(e,t,r)=>(0,o.useCallback)(((e,t,o=!1,s=!0,u="system")=>{r({type:n.SET_VALUE,payload:{name:e,value:t,type:u},silent:o,checkOnlyFilled:s})}),[]),t.useSetFieldTouched=(e,t,r)=>(0,o.useCallback)(((e,t=!0,o=!1)=>{r({type:n.SET_TOUCHED_FIELD,payload:{name:e,value:t},silent:o})}),[]),t.useSetValidate=(e,t,r)=>(0,o.useCallback)(((e,t=!1,o=!0)=>{r({type:n.SET_VALIDATE,payload:e,silent:t,checkOnlyFilled:o})}),[])},445:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useFormControl=t.getInitialState=void 0;const o=r(655),n=r(294),s=o.__importStar(r(266)),u=o.__importDefault(r(365)),a=o.__importDefault(r(628)),l=r(387),i=o.__importDefault(r(995)),c={initialValues:{},valueTests:[],fields:{},validate:()=>{}};t.getInitialState=(e=c)=>{const{initialValues:t={},valueTests:r=[],fields:o={},validate:n}=e;return{status:s.EnumFormStatus.Initial,isSending:!1,isCanceling:!1,isSuccess:!1,sendError:null,values:t,tests:r,validate:n,touched:[],fields:o,errors:{}}},t.useFormControl=(e,t,r)=>{const o=(0,l.useSetTouched)(e,t,r),n=(0,l.useSetValues)(e,t,r),s=(0,l.useSetTests)(e,t,r),u=(0,l.useSetValidate)(e,t,r),a=(0,l.useSetErrors)(e,t,r);return{setValue:(0,l.useSetFieldValue)(e,t,r),setTouchedByName:(0,l.useSetFieldTouched)(e,t,r),setTouched:o,setValues:n,setTests:s,setValidate:u,setErrors:a}},t.default=e=>{const r=(0,n.useMemo)((()=>(0,t.getInitialState)(e)),[]),o=(0,n.useMemo)((()=>[...(null==e?void 0:e.middlewares)||[],(0,u.default)(e),(0,a.default)(e)]),[]),[c,f,d]=(0,i.default)(s.default,r,o),p=(0,t.useFormControl)(e,d,f),y=(0,l.useIsFormValid)(e,d,f),m=(0,n.useCallback)((e=>new Promise(((t,r)=>{f({type:s.SEND_FORM,payload:{api:e,onResolve:t,onReject:r}})}))),[]);return{...c,...p,IsFormValid:y,store:d,dispatch:f,send:m}}},628:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=()=>{},n=r(492),s=r(387),u=r(266),a=e=>({type:u.SET_IS_SENDING,payload:e}),l=e=>({type:u.SET_IS_CANCELING,payload:e}),i=e=>({type:u.SET_IS_SUCCESS,payload:e}),c=e=>({type:u.SET_ERRORS,payload:{errors:e}}),f=e=>({type:u.SET_SEND_ERROR,payload:e});t.default=e=>t=>r=>async d=>{const p=r(d);if(d.type!==u.SEND_FORM)return p;const{api:y,onResolve:m=o,onReject:_=o}=d.payload;try{const r=await(async(e,t,r)=>{var o;const{mapServerFields:d,afterSendDelay:p,debug:y=!1}=e,m=t.getState(),_=t.dispatch;_(a(!0)),_(((e,t=!1)=>({type:u.SET_TOUCHED,payload:{touched:e},silent:t}))(Object.keys(m.fields),!0));const[S,E]=(0,s.isFormHasErrors)(e,t,!1);if(y&&console.log(`[useForm][send][Is form valid: ${S?"no":"yes"}]`,E),S)throw _(c(E)),_(l(!0)),setTimeout((()=>{_(l(!1))}),p),_(a(!1)),new n.FormValidateError("Form is invalid");try{_(f(null)),y&&console.log("[useForm][send][Sending]",m.values);const e=await r(m.values);return y&&console.log("[useForm][send][Success]"),_(i(!0)),setTimeout((()=>{_(i(!1))}),p),_(a(!1)),{response:e,values:m.values}}catch(e){const t={};let r=!1;if(null===(o=null==e?void 0:e.__meta__)||void 0===o?void 0:o.formInfo){const{formInfo:o}=e.__meta__;o.fieldsErrors&&Object.keys(o.fieldsErrors).forEach((e=>{var n;let s=null!==(n=d[e])&&void 0!==n?n:e;r=!0,t[s]=o.fieldsErrors[e]}))}throw y&&(console.error("[useForm][send][Fail]",null==e?void 0:e.message),console.error(e)),_(f(e)),_(l(!0)),setTimeout((()=>{_(l(!1))}),p),_(a(!1)),r&&_(c(t)),new n.FormSendError("Request has failed",e,t)}})(e,t,y);return m(r),r}catch(e){throw _(e),e}}},365:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getFormErrors=void 0;const o=r(266);t.getFormErrors=(e,t=!1)=>{const{tests:r}=e;let o={};return t&&console.log("[useForm][getFormErrors]",e),(null==r?void 0:r.length)?(r.forEach(((r,n)=>{const[s,u,a]=r;t&&console.log(`[useForm][getFormErrors][Test #${n+1}]`,{names:s,testList:u,errorText:a}),null==s||s.forEach((r=>{let s=!1;e.touched.indexOf(r)>-1?u.forEach((o=>{const u=e.values[r];t&&console.log(`[useForm][getFormErrors][Test #${n+1}][${r}][Begin]`,{test:o,value:u}),o(u)?t&&console.log(`[useForm][getFormErrors][Test #${n+1}][${r}][Success]`):(s=!0,t&&console.log(`[useForm][getFormErrors][Test #${n+1}][${r}][Error: ${a}]`,{test:o,value:u}))})):t&&console.log(`[useForm][getFormErrors][Test #${n+1}][${r}][Skip - isn't touched]`),s&&(-1===Object.keys(o).indexOf(r)&&(o[r]=[]),o[r].push(a))}))})),t&&console.log(`[useForm][getFormErrors][Errors: ${Object.keys(o).length}]`,o),o):(t&&console.log("[useForm][getFormErrors][Tests are not set]",e),o)},t.default=(e={})=>r=>n=>s=>{const{log:u=!0}=e,a=n(s);if(s.type===o.SET_VALUE||s.type===o.SET_VALUES||s.type===o.SET_TESTS||s.type===o.SET_TOUCHED_FIELD||s.type===o.SET_TOUCHED||s.type===o.SET_FIELDS||s.type===o.SET_VALIDATE||s.type===o.VALIDATE_FORM){const{silent:e=!1,checkOnlyFilled:n=!0}=s;if(!e){const{validate:e=null}=s.payload,a=null!=e?e:t.getFormErrors,l=r.getState(),i=a({...l,touched:n?l.touched:Object.keys(l.fields)},u);r.dispatch({type:o.SET_ERRORS,payload:{errors:i}})}}return a}},266:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.formReducer=t.sendErrorReducer=t.isSuccessReducer=t.isCancelingReducer=t.isSendingReducer=t.validateReducer=t.fieldsReducer=t.errorsReducer=t.touchedReducer=t.testsReducer=t.valuesReducer=t.EnumFormStatus=t.SEND_FORM=t.VALIDATE_FORM=t.SET_SEND_ERROR=t.SET_IS_SUCCESS=t.SET_IS_CANCELING=t.SET_IS_SENDING=t.SET_VALIDATE=t.SET_FIELDS=t.SET_ERRORS=t.SET_TOUCHED=t.SET_TOUCHED_FIELD=t.SET_TESTS=t.SET_VALUE=t.SET_VALUES=void 0;const r=e=>Boolean(e)&&["[object Function]","[object AsyncFunction]"].includes({}.toString.call(e));t.SET_VALUES="set_values",t.SET_VALUE="set_value",t.SET_TESTS="set_tests",t.SET_TOUCHED_FIELD="set_touched_field",t.SET_TOUCHED="set_touched",t.SET_ERRORS="set_errors",t.SET_FIELDS="set_fields",t.SET_VALIDATE="set_validate",t.SET_IS_SENDING="set_is_sending",t.SET_IS_CANCELING="set_is_canceling",t.SET_IS_SUCCESS="set_is_success",t.SET_SEND_ERROR="set_send_error",t.VALIDATE_FORM="validate_form",t.SEND_FORM="send_form",(t.EnumFormStatus||(t.EnumFormStatus={})).Initial="initial",t.valuesReducer=(e,o)=>{switch(o.type){case t.SET_VALUES:return r(o.payload.values)?o.payload.values(e):o.payload.values;case t.SET_VALUE:return r(o.payload.value)?{...e,[o.payload.name]:o.payload.value(e[o.payload.name])}:{...e,[o.payload.name]:o.payload.value};default:return e}},t.testsReducer=(e,o)=>o.type===t.SET_TESTS?r(o.payload.tests)?o.payload.tests(e):o.payload.tests:e,t.touchedReducer=(e,o)=>{switch(o.type){case t.SET_TOUCHED:return r(o.payload.touched)?o.payload.touched(e):o.payload.touched;case t.SET_TOUCHED_FIELD:{const{name:t,value:r=!0}=o.payload;let n=e;return r&&-1===e.indexOf(t)?n=[...e,t]:!r&&e.indexOf(t)>-1&&(n=e.filter((e=>e!==t))),n}default:return e}},t.errorsReducer=(e,o)=>o.type===t.SET_ERRORS?r(o.payload.errors)?o.payload.errors(e):o.payload.errors:e,t.fieldsReducer=(e,o)=>o.type===t.SET_FIELDS?r(o.payload.fields)?o.payload.fields(e):o.payload.fields:e,t.validateReducer=(e,r)=>r.type===t.SET_VALIDATE?r.payload.validate:e,t.isSendingReducer=(e,r)=>r.type===t.SET_IS_SENDING?Boolean(r.payload):e,t.isCancelingReducer=(e,r)=>r.type===t.SET_IS_CANCELING?Boolean(r.payload):e,t.isSuccessReducer=(e,r)=>r.type===t.SET_IS_SUCCESS?Boolean(r.payload):e,t.sendErrorReducer=(e,r)=>r.type===t.SET_SEND_ERROR?r.payload||null:e,t.formReducer=(e,r)=>({...e,values:(0,t.valuesReducer)(e.values,r),fields:(0,t.fieldsReducer)(e.fields,r),tests:(0,t.testsReducer)(e.tests,r),touched:(0,t.touchedReducer)(e.touched,r),errors:(0,t.errorsReducer)(e.errors,r),validate:(0,t.validateReducer)(e.validate,r),isSending:(0,t.isSendingReducer)(e.isSending,r),isCanceling:(0,t.isCancelingReducer)(e.isCanceling,r),isSuccess:(0,t.isSuccessReducer)(e.isSuccess,r),sendError:(0,t.sendErrorReducer)(e.sendError,r)}),t.default=t.formReducer},995:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=r(294);t.default=(e,t,r=[])=>{const[n,s]=(0,o.useState)(t),u=(0,o.useRef)(t),a=(0,o.useCallback)((t=>(u.current=e(u.current,t),s(u.current),t)),[]),l=(0,o.useMemo)((()=>{const e={getState:()=>u.current,dispatch:(...e)=>t(...e)},t=function(...e){return 0===e.length?e=>e:1===e.length?e[0]:e.reduce(((e,t)=>(...r)=>e(t(...r))))}(...r.map((t=>t(e))))(a);return t}),[]),i=(0,o.useMemo)((()=>({getState:()=>u.current,dispatch:(...e)=>l(...e)})),[]);return[n,l,i]}},506:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useFormSubmit=t.useFormErrors=t.useIsFormHasErrors=t.useIsFormSending=t.useIsFormCanceling=t.useIsFormSuccess=void 0;const o=r(294),n=r(907);t.useIsFormSuccess=()=>(0,n.useFormContext)().isSuccess,t.useIsFormCanceling=()=>(0,n.useFormContext)().isCanceling,t.useIsFormSending=()=>(0,n.useFormContext)().isSending,t.useIsFormHasErrors=()=>{const e=(0,n.useFormContext)();return Object.keys(e.errors).length>0},t.useFormErrors=()=>(0,n.useFormContext)().errors,t.useFormSubmit=(e,t,r)=>{const{send:s}=(0,n.useFormContext)();return(0,o.useCallback)((()=>{s(e).then(t,r)}),[s,e,t,r])}},655:(e,t,r)=>{r.r(t),r.d(t,{__assign:()=>s,__asyncDelegator:()=>b,__asyncGenerator:()=>h,__asyncValues:()=>g,__await:()=>v,__awaiter:()=>c,__classPrivateFieldGet:()=>w,__classPrivateFieldSet:()=>C,__createBinding:()=>d,__decorate:()=>a,__exportStar:()=>p,__extends:()=>n,__generator:()=>f,__importDefault:()=>R,__importStar:()=>T,__makeTemplateObject:()=>F,__metadata:()=>i,__param:()=>l,__read:()=>m,__rest:()=>u,__spread:()=>_,__spreadArray:()=>E,__spreadArrays:()=>S,__values:()=>y});var o=function(e,t){return o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},o(e,t)};function n(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}var s=function(){return s=Object.assign||function(e){for(var t,r=1,o=arguments.length;r<o;r++)for(var n in t=arguments[r])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e},s.apply(this,arguments)};function u(e,t){var r={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(r[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var n=0;for(o=Object.getOwnPropertySymbols(e);n<o.length;n++)t.indexOf(o[n])<0&&Object.prototype.propertyIsEnumerable.call(e,o[n])&&(r[o[n]]=e[o[n]])}return r}function a(e,t,r,o){var n,s=arguments.length,u=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)u=Reflect.decorate(e,t,r,o);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(u=(s<3?n(u):s>3?n(t,r,u):n(t,r))||u);return s>3&&u&&Object.defineProperty(t,r,u),u}function l(e,t){return function(r,o){t(r,o,e)}}function i(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)}function c(e,t,r,o){return new(r||(r=Promise))((function(n,s){function u(e){try{l(o.next(e))}catch(e){s(e)}}function a(e){try{l(o.throw(e))}catch(e){s(e)}}function l(e){var t;e.done?n(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(u,a)}l((o=o.apply(e,t||[])).next())}))}function f(e,t){var r,o,n,s,u={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return s={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function a(s){return function(a){return function(s){if(r)throw new TypeError("Generator is already executing.");for(;u;)try{if(r=1,o&&(n=2&s[0]?o.return:s[0]?o.throw||((n=o.return)&&n.call(o),0):o.next)&&!(n=n.call(o,s[1])).done)return n;switch(o=0,n&&(s=[2&s[0],n.value]),s[0]){case 0:case 1:n=s;break;case 4:return u.label++,{value:s[1],done:!1};case 5:u.label++,o=s[1],s=[0];continue;case 7:s=u.ops.pop(),u.trys.pop();continue;default:if(!((n=(n=u.trys).length>0&&n[n.length-1])||6!==s[0]&&2!==s[0])){u=0;continue}if(3===s[0]&&(!n||s[1]>n[0]&&s[1]<n[3])){u.label=s[1];break}if(6===s[0]&&u.label<n[1]){u.label=n[1],n=s;break}if(n&&u.label<n[2]){u.label=n[2],u.ops.push(s);break}n[2]&&u.ops.pop(),u.trys.pop();continue}s=t.call(e,u)}catch(e){s=[6,e],o=0}finally{r=n=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,a])}}}var d=Object.create?function(e,t,r,o){void 0===o&&(o=r),Object.defineProperty(e,o,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,o){void 0===o&&(o=r),e[o]=t[r]};function p(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||d(t,e,r)}function y(e){var t="function"==typeof Symbol&&Symbol.iterator,r=t&&e[t],o=0;if(r)return r.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&o>=e.length&&(e=void 0),{value:e&&e[o++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function m(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var o,n,s=r.call(e),u=[];try{for(;(void 0===t||t-- >0)&&!(o=s.next()).done;)u.push(o.value)}catch(e){n={error:e}}finally{try{o&&!o.done&&(r=s.return)&&r.call(s)}finally{if(n)throw n.error}}return u}function _(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(m(arguments[t]));return e}function S(){for(var e=0,t=0,r=arguments.length;t<r;t++)e+=arguments[t].length;var o=Array(e),n=0;for(t=0;t<r;t++)for(var s=arguments[t],u=0,a=s.length;u<a;u++,n++)o[n]=s[u];return o}function E(e,t,r){if(r||2===arguments.length)for(var o,n=0,s=t.length;n<s;n++)!o&&n in t||(o||(o=Array.prototype.slice.call(t,0,n)),o[n]=t[n]);return e.concat(o||Array.prototype.slice.call(t))}function v(e){return this instanceof v?(this.v=e,this):new v(e)}function h(e,t,r){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var o,n=r.apply(e,t||[]),s=[];return o={},u("next"),u("throw"),u("return"),o[Symbol.asyncIterator]=function(){return this},o;function u(e){n[e]&&(o[e]=function(t){return new Promise((function(r,o){s.push([e,t,r,o])>1||a(e,t)}))})}function a(e,t){try{(r=n[e](t)).value instanceof v?Promise.resolve(r.value.v).then(l,i):c(s[0][2],r)}catch(e){c(s[0][3],e)}var r}function l(e){a("next",e)}function i(e){a("throw",e)}function c(e,t){e(t),s.shift(),s.length&&a(s[0][0],s[0][1])}}function b(e){var t,r;return t={},o("next"),o("throw",(function(e){throw e})),o("return"),t[Symbol.iterator]=function(){return this},t;function o(o,n){t[o]=e[o]?function(t){return(r=!r)?{value:v(e[o](t)),done:"return"===o}:n?n(t):t}:n}}function g(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t,r=e[Symbol.asyncIterator];return r?r.call(e):(e=y(e),t={},o("next"),o("throw"),o("return"),t[Symbol.asyncIterator]=function(){return this},t);function o(r){t[r]=e[r]&&function(t){return new Promise((function(o,n){!function(e,t,r,o){Promise.resolve(o).then((function(t){e({value:t,done:r})}),t)}(o,n,(t=e[r](t)).done,t.value)}))}}}function F(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e}var O=Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t};function T(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&d(t,e,r);return O(t,e),t}function R(e){return e&&e.__esModule?e:{default:e}}function w(e,t,r,o){if("a"===r&&!o)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!o:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===r?o:"a"===r?o.call(e):o?o.value:t.get(e)}function C(e,t,r,o,n){if("m"===o)throw new TypeError("Private method is not writable");if("a"===o&&!n)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!n:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===o?n.call(e,r):n?n.value=r:t.set(e,r),r}}},t={};function r(o){var n=t[o];if(void 0!==n)return n.exports;var s=t[o]={exports:{}};return e[o](s,s.exports,r),s.exports}r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};return(()=>{var e=o;Object.defineProperty(e,"__esModule",{value:!0}),e.useFormSubmit=e.useFormErrors=e.useIsFormHasErrors=e.useIsFormSending=e.useIsFormCanceling=e.useIsFormSuccess=e.useReducer=e.EnumFormStatus=e.useFormContext=e.ConnectToForm=e.FormContext=e.IfForm=void 0;const t=r(655),n=t.__importDefault(r(445)),s=t.__importDefault(r(995));e.useReducer=s.default;const u=r(266);Object.defineProperty(e,"EnumFormStatus",{enumerable:!0,get:function(){return u.EnumFormStatus}});const a=t.__importStar(r(907));e.FormContext=a.default,Object.defineProperty(e,"useFormContext",{enumerable:!0,get:function(){return a.useFormContext}});const l=t.__importDefault(r(495));e.ConnectToForm=l.default;const i=r(506);Object.defineProperty(e,"useIsFormSuccess",{enumerable:!0,get:function(){return i.useIsFormSuccess}}),Object.defineProperty(e,"useIsFormCanceling",{enumerable:!0,get:function(){return i.useIsFormCanceling}}),Object.defineProperty(e,"useIsFormSending",{enumerable:!0,get:function(){return i.useIsFormSending}}),Object.defineProperty(e,"useIsFormHasErrors",{enumerable:!0,get:function(){return i.useIsFormHasErrors}}),Object.defineProperty(e,"useFormErrors",{enumerable:!0,get:function(){return i.useFormErrors}}),Object.defineProperty(e,"useFormSubmit",{enumerable:!0,get:function(){return i.useFormSubmit}});const c=t.__importDefault(r(842));e.IfForm=c.default,e.default=n.default})(),o})()));