import unittest
from ml.validation_contract import bootstrap_mae, validate_patient_split


class ValidationContractTests(unittest.TestCase):
    def fixture(self):
        return {name: [{"patient_id": f"synthetic-{i}", "image_sha256": str(i) * 64}]
                for i, name in enumerate(["train", "validation", "test"])}

    def test_leakage_and_missing_patient_ids_fail(self):
        data = self.fixture()
        self.assertEqual(validate_patient_split(data)["test"]["patients"], 1)
        data["test"][0]["patient_id"] = data["train"][0]["patient_id"]
        with self.assertRaises(ValueError):
            validate_patient_split(data)
        data = self.fixture()
        del data["validation"][0]["patient_id"]
        with self.assertRaises(ValueError):
            validate_patient_split(data)
        data = self.fixture()
        data["test"][0]["image_sha256"] = data["train"][0]["image_sha256"]
        with self.assertRaises(ValueError):
            validate_patient_split(data)

    def test_ci_is_reproducible_and_reports_image_unit(self):
        a = bootstrap_mae([1, 2, 3], [1, 1, 2])
        self.assertEqual(a, bootstrap_mae([1, 2, 3], [1, 1, 2]))
        self.assertAlmostEqual(a["mae"], 2 / 3)
        self.assertFalse(a["patient_clustered"])
        with self.assertRaises(ValueError):
            bootstrap_mae([float("nan"), 1], [0, 1])
