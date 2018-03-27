import { FETCH_USER } from '../actions/actions';


const initialState = {
    username: "",
    _id: "", 
    applications: '',
    isLoggedIn: false
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