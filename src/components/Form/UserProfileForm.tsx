"use client";
import { useState, useRef, useEffect, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileSchema } from "@/schemas/validationSchema";
import ErrorMessage from "./ErrorMassage";
import { toast } from "sonner";
import apiClient from "@/config/axios";
import UserSvg from "@/components/SVG/UserSvg";
import { BadgeAlert, BadgeCheck } from "lucide-react";

const PROFILE_IMAGE_ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const PROFILE_IMAGE_ACCEPT = PROFILE_IMAGE_ACCEPTED_TYPES.join(",");
const PROFILE_IMAGE_MAX_BYTES = 5 * 1024 * 1024;

interface ProfileFormData {
  fullName: string;
  aboutYou?: string;
  companyName?: string;
  icPassport?: string;
  designation?: string;
  experience?: number;
  renNumber?: string;
  phone: string;
  email?: string;
}

interface UserProfile {
  fullName?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  aboutYou?: string;
  about?: string;
  bio?: string;
  about_me?: string;
  companyName?: string;
  company?: string;
  company_name?: string;
  icPassport?: string;
  ic_passport?: string;
  icNumber?: string;
  passport?: string;
  designation?: string;
  title?: string;
  jobTitle?: string;
  job_title?: string;
  experience?: number;
  yearsOfExperience?: number;
  experienceYears?: number;
  profileImage?: string;
  profileImageUrl?: string;
  avatar?: string;
  avatarUrl?: string;
  imageUrl?: string;
  email?: string;
  emailAddress?: string;
  mail?: string;
  userType?: string | null;
  user_type?: string | null;
  phone?: string;
  phoneNumber?: string;
  mobile?: string;
  mobileNumber?: string;
  renNumber?: string | null;
  renStatus?: string | null;
  renVerified?: boolean;
  renStatusLabel?: string;
  status?: string | null;
  userStatus?: string | null;
}

const extractProfileImage = (value: unknown): string | null => {
  const isRecord = (v: unknown): v is Record<string, unknown> =>
    typeof v === "object" && v !== null;

  if (!isRecord(value)) return null;

  const candidates = [
    value,
    isRecord(value.data) ? value.data : null,
    isRecord(value.data) && isRecord(value.data.user) ? value.data.user : null,
    isRecord(value.data) && isRecord(value.data.data) ? value.data.data : null,
  ].filter(Boolean) as Record<string, unknown>[];

  for (const candidate of candidates) {
    const image =
      candidate.profileImage ||
      candidate.profileImageUrl ||
      candidate.avatar ||
      candidate.avatarUrl ||
      candidate.imageUrl;

    if (typeof image === "string" && image.trim()) {
      return image;
    }
  }

  return null;
};

export default function UserProfileForm() {
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState("My Profile");
  const [isOwnerProfile, setIsOwnerProfile] = useState(false);
  const [isAgentProfile, setIsAgentProfile] = useState(false);
  const [renInfo, setRenInfo] = useState<{
    number: string;
    verified: boolean;
    label: string;
    available: boolean;
  }>({
    number: "",
    verified: false,
    label: "Not verified",
    available: false,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewObjectUrlRef = useRef<string | null>(null);
  const renNumberMissing = renInfo.available && !renInfo.number;

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    reset: resetProfile,
    formState: { errors: profileErrors, isSubmitting: isProfileSubmitting },
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
  });

  const formatNum = (phone: string): string => {
    if (!phone) return "";
    const num = phone.replace(/\D/g, "");

    if (num.startsWith("60")) return `+${num}`;
    if (num.startsWith("6")) return `+${num}`;
    if (num.startsWith("0")) return `+6${num}`;
    return `+60${num}`;
  };

  // ── GET /api/users/profile — fetch and bind data on mount ──
  useEffect(() => {
    return () => {
      if (previewObjectUrlRef.current) {
        URL.revokeObjectURL(previewObjectUrlRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const isRecord = (v: unknown): v is Record<string, unknown> =>
          typeof v === "object" && v !== null;

        const extractPayload = (v: unknown): unknown => {
          if (!isRecord(v)) return v;
          const data = v["data"];
          if (!isRecord(data)) return v;
          const dataData = data["data"];
          if (isRecord(dataData)) return dataData;
          const user = data["user"];
          if (isRecord(user)) return user;
          const profile = data["profile"];
          if (isRecord(profile)) return profile;
          return data;
        };

        const res = await apiClient.get<unknown>("/users/profile");
        const raw = extractPayload(res.data) ?? {};

        const profile = raw as UserProfile;
        const normalizedUserType = (profile.userType || profile.user_type || "")
          .trim()
          .toLowerCase();
          const isAgent = normalizedUserType === "agent";
setIsAgentProfile(isAgent);
        const isOwner =
          normalizedUserType === "owner" || normalizedUserType === "ownwer";
        setIsOwnerProfile(isOwner);

        const fullName =
          profile.fullName ||
          profile.name ||
          [profile.firstName, profile.lastName].filter(Boolean).join(" ") ||
          profile.username ||
          "";

        const aboutYou =
          profile.aboutYou ||
          profile.about ||
          profile.bio ||
          profile.about_me ||
          "";
        const companyName =
          profile.companyName || profile.company || profile.company_name || "";
        const icPassport =
          profile.icPassport ||
          profile.ic_passport ||
          profile.icNumber ||
          profile.passport ||
          "";
        const designation =
          profile.designation ||
          profile.title ||
          profile.jobTitle ||
          profile.job_title ||
          "";
        const experience =
          profile.experience ??
          profile.yearsOfExperience ??
          profile.experienceYears ??
          undefined;

        const phoneRaw =
          profile.phone ||
          profile.phoneNumber ||
          profile.mobile ||
          profile.mobileNumber ||
          "";
        const phone = phoneRaw.replace(/\D/g, "");
        const email =
          profile.email || profile.emailAddress || profile.mail || "";

        const profileImage =
          profile.profileImage ||
          profile.profileImageUrl ||
          profile.avatar ||
          profile.avatarUrl ||
          profile.imageUrl ||
          "";

        resetProfile({
          fullName,
          aboutYou,
          companyName,
          icPassport,
          designation,
          experience,
          renNumber: profile.renNumber || "",
          phone,
          email,
        });

        // Set avatar
        if (profileImage) {
          setProfileImageUrl(profileImage);
        }

        // Set display name in header
        const headerDisplayName = profile.fullName ?? fullName ?? profile.username ?? "";
        setDisplayName(headerDisplayName || "My Profile");
        if (typeof window !== "undefined") {
          localStorage.setItem("loginUserDisplayName", headerDisplayName);
        }
        if (profile.profileImage) {
          setProfileImageUrl(profile.profileImage);
        }

        setDisplayName(headerDisplayName || "My Profile");
        setRenInfo({
          number: profile.renNumber || "",
          verified:
            profile.renVerified === true || profile.renStatus === "verified",
          label:
            profile.renStatusLabel ||
            (profile.renStatus === "verified" ? "Verified" : "Not verified"),
          available: profile.renStatus !== undefined || Boolean(profile.renNumber),
        });
        const accountStatus = (profile.status || profile.userStatus || "active")
          .trim()
          .toLowerCase();

      } catch (err: unknown) {
        const error = err as { response?: { status?: number } };
        if (error?.response?.status !== 401) {
          toast.error("Failed to load profile data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [resetProfile]);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!PROFILE_IMAGE_ACCEPTED_TYPES.includes(file.type)) {
      toast.error("Please choose a JPG, PNG, or WebP image.");
      e.target.value = "";
      return;
    }

    if (file.size > PROFILE_IMAGE_MAX_BYTES) {
      toast.error("Profile image must be 5MB or smaller.");
      e.target.value = "";
      return;
    }

    const previousImageUrl = profileImageUrl;
    const previewUrl = URL.createObjectURL(file);

    if (previewObjectUrlRef.current) {
      URL.revokeObjectURL(previewObjectUrlRef.current);
    }

    previewObjectUrlRef.current = previewUrl;
    setProfileImageUrl(previewUrl);
    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append("profileImage", file);

      const response = await apiClient.post<unknown>("/users/profile/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const uploadedImageUrl = extractProfileImage(response.data);
      if (uploadedImageUrl) {
        URL.revokeObjectURL(previewUrl);
        previewObjectUrlRef.current = null;
        setProfileImageUrl(uploadedImageUrl);
      }

      toast.success("Profile image updated!");
    } catch (err: unknown) {
      URL.revokeObjectURL(previewUrl);
      previewObjectUrlRef.current = null;
      setProfileImageUrl(previousImageUrl);

      const error = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to upload image.",
      );
    } finally {
      setUploadingImage(false);
      e.target.value = "";
    }
  };

  const onProfileSubmit = async (data: ProfileFormData) => {
    try {
      const normalizedPhone = data.phone?.trim() ? formatNum(data.phone) : "";
      const payload = {
        fullName: data.fullName,
        aboutYou: data.aboutYou,
        phone: normalizedPhone,
        ...(isOwnerProfile
          ? {}
          : {
              companyName: data.companyName,
              icPassport: data.icPassport,
              designation: data.designation,
              experience: data.experience,
              renNumber: data.renNumber,
            }),
      };

      await apiClient.patch("/users/profile", payload);
      setDisplayName(data.fullName);
      localStorage.setItem("loginUserDisplayName", data.fullName);
      toast.success("Profile updated successfully!");
    } catch (err: unknown) {
      const error = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to update profile",
      );
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "40px 0", textAlign: "center", color: "#888" }}>
        Loading profile...
      </div>
    );
  }

  return (
    <>
      {/* Profile Image + Name */}
      <div
        className="profile-photo-upload-row"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
          paddingBottom: 24,
          marginBottom: 24,
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div
          style={{ position: "relative", width: 90, height: 90, flexShrink: 0 }}
        >
          {profileImageUrl ? (
            <span
              style={{
                display: "block",
                width: 90,
                height: 90,
                borderRadius: "50%",
                backgroundImage: `url('${profileImageUrl}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ) : (
            <span
              style={{
                display: "flex",
                width: 90,
                height: 90,
                borderRadius: "50%",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(212, 175, 55, 0.18)",
                border: "1px solid rgba(212, 175, 55, 0.75)",
                color: "#D4AF37",
              }}
              aria-label="default profile icon"
            >
              <UserSvg />
            </span>
          )}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingImage}
            aria-label="Change profile photo"
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              background: "#fff",
              border: "none",
              borderRadius: "50%",
              width: 28,
              height: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
              cursor: uploadingImage ? "wait" : "pointer",
              padding: 0,
              opacity: uploadingImage ? 0.75 : 1,
            }}
          >
            {uploadingImage ? (
              <span style={{ fontSize: 9 }}>...</span>
            ) : (
              <i className="fa-light fa-camera" style={{ fontSize: 12 }} />
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept={PROFILE_IMAGE_ACCEPT}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>
        <div className="profile-photo-upload-content" style={{ minWidth: 0, flex: 1 }}>
          <h4
            className="profile-photo-upload-name"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              flexWrap: "wrap",
              margin: "0 0 4px",
            }}
          >
            <span>{displayName}</span>
            {isAgentProfile && renInfo.available && renInfo.verified ? (
              <BadgeCheck
                size={19}
                strokeWidth={2.8}
                color="#fff"
                fill="#0095F6"
                aria-label="Verified REN/PEA"
              />
            ) : isAgentProfile && renNumberMissing ? (
              <BadgeAlert
                size={19}
                strokeWidth={2.6}
                color="#8a6116"
                aria-label="Please add REN/PEA number"
              />
            ) : null}
          </h4>
          {isAgentProfile && renInfo.available ? (
            <div
              style={{
                alignItems: "center",
                gap: 8,
                marginBottom: 6,
                padding: "5px 9px",
                borderRadius: 6,
                border: renInfo.verified
                  ? "1px solid rgba(0, 59, 92, 0.24)"
                  : "1px solid rgba(160, 110, 20, 0.28)",
                background: renInfo.verified
                  ? "rgba(0, 59, 92, 0.08)"
                  : "rgba(255, 193, 7, 0.12)",
                color: renInfo.verified ? "#003B5C" : "#8a6116",
                fontSize: 12,
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              <span>
                {renInfo.number
                  ? `${renInfo.number}: ${renInfo.label}`
                  : "Please add REN/PEA number"}
              </span>
            </div>
          ) : null}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingImage}
            style={{
              marginTop: 10,
              border: "1px solid #d8d8d8",
              background: "#fff",
              borderRadius: 6,
              padding: "7px 12px",
              fontSize: 13,
              fontWeight: 600,
              lineHeight: 1,
              cursor: uploadingImage ? "wait" : "pointer",
            }}
          >
            {uploadingImage ? "Uploading..." : "Change photo"}
          </button>
        </div>
      </div>

      {/* Profile Information Form */}
      <form onSubmit={handleProfileSubmit(onProfileSubmit)}>
        <div className="tp-dashboard-profile-information pb-50">
          <h5 className="tp-dashboard-new-title">Personal Information</h5>
          <div className="tp-dashboard-profile-info">
            <div className="row g-3">
              <div className="col-lg-12">
                <div className="tp-dashboard-new-input">
                  <label>Display Name</label>
                  <input
                    {...registerProfile("fullName")}
                    type="text"
                    placeholder="Enter full name"
                  />
                  <ErrorMessage
                    message={profileErrors.fullName?.message || ""}
                  />
                </div>
              </div>

              <div className="col-lg-12">
                <div className="tp-dashboard-new-input">
                  <label>About You</label>
                  <textarea
                    {...registerProfile("aboutYou")}
                    rows={4}
                    placeholder="Tell us about yourself"
                    style={{ width: "100%", resize: "vertical" }}
                  />
                  <ErrorMessage
                    message={profileErrors.aboutYou?.message || ""}
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="tp-dashboard-new-input">
                  <label>Phone Number</label>
                  <input
                    {...registerProfile("phone")}
                    type="text"
                    inputMode="numeric"
                    maxLength={12}
                    placeholder="Enter phone number"
                    onInput={(e: React.FormEvent<HTMLInputElement>) => {
                      const target = e.currentTarget;
                      target.value = target.value.replace(/\D/g, "");
                    }}
                  />
                  <ErrorMessage message={profileErrors.phone?.message || ""} />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="tp-dashboard-new-input">
                  <label>Email</label>
                  <input
                    {...registerProfile("email")}
                    type="email"
                    readOnly
                    placeholder="Email"
                    style={{ background: "#f6f6f6" }}
                  />
                  <ErrorMessage message={profileErrors.email?.message || ""} />
                </div>
              </div>

              {isAgentProfile  && (
                <>
                  <div className="col-lg-6">
                    <div className="tp-dashboard-new-input">
                      <label>REN / PEA Number</label>
                      <input
                        {...registerProfile("renNumber")}
                        type="text"
                        placeholder="REN12345 or PEA12345"
                        style={{ textTransform: "uppercase" }}
                        onInput={(e: React.FormEvent<HTMLInputElement>) => {
                          const target = e.currentTarget;
                          target.value = target.value.toUpperCase();
                        }}
                      />
                      <ErrorMessage
                        message={profileErrors.renNumber?.message || ""}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="tp-dashboard-new-input">
                      <label>Company Name</label>
                      <input
                        {...registerProfile("companyName")}
                        type="text"
                        placeholder="Enter your company name"
                      />
                      <ErrorMessage
                        message={profileErrors.companyName?.message || ""}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="tp-dashboard-new-input">
                      <label>IC / Passport</label>
                      <input
                        {...registerProfile("icPassport")}
                        type="text"
                        placeholder="Enter your identification number"
                      />
                      <ErrorMessage
                        message={profileErrors.icPassport?.message || ""}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="tp-dashboard-new-input">
                      <label>Designation</label>
                      <input
                        {...registerProfile("designation")}
                        type="text"
                        placeholder="Enter your designation"
                      />
                      <ErrorMessage
                        message={profileErrors.designation?.message || ""}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="tp-dashboard-new-input">
                      <label>Experience (years)</label>
                      <input
                        {...registerProfile("experience")}
                        type="number"
                        min={0}
                        placeholder="Years of experience"
                      />
                      <ErrorMessage
                        message={profileErrors.experience?.message || ""}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="col-12">
                <div className="tp-dashboard-new-btn" style={{ marginTop: 8 }}>
                  <button type="submit" disabled={isProfileSubmitting}>
                    {isProfileSubmitting ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
