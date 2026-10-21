# Visual asset map, implementation coverage and priority

## Binding asset index

- Hero: `frames/01-desktop-hero.png` and `08-mobile-hero.png`
- Desktop work: `frames/02-desktop-work.png`, `03-desktop-work-cont.png`; mobile: `09-mobile-work.png`
- Pricing: `04-desktop-pricing.png`, `13-mobile-pricing.png`
- Process and about: `05-desktop-process-about.png`
- Desktop case study: `06-desktop-case-study.png`; mobile `10-mobile-case-study.png`
- Desktop first contact step: `07-desktop-contact-step1.png`; mobile steps: `11-mobile-contact-step1.png`, `12-mobile-contact-step2.png`, `16-mobile-contact-step3.png`
- FAQ desktop: `14-desktop-faq.png` (mobile to be designed/verified from same system)
- Mobile nav: `15-mobile-navigation.png`
- Global overview: `00-direction-overview.png`, `desktop-review-board.jpg`, `mobile-review-board.jpg`

All paths above relative to `assets/approved-mockups/frames/`. 17 uniquely numbered PNG frames. Approved viewport sizes desktop 1440×900, mobile 390×844. Additional states are specified textually because static mockups alone can't cover every functional condition. These are approved *design references*, not an extracted design-token engine or deployable screens.

## Fidelity priority, descending

1. Truth of project visuals and package/offer content, functional accessibility/privacy.
2. Recognizable 01+02+03 integrated art direction and compelling composition.
3. Hero headline scale, strong work showcase and color-contrast rhythm.
4. Legible responsive/interactive layouts for modals, pricing and guided form.
5. Animation continuity, microinteraction feel and spacing/detail polish.

Do not remove distinctive elements merely because a CSS implementation is difficult. Conversely, don't overengineer animation at the expense of basic content/controls.
