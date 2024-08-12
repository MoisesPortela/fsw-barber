import { getServerSession } from "next-auth"
import Header from "../_components/header"
import { authOptions } from "../_lib/auth"
import { db } from "../_lib/prisma"
import { notFound } from "next/navigation"
import BookingItem from "../_components/booking-item"

const Bookings = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    //TODO: mostrar o pop-up de login
    return notFound()
  }
  const confirmedsbookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        gte: new Date(),
      },
    },
    include: {
      service: { include: { barbershop: true } },
    },
    orderBy: {
      date: "asc",
    },
  })
  const concludebookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        lt: new Date(),
      },
    },
    include: {
      service: { include: { barbershop: true } },
    },
    orderBy: {
      date: "asc",
    },
  })
  return (
    <>
      <Header />
      <div className="space-y-3 p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>
        <div>
          {confirmedsbookings.length > 0 && (
            <>
              <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                Confirmados
              </h2>
              {confirmedsbookings.map((booking) => (
                <BookingItem booking={booking} key={booking.id}></BookingItem>
              ))}
            </>
          )}
          {concludebookings.length > 0 && (
            <>
              <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                Finalizados
              </h2>
              {concludebookings.map((booking) => (
                <BookingItem booking={booking} key={booking.id}></BookingItem>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Bookings
