# SmartCart Requirements — 2026-04-01

This document captures the current functionality of the SmartCart static app (index.html, style.css, app.js). Use it as the canonical reference for UI structure, behaviors, and data contracts.

## 1. Summary & Scope
SmartCart is a fully static grocery-planning experience delivered via GitHub Pages. Key pillars:
- Marketing-forward Home tab introducing the Costco-vs-local story.
- Profile-centric experience that now houses saved lists, saved goals, and the conversational planner.
- Optimizer that compares each item between warehouse and local stores using deterministic demo logic.
- Budget/Receipt tooling with photo-first capture, insights, and smart tips.

## 2. Information Architecture
- **Nav order (desktop + drawer):** Home → Profile → Optimizer → Budget → How It Works.
- **Mobile:** hamburger opens the same nav order; `switchTab` drives both top tabs and sidebar buttons.
- **Planner access:** All CTAs with `data-goto-tab="profile"` can include `data-scroll-target="profile-planner-section"`. `switchTab('goals')` is an alias for Profile + scroll.
- **Home remains the default tab** (initialized via `switchTab('overview')`).

## 3. Feature Deep Dives
### 3.1 Home / Marketing Surface
- **Hero:** gradient hero with kicker + CTA (“Start Planning”). CTA points to Profile’s planner section.
- **Savings Proof module:** `renderSavingsProof()` populates a grid from `SAVINGS_PROOF_ITEMS`. Each card shows local vs. warehouse price, break-even quantity, verdict badge, and notes.
- **Feature cards:** Four cards (Profile & Saved Lists, Planner, Optimizer, Budget) each linking to the relevant tab/section.
- **Lifestyle CTA + stats:** imagery plus four stats (annual savings, catalog size, factors, privacy) and a bottom CTA replicating the planner link.

### 3.2 Profile & Planner
- **Household profile form:** name, household size buttons, ZIP input, membership toggle, health/diet checkboxes, cuisines.
- **Saved lists:** lives inside Profile (`smartcart_lists`). Includes status bar, history, and saved list cards with load/delete actions.
- **Saved goals (new):**
  - Card includes description, “Save current goal” row (name input + button), entries list, and hint when empty.
  - Entries display goal name, truncated preview, and Use/Delete buttons.
  - Data persisted under `smartcart_saved_goals` and rendered via `renderSavedGoals()`.
- **Planner section (`#profile-planner-section`):**
  - Goal textarea, example pills, “Build My List” button.
  - Profile goal hint (auto-filled from persisted profile goal if present).
  - Planner thread (`planner-thread`) for conversation history, goal results card (banner, refinements, suggested items with add-to-optimizer), idea cards, update-wish section, and inline “How it works” accordion.
  - Planner history still stored in `smartcart_planner_history` and surfaced in the profile history card with “Resume” buttons.

### 3.3 Optimizer
- **Inputs:** uses `state.groceryList` populated via list builder. Each row now has a “Local promo” toggle that applies a 15% discount to local price (`LOCAL_PROMO_DISCOUNT`). Promo state persists in saved lists.
- **Decision logic:** `analyzeItem` compares local vs. warehouse per category metadata, household size, and promo discounts. Returns recommendation, reasoning, per-unit savings, etc.
- **Cost overview:** `renderResults` updates strategy banner plus three cost cards (all-local, all-warehouse, optimized split).
- **Shopping plan:** two columns (warehouse/local). Items show emoji icons, quantity, and, when applicable, “Local promo” chips.
- **Actions:** “Send to optimizer” loads suggested items into list; plan columns have Copy buttons.

### 3.4 Budget & Receipts
- **Settings:** spend target chips (weekly/biweekly/monthly) + amount input saved to `smartcart_budget`.
- **Receipt capture:** photo/upload components simulate parsing via templates and store receipts in `smartcart_receipts` (id, date, store, items[], total).
- **This Period summary:** progress bar, pace badge, remaining amount, dates.
- **Spending by category:** aggregated from receipts in the current period.
- **Receipt Insights:** new card showing lifetime totals (count, spend, avg per trip, top category, most visited store) across all stored receipts.
- **Smart Tips:** generated heuristics based on pace, category mix, etc.
- **History:** latest 10 receipts display store, date, item count, mini category dots, total, and delete action.

### 3.5 How It Works
- Separate informational tab explaining the four decision factors plus future roadmap placeholder.

## 4. Data & Storage References
| Key | Structure | Used For |
| --- | --- | --- |
| `smartcart_profile` | `{ name, householdSize, zip, hasMembership, healthFlags[], cuisineFlags[], goals }` | Household preferences + profile goal. |
| `smartcart_lists` | `[{ id, name, items[{ name, quantity, localPromo }], savedAt, goalText, goalProfileKey, ... }]` | Saved grocery lists tied to planner contexts. |
| `smartcart_saved_goals` | `[{ id, name, text, createdAt }]` | Saved planner prompts surfaced in Profile. |
| `smartcart_planner_history` | `[{ id, date, headline, goalText, turns, thread[] }]` | Planner history resume/logging. |
| `smartcart_budget` | `{ period: 'weekly'|'biweekly'|'monthly', amount }` | Budget target. |
| `smartcart_receipts` | `[{ id, date, store, items[{ name, category, total }], total }]` | Receipt capture data powering insights/tips. |

## 5. UX Behaviors & Edge Cases
- **Planner CTA routing:** `switchTab('goals')` is now an alias for Profile + scroll to planner. Any button can optionally set `data-scroll-target` to fine-tune scroll behavior.
- **Saved goals:** attempts to save without a name or without planner text show toasts and do nothing.
- **Local promo toggles:** persist inside saved lists and load back when a list is reopened. Promo flag adds chips to planner and optimizer outputs.
- **Receipt insights:** hides automatically when there are zero receipts.
- **Mobile nav:** removal of the Planner tab ensures both nav menus stay in sync.

## 6. Open Questions / Future Ideas
1. **Savings Proof extensibility:** consider pulling item data from a JSON file so marketing can edit without touching JS.
2. **Planner saved-goal metadata:** potential to store tags (e.g., “keto”, “bulk prep”) for filtering.
3. **Requirements doc cadence:** align with major releases (IA changes, pricing logic updates) so this file stays fresh.
