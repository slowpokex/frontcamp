function queryReducer(state, { action, payload }) {
    const q = payload;
    switch(action) {
        case 'CLEAR_QUERY' : return { ...state, q: '' };
        case 'CHANGE_QUERY' : return { ...state, q };
        default: return state;
    }
}

function sourcesReducer(state, { action, payload }) {
    switch(action) {
        case 'ADD_SOURCE' : return { 
            ...state,
            sources: [ ...state.sources, payload ]
        };
        case 'DELETE_SOURCE' : return { 
            ...state,
            sources: state.sources.filter((source) => source !== payload)
        };
        case 'CHANGE_SOURCES' : return { ...state, payload };
        default: return state;
    }
}

function categoryReducer(state, { action, payload }) {
    switch(action) {
        case 'ADD_CATEGORY' : return { 
            ...state,
            category: [ ...state.category, payload ]
        };
        case 'DELETE_CATEGORY' : return { 
            ...state,
            category: state.category.filter((cat) => cat !== payload)
        };
        case 'CHANGE_CATEGORY' : return { ...state, payload };
        default: return state;
    }
}

export default {queryReducer, sourcesReducer, categoryReducer};