import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import taskRoutes from './routes/task.routes';
import { errorHandler } from './middlewares/error-handler';
import type { ErrorRequestHandler } from 'express';

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});


app.use(cors());
app.use(express.json());

app.use('/tasks', taskRoutes);
app.get('/', (_, res) => {
  res.send('API is running 🚀');
});
app.use(errorHandler as ErrorRequestHandler);


io.on('connection', (socket) => {
  console.log(`🔌 Client connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3333;
server.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});

export { io };
