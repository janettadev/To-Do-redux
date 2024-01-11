const initialState = {
   // todo: [],
   list: null,
   oneTodo: null,
};

export const Reducer = (state = initialState, action: any) => {
   switch (action.type) {
      // case "ADD_TODO":
      //    return { ...state, todo: action.payload };
         case "GET_TODO":
         return { ...state, list: action.payload };
         case "ONE_TODO":
         return { ...state, oneTodo: action.payload };
      default:
         return state;
   }
};
