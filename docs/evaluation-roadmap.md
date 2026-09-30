# Validation contract and pending clinical evidence

The current baseline predicts continuous image-quality weak labels. Existing `ml/results.json` documents nested exact-image SHA256 grouped folds and the limitations of model-generated labels. Exact-image grouping cannot establish patient-level independence when patient IDs are absent.

`ml/validation_contract.py` rejects missing pseudonymous patient identities, duplicate images and patient/image overlap across train/validation/test. The bootstrap helper produces a seeded image-level MAE percentile interval and explicitly reports `patient_clustered: false`. It must not be represented as a patient-clustered or diagnostic confidence interval.

Reproduce: `python -m unittest ml.test_validation_contract -v`. These synthetic tests do not supply new training results. Consent/license, expert references, true patient splits, patient-clustered confidence intervals, external validation and endpoint-appropriate clinical metrics remain pending. Diagnostic sensitivity/specificity must not be computed by treating model-generated continuous quality labels as truth.
