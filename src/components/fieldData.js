import { createContext } from "react";
/*
Roy:
as the component heirarchy is fairly shallow, you should not be using createContext. It is something that comes in handy when you have deep or highly irregular component trees. In the case of this project, all the state is being done in the TodoContainer and only has to travel down from the TodoContainer to the TodoList and AddTodoForm and their sub-components.
 */
const FieldData = createContext(null);

export default FieldData;
