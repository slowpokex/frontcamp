import FluxEmitter from './emitter';
import reducers from './reducers';

const INIT_STATE = {
    q: '',
    sources: [],
    category: []
};

export const Events = {
    GET_STATE: 'GET_STATE',
    CHANGE_STATE: 'CHANGE_STATE',
    DISPATCH_STATE: 'DISPATCH_STATE',
    CHANGE_REDUCERS: 'CHANGE_REDUCERS',
    ADD_REDUCER: 'ADD_REDUCER',
    DELETE_REDUCER: 'DELETE_REDUCER'
};

//Flux pattern implementation
function FluxContainer(state, reducers, emitter) {
    const self = this;
    const _checkHandler = (handler) => {
        if (typeof (handler) !== 'function') {
            throw new TypeError('Handler must be a function', handler);
        }
        return handler;
    }

    const _checkAndGetReducers = (reducers) => {
        if (!Array.isArray(reducers)) {
            throw new TypeError('Reducers must be an array');
        }
        return reducers.map(_checkHandler);
    }

    const _checkAndGetEmitter = (emitter) => {
        if (!(emitter instanceof FluxEmitter)) {
            throw new TypeError('Emitter must be a child of FluxEmitter class', emitter);
        }
        return emitter;
    }

    const _clone = (obj) => {
        if (!obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        Object.getOwnPropertyNames(obj).forEach((attr) => {
            obj.hasOwnProperty(attr) && (copy[attr] = obj[attr]);
        })
        return copy;
    }

    const _deepFreeze = function(obj) {
        let freezeObj = _clone(obj);
        Object.freeze(freezeObj);
        Object.getOwnPropertyNames(freezeObj)
            .forEach(function (prop) {
                if (freezeObj.hasOwnProperty(prop) && freezeObj[prop] !== null && (typeof freezeObj[prop] === "object" || typeof freezeObj[prop] === "function") && !Object.isFrozen(freezeObj[prop])) {
                    _deepFreeze(freezeObj[prop]);
                }
            });
        return freezeObj;
    }

    const _callEvent = (event, ...params) => {
        emitter && self.emitter.emit(event, ...params);
    }

    // Public methods
    this.getState = (state) => {
        _callEvent(Events.GET_STATE, __state);
        return _deepFreeze(__state)
    }

    this.setState = (state) => {
        self.prevStates.push(__state);
        __state = _clone(state);
        _callEvent(Events.CHANGE_STATE, self.prevStates[self.prevStates.length - 1], __state);
    }

    this.dispatch = (actionEntity) => {
        self.reducers.forEach((reducer) => {
            __state = _clone(reducer(__state, actionEntity));
        });
        _callEvent(Events.DISPATCH_STATE);
    }

    this.changeReducers = (reducers) => {
        const prevReducers = self.reducers;
        self.reducers = _checkAndGetReducers(reducers);
        _callEvent(Events.CHANGE_REDUCERS, prevReducers, self.reducers);
    }

    this.addReducer = (reducer) => {
        self.reducers.push(_checkHandler(reducer));
        _callEvent(Events.ADD_REDUCER, reducer);
    }
    
    this.deleteReducer = (reducer) => {
        reducer = _checkHandler(reducer);
        self.reducers.filter((item) => item !== reducer);
        _callEvent(Events.DELETE_REDUCER, reducer);
    }

    let __state = _clone(state);
    this.prevStates = [];
    this.reducers = _checkAndGetReducers(reducers);
    this.emitter = emitter ? _checkAndGetEmitter(emitter) : new FluxEmitter();
}

// Builder pattern implementation
export class FluxContainerBuilder {
    constructor(...params) {
        params.forEach(param => this[param] = param);
    }

    setEmitter(emitter = new FluxEmitter()) {
        return this.emitter = emitter;
    }

    setReducers(reducers = []) {
        return this.reducers = reducers;
    }

    setInitState(state = {}) {
        return this.state = state;
    }

    getContainer() {
        return new FluxContainer(this.state, this.reducers, this.emitter);
    }
}

// Singletone pattern implementation
const singleton = Symbol();
const singletonEnforcer = Symbol();

export default class FluxInstance {
  static fluxContainer;
  constructor(enforcer) {
    if(enforcer != singletonEnforcer) throw "Cannot construct singleton";
    if (!FluxInstance.fluxContainer) {
        const fluxBuilder = new FluxContainerBuilder();
        fluxBuilder.setInitState(INIT_STATE);
        fluxBuilder.setReducers(Object.values(reducers));
        FluxInstance.fluxContainer = fluxBuilder.getContainer();
    }
  }

  static getInstance() {
    if(!this[singleton]) {
      this[singleton] = new FluxInstance(singletonEnforcer);
    }
    return this[singleton];
  }

  getContainer() {
    return FluxInstance.fluxContainer;
  }
}
