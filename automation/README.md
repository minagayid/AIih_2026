# Contributor email automation

The public site uses a Google Form for contributions. Google Apps Script is
the simplest secure handoff for this existing setup because the form already
writes each response to Google Sheets.

The included **google-apps-script.gs** sends:

- a full response notification to Mina Maged Zekry Gayid and Ashhadul Islam;
- a professional thank-you email to the contributor when the response contains
  a valid email address; and
- a clear promise to follow up within seven business days.

It also includes an optional **sendThankYouForSelectedRow** helper for sending
the acknowledgement once to an existing response, after checking that the
contributor has not already received one.

## One-time setup

1. Open the Google Sheet connected to the contribution form.
2. Choose Extensions → Apps Script.
3. Replace the starter code with the contents of **google-apps-script.gs**.
4. Save the project and run **installTrigger** once. Google will ask you to
   authorize the script under the Google account that owns the response sheet.
5. Submit one dummy response using an address you control and confirm that
   both owner notification emails and the contributor acknowledgement arrive.
6. Delete the dummy response if it should not remain in the response sheet.

The owner addresses and the seven-business-day promise are at the top of the
script in **CONFIG**. Change them there if the project team or response
window changes. The script does not require an API key or a third-party email
provider; messages are sent by the Google account that authorizes the trigger.

For a past contributor, select that response row in the sheet and run
**sendThankYouForSelectedRow** once. Do not use it for a row that has already
received an acknowledgement, because the helper intentionally does not keep a
second-send log.

Because contributor responses may relate to dental imaging, keep the form
limited to de-identified material and do not add patient identifiers to the
form or to email replies.
