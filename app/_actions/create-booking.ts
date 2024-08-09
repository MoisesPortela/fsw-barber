"use server"

import { db } from "../_lib/prisma"

interface CreateBookinParams {
  userId: string
  serviceId: string
  date: Date
}

export const createBooking = async (params: CreateBookinParams) => {
  await db.booking.create({
    data: params,
  })
}
