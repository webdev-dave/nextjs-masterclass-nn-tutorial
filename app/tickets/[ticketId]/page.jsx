import { PageNotFoundError } from "next/dist/shared/lib/utils";
import { notFound } from "next/navigation";

export const dynamicParams = true;

//this function is called at build time to help ext js find all the possible ticket routes
export async function generateStaticParams() {
  const response = await fetch("http://localhost:4000/tickets");
  const tickets = await response.json();
  return tickets.map((ticket) => ({ id: ticket.id }));
}

async function getTicket(id) {
  const response = await fetch(`http://localhost:4000/tickets/${id}`, {
    next: {
      revalidate: 60, // use 0 to opt out of caching
    },
  });
  await new Promise((resolve) => setTimeout(resolve, 3000));

  if (!response.ok) {
    notFound();
  }
  return response.json();
}

export default async function Ticket({ params }) {
  const id = params.ticketId;
  const ticket = await getTicket(id);
  return (
    <>
      <div>
        <main>
          <nav>
            <h2>Ticket</h2>
          </nav>
          <div className="card">
            <h3>{ticket.title}</h3>
            <small>Created by: {ticket.user_email}</small>
            <p>{ticket.body}</p>
            <div className={`pill ${ticket.priority}`}>
              {ticket.priority} priority
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
