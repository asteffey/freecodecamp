import * as _d3 from 'd3';
import _d3Tip from 'd3-tip';

const d3 = {..._d3, tip: _d3Tip};

d3.selection.prototype.appendForEach = function (obj, data) { 
    return this.selectAll(null).data(data).enter().append(obj);
};

export default d3;
