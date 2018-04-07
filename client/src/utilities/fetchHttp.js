import { Observable } from 'rxjs';


export const fetchData = ( url, method = 'GET', headerObj = {}, body = {} ) => {

    let headers = { 'content-type': 'application/json' };
    for( let key in headerObj ) {
        headers[key] = headerObj[key];
    }
    let options = method === 'GET'
                        ? { credentials: 'include', method, headers }
                        : { credentials: 'include', method, headers, body: JSON.stringify(body) }


    return new Observable( obs => {
        fetch( url, options )
            .then( res => {
                if (!res.ok) {
                    obs.error(res.statusText)
                }
                return res;
            } )
            .then( res => res.json() )
    } );
    
}


