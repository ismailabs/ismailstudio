# Windows Codex Desktop setup

1. Open the local clone of `ismailabs/ismailstudio` in Codex Desktop; verify correct folder/branch and no uncommitted work you would risk overwriting. Open PowerShell in project root.
2. Download `Ismail-Studio-V2-Final-Codex-Handoff.zip`. Unpack into repo `docs/redesign-v2/` preserving the handoff's root files at that path. Verify `docs/redesign-v2/START_HERE.md` and `docs/redesign-v2/assets/approved-mockups/frames/01-desktop-hero.png` exist.
3. Run `python docs/redesign-v2/scripts/validate_package.py --root docs/redesign-v2` to check package integrity. If Python missing, don't skip silently: use installed `py -3` or obtain checks via another safe tool.
4. Use the Codex model selector to choose preferred GPT-6.1 Sol **only if the option exists**, otherwise choose available suitable model without pretending settings were changed by the document.
5. In Codex ask it to **read `docs/redesign-v2/START_HERE.md` and execute the approved redesign autonomously**; it has authority to implement and deploy when the release gates pass. Keep required approvals/permissions granted through actual Codex/Cloudflare interfaces; the file cannot bypass them.
6. Before deploying, Codex must use the current repository deployment tooling and authenticated Cloudflare account with a rollback. Do not manually run random external installation scripts to solve a missing skill.

If your repository has an existing `docs/redesign-v2/` folder, stop and compare versions before overwriting. Be especially careful with OneDrive-synced folders and case-sensitive Git file paths.
