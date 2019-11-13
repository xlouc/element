const defaults = {
  startVal: 0, // number to start at (0)
  precision: 0, // number of decimal places (0)
  duration: 2, // animation duration in seconds (2)
  useEasing: true, // ease animation (true)
  useGrouping: true, // example: 1,000 vs 1000 (true)
  smartEasingThreshold: 999, // smooth easing for large numbers above this if useEasing (999)
  smartEasingAmount: 333, // amount to be eased for numbers above threshold (333)
  separator: ',', // grouping separator (,)
  decimal: '.', // decimal (.)
  onEnd: function() {},
  onPrint: function() {}
}

function CountUp(options) {
  //
  var _this = this

  this.count = function(timestamp) {
    if (!_this.startTime) {
      _this.startTime = timestamp
    }

    var progress = timestamp - _this.startTime
    _this.remaining = _this.duration - progress // to ease or not to ease

    if (_this.useEasing) {
      if (_this.countDown) {
        _this.frameVal = _this.startVal - _this.easingFn(progress, 0, _this.startVal - _this.endVal, _this.duration)
      } else {
        _this.frameVal = _this.easingFn(progress, _this.startVal, _this.endVal - _this.startVal, _this.duration)
      }
    } else {
      if (_this.countDown) {
        _this.frameVal = _this.startVal - (_this.startVal - _this.endVal) * (progress / _this.duration)
      } else {
        _this.frameVal = _this.startVal + (_this.endVal - _this.startVal) * (progress / _this.duration)
      }
    } // don't go past endVal since progress can exceed duration in the last frame

    if (_this.countDown) {
      _this.frameVal = _this.frameVal < _this.endVal ? _this.endVal : _this.frameVal
    } else {
      _this.frameVal = _this.frameVal > _this.endVal ? _this.endVal : _this.frameVal
    } // decimal

    _this.frameVal = Math.round(_this.frameVal * _this.decimalMult) / _this.decimalMult // format and print value

    _this.printValue(_this.frameVal) // whether to continue

    if (progress < _this.duration) {
      _this.rAF = requestAnimationFrame(_this.count)
    } else if (_this.finalEndVal !== null) {
      // smart easing
      _this.update(_this.finalEndVal)
    } else {
      if (_this.options.onEnd) {
        _this.options.onEnd()
      }
    }
  }

  this.formatNumber = function(num) {
    var neg = num < 0 ? '-' : ''
    var result, x, x1, x2, x3
    result = Math.abs(num).toFixed(_this.options.precision)
    result += ''
    x = result.split('.')
    x1 = x[0]
    x2 = x.length > 1 ? _this.options.decimal + x[1] : ''

    if (_this.options.useGrouping) {
      x3 = ''

      for (var i = 0, len = x1.length; i < len; ++i) {
        if (i !== 0 && i % 3 === 0) {
          x3 = _this.options.separator + x3
        }

        x3 = x1[len - i - 1] + x3
      }

      x1 = x3
    }
    // optional numeral substitution
    if (_this.options.numerals && _this.options.numerals.length) {
      x1 = x1.replace(/[0-9]/g, function(w) {
        return _this.options.numerals[+w]
      })
      x2 = x2.replace(/[0-9]/g, function(w) {
        return _this.options.numerals[+w]
      })
    }

    return neg + x1 + x2
  }

  this.easeOutExpo = function(t, b, c, d) {
    return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b
  }

  // 初始化
  this.options = Object.assign({}, defaults, options)

  this.formattingFn = this.options.formattingFn ? this.options.formattingFn : this.formatNumber
  this.easingFn = this.options.easingFn ? this.options.easingFn : this.easeOutExpo

  this.startVal = this.validateValue(this.options.startVal)
  this.frameVal = this.startVal

  this.options.precision = Math.max(0 || this.options.precision)
  this.decimalMult = Math.pow(10, this.options.precision)
  this.resetDuration()
  this.useEasing = this.options.useEasing
  if (this.options.separator === '') {
    this.options.useGrouping = false
  }
}

// determines where easing starts and whether to count down or up
CountUp.prototype.determineDirectionAndSmartEasing = function() {
  const end = this.finalEndVal ? this.finalEndVal : this.endVal
  this.countDown = this.startVal > end
  const animateAmount = end - this.startVal
  if (Math.abs(animateAmount) > this.options.smartEasingThreshold) {
    this.finalEndVal = end
    const up = this.countDown ? 1 : -1
    this.endVal = end + up * this.options.smartEasingAmount
    this.duration = this.duration / 2
  } else {
    this.endVal = end
    this.finalEndVal = null
  }
  if (this.finalEndVal) {
    this.useEasing = false
  } else {
    this.useEasing = this.options.useEasing
  }
}
// start animation
CountUp.prototype.start = function(newEndVal) {
  this.endVal = this.validateValue(newEndVal)
  if (this.duration > 0) {
    this.determineDirectionAndSmartEasing()
    this.paused = false
    this.rAF = requestAnimationFrame(this.count)
  } else {
    this.printValue(this.endVal)
  }
}

// pause/resume animation
CountUp.prototype.pauseResume = function() {
  if (!this.paused) {
    cancelAnimationFrame(this.rAF)
  } else {
    this.startTime = null
    this.duration = this.remaining
    this.startVal = this.frameVal
    this.determineDirectionAndSmartEasing()
    this.rAF = requestAnimationFrame(this.count)
  }
  this.paused = !this.paused
}

// reset to startVal so animation can be run again
CountUp.prototype.reset = function() {
  cancelAnimationFrame(this.rAF)
  this.paused = true
  this.resetDuration()
  this.startVal = this.validateValue(this.options.startVal)
  this.frameVal = this.startVal
  this.printValue(this.startVal)
}

// pass a new endVal and start animation
CountUp.prototype.update = function(newEndVal) {
  cancelAnimationFrame(this.rAF)
  this.startTime = null
  this.endVal = this.validateValue(newEndVal)
  if (this.endVal === this.frameVal) {
    return
  }
  this.startVal = this.frameVal
  if (!this.finalEndVal) {
    this.resetDuration()
  }
  this.determineDirectionAndSmartEasing()
  this.rAF = requestAnimationFrame(this.count)
}

CountUp.prototype.printValue = function(val) {
  const result = this.formattingFn(val)
  if (this.options.onPrint) {
    this.options.onPrint(result)
  }
}

CountUp.prototype.ensureNumber = function(n) {
  return typeof n === 'number' && !isNaN(n)
}

CountUp.prototype.validateValue = function(value) {
  const newValue = Number(value)
  if (!this.ensureNumber(newValue)) {
    throw `[CountUp] invalid start or end value: ${value}`
  } else {
    return newValue
  }
}

CountUp.prototype.resetDuration = function() {
  this.startTime = null
  this.duration = Number(this.options.duration) * 1000
  this.remaining = this.duration
}

CountUp.prototype.destroy = function() {
  cancelAnimationFrame(this.rAF)
}

export default CountUp
