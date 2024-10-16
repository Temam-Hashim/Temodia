import { jwtDecode } from "jwt-decode";
const initialState = { authData: null, loading: false, error: false };

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, loading: true, error: false };

    case "AUTH_SUCCESS":
      const decodedToken = jwtDecode(action.payload.token);
      const expirationTime = decodedToken.exp * 1000;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      localStorage.setItem("decodedToken", JSON.stringify(decodedToken));
      localStorage.setItem("expirationTime", expirationTime.toString());

      // Immediate check for expired token
      if (expirationTime <= Date.now()) {
        localStorage.removeItem("profile");
        localStorage.removeItem("expirationTime");
        localStorage.removeItem("decodedToken");
        return {
          ...state,
          authData: null, // Clear auth data immediately on token expiration
          loading: false,
          error: false,
        };
      }

      return {
        ...state,
        authData: action.payload,
        loading: false,
        error: false,
      };

    case "AUTH_FAIL":
      return {
        ...state,
        authData: null,
        loading: false,
        error: true,
      };

    case "UPDATING_START":
      return { ...state, loading: true, error: false };

    case "UPDATING_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      return {
        ...state,
        authData: action.payload,
        loading: false,
        error: false,
      };

    case "UPDATING_FAIL":
      return { ...state, loading: false, error: true };

    case "FOLLOW_USER":
      return {
        ...state,
        authData: {
          ...state.authData,
          data: {
            ...state.authData.data,
            following: [
              ...(state.authData.data.following || []), // Safe access
              action.payload,
            ],
          },
        },
      };

    case "UNFOLLOW_USER":
      return {
        ...state,
        authData: {
          ...state.authData,
          data: {
            ...state.authData.data,
            following: (state.authData.data.following || []).filter(
              (personId) => personId !== action.payload
            ),
          },
        },
      };

    case "LOG_OUT":
      localStorage.clear();
      return { ...state, authData: null, loading: false, error: false };

    default:
      return state;
  }
};

export default AuthReducer;
