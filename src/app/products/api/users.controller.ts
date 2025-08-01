import { Controller, Post, Body } from '@nestjs/common';
import { registerUser, loginUser } from './users.service';

@Controller()
export class UsersController {
  @Post('register')
  register(@Body() body: { name: string; email: string; password: string }) {
    const ok = registerUser(body.name, body.email, body.password);
    return ok ? { success: true } : { success: false, error: 'Email déjà utilisé' };
  }

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    const user = loginUser(body.email, body.password);
    if (user) {
      return { success: true, user: { id: user.id, name: user.name, email: user.email } };
    } else {
      return { success: false, error: 'Email ou mot de passe incorrect' };
    }
  }
}
