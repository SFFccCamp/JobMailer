import { FETCH_USER, ADD_APPLICATION } from '../actions/actions';


const initialState = {
    username: "",
    _id: "", 
    applications: [],
    isLoggedIn: false
};


const userReducer = ( state = initialState, action ) => {

    switch( action.type ) {
        case FETCH_USER: 
            return {
                ...state,
                ...action.payload
            }

        case ADD_APPLICATION:
            const newApps = [ ...state.applications ];
            newApps.push( action.payload );
            return {
                ...state,
                ...{ applications: newApps }
            }
            
        default: 
            return state;
    }
}


export default userReducer