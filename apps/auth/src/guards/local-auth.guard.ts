import { AuthGuard } from "@nestjs/passport";

export class LocalAuthGaurd extends AuthGuard('local') { }