import {Component, create} from 'anvoy';
import Todo from './todo';
import Footer from './footer';

export default class Todos extends Component {
    handleKeyUp(el, e) {
        let val = el.value;
        if ((e.keyCode || e.which) == 13 && val.trim() !== '') {
            this.props.newTodo(val);
            el.value = '';
        }
    }

    handleToggleAll(el) {
        this.props.toggleAll(el.checked);
    }

    static el() {
        return  `
            <section class="todoapp">
                <header class="header">
                    <h1>todos</h1>
                    <input @newTodo class="new-todo" placeholder="What needs to be done?" autofocus>
                </header>

                <section class="main">
                    <input @checkAll class="toggle-all" type="checkbox">
                    <label for="toggle-all">Mark all as complete</label>
                    <ul class="todo-list">
                        <@todos/>
                    </ul>
                </section>

                <@footer/>
            </section>
        `;
    }

    render(props, state) {
        return {
            todos: props.visibleTodos.map(todo => create(Todo, {
                todo,
                updateText: props.updateText,
                destroy: props.destroy,
                toggleComplete: props.toggleComplete,
                key: todo.id
            })),
            footer: create(Footer, props),
            newTodo: {
                onKeyUp: this.handleKeyUp
            },
            checkAll: {
                onChange: this.handleToggleAll,
                checked: props.completed === props.todos.length,
                classNames: {
                    hidden: !props.todos.length
                }
            }
        };
    }
}
