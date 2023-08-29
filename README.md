# webdev

Cornell webdev's main website.

## Gmail

The email for this project is cornellwebdev@gmail.com

## Add branch protection rules

Add branch protection rules in the repo settings to force users to create a PR + get approval to commit changes to main.

Refer to RideHub repo settings.

## Scripts

**Pushing specific commits to Glue root**

```bash
$ git checkout glue-main
$ git cherry-pick <commit-hash>
$ git push
```

**Setting upstream to glue/main**

```bash
$ git branch -u glue/main
```

**Push to glue/main**

```bash
git push glue glue-main:main
```

## Backend

The entire backend is handled by Supbase.

## Authentication table

1. Create a `profiles` table
2. Link `id` column with reference to `auth.users.id`

## Sentry

Update `sentry.properties` file with project name (ex. glue3-referhub)
