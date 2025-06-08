import type { CreateUserDTO } from '../types/CreateUserDTO';
import type { LoginUserDTO } from '../types/LoginUserDTO';
import { API_URL } from '@/core/utils/API_URL';
const api = "https://lolhubmexico.onrender.com";


export const registerUser = async (user: CreateUserDTO) => {
  const response = await fetch(`${API_URL}/api/Users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message);
  }

  return response.json();
};


export const loginUser = async (credentials: LoginUserDTO) => {
    const response = await fetch(`${API_URL}/api/Users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
  
    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || 'Error al iniciar sesión');
    }
  
    return response.json();
  };