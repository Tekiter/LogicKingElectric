import { createApp } from "./app";

const PORT = 5000;

async function bootstrap() {
    const app = await createApp();
    app.listen(PORT, () => console.log("Server started: http://localhost:" + PORT));
}
bootstrap();
