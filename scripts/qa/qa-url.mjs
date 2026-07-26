export function resolveQaUrls(fallback = "http://127.0.0.1:3000") {
  const entryUrl = new URL(process.env.QA_BASE_URL ?? fallback);
  entryUrl.hash = "";

  const baseUrl = new URL(entryUrl);
  baseUrl.search = "";
  baseUrl.hash = "";

  return {
    entryUrl: entryUrl.toString(),
    baseUrl: baseUrl.toString().replace(/\/$/, ""),
  };
}
