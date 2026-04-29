 import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
export const admin_login = createAsyncThunk(
    'auth/admin_login',
    async(info,{rejectWithValue, fulfillWithValue}) => {
         console.log(info)
        try {
            const {data} = await api.post('/admin-login',info,{withCredentials: true})
             console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
             console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)


export const seller_login = createAsyncThunk(
    'auth/seller_login',
    async(info,{rejectWithValue, fulfillWithValue}) => {
         console.log(info)
        try {
            const {data} = await api.post('/seller-login',info,{withCredentials: true})
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(
                error.response?.data || {error:"server not responding"}
            )
        }
    }
)

export const get_user_info = createAsyncThunk(
    'auth/get_user_info',
    async(_ ,{rejectWithValue, fulfillWithValue}) => {
          
        try {
            const {data} = await api.get('/get-user',{withCredentials: true})
             console.log(data)            
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)


export const profile_image_upload = createAsyncThunk(
    'auth/profile_image_upload',
    async(image ,{rejectWithValue, fulfillWithValue}) => {
          
        try {
            const {data} = await api.post('/profile-image-upload',image,{withCredentials: true})
            console.log(data)            
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

export const seller_register = createAsyncThunk(
    'auth/seller_register',
    async(info,{rejectWithValue, fulfillWithValue}) => { 
        try {
            console.log(info)
            const {data} = await api.post('/seller-register',info,{withCredentials: true})
            //  console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

// end method 

export const profile_info_add = createAsyncThunk(
    'auth/profile_info_add',
    async(info,{rejectWithValue, fulfillWithValue}) => { 
        try { 
            const {data} = await api.post('/profile-info-add',info,{withCredentials: true}) 
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)
// end method 
/*const returnUserInfo = () => {
  const path = window.location.pathname;
  let token = "";

  if (path.startsWith("/admin")) {
    token = localStorage.getItem("adminToken");
  } else {
    token = localStorage.getItem("sellerToken");
  }

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const expireTime = new Date(decoded.exp * 1000);
      if (new Date() > expireTime) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("sellerToken");
        return null;
      } else {
        return decoded; // user info decoded from token
      }
    } catch (error) {
      return null;
    }
  }
  return null;
};

const returnRole = () => {
  const sellerToken = localStorage.getItem("sellerToken");
  const adminToken = localStorage.getItem("adminToken");

  if (adminToken) return "admin";
  if (sellerToken) return "seller";

  return "";
};
*/

    // end Method 

    export const logout = createAsyncThunk(
        'auth/logout',
        async({navigate,role},{rejectWithValue, fulfillWithValue}) => {
             
            try {
                const {data} = await api.get('/logout', {withCredentials: true}) 
                
                return fulfillWithValue(data)
            } catch (error) {
                // console.log(error.response.data)
                return rejectWithValue(error.response.data)
            }
        }
    )

        // end Method 

 
export const authReducer = createSlice({
    name: 'auth',
    initialState:{
        successMessage :  '',
        errorMessage : '',
        loader: false,
        userInfo: null,
        role:''

    },
    reducers : {

        messageClear : (state,_) => {
            state.errorMessage = ""
            state.successMessage=""
        }

    },
    extraReducers: (builder) => {
        builder
        .addCase(admin_login.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(admin_login.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error
        }) 
        .addCase(admin_login.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.successMessage = payload.message
            
            state.userInfo = payload.userInfo;
            state.role=payload.userInfo.role
        })

        .addCase(seller_login.pending, (state, { payload }) => {
            state.loader = true;
        }) 
        .addCase(seller_login.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload?.error || payload?.message || "Login failed";
        }) 
        .addCase(seller_login.fulfilled, (state, { payload }) => {
           state.loader = false;
            state.successMessage = payload.message
            state.role = payload.userInfo.role
            state.userInfo=payload.userInfo
        })

        .addCase(seller_register.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(seller_register.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error
        }) 
        .addCase(seller_register.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.successMessage = payload.message

        })
        .addCase(get_user_info.pending, (state) => {
  state.loader = true;
})
        .addCase(get_user_info.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.userInfo = payload.userInfo;
            state.role=payload.userInfo.role
        })
         .addCase(get_user_info.rejected, (state) => {
  state.userInfo = null;
  state.role = '';
})
        .addCase(profile_image_upload.pending, (state, { payload }) => {
            state.loader = true; 
        })
        .addCase(profile_image_upload.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.userInfo = payload.userInfo
            console.log("userInfo",payload.userInfo)
            state.successMessage = payload.message
        })

        .addCase(profile_info_add.pending, (state, { payload }) => {
            state.loader = true; 
        })
        .addCase(profile_info_add.fulfilled, (state, { payload }) => {
            state.loader = false;
          state.userInfo = {
  ...state.userInfo,
  ...payload.userInfo
}
            state.successMessage = payload.message
        })
              .addCase(logout.fulfilled, (state) => {
                  state.userInfo = null;
                  state.role = '';
        state.successMessage = "Logged out successfully";
      });

    }

})
export const {messageClear} = authReducer.actions
export default authReducer.reducer