import * as commentApi from "../api/CommentRequest"
//add comment

export const addComment = (data)=>async(dispatch)=>{
    dispatch({type:"COMMENT_START"})
    try {
       const newComment = await commentApi.addComment(data) 
       dispatch({type:"COMMENT_SUCCESS",data:newComment.data} )
    } catch (error) {
       console.log(error) 
       dispatch({type:"COMMENT_FAIL"})
    }
}

export const getPostComment = (id)=>async(dispatch)=>{
    dispatch({type:"RETRIEVE_START"})
    try {
        const {data} = await commentApi.getPostComment(id)
        dispatch({type:"RETRIEVE_SUCCESS",data:data})
    } catch (error) {
        dispatch({type:"RETRIEVE_FAIL"})
        console.log(error);
    }
}