import { Elysia } from "elysia";
import { getLastTodayAntrian, getCurrentAntrian, getNextAntrianList, formatNomorAntrian } from '../utils/antrian'

let app: Elysia;

export const broadcastCurrentAntrian = async () => {
  let current = await getCurrentAntrian();
  if (!current) current = await getLastTodayAntrian();

  const nextList = await getNextAntrianList(current ? current.nomor : null);

  const payload = {
    current: current
      ? {
          nomor: formatNomorAntrian(current.prefix, current.nomor),
          pasien: current.pasien.nama,
        }
      : null,
    next: nextList.map(data => ({
      nomor: formatNomorAntrian(data.prefix, data.nomor),
      pasien: data.pasien.nama,
    })),
  };

  app.server?.publish('antrian', JSON.stringify(payload));
};

export const antrianWebSocket = (mainApp: Elysia) => {
  app = mainApp;
  
  return new Elysia()
    .ws('/ws/antrian', {
      open(ws) {
        console.log('Client connected to antrian WebSocket');
        ws.subscribe('antrian');
        (async () => {
          let current = await getCurrentAntrian();
          if (!current) current = await getLastTodayAntrian();

          const nextList = await getNextAntrianList(current ? current.nomor : null);

          const payload = {
            current: current
              ? {
                  nomor: formatNomorAntrian(current.prefix, current.nomor),
                  pasien: current.pasien.nama,
                }
              : null,
            next: nextList.map(data => ({
              nomor: formatNomorAntrian(data.prefix, data.nomor),
              pasien: data.pasien.nama,
            })),
          };

          ws.send(JSON.stringify(payload));
          })();
      },
      
      message(ws, message) {
        console.log('Received message:', message);
        
        // Optional: Handle ping/pong untuk keep-alive
        if (message === 'ping') {
          ws.send('pong');
        }
      },
      
      close(ws) {
        console.log('Client disconnected from antrian WebSocket');
        ws.unsubscribe('antrian');
      },
      
      error({ error }) {
        console.error('WebSocket error:', error);
      }
    });
};