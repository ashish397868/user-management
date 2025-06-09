import { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      const token = action.payload.token.startsWith('Bearer ')
        ? action.payload.token
        : `Bearer ${action.payload.token}`;
      localStorage.setItem('token', token);
      return {
        ...state,
        token,
        user: action.payload.user,
        isAuthenticated: true,
        loading: false,
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    case 'SET_LOADING':
      return { ...state, loading: true };
    case 'CLEAR_LOADING':
      return { ...state, loading: false };
    case 'AUTH_ERROR':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const initialState = {
    token: localStorage.getItem('token'),
    user: null,
    isAuthenticated: false,
    loading: true,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          dispatch({ type: 'CLEAR_LOADING' });
          return;
        }

        const response = await axios.get('http://localhost:5000/api/me', {
          headers: { Authorization: token }
        });

        if (response.data && response.data.user) {
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { token, user: response.data.user }
          });
        }
      } catch (error) {
        console.error('Error loading user:', error);
        dispatch({ type: 'AUTH_ERROR' });
      }
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      dispatch({ type: 'SET_LOADING' });
      
      const response = await axios.post('http://localhost:5000/login', 
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      if (response.data && response.data.token) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { 
            token: response.data.token, 
            user: response.data.user 
          }
        });
        return { success: true };
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.response?.data?.error || 'An error occurred during login' 
      };
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:5000/logout', {}, {
        headers: { Authorization: state.token },
        withCredentials: true
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      dispatch({ type: 'LOGOUT' });
    }
  };

  return (
    <AuthContext.Provider value={{
      token: state.token,
      user: state.user,
      isAuthenticated: state.isAuthenticated,
      loading: state.loading,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};