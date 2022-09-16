import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

console.log('Guard call');
@Injectable()
export class LocalGuard extends AuthGuard('local') {}
