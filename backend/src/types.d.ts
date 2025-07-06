// src/types.d.ts or types.d.ts
import { User } from './auth/user.entity'; // ✅ Adjust path to your actual User entity

declare module 'express' {
  interface Request {
    user?: User; // Now TypeScript knows req.user has all properties of User
  }
}
