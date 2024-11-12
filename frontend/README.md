# Prerequisites

-   [Bun](https://bun.sh/docs/installation)

# Installation

Install the dependencies

```bash
bun install
```

Edit `/src/lib/config.ts`

-   apiUrl - The URL of the WatchPup API
-   accessTokenExpiresIn - How long the Access Token cookie should live (ms)

Example

```ts
export const config = {
	apiUrl: 'http://localhost:8080',
	accessTokenExpiresIn: 1000 * 60 * 60 * 24
};
```

# Running

For development:

```bash
bun run dev
```

For production:

```bash
bun run clean:build
bun run build
bun run start
```