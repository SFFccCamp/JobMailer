
export const fetchData = ( url, method = 'GET', headerObj = {}, body = {} ) => {

    let headers = { 'content-type': 'application/json' };
    for( let key in headerObj ) {
        headers[key] = headerObj[key];
    }
    let options = method === 'GET'
                        ? { credentials: 'include', method, headers }
                        : { credentials: 'include', method, headers, body: JSON.stringify(body) }

    return fetch( url, options )
        .then( res => {
            if (!res.ok) {
              throw new Error(res.statusText);
            }
            return res;
        } )
        .then( res => res.json() )
}


