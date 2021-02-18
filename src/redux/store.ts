import { createStore, applyMiddleware } from "redux"
import kanban from "./reducers"
import thunk from "redux-thunk"

const store = createStore(kanban, applyMiddleware(thunk))

export default store