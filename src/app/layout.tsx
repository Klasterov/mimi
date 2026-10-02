import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"
import { inter, helvetica } from './fonts'
import { ThemeProvider } from '@/context/ThemeContext'

export const metadata: Metadata = {
  title: "MiMiSmart",
  verification: {
    google: "r1qBZ3Yy7vTm0dLHAtTdbDmoCRw5Dg7ax21h3QGn9mE",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${helvetica.variable}`}
    >
      <body className="font-sans">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WXBX39Z"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <Script id="roistat" strategy="afterInteractive">
          {`(function(w, d, s, h, id) {
            w.roistatProjectId = id; w.roistatHost = h;
            var p = d.location.protocol == "https:" ? "https://" : "http://";
            var u = /^.*roistat_visit=[^;]+(.*)?$/.test(d.cookie) ? "/dist/module.js" : "/api/site/1.0/" + id + "/init?referrer=" + encodeURIComponent(d.location.href);
            var js = d.createElement(s); js.charset = "UTF-8"; js.async = true; js.src = p + h + u;
            var js2 = d.getElementsByTagName(s)[0]; js2.parentNode.insertBefore(js, js2);
          })(window, document, 'script', 'cloud.roistat.com', '46de6212504c2f1649b2b15ff67946fd');`}
        </Script>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-WXBX39Z');`}
        </Script>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
