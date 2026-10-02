let currentAppointmentCode = "";
let isAppointmentValid = false;
let totalRevenue = 0;
let totalAppoints = 0;
let running = true;




while (running) {
    let choice = prompt(
        "===== HỆ THỐNG ĐẶT LỊCH LOTUS SPA =====\n" +
        "1. Nhập và kiểm chuẩn mã lịch hẹn\n" +
        "2. Tính tiền liệu trình chăm sóc\n" +
        "3. Thẩm định mã khách hàng may mắn\n" +
        "0. Thoát\n" +
        "Mời bạn chno:"
    );

    if (choice === null) choice = "";
    choice = choice.trim();
    switch (choice) {
        case "1":
            currentAppointmentCode = "";
            isAppointmentValid = false;

            let code = prompt("Nhập mã lịch hẹn:");
            code = code === null ? "" : code.trim();
            if (code === "") {
                console.log("Chưa nhập mã lịch hẹn");
            } else if (code.length < 6) {
                console.log("Lỗi Độ dài nhỏ hơn 6 ký tự");
            } else if (!code.startsWith("SPA-")) {
                console.log('Lỗi Sai tiền tố "SPA--"');
            } else if (code.includes(" ")) {
                console.log("Lỗi Chứa khoảng trắng ở giữa");
            } else {
                currentAppointmentCode = code;
                isAppointmentValid = true;
                console.log("mã phiếu hợp lệ");
            }
            break;

        case "2":
            if (!isAppointmentValid) {
                console.log("Vui lòng nhập mã phiếu hợp lệ trước");
                break;
            }

            let count;
            let price;
            let input;
            while (true) {
                input = prompt("Số lượng chăm sóc:");
                if (input === null) break;

                count = Number(input);
                if (Number.isInteger(count) && count > 0) break;

                console.log("Nhập số nguyên > 0");
            }

            if (input === null) {
                console.log("Đã hủy");
                break;
            }
            while (true) {
                input = prompt("Đơn giá:");
                if (input === null) break;

                price = Number(input);
                if (Number.isInteger(price) && price > 0) break;
                console.log("Nhập số nguyên > 0");
            }
            if (input === null) {
                console.log("Đã hủy");
                break;
            }

            let base = count * price;
            let discount = count >= 4 ? Math.round(base * 0.1) : 0;
            let fee = Math.round((base - discount) * 0.08);
            let total = base - discount + fee;

            console.log("HÓA ĐƠN");
            console.log("Mã phiếu:", currentAppointmentCode);
            console.log("Số lượng:", count);
            console.log("Đơn giá:", price.toLocaleString("vi-VN") + " VNĐ");
            console.log("Chi phí:", base.toLocaleString("vi-VN") + " VNĐ");
            console.log("Giảm giá:", discount.toLocaleString("vi-VN") + " VNĐ");
            console.log("Phụ phí:", fee.toLocaleString("vi-VN") + " VNĐ");
            console.log("Tổng tiền:", total.toLocaleString("vi-VN") + " VNĐ");
            totalRevenue += total;
            totalAppoints++;
            currentAppointmentCode = "";
            isAppointmentValid = false;
            break;

        case "3":
            let serial = prompt("Nhập mã lịch hẹn:");
            if (serial === null) {
                console.log("Mã không hợp lệ");
                break;
            }

            serial = serial.trim();
            if (!/^\d+$/.test(serial) || serial.length < 2 || /^0+$/.test(serial)) {
                console.log("Mã không hợp lệ");
                break;
            }
            let reverse = serial.split("").reverse().join("");
            let sum = 0;

            for (let i = 0; i < serial.length; i++) {
                sum += Number(serial[i]);
            }

            let palindrome = serial === reverse;
            let divisible = sum % 9 === 0;
            let prize = "Không trúng thưởng";

            if (palindrome && divisible)
                prize = "Giải Đặc biệt - 500.000 vnd";
            else if (palindrome)
                prize = "Giải Nhất - 200.000 vnd";
            else if (divisible)
                prize = "Giải Nhì - 50.000 VNĐ";

            console.log("Mã gốc:", serial);
            console.log("Mã đảo:", reverse);
            console.log("Tổng chữ số:", sum);
            console.log("Chia hết cho 9:", divisible ? "Có" : "Ko");
            console.log("Giải thưởng:", prize);
            break;

        case "0":
            console.log("===== TỔNG KẾT CA =====");

            if (totalAppoints === 0) {
                console.log("Chưa phát sinh đăng ký nào trong ca");
            } else {
                console.log("Lượt đăng ký:", totalAppoints);
                console.log("Doanh thu:", totalRevenue.toLocaleString("vi-VN") + " VNĐ");
                console.log(
                    "Trung bình:",
                    Math.round(totalRevenue / totalAppoints).toLocaleString("vi-VN") + " VNĐ"
                );
            }

            console.log("Cảm ơn  đã sử dụng chương trình");
            running = false;
            break;

        default:
            console.log("Lựa chọn không hợp lệ");
    }
}