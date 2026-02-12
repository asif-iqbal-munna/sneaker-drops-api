import dayjs from "dayjs";
import { eventQueues } from "../../queue/eventQueue";

export const scheduleDrop = async (scheduledAt: Date, dropId: string | number) => {
  try {
    const delay = dayjs(scheduledAt).diff(dayjs());
console.log({delay,scheduledAt})
    if (delay > 0) {
      await eventQueues.add(
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

      console.log("added drop to the que")
    }
  } catch (error) {
    console.log({error})
    throw new Error("Not able to scheduled the drop")
  }
}