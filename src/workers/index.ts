import { PgBoss } from "pg-boss";
import { bookingJobNames } from "@/modules/bookings/constants";
import { getServerEnv } from "@/lib/env";

async function startWorker() {
  const boss = new PgBoss({ connectionString: getServerEnv().DATABASE_URL });
  await boss.start();

  for (const jobName of bookingJobNames) {
    await boss.work(jobName, async (jobs) => {
      for (const job of jobs) {
        console.info(`[worker] ${jobName}`, { id: job.id, data: job.data });
      }
      // Each handler becomes a module-owned use case as the feature is implemented.
    });
  }

  console.info("[worker] App Barber Pichilemu worker ready");
}

startWorker().catch((error) => {
  console.error("[worker] failed to start", error);
  process.exit(1);
});
