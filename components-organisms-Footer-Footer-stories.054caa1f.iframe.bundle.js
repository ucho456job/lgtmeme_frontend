"use strict";(self.webpackChunklgtmeme=self.webpackChunklgtmeme||[]).push([[904],{"./src/components/organisms/Footer/Footer.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,default:()=>Footer_stories});var defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),next_link=__webpack_require__("./node_modules/next/link.js"),link_default=__webpack_require__.n(next_link),Button=__webpack_require__("./src/components/atoms/Button/Button.tsx"),endpoints=__webpack_require__("./src/constants/endpoints.ts");const package_namespaceObject_i8="0.2.25";var css=__webpack_require__("./styled-system/css/index.mjs"),__jsx=react.createElement,Footer=function Footer(){return __jsx("footer",{className:footerCss},__jsx("div",{className:buttonsCss},__jsx(link_default(),{href:endpoints.IH},__jsx(Button.Z,{visual:"text"},"Home")),__jsx(link_default(),{href:endpoints.u3},__jsx(Button.Z,{visual:"text"},"Terms of service")),__jsx(link_default(),{href:endpoints.M$},__jsx(Button.Z,{visual:"text"},"Privacy policy"))),__jsx("div",{className:copyrightCss},"©2023 LGTMeme version ",package_namespaceObject_i8))};Footer.displayName="Footer";var footerCss=(0,css.iv)({bgColor:"GHOUST_WHITE",color:"BLACK",maxWidth:"100vw",height:"210px",md:{height:"140px"}}),copyrightCss=(0,css.iv)({textAlign:"center"}),buttonsCss=(0,css.iv)({display:"flex",justifyContent:"center",paddingTop:"8"});Footer.__docgenInfo={description:"",methods:[],displayName:"Footer"};var _Default$parameters,_Default$parameters2;function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){(0,defineProperty.Z)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}const Footer_stories={title:"organisms/Footer",component:Footer};var Default={};Default.parameters=_objectSpread(_objectSpread({},Default.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Default$parameters=Default.parameters)||void 0===_Default$parameters?void 0:_Default$parameters.docs),{},{source:_objectSpread({originalSource:"{}"},null===(_Default$parameters2=Default.parameters)||void 0===_Default$parameters2||null===(_Default$parameters2=_Default$parameters2.docs)||void 0===_Default$parameters2?void 0:_Default$parameters2.source)})})},"./src/components/atoms/Button/Button.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),_styled_system_css__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./styled-system/css/index.mjs"),__jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement,Button=function Button(_ref){var css=_ref.css,visual=_ref.visual,color=_ref.color,size=_ref.size,radius=_ref.radius,disabled=_ref.disabled,icon=_ref.icon,children=_ref.children,onClick=_ref.onClick;return __jsx("div",{className:css},__jsx("button",{className:buttonRecipe({visual,color,size,radius,disabled}),disabled,onClick},icon,icon&&__jsx("div",{className:iconCss}),children))};Button.displayName="Button";var buttonRecipe=(0,_styled_system_css__WEBPACK_IMPORTED_MODULE_1__.jS)({base:{cursor:"pointer",display:"inline-flex",alignItems:"center",padding:"4",border:"none",outline:"none",textDecoration:"none",fontWeight:"bold",_hover:{opacity:.8},_active:{opacity:1}},variants:{visual:{solid:{},text:{}},color:{black:{color:"BLACK"},red:{color:"RED"},yellow:{bgColor:"YELLOW",color:"BLACK"},lightPink:{bgColor:"LIGHT_PINK",color:"BLACK"}},size:{xs:{padding:"1",fontSize:"xs",minWidth:"12"},sm:{padding:"2",fontSize:"sm",minWidth:"15"},md:{padding:"3",fontSize:"md",minWidth:"18"},lg:{padding:"4",fontSize:"lg",minWidth:"21"}},radius:{true:{borderRadius:"lg"}},disabled:{true:{opacity:.5,cursor:"not-allowed"}}},compoundVariants:[{visual:"solid",color:"black",css:{bgColor:"BLACK",color:"WHITE"}},{visual:"solid",color:"red",css:{bgColor:"RED",color:"WHITE"}}],defaultVariants:{visual:"solid",color:"black",size:"md",radius:!0,disabled:!1}}),iconCss=(0,_styled_system_css__WEBPACK_IMPORTED_MODULE_1__.iv)({width:"1"});Button.__docgenInfo={description:"",methods:[],displayName:"Button",props:{css:{required:!1,tsType:{name:"string"},description:""},visual:{required:!1,tsType:{name:"union",raw:'"solid" | "text"',elements:[{name:"literal",value:'"solid"'},{name:"literal",value:'"text"'}]},description:""},color:{required:!1,tsType:{name:"union",raw:'"black" | "red" | "yellow" | "lightPink"',elements:[{name:"literal",value:'"black"'},{name:"literal",value:'"red"'},{name:"literal",value:'"yellow"'},{name:"literal",value:'"lightPink"'}]},description:""},size:{required:!1,tsType:{name:"union",raw:'"xs" | "sm" | "md" | "lg"',elements:[{name:"literal",value:'"xs"'},{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'}]},description:""},radius:{required:!1,tsType:{name:"boolean"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},icon:{required:!1,tsType:{name:"JSX.Element"},description:""},children:{required:!1,tsType:{name:"string"},description:""},onClick:{required:!1,tsType:{name:"MouseEventHandler",elements:[{name:"HTMLButtonElement"}],raw:"MouseEventHandler<HTMLButtonElement>"},description:""}}};const __WEBPACK_DEFAULT_EXPORT__=Button;try{Button.displayName="Button",Button.__docgenInfo={description:"",displayName:"Button",props:{css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"string"}},visual:{defaultValue:null,description:"",name:"visual",required:!1,type:{name:"enum",value:[{value:'"solid"'},{value:'"text"'}]}},color:{defaultValue:null,description:"",name:"color",required:!1,type:{name:"enum",value:[{value:'"black"'},{value:'"red"'},{value:'"yellow"'},{value:'"lightPink"'}]}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"xs"'}]}},radius:{defaultValue:null,description:"",name:"radius",required:!1,type:{name:"boolean"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},icon:{defaultValue:null,description:"",name:"icon",required:!1,type:{name:"Element"}},onClick:{defaultValue:null,description:"",name:"onClick",required:!1,type:{name:"MouseEventHandler<HTMLButtonElement>"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/atoms/Button/Button.tsx#Button"]={docgenInfo:Button.__docgenInfo,name:"Button",path:"src/components/atoms/Button/Button.tsx#Button"})}catch(__react_docgen_typescript_loader_error){}},"./src/constants/endpoints.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{IH:()=>HOME_PAGE_ENDPOINT,M$:()=>PRIVACY_POLICY_ENDPOINT,u3:()=>TERMS_OF_SERVICE_ENDPOINT});var HOME_PAGE_ENDPOINT="/",PRIVACY_POLICY_ENDPOINT="/privacy-policy",TERMS_OF_SERVICE_ENDPOINT="/terms-of-service"}}]);