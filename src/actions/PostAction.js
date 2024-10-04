import * as PostApi from "../api/PostRequest.js"
export const getTimeLinePosts = (id)=>async(dispatch)=>{
    dispatch({type:"FETCHING_START"})
    try {
        const {data} = await PostApi.getTimeLinePosts(id)
        dispatch({type:"FETCHING_SUCCESS",data:data})
    } catch (error) {
        dispatch({type:"FETCHING_FAIL"})
        console.log(error);
    }
}