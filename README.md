# Radiograph Ready

Single-page research site for Radiograph Ready, a pilot benchmark exploring
whether multimodal AI can assess dental radiograph usability before diagnosis.

The site includes:

- a quick review of the pilot study;
- early model-comparison findings;
- a de-identified X-ray contribution handoff;
- contact details for Ashhadul Islam and Mina Maged Zekry Gayid.

The contribution form is intentionally a front-end handoff for now. It
prepares an email conversation and does not transmit files; connect it to an
approved secure upload endpoint before accepting real patient data.

## Search visibility

The site includes a canonical URL, descriptive Open Graph and X metadata,
research-project structured data, a crawlable **robots.txt**, and a sitemap
for the GitHub Pages URL, plus a branded **og.png** social-preview image. No
search-console verification token is included; add one only in the hosting
account that owns the site.

## Contributor email automation

The **automation** folder contains a Google Apps Script for the linked
response sheet. After the one-time setup, each new form submission sends the
two owners the contributor details and sends the contributor a friendly
acknowledgement with a promise to follow up within seven business days. The
script skips the acknowledgement when no valid contributor email is present.

## Local development

```bash
pnpm install
pnpm dev
```

The public site is deployed automatically to GitHub Pages from the `main`
branch.
