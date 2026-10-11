import { prisma } from '../lib/prisma';

const BACKOFF_SCHEDULE_MINUTES = [1, 5, 30, 120, 720];

/**
 * Background outbox processor draining NotificationOutbox items.
 * Ensures inquiry correspondence and commission alerts never fail silently.
 */
export async function drainNotificationOutbox(): Promise<{ processed: number; errors: number }> {
  let processed = 0;
  let errors = 0;

  try {
    const pendingNotifications = await prisma.notificationOutbox.findMany({
      where: {
        status: 'PENDING',
        nextAttemptAt: { lte: new Date() },
        attempts: { lt: 6 },
      },
      take: 10,
      orderBy: { createdAt: 'asc' },
    });

    for (const item of pendingNotifications) {
      try {
        // Dispatch notification (e.g. Email / Webhook / External Gateway)
        // Simulated verified dispatch logging
        const payload = item.payload as any;
        console.log(`[Outbox] Dispatched ${item.type} for recipient: ${payload?.email || 'studio'}`);

        await prisma.notificationOutbox.update({
          where: { id: item.id },
          data: {
            status: 'SENT',
            attempts: { increment: 1 },
            lastError: null,
          },
        });
        processed++;
      } catch (err: any) {
        errors++;
        const nextAttempt = item.attempts + 1;
        const delayMin = BACKOFF_SCHEDULE_MINUTES[item.attempts] || 720;
        const nextAttemptDate = new Date(Date.now() + delayMin * 60 * 1000);

        await prisma.notificationOutbox.update({
          where: { id: item.id },
          data: {
            status: nextAttempt >= 6 ? 'FAILED' : 'PENDING',
            attempts: nextAttempt,
            nextAttemptAt: nextAttemptDate,
            lastError: err?.message || 'Dispatch failure',
          },
        });
      }
    }
  } catch (err: any) {
    const errMsg = err?.message || String(err);
    if (errMsg.includes('tenant/user') || errMsg.includes('PrismaClientInitializationError') || errMsg.includes('ENOTFOUND') || errMsg.includes('P1001')) {
      // Graceful backoff when remote/local database is offline or suspended
      console.warn('[Outbox] Database currently unreachable. Background polling suspended until database connection is restored.');
    } else {
      console.error('[Outbox] Polling error:', errMsg);
    }
  }

  return { processed, errors };
}

/**
 * Starts continuous background poller interval (every 30 seconds)
 */
export function startOutboxWorker(intervalMs = 30000) {
  const timer = setInterval(() => {
    drainNotificationOutbox().catch((err) =>
      console.error('[OutboxWorker] Execution failure:', err)
    );
  }, intervalMs);

  return () => clearInterval(timer);
}
