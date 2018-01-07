import FluxEmitter from './emitter';

export const Events = {
    GET_STATE: 'GET_STATE',
    CHANGE_STATE: 'CHANGE_STATE',
    CHANGE_REDUCERS: 'CHANGE_REDUCERS',
    ADD_REDUCER: 'ADD_REDUCER',
    DELETE_REDUCER: 'DELETE_REDUCER',
    ADD_LISTENER: 'ADD_LISTENER',
    DELETE_LISTENER: 'DELETE_LISTENER'
};

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
        this.state = FluxContainer._deepFreeze(state);
        this.reducers = FluxContainer._checkAndGetReducers(reducers);
        this.emitter = emitter ? FluxContainer._checkAndGetEmitter(emitter) : new FluxEmitter();
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
        this.state = FluxContainer._deepFreeze(state);
        this._callEvent(Events.CHANGE_STATE, this.prevStates[this.prevStates.length - 1], this.state);
    }

    dispatch(action) {

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

export default {
    q: '',
    sources: [],
    category: []
}
