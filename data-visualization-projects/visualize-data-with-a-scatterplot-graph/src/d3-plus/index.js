import * as _d3 from 'd3';
import tip from 'd3-tip';
import { legendColor } from 'd3-svg-legend';

const d3 = { ..._d3, tip, legendColor };

d3.selection.prototype.appendForEach = function (obj, data) { 
    return this.selectAll(null).data(data).enter().append(obj);
};

export default d3;
