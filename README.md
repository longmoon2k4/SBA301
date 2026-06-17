1. Câu chuyện hậu trường: Nỗi ám ảnh mang tên "Tracking"
Quay ngược thời gian về khoảng hơn một thập kỷ trước, khi các hệ thống phần mềm doanh nghiệp (Enterprise Systems) viết bằng Java bắt đầu bùng nổ. Có một luật bất thành văn ở mọi dự án (đặc biệt là các dự án liên quan đến pháp lý, tài chính): Mọi dòng dữ liệu đều phải có dấu vết lịch sử.

Ai tạo ra văn bản luật này? Tạo lúc mấy giờ?

Ai là người sửa đổi nó cuối cùng? Sửa lúc nào?

Vào thời điểm đó, các lập trình viên Java phải viết thủ công một đoạn logic nhàm chán lặp đi lặp lại hàng nghìn lần:

Java
// Đêm muộn chạy deadline đồ án và bạn phải gõ những dòng này ở 50 hàm khác nhau...
phongBan.setCreatedAt(LocalDateTime.now());
phongBan.setCreatedBy(currentUser.getUsername());
phongBanRepository.save(phongBan);
Hậu quả: Code dài dòng (boilerplate code), dễ xảy ra lỗi con người (quên gọi hàm set), và làm cho tầng Service bị phình to bởi những logic không thực sự là "nghiệp vụ".

Giải pháp của đội ngũ Spring: Họ nhận ra rằng: "Chờ đã, thằng Hibernate (ORM) làm nhiệm vụ dịch từ Java sang SQL. Nó biết chính xác thời điểm nào một object chuẩn bị được INSERT (thêm mới) hoặc UPDATE (cập nhật) vào Database. Tại sao chúng ta không đặt một 'Trạm kiểm soát' ngay trước cửa ngõ của Hibernate?"

Và thế là JPA Auditing ra đời, dựa trên một Design Pattern kinh điển: Observer Pattern (Mẫu thiết kế Người quan sát).

2. Cách thức hoạt động đằng sau: "Trạm kiểm soát"
Khi bạn gắn @EnableJpaAuditing và @EntityListeners(AuditingEntityListener.class), bạn đang thiết lập một "Trạm kiểm soát" vô hình.

Vòng đời (Lifecycle) của một thao tác lưu dữ liệu sẽ diễn ra như sau:

React gửi dữ liệu: Phía Front-end gửi một cục JSON chứa tên phòng ban và mô tả (không hề có thông tin ngày giờ).

Controller & Service: Nhận dữ liệu, đóng gói thành object Department và gọi lệnh repository.save(department).

TẠM DỪNG (Sự kiện Intercept): Đây là lúc phép thuật xảy ra. Hibernate chuẩn bị mang object này đi tạo câu lệnh SQL, nhưng nó bị chặn lại bởi các sự kiện vòng đời (Lifecycle Events) là @PrePersist (trước khi lưu mới) và @PreUpdate (trước khi cập nhật).

AuditingEntityListener ra tay: Trạm kiểm soát này sẽ quét object Department:

Máy quét 1: "À, object này có gắn thẻ @CreatedDate. Để tôi mở đồng hồ của JVM (Java Virtual Machine) lấy giờ hiện tại đập vào đây."

Máy quét 2: "Có gắn thẻ @CreatedBy này. Này anh bạn AuditorAware, ai đang đăng nhập hệ thống thế? Đưa tên đây để tôi điền vào!"

Thông quan: Sau khi các trường trống đã được điền tự động, object mới được phép đi tiếp qua cửa ngõ Hibernate.

3. Cách nó giao tiếp với Cơ sở dữ liệu (MS SQL Server)
JPA Auditing thực chất không hề giao tiếp trực tiếp với Database. Nó hoàn toàn hoạt động ở tầng Application (RAM của Java).

Trách nhiệm giao tiếp với CSDL vẫn thuộc về Hibernate. Cơ chế diễn ra như sau:

Bên trong Java (RAM): Object Department lúc đầu có createdAt = null. Sau khi qua "Trạm kiểm soát" Auditing, nó trở thành createdAt = '2026-06-17 10:00:00'.

Hibernate dịch thuật: Hibernate nhìn vào object đã được điền đầy đủ này và bắt đầu sinh (generate) ra câu lệnh SQL gốc (Native SQL) phù hợp với phương ngữ của SQL Server.

Gửi xuống DB:

SQL
-- Câu lệnh thực tế được Hibernate bắn qua cầu nối JDBC xuống SQL Server
INSERT INTO departments (department_name, description, created_at, created_by, is_deleted)
VALUES ('Phòng Tư vấn Luật', 'Tư vấn dân sự', '2026-06-17 10:00:00', 'admin_long', 0);
Sự lợi hại của kiến trúc này:
Vì Auditing xảy ra ở tầng Java trước khi sinh SQL, nên MS SQL Server của bạn chỉ coi đây là một câu lệnh INSERT hoặc UPDATE hết sức bình thường. Bạn không cần phải viết các TRIGGER (Trình kích hoạt) phức tạp hay set DEFAULT CURRENT_TIMESTAMP bên trong CSDL nữa. Mọi logic thời gian đều được quản lý tập trung bằng Java - ngôn ngữ mà bạn đang thành thạo nhất.

Tóm lại cho bạn dễ hình dung nhất:
JPA Auditing là một "người bảo vệ" đứng canh cửa ở tầng Java.

Mỗi khi bạn hô save(), người bảo vệ này sẽ lôi đồng hồ và danh sách người đăng nhập ra, dán thêm 4 cái tem (Ngày tạo, Ngày sửa, Người tạo, Người sửa) vào gói hàng của bạn.

Sau đó, gói hàng mới được chuyển cho anh shipper (Hibernate) để đem cất vào kho (SQL Server).

Khi làm các đồ án yêu cầu tính chuyên nghiệp cao, việc thiết lập sẵn một class BaseEntity chứa 4 trường này và cho các Entity khác (User, Job, Department...) kế thừa (extends) lại nó sẽ giúp cấu trúc code của bạn chuẩn chỉnh hệt như các hệ thống Enterprise thực tế ngoài doanh nghiệp.
