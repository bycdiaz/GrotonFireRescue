!function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:a})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=330)}({330:function(e,t,n){"use strict";window.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=function(e,t){t=t||window;for(var n=0;n<this.length;n++)e.call(t,this[n],n,this)});var a=document.getElementById("category"),r=document.getElementById("submit"),i=document.querySelector("#newCategory"),d=document.querySelector("#images");function o(e){for(;e.childNodes.length>1;)e.removeChild(e.lastChild);l("admin/categorylist").then(function(t){return function(e,t){t.forEach(function(t){var n=document.createElement("option");n.innerText=t.category,n.value=t.category,e.appendChild(n)})}(e,t)}).catch(m)}function c(e){var t=document.getElementById("imageContainer");t.innerHTML="",e.forEach(function(e){var n=document.createElement("div");n.classList.add("imageCard");var a=document.createElement("h3");a.innerText=e.imageName,a.classList.add(e.imageExt),n.appendChild(a);var r=document.createElement("i");r.classList.add("imageFullName"),r.innerText=""+e.imageName+e.imageExt,r.setAttribute("hidden",!0),n.appendChild(r);var i=document.createElement("img");i.setAttribute("src",e.thumbURL),n.appendChild(i);var d=document.createElement("button");d.classList.add("delete"),d.innerText="Delete",n.appendChild(d),t.appendChild(n)});var n=document.createElement("button");n.id="deleteCategory",n.innerText="Delete Category",0===a.selectedIndex&&(n.hidden=!0),t.appendChild(n),document.querySelectorAll(".gallery .delete").forEach(function(e){e.addEventListener("click",u)}),document.getElementById("deleteCategory").addEventListener("click",s)}function u(){var e=this.parentElement.querySelector("i").innerText,t=a.value,n=new XMLHttpRequest;n.open("POST",t+"/"+e+"/delete"),n.onreadystatechange=function(){n.readyState===XMLHttpRequest.DONE&&(202===n.status?f(a,"change"):m(new Error(n.status+" "+n.statusText)))},n.send()}function s(e){var t=a.value,n=new XMLHttpRequest;n.open("POST",t+"/delete"),n.onreadystatechange=function(){n.readyState===XMLHttpRequest.DONE&&(204===n.status?(a.selectedIndex=0,o(a),f(a,"change")):m(new Error(n.status+" "+n.statusText)))},n.send()}function l(e){return new Promise(function(t,n){var a=new XMLHttpRequest;a.open("GET",e),a.onreadystatechange=function(){a.readyState===XMLHttpRequest.DONE&&(200===a.status?t(JSON.parse(a.response)):n(new Error(a.status+" "+a.statusText)))},a.send()})}function m(e){switch(e.message.slice(0,3)){case"413":v("Payload Size too large: Try fewer images at a time");break;case"500":v("There has been a server error try again a few times then conatact Briggs");break;default:v(e)}}function v(e){var t=document.createElement("div");t.classList.add("modal");var n=document.createElement("div");t.appendChild(n),n.classList.add("messageBox");var a=document.createElement("p");n.appendChild(a),a.innerText=e;var r=document.createElement("button");n.appendChild(r),r.innerText="OK",r.id="ok",r.addEventListener("click",p),document.querySelector("body").appendChild(t)}function p(e){e.target.removeEventListener("click",p),e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement)}function g(e,t){return new Promise(function(n,a){var r=new FormData;r.append("category",e);for(var i=0;i<t.length;i++)r.append("images",t[i]);var d=new XMLHttpRequest;d.open("POST",""+e),d.onreadystatechange=function(){d.readyState===XMLHttpRequest.DONE&&(200===d.status?n(d.response):a(new Error(d.status+" "+d.statusText)))},d.send(r)})}function f(e,t){if(document.createEventObject){var n=document.createEventObject();return e.fireEvent("on"+t,n)}var a=document.createEvent("HTMLEvents");return a.initEvent(t,!0,!0),!e.dispatchEvent(a)}o(a),i.oninput=function(e){""!==e.target.value?(a.selectedIndex=0,f(a,"change"),a.setAttribute("disabled",!0)):a.removeAttribute("disabled")},a.onchange=function(e){0===e.target.selectedIndex?c([]):(t=e.target.value,l("admin/"+t)).then(c).catch(m);var t},r.addEventListener("click",function(e){""===i.value&&0===a.selectedIndex&&(new Error("No Category Selected"),t="You must enter a category name or select a category",v(t));var t;0===a.selectedIndex&&""!==i.value?(e.target.value="Uploading...",e.target.setAttribute("disabled",!0),i.setAttribute("disabled",!0),g(i.value,d.files).catch(m).then(function(){f(a,"change"),o(a),i.value="",a.removeAttribute("disabled"),e.target.value="Submit",e.target.removeAttribute("disabled"),i.removeAttribute("disabled")})):a.selectedIndex>0&&(e.target.value="Uploading...",e.target.setAttribute("disabled",!0),i.setAttribute("disabled",!0),g(a.value,d.files).catch(m).then(function(){f(a,"change"),o(a),i.value="",i.removeAttribute("disabled"),a.removeAttribute("disabled"),e.target.value="Submit",e.target.removeAttribute("disabled")}))})}});