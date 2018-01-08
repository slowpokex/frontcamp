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
    CHANGE_REDUCERS: 'CHANGE_REDUCERS',
    ADD_REDUCER: 'ADD_REDUCER',
    DELETE_REDUCER: 'DELETE_REDUCER'
};

// Flux pattern implementation
export class FluxContainer {
    static _checkHandler = (handler) => {
        if (typeof (handler) !== 'function') {
            throw new TypeError('Handler must be a function', handler);
        }
        return handler;
    }

    static _checkAndGetReducers(reducers) {
        if (!Array.isArray(reducers)) {
            throw new TypeError('Reducers must be an array');
        }
        return reducers.forEach(FluxContainer._checkHandler);
    }

    static _checkAndGetEmitter(emitter) {
        if (!(emitter instanceof FluxEmitter)) {
            throw new TypeError('Emitter must be a child of FluxEmitter class', emitter);
        }
        return emitter;
    }

    static _deepFreeze(obj) {
        const freezeeObj = Object.assign({}, obj);
        Object.freeze(freezeObj);
        Object.getOwnPropertyNames(freezeeObj)
            .forEach(function (prop) {
                if (freezeeObj.hasOwnProperty(prop) && freezeeObj[prop] !== null && (typeof freezeeObj[prop] === "object" || typeof freezeeObj[prop] === "function") && !Object.isFrozen(freezeeObj[prop])) {
                    deepFreeze(freezeeObj[prop]);
                }
            });
        return freezeeObj;
    }

    constructor(state, reducers, emitter) {
        this.prevStates = [];
        this.state = state;
        this.reducers = FluxContainer._checkAndGetReducers(reducers);
        this.emitter = emitter ? FluxContainer._checkAndGetEmitter(emitter) : new FluxEmitter();
    }

    get state() {
        return FluxContainer._deepFreeze(this.state)
    }

    set state(state) {
        if (!this.state) {
            this.state = state;
        }
    }

    _callEvent(event, ...params) {
        emitter && this.emitter.emit(event, ...params);
    }

    getState() {
        this._callEvent(Events.GET_STATE, this.state);
        return this.state;
    }

    setState(state) {
        this.prevStates.push(this.state);
        this.state = state;
        this._callEvent(Events.CHANGE_STATE, this.prevStates[this.prevStates.length - 1], this.state);
    }

    dispatch(action, payload) {
        
    }

    changeReducers(reducers) {
        const prevReducers = this.reducers;
        this.reducers = FluxContainer._checkAndGetReducers(reducers);
        this._callEvent(Events.CHANGE_REDUCERS, prevReducers, this.reducers);
    }

    addReducer(reducer) {
        this.reducers.push(FluxContainer._checkHandler(reducer));
        this._callEvent(Events.ADD_REDUCER, reducer);
    }

    deleteReducer(reducer) {
        reducer = FluxContainer._checkHandler(reducer);
        this.reducers.filter((item) => item !== reducer);
        this._callEvent(Events.DELETE_REDUCER, reducer);
    }
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

const fluxBuilder = new FluxContainerBuilder();
fluxBuilder.setInitState(INIT_STATE);
fluxBuilder.setReducers(Object.values(reducers));

// Singletone pattern implementation
const singleton = Symbol();
const singletonEnforcer = Symbol();

export default class FluxSingleton {
  constructor(enforcer) {
    if(enforcer != singletonEnforcer) throw "Cannot construct singleton";
  }

  static getInstance() {
    if(!this[singleton]) {
      this[singleton] = new FluxInstance(singletonEnforcer);
    }
    return this[singleton];
  }
}
