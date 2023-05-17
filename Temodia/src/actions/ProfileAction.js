import * as PostApi from "../api/ProfileRequest.js"

export const getFollowers =(id)=>async(dispatch)=>{
    dispatch({type:"FETCHING_START"})
    try {
        const {data} = await PostApi.getFollowers(id)
        dispatch({type:"FETCHING_SUCCESS",data:data})
    } catch (error) {
        console.log(error);
        dispatch({type:"FETCHING_FAIL"})
    }
}