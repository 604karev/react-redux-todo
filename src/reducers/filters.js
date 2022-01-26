import { CHANGE_FILTER } from "../actions/actionsType";
import { load } from "redux-localstorage-simple";

let TASKS = load({ namespace: 'todo-list' })

if (!TASKS || !TASKS.filters || !TASKS.filters.length) {
    TASKS = {
        filters: 'active',
    }
}


const filterTasks = (initialState = TASKS.filters, { type, activeFilter }) => {
    switch (type) {
        case CHANGE_FILTER:
            return activeFilter;


        default: return initialState;
    }

}
export default filterTasks