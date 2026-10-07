"use client"

import Script from "next/script"

// Keep the original code inside the client component so Next.js does not repeat
// it in the serialized server component data alongside the inline HTML script.
const ROISTAT_CODE = `(function(w, d, s, h, id) {    w.roistatProjectId = id; w.roistatHost = h; w.roistatPage = d.location.href; w.roistatReferrer = d.referrer;    var p = d.location.protocol == "https:" ? "https://" : "http://";    var u = /^.*roistat_visit=[^;]+(.*)?$/.test(d.cookie) ? "/dist/module.js" : "/api/site/1.0/"+id+"/init?referrer="+encodeURIComponent(d.location.href);    var js = d.createElement(s); js.charset="UTF-8"; js.async = 1; js.src = p+h+u; var js2 = d.getElementsByTagName(s)[0]; js2.parentNode.insertBefore(js, js2);})(window, document, 'script', 'cloud.roistat.com', 'fe810b8818665490b7af7de96723d806');`

export default function RoistatCounter() {
  return <Script id="roistat-counter" strategy="lazyOnload">{ROISTAT_CODE}</Script>
}
