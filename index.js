let bookings = [
    {bookingCode: "CIN-001", customerName: "Nguyen Van An", movieTilte: "Anh trang cuoi pho", ticketCount: 2, pricePerTicket: 90000, totalAmount: 194400}
];
function displayMenu(){
    console.log("He thong quan ly dat ve MOONLIGHT CINEMA");
    console.log("1. Hien thi danh sach");
    console.log("0. Thoat");
}
// Tìm vị trí đơn đặt vé theo mã, trả về index hoặc -1 nếu không thấy
 function findBookingIndex(code){
    return bookings.findIndex(item =>item.bookingCode === code);
}
function formatCurrency(amount){
    return amount.toLocaleString("vi-VN") + "VND";
}
function displayBookings(list){
    if (!list || list.length === 0){ // Kiểm tra nếu danh sách rỗng hoặc không hợp lệ
        console.log("Khong co du lieu don dat ve!");
        return; // thoat ham neu rong
    }
    console.log("=".repeat(110)); //In đường viền trên
    console.log("Mã ĐV" + "Tên Khách hàng" + "Tên Phim" + "Số vé" + "Giá vé" + "Tổng tiền");
    console.log("-".repeat(110)); //In đường kẻ ngang phân tách tiêu đề
    list.forEach(item => { //Duyệt qua từng phần tử trong danh sách
        console.log(
            item.bookingCode+
            item.customerName +
            item.movieTilte +
            String(item.ticketCount) +
            formatCurrency(item.pricePerTicket) +
            formatCurrency(item.totalAmount)
        ); // In dữ liệu chi tiết của từng đơn đặt vé

    });
    console.log("=".repeat(110)); //In đường viền dưới
    console.log(`Tổng số đơn: ${list.length} | Tong doanh thu: ${formatCurrency(list.reduce((sum, item) => sum + item.totalAmount,0))}`); // Tổng kết doanh thu
}
// Xử lý chức năng hiển thị danh sách (Case 1)
function handleDisplay(){
    displayBookings(bookings); //Gọi hàm hiển thị toàn bộ mảng bookings
}
// Xử lý tính toán tổng tiền thanh toán
function calculateTotal(ticketCount, pricePerTicket){
    const totalAmount = ticketCount * pricePerTicket; //Tính tổng tiền thanh toán
    return {totalAmount}; // Trả về object chứa tổng tiền
}
// Xử lý thêm đơn đặt vé mới (Case 2)
function handleAddBooking(){
    let code = "";
    while(true) {
        const rawCode = prompt("Nhập mã đặt vé mới(ví dụ: CIN-004):") // Nhập mã từ prompt
        if (rawCode === null){
            console.log("Da huy thao tac them don");
            return; // Hủy nếu bấm Cancel
        }
        code = rawCode.trim().toUpperCase(); // Chuẩn hóa mã viết hoa và xóa khoảng trắng
        const error = validateBookingCode(code); //Kiểm tra hợp lệ mã
        if (error ==="") break; //Thoát vòng lặp nếu mã hợp lệ
        alert(error); // Báo lỗi nếu mã sai
    }
    const rawName = prompt("Nhap ten khach hang:");
    if (rawName === null){
        console.log("Da huy thao tac them don");
        return;
    }
    const customerName = rawName.trim(); // Xóa khoảng trắng thừa
    if (customerName === "") return;

    const rawMovie = prompt("Nhap ten phim:") 
    if(rawMovie === null){
        console.log("Da huy thao tac them don");
        return;
    }
    const movieTilte = rawMovie.trim(); // Xóa khoảng trắng thừa
    if (movieTilte === "") return;

    const ticketCount = inputPositiveInteger("Nhap so luong ve(>0):")
    if (ticketCount === null){
        console.log("Da huy thao tac them don");
        return;
    }
    
    const pricePerTicket = inputPositiveInteger("Nhap gia moi ve:")
    if (pricePerTicket === null){
        console.log("Da huy thao tac tao don");
        return;
    }
    const calc = calculateTotal(ticketCount, pricePerTicket); //Tính tổng tiền
    const newBooking = {
        bookingCode: code,
        customerName: customerName,
        movieTilte: movieTilte,
        ticketCount: ticketCount,
        pricePerTicket: pricePerTicket,
        totalAmount: calc.totalAmount
    }; // Tạo object đơn mới
    bookings.push(newBooking); //Thêm đơn mới vào mảng bookings
    console.log("Them don dat ve thanh cong");
    displayBookings([newBooking]);// Hiển thị lại hóa đơn vừa thêm
}

// Xử lý cập nhật thông tin đơn đặt vé (Case 3)
function handleUpdateBooking(){
    const rawCode = prompt("Nhap ma dat ve can cap nhat:");
    if (rawCode === null) return;
    const code = rawCode.trim().toUpperCase();
    const index = findBookingIndex(code); // Tìm vị trí đơn trong mảng
    if (index === -1){
        console.log(`Khong tim thay don dat ve co ma ${code}`); // Báo lỗi nếu không thấy
        return;
    }
    const current = bookings[index];// Lấy thông tin hiện tại của đơn
    const rawName = prompt(`Ten khach hang moi (Cancel de giu nguyen):`, current.customerName);
    const customerName = rawName === null ? current.customerName : rawName.trim();// Cập nhật hoặc giữ nguyên tên

    const rawMovie = prompt(`Nhap ten phim moi (Cancel de giu nguyen):`, current.movieTilte);
    const movieTilte = rawMovie === null ? current.movieTilte: rawMovie.trim(); // Cập nhật hoặc giữ nguyên phim

    const rawCount = prompt(`So ve moi (Cancel de giu nguyen):`,current.ticketCount);
    let ticketCount = current.ticketCount;
    if(rawCount !== null && rawCount.trim() !== ""){
        const num = Number(rawCount.trim());
        if (Number.isInteger(num) && num >0) ticketCount = num; // Cập nhật số vé nếu hợp lệ
    }
    const rawPrice = prompt(`Gia ve moi(Cancel de giu nguyen):`, current.pricePerTicket);
    let pricePerTicket = current.pricePerTicket;
    if (rawPrice !== null && rawPrice.trim() !== ""){
        const num = Number(rawPrice.trim());
        if (Number.isInteger(num) && num > 0) pricePerTicket = num; // Cập nhật giá vé nếu hợp lệ
    }
    const oldTotal = current.totalAmount;// Lưu tổng tiền cũ
    const calc = calculateTotal(ticketCount, pricePerTicket); // Tính tổng tiền mới
    current.customerName = customerName;
    current.movieTilte = movieTilte;
    current.ticketCount = ticketCount;
    current.pricePerTicket = pricePerTicket;
    current.totalAmount = calc.totalAmount; // Ghi đè thông tin mới vào object
    console.log(`Cap nhat thanh cong! Tong thanh toan cu: ${formatCurrency(oldTotal)} -> Tong thanh toan moi ${formatCurrency(current.totalAmount)}`);
}
// Kiểm tra mã đặt vé, trả về thông báo lỗi hoặc chuỗi rỗng nếu hợp lệ
function validateBookingCode(code){
    if (!code) return "Ma dat ve khong duoc de trong"; // Kiểm tra giá trị null/rỗng
    const trimmed = code.trim().toUpperCase(); // Xóa khoảng trắng và đổi thành chữ hoa
    if (trimmed.length === 0) return "Ma dat ve khong duoc de trong"; // Kiểm tra sau khi trim
    if (trimmed.starWish("CIN-")) return "Ma dat ve phai bat dau bang tien to 'CIN-'"; // Kiểm tra tiền tố
    if (findBookingIndex(trimmed) !== -1) return "Ma dat ve da ton tai trong he thong"; //Kiểm tra trùng lặp
    return ""; // Trả về rỗng nếu hợp lệ hoàn toàn
}
// Yêu cầu nhập số nguyên > 0, lặp lại khi nhập sai, trả về null nếu bấm Cancel
function inputPositiveInteger(message) {
    while(true){ // Vòng lặp chạy đến khi nào đúng
        const input = prompt(message); //Hiển thị hộp thoại nhập dữ liệu
        if (input===null) return null; //trả về null nếu người dùng bấm Cancel
        const trimmed = input.trim(); //Xóa khoảng trắng thừa
        if (trimmed === "") continue; // Bỏ qua nếu chuỗi rỗng
        const num= Number(trimmed); //Ép kiểu dữ liệu sang số
        if (Number.isInteger(num) && num > 0); //Kiểm tra số nguyên dương và trả về

    }
}

function main(){
    let isRunning = true;
    do {
        displayMenu();
        let choice = prompt("Nhap lua chon:");
        if (choice === null) break;
        switch (Number(choice.trim())){
            case 1:
                console.log("Chon chuc nang 1");
                break;
            case 0:
                isRunning = false;
                console.log("Thoat chuong trinh");
                break;
            default:
                console.log("Lua chon khong hop le");
        }
    }while (isRunning);
}
main();