export const DEFAULT_PROFILE_IMAGE = "/assets/img/team/team-details/user.png";

export type ProfileUserLike = {
  id?: string;
  username?: string;
  email?: string;
  phone?: string;
  phoneNumber?: string;
  profileImage?: string;
  profileImageUrl?: string;
  fullName?: string | null;
  bio?: string | null;
  companyName?: string | null;
  designation?: string | null;
  experienceYears?: number | null;
  userType?: string | null;
  renNumber?: string | null;
  renStatus?: string | null;
  renVerified?: boolean;
  renStatusLabel?: string;
  emailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type UserDisplayProfile = {
  name: string;
  phone: string;
  email: string;
  profileImage: string;
  whatsappDigits: string;
};

/** Display name, phone, email, and avatar from registration/profile user data. */
export function resolveUserDisplayProfile(
  user?: ProfileUserLike | null,
): UserDisplayProfile {
  const name =
    user?.fullName?.trim() || user?.username?.trim() || "";
  const phone = user?.phoneNumber?.trim() || user?.phone?.trim() || "";
  const email = user?.email?.trim() || "";
  const profileImage =
    user?.profileImage?.trim() ||
    user?.profileImageUrl?.trim() ||
    DEFAULT_PROFILE_IMAGE;

  return {
    name,
    phone,
    email,
    profileImage,
    whatsappDigits: phone.replace(/\D/g, ""),
  };
}
