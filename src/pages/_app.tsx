import '../styles/global.css';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import { ThemeProvider } from '@site/utils';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}');`,
        }}
      />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
export default MyApp;
