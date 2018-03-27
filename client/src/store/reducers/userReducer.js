import { FETCH_USER } from '../actions/actions';


const initialState = {
    username: '',
    isLogedIn: false,
    applications: []
};


const userReducer = ( state = initialState, action ) => {

    switch( action.type ) {
        case FETCH_USER: 
            return {
                ...state,
                ...action.payload
            }


        default: 
            return state;
    }
}


export default userReducer