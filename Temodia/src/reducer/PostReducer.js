const initialState = {posts:[],loading:false,error:false,uploading:false};
 
const PostReducer = (state=initialState,action)=>{

       switch(action.type){
           case "UPLOAD_START":
               return {...state, error:false, uploading:true,}
           case "UPLOAD_SUCCESS":
               return {...state, posts:[action.data, ...state.posts], uploading:false, error:false}
           case "UPLOAD_FAIL":
               return {...state, uploading:false, error:true}

           case "FETCHING_START":
                return {...state, loading:false, error:true}
           case "FETCHING_SUCCESS":
                 return {...state,posts:action.data,uploading:false,error:false  }
           case "FETCHING_FAIL":
                return {...state,loading:false,error:true  }

        
           default:
               return state
       } 

   } ; 

   
 export default PostReducer;