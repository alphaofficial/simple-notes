import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  private readonly username: string;

  private readonly password: string;

  public constructor() {
    const { HTTP_BASIC_USER: username, HTTP_BASIC_PASS: password } =
      process.env;
    this.username = username;
    this.password = password;
  }

  public canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const b64auth = (request.headers?.authorization || '').split(' ')[1] || '';
    const [username, password] = Buffer.from(b64auth, 'base64')
      .toString()
      .split(':');
    if (username !== this.username || password !== this.password) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
