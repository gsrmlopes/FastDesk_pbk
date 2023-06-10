import api from './api';

const createSector = async (name) => {
  try {
    const body = { name };
    const response = await api.post('/sectors', body);
    const data = response.data;
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateSector = async (sectorId, updatedFields) => {
  try {
    const response = await api.patch(`/sectors/${sectorId}`, updatedFields);
    const data = response.data;
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { createSector, updateSector };
