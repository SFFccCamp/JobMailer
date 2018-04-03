
export const fetchData = ( url, method = 'GET', headerObj = {}, body = {} ) => {

    let headers = { 'content-type': 'application/json' };
    for( let key in headerObj ) {
        headers[key] = headerObj[key];
    }
    
    return fetch( url, {
        credentials: 'include',
        method,
        headers,
        body: JSON.stringify(body)
    } )
    .then( res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res;
    } )
    .then( res => res.json() )
}


