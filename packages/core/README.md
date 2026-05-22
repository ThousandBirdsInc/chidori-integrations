# @chidori/integrations-core

Shared types and helpers for Chidori integration packages.

The package intentionally avoids runtime dependencies. Provider packages use it to define Chidori-ready tool modules, resolve secrets, expose integration specs, and call JSON HTTP APIs through `chidori.http`.
