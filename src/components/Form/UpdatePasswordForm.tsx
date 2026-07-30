"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswordSchema } from "@/schemas/validationSchema";
import { ClosedEyeSvg, OpenEyeSvg } from "../SVG";
import ErrorMessage from "./ErrorMassage";
import { toast } from "sonner";
import apiClient from "@/config/axios";

interface PasswordFormData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function UpdatePasswordForm() {
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
  } = useForm<PasswordFormData>({
    resolver: yupResolver(changePasswordSchema),
  });

  const onPasswordSubmit = async (data: PasswordFormData) => {
    try {
      await apiClient.post("/auth/change-password", {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      toast.success("Password changed successfully!");
      resetPassword();
    } catch (err: unknown) {
      const error = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to change password",
      );
    }
  };

  return (
    <form onSubmit={handlePasswordSubmit(onPasswordSubmit)}>
      <div className="tp-dashboard-profile-information mb-40">
        <h5 className="tp-dashboard-new-title">Update Password</h5>
        <div className="tp-dashboard-profile-info">
          <div className="row g-3">
            <div className="col-lg-4">
              <div className="tp-dashboard-new-input">
                <label>Old Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    {...registerPassword("oldPassword")}
                    type={oldPasswordVisible ? "text" : "password"}
                    placeholder="Old password"
                    style={{ paddingRight: 40 }}
                  />
                  <span
                    onClick={() => setOldPasswordVisible((v) => !v)}
                    style={{
                      position: "absolute",
                      right: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {oldPasswordVisible ? <OpenEyeSvg /> : <ClosedEyeSvg />}
                  </span>
                </div>
                <ErrorMessage
                  message={passwordErrors.oldPassword?.message || ""}
                />
              </div>
            </div>

            <div className="col-lg-4">
              <div className="tp-dashboard-new-input">
                <label>New Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    {...registerPassword("newPassword")}
                    type={newPasswordVisible ? "text" : "password"}
                    placeholder="New password"
                    style={{ paddingRight: 40 }}
                  />
                  <span
                    onClick={() => setNewPasswordVisible((v) => !v)}
                    style={{
                      position: "absolute",
                      right: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {newPasswordVisible ? <OpenEyeSvg /> : <ClosedEyeSvg />}
                  </span>
                </div>
                <ErrorMessage
                  message={passwordErrors.newPassword?.message || ""}
                />
              </div>
            </div>

            <div className="col-lg-4">
              <div className="tp-dashboard-new-input">
                <label>Confirm Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    {...registerPassword("confirmPassword")}
                    type={confirmPasswordVisible ? "text" : "password"}
                    placeholder="Confirm new password"
                    style={{ paddingRight: 40 }}
                  />
                  <span
                    onClick={() => setConfirmPasswordVisible((v) => !v)}
                    style={{
                      position: "absolute",
                      right: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {confirmPasswordVisible ? <OpenEyeSvg /> : <ClosedEyeSvg />}
                  </span>
                </div>
                <ErrorMessage
                  message={passwordErrors.confirmPassword?.message || ""}
                />
              </div>
            </div>

            <div className="col-12">
              <div className="tp-dashboard-new-btn" style={{ marginTop: 8 }}>
                <button type="submit" disabled={isPasswordSubmitting}>
                  {isPasswordSubmitting ? "Updating..." : "Update Password"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
