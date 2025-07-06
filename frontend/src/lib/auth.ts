import Cookies from 'js-cookie'

export const setToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token); // ✅ Save token
    console.log('✅ Token saved to localStorage:', token);
  }
};

export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};


export const removeToken = () => {
  Cookies.remove('token')
}
