import apiClient from "@/config/axios";
import { toApiPropertyType } from "@/config/landOptions";
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

export const getLandListings = async (params?: {
  q?: string;
  city?: string;
  propertyType?: string;
  listingType?: string;
  minPrice?: string | number;
  maxPrice?: string | number;
}) => {
  const hasSearch = Boolean(params?.q || params?.city || params?.propertyType);
  const query = new URLSearchParams();

  const propertyType = toApiPropertyType(params?.propertyType);

  if (params?.q) query.set("q", params.q);
  if (propertyType) query.set("propertyType", propertyType);

  if (hasSearch) {
    if (params?.city) query.set("city", params.city);
    if (params?.listingType) query.set("type", params.listingType);
  } else {
    if (params?.city) query.set("cityName", params.city);
    if (params?.listingType) query.set("listingType", params.listingType);
  }

  if (params?.minPrice !== undefined) query.set("minPrice", String(params.minPrice));
  if (params?.maxPrice !== undefined) query.set("maxPrice", String(params.maxPrice));

  const endpoint = hasSearch
    ? `/properties/search?${query.toString()}`
    : `/properties?${query.toString()}`;
  const res = await apiClient.get(endpoint);
  return res.data;
};

export const getLandListingDetails = async (id: string | number) => {
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
  visitorKey?: string;
}) => {
  const res = await apiClient.post(`/properties/${payload.propertyId}/view`, {
    propertyUrl: payload.propertyUrl,
    visitorKey: payload.visitorKey,
  });
  return res.data;
};

export const saveProperty = async (propertyId: string | number, propertyUrl?: string) => {
  const res = await apiClient.post(`/properties/${propertyId}/favourite`, { propertyUrl });
  return res.data;
};

export const removeSavedProperty = async (propertyId: string | number) => {
  const res = await apiClient.delete(`/properties/${propertyId}/favourite`);
  return res.data;
};

export const getSavedPropertyStatus = async (propertyId: string | number) => {
  const res = await apiClient.get(`/properties/${propertyId}/favourite-status`);
  return res.data;
};

export const getSavedProperties = async () => {
  const res = await apiClient.get('/properties/favourites');
  return res.data;
};
