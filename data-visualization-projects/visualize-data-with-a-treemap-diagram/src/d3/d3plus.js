import * as d3 from 'd3'
import tip from 'd3-tip'
import { textwrap } from 'd3-textwrap'
import { legendColor } from 'd3-svg-legend'

const dsplus = { ...d3, tip, legendColor, textwrap }

dsplus.selection.prototype.appendForEach = function (obj, data) {
  return this.selectAll(null).data(data).enter().append(obj)
}

dsplus.selection.prototype.forEach = function (action) {
  return this.each(function (datum, index, nodes) {
    const selection = dsplus.select(this)
    action(selection, datum, index, nodes)
  })
}

dsplus.selection.prototype.attrs = function (attrs) {
  if (typeof attrs === 'function') {
    this.forEach((node, datum, index, nodes) =>
      node.attrs(attrs(datum, index, nodes))
    )
  } else {
    for (const key in attrs) {
      this.attr(key, attrs[key])
    }
  }

  return this
}

export default dsplus
