import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jacob Medley — UX/UI Designer & Digital Strategist',
  description:
    'Portfolio of Jacob Medley, a UX/UI Designer & Digital Strategist driving business results through design systems, platform thinking, and research.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Favicons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/images/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/icons/favicon-16x16.png" />
        <link rel="manifest" href="/images/icons/site.webmanifest" />
        <link rel="mask-icon" href="/images/icons/safari-pinned-tab.svg" color="#644672" />
        <link rel="shortcut icon" href="/images/icons/favicon.ico" />
        <meta name="msapplication-TileColor" content="#644672" />
        <meta name="msapplication-config" content="/images/icons/browserconfig.xml" />
        <meta name="theme-color" content="#644672" />

        {/* Adobe TypeKit — urw-form, Manrope */}
        <link rel="stylesheet" href="https://use.typekit.net/zps8jqb.css" />
        {/* Font Awesome Pro kit */}
        <Script
          src="https://kit.fontawesome.com/644e13edf7.js"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        {/* Google Tag Manager */}
        <Script
          id="gtm-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PC65Z8');`,
          }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PC65Z8"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  )
}
