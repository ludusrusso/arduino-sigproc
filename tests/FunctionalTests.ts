var Application = require('spectron').Application;
var assert = require('assert');
var path = require('path');
import { expect } from 'chai';


describe('application launch', function () {
  this.timeout(10000);

  beforeEach(function () {
    this.app = new Application({
      path: path.join(__dirname, '..', 'node_modules', '.bin', 'electron'),
      args: [
        path.join(__dirname, '..', 'main.ts')
      ],
    });
    return this.app.start();
  });

  afterEach(function () {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });

  it('shows an initial window with correct title', function () {
    return this.app.client.browserWindow.isVisible().then( () => {
      return this.app.client.getWindowCount().then(cont => expect(cont).to.equal(1));
    }).then( () => {
      return this.app.client.browserWindow.getTitle().then(text => expect(text).to.equal('Arduino SignalProc'));
    });
  });
});
