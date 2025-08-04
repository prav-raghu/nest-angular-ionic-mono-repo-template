import { IsString, IsIn } from 'class-validator';

export class SocialLoginDto {
  @IsString()
  providerId!: string;

  @IsString()
  @IsIn(['google', 'facebook', 'microsoft'])
  provider!: 'google' | 'facebook' | 'microsoft';

  @IsString()
  email!: string;

  @IsString()
  fullName!: string;
}
