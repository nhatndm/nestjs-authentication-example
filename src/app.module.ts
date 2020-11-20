import { Module } from '@nestjs/common';

// MODULE
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    SharedModule,
    UserModule,
  ],
})
export class AppModule {}
