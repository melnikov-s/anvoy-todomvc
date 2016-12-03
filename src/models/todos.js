let subs = [];
let id = 0;

export let state = {todos: [], visibleTodos: [], filter: '', completed: 0, remaining: 0};

function getTodo(id, todos) {
    for (var i = 0, l = todos.length; i < l; i++) {
        if (todos[i].id === id) return todos[i];
    }

    return null;
}

function notify() {
    let {completed, remaining} = state.todos.reduce(
        (s, todo) => {
            todo.completed ? s.completed.push(todo) : s.remaining.push(todo);
            return s;
        },
        {completed: [], remaining: []}
    );

    state.completed = completed.length;
    state.remaining = remaining.length;

    if (state.filter === 'completed') {
        state.visibleTodos = completed;
    } else if (state.filter === 'active') {
        state.visibleTodos = remaining;
    } else {
        state.visibleTodos = state.todos;
    }

    subs.forEach((fn) => fn(state));
}

export function subscribe(fn) {
    subs.push(fn);
}

export function load(newTodos) {
    state.todos = newTodos;
    notify();
}

export let actions = {
    newTodo(title) {
        let text = title.trim();
        if (text !== '') {
            let modelId = ++id;
            state.todos = [...state.todos, {id: modelId, title: text}];
        }

        notify();
    },

    toggleAll(completed) {
        var allCompleted = state.completed !== state.todos.length;

        state.todos = state.todos.map(
            (todo) => Object.assign({}, todo, {completed: allCompleted})
        );

        notify();
    },

    toggleComplete: function(id, completed) {
        state.todos = state.todos.map(
            (todo) => todo.id !== id ? todo : Object.assign({}, todo, {completed})
        );

        notify();
    },

    updateText: function(id, text) {
        text = text.trim();
        if (text === '') {
            this.destroy(id);
        } else {
            state.todos = state.todos.map(
                (todo) => todo.id !== id ? todo : Object.assign({}, todo, {title: text})
            );

            notify();
        }
    },

    destroy: function(id) {
        state.todos = state.todos.filter(
            (todo) => todo.id !== id
        );

        notify();
    },

    destroyCompleted: function() {
        state.todos = state.todos.filter(
            ({completed}) => !completed
        );

        notify();
    },

    changeFilter: function(newFilter) {
        state.filter = newFilter;
        notify();
    }
};
