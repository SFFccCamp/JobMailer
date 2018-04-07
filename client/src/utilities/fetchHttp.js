import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { catchError } from 'rxjs/operators';


export const fetchData = ( url, method = 'GET', headerObj = {}, body = {} ) => {

    let headers = { 'content-type': 'application/json' };
    for( let key in headerObj ) {
        headers[key] = headerObj[key];
    }
    let options = method === 'GET'
                        ? { credentials: 'include', method, headers }
                        : { credentials: 'include', method, headers, body: JSON.stringify(body) }

    
    let response = fetch( url, options )
            .then( res => {
                if (!res.ok) {
                  _throw(res.statusText)
                }
                return res;
            } )
            .then( res => res.json() )

    return Observable.fromPromise( response );
    
}


