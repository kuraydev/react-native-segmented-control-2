<img alt="React Native Segmented Control 2" src="assets/logo.png" width="1050"/>

[![React Native Segmented Control 2](https://img.shields.io/badge/-%F0%9F%9A%80%20React%20Native%20Segmented%20Control%2C%20Pure%20Javascript%20for%20iOS%20and%20Android-orange?style=for-the-badge)](https://github.com/WrathChaos/react-native-segmented-control-2)

[![npm version](https://img.shields.io/npm/v/react-native-segmented-control-2.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-segmented-control-2)
[![npm](https://img.shields.io/npm/dt/react-native-segmented-control-2.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-segmented-control-2)
![Platform - Android and iOS](https://img.shields.io/badge/platform-Android%20%7C%20iOS-blue.svg?style=for-the-badge)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=for-the-badge)](https://github.com/prettier/prettier)

<p align="center">
  <img alt="React Native Segmented Control 2"
        src="assets/Screenshots/react-native-segmented-control-2.gif" height="1010" width="465" />
</p>

# Installation

Add the dependency:

```bash
npm i react-native-segmented-control-2
```

## Peer Dependencies

<b><i>Zero Dependency</i></b> 🥳

# Usage

## Import

```jsx
import SegmentedControl from "react-native-segmented-control-2";
```

## Fundamental Usage

```jsx
<SegmentedControl
  tabs={["Label 1", "Label 2", "Label 3"]}
  onChange={(index: number) => console.log("Index: ", index)}
/>
```

As controlled component:

```jsx
const [index, setIndex] = useState(0);
return (
  <SegmentedControl
    tabs={["Label 1", "Label 2", "Label 3"]}
    onChange={setIndex}
    value={index}
  />
);
```

## Customized Usage

```jsx
<SegmentedControl
  style={{ marginTop: 32, backgroundColor: "#ffe0e0" }}
  activeTabColor="#ff2929"
  activeTextColor="#fff"
  tabs={["Label 1", "Label 2", "Label 3"]}
  onChange={(index: number) => console.log("Index: ", index)}
/>
```

### Any Component Usage

You can use the segmented control with any component.
All you need to do is that put any component into the `tabs` props.
Please check out the `example` for its usage

## Example Project 😍

You can checkout the example project 🥰

Simply run

- `npm i`
- `react-native run-ios/android`

should work of the example project.

# Configuration - Props

## Fundamentals

| Property |   Type   |  Default  | Description                                          |
| -------- | :------: | :-------: | ---------------------------------------------------- |
| tabs     |  any[]   | undefined | set the array for tabs                               |
| onChange | function | undefined | set your own logic when the tab is pressed / changed |
| value    |  number  | undefined | value of index if used as a controlled component     |

## Customization (Optionals)

| Property         |       Type        |  Default  | Description                                                                                                        |
| ---------------- | :---------------: | :-------: | ------------------------------------------------------------------------------------------------------------------ |
| style            |     ViewStyle     |  default  | set or override the style object for the main container                                                            |
| initialIndex     |      number       |     0     | set the initial index                                                                                              |
| activeTextColor  |      string       |   #000    | change the active tab's text color                                                                                 |
| activeTabColor   |      string       |   #FFF    | change the active tab's color                                                                                      |
| gap              |      number       |     0     | set extra spacing for animation horizontal value                                                                   |
| tabStyle         |     ViewStyle     |  default  | set or override the style object for the tab                                                                       |
| selectedTabStyle |     ViewStyle     |  default  | set or override the style object for the selected tab                                                              |
| activeTextStyle  |     TextStyle     |  default  | set or override the style object for the active tab's text                                                         |
| textStyle        |     TextStyle     |  default  | set or override the style object for tab's text                                                                    |
| disabled         |      boolean      |   false   | stop the tabs from responding to presses                                                                           |
| insetShadow      | boolean \| string |   false   | recess the track with an inner shadow; `true` uses a default, or pass a `boxShadow` string to customize (RN 0.76+) |
| testID           |      string       | undefined | set on the container; each tab also gets `${testID}-tab-${index}`                                                  |

## Future Plans

- [x] ~~LICENSE~~
- [x] ~~Controller component support~~ (Thanks to @madox2 (https://github.com/WrathChaos/react-native-segmented-control-2/pull/6))
- [x] ~~Getting rid of screen width and manual width dependencies~~ (Thanks to @philo23 (https://github.com/WrathChaos/react-native-segmented-control-2/pull/7)
- [ ] Write an article about the lib on Medium

## Credits

Heavily inspired by these libraries:

- [react-native-segmented-control/segmented-control](https://github.com/react-native-segmented-control/segmented-control)
- [Karthik-B-06/react-native-segmented-control](https://github.com/Karthik-B-06/react-native-segmented-control)

I created this library because they're really not maintain actively and this is a pure javascript written library with a lot of customizations and better code structure

## Author

FreakyCoder, kurayogun@gmail.com

## License

React Native Segmented Control 2 is available under the MIT license. See the LICENSE file for more info.
