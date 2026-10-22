# Portfolio truth, dialog routes, FAQ and enquiry flow

## Concept projects

| Slug | Name | Live concept URL |
|---|---|---|
| kilatmoto | KilatMoto | https://kilatmoto.ismailstudio.my/ |
| makansedap | MakanSedap | https://makansedap.ismailstudio.my/ |
| kopikita | KopiKita | https://kopikita.ismailstudio.my/ |
| malaysia | Malaysia — Between Places | https://malaysia.ismailstudio.my/ |

Use existing actual `public/assets/projects/` versioned WebP screenshots. Compare bytes/hashes with old originals before manipulation; optimize only losslessly-equivalent format/resolution adaptations with originals retained. No generated 'KilatMoto purple neon racecar' card, fictional project prototype frame, or recoloring work previews. Source `src/data/projects.ts` and `src/data/studies.ts` determine truthful links and descriptions.

Each dialog/page shows Concept Project and concise goal, design problem posed by the fictional concept, actual implemented solution (where supportable), real preview and link. Keep current `/work/<slug>/` routes; dialog can open from homepage with shareable case query if the existing route uses it. Accessible close control and focus return mandatory.

## FAQ

Prefer 5–7 concise practical questions: what the package includes, price/revisions, ownership/domain based on actual terms, realistic schedule without fixed promises, SEO specifics, postlaunch changes/maintenance, frontend-only exclusions. Don't imply rights/ownership beyond verified agreement.

## Quote form — preserve current Formspree contract

Name required (`name`); business name optional (`business`); email required (`email`); package (`package` with Not sure yet/Starter/Business/Premium); target timeline optional (`timeline`); project description required (`message`, 20–2000 chars observed historical); `'_gotcha'` honeypot and `'_subject'` hidden. Verify from latest `Contact.astro`/`contact.ts`; do not assume user supplied provider ID in this ZIP.

Native real HTML `<form method=post>` must remain for JS-disabled clients, with exact verified endpoint URL coming from actual local Formspree config; JS enhancement receives actual provider `ok:true` only as acceptance. UI success ≠ inbox delivery. Pending state disables duplicate send, stores field values on transient failures, announces errors, verifies email/length and moves focus. Three-step enhancement must have previous and next controls, progress labels and review screen. Package CTA preselects matching offer; email fallback links to `contact@ismailstudio.my`. No new WhatsApp/phone collection.

One synthetic provider test per required environment when authorized; use non-identifying test content, avoid logging user-submitted data, and independently verify inbox receipt through permitted owner evidence/connected mailbox access before release claims.
