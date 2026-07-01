# Receptifi Email Outreach

3-touch cold email sequence for dental leads via Gmail SMTP.

## Setup

**1. Get a Gmail App Password**
- Go to myaccount.google.com → Security → 2-Step Verification → App passwords
- Create one for "Mail" / "Other (custom name)" → name it "Receptifi Outreach"
- Copy the 16-character password

**2. Set environment variables**
```bash
export GMAIL_USER="herofthenation@gmail.com"
export GMAIL_APP_PASSWORD="xxxx xxxx xxxx xxxx"
```

Add these to your shell profile (`~/.zshrc`) so they persist.

**3. Add email addresses for leads**

The CSV doesn't include emails — you add them manually as you find them:
```bash
python3 send_emails.py --add-email "Moreno Dental Care" owner@morenodental.com
```

## Usage

```bash
# Preview what would go out today (no emails sent)
python3 send_emails.py --dry-run

# Send today's due emails (respects 30/day limit)
python3 send_emails.py

# Check pipeline status
python3 send_emails.py --status

# Add an email address for a lead
python3 send_emails.py --add-email "Business Name" email@example.com

# Mark a lead as replied (stops their sequence)
python3 send_emails.py --mark-replied "Business Name"
```

## Sequence

| Touch | Timing        | Subject                        |
|-------|--------------|-------------------------------|
| 1     | Day 1        | [Practice] — quick question    |
| 2     | Day 1+3      | Re: [Practice] — quick question|
| 3     | Day 1+3+4    | Closing the loop — [Practice]  |

High-priority leads (14 flagged in the CSV) are sent first each day.

## Files

- `state.json` — tracks each lead's sequence progress and email address
- `log.csv` — full send history with timestamps and status
