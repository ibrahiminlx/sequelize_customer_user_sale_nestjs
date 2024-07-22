import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";
import * as cors from "cors";
import * as dotenv from "dotenv";
// import { connectToDatabase } from "db/connection";
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // await connectToDatabase();
  app.use(helmet());
  app.use(cors());
  app.enableCors();
  app.setGlobalPrefix("api");
  const config = new DocumentBuilder()
    .setTitle("Backend Project")
    .setDescription("Backend Project api Documantation")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(process.env.PORT);
  console.log(`Backend Project port => ${process.env.PORT}`);
}
bootstrap();
