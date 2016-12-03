import {Component} from 'anvoy';

export default class Todo extends Component {
    getInitialState() {
        return {
            editing: false
        };
    }

    handleToggle(el) {
        this.props.toggleComplete(this.props.todo.id, el.checked);
    }

    handleEditEnter() {
        this.setState({editing: true, editVal: this.props.todo.title});
    }

    handleEditBlur() {
        if (this.state.editing) {
            this.setState({editing: false});
            this.props.updateText(this.props.todo.id, this.state.editVal);
        }
    }

    handleEditChange(el) {
        this.setState({editVal: el.value});
    }

    handleEditKeyUp(el, e) {
        let enterKey = e.keyCode === 13;
        let escapeKey = e.keyCode === 27;

        this.setState({editing: !enterKey && !escapeKey});

        if (enterKey) {
            this.props.updateText(this.props.todo.id, this.state.editVal);
        }
    }

    handleDelete() {
        this.props.destroy(this.props.todo.id);
    }

    static el() {
         return `
            <li>
                <div class="view">
                    <input @completed class="toggle" type="checkbox"/>
                    <label @title></label>
                    <button @delete class="destroy"></button>
                </div>
                <input @titleEdit class="edit"/>
            </li>`;
    }

    static elements() {
        return {
            titleEdit: {
                didUpdate(el, props, {editing}, prevProps, {editing: prevEditing}) {
                    if (editing && !prevEditing) {
                        el.focus();
                    }
                }
            }
        }
    }

    render(props, state) {
        return {
            root: {
                classNames: {
                    completed: props.todo.completed,
                    editing: state.editing
                }
            },
            completed: {
                checked: props.todo.completed,
                onChange: this.handleToggle
            },
            title: {
                text: props.todo.title,
                onDoubleClick: this.handleEditEnter
            },
            titleEdit: {
                value: state.editVal,
                onInput: this.handleEditChange,
                onKeyUp: this.handleEditKeyUp,
                onBlur: this.handleEditBlur
            },
            delete: {
                onClick: this.handleDelete,
                detached: props.todo.completed
            }
        };
    }
}
