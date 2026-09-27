# Radiograph Ready

Single-page research site for Radiograph Ready, research on AI assessment of
dental X-ray image quality before diagnosis. The current page leads with an
810-row model-rated workbook and exploratory image-feature baseline, with
results from the separate 13-image expert-scored pilot retained as historical
context.

The site includes:

- a quick review of the new X-ray workbook;
- exploratory weak-label ML results with explicit limits on their meaning;
- separate historical findings and criteria for the expert-scored pilot;
- a de-identified X-ray contribution handoff;
- contact details for Ashhadul Islam and Mina Maged Zekry Gayid.

## Exploratory ML baseline

The **ml** folder contains a reproducible ridge-regression baseline and its
aggregate results for the linked X-ray workbook: 810 scored image rows, 797
exact-unique images, and seven model-generated rating columns. The source
workbook is not included in the repository. Its ratings serve only as weak
labels; it contains no expert scores and documents no rating rubric. The
reported validation therefore measures reproduction of those model ratings,
not clinical image quality or diagnostic performance. See
[`ml/README.md`](ml/README.md) for the method and local run instructions.

The contribution form is intentionally a front-end handoff for now. It
prepares an email conversation and does not transmit files; connect it to an
approved secure upload endpoint before accepting real patient data.

## Search visibility

The site includes a descriptive title and summary, canonical URL, Open Graph
and X metadata, research-project structured data, a crawlable **robots.txt**,
and a sitemap for the GitHub Pages URL with the date of the latest significant
content update, plus a branded **og.png** social-preview image. Google may
choose a different title or search snippet, and structured data does not
guarantee a special search result. The Google Search Console token uses the
free HTML-tag method; keep it in the site head so ownership remains verified.

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
