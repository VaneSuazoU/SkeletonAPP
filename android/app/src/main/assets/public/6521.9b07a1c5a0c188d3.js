"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[6521],{6521:(P,l,r)=>{r.r(l),r.d(l,{ion_input_password_toggle:()=>e});var i=r(9672),a=r(4929),u=r(333),d=r(3992),p=r(3664);const e=(()=>{let c=class{constructor(s){(0,i.r)(this,s),this.togglePasswordVisibility=()=>{const{inputElRef:n}=this;n&&(n.type="text"===n.type?"password":"text")},this.color=void 0,this.showIcon=void 0,this.hideIcon=void 0,this.type="password"}onTypeChange(s){"text"===s||"password"===s||(0,a.p)(`ion-input-password-toggle only supports inputs of type "text" or "password". Input of type "${s}" is not compatible.`,this.el)}connectedCallback(){const{el:s}=this,n=this.inputElRef=s.closest("ion-input");n?this.type=n.type:(0,a.p)("No ancestor ion-input found for ion-input-password-toggle. This component must be slotted inside of an ion-input.",s)}disconnectedCallback(){this.inputElRef=null}render(){var s,n;const{color:h,type:E}=this,g=(0,p.b)(this),I=null!==(s=this.showIcon)&&void 0!==s?s:d.x,C=null!==(n=this.hideIcon)&&void 0!==n?n:d.y,y="text"===E;return(0,i.h)(i.f,{key:"ed1c29726ce0c91548f0e2ada61e3f8b5c813d2d",class:(0,u.c)(h,{[g]:!0})},(0,i.h)("ion-button",{key:"9698eccdaedb86cf12d20acc53660371b3af3c55",mode:g,color:h,fill:"clear",shape:"round","aria-checked":y?"true":"false","aria-label":"show password",role:"switch",type:"button",onPointerDown:b=>{b.preventDefault()},onClick:this.togglePasswordVisibility},(0,i.h)("ion-icon",{key:"1f2119c30b56c800d9af44e6499445a0ebb466cf",slot:"icon-only","aria-hidden":"true",icon:y?C:I})))}get el(){return(0,i.i)(this)}static get watchers(){return{type:["onTypeChange"]}}};return c.style={ios:"",md:""},c})()},333:(P,l,r)=>{r.d(l,{c:()=>u,g:()=>p,h:()=>a,o:()=>_});var i=r(467);const a=(o,t)=>null!==t.closest(o),u=(o,t)=>"string"==typeof o&&o.length>0?Object.assign({"ion-color":!0,[`ion-color-${o}`]:!0},t):t,p=o=>{const t={};return(o=>void 0!==o?(Array.isArray(o)?o:o.split(" ")).filter(e=>null!=e).map(e=>e.trim()).filter(e=>""!==e):[])(o).forEach(e=>t[e]=!0),t},f=/^[a-z][a-z0-9+\-.]*:/,_=function(){var o=(0,i.A)(function*(t,e,c,s){if(null!=t&&"#"!==t[0]&&!f.test(t)){const n=document.querySelector("ion-router");if(n)return null!=e&&e.preventDefault(),n.push(t,c,s)}return!1});return function(e,c,s,n){return o.apply(this,arguments)}}()}}]);