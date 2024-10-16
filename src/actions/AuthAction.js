import * as AuthApi from "./../api/AuthRequest.js"

export const logIn = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.logIn(formData);
    dispatch({ type: "AUTH_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "AUTH_FAIL" });
    console.log(error);
  }
};

export const signUp = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.signUp(formData);
    dispatch({ type: "AUTH_SUCCESS", payload: data });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: "AUTH_FAIL" });
  }
};


export const logOut = ()=>async(dispatch)=>{
    dispatch({type:"LOG_OUT"})
}