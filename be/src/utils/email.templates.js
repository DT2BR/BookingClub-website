const baseStyles = `
  <style>
    @media only screen and (max-width: 620px) {
      .wrapper { width: 100% !important; padding: 10px !important; }
      .button { width: 100% !important; }
    }
  </style>
`;

const shell = ({ title, heading, message, actionLabel, actionUrl, footerNote, brandText }) => `
  <!doctype html>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>${title}</title>
    ${baseStyles}
  </head>
  <body style="margin:0;padding:0;background:#f7f8fb;font-family:Arial,Helvetica,sans-serif;color:#333;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center" style="padding:30px 10px;">
          <table class="wrapper" role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="background:#ffffff;border-radius:8px;overflow:hidden;">
            <tr>
              <td style="padding:20px 30px 16px;background:#fff;border-bottom:1px solid #eef2f6;">
                <div style="font-size:30px;font-weight:700;color:#2f5fa7;letter-spacing:-1px;line-height:1;text-align:center;">${brandText}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:30px;">
                <h1 style="margin:0 0 12px 0;font-size:20px;color:#0f172a;">${heading}</h1>
                <p style="margin:0 0 18px 0;color:#475569;line-height:1.5">${message}</p>

                <div style="text-align:center;margin:28px 0;">
                  <a href="${actionUrl}" class="button" style="background:#2563eb;color:#fff;padding:12px 22px;border-radius:8px;text-decoration:none;display:inline-block;font-weight:600;">${actionLabel}</a>
                </div>

                <hr style="border:none;border-top:1px solid #eef2f6;margin:22px 0" />
                <p style="margin:0;color:#6b7280;font-size:13px">${footerNote}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 30px;background:#fbfdff;color:#94a3b8;font-size:13px;text-align:center;">© ${new Date().getFullYear()} BookingClub. All rights reserved.</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
`;

export const buildVerificationEmailHtml = ({ recipientName, verificationLink }) => {
  return shell({
    title: "Verify your email",
    heading: "Xác nhận email của bạn",
    message: `Xin chào ${recipientName},<br/>Cảm ơn bạn đã đăng ký BookingClub. Vui lòng xác nhận email bằng cách bấm nút bên dưới.`,
    actionLabel: "Xác nhận email",
    actionUrl: verificationLink,
    footerNote: "Nếu bạn không yêu cầu xác nhận này, bạn có thể bỏ qua email này.",
    brandText: "BookingClub"
  });
};

export const buildResetPasswordEmailHtml = ({ recipientName, resetLink }) => {
  return shell({
    title: "Reset your password",
    heading: "Đặt lại mật khẩu",
    message: `Xin chào ${recipientName},<br/>Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản BookingClub của bạn.`,
    actionLabel: "Đặt lại mật khẩu",
    actionUrl: resetLink,
    footerNote: "Nếu bạn không yêu cầu đặt lại mật khẩu, bạn có thể bỏ qua email này.",
    brandText: "BookingClub"
  });
};