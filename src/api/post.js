import get_api_root from "./url.js";

function post_resource(resource){
    let back_end_uri = get_api_root() + "/form/answer";
    let post_promise = fetch(back_end_uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(resource)
    });
    return post_promise;
}

export default post_resource;