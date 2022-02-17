# Icon Button

[`💬 Feedback`](https://github.com/yamankatby/react-native-material/labels/component%3A%20IconButton)

```js with-preview
import React from "react";
import { Stack, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const App = () => (
  <Stack fill center spacing={4}>
    <IconButton icon={props => <Icon name="eye" {...props} />} />
    <IconButton icon={props => <Icon name="dots-vertical" {...props} />} />
    <IconButton icon={props => <Icon name="magnify" {...props} />} />
  </Stack>
);

export default App;
```

## Import

```js
import { IconButton } from "@react-native-material/core";
```

## Usage

```js with-preview
import React from "react";
import { Stack, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const App = () => (
  <Stack fill center spacing={4}>
    <IconButton icon={props => <Icon name="wifi" {...props} />} />
    <IconButton
      icon={props => <Icon name="account" {...props} />}
      color="primary"
    />
    <IconButton
      icon={props => <Icon name="magnify" {...props} />}
      color="red"
    />
  </Stack>
);

export default App;
```

## Props

`icon`

The element to render as the icon.

Type: React.ReactNode | ((props: { color: string; size: number }) =\> React.ReactNode | null) | null;

Optional: Yes

---

`color`

The color of the icon and the press effect.

Type: Color;

Default: "on-background"

Optional: Yes

---

`contentContainerStyle`

The style of the icon's container view.

Type: PressableProps["style"];

Optional: Yes

---

`...ViewProps`, `...PressableProps`, `...PressableProps`
