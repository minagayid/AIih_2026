declare module "cloudflare:workers" {
  // The database helper is retained for the Cloudflare runtime, while the
  // GitHub Pages build only needs the static route and has no D1 binding.
  export const env: any;
}

interface Fetcher {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
}

interface D1Database {}
