import QRCode from 'qrcode'; // Đảm bảo đã chạy lệnh: npm install qrcode

export const generateQR = async (text) => {
  try {
    // Bắt buộc phải có `await` ở đây để đợi thư viện chuyển text sang chuỗi Base64 hoàn chỉnh
    const dataUrl = await QRCode.toDataURL(text); 
    console.log("Chuỗi dữ liệu QR code đã được tạo:", dataUrl); // Log để kiểm tra dữ liệu trả về
    // Bắt buộc phải có return để trả chuỗi dữ liệu này ra ngoài
    return dataUrl; 
  } catch (err) {
    console.error("Lỗi chi tiết khi sinh mã QR từ thư viện:", err);
    return ""; // Trả về chuỗi rỗng để tránh làm sập API nếu lỗi
  }
};