-- LeadForm stores custom form-field values and followup time in extra_data.
-- (Column existed only out-of-band in the original project's DB.)
ALTER TABLE leads ADD COLUMN IF NOT EXISTS extra_data jsonb;
