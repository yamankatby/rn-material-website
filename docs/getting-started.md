---
sidebar_position: 1
---

# Getting Started

Add **rn-material** to your project in < 1 minute.

## Installation

Open a Terminal in your project's folder and run:

```bash npm2yarn
npm install rn-material
```

## Quick start

Here's a quick example to get you started, **it's literally all you need**:

```js
import { Button } from "rn-material";

const App = () => (
  <Button title="Click Me" onPress={() => alert("🎉🎉🎉")}/>
);

export default App;
```

Yes, this really is all you need to get started 🎉, as you can see in this live and interactive demo:

```js with-preview name: Quick start; description: A simple example of the button component
import React from "react";
import { Button } from "rn-material";

const App = () => (
  <Button
    title="Click Me"
    style={{ alignSelf: "center", marginTop: 40 }}
  />
);

export default App;
```

## Set up Provider

For **rn-material** to work currently, you need to wrap your whole app with a [`Provider`](/) component.

> This will usually be in the `App.js` or `App.tsx` file.

Go to the root component of your app and add the following:

```jsx
// 1. Import the `Provider` component from `rn-material`
import { Provider } from "rn-material";

const App = () => (
  // 2. Wrap your app with the `Provider` component
  <Provider>
    <Main />
  </Provider>
);

export default App;
```

The [`Provider`](/) component provides the theme context to all components in the library. It also acts as a portal to
components which need to be rendered at the top level (such as dialogs, popups, etc.).

Refer to the [Theming](/guides/theming) documentation for more information.

## Support

If you have any questions, contact [@yamankatby](https://twitter.com/yamankatby) on Twitter
or [start a discussion on GitHub](https://github.com/yamankatby/react-native-material/discussions). In case of bugs or
feature requests, please [open an issue on GitHub](https://github.com/yamankatby/react-native-material/issues).
