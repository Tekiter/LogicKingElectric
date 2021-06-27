import { createApp } from "./app";

const PORT = 5000;

const app = createApp();
app.listen(PORT, () => console.log("Server started: http://localhost:" + PORT));
