# Responsive layout and interaction specification

**Viewports:** at least 320, 375, 390, 430, 768, 1024, 1440, 1920 CSS px, including small-height landscape/mobile menu. Capture actual 1440×900 and 390×844 primary evidence plus key states at intermediate widths.

## Header

Normal readable logo/nav at top. After a reasonable scroll threshold morph to floating translucent pill and remain visible across sections. Respect `scroll-margin-top`, safe areas, focus, sticky container clipping and Safari backdrop-filter fallback. Don't create a permanently static massive bar, hide nav unpredictably, or shift whole page when pill appears. Mobile menu opens on accessible button, traps focus only if true modal; for ordinary disclosure menu, provide clear Escape/outside-click handling and keep focus order logical.

## Hero

Desktop: H1 left/foreground; cinematic focal scene draws eye without fighting legibility. Do not make a huge empty area or place CTA off fold through gratuitous decoration. Mobile: image may recompose/crop, CTA visible, headline clear with natural line wraps. Large logo; no dense right rail of tiny metrics.

## Work

Four distinct genuine screenshots, no artificial backgrounds/text over their UI. Responsive cards occupy major width, include clear 'Concept Project' and case-study affordance. Display enough original screenshot to recognize project; prevent layout shift with width/height/srcset/sizes. Hover and focus show equivalent affordances.

## Offers/FAQ/About

Cards broadly uniform height only where content allows; no extra filler to fake equivalence. Price/SEO differences large and readable. Mobile cards stack; avoid horizontal price tables. Icons are large and labels self-explanatory. FAQ uses semantic `<details>` or accessible disclosure; meaningful focus and open state.

## Project studies/contact

Accessible `<dialog>` or equivalent with history/deep linking and stable underlying HTML project pages. Test focus containment, return to trigger, Escape, backdrop, body scroll, no-JS links, mobile viewport/soft keyboard.

Three-step quote form: preserve fields across steps; validation only on relevant step; clear summary and back/continue navigation; double submission blocked; native no-JS POST works; package CTA preselection from offers; live status reflects actual Formspree acceptance. Never add private phone/WhatsApp or unapproved business data requirements.

**No** horizontal overflow, stacked modal beneath sticky nav, repeated background image, unreadable small labels, content invisibility before JS, full-page scroll locks or dependence on hover-only gesture.
