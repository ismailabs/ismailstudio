# Automated test blueprint — implement in actual repo, do not fake records

Tests are a blueprint for executable Playwright/Node checks. Reconcile with existing tests rather than deleting existing assertions. Log viewport, browser, URL, source SHA and evidence file path.

| ID | Surface | Assertions |
|---|---|---|
| BR-01 | 1440 desktop hero | H1 text and visibility, no clipped text, primary CTA; white brand recognizable on dark |
| BR-02 | 390 mobile hero | art and H1 responsive, CTA visible, no horizontal overflow |
| BR-03 | tablet 834 | nav fits/condenses without overlap; offers/work reflow |
| BR-04 | scrolling | floating nav visible, links correct, current section updates, focus not trapped |
| BR-05 | reduced motion | no nonessential movement, same content and controls |
| BR-06 | no JS | essential content/anchors present, quote native POST preserved, no hidden-by-default content |
| BR-07 | work | four genuine images, exact labels/URLs, accessible dialogs and deep links |
| BR-08 | case-study | open/escape/focus, close/back behavior, no invented project outcomes |
| BR-09 | packages | values/limits/revisions exact; one-time SEO tiers, exclusions, from qualifier |
| BR-10 | offer selection | each CTA selects intended package in quote flow |
| BR-11 | market context | externally verified claims or omission; date and scope disclaimer |
| BR-12 | FAQ | 5–7 meaningful questions, controls and accessible answers |
| BR-13 | contact identity | name/email validation; per-step errors; fields persist on back |
| BR-14 | contact needs | message 20–2000 char and package/timeline; review edit |
| BR-15 | form submit | Formspree accepted response only yields success, no double-send; failure retains data |
| BR-16 | accessibility | axe samples, keyboard-only traversal, focus, no contrast failure in critical copy |
| BR-17 | SEO | heading, metadata, canonical, sitemap, robots, structured data if eligible |
| BR-18 | production | source/hash/HTTP headers/redirects, four demos, no private paths |
| BR-19 | preservation | apex/other Workers, custom domains, DNS/Zoho MX/SPF/DKIM/DMARC unchanged |
| BR-20 | responsive symbols | logo/header/footer/icons legible 16–128px and device-scale rendering |

Real form email delivery evidence requires provider and recipient confirmation; do not emit unauthorized test submissions or collect actual client information in test artifacts. CI must not expose tokens, internal evidence, personally identifying data or generated design references as public `/assets/` content.
