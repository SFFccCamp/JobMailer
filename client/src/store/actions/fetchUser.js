import { FETCH_USER } from './actions';

const fetchUser = () => {
    return ( dispatch ) => {
        fetch( '/auth/verify', {
            credentials: 'include'
          } )
          .then( res => {
            if (!res.ok) {
               throw Error();
            }
            return res;
          } )
          .then( res => res.json() )
          .then( res => {
              return dispatch( {
                  type: FETCH_USER,
                  payload: { ...res, isLoggedIn: true }
              } )
          })
          .catch( err => console.log( err ) )
    }
}


export default fetchUser;