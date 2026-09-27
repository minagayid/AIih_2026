# Exploratory image quality baseline

This directory contains a reproducible ridge-regression baseline for the
`Images` worksheet format: an `Index` column, an `Image` column with embedded
images, and one or more numeric model-rating columns. The workbook is an input
provided by the research team; it is deliberately not committed here.

The script extracts 49 grayscale, histogram, and basic image-quality features
from each image. It uses the arithmetic mean of the supplied model ratings as a
weak target, groups byte-identical images before training, selects ridge
regularization inside the training folds, and reports nested grouped
cross-validation results against a constant-mean baseline. The trained model
artifact and aggregate metrics contain no images or row-level ratings. Model
weights are written to the ignored local `work/` directory and are not
included in Git.

The source workbook contains no expert reference labels and does not document
the rating scale or rubric. These results measure how well image features
reproduce the supplied models' average ratings; they do not validate clinical
image quality, diagnosis, or retake decisions. Patient-level separation could
not be confirmed from the workbook schema.

Run locally with Python and the packages in `requirements.txt`:

```bash
python -m pip install -r ml/requirements.txt
python ml/train_quality_baseline.py --input path/to/Images_Quality_Report_scored.xlsx
```

The script writes aggregate results to `ml/results.json` and model weights to
`work/quality_baseline_model.json`. Keep source workbooks and image exports out
of Git.
