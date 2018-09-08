import { FETCH_USER, RESET_USER, FETCH_APPLICATION, ADD_APPLICATION } from '../actions/actions';


const initialState = {
    username: "",
    _id: "", 
    applications: [],
    isLoggedIn: false
};


const userReducer = ( state = initialState, action ) => {

    switch( action.type ) {

        case RESET_USER:
            return initialState;

        case FETCH_USER: 
            return {
                ...state,
                ...action.payload
            }
        
        case FETCH_APPLICATION:
            const applications = [ ...state.applications, ...action.payload ];
            return {
                ...state,
                ...{ applications }
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