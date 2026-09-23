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

function isUsableImageSrc(value?: string | null): boolean {
  const src = value?.trim() ?? "";
  if (!src) return false;
  const lower = src.toLowerCase();
  return !["null", "undefined", "none", "n/a"].includes(lower);
}

export function resolveProfileImageSrc(
  ...candidates: Array<string | null | undefined>
): string {
  for (const candidate of candidates) {
    if (isUsableImageSrc(candidate)) return String(candidate).trim();
  }
  return DEFAULT_PROFILE_IMAGE;
}

/** Display name, phone, email, and avatar from registration/profile user data. */
export function resolveUserDisplayProfile(
  user?: ProfileUserLike | null,
): UserDisplayProfile {
  const name =
    user?.fullName?.trim() || user?.username?.trim() || "";
  const phone = user?.phoneNumber?.trim() || user?.phone?.trim() || "";
  const email = user?.email?.trim() || "";
  const profileImage = resolveProfileImageSrc(
    user?.profileImage,
    user?.profileImageUrl,
  );

  return {
    name,
    phone,
    email,
    profileImage,
    whatsappDigits: phone.replace(/\D/g, ""),
  };
}
