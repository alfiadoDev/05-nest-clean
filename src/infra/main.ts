import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EnvService } from './env/env.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const envServive = app.get(EnvService)
  const port = envServive.get('PORT')

  await app.listen(port)
}
bootstrap()
