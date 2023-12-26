(()=>{"use strict";function e(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var t={baseUrl:"https://nomoreparties.co/v1/wff-cohort-2",headers:{authorization:"3a6a22df-0b86-4e1d-82b6-49402f2e54e3","Content-Type":"application/json"}};document.querySelector(".popup__caption");var n=document.querySelector("#card-template"),r=document.querySelector(".popup_type_edit"),o=document.querySelector(".popup__input_type_name"),c=document.querySelector(".popup_type_confirm"),a=document.querySelector(".popup_type_avatar"),u=document.getElementById("button-confirm-save"),i=(document.querySelector(".popup__input_type_card-name"),document.querySelector(".profile__title")),l=document.querySelector(".popup__input_type_description"),s=(document.querySelector(".popup__input_type_url"),document.querySelector(".profile__description")),d=document.getElementById("edit-profile"),p=document.querySelector(".popup_type_new-card"),m=document.getElementById("new-place"),f=document.querySelector(".places__list"),_=(document.querySelectorAll(".card"),document.querySelector(".card__delete-button"),document.querySelector(".profile__edit-button")),y=document.querySelector(".profile__add-button"),v=document.querySelector(".popup_type_image"),S=document.getElementById("avatar"),h=(a.querySelector(".popup__button"),r.querySelector(".popup__close")),b=p.querySelector(".popup__close"),k=v.querySelector(".popup__close"),g=c.querySelector(".popup__close"),E=a.querySelector(".popup__close"),q=document.getElementById("button-edit-save"),L=document.getElementById("button-add-save"),C=(document.getElementById("image"),document.getElementById("title")),x=document.getElementById("description"),I=(document.getElementById("card-image"),document.getElementById("card-title"),document.querySelector(".profile__image")),j=a.querySelector(".popup__input_avatar"),A=(a.querySelector(".pop-up__error-message"),document.getElementById("button-avatar-save")),B=(document.querySelector(".pop-up__input"),v.querySelector(".popup__image")),P=m.querySelector(".popup__input_type_card-name"),w=m.querySelector(".popup__input_type_url");function O(e){var t=e.currentTarget;e.target===t&&(document.removeEventListener("keydown",T),N(t))}function T(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&N(t)}}function U(e){document.addEventListener("keydown",T),e.classList.add("popup_is-opened")}function N(e){document.removeEventListener("keydown",T),e.classList.remove("popup_is-opened")}function J(e,t,r,o,a,i,l,s){var d=n.content.querySelector(".card").cloneNode(!0),p=d.querySelector(".card__title"),m=d.querySelector(".card__image"),f=d.querySelector(".card__like-button"),_=d.querySelector(".card__like-numbers"),y=d.querySelector(".card__delete-button");return(JSON.parse(localStorage.getItem("likes"))||{})[i]&&d.querySelector(".card__like-button").classList.add("card__like-button_is-active"),p.textContent=e,m.src=t,m.alt=e,_.textContent=r.length,f.addEventListener("click",(function(){o(f,i)})),y.addEventListener("click",(function(){D(i),U(c),u.addEventListener("click",(function e(){M(d,i),u.removeEventListener("click",e)}))})),m.addEventListener("click",(function(){a(e,t,d)})),l===s?D(d):function(e){e.querySelector(".card__delete-button").style.display="none"}(d),d}function D(e){u.setAttribute("data-card-id",e)}function M(e,n){u.textContent="Удаление...",Promise.resolve().then((function(){return function(e){return fetch("".concat(t.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(n)})).then((function(t){!function(e){e.remove()}(e),N(c)})).catch((function(e){console.error("Ошибка при удалении карты:",e)})).finally((function(){u.textContent="Да"}))}function V(e,n){var r=e.parentElement.querySelector(".card__like-numbers"),o=e.classList.contains("card__like-button_is-active"),c=function(e){r&&(r.textContent=e)};o?function(e){return fetch("".concat(t.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(n).then((function(){e.classList.remove("card__like-button_is-active"),c(parseInt(r.textContent,10)-1);var t=JSON.parse(localStorage.getItem("likes"))||{};t[n]=!1,localStorage.setItem("likes",JSON.stringify(t))})).catch((function(e){console.error("Ошибка при удалении лайка:",e)})):function(e){return fetch("".concat(t.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(n).then((function(){e.classList.add("card__like-button_is-active"),c(parseInt(r.textContent,10)+1);var t=JSON.parse(localStorage.getItem("likes"))||{};t[n]=!0,localStorage.setItem("likes",JSON.stringify(t))})).catch((function(e){console.error("Ошибка при добавлении лайка:",e)}))}function $(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=Array.from(e.querySelectorAll(t.inputSelector));Array.from(e.querySelectorAll(".popup__error-message")),r.forEach((function(t){var r=t.dataset.errorMessage,o=e.querySelector("#".concat(r));t.classList.remove("popup__input_error"),o.textContent="",o.style.display="none";var c=t.name;n.hasOwnProperty(c)?t.value=n[c]:t.value=""}));var o=e.querySelector(t.submitButtonSelector);o.disabled=!0,o.classList.add(t.inactiveButtonClass)}r.addEventListener("click",O),p.addEventListener("click",O),v.addEventListener("click",O),c.addEventListener("click",O),a.addEventListener("click",O);var z,G={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:".popup__input_error",errorClass:".popup__error-message"};!function(e){function t(e,t){var n=t.dataset.errorMessage,r=e.querySelector("#".concat(n));t.classList.add("popup__input_error"),r.textContent=t.validationMessage,r.style.display="block"}function n(e,t){var n=t.dataset.errorMessage,r=e.querySelector("#".concat(n));t.classList.remove("popup__input_error"),r.textContent="",r.style.display="none"}function r(t,n){n.disabled=!t.checkValidity(),n.disabled?n.classList.add(e.inactiveButtonClass):n.classList.remove(e.inactiveButtonClass)}document.querySelectorAll(e.formSelector).forEach((function(o){!function(o){Array.from(o.querySelectorAll(e.inputSelector)).forEach((function(o){o.addEventListener("input",(function(){!function(o){var c=o.closest(e.formSelector);!function(e,r){r.setCustomValidity(""),r.validity.valid?r.value.trim()?/^(ftp|http|https):\/\/[^ "]+$/.test(r.value)||/^[a-zA-Zа-яА-ЯёЁ\s-]*$/.test(r.value)?(r.setCustomValidity(""),n(e,r)):(r.setCustomValidity("Пожалуйста, используйте только латинские и кириллические буквы, знаки дефиса и пробелы"),t(e,r)):n(e,r):t(e,r)}(c,o),r(c,c.querySelector(e.submitButtonSelector))}(o)}))})),o.addEventListener("submit",(function(e){e.preventDefault()})),r(o,o.querySelector(e.submitButtonSelector))}(o)}))}(G),Promise.all([fetch("".concat(t.baseUrl,"/users/me"),{method:"GET",headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})),fetch("".concat(t.baseUrl,"/cards"),{method:"GET",headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))]).then((function(t){var n,r,o=(r=2,function(e){if(Array.isArray(e))return e}(n=t)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(n,r)||function(t,n){if(t){if("string"==typeof t)return e(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(t,n):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}());return{profile:o[0],cards:o[1]}})).catch((function(e){throw console.error("Ошибка при загрузке профиля и карточек:",e),e})).then((function(e){var t=e.profile,n=e.cards;e.cardId,z=t._id,function(e){i.textContent=e.name,s.textContent=e.about,I.style.backgroundImage="url(".concat(e.avatar,")"),I.alt=e.name}(t),function(e,t){e.forEach((function(e){var n=e.name,r=e.link,o=e.likes,c=J(n,r,o,V,F,e._id,e.owner._id,t);c.querySelector(".card__like-numbers").textContent=o.length.toString(),f.appendChild(c)}))}(n,z)})).catch((function(e){console.error("Ошибка:",e)})),q.addEventListener("click",(function(e){e.preventDefault();var n,c=o.value,a=l.value;q.textContent="Сохранение...",(n={name:c,about:a},fetch("".concat(t.baseUrl,"/users/me"),{method:"PATCH",headers:t.headers,body:JSON.stringify(n)}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){C.textContent=e.name,x.textContent=e.about,N(r),i.textContent=e.name,s.textContent=e.about})).catch((function(e){console.error("Ошибка при обновлении профиля:",e)})).finally((function(){q.textContent="Сохранить"}))})),S.addEventListener("submit",(function(e){e.preventDefault();var n,r=j.value.trim();A.textContent="Сохранение...",I.style.backgroundImage="url(".concat(r,")"),(n=r,fetch("".concat(t.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:t.headers,body:JSON.stringify({avatar:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){I.style.backgroundImage="url(".concat(e,")"),N(a)})).catch((function(e){console.error("Ошибка при обновлении аватара:",e)})).finally((function(){A.textContent="Сохранить"}))})),m.addEventListener("submit",(function(e){e.preventDefault();var n,r={name:P.value,link:w.value};L.textContent="Создание...",(n=r,fetch("".concat(t.baseUrl,"/cards"),{method:"POST",headers:t.headers,body:JSON.stringify({name:n.name,link:n.link})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){var t=J(e.name,e.link,e.likes,V,F,e._id,e.owner._id,z);f.prepend(t),N(p)})).catch((function(e){console.error("Ошибка при создании карточки:",e)})).finally((function(){L.textContent="Создать"}))}));var H=v.querySelector(".popup__close"),Z=v.querySelector(".popup__caption");function F(e,t,n){B.src=t,B.setAttribute("alt",e),Z.textContent=e,U(v)}H.addEventListener("click",(function(){N(v),B.setAttribute("src",""),B.setAttribute("alt",""),Z.textContent=""})),u.addEventListener("click",(function(){var e=u.getAttribute("data-card-id");e?M(e):console.error("Не удалось получить ID карты для удаления.")})),I.addEventListener("click",(function(){$(m,G),U(a)})),_.addEventListener("click",(function(){$(d,G),o.value=i.textContent,l.value=s.textContent,U(r)})),y.addEventListener("click",(function(){$(m,G),U(p)})),h.addEventListener("click",(function(){$(d,G),N(r)})),b.addEventListener("click",(function(){$(m,G),N(p)})),k.addEventListener("click",(function(){N(v)})),g.addEventListener("click",(function(){N(c)})),E.addEventListener("click",(function(){N(a)}))})();