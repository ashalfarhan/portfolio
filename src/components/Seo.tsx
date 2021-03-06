import Head from 'next/head';
import { ReactNode } from 'react';
import { profile, siteMeta } from '@site/config';
import { useRouter } from 'next/router';

type SeoProps = {
  description?: string;
  title?: string;
  favicon?: string;
  image?: string;
  keywords?: string[];
  children?: ReactNode;
};

export const Seo = ({
  description = '',
  title = '',
  favicon = '',
  image,
  children,
  keywords,
}: SeoProps) => {
  const { asPath } = useRouter();
  return (
    <Head>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title ? `${title} | ${siteMeta.title}` : siteMeta.title}</title>
      <meta name="description" content={description || siteMeta.description} />
      <meta name="image" content={image || siteMeta.image} />
      {keywords && <meta name="keywords" content={keywords.join(', ')} />}
      <meta itemProp="name" content={title || siteMeta.title} />
      <meta
        itemProp="description"
        content={description || siteMeta.description}
      />
      <meta itemProp="image" content={image || siteMeta.image} />
      <meta property="og:site_name" content={siteMeta.title} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={title || siteMeta.title} />
      <meta
        property="og:description"
        content={description || siteMeta.description}
      />
      <meta property="og:image" content={image || siteMeta.image} />
      <meta property="og:image:alt" content={title || siteMeta.title} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:creator"
        content={`@${profile.personal.twitter}`}
      />
      <meta property="twitter:title" content={title || siteMeta.title} />
      <meta
        property="twitter:description"
        content={description || siteMeta.description}
      />
      <meta property="twitter:image:src" content={image || siteMeta.image} />
      <link property="canonical" href={siteMeta.domain + asPath} />
      <meta property="og:url" content={siteMeta.domain + asPath} />
      <link rel="icon" href={favicon || '/favicon.svg'} />
      {children}
    </Head>
  );
};
