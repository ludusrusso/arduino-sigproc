import { SmoothieChart, TimeSeries } from 'smoothie'
import CodeMirror = require('codemirror');

var smoothie = new SmoothieChart({responsive: true});
smoothie.streamTo(document.getElementById("myChart"), 500);

let editor = CodeMirror.fromTextArea(document.getElementById('code_id'), {
  mode:  "javascript",
  lineNumbers: true,
});
editor.setValue("function(x) {\n  return x;\n}");

let ft = editor.getValue();

document.getElementById("btn_id").onclick= function() {
  ft = editor.getValue();
}
// Data
var line1 = new TimeSeries();
var line2 = new TimeSeries();
var line3 = new TimeSeries();

// Add a random value to each line every second
class Filter {
  private _filt: number;

  constructor(private _lambda: number) {
    this._filt = 0;
  }

  filter(data:number): number {
    this._filt = this._lambda*this._filt + (1-this._lambda)*data
    return this._filt;
  }
}


// Add a random value to each line every second
class Integral {
  private _filt: number;

  constructor(private _lambda: number) {
    this._filt = 0;
  }

  filter(data:number): number {
    this._filt = this._filt + (1-this._lambda)*data
    return this._filt;
  }
}


let filter = new Filter(0.9);
let integral = new Integral(0.9);

function f1(data) {
  console.log(ft);
  let filt = eval("("+ft+")");
  console.log(filt)
  return filt(data);
}

setInterval(function() {
  let time = new Date().getTime();
  let data = Math.random()-0.5;
  line1.append(time, data);
  line3.append(time, f1(data));
}, 300);

// Add to SmoothieChart
smoothie.addTimeSeries(line1, {
  strokeStyle: 'rgba(0, 124, 0, 1)',
  lineWidth: 4
});

smoothie.addTimeSeries(line3, {
  strokeStyle: 'rgba(0, 125, 125, 1)',
  lineWidth: 4
});
