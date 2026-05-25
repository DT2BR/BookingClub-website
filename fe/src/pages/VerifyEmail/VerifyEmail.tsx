import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AlertCircle, CheckCircle2, LoaderCircle } from "lucide-react";
import { verifyEmailApi } from "../../services/auth.api";
import "./VerifyEmail.css";

type VerifyState = "loading" | "success" | "error";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [state, setState] = useState<VerifyState>("loading");
  const [message, setMessage] = useState("Đang xác thực email của bạn...");

  useEffect(() => {
    const status = searchParams.get("status");
    const messageParam = searchParams.get("message");
    const token = searchParams.get("token");

    // If server redirected with status, show that immediately
    if (status) {
      if (status === "success") {
        setState("success");
        setMessage("Email đã được xác thực thành công.");
      } else {
        setState("error");
        setMessage(messageParam ? decodeURIComponent(messageParam) : "Xác thực email thất bại.");
      }
      return;
    }

    if (!token) {
      setState("error");
      setMessage("Không tìm thấy token xác thực trong đường dẫn.");
      return;
    }

    let isMounted = true;

    const verify = async () => {
      try {
        const response = await verifyEmailApi(token);

        if (!isMounted) {
          return;
        }

        setState("success");
        setMessage(response.message || "Email đã được xác thực thành công.");
      } catch (error: any) {
        if (!isMounted) {
          return;
        }

        const errorMessage = error?.response?.data?.message || "Xác thực email thất bại.";
        setState("error");
        setMessage(errorMessage);
      }
    };

    verify();

    return () => {
      isMounted = false;
    };
  }, [searchParams]);

  return (
    <div className="verify-email-page">
      <div className="verify-email-card">
        <div className={`verify-email-icon verify-email-icon-${state}`}>
          {state === "loading" && <LoaderCircle size={48} className="verify-spin" />}
          {state === "success" && <CheckCircle2 size={52} />}
          {state === "error" && <AlertCircle size={52} />}
        </div>

        <h1 className="verify-email-title">
          {state === "loading" && "Đang xác minh email"}
          {state === "success" && "Xác minh thành công"}
          {state === "error" && "Xác minh thất bại"}
        </h1>

        <p className="verify-email-message">{message}</p>

        <div className="verify-email-actions">
          {state === "success" && (
            <button className="verify-email-primary" onClick={() => navigate("/login")}>
              Đăng nhập ngay
            </button>
          )}
          {state === "error" && (
            <button className="verify-email-primary" onClick={() => navigate("/register")}>
              Đăng ký lại
            </button>
          )}
          <button className="verify-email-secondary" onClick={() => navigate("/")}>
            Về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;