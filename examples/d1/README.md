# D1 notes API example

This is a public, shared demo endpoint with no user authentication or ownership model. It is disabled unless the Worker binding `DEMO_NOTES_ENABLED` is exactly `true`. If deliberately enabled, it accepts and returns shared note content; use synthetic, non-sensitive examples only. Do not deploy it for private notes, patient information, credentials, or other sensitive data.

The route caps request bodies at 16 KiB and bounds title/content lengths, but those limits are resource guards, not access control or a shared abuse quota. Before adapting it for real users, add verified authentication, per-user ownership checks on both reads and writes, shared rate limits, retention rules, and tests for cross-user denial.
