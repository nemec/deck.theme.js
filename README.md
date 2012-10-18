deck.theme.js
=============

Allows per-slide themeing of deck.js slides (with transitions between themes).

## Requirements

[deck.js](https://github.com/imakewebthings/deck.js)

Modifies deck.js stylesheets. Replace `.deck-container` with `.deck-container.theme-name`. In
the theme stylesheets you use (this allows you to manually specify which imported theme to
assign to a slide).

## Example:

See http://nemec.github.com/deck.theme.js for an interactive example.

## How to Use:

1. Create a new deck.js theme (or copy an existing one and modify).
2. Since deck.js core does not yet include support for multiple themes,
  you'll need to make sure you set up the theme correctly:
  
  * To make each theme swappable, make sure the "top level" css selector
    looks something like this: `.deck-container.theme-name`.

3. In your slides, make sure the .deck-container element also has
  the class `theme-name`. This is the default theme for your slides
  and it ensures that at least one theme is applied even if no
  per-slide themes are enabled.
4. On each slide you want to apply a custom theme, set the `data-theme`
  attribute to the same theme-name class you used earlier in your css.
  
## Features

* Smooth transitions between themes.
* Slides with no custom theme automatically inherit the theme of the
  previous slide (so you only need to specify the theme at "transition points").
* Proceeding backward through the slides also transitions themes at appropriate points.