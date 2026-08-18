# AGENTS.md — christiankota.com

_Auto-maintained by Grok Universal Context vault-sync (2026-08-18T22:53:02Z)._
Edit below the AGENT_MANUAL_START marker to keep durable human notes.

## Purpose

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

## Standing rules for agents

1. **Search memory first** (`~/.grok/memory/`, memory_search) before changing systems that may exist elsewhere.
2. **Do not regress protected systems** without explicit user request.
3. **Prefer isolated worktrees** when the tree is dirty, another agent may be active, or protected paths are involved.
4. Prefer extend-over-rewrite for working automation.

## Related projects (cross-agent context)

- **translator-pro** (`/home/saphyre-solutions/Projects/Google Build Projects/translator-pro`) — score=4.0; shared-keywords:align,alt,api,apps,center,contains,dependencies,deploy
  - shared: align, alt, api, apps, center, contains, dependencies, deploy, dev, div

When work here affects those projects, update their handoff notes or re-run vault-sync.

## Isolation

Default isolation: **worktree** (conflict_risk:dirty_main). Create worktree=True; apply requires review=True.

## Manual notes

<!-- AGENT_MANUAL_START -->

Live publish is automatic via `site-sync-daemon` on this path only.
See `GEMINI.md` in this repo for Antigravity / Gemini CLI do/don't rules.
Do not use `~/antigravity/ChristianKota.com-|…` as production.
