"use server"

import { endOfDay, startOfDay } from "date-fns"
import { db } from "../_lib/prisma"

interface GetBookingsProps {
  serviceId: string
  date: Date
}
export const getBookings = ({ date }: GetBookingsProps) => {
  return db.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date), // lte significa less than or equal, ou seja, menor ou igual a data que foi di
        gte: startOfDay(date), // gte significa greater than or equal, ou seja, maior ou igual a data que foi di
      },
    },
  })
}
