# Development guide

This project uses [`pnpm`](https://pnpm.io/) as the package manager and [`git`](https://git-scm.com/) for version control. Below is a short overview of the development workflow.

- [Development guide](#development-guide)
  - [Environment setup](#environment-setup)
    - [Clone the repository](#clone-the-repository)
    - [Pull submodules](#pull-submodules)
    - [Install Node.js and pnpm](#install-nodejs-and-pnpm)
    - [Install dependencies](#install-dependencies)
  - [Build a local development build](#build-a-local-development-build)
  - [Start the local server](#start-the-local-server)
  - [Local debugging with Tampermonkey](#local-debugging-with-tampermonkey)
  - [Regression checklist when changing existing items](#regression-checklist-when-changing-existing-items)
  - [Commit message conventions](#commit-message-conventions)
  - [Additional code style rules](#additional-code-style-rules)
    - [`local/no-underscore-in-custom-asset-name`](#localno-underscore-in-custom-asset-name)
    - [`local/tapedhands-last-in-assetposemapping`](#localtapedhands-last-in-assetposemapping)
    - [`local/no-targetcharacters-possessive`](#localno-targetcharacters-possessive)


## Environment setup

### Clone the repository

1. Make sure [`git`](https://git-scm.com/) is installed.
2. Pick a suitable directory on your machine and clone the repository:

```bash
git clone https://github.com/SugarChain-Studio/echo-clothing-ext.git
```

If everything went well, you should now have a directory called `echo-clothing-ext` where you ran the command. `cd` into it:

```bash
cd ./echo-clothing-ext
```

This directory is the **project root**; most commands are run from here.

### Pull submodules

From the **project root**, run:

```bash
git submodule update --init
```

This fetches the [utils module](https://github.com/SugarChain-Studio/bc-modding-utilities.git) into the `/utils` directory.


### Install Node.js and pnpm

1. Install [Node.js](https://nodejs.org/) (LTS recommended).
2. From the **project root**, install `pnpm`:

```bash
corepack prepare pnpm --activate
```

### Install dependencies

From the **project root**:

```bash
pnpm install
```

This may take a while depending on your network and hardware.  
If installs are very slow or fail, you can try switching the npm registry mirror:

```bash
npm config set registry https://registry.npmmirror.com
```

## Build a local development build

From the **project root**:

```bash
pnpm dev
```

This produces a development build according to project configuration; output goes under `./public`. Important files:

- `./public/bc-cloth.js` — bundled main script.
- `./public/bc-cloth.user.js` — userscript file for Tampermonkey-style managers in the browser.

## Start the local server

From the **project root**:

```bash
pnpm serve
```

By default this serves `./public` on port `8080`.  
> If `8080` is taken, you can temporarily change the port in `package.json`; remember to rebuild after changes, and **revert** those edits before committing.

## Local debugging with Tampermonkey

1. Install [Tampermonkey](https://www.tampermonkey.net/) (or another userscript manager) in your browser.
2. After `pnpm serve` is running, open `http://localhost:8080/bc-cloth.user.js`.
3. Click “Install” on the page to add the script to your manager.
4. You can debug your local changes in the browser without redeploying to production each time.


## Regression checklist when changing existing items

When you rename, redraw, reorder layers, change pose mappings, or options on an **existing** item, run through this minimal regression pass so legacy content still behaves:

1. **Character appearances using the old item**
   - Load old saves/appearances that include the item; confirm no load errors; display, position, color, and masks look right.
   - Switch common poses (standing, behind-back bondage, prone, etc.) and check occlusion and draw order.
2. **Wardrobe entries that reference the old item**
   - Open the relevant entries in the wardrobe; check thumbnails, default colors/options, and layer order.
   - Remove and re-add the item; confirm no stale state or glitches.
3. **Outfit codes that include the old item**
   - Paste and apply old outfit codes; confirm no errors and visuals match the previous version.
4. **Block/hide settings involving the old item**
   - Verify occlusion/hide rules still fire correctly (hair, accessories, left/right arm masks, etc.).
   - Confirm mutual exclusion / compatibility still matches expectations; document intentional changes in your notes.
5. **Linked items (HideItem, etc.)**
   - Check HideItem / ShowIf / mutual-exclusion config still affects the right related items.
   - Wear together with affected items and verify layers and occlusion.
6. **Action extension plugins**
   - If you use the “action extension” (external plugin), verify poses, switches, and shortcuts related to this item still work.
   - Note in the commit message if behavior for that plugin changes.

The project provides a `customFixup` component; for simple migrations like renames, you can use it to preserve old appearances, wardrobe entries, and outfit codes (other checks still need manual verification).

## Commit message conventions

Commits follow a lightly adapted Angular / [Conventional Commits](https://www.conventionalcommits.org/) style for changelog and release tooling.

Format is simple: **type + short description** (Chinese is fine). Pattern:

```text
type: what you did
```

Common types:

- **feat** — new feature or content (e.g. new item)
- **fix** — bugfix (wrong path, layer, mask, etc.)
- **adjust** — user-visible tweak (new option, layer priority, copy change)
- **refactor** — internal refactor (no user-facing change; dev-only libraries count here)
- **chore** — tooling, build scripts, misc maintenance
- **docs** — documentation only

Examples you can adapt:

```text
feat: add “xxx” item

adjust: raise xxx/yyy layer priority so hair doesn’t cover it
adjust: change display string of “xxx” from … to …
adjust: change default color of “yyy”

fix: fix “xxx” misalignment in Yoked pose
fix: fix English spelling on two options of “xxx”
```

Tips:

- One sentence: **what** changed and **why** when it helps.
- One logical change per commit; split large work into multiple commits.
- Run `pnpm lint` before committing when useful.

## Additional code style rules

ESLint includes several custom rules (prefixed `local/`). Summary:

### `local/no-underscore-in-custom-asset-name`

Underscores `_` are not allowed in the top-level `Name` field of `CustomAssetDefinition`.

**Reason:** Reverse lookup from image filenames to asset `Name` splits on the **first** underscore: the prefix becomes `Name`. If `Name` itself contains `_`, the boundary is wrong (e.g. `Cool_Top_Layer1.png` parses as `Cool` instead of `Cool_Top`), breaking or misaligning resources. Aside from forbidding `_` in `Name`, there’s no mandated casing or word separator; match the style of other assets in the repo.

If you must support legacy underscore names (rare):

1. Use the new-compliant name as the primary definition.
2. Map the old name in extensions or compatibility shims — don’t keep the old string as canonical `Name`.

### `local/tapedhands-last-in-assetposemapping`

In `AssetPoseMapping` objects, the `TapedHands` entry must be **last**. Wrong order errors; `pnpm lint --fix` can move `TapedHands` to the end.

**Reason:** Pose mappings are processed in definition order. `TapedHands` is special; if it isn’t last it matches too early and overrides normal upper-body poses (standing, behind-back, etc.), hiding or covering them incorrectly.

### `local/no-targetcharacters-possessive`

Do not use the string `TargetCharacter's` in ordinary or template literals; use `DestinationCharacter` instead. The rule auto-fixes with `pnpm lint --fix` (replaces `TargetCharacter's` with `DestinationCharacter`).

**Reason:** `DestinationCharacter` applies correct possessive / pronoun forms when the target is self (`her` / `his` / `their`, etc.). Concatenating `TargetCharacter's` produces bad output like `her's` or `he's`.

