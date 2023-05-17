const initialState = {comments:[],error:false,commenting:false};
 
const CommentReducer = (state=initialState,action)=>{

       switch(action.type){
           case "COMMENT_START":
               return {...state, error:false, commenting:true,}
           case "COMMENT_SUCCESS":
               return {...state, comments:[action.data, ...state.comments], commenting:false, error:false}
           case "COMMENT_FAIL":
               return {...state, commenting:false, error:true}

           case "RETRIEVE_START":
                return {...state, commenting:false, error:true}
           case "RETRIEVE_SUCCESS":
                 return {...state,comments:action.data,commenting:false,error:false  }
           case "RETRIEVE_FAIL":
                return {...state,commenting:false,error:true  }
           default:
               return state
       } 

   } ; 

   
 export default CommentReducer;