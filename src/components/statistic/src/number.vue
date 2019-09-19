<script>
import CountUp from 'yak-ui/src/utils/countup.js'

export default {
  name: 'StatisticNumber',
  inheritAttrs: false,

  props: {
    separator: {
      type: String,
      default: ','
    },
    decimal: {
      type: String,
      default: '.'
    },
    precision: Number,
    countup: Boolean,
    formatter: Function,
    value: [String, Number]
  },

  data() {
    return {
      $instance: null,
      result: {
        negative: null,
        decimal: null
      }
    }
  },

  computed: {
    isNumber() {
      return Boolean(String(this.value).match(/^(-?)(\d*)(\.(\d+))?$/))
    }
  },

  watch: {
    value(value) {
      this.$nextTick(function() {
        if (this.isNumber) {
          this.$data.$instance.update(Number(value))
        }
      })
    }
  },

  created() {
    const { separator, decimal, precision, countup, onPrint, formatter } = this
    let options = { separator, decimal, precision }
    options = JSON.parse(JSON.stringify(options))
    if (!countup) {
      options.duration = 0
    }
    options.formattingFn = formatter
    options.onPrint = onPrint
    this.$data.$instance = new CountUp(options)
  },

  mounted() {
    this.$nextTick(function() {
      if (this.isNumber) {
        this.$data.$instance.start(Number(this.value))
      }
    })
  },

  methods: {
    onPrint(result) {
      result = String(result).split(this.decimal)
      this.result.negative = result[0]
      this.result.decimal = result[1]
    }
  },

  render(h) {
    const { isNumber, formatter, value, result, decimal } = this
    let valueNode = undefined
    if (isNumber) {
      valueNode = [
        <span key="int" class="el-statistic__content-value-int">
          {result.negative}
        </span>,
        result.decimal && (
          <span key="decimal" class="el-statistic__content-value-decimal">
            {decimal}
            {result.decimal}
          </span>
        )
      ]
    } else if (typeof formatter === 'function') {
      valueNode = formatter(value)
    } else {
      valueNode = value
    }
    return <span class="el-statistic__content-value">{valueNode}</span>
  }
}
</script>
