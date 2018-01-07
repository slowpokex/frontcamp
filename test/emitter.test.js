import 'babel-polyfill';
import assert from 'assert';
import FluxEmitter from '../src/app/services/emitter';

describe('FluxEmitter', function() {
  const EVENT = 'EVENT';
  let emitter; 

  describe('handlers', () => {
    const SECOND_EVENT = 'SECOND_EVENT';

    before(() => {
      emitter = new FluxEmitter();
    });

    it('should return empty handlers', () => {      
      assert.equal(emitter.getHandlers(EVENT).length, 0);
    });

    it('should return some handlers', () => {
      emitter.on(EVENT, () => {});
      emitter.on(EVENT, () => {});
      assert.equal(emitter.getHandlers(EVENT).length, 2);
    });

    it('should return some various handlers', () => {
      emitter.on(SECOND_EVENT, () => {});
      assert.equal(emitter.getHandlers(SECOND_EVENT).length, 1);
      emitter.on(SECOND_EVENT, () => {});
      assert.equal(emitter.getHandlers(EVENT).length, 2);
      assert.equal(emitter.getHandlers(SECOND_EVENT).length, 2);
    });

    it('should return some handlers after removing', () => {
      const HANDLER = () => 123;

      emitter.on(EVENT, HANDLER);
      assert.equal(emitter.getHandlers(EVENT).length, 3);
      emitter.on(SECOND_EVENT, HANDLER);
      assert.equal(emitter.getHandlers(SECOND_EVENT).length, 3);

      emitter.removeListener(EVENT, HANDLER);
      assert.equal(emitter.getHandlers(EVENT).length, 2);
      emitter.removeListener(SECOND_EVENT, HANDLER);
      assert.equal(emitter.getHandlers(SECOND_EVENT).length, 2);
    });

    it('should return nothing after all removing', () => {
      emitter.removeListeners(EVENT);
      emitter.removeListeners(SECOND_EVENT);
      assert.equal(emitter.getHandlers(EVENT).length, 0);
      assert.equal(emitter.getHandlers(SECOND_EVENT).length, 0);
    });
  });

  describe('behavior', function() {
    this.timeout(2000);
    before(() => {
      emitter = new FluxEmitter();
    });

    it('call one event with params', function(done) {
      const HANDLER = (a, b ,c, d, e, f, g) => {
        assert.equal(a, 123);
        assert.equal(b, 456);
        assert.equal(c, 789);
        assert.equal(d, 'John');
        assert.equal(e, 'Doe');
        assert.equal(f, 'foo');
        assert.equal(g, 'bar');
        done();
      }
      emitter.on(EVENT, HANDLER);
      emitter.emit(EVENT, 123, 456, 789, 'John', 'Doe', 'foo', 'bar');
    });
  });
});
