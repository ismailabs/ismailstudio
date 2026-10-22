# Visual system specification — readable and large by design

These are **proposed implementation targets**, not extracted pixel-perfect CSS values from raster artwork. Codex should tune them against screenshots on real desktop/mobile devices.

## Typeface roles

- **Display face:** Licensed/self-hosted strong geometric or grotesk sans with a memorable silhouette and optical kerning. Avoid derivative branded typefaces. Weight typically 750–900 where supported. Do not stretch the font artificially.
- **Body face:** Readable sans, 400–550 regular weight; Geist or another vetted open-source font can remain if appropriate after visual testing.
- H1 exact approved words: **BUILT FOR BIGGER PROBLEMS.** Line breaks adapt to viewport, do not split semantic words.
- Headline gradient may emphasize **BIGGER** only. Ensure readable solid-color fallback and contrast on all art crops.

## Target visual scale

| Type | Desktop | Mobile | Notes |
|---|---|---|---|
| Hero H1 | ~clamp(72px,7vw,132px) | ~clamp(44px,12vw,70px) | Adjust line-height around .9–1.03 after font measurement |
| H2 section title | 46–76px | 36–52px | More hierarchy, less prose |
| H3 / package title | 26–36px | 23–30px | Short names |
| Body | 18–21px | 16–18px | Comfortable 1.45–1.65 line-height |
| Menu links | 15–17px | 17–19px | Visible at comfortable size |
| Eyebrow/metadata | 13–15px | 13–14px | Never rely on ultra-small text |
| Package price | 48–66px | 42–54px | Clear 'From' qualifier |
| Process icons | 40–58px | 40–52px | Meaning conveyed by icon AND label |
| Logo | Brand mark ~42–56px tall | ~38–52px | Can be larger in hero; retain legible wordmark |

## Color design tokens (candidate targets)

Dark hero: `#080D17` / `#111927`; typography white `#F8FAFF`.
Light paper: `#FFFFFF` / `#F7F8FB`; dark text `#111827`; supporting silver grey `#616D7D`.
Light borders: `#DCE2EA`; dark borders `#4B5363` where needed.
Accent family: muted ice blue `#6FB7FF`, violet `#9169F5`, pink `#D95BDA`.
Emphasis gradients only where they improve hierarchy: `linear-gradient(105deg,#D95BDA 0%,#9169F5 48%,#6FB7FF 100%)`.
**NO orange or red-orange** across branding, buttons, inline text or icons.

## Section pacing

- A dark **hero** with the highest image density.
- Primarily **light sections** below (selected work, offers, market context, process and FAQ), with one contrasting dark About or contact panel only when purposeful.
- Recommend 56–96px container gutters at wide desktop (adapt to viewport); 20–28px at mobile.
- Section whitespace typically 100–160px desktop and 72–108px mobile, adjusted by visual hierarchy. No need to show gridlines and micro-labels just to fill space.
- Site max content width ~1320–1480px, while hero artwork may bleed full viewport.
- Standard rounded cards 12–20px; buttons and floating menu may be pill shaped. No sharp-edged interactive controls.
- Avoid every card taking equal weight: project media and price decisions should stand out strongly.

## Contrast

Do not use gradients as a substitute for readable text. All essential text must remain legible without a background image. Body and UI contrast must be checked on actual final colors; muted labels still need adequate contrast.
