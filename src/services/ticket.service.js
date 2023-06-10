import { sapi } from "./api";

export const createTicket = async (title, description, priority, createdBy, status, assignedTo, sector) => {
  const body = {
    title,
    description,
    priority,
    createdBy,
    status,
    assignedTo,
    sector
  };
  try {
    const response = await sapi.post('/tickets', body);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const updateTicket = async (ticketId, title, description) => {
  const body = { title, description };
  try {
    const res = await sapi
      .patch(`/tickets/${ticketId}`, body);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const addCommentToTicket = async (ticketId, content, image, createdBy) => {
  const body = { content, image, createdBy };
  try {
    const res = await sapi
      .post(`/tickets/${ticketId}/comments`, body);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const updateComment = async (ticketId, commentId, content) => {
  const body = { content };
  try {
    const res = await sapi
      .patch(`/tickets/${ticketId}/comments/${commentId}`, body);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const passTicketToUser = async (ticketId, userId) => {
  const body = { userId };
  try {
    const res = await sapi
      .post(`/tickets/${ticketId}/pass`, body);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const findTickets = async (criteria) => {
  try {
    const res = await sapi
      .get("/tickets", { params: { criteria } });
    return res.data;
  } catch (err) {
    console.error(err);
  }
};




export default {
  createTicket,
  updateTicket,
  addCommentToTicket,
  updateComment,
  passTicketToUser,
  findTickets,
};
