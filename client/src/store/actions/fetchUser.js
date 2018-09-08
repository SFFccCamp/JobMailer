
const fetchUser = () => {
        return fetch( '/auth/verify', {
            credentials: 'include'
          } )
}


export default fetchUser;