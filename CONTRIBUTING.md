# Keeping Subtrees in Sync

This monorepo uses [git subtree](https://www.atlassian.com/git/tutorials/git-subtree) to sync certain packages with their own repositories.

## After cloning

To sync with the original standalone repositories, run:

```bash
git remote add refine-pocketbase https://github.com/kruschid/refine-pocketbase.git
git remote add refine-mantine https://github.com/kruschid/refine-mantine.git
```

## Pulling updates from a package repo

```bash
git subtree pull --prefix=packages/refine-pocketbase refine-pocketbase main --squash
git subtree pull --prefix=packages/refine-mantine refine-mantine master --squash
```

## Pushing updates back

```bash
git subtree push --prefix=packages/refine-pocketbase refine-pocketbase main
git subtree push --prefix=packages/refine-mantine refine-mantine master
```