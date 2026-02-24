# Proposal: Standardize Markdown Notes Formatting

## Intent
Standardize the formatting of all reading notes in the `notes/` directory to ensure consistency and facilitate automated extraction for daily emails.

## Goals
- Create a `note-template.md` as the source of truth for new notes.
- Apply the template format to all existing 10 notes.
- Ensure notes include metadata (Author, Tags, etc.).
- Optimize notes for the daily email push (Daily Book Notes Push).

## Success Criteria
- [ ] `note-template.md` exists in the repository root.
- [ ] All files in `notes/` follow the template structure.
- [ ] The `pick-notes.ts` script can still run (or is updated if needed).
