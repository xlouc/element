/** @format */

export const tintColor = (c, tint) => {
  const color = c.replace('#', '')
  let red = parseInt(color.slice(0, 2), 16)
  let green = parseInt(color.slice(2, 4), 16)
  let blue = parseInt(color.slice(4, 6), 16)

  if (tint === 0) {
    // when primary color is in its rgb space
    return [red, green, blue].join(', ')
  } else {
    red += Math.round(tint * (255 - red))
    green += Math.round(tint * (255 - green))
    blue += Math.round(tint * (255 - blue))
    red = red.toString(16)
    green = green.toString(16)
    blue = blue.toString(16)
    return `#${red}${green}${blue}`
  }
}

// Math.floor with precision
function floor(number, decimals) {
  decimals = +decimals || 0

  var multiplier = Math.pow(10, decimals)

  return Math.floor(number * multiplier) / multiplier
}

var levels = {
  fail: {
    range: [0, 3],
    color: 'hsl(0, 100%, 40%)'
  },
  'aa-large': {
    range: [3, 4.5],
    color: 'hsl(40, 100%, 45%)'
  },
  aa: {
    range: [4.5, 7],
    color: 'hsl(80, 60%, 45%)'
  },
  aaa: {
    range: [7, 22],
    color: 'hsl(95, 60%, 41%)'
  }
}

function rangeIntersect(min, max, upper, lower) {
  return (max < upper ? max : upper) - (lower < min ? min : lower)
}

export class Color {
  constructor(rgba) {
    if (rgba === 'transparent') {
      rgba = [0, 0, 0, 0]
    } else if (typeof rgba === 'string') {
      var rgbaString = `rgba(${tintColor(rgba, 0)}, 1)`
      rgba = rgbaString.match(/rgba?\(([\d.]+), ([\d.]+), ([\d.]+)(?:, ([\d.]+))?\)/)

      if (rgba) {
        rgba.shift()
      } else {
        throw new Error('Invalid string: ' + rgbaString)
      }
    }

    if (rgba[3] === undefined) {
      rgba[3] = 1
    }

    rgba = rgba.map(function(a) {
      return floor(a, 3)
    })

    this.rgba = rgba
  }

  get rgb() {
    return this.rgba.slice(0, 3)
  }
  get alpha() {
    return this.rgba[3]
  }
  set alpha(alpha) {
    this.rgba[3] = alpha
  }
  get luminance() {
    // Formula: http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
    var rgba = this.rgba.slice()

    for (var i = 0; i < 3; i++) {
      var rgb = rgba[i]

      rgb /= 255

      rgb = rgb < 0.03928 ? rgb / 12.92 : Math.pow((rgb + 0.055) / 1.055, 2.4)

      rgba[i] = rgb
    }

    return 0.2126 * rgba[0] + 0.7152 * rgba[1] + 0.0722 * rgba[2]
  }

  get inverse() {
    return new Color([255 - this.rgba[0], 255 - this.rgba[1], 255 - this.rgba[2], this.alpha])
  }

  toString() {
    return 'rgb' + (this.alpha < 1 ? 'a' : '') + '(' + this.rgba.slice(0, this.alpha >= 1 ? 3 : 4).join(', ') + ')'
  }

  clone() {
    return new Color(this.rgba)
  }

  // Overlay a color over another
  overlayOn(color) {
    var overlaid = this.clone()

    var alpha = this.alpha

    if (alpha >= 1) {
      return overlaid
    }

    for (var i = 0; i < 3; i++) {
      overlaid.rgba[i] = overlaid.rgba[i] * alpha + color.rgba[i] * color.rgba[3] * (1 - alpha)
    }

    overlaid.rgba[3] = alpha + color.rgba[3] * (1 - alpha)

    return overlaid
  }

  contrast(color) {
    // Formula: http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
    var alpha = this.alpha

    if (alpha >= 1) {
      if (color.alpha < 1) {
        color = color.overlayOn(this)
      }

      var l1 = this.luminance + 0.05,
        l2 = color.luminance + 0.05,
        ratio = l1 / l2

      if (l2 > l1) {
        ratio = 1 / ratio
      }

      ratio = floor(ratio, 2)

      return {
        ratio: ratio,
        error: 0,
        min: ratio,
        max: ratio
      }
    }

    // If we’re here, it means we have a semi-transparent background
    // The text color may or may not be semi-transparent, but that doesn't matter

    var onBlack = this.overlayOn(Color.BLACK),
      onWhite = this.overlayOn(Color.WHITE),
      contrastOnBlack = onBlack.contrast(color).ratio,
      contrastOnWhite = onWhite.contrast(color).ratio

    var max = Math.max(contrastOnBlack, contrastOnWhite)

    // This is here for backwards compatibility and not used to calculate
    // `min`.  Note that there may be other colors with a closer luminance to
    // `color` if they have a different hue than `this`.
    var closest = this.rgb.map(function(c, i) {
      return Math.min(Math.max(0, (color.rgb[i] - c * alpha) / (1 - alpha)), 255)
    })

    closest = new Color(closest)

    var min = 1
    if (onBlack.luminance > color.luminance) {
      min = contrastOnBlack
    } else if (onWhite.luminance < color.luminance) {
      min = contrastOnWhite
    }

    return {
      ratio: floor((min + max) / 2, 2),
      error: floor((max - min) / 2, 2),
      min: min,
      max: max,
      closest: closest,
      farthest: onWhite == max ? Color.WHITE : Color.BLACK
    }
  }

  static get BLACK() {
    return new Color([0, 0, 0])
  }

  static get GRAY() {
    return new Color([127.5, 127.5, 127.5])
  }

  static get WHITE() {
    return new Color([255, 255, 255])
  }
}

export const contrast = function(backgroundColor, foregroundColor) {
  let background = new Color(backgroundColor)
  let foreground = foregroundColor instanceof Color ? foregroundColor : new Color(foregroundColor)
  let contrast = background.contrast(foreground)

  var min = contrast.min,
    max = contrast.max,
    range = max - min,
    classes = [],
    percentages = []

  for (var level in levels) {
    var bounds = levels[level].range,
      lower = bounds[0],
      upper = bounds[1]

    if (min < upper && max >= lower) {
      classes.push(level)

      percentages.push({
        level: level,
        percentage: (100 * rangeIntersect(min, max, upper, lower)) / range
      })
    }
  }

  return {
    error: contrast.error,
    max: contrast.max,
    min: contrast.min,
    ratio: contrast.ratio,
    classes: classes[0],
    percentages: percentages[0]
  }
}

export const singleContrast = function(color, light = true) {
  return contrast(color, light ? Color.WHITE : Color.BLACK)
}
