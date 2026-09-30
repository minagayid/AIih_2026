"""Validation gates for future independently labeled research datasets.

The current quality baseline uses weak continuous ratings. These functions do
not turn those ratings into diagnostic ground truth or invent patient IDs.
"""
from __future__ import annotations
import numpy as np


def validate_patient_split(partitions: dict[str, list[dict]]) -> dict:
    if set(partitions) != {"train", "validation", "test"}:
        raise ValueError("Train, validation and test partitions are required")
    patients, images = {}, {}
    for name, rows in partitions.items():
        if not rows:
            raise ValueError("Every partition must contain records")
        patients[name], images[name] = set(), set()
        for row in rows:
            patient, image = row.get("patient_id"), row.get("image_sha256")
            if not isinstance(patient, str) or not patient.strip() or patient != patient.strip() or not isinstance(image, str) or len(image) != 64 or any(c not in "0123456789abcdef" for c in image):
                raise ValueError("Verified pseudonymous patient IDs and lowercase SHA256 image hashes are required")
            if image in images[name]:
                raise ValueError("Duplicate image inside partition")
            patients[name].add(patient)
            images[name].add(image)
    names = list(partitions)
    for i, left in enumerate(names):
        for right in names[i + 1:]:
            if patients[left] & patients[right] or images[left] & images[right]:
                raise ValueError("Patient or exact-image leakage across partitions")
    return {name: {"patients": len(patients[name]), "images": len(images[name])} for name in names}


def bootstrap_mae(predictions, reference, *, resamples=1000, seed=20260930):
    """Image-level percentile CI; use patient clustering when identities exist."""
    p, r = np.asarray(predictions, dtype=float), np.asarray(reference, dtype=float)
    if p.ndim != 1 or p.shape != r.shape or p.size < 2 or not np.isfinite(p).all() or not np.isfinite(r).all() or not 100 <= resamples <= 10000:
        raise ValueError("At least two finite paired scalar scores and bounded resamples are required")
    errors = np.abs(p - r)
    rng = np.random.default_rng(seed)
    means = [float(errors[rng.integers(0, p.size, size=p.size)].mean()) for _ in range(resamples)]
    low, high = np.quantile(means, [.025, .975])
    return {"mae": float(errors.mean()), "ci95_percentile": [float(low), float(high)],
            "n_images": int(p.size), "seed": seed, "resamples": resamples,
            "unit": "image", "patient_clustered": False}
