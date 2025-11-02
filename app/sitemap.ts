export default function sitemap() {
  const base = "https://parkly-valet.vercel.app";
  return [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
  ];
}
