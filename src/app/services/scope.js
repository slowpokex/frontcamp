class Container {

    static deepFreeze(obj) {
        Object.freeze(obj);
        for (const value of Object.keys(obj)) {
            
        }
    }

    constructor(state) {
        this.state = state;
    }
}

export default {
    q: '',
    sources: [],
    category: []
}