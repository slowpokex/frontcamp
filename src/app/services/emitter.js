export default class FluxEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, func) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        if (typeof (func) !== 'function') {
            throw new TypeError('Handler must be a function');
        }
        this.events.get(event).push(func);
    }

    emit(event, ...params) {
        this.getHandlers(event)
            .forEach((e) => { e(...params); })
    }

    getHandlers(event) {
        return this.events.get(event);
    }
}
