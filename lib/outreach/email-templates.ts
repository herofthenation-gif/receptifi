import { WEBSITE } from "./config";

const SIGNATURE = `Karmello\n\nReceptifi | ${WEBSITE}`;

export interface OutreachEmail {
  subject: string;
  text: string;
}

/**
 * Ports outreach/send_emails.py's build_email() verbatim — same proven copy
 * and voice (see memory: feedback-communication-and-outreach).
 */
export function buildOutreachEmail(touch: 1 | 2 | 3, businessName: string, opening: string): OutreachEmail {
  if (touch === 1) {
    return {
      subject: `${businessName}, quick question`,
      text: `${businessName},

${opening}

Every after-hours call you miss is a patient booking somewhere else.

Receptifi answers every call and books them automatically. 48 hour setup, no contracts.

Want a 60-second demo?

${SIGNATURE}`,
    };
  }

  if (touch === 2) {
    return {
      subject: `Re: ${businessName}, quick question`,
      text: `Still here if you're interested.

Most dental offices lose 30-40% of new patient calls to voicemail. Receptifi captures every one and books them while your team sleeps.

Takes 48 hours to go live. No contracts.

Worth 60 seconds?

${SIGNATURE}`,
    };
  }

  return {
    subject: `Closing the loop, ${businessName}`,
    text: `Last email.

If missed calls aren't a problem, no worries. But if your front desk is stretched or you're losing after-hours patients, that's exactly what we fix.

Watch the demo: ${WEBSITE}

${SIGNATURE}`,
  };
}
