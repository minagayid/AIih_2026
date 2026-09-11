/**
 * Radiograph Ready contributor email automation.
 *
 * Install this script in the Google Sheet linked to the contribution form.
 * It sends a full response notification to the two project owners and a
 * friendly acknowledgement to the contributor when a valid email is present.
 */
const CONFIG = Object.freeze({
  PROJECT_NAME: "Radiograph Ready",
  OWNER_EMAILS: [
    "minagayid@gmail.com",
    "ashhadulislam@gmail.com",
  ],
  REPLY_TO: "ashhadulislam@gmail.com",
  FOLLOW_UP_WINDOW: "7 business days",
  CONTRIBUTOR_NAME_ALIASES: [
    "name",
    "full name",
    "your name",
    "contributor name",
  ],
  CONTRIBUTOR_EMAIL_ALIASES: [
    "email",
    "email address",
    "your email",
    "contact email",
  ],
});

/**
 * Run this function once from Apps Script to create the spreadsheet trigger.
 * Running it again is safe; it will not create a duplicate trigger.
 */
function installTrigger() {
  const spreadsheet = SpreadsheetApp.getActive();
  if (!spreadsheet) {
    throw new Error("Open this script from the linked response spreadsheet.");
  }

  const triggerExists = ScriptApp.getProjectTriggers().some(
    (trigger) =>
      trigger.getHandlerFunction() === "onFormSubmit" &&
      trigger.getEventType() === ScriptApp.EventType.ON_FORM_SUBMIT &&
      trigger.getTriggerSource() === ScriptApp.TriggerSource.SPREADSHEETS &&
      trigger.getTriggerSourceId() === spreadsheet.getId(),
  );

  if (!triggerExists) {
    ScriptApp.newTrigger("onFormSubmit")
      .forSpreadsheet(spreadsheet)
      .onFormSubmit()
      .create();
  }

  Logger.log("Radiograph Ready contributor trigger is installed.");
}

/**
 * Installable spreadsheet form-submit trigger.
 */
function onFormSubmit(event) {
  if (!event || !event.namedValues) {
    throw new Error(
      "This handler must run from an installable spreadsheet form-submit trigger.",
    );
  }

  const submission = normalizeSubmission_(event);
  sendOwnerNotification_(submission);

  if (submission.email) {
    sendContributorThankYou_(submission);
  }
}

/**
 * Optional manual helper for an existing response.
 *
 * Select any completed response row in the linked sheet, then run this
 * function once. Use it only when that contributor has not already received
 * an acknowledgement.
 */
function sendThankYouForSelectedRow() {
  const spreadsheet = SpreadsheetApp.getActive();
  const sheet = spreadsheet.getActiveSheet();
  const selectedRange = sheet.getActiveRange();
  const row = selectedRange ? selectedRange.getRow() : 0;
  const columnCount = sheet.getLastColumn();

  if (row < 2 || columnCount < 1) {
    throw new Error("Select a completed response row before running this function.");
  }

  const headers = sheet.getRange(1, 1, 1, columnCount).getValues()[0];
  const values = sheet.getRange(row, 1, 1, columnCount).getValues()[0];
  const namedValues = {};

  headers.forEach((header, index) => {
    if (header) {
      namedValues[String(header)] = [values[index]];
    }
  });

  const submission = normalizeSubmission_({
    namedValues,
    range: sheet.getRange(row, 1, 1, columnCount),
  });

  if (!submission.email) {
    throw new Error("The selected response row does not contain a valid email address.");
  }

  sendContributorThankYou_(submission);
  SpreadsheetApp.getUi().alert("Thank-you email sent to " + submission.email + ".");
}

function normalizeSubmission_(event) {
  const fields = Object.entries(event.namedValues)
    .map(([label, values]) => ({
      label,
      value: Array.isArray(values)
        ? values.filter((value) => value !== "").join(", ")
        : String(values || ""),
    }))
    .filter(({ value }) => value);

  const name = firstFieldValue_(fields, CONFIG.CONTRIBUTOR_NAME_ALIASES);
  const emailCandidate = firstFieldValue_(
    fields,
    CONFIG.CONTRIBUTOR_EMAIL_ALIASES,
  );
  const emailMatch = emailCandidate.match(
    /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i,
  );

  return {
    fields,
    name: name || "there",
    email: emailMatch ? emailMatch[0] : "",
    submittedAt:
      firstFieldValue_(fields, ["timestamp", "submitted at"]) ||
      new Date().toLocaleString(),
    responseSheetUrl: getResponseSheetUrl_(event),
  };
}

function firstFieldValue_(fields, aliases) {
  const normalizedAliases = aliases.map(normalizeLabel_);
  const exactMatch = fields.find(({ label }) =>
    normalizedAliases.includes(normalizeLabel_(label)),
  );
  if (exactMatch) {
    return exactMatch.value.trim();
  }

  const partialMatch = fields.find(({ label }) => {
    const normalizedLabel = normalizeLabel_(label);
    return normalizedAliases.some((alias) => normalizedLabel.includes(alias));
  });
  return partialMatch ? partialMatch.value.trim() : "";
}

function normalizeLabel_(label) {
  return String(label).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function getResponseSheetUrl_(event) {
  if (!event.range) {
    return "";
  }

  const sheet = event.range.getSheet();
  const spreadsheet = sheet.getParent();
  return (
    spreadsheet.getUrl() +
    "#gid=" +
    sheet.getSheetId() +
    "&range=" +
    encodeURIComponent(event.range.getA1Notation())
  );
}

function sendOwnerNotification_(submission) {
  const subject =
    "New " +
    CONFIG.PROJECT_NAME +
    " contributor" +
    (submission.name && submission.name !== "there"
      ? " — " + submission.name
      : "");
  const detailsText = submission.fields
    .map(({ label, value }) => label + ": " + value)
    .join("\n");
  const responseLinkText = submission.responseSheetUrl
    ? "\nOpen response sheet: " + submission.responseSheetUrl
    : "";
  const body = [
    "A new contributor response was received for " + CONFIG.PROJECT_NAME + ".",
    "",
    "Submitted: " + submission.submittedAt,
    "",
    detailsText,
    responseLinkText,
    "",
    submission.email
      ? "A thank-you email was sent automatically to the contributor."
      : "No valid contributor email was found, so no thank-you email was sent.",
  ].join("\n");

  const htmlDetails = submission.fields
    .map(
      ({ label, value }) =>
        "<tr>" +
        '<th style="padding:8px 12px;text-align:left;border-bottom:1px solid #e5e7eb;vertical-align:top;">' +
        escapeHtml_(label) +
        "</th>" +
        '<td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">' +
        escapeHtml_(value).replace(/\r?\n/g, "<br>") +
        "</td>" +
        "</tr>",
    )
    .join("");
  const responseLink = submission.responseSheetUrl
    ? '<p><a href="' +
      escapeHtml_(submission.responseSheetUrl) +
      '">Open the response in Google Sheets</a></p>'
    : "";
  const htmlBody = emailShell_(
    "<p>A new contributor response was received for <strong>" +
      escapeHtml_(CONFIG.PROJECT_NAME) +
      "</strong>.</p>" +
      "<p><strong>Submitted:</strong> " +
      escapeHtml_(submission.submittedAt) +
      "</p>" +
      '<table style="width:100%;border-collapse:collapse;margin:20px 0;">' +
      htmlDetails +
      "</table>" +
      responseLink +
      "<p style=\"color:#5f6368;font-size:13px;\">" +
      (submission.email
        ? "The automated thank-you email was sent to the contributor."
        : "No valid contributor email was found, so no thank-you email was sent.") +
      "</p>",
  );

  MailApp.sendEmail({
    to: CONFIG.OWNER_EMAILS.join(","),
    subject,
    body,
    htmlBody,
    name: CONFIG.PROJECT_NAME + " notifications",
    replyTo: CONFIG.REPLY_TO,
  });
}

function sendContributorThankYou_(submission) {
  const greeting =
    submission.name && submission.name !== "there"
      ? "Hello " + escapeHtml_(submission.name) + ","
      : "Hello,";
  const followUpWindow = escapeHtml_(CONFIG.FOLLOW_UP_WINDOW);
  const htmlBody = emailShell_(
    "<p>" +
      greeting +
      "</p>" +
      "<p>Thank you for contributing to <strong>" +
      escapeHtml_(CONFIG.PROJECT_NAME) +
      "</strong>. We really appreciate your time and your help in making multimodal AI evaluation for dental imaging more reliable and honest.</p>" +
      "<p>We will review your submission and follow up within <strong>" +
      followUpWindow +
      "</strong> with next steps, or a quick note if we need any clarification.</p>" +
      "<p>Please reply to this message if you have additional context to share. And as a reminder, please send only de-identified radiographs with patient names, IDs, dates of birth, and identifying metadata removed.</p>" +
      "<p>Warmly,<br>Ashhadul Islam &amp; Mina Maged Zekry Gayid<br>" +
      escapeHtml_(CONFIG.PROJECT_NAME) +
      " research team</p>",
  );
  const body = [
    "Hello" + (submission.name !== "there" ? " " + submission.name : "") + ",",
    "",
    "Thank you for contributing to " + CONFIG.PROJECT_NAME + ". We really appreciate your time and your help in making multimodal AI evaluation for dental imaging more reliable and honest.",
    "",
    "We will review your submission and follow up within " +
      CONFIG.FOLLOW_UP_WINDOW +
      " with next steps, or a quick note if we need any clarification.",
    "",
    "Please reply to this message if you have additional context to share. Please send only de-identified radiographs with patient names, IDs, dates of birth, and identifying metadata removed.",
    "",
    "Warmly,",
    "Ashhadul Islam & Mina Maged Zekry Gayid",
    CONFIG.PROJECT_NAME + " research team",
  ].join("\n");

  MailApp.sendEmail({
    to: submission.email,
    subject: "Thank you for contributing to " + CONFIG.PROJECT_NAME,
    body,
    htmlBody,
    name: CONFIG.PROJECT_NAME + " research team",
    replyTo: CONFIG.REPLY_TO,
  });
}

function emailShell_(content) {
  return (
    '<div style="margin:0;padding:24px;background:#f5f5f0;font-family:Arial,sans-serif;color:#20211f;line-height:1.55;">' +
    '<div style="max-width:680px;margin:0 auto;padding:28px;background:#ffffff;border:1px solid #e1e2dc;">' +
    '<p style="margin:0 0 22px;font-size:18px;font-weight:700;letter-spacing:.02em;">Radiograph <span style="color:#5b641d;">READY</span></p>' +
    content +
    "</div></div>"
  );
}

function escapeHtml_(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
