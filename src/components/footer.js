import {Component} from 'anvoy';

export default class Footer extends Component {
    handleNoFilter() {
        this.props.changeFilter('');
    }

    handleFilterActive() {
        this.props.changeFilter('active');
    }

    handleFilterCompleted() {
        this.props.changeFilter('completed');
    }

    handleClearCompleted() {
        this.props.destroyCompleted();
    }

    static el() {
        return `
            <footer class="footer">
                <span class="todo-count">
                    <strong>{@remaining}</strong> {@itemText}
                </span>
                <ul class="filters">
                    <li><a @noFilter href="#/">All</a></li>
                    <li><a @activeFilter href="#/active">Active</a></li>
                    <li><a @completedFilter href="#/completed">Completed</a></li>
                </ul>
                <button @clearCompleted class="clear-completed">Clear completed {@completed}</button>
            </footer>
        `;
    }

    render(props, state) {
        return {
            root: {
                classNames: {
                    hidden: !(props.completed + props.remaining)
                }
            },
            remaining: props.remaining,
            itemText: props.remaining === 1 ? 'item' : 'items',
            activeFilter: {
                classNames: {
                    selected: props.filter === 'active'
                },
                onClick: this.handleFilterActive
            },
            completedFilter: {
                classNames: {
                    selected: props.filter === 'completed'
                },
                onClick: this.handleFilterCompleted
            },
            noFilter: {
                classNames: {
                    selected: !props.filter
                },
                onClick: this.handleNoFilter
            },
            completed: props.completed,
            clearCompleted: {
                classNames: {
                    hidden: !props.completed
                },
                onClick: this.handleClearCompleted
            }
        };
    }
}
