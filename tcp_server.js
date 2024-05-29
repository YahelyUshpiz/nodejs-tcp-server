import { createServer } from 'net';

const HOST = '127.0.0.1';
const PORT = 65432;

const server = createServer((socket) => {
    console.log('Client connected:', socket.remoteAddress);

    socket.once('data', (data) => {
        const requestData = data.toString();
        console.log('Received:', requestData);

        if (requestData.startsWith('GET')) {
            const response = 'HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\nHello, world!';
            socket.write(response);
        } else {
            const response = 'HTTP/1.1 400 Bad Request\r\nContent-Type: text/plain\r\n\r\nInvalid Request';
            socket.write(response);
        }

        socket.end();
    });

    socket.on('end', () => {
        console.log('Client disconnected');
    });

    socket.on('error', (err) => {
        console.error('Socket error:', err);
    });
});

server.listen(PORT, HOST, () => {
    console.log(`Server listening on ${HOST}:${PORT}`);
});
