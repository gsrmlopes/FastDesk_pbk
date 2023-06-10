import { api } from "./api";

export const createTicketStatus = async (name) => {
  const body = {
    name,
  };
  try {
    const res = await api.post("/ticketStatuses", body);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const updateTicketStatus = async (ticketStatusId, name) => {
  const body = { name };
  try {
    const res = await api.patch(`/ticketStatuses/${ticketStatusId}`, body);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const findTicketStatuses = async (name) => {
    try {
      const res = await api.get("/ticketStatuses", { params: { criteria: { name } } });
      const ticketStatuses = res.data;
      const ticketStatusIds = ticketStatuses.map((status) => status._id);
      return ticketStatusIds;
    } catch (err) {
      console.error(err);
    }
  };
  

export const getTicketStatusById = async (ticketStatusId) => {
  try {
    const res = await api.get(`/ticketStatuses/${ticketStatusId}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export default {
  createTicketStatus,
  updateTicketStatus,
  findTicketStatuses,
  getTicketStatusById,
};
