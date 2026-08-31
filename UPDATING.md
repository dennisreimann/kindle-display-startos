# Updating the upstream version

## Determining the upstream version

Upstream is a git submodule at `upstream/` pointing to [dennisreimann/kindle-display](https://github.com/dennisreimann/kindle-display). The version is the `version` field in `upstream/server/package.json` (e.g. `0.6.4`).

To check the latest upstream version:

```bash
git -C upstream describe --tags  # or: git -C upstream log --oneline -1
```

The current pin is recorded in `startos/versions/current.ts` as the `version` field (e.g. `0.6.4:0`).

## Applying the bump

1. Update the submodule to the desired upstream commit/tag:

   ```bash
   cd upstream
   git checkout <tag-or-commit>
   cd ..
   git add upstream
   ```

2. Edit `startos/versions/current.ts` and update the `version` field to match `<upstream-version>:0`.

3. Update the release notes in `startos/versions/current.ts` if there are user-visible changes.

4. Run `make` to verify the package builds.
