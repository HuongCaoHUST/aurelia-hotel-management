# Frontend architecture

The repository keeps the two existing web apps intact and adds one small shared package:

```text
frontend-customer/       # customer website; currently static, migrate page by page
frontend-staff/          # staff React app
packages/shared/         # API client and authentication logic shared by future apps
```

## What belongs in `packages/shared`

- API requests and endpoint wrappers
- authentication and token storage contracts
- shared data models and validation later
- business rules that do not depend on the browser or React Native

## What stays inside an app

- pages, navigation and UI components
- CSS and responsive layout
- browser-specific APIs
- mobile-specific APIs such as secure storage, camera and push notifications

The shared package intentionally uses plain JavaScript and small factory functions. This keeps
the code easy to follow and lets a future React Native app provide its own token storage adapter.

## Adding a future app

Install or link `@aurelia/shared`, create a platform-specific storage adapter, then wire the app:

```js
const http = createHttpClient({
  baseUrl: API_BASE_URL,
  getAccessToken: () => storage.getAccessToken(),
});

const auth = createAuthService({
  api: createAuthApi(http),
  storage,
});
```

The app should not call `fetch` directly for authenticated API requests.
