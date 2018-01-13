// Observer pattern implementation
export default class FluxEmitter {
    static checkFunc(func) {
        if (typeof (func) !== 'function') {
            throw new TypeError('Handler must be a function');
        }
        return func;
    }

    constructor() {
        this.events = new Map();
    }

    on(event, func) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        return this.events.get(event)
            .push(FluxEmitter.checkFunc(func));
    }

    removeListener(event, func) {
        if (!this.events.has(event)) {
            return;
        }
        const deleteFunc = FluxEmitter.checkFunc(func);        
        const handlers = this.events.get(event).filter(f => f !== deleteFunc);
        return this.events.set(event, handlers);         
    }

    removeListeners(event) {
        return this.events.has(event) && this.events.delete(event);
    }

    emit(event, ...params) {
        return this.getHandlers(event)
            .forEach((e) => { e(...params); })
    }

    getHandlers(event) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        return this.events.get(event);
    }
}
