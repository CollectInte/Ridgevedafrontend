// components/SEOHead.js
import Head from "next/head";

export default function SEOHead({ title, description, keywords, robots = "index, follow" }) {
  return (
    <Head>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={Array.isArray(keywords) ? keywords.join(", ") : keywords} />}
      <meta name="robots" content={robots} />

      {/* Open Graph (for social sharing)
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Ridgeveda" />

      
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:card" content="summary_large_image" /> */}
    </Head>
  );
}
