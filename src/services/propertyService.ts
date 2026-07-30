import apiClient from "@/config/axios";
import type {
  AdvisorAnswers,
  AdvisorContact,
} from "@/components/Advisor/advisor-utils";

export const deleteProperty = async (id: string | number) => {
  const res = await apiClient.delete(`/properties/${id}`);
  return res.data;
};

export const getPropertyById = async (id: string | number) => {
  const res = await apiClient.get(`/properties/${id}`);
  return res.data;
};

export const getPropertyFitMatches = async (
  answers: AdvisorAnswers,
  contact: AdvisorContact,
) => {
  const res = await apiClient.post("/properties/fit/matches", {
    answers,
    contact,
  });
  return res.data;
};

export const createOrLoginPropertyFitLead = async (contact: AdvisorContact) => {
  const res = await apiClient.post("/properties/fit/lead", {
    contact,
  });
  return res.data;
};

export const notifyPropertyFitView = async (payload: {
  propertyId: string | number;
  contact: AdvisorContact;
  propertyUrl?: string;
}) => {
  const res = await apiClient.post("/properties/fit/view", payload);
  return res.data;
};

export const recordPropertyView = async (payload: {
  propertyId: string | number;
  propertyUrl?: string;
}) => {
  const res = await apiClient.post(`/properties/${payload.propertyId}/view`, {
    propertyUrl: payload.propertyUrl,
  });
  return res.data;
};
