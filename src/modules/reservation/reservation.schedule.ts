import { eventQueues } from "../../queue/eventQueue";

export const scheduleReservation = async (dropId: string | number, reservationId: number) => {
  try {
    const delay = 60 * 1000
   
    await eventQueues.add(
      "reservation-expiry",
      {
        dropId,
        reservationId
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

    console.log("added reservation to the que")
    
  } catch (error) {
    console.log({error})
    throw new Error("Not able to scheduled the reservation expiry")
  }
}