<script>
import StatisticNumber from './number'

export default {
  name: 'ElStatistic',

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
    formatter: Function,
    countup: Boolean,
    prefix: String,
    suffix: String,
    title: String,
    valueStyle: [String, Object],
    value: [String, Number]
  },

  render(h) {
    const { valueStyle, value = 0, title } = this
    let valueNode = this.$slots.default || h(StatisticNumber, { props: Object.assign({}, this.$props, { value }) })
    let prefix = this.prefix || this.$slots.prefix
    let suffix = this.suffix || this.$slots.suffix

    return (
      <div class="el-statistic">
        {title && <div class="el-statistic__title">{title}</div>}
        <div class="el-statistic__content" style={valueStyle}>
          {prefix && <span class="el-statistic__content-prefix">{prefix}</span>}
          {valueNode}
          {suffix && <span class="el-statistic__content-suffix">{suffix}</span>}
        </div>
      </div>
    )
  }
}
</script>
