---
slug: welcome
title: Welcome to React Native Material
authors: [yamankatby]
tags: [react-native, material-ui]
date: 2021-11-21
---

Start by adding the library to your project.

```bash npm2yarn
npm install rn-material
```

Then start using the power of Material Design in your React Native app.

```js with-preview name: Quick start; description: A simple example of the button component
import React from "react";
import { Button } from "rn-material";

const App = () => (
  <Button title="Click Me" style={{ alignSelf: "center", marginTop: 40 }}/>
);

export default App;
```
