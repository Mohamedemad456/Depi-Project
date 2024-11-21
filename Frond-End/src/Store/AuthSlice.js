import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:4000/api/user/login", {
        method: "POST",
        body: JSON.stringify({
          email: username,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log("invalid credentials");
        throw new Error("Login failed");
      }

      const userData = await response.json();

      return {
        user: { username: userData.userName, 
          email:username,
          password,
          userId: userData.userId },
        token: userData.token,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signup",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:4000/api/user/signup", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          userName: username,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log("invalid credentials");
        throw new Error("Login failed");
      }

      const userData = await response.json();

      return {
        user: {
          username: userData.userName,
          userId: userData.userId,
        },
        token: userData.token,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// authSlice.js

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    error: null,
    message: null,
    loading: false,
    isAuthenticated: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
        state.isAuthenticated = true;
        state.error = null; 
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = "Invalid Username or Password"; // Capture the error message
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(signupUser.fulfilled, (state, action) => {
        state.error = null; // Clear any previous errors
        state.loading = false;
        console.log("Succeeeeeeeeeeed");
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.error = "Try to change the User Name or Email"; // Capture the error message
        state.loading = false;

        console.log("errrrrrrrrrrrrrrr");
        console.log(state.error);
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  },
});

export default authSlice;
export const AuthActions = authSlice.actions;

// Export the action and the reducer
// export const { logout } = authSlice.actions;
// export default authSlice.reducer;
