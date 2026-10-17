# Career Progression Portal — homepage redesign concept

A premium, editorial redesign of the **Ministry of Home Affairs Career Progression Portal** homepage, built as a static, dependency-free frontend.

> **Design concept only.** This is an independent redesign concept. It is not an official Government of India website and does not collect applications, payments or personal data. The official portal remains at [careerprogression.mha.gov.in](https://careerprogression.mha.gov.in/).

---

## 1. What this is

A complete, responsive homepage concept for the Ministry of Home Affairs portal that supports the career progression of **Ex-Agniveers** after their engagement under the Agnipath Scheme.

The design takes its cues from Palantir's editorial confidence — oversized type, asymmetric grids, cinematic imagery, restrained motion and generous negative space — while retaining the institutional identity, official terminology and attribution of the Government of India portal.

**Scope:** homepage only. No login system, database, backend or internal pages have been recreated. All login and service actions link to the verified official portal.

---

## 2. Audience verification

The official portal was crawled before any copy was written. Its public content establishes the primary audience clearly:

- **About page:** "the Ministry of Home Affairs ... serves as the nodal ministry responsible for coordinating activities for further progression of Ex-Agniveers."
- **Official FAQ:** "a centralized digital platform designed to support Ex-Agniveers after the completion of their engagement under the Agnipath Scheme."
- **Portal alert:** refers to Agniveers authenticating Part A and submitting Profile Part B on the Career Progression Portal.
- **FAQ, registration:** "Registration of all Ex-Agniveers who have already been released from the Armed Forces under the Agnipath Scheme will be automatic on the portal." Authorised recruiting agencies, government departments, CAPFs, Assam Rifles and empanelled private employers are also supported.

**Conclusion:** the portal is primarily a **post-service career progression and transition platform for Ex-Agniveers**, with a secondary audience of authorised employers and government departments. It is **not** an initial Agniveer recruitment portal. The homepage therefore leads with transition and progression messaging, not recruitment.

---

## 3. Run locally

No build step, package manager or server-side code is required.

### Option A — open directly

Open `index.html` in a modern browser.

### Option B — serve as a static site

Use any static file server, for example:

```powershell
# If Python is available
python -m http.server 8080

# Or, if Node.js is available
npx serve .
```

Then visit `http://127.0.0.1:8080/` (or the port printed by your server).

The site can be deployed to any static host (Vercel, Netlify, GitHub Pages, an NIC-hosted environment) without a build command.

---

## 4. Project structure

```
mha-career-portal/
├── index.html                  # Complete homepage
├── README.md
└── assets/
    ├── css/
    │   └── styles.css          # Design system, layout, components, responsive rules
    ├── js/
    │   └── main.js             # Navigation, menu, FAQ, reveals, accessibility prefs
    ├── fonts/
    │   ├── archivo-latin.woff2
    │   ├── inter-latin.woff2
    │   ├── newsreader-italic.woff2
    │   ├── plex-mono-400.woff2
    │   └── plex-mono-500.woff2
    └── img/
        ├── emblem.png          # National Emblem, from the official portal
        ├── nic-logo.svg        # NIC logo, from the official portal
        ├── favicon-64.png
        ├── favicon-180.png
        ├── hero-army-2000.jpg
        ├── hero-army-1200.jpg
        ├── mission-india-gate.jpg
        ├── path-capf.jpg
        ├── skills-women.jpg
        └── cta-siachen.jpg
```

---

## 5. Sections

1. **Navigation** — Government of India / Ministry of Home Affairs identity, portal name, section links and a prominent official Login action. The bar is transparent over the hero and becomes solid on scroll. A full-screen menu is used on tablet and mobile.
2. **Cinematic hero** — "Built through service. Ready for what's next." with a full-bleed image of Indian Army personnel in training, two clear calls to action and a direct route to the official login.
3. **Institutional strip** — Government of India, Ministry of Home Affairs, Agnipath Scheme, official platform/NIC and the sign-in helpdesk.
4. **Mission introduction** — the official rationale for the initiative, who it serves and an explicit note that access does not guarantee employment.
5. **Career pathways** — CAPFs and Assam Rifles, state and central government, PSARA-registered employers, skills/training/certification and employer access. Every pathway links to the official portal.
6. **How it works** — Understand → Sign in → Explore → Take the next step, using the official automatic-registration fact and the sign-in helpdesk.
7. **Official noticeboard** — a dated, clearly labelled snapshot of the latest official notice (Indian Air Force, first batch 01/22, last date 23 October 2026) and the fact that no current openings were published when the snapshot was prepared. Also links to official resources.
8. **Experience** — a general, non-fabricated reflection on discipline, leadership, teamwork, adaptability and practical experience, with the official NCVET/NSQF certification context.
9. **FAQs** — seven answers reproduced from the official FAQ page, with accessible accordion behaviour and a link to the full official FAQ.
10. **Final call to action** — "Your next chapter starts with a step forward." with official login and portal links.
11. **Footer** — official identity, contact details, policies, terms, accessibility options, government resources, NIC attribution, image credits, copyright and a clear design-concept disclaimer.

---

## 6. Design system

| Token | Value / choice |
| --- | --- |
| Near-black | `#0A0B0D`, `#0D0F11`, `#121416` |
| Off-white | `#F2EFE7` |
| Warm paper | `#ECE8DE` |
| Muted steel | `#A9ACA5`, `#7F8B91` |
| Accent | Saffron `#E98A2B` |
| Tricolour | Saffron / off-white / muted green hairline |
| Display | Archivo (variable, 300–900) |
| Body | Inter (variable, 300–700) |
| Editorial italic | Newsreader italic (variable, 300–600) |
| Metadata | IBM Plex Mono (400/500) |
| Radius | 0–2px; no generic rounded-card grid |
| Spacing | Fluid section rhythm via `clamp()`, 12-column grids |
| Motion | IntersectionObserver reveals, image scales, header transition, accordion; fully respects reduced motion |

Typography, buttons, cards, sections and metadata are defined as reusable CSS components. The FAQ, navigation, reveals and accessibility preferences are implemented as separate JavaScript modules inside `main.js`.

---

## 7. Accessibility

- Skip link, semantic landmarks and heading hierarchy.
- Keyboard-operable navigation, mobile menu and FAQ accordion.
- Visible focus styles and 44px minimum back-to-top target.
- FAQ panels use `inert` when closed so collapsed links cannot receive focus.
- Accessible mobile menu with focus management, focus trap and Escape handling.
- Native `<dialog>` accessibility panel with text-size, high-contrast and reduced-motion preferences stored locally.
- `prefers-reduced-motion` support plus an explicit reduce-motion preference.
- Images include descriptive alt text; decorative images are hidden from assistive technology.
- **Lighthouse (local QA build): Accessibility 100 · Best Practices 100 · SEO 100.**

---

## 8. Content sources and verification

All factual content was checked against publicly accessible pages of the official portal on **17 October 2026**:

- [Official portal home](https://careerprogression.mha.gov.in/)
- [About](https://careerprogression.mha.gov.in/about)
- [FAQ](https://careerprogression.mha.gov.in/faq)
- [Contact](https://careerprogression.mha.gov.in/contact)
- [Agnipath Scheme](https://careerprogression.mha.gov.in/agnipath)
- [Website Policies](https://careerprogression.mha.gov.in/website-policies)
- [Terms & Conditions](https://careerprogression.mha.gov.in/terms-conditions)
- [Login](https://careerprogression.mha.gov.in/auth/userlogin)

### Official facts used

- Ministry of Home Affairs is the nodal ministry for the further progression of Ex-Agniveers under the Government of India (Allocation of Business) Rules, 1961.
- The portal is a digital platform supporting Ex-Agniveers' transition from military service to civilian employment opportunities.
- The Agnipath Scheme is a four-year engagement in the Armed Forces, launched in June 2022.
- Registration is automatic for Ex-Agniveers already released from the Armed Forces. Authorised employers and departments can also register.
- Services described by the official FAQ include CAPFs/Assam Rifles opportunities, central and state recruitment notifications, skill mapping and career counselling, training/reskilling/certification, PSARA private-sector roles, document repository/verification and reserved-vacancy notifications.
- The Agnipath framework includes Kaushal Praman Patra certification through NCVET and NSQF.
- The official portal lists: `jscpg-mha@mha.gov.in`, `support@agniveer.nic.in` and `ex-agniveerhelpdesk@mha.gov.in`.
- Current official notice: Indian Air Force first batch (01/22), authentication of Part A and submission of Profile – Part B, last date **23 October 2026**.
- When the snapshot was prepared, the official portal displayed **"No current openings found."**

### Deliberate omissions

- No invented vacancies, deadlines, salaries, eligibility rules, benefits, placement rates, testimonials or employer endorsements.
- No language selector was added because the public portal did not expose one.
- No registration form was added because registration of released Ex-Agniveers is automatic on the official portal.
- No login system, job matching or application tracking is simulated. All such actions link to the official portal.
- The site does not claim that every Ex-Agniveer will receive a job or a particular outcome.

---

## 9. Image credits

Images are illustrative, cropped and resized for this concept. Attribution and licences are preserved in the page footer and below.

| Use | Image / author | Licence | Source |
| --- | --- | --- | --- |
| Hero | Indian Army soldiers of the 99th Mountain Brigade's 2nd Battalion, 5th Gurkha Rifles during a training exercise. Photograph by Sgt. Michael J. MacLeod, U.S. Army. | Public domain | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Indian_Army_soldiers_with_the_99th_Mountain_Brigade%27s_2nd_Battalion,_5th_Gurkha_Rifles,_move_through_the_forests_of_western_Fort_Bragg_during_a_training_exercise_with_U.S._Army_paratroopers.jpg) |
| Initiative | Indian Army soldiers at India Gate. Photograph by KCVelaga. | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Indian_Army_soldiers_at_India_Gate.jpg) |
| Pathways | Assam Rifles marching contingent, Republic Day 2012. Photograph by the Ministry of Defence, Government of India. | GODL-India | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Assam_Rifles_marching_contingent_passes_through_the_Rajpath_during_the_63rd_Republic_Day_Parade-2012,_in_New_Delhi_on_January_26,_2012.jpg) |
| Experience | Women Army officers in Bhopal. Photograph by Suyash Dwivedi. | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Women_Army_Officers_in_Bhopal_(4).jpg) |
| Next step | Siachen warriors. Photograph by Arshsangh. | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Siachen_warriors.jpg) |
| Identity | National Emblem and NIC logo. | Official portal identity | [Official portal](https://careerprogression.mha.gov.in/) |

CC BY-SA 4.0: <https://creativecommons.org/licenses/by-sa/4.0/>  
GODL-India: <https://commons.wikimedia.org/wiki/Template:GODL-India>

---

## 10. Pre-production checklist

Before this concept could be considered for official use:

1. Obtain written authorisation for the use of the National Emblem, Ministry identity, NIC logo and any official imagery.
2. Replace the design-concept disclaimer with approved official wording.
3. Confirm every factual claim with the current official source on the day of publication.
4. Replace the dated notice snapshot with an approved, maintained content source or CMS integration.
5. Add the official accessibility statement and grievance-redressal wording approved by the Ministry.
6. Confirm that external image licences remain valid, or replace images with Government-owned assets.
7. Have the copy, routes, legal notices and attribution reviewed by the Ministry / NIC.
8. Host and deploy only on an approved Government of India environment, separate from the live portal.

---

## 11. Notes on responsiveness

- **Desktop:** 12-column editorial grid, two-column editorial sections, asymmetric pathway grid and cinematic full-bleed CTA.
- **Tablet:** navigation becomes a full-screen menu; mission, skills and FAQ collapse to a single reading column; pathway cards reflow to 12/6-column layouts; steps become 2×2.
- **Mobile:** dedicated typography scale, stacked sections, full-width calls to action, compact footer, horizontally clipped wordmark removed, and a full-height menu that scrolls when required.
- Checked at 1440, 1024, 912, 768 and 390 CSS pixels. No horizontal overflow.
