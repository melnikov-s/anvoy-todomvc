import {render, create} from 'anvoy';
import {state, actions, load, subscribe} from './models/todos';
import Todos from './components/todos';

let renderApp = () => {
    render(create(Todos, Object.assign({}, state, actions)), document.getElementById('app'));
}

renderApp();
subscribe(() => renderApp());

window.bench = function(count, noclear) {
    var models = [];
    if (!noclear) load([]);
    for (var i =0; i<count; i++) models.push({id: String(-i-1), title: `Item${i} (-)`});
    var t = performance.now();
    load(models);
    setTimeout(function() {
        console.log(performance.now() -t);
    }, 0);
}
