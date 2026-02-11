import dayjs from "dayjs";
import { dropsQueue } from "./drops.queue";

export const scheduleDrop = async (scheduledAt: Date, dropId: string | number) => {
  try {
    const delay = dayjs(scheduledAt).diff(dayjs());
console.log({delay,scheduledAt})
    if (delay > 0) {
      await dropsQueue.add(
        "publish-drops",
        {
          dropId,
        },
        {
          delay,
          attempts: 3,
          backoff: {
            type: "exponential",
            delay: 5000,
          },
        }
      );

      console.log("added to the que")
    }
  } catch (error) {
    console.log({error})
    throw new Error("Not able to scheduled the drop")
  }
}