import mongoose from 'mongoose';
import app from './app';
import { configData } from './configuration/dotenv.config';
import { Server } from 'http';

let server: Server | null = null;

async function main() {
  try {
    // mongoose.set('debug', true);
    await mongoose.connect(configData.db_url as string);
    console.log('Database is connected successfully.');

    server = app.listen(configData.port, () => {
      console.log(`Application listening on port ${configData.port}`);
    });
  } catch (error) {
    console.log('Failed to connect the database.', error);
    process.exit(1);
  }
}

function stopServer() {
  console.log('stopServer is called.');
  if (server && server.listening) {
    console.log('Closing the server...');
    server.close(error => {
      if (error) {
        console.error('Error while closing the server:', error);
      } else {
        console.log('Server closed.');
      }
      process.exit(0);
    });
  } else {
    console.log('Server is not running.');
    process.exit(0);
  }
}

// Handle unhandled promise rejection
process.on('unhandledRejection', error => {
  console.error('Unhandled rejection:', error);
  stopServer();
});

// Handle uncaught exception
process.on('uncaughtException', error => {
  console.error('Uncaught exception:', error);
  stopServer();
});

// Handle SIGTERM
process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Closing the server gracefully.');
  stopServer();
});

main();
