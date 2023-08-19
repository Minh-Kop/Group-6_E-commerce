-- ========== PROVINCE ==========
INSERT into Province (PROV_ID, PROV_NAME) values ('PR01', N'Thành phố Hồ Chí Minh')
INSERT into Province (PROV_ID, PROV_NAME) values ('PR02', N'Hà Nội')
INSERT into Province (PROV_ID, PROV_NAME) values ('PR03', N'Đà Nẵng')
INSERT into Province (PROV_ID, PROV_NAME) values ('PR04', N'Cần Thơ')
INSERT into Province (PROV_ID, PROV_NAME) values ('PR05', N'Lâm Đồng')
-- select * from province

-- ========== DISTRICT ==========
insert into DISTRICT (DIST_ID, PROV_ID, DIST_NAME) values ('DT0001', 'PR01', N'Quận 1')
insert into DISTRICT (DIST_ID, PROV_ID, DIST_NAME) values ('DT0002', 'PR01', N'Quận 2')
insert into DISTRICT (DIST_ID, PROV_ID, DIST_NAME) values ('DT0003', 'PR01', N'Quận 3')
insert into DISTRICT (DIST_ID, PROV_ID, DIST_NAME) values ('DT0004', 'PR01', N'Quận 4')
insert into DISTRICT (DIST_ID, PROV_ID, DIST_NAME) values ('DT0005', 'PR01', N'Quận 5')
-- select * from DISTRICT

-- ========== WARD ==========
insert into WARD (WARD_ID, DIST_ID, WARD_NAME) values
    ('WD000001', 'DT0005', N'Phường 1'),
    ('WD000002', 'DT0005', N'Phường 2'),
    ('WD000003', 'DT0005', N'Phường 3'),
    ('WD000004', 'DT0005', N'Phường 4'),
    ('WD000005', 'DT0005', N'Phường 5')
-- select*from WARD

-- ========== CATEGORY ==========
insert into PAYMENT (PAYMENT_ID, PAYMENT_PROVIDER) VALUES ('PY01', 'Paypal')
insert into PAYMENT (PAYMENT_ID, PAYMENT_PROVIDER) VALUES ('PY02', 'MoMo')
insert into PAYMENT (PAYMENT_ID, PAYMENT_PROVIDER) VALUES ('PY03', 'ShopeePay')
insert into PAYMENT (PAYMENT_ID, PAYMENT_PROVIDER) VALUES ('PY04', 'ZaloPay')
-- select*from PAYMENT

-- ========== CATEGORY ==========
insert into CATEGORY (CATE_ID, CATE_NAME) values ('CA01', N'Manga - Comic')
insert into CATEGORY (CATE_ID, CATE_NAME) values ('CA02', N'Comic - Truyện Tranh')
insert into CATEGORY (CATE_ID, CATE_NAME) values ('CA03', N'Manga')
update CATEGORY set PARENT_ID = 'CA01' where CATE_ID IN ('CA02', 'CA03')

insert into CATEGORY (CATE_ID, CATE_NAME) values ('CA04', N'Tâm Lý - Kỹ Năng Sống')
insert into CATEGORY (CATE_ID, CATE_NAME) values ('CA05', N'Kỹ Năng Sống')
insert into CATEGORY (CATE_ID, CATE_NAME) values ('CA06', N'Sách Cho Tuổi Mới Lớn')
insert into CATEGORY (CATE_ID, CATE_NAME) values ('CA07', N'Tâm Lý')
update CATEGORY set PARENT_ID = 'CA04' where CATE_ID IN ('CA05', 'CA06', 'CA07') 

insert into CATEGORY (CATE_ID, CATE_NAME) values ('CA08', N'Thiếu nhi')
insert into CATEGORY (CATE_ID, CATE_NAME) values ('CA09', N'Kiến Thức - Kỹ Năng Sống Cho Trẻ')
insert into CATEGORY (CATE_ID, CATE_NAME) values ('CA10', N'Kiến Thức Bách Khoa')
insert into CATEGORY (CATE_ID, CATE_NAME) values ('CA11', N'Truyện Thiếu Nhi')
update CATEGORY set PARENT_ID = 'CA08' where CATE_ID IN ('CA09', 'CA10', 'CA11') 

insert into CATEGORY (CATE_ID, CATE_NAME) values ('CA12', N'Văn Học')
insert into CATEGORY (CATE_ID, CATE_NAME) values ('CA13', N'Light Novel')
insert into CATEGORY (CATE_ID, CATE_NAME) values ('CA14', N'Tiểu Thuyết')
insert into CATEGORY (CATE_ID, CATE_NAME) values ('CA15', N'Truyện Ngắn - Tản Văn')
update CATEGORY set PARENT_ID = 'CA12' where CATE_ID IN ('CA13', 'CA14', 'CA15')

insert into CATEGORY (CATE_ID, CATE_NAME) values ('CA16', N'Sách Tiếng Việt')
update CATEGORY set PARENT_ID = 'CA16' where CATE_ID IN ('CA01', 'CA04', 'CA08', 'CA12')

-- ========== AUTHOR ==========
INSERT into AUTHOR values ('AU01', N'René Goscinny')
INSERT into AUTHOR values ('AU02', N'Albert Uderzo')
INSERT into AUTHOR values ('AU03', N'Quang Nino')
INSERT into AUTHOR values ('AU04', N'Mèo Mốc')
INSERT into AUTHOR values ('AU06', N'Gosho Aoyama')
INSERT into AUTHOR values ('AU07', N'Akira Toriyama')
INSERT into AUTHOR values ('AU08', N'Toyotarou')
INSERT into AUTHOR values ('AU09', N'Haro Aso')
INSERT into AUTHOR values ('AU10', N'Elisabeth Kübler Ross')
INSERT into AUTHOR values ('AU11', N'David Kessler')
INSERT into AUTHOR values ('AU12', N'Sophie Gonzales')
INSERT into AUTHOR values ('AU13', N'Liesl Clark')
INSERT into AUTHOR values ('AU14', N'Rebecca Rockfeller')
INSERT into AUTHOR values ('AU15', N'Lê Quang')
INSERT into AUTHOR values ('AU16', N'Julie')
INSERT into AUTHOR values ('AU17', N'Andrew Matthews')
INSERT into AUTHOR values ('AU18', N'Kim Eana')
INSERT into AUTHOR values ('AU19', N'Jane Ogden')
INSERT into AUTHOR values ('AU20', N'Margaret Robinson Rutherford')
INSERT into AUTHOR values ('AU21', N'Philippe Simon')
INSERT into AUTHOR values ('AU22', N'Nicolas Gouny')
INSERT into AUTHOR values ('AU23', N'Hồng Anh')
INSERT into AUTHOR values ('AU24', N'Aki')
INSERT into AUTHOR values ('AU25', N'Gia Linh')
INSERT into AUTHOR values ('AU26', N'An Nhiên')
INSERT into AUTHOR values ('AU27', N'Alex Frith')
INSERT into AUTHOR values ('AU28', N'Minna Lacey')
INSERT into AUTHOR values ('AU29', N'Jerome Martin')
INSERT into AUTHOR values ('AU30', N'Jonathan Melmoth')
INSERT into AUTHOR values ('AU31', N'Clint Emerson')
INSERT into AUTHOR values ('AU32', N'Ian Graham')
INSERT into AUTHOR values ('AU33', N'Trần Diệu Linh')
INSERT into AUTHOR values ('AU34', N'Trúc Nhi Hoàng')
INSERT into AUTHOR values ('AU35', N'Noel Streatfeild')
INSERT into AUTHOR values ('AU36', 'Osaka YWCA Children''s Library')
INSERT into AUTHOR values ('AU37', N'Ichio Otsuka')
INSERT into AUTHOR values ('AU38', N'Yuki Hayasako')
INSERT into AUTHOR values ('AU39', N'Miaki Sugaru')
INSERT into AUTHOR values ('AU40', N'Shion')
INSERT into AUTHOR values ('AU41', N'Yozora Fuyuno')
INSERT into AUTHOR values ('AU42', N'José Mauro de Vasconcelos')
INSERT into AUTHOR values ('AU43', N'Paulo Coelho')
INSERT into AUTHOR values ('AU44', N'James Norbury')
INSERT into AUTHOR values ('AU45', N'Hạ Mer')
INSERT into AUTHOR values ('AU46', N'Kim Ho Yeon')
INSERT into AUTHOR values ('AU47', N'Châu Sa Đáy Mắt')

-- ========== PUBLISHER ==========
INSERT into PUBLISHER values ('PB01', N'Kim Đồng')
INSERT into PUBLISHER values ('PB02', N'Dân Trí')
INSERT into PUBLISHER values ('PB03', N'Trẻ')
INSERT into PUBLISHER values ('PB04', N'Hồng Đức')
INSERT into PUBLISHER values ('PB05', N'Phụ Nữ')
INSERT into PUBLISHER values ('PB06', N'Thanh Niên')
INSERT into PUBLISHER values ('PB07', N'Thế Giới')
INSERT into PUBLISHER values ('PB08', N'Lao Động')
INSERT into PUBLISHER values ('PB09', N'Phụ Nữ Việt Nam')
INSERT into PUBLISHER values ('PB10', N'Văn Học')
INSERT into PUBLISHER values ('PB11', N'Hội Nhà Văn')

-- ========== BOOK ==========
INSERT into BOOK (BOOK_ID, CATE_ID, BOOK_NAME, BOOK_PRICE, BOOK_PATH, BOOK_FILENAME, AVG_RATING, COUNT_RATING, STOCK, DISCOUNTED_NUMBER, BOOK_DISCOUNTED_PRICE, SOFT_DELETE) values ('BK00001', 'CA02', N'Mèo Mốc Black Book - Tập 4', 45000, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690968058/hachiko/product/BK00001-1.jpg', 'hachiko/product/BK00001-1.jpg', 0, 0, 50, 15, 38250, 0)
INSERT into BOOK_DETAIL (BOOK_ID, PUB_ID, BOOK_FORMAT, PUBLISHED_YEAR, NUMBER_PAGE, BOOK_WEIGHT, BOOK_DESC) values ('BK00001', 'PB02', N'Bìa Mềm', 2023, 104, 120, N'Để mở rộng chiến dịch "Mốc hóa" thế giới của mình, anh Mèo Mốc lại tiếp tục cho ra đời cuốn "sách đen" thứ 4 trong series “Mèo Mốc Black Book”, hứa hẹn mang đến những câu chuyện "xàm xí" nhưng sẽ khiến bạn không thể ngừng cười!')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00001', 'AU04')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00001', 2, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00001-2.png', 'hachiko/product/BK00001-2.png')

INSERT into BOOK (BOOK_ID, CATE_ID, BOOK_NAME, BOOK_PRICE, BOOK_PATH, BOOK_FILENAME, AVG_RATING, COUNT_RATING, STOCK, DISCOUNTED_NUMBER, BOOK_DISCOUNTED_PRICE, SOFT_DELETE) values ('BK00002', 'CA02', N'Gia Đình Gãi Ngứa: Tuyển Tập Ký Ức Tuổi Thơ - Vẩn Vơ Hiện Tại', 110000, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690968058/hachiko/product/BK00002-1.jpg', 'hachiko/product/BK00002-1.jpg', 0, 0, 50, 10, 99000, 0)
INSERT into BOOK_DETAIL (BOOK_ID, PUB_ID, BOOK_FORMAT, PUBLISHED_YEAR, NUMBER_PAGE, BOOK_WEIGHT, BOOK_DESC) values ('BK00002', 'PB02', N'Bìa Mềm', 2023, 168, 220, N'“Gia Đình Gãi Ngứa” là một fanpage giải trí xoay quanh nhân vật chính là anh Zo, cùng những người bạn bè Đô, Phởn và người vợ tên Na. Đây là tuyển tập những câu chuyện về kỷ niệm xưa, những trang truyện vui vẻ thấm đượm tình người được độc giả yêu thích.
Vào thời điểm chưa có điện thoại thông minh, internet còn chưa phổ biến thì những trò chơi giải trí của trẻ con nhiều vô kể: nào tạt lon, nào trốn tìm, nào hình xăm dán nham nhở, nào ê hề đồ ăn vặt xanh đỏ đủ màu… Chưa kể nhiều trò chơi nghịch dại mà kết quả là những lằn “lươn” trên chân trên mông, nhưng sau đấy vẫn chứng nào tật đấy, vì “trẻ con mà”.
Từng trang truyện đưa độc giả về lại những ngày phơi rơm rạ ở quê, những tiếng ì ào sóng vỗ trong vỏ ốc, những buổi phá cỗ đêm rằm chạy giỡn dọc phố… Tuổi thơ ngây ngô vô tư là vậy, nào biết đến những nỗi lo cơm áo gạo tiền, nào biết đến những vất vả lo toan của bố của mẹ. Trẻ nhỏ thì muốn làm người lớn, còn người lớn đôi khi chỉ muốn quay về lại vùng trời tuổi nhỏ êm đềm vô lo.
“Gia Đình Gãi Ngứa: Tuyển tập ký ức tuổi thơ – vẩn vơ hiện tại” là một cuốn truyện tranh hài hước dí dỏm nhưng đong đầy tình cảm gia đình, bạn bè. Skycomics hi vọng cuốn sách này sẽ truyền cho bạn niềm vui, sự lạc quan yêu đời và thêm chút thư thái vào cuộc sống ngổn ngang bận rộn.')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00002', 'AU03')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00002', 2, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00002-2.png', 'hachiko/product/BK00002-2.png')

INSERT into BOOK (BOOK_ID, CATE_ID, BOOK_NAME, BOOK_PRICE, BOOK_PATH, BOOK_FILENAME, AVG_RATING, COUNT_RATING, STOCK, DISCOUNTED_NUMBER, BOOK_DISCOUNTED_PRICE, SOFT_DELETE) values ('BK00003', 'CA02', N'Asterix - Astérix Và Nữ Hoàng Cléopâtre (Tái Bản 2023)', 80000, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690968058/hachiko/product/BK00003-1.jpg', 'hachiko/product/BK00003-1.jpg', 0, 0, 50, 12, 70400, 0)
INSERT into BOOK_DETAIL (BOOK_ID, PUB_ID, BOOK_FORMAT, PUBLISHED_YEAR, NUMBER_PAGE, BOOK_WEIGHT, BOOK_DESC) values ('BK00003', 'PB01', N'Bìa Mềm', 2023, 56, 100, N'Nhận lời nhờ vả từ người bạn cũ của pháp sư Panoramix, Astérix và Obelix lên đường tới Ai Cập để giúp nữ hoàng Cléopâtre xây dựng cung điện cho César. Tiếc rằng, không phải ai cũng ủng hộ chuyến hành trình này.')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00003', 'AU01')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00003', 'AU02')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00003', 2, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00003-2.png', 'hachiko/product/BK00003-2.png')

INSERT into BOOK (BOOK_ID, CATE_ID, BOOK_NAME, BOOK_PRICE, BOOK_PATH, BOOK_FILENAME, AVG_RATING, COUNT_RATING, STOCK, DISCOUNTED_NUMBER, BOOK_DISCOUNTED_PRICE, SOFT_DELETE) values ('BK00004', 'CA03', N'Thám Tử Lừng Danh Conan - Tập 100 (Tái Bản 2023)', 25000, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690968058/hachiko/product/BK00004-1.jpg', 'hachiko/product/BK00004-1.jpg', 0, 0, 50, 5, 23750, 0)
INSERT into BOOK_DETAIL (BOOK_ID, PUB_ID, BOOK_FORMAT, PUBLISHED_YEAR, NUMBER_PAGE, BOOK_WEIGHT, BOOK_DESC) values ('BK00004', 'PB01', N'Bìa Mềm', 2023, 184, 200, N'Những thi thể không rõ danh tính liên tục được phát hiện… Thủ phạm là tổ chức Áo đen. Đối thủ là Gin, Vodka, Chianti, Korn, Vermouth, Kir, và RUM. Kết thúc cuộc đấu trí cân tài cân sức ấy, sự thật được đưa ra ánh sáng là…')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00004', 'AU06')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00004', 2, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00004-2.png', 'hachiko/product/BK00004-2.png')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00004', 3, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00004-3.png', 'hachiko/product/BK00004-3.png')

INSERT into BOOK (BOOK_ID, CATE_ID, BOOK_NAME, BOOK_PRICE, BOOK_PATH, BOOK_FILENAME, AVG_RATING, COUNT_RATING, STOCK, DISCOUNTED_NUMBER, BOOK_DISCOUNTED_PRICE, SOFT_DELETE) values ('BK00005', 'CA03', N'Dragon Ball Super - Tập 16: Chiến Binh Mạnh Nhất Vũ Trụ', 25000, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690968058/hachiko/product/BK00005-1.jpg', 'hachiko/product/BK00005-1.jpg', 0, 0, 50, 5, 23750, 0)
INSERT into BOOK_DETAIL (BOOK_ID, PUB_ID, BOOK_FORMAT, PUBLISHED_YEAR, NUMBER_PAGE, BOOK_WEIGHT, BOOK_DESC) values ('BK00005', 'PB01', N'Bìa Mềm', 2023, 192, 130, N'Granola là người hành tinh Cereal cuối cùng còn sống sau trận càn quét của Frieza và quân đội Saiya. Anh đã dùng ngọc rồng của hành tinh Cereal để thực hiện điều ước biến mình thành')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00005', 'AU07')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00005', 'AU08')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00005', 2, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00005-2.png', 'hachiko/product/BK00005-2.png')

INSERT into BOOK (BOOK_ID, CATE_ID, BOOK_NAME, BOOK_PRICE, BOOK_PATH, BOOK_FILENAME, AVG_RATING, COUNT_RATING, STOCK, DISCOUNTED_NUMBER, BOOK_DISCOUNTED_PRICE, SOFT_DELETE) values ('BK00006', 'CA03', N'Alice In Borderland - Tập 12', 35000, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690968058/hachiko/product/BK00006-1.jpg', 'hachiko/product/BK00006-1.jpg', 0, 0, 50, 12, 30800, 0)
INSERT into BOOK_DETAIL (BOOK_ID, PUB_ID, BOOK_FORMAT, PUBLISHED_YEAR, NUMBER_PAGE, BOOK_WEIGHT, BOOK_DESC) values ('BK00006', 'PB03', N'Bìa Mềm', 2023, 168, 167, N'Arisu Ryohei tự nhận mình là một thành phần “ăn hại xã hội”, học hành lẹt đẹt nên đang cực kỳ chán đời. Trong một lần tụ tập than vãn cùng hai thằng bạn thân Karube và Chota, cả ba bất chợt nhìn thấy pháo hoa, và sau đó là một vụ nổ long trời lở đất. Khi bụi đất lắng xuống, họ nhận ra mình đang ở trong một thế giới hoàn toàn khác.')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00006', 'AU09')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00006', 2, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00006-2.png', 'hachiko/product/BK00006-2.png')

INSERT into BOOK (BOOK_ID, CATE_ID, BOOK_NAME, BOOK_PRICE, BOOK_PATH, BOOK_FILENAME, AVG_RATING, COUNT_RATING, STOCK, DISCOUNTED_NUMBER, BOOK_DISCOUNTED_PRICE, SOFT_DELETE) values ('BK00007', 'CA05', N'Bài Học Cuộc Sống', 120000, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690968058/hachiko/product/BK00007-1.jpg', 'hachiko/product/BK00007-1.jpg', 0, 0, 50, 60, 48000, 0)
INSERT into BOOK_DETAIL (BOOK_ID, PUB_ID, BOOK_FORMAT, PUBLISHED_YEAR, NUMBER_PAGE, BOOK_WEIGHT, BOOK_DESC) values ('BK00007', 'PB02', N'Bìa Mềm', 2021, 280, 300, N'Bất kỳ ai trong chúng ta đều đã có lần tự mình đặt ra câu hỏi ấy. Dù là vô thức hay chủ ý, tất cả chúng ta đều đang cố gắng tìm kiếm câu trả lời, theo đuổi hành trình khám phá bản thân mình là ai và làm sao để thực sự hạnh phúc')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00007', 'AU10')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00007', 'AU11')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00007', 2, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00007-2.png', 'hachiko/product/BK00007-2.png')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00007', 3, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00007-3.png', 'hachiko/product/BK00007-3.png')

INSERT into BOOK (BOOK_ID, CATE_ID, BOOK_NAME, BOOK_PRICE, BOOK_PATH, BOOK_FILENAME, AVG_RATING, COUNT_RATING, STOCK, DISCOUNTED_NUMBER, BOOK_DISCOUNTED_PRICE, SOFT_DELETE) values ('BK00008', 'CA05', N'Bí Mật Tủ Khóa Số 89', 142000, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690968058/hachiko/product/BK00008-1.jpg', 'hachiko/product/BK00008-1.jpg', 0, 0, 50, 60, 56800, 0)
INSERT into BOOK_DETAIL (BOOK_ID, PUB_ID, BOOK_FORMAT, PUBLISHED_YEAR, NUMBER_PAGE, BOOK_WEIGHT, BOOK_DESC) values ('BK00008', 'PB02', N'Bìa Mềm', 2022, 448, 500, N'Nơi những bí mật thầm kín nhất được cất giấu, nơi tình yêu được lên tiếng, dù cho đó là thứ tình yêu bạn vẫn tưởng rằng nó không thể tồn tại. Việc bạn cần làm chỉ là viết một lá thư, trượt nó qua lỗ thông gió của tủ khóa rồi chờ đợi. Những lời khuyên tình yêu chân thành và thông thái nhất sẽ sớm đến với bạn thôi.')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00008', 'AU12')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00008', 2, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00008-2.png', 'hachiko/product/BK00008-2.png')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00008', 3, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00008-3.png', 'hachiko/product/BK00008-3.png')

INSERT into BOOK (BOOK_ID, CATE_ID, BOOK_NAME, BOOK_PRICE, BOOK_PATH, BOOK_FILENAME, AVG_RATING, COUNT_RATING, STOCK, DISCOUNTED_NUMBER, BOOK_DISCOUNTED_PRICE, SOFT_DELETE) values ('BK00009', 'CA05', N'Ngừng Phung Phí! Chi Tiêu Hợp Lý', 129000, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690968058/hachiko/product/BK00009-1.jpg', 'hachiko/product/BK00009-1.jpg', 0, 0, 50, 60, 51600, 0)
INSERT into BOOK_DETAIL (BOOK_ID, PUB_ID, BOOK_FORMAT, PUBLISHED_YEAR, NUMBER_PAGE, BOOK_WEIGHT, BOOK_DESC) values ('BK00009', 'PB07', N'Bìa Mềm', 2021, 288, 300, N'Vào năm 2013, khi Liesl Clark và Rebecca Rockfeller thành lập nhóm Facebook Dự án Không Mua Gì (Buy Nothing Project) đầu tiên ở một thị trấn nhỏ ngoài khơi Seattle, họ hẳn không thể ngờ rằng ý tưởng của họ lại trở thành một cơn sốt với mức độ lan truyền rộng rãi nhường ấy. Ngày nay, có hàng nghìn nhóm Không Mua Gì đang hoạt động đều đặn trên khắp thế giới, tự hào với hơn 1 triệu thành viên cùng 5000 tình nguyện viên tích cực.')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00009', 'AU13')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00009', 'AU14')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00009', 2, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00009-2.png', 'hachiko/product/BK00009-2.png')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00009', 3, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00009-3.png', 'hachiko/product/BK00009-3.png')

INSERT into BOOK (BOOK_ID, CATE_ID, BOOK_NAME, BOOK_PRICE, BOOK_PATH, BOOK_FILENAME, AVG_RATING, COUNT_RATING, STOCK, DISCOUNTED_NUMBER, BOOK_DISCOUNTED_PRICE, SOFT_DELETE) values ('BK00010', 'CA06', N'Cách Để Truyền Cảm Hứng', 56000, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690968058/hachiko/product/BK00010-1.jpg', 'hachiko/product/BK00010-1.jpg', 0, 0, 50, 15, 47600, 0)
INSERT into BOOK_DETAIL (BOOK_ID, PUB_ID, BOOK_FORMAT, PUBLISHED_YEAR, NUMBER_PAGE, BOOK_WEIGHT, BOOK_DESC) values ('BK00010', 'PB04', N'Bìa Mềm', 2020, 126, 110, N'Là bộ sách độc quyền Cách Để Trở Thành của Nhân Văn nói về những khía cạnh đa dạng của cuộc sống để có thể giúp chúng ta làm đẹp tâm hồn, tính cách con người không những cho chúng ta mà con những người xung quanh. ')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00010', 'AU15')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00010', 2, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00010-2.png', 'hachiko/product/BK00010-2.png')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00010', 3, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00010-3.png', 'hachiko/product/BK00010-3.png')

INSERT into BOOK (BOOK_ID, CATE_ID, BOOK_NAME, BOOK_PRICE, BOOK_PATH, BOOK_FILENAME, AVG_RATING, COUNT_RATING, STOCK, DISCOUNTED_NUMBER, BOOK_DISCOUNTED_PRICE, SOFT_DELETE) values ('BK00011', 'CA06', N'Cách Để Vượt Lên Chính Mình', 52000, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690968058/hachiko/product/BK00011-1.jpg', 'hachiko/product/BK00011-1.jpg', 0, 0, 50, 15, 44200, 0)
INSERT into BOOK_DETAIL (BOOK_ID, PUB_ID, BOOK_FORMAT, PUBLISHED_YEAR, NUMBER_PAGE, BOOK_WEIGHT, BOOK_DESC) values ('BK00011', 'PB04', N'Bìa Mềm', 2020, 95, 100, N'Là bộ sách độc quyền Cách Để Trở Thành của Nhân Văn nói về những khía cạnh đa dạng của cuộc sống để có thể giúp chúng ta làm đẹp tâm hồn, tính cách con người không những cho chúng ta mà con những người xung quanh. ')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00011', 'AU15')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00011', 2, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00011-2.png', 'hachiko/product/BK00011-2.png')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00011', 3, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00011-3.png', 'hachiko/product/BK00011-3.png')

INSERT into BOOK (BOOK_ID, CATE_ID, BOOK_NAME, BOOK_PRICE, BOOK_PATH, BOOK_FILENAME, AVG_RATING, COUNT_RATING, STOCK, DISCOUNTED_NUMBER, BOOK_DISCOUNTED_PRICE, SOFT_DELETE) values ('BK00012', 'CA06', N'Ngưng Bắt Nạt!', 82000, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690968058/hachiko/product/BK00012-1.jpg', 'hachiko/product/BK00012-1.jpg', 0, 0, 50, 43, 46740, 0)
INSERT into BOOK_DETAIL (BOOK_ID, PUB_ID, BOOK_FORMAT, PUBLISHED_YEAR, NUMBER_PAGE, BOOK_WEIGHT, BOOK_DESC) values ('BK00012', 'PB05', N'Bìa Mềm', 2019, 247, 250, N'NGƯNG BẮT NẠT! cho chúng ta biết :- Tại sao những kẻ bắt nạt lại đi bắt nạt- Tại sao những đứa trẻ bị bắt nạt lại không nói cho bố mẹ mình biết.- Cách những đứa trẻ bị bắt nạt có thể phản kháng lại.')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00012', 'AU16')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00012', 'AU17')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00012', 2, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00012-2.png', 'hachiko/product/BK00012-2.png')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00012', 3, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00012-3.png', 'hachiko/product/BK00012-3.png')

INSERT into BOOK (BOOK_ID, CATE_ID, BOOK_NAME, BOOK_PRICE, BOOK_PATH, BOOK_FILENAME, AVG_RATING, COUNT_RATING, STOCK, DISCOUNTED_NUMBER, BOOK_DISCOUNTED_PRICE, SOFT_DELETE) values ('BK00013', 'CA07', N'Giải Mã Từ Điển Cảm Xúc', 116000, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690968058/hachiko/product/BK00013-1.jpg', 'hachiko/product/BK00013-1.jpg', 0, 0, 50, 59, 47560, 0)
INSERT into BOOK_DETAIL (BOOK_ID, PUB_ID, BOOK_FORMAT, PUBLISHED_YEAR, NUMBER_PAGE, BOOK_WEIGHT, BOOK_DESC) values ('BK00013', 'PB06', N'Bìa Mềm', 2021, 208, 250, N'Mỗi ngày, chúng ta đều trải qua vô vàn cảm xúc khác nhau, và chính những điều ấy tạo nên ý nghĩa của một ngày. Song đôi khi, chúng ta băn khoăn không biết cảm xúc đó đến từ đâu, và vì sao mình lại cảm thấy như vậy. Những lúc như thế, chúng ta luôn cần một người để giải bày, hay đơn giản chỉ là đôi dòng chia sẻ của ai đó để hiểu thêm về những xúc cảm đang chất chứa trong lòng. Hy vọng, cuốn sách này có thể giúp bạn san sẻ phần nào nỗi băn khoăn, đồng thời mong bạn sẽ học được cách giải mã và thấu hiểu cảm xúc của chính mình.')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00013', 'AU18')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00013', 2, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00013-2.png', 'hachiko/product/BK00013-2.png')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00013', 3, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00013-3.png', 'hachiko/product/BK00013-3.png')

INSERT into BOOK (BOOK_ID, CATE_ID, BOOK_NAME, BOOK_PRICE, BOOK_PATH, BOOK_FILENAME, AVG_RATING, COUNT_RATING, STOCK, DISCOUNTED_NUMBER, BOOK_DISCOUNTED_PRICE, SOFT_DELETE) values ('BK00014', 'CA07', N'Tâm Lý Học Nói Gì Về Ăn Kiêng?', 84000, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690968058/hachiko/product/BK00014-1.jpg', 'hachiko/product/BK00014-1.jpg', 0, 0, 50, 47, 44520, 0)
INSERT into BOOK_DETAIL (BOOK_ID, PUB_ID, BOOK_FORMAT, PUBLISHED_YEAR, NUMBER_PAGE, BOOK_WEIGHT, BOOK_DESC) values ('BK00014', 'PB07', N'Bìa Mềm', 2022, 184, 250, N'Cuốn sách Tâm lý học nói gì về ăn kiêng? cung cấp một cái nhìn tổng quát và cân bằng về nguyên nhân của tình trạng thừa cân và những thách thức của việc ăn kiêng. Thông qua tìm hiểu những yếu tố kích hoạt nhận thức khiến chúng ta đánh giá sai lầm về thực phẩm, cuốn sách này đi sâu vào khám phá những phương pháp ăn kiêng hiệu quả. Nhờ khả năng nắm bắt tâm lý, chúng ta có thể thay đổi những hành vi thiếu lành mạnh và lấy lại vóc dáng chuẩn.')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00014', 'AU19')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00014', 2, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00014-2.png', 'hachiko/product/BK00014-2.png')

INSERT into BOOK (BOOK_ID, CATE_ID, BOOK_NAME, BOOK_PRICE, BOOK_PATH, BOOK_FILENAME, AVG_RATING, COUNT_RATING, STOCK, DISCOUNTED_NUMBER, BOOK_DISCOUNTED_PRICE, SOFT_DELETE) values ('BK00015', 'CA07', N'Trầm Cảm Ẩn', 110000, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690968058/hachiko/product/BK00015-1.jpg', 'hachiko/product/BK00015-1.jpg', 0, 0, 50, 40, 66000, 0)
INSERT into BOOK_DETAIL (BOOK_ID, PUB_ID, BOOK_FORMAT, PUBLISHED_YEAR, NUMBER_PAGE, BOOK_WEIGHT, BOOK_DESC) values ('BK00015', 'PB06', N'Bìa Mềm', 2022, 232, 450, N'“Brittany vô cùng lí trí và cực kì quy củ, nếu không nói là hơi cứng nhắc. Cô luôn bận rộn với những buổi tiệc tùng cùng bạn bè và người yêu. Cô thành công trong công việc. Cô thường xuyên vui vẻ và hài hước. Những gì Brittany cho phép người khác thấy đều rất hoàn hảo.')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00015', 'AU20')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00015', 2, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00015-2.png', 'hachiko/product/BK00015-2.png')

INSERT into BOOK (BOOK_ID, CATE_ID, BOOK_NAME, BOOK_PRICE, BOOK_PATH, BOOK_FILENAME, AVG_RATING, COUNT_RATING, STOCK, DISCOUNTED_NUMBER, BOOK_DISCOUNTED_PRICE, SOFT_DELETE) values ('BK00016', 'CA09', N'Biết Tuốt Về Đồ Ăn - Trứng', 45000, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690968058/hachiko/product/BK00016-1.jpg', 'hachiko/product/BK00016-1.jpg', 0, 0, 50, 15, 38250, 0)
INSERT into BOOK_DETAIL (BOOK_ID, PUB_ID, BOOK_FORMAT, PUBLISHED_YEAR, NUMBER_PAGE, BOOK_WEIGHT, BOOK_DESC) values ('BK00016', 'PB08', N'Bìa Mềm', 2018, 35, 80, N'Hầu như ngày nào chúng ta cũng ăn trứng: trứng ốp la, trứng luộc, trứng hấp, trứng bắc, trứng rán, canh trứng... Thậm chí khi ta ăn kem cháy hay bánh ga tô thì cũng đều có trứng hết đấy!')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00016', 'AU21')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00016', 'AU22')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00016', 2, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00016-2.png', 'hachiko/product/BK00016-2.png')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00016', 3, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00016-3.png', 'hachiko/product/BK00016-3.png')

INSERT into BOOK (BOOK_ID, CATE_ID, BOOK_NAME, BOOK_PRICE, BOOK_PATH, BOOK_FILENAME, AVG_RATING, COUNT_RATING, STOCK, DISCOUNTED_NUMBER, BOOK_DISCOUNTED_PRICE, SOFT_DELETE) values ('BK00017', 'CA09', N'Bé Làm Điều Tốt', 69000, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690968058/hachiko/product/BK00017-1.jpg', 'hachiko/product/BK00017-1.jpg', 0, 0, 50, 15, 58650, 0)
INSERT into BOOK_DETAIL (BOOK_ID, PUB_ID, BOOK_FORMAT, PUBLISHED_YEAR, NUMBER_PAGE, BOOK_WEIGHT, BOOK_DESC) values ('BK00017', 'PB06', N'Bìa Cứng', 2021, 12, 123, N'Cuốn sách được viết bằng tất cả tình yêu thương này sẽ là món quà vô cùng ngọt ngào dành tặng cho bé. Những lời thơ nhẹ nhàng, gần gũi cùng hình ảnh minh hoạ ngộ nghĩnh, đáng yêu của cuốn sách sẽ mang đến cho bé những bài học hay, giúp bé hình thành nhân cách và thói quen tốt.')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00017', 'AU23')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00017', 'AU24')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00017', 'AU25')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00017', 2, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00017-2.png', 'hachiko/product/BK00017-2.png')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00017', 3, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00017-3.png', 'hachiko/product/BK00017-3.png')

INSERT into BOOK (BOOK_ID, CATE_ID, BOOK_NAME, BOOK_PRICE, BOOK_PATH, BOOK_FILENAME, AVG_RATING, COUNT_RATING, STOCK, DISCOUNTED_NUMBER, BOOK_DISCOUNTED_PRICE, SOFT_DELETE) values ('BK00018', 'CA09', N'Mẹ Hỏi Con Đáp - Cuộc Sống Quanh Bé', 65000, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690968058/hachiko/product/BK00018-1.jpg', 'hachiko/product/BK00018-1.jpg', 0, 0, 50, 40, 39000, 0)
INSERT into BOOK_DETAIL (BOOK_ID, PUB_ID, BOOK_FORMAT, PUBLISHED_YEAR, NUMBER_PAGE, BOOK_WEIGHT, BOOK_DESC) values ('BK00018', 'PB09', N'Bìa Mềm', 2023, 66, 137, N'Thế giới quanh bé với vô vàn điều thú vị mà bé luôn muốn khám phá các bé hãy cùng mẹ lật ngược từng trang của bộ sách nhỏ xinh "mẹ hỏi con đáp " này để cùng tìm hiểu nhé')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00018', 'AU26')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00018', 2, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00018-2.png', 'hachiko/product/BK00018-2.png')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00018', 3, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00018-3.png', 'hachiko/product/BK00018-3.png')

INSERT into BOOK (BOOK_ID, CATE_ID, BOOK_NAME, BOOK_PRICE, BOOK_PATH, BOOK_FILENAME, AVG_RATING, COUNT_RATING, STOCK, DISCOUNTED_NUMBER, BOOK_DISCOUNTED_PRICE, SOFT_DELETE) values ('BK00019', 'CA10', N'100 Bí Ẩn Đáng Kinh Ngạc Về Khoa Học', 100000, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690968058/hachiko/product/BK00019-1.jpg', 'hachiko/product/BK00019-1.jpg', 0, 0, 50, 25, 75000, 0)
INSERT into BOOK_DETAIL (BOOK_ID, PUB_ID, BOOK_FORMAT, PUBLISHED_YEAR, NUMBER_PAGE, BOOK_WEIGHT, BOOK_DESC) values ('BK00019', 'PB07', N'Bìa Mềm', 2018, 127, 190, N'100 Bí Ẩn Đáng Kinh Ngạc Về Khoa Học (USBORNE - 100 Things To Know About Science) Gồm 4 chủ đề: Cơ thể, Khoa học, Vũ trụ và Thức ăn, bộ sách "100 bí ẩn đáng kinh ngạc" là bộ sách khoa học điển hình với những kiến thức chính xác và cô đọng dành cho trẻ.')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00019', 'AU27')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00019', 'AU28')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00019', 'AU29')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00019', 'AU30')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00019', 2, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00019-2.png', 'hachiko/product/BK00019-2.png')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00019', 3, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00019-3.png', 'hachiko/product/BK00019-3.png')

INSERT into BOOK (BOOK_ID, CATE_ID, BOOK_NAME, BOOK_PRICE, BOOK_PATH, BOOK_FILENAME, AVG_RATING, COUNT_RATING, STOCK, DISCOUNTED_NUMBER, BOOK_DISCOUNTED_PRICE, SOFT_DELETE) values ('BK00020', 'CA10', N'100 Kỹ Năng Sinh Tồn', 99000, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690968058/hachiko/product/BK00020-1.jpg', 'hachiko/product/BK00020-1.jpg', 0, 0, 50, 25, 74250, 0)
INSERT into BOOK_DETAIL (BOOK_ID, PUB_ID, BOOK_FORMAT, PUBLISHED_YEAR, NUMBER_PAGE, BOOK_WEIGHT, BOOK_DESC) values ('BK00020', 'PB06', N'Bìa Mềm', 2020, 272, 300, N'Bạn sẽ làm gì nếu như một ngày bị mắc kẹt giữa vùng lãnh thổ có dịch bệnh hoành hành, lạc ở nơi hoang dã, bị móc túi khi đi du lịch ở đất nước xa lạ, hay phải thoát ngay khỏi một vụ hỏa hoạn ở nhà cao tầng… ? Clint Emerson – một cựu Đặc vụ SEAL, lực lượng tác chiến đặc biệt của Hải quân Hoa Kỳ – muốn bạn có được sự chuẩn bị tốt nhất trong cuốn sách 100 kỹ năng sinh tồn này.')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00020', 'AU31')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00020', 2, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00020-2.png', 'hachiko/product/BK00020-2.png')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00020', 3, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00020-3.png', 'hachiko/product/BK00020-3.png')

INSERT into BOOK (BOOK_ID, CATE_ID, BOOK_NAME, BOOK_PRICE, BOOK_PATH, BOOK_FILENAME, AVG_RATING, COUNT_RATING, STOCK, DISCOUNTED_NUMBER, BOOK_DISCOUNTED_PRICE, SOFT_DELETE) values ('BK00021', 'CA10', N'Tìm Hiểu Về: Vũ Trụ', 105000, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690968058/hachiko/product/BK00021-1.jpg', 'hachiko/product/BK00021-1.jpg', 0, 0, 50, 15, 89250, 0)
INSERT into BOOK_DETAIL (BOOK_ID, PUB_ID, BOOK_FORMAT, PUBLISHED_YEAR, NUMBER_PAGE, BOOK_WEIGHT, BOOK_DESC) values ('BK00021', 'PB05', N'Bìa Cứng', 2018, 31, 100, N'Khi say sưa ngắm nhìn bầu trời đêm với những vì sao lấp lánh và vành đai tỏa sáng của dải ngân hà thì tức là chúng ta đang mới chỉ quan sát được một phần nhỏ của dải ngân hà. Thực ra, vũ trụ bao la và rộng lớn hơn rất nhiều so với những gì chúng ta biết và chứa đầy những bí ẩn. Các lỗ đen, các tinh vân rực sáng và các ngôi sao phát nổ là những câu hỏi lớn đối với chúng ta. Vũ trụ đã bắt đầu như thế nào? Tại sao nó lại giãn nở và trong tương lai, nó sẽ ra sao?')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00021', 'AU32')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00021', 2, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00021-2.png', 'hachiko/product/BK00021-2.png')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00021', 3, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00021-3.png', 'hachiko/product/BK00021-3.png')

INSERT into BOOK (BOOK_ID, CATE_ID, BOOK_NAME, BOOK_PRICE, BOOK_PATH, BOOK_FILENAME, AVG_RATING, COUNT_RATING, STOCK, DISCOUNTED_NUMBER, BOOK_DISCOUNTED_PRICE, SOFT_DELETE) values ('BK00022', 'CA11', N'Có Một Truyện Cổ Mới - Cóc Kiện Trời', 69000, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690968058/hachiko/product/BK00022-1.jpg', 'hachiko/product/BK00022-1.jpg', 0, 0, 50, 35, 44850, 0)
INSERT into BOOK_DETAIL (BOOK_ID, PUB_ID, BOOK_FORMAT, PUBLISHED_YEAR, NUMBER_PAGE, BOOK_WEIGHT, BOOK_DESC) values ('BK00022', 'PB08', N'Bìa Mềm', 2022, 44, 100, N'Bộ sách dễ thương về những câu chuyện cổ tích xưa được vẽ lại với hình minh hoạ mới, ẩn chứa những bài học ý nghĩa về cuộc sống, giúp bé có thêm kiến thức về thuở xa xưa. Bộ sách là tập hợp những câu chuyện cổ tích được lưu truyền theo thời gian, như kể về chuyện vì sao con cóc lại là cậu ông trời, về sự tích ếch ngồi đáy giếng,.. Sách trình bày khổ vuông xinh xắn, hình vẽ sinh động, ngôn từ trong sáng.')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00022', 'AU33')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00022', 'AU34')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00022', 2, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00022-2.png', 'hachiko/product/BK00022-2.png')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00022', 3, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00022-3.png', 'hachiko/product/BK00022-3.png')

INSERT into BOOK (BOOK_ID, CATE_ID, BOOK_NAME, BOOK_PRICE, BOOK_PATH, BOOK_FILENAME, AVG_RATING, COUNT_RATING, STOCK, DISCOUNTED_NUMBER, BOOK_DISCOUNTED_PRICE, SOFT_DELETE) values ('BK00023', 'CA11', N'Đôi Giày Sân Khấu', 145000, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690968058/hachiko/product/BK00023-1.jpg', 'hachiko/product/BK00023-1.jpg', 0, 0, 50, 55, 65250, 0)
INSERT into BOOK_DETAIL (BOOK_ID, PUB_ID, BOOK_FORMAT, PUBLISHED_YEAR, NUMBER_PAGE, BOOK_WEIGHT, BOOK_DESC) values ('BK00023', 'PB10', N'Bìa Mềm', 2021, 427, 460, N'"Sorrel, Mark và Holly là những đứa trẻ đã mồ côi mẹ, còn cha của các em là một lính hải quân và hiện đang mất tích trong khi chiến đấu. Các em được gửi đến sống với bà ngoại ở Luân Đôn. Sau khi đến Luân Đôn, bà ngoại đã ghi danh cho các em được vào học tại Học viện Đào tạo Sân khấu và Biểu diễn Khiêu vũ Thiếu nhi, cũng chính là Học viện đã giúp chị em nhà Fossil trong cuốn Đôi giày Ba-lê trở nên nổi tiếng.')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00023', 'AU35')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00023', 2, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00023-2.png', 'hachiko/product/BK00023-2.png')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00023', 3, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00023-3.png', 'hachiko/product/BK00023-3.png')

INSERT into BOOK (BOOK_ID, CATE_ID, BOOK_NAME, BOOK_PRICE, BOOK_PATH, BOOK_FILENAME, AVG_RATING, COUNT_RATING, STOCK, DISCOUNTED_NUMBER, BOOK_DISCOUNTED_PRICE, SOFT_DELETE) values ('BK00024', 'CA11', N'Ehon - Ăn Cơm Nào!', 108000, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690968058/hachiko/product/BK00024-1.jpg', 'hachiko/product/BK00024-1.jpg', 0, 0, 50, 30, 75600, 0)
INSERT into BOOK_DETAIL (BOOK_ID, PUB_ID, BOOK_FORMAT, PUBLISHED_YEAR, NUMBER_PAGE, BOOK_WEIGHT, BOOK_DESC) values ('BK00024', 'PB07', N'Bìa Mềm', 2022, NULL, 55, N'Bộ sách đơn giản, dễ hiểu đồng hành cùng bé yêu học hỏi những kỹ năng sống hàng ngày. Bữa cơm sẽ có các món gì nhỉ? Với màu sắc tươi sáng, hình minh họa dễ thương và câu từ ngắn gọn giúp bé phát triển ngôn ngữ, chắc chắn đây sẽ là bộ sách không thể thiếu trong tủ sách của bé.')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00024', 'AU36')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00024', 'AU37')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00024', 2, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00024-2.png', 'hachiko/product/BK00024-2.png')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00024', 3, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00024-3.png', 'hachiko/product/BK00024-3.png')

INSERT into BOOK (BOOK_ID, CATE_ID, BOOK_NAME, BOOK_PRICE, BOOK_PATH, BOOK_FILENAME, AVG_RATING, COUNT_RATING, STOCK, DISCOUNTED_NUMBER, BOOK_DISCOUNTED_PRICE, SOFT_DELETE) values ('BK00025', 'CA13', N'Cho Tới Khi Em Yêu Anh Thêm Lần Nữa', 129000, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690968058/hachiko/product/BK00025-1.jpg', 'hachiko/product/BK00025-1.jpg', 0, 0, 50, 15, 109650, 0)
INSERT into BOOK_DETAIL (BOOK_ID, PUB_ID, BOOK_FORMAT, PUBLISHED_YEAR, NUMBER_PAGE, BOOK_WEIGHT, BOOK_DESC) values ('BK00025', 'PB02', N'Bìa Mềm', 2022, 360, 400, N'Trong ngày lễ Giáng sinh năm lớp Mười, Tsukishima đã vô tình chứng kiến cảnh ​​người bạn cùng lớp Fujikura, cũng là chàng trai cô yêu thầm bấy lâu ôm một cô gái khác. Vì muốn được ở gần Fujikura, cô đã phải nỗ lực học hành ngày đêm để có thể thi đỗ vào cùng trường với cậu ấy, vậy mà…')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00025', 'AU38')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00025', 2, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00025-2.png', 'hachiko/product/BK00025-2.png')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00025', 3, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00025-3.png', 'hachiko/product/BK00025-3.png')

INSERT into BOOK (BOOK_ID, CATE_ID, BOOK_NAME, BOOK_PRICE, BOOK_PATH, BOOK_FILENAME, AVG_RATING, COUNT_RATING, STOCK, DISCOUNTED_NUMBER, BOOK_DISCOUNTED_PRICE, SOFT_DELETE) values ('BK00026', 'CA13', N'Ký Sinh Trùng Biết Yêu', 120000, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690968058/hachiko/product/BK00026-1.jpg', 'hachiko/product/BK00026-1.jpg', 0, 0, 50, 15, 102000, 0)
INSERT into BOOK_DETAIL (BOOK_ID, PUB_ID, BOOK_FORMAT, PUBLISHED_YEAR, NUMBER_PAGE, BOOK_WEIGHT, BOOK_DESC) values ('BK00026', 'PB04', N'Bìa Mềm', 2023, 317, 280, N'“Anh Kosaka này, anh đã bao giờ nghĩ thế này chưa? Rằng mình sẽ chết đi trong khi chưa đem lòng yêu ai. Rằng sẽ chẳng ai khóc thương khi mình ra đi cả.” Chàng trai thất nghiệp Kosaka Kengo và cô nữ sinh bỏ học Sanagi Hijiri đã phải lòng nhau trong quá trình cùng điều trị phục hồi chức năng nhằm tái hòa nhập cộng đồng.')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00026', 'AU39')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00026', 'AU40')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00026', 2, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00026-2.png', 'hachiko/product/BK00026-2.png')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00026', 3, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00026-3.png', 'hachiko/product/BK00026-3.png')

INSERT into BOOK (BOOK_ID, CATE_ID, BOOK_NAME, BOOK_PRICE, BOOK_PATH, BOOK_FILENAME, AVG_RATING, COUNT_RATING, STOCK, DISCOUNTED_NUMBER, BOOK_DISCOUNTED_PRICE, SOFT_DELETE) values ('BK00027', 'CA13', N'Mình Sẽ Tìm Cậu Vào Đêm Trăng Rằm', 109000, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690968058/hachiko/product/BK00027-1.jpg', 'hachiko/product/BK00027-1.jpg', 0, 0, 50, 20, 87200, 0)
INSERT into BOOK_DETAIL (BOOK_ID, PUB_ID, BOOK_FORMAT, PUBLISHED_YEAR, NUMBER_PAGE, BOOK_WEIGHT, BOOK_DESC) values ('BK00027', 'PB07', N'Bìa Mềm', 2023, 248, 300, N'Từ ngày không còn cha mẹ ở bên, tôi đã trở nên vô cảm với thế giới này. Mỗi ngày tôi đều say mê vẽ tranh, nhưng các bức tranh của tôi chỉ là tranh đen trắng, hoàn toàn không có một chút sắc màu. Bỗng một ngày có một người con gái rất đẹp, mang theo bầu không khí kỳ lạ xuất hiện. Dáng vẻ cô ấy lặng yên mỉm cười trước bức tranh mà tôi vẽ khiến tôi dần dần bị thu hút. Tuy nhiên thế giới trong mắt cô ấy đã hoàn toàn mất đi mọi màu sắc, thêm nữa số phận của cô ấy còn được định sẵn là “Càng hạnh phúc, cái chết sẽ càng cận kề”.')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00027', 'AU41')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00027', 2, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00027-2.png', 'hachiko/product/BK00027-2.png')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00027', 3, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00027-3.png', 'hachiko/product/BK00027-3.png')

INSERT into BOOK (BOOK_ID, CATE_ID, BOOK_NAME, BOOK_PRICE, BOOK_PATH, BOOK_FILENAME, AVG_RATING, COUNT_RATING, STOCK, DISCOUNTED_NUMBER, BOOK_DISCOUNTED_PRICE, SOFT_DELETE) values ('BK00028', 'CA14', N'Cây Cam Ngọt Của Tôi', 108000, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690968058/hachiko/product/BK00028-1.jpg', 'hachiko/product/BK00028-1.jpg', 0, 0, 50, 30, 75600, 0)
INSERT into BOOK_DETAIL (BOOK_ID, PUB_ID, BOOK_FORMAT, PUBLISHED_YEAR, NUMBER_PAGE, BOOK_WEIGHT, BOOK_DESC) values ('BK00028', 'PB11', N'Bìa Mềm', 2020, 244, 280, N'Hãy làm quen với Zezé, cậu bé tinh nghịch siêu hạng đồng thời cũng đáng yêu bậc nhất, với ước mơ lớn lên trở thành nhà thơ cổ thắt nơ bướm. Chẳng phải ai cũng công nhận khoản “đáng yêu” kia đâu nhé. Bởi vì, ở cái xóm ngoại ô nghèo ấy, nỗi khắc khổ bủa vây đã che mờ mắt người ta trước trái tim thiện lương cùng trí tưởng tượng tuyệt vời của cậu bé con năm tuổi.')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00028', 'AU42')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00028', 2, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00028-2.png', 'hachiko/product/BK00028-2.png')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00028', 3, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00028-3.png', 'hachiko/product/BK00028-3.png')

INSERT into BOOK (BOOK_ID, CATE_ID, BOOK_NAME, BOOK_PRICE, BOOK_PATH, BOOK_FILENAME, AVG_RATING, COUNT_RATING, STOCK, DISCOUNTED_NUMBER, BOOK_DISCOUNTED_PRICE, SOFT_DELETE) values ('BK00029', 'CA14', N'Nhà Giả Kim (Tái Bản 2020)', 79000, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690968058/hachiko/product/BK00029-1.jpg', 'hachiko/product/BK00029-1.jpg', 0, 0, 50, 20, 63200, 0)
INSERT into BOOK_DETAIL (BOOK_ID, PUB_ID, BOOK_FORMAT, PUBLISHED_YEAR, NUMBER_PAGE, BOOK_WEIGHT, BOOK_DESC) values ('BK00029', 'PB11', N'Bìa Mềm', 2020, 227, 220, N'Tiểu thuyết Nhà giả kim của Paulo Coelho như một câu chuyện cổ tích giản dị, nhân ái, giàu chất thơ, thấm đẫm những minh triết huyền bí của phương Đông. Trong lần xuất bản đầu tiên tại Brazil vào năm 1988, sách chỉ bán được 900 bản. Nhưng, với số phận đặc biệt của cuốn sách dành cho toàn nhân loại, vượt ra ngoài biên giới quốc gia, Nhà giả kim đã làm rung động hàng triệu tâm hồn, trở thành một trong những cuốn sách bán chạy nhất mọi thời đại, và có thể làm thay đổi cuộc đời người đọc.')
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00029', 'AU43')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00029', 2, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00029-2.png', 'hachiko/product/BK00029-2.png')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00029', 3, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00029-3.png', 'hachiko/product/BK00029-3.png')

INSERT into BOOK (BOOK_ID, CATE_ID, BOOK_NAME, BOOK_PRICE, BOOK_PATH, BOOK_FILENAME, AVG_RATING, COUNT_RATING, STOCK, DISCOUNTED_NUMBER, BOOK_DISCOUNTED_PRICE, SOFT_DELETE) values ('BK00030', 'CA14', N'Cửa Hàng Tiện Lợi Bất Tiện', 139000, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690968058/hachiko/product/BK00030-1.jpg', 'hachiko/product/BK00030-1.jpg', 0, 0, 50, 15, 118150, 0)
INSERT into BOOK_DETAIL (BOOK_ID, PUB_ID, BOOK_FORMAT, PUBLISHED_YEAR, NUMBER_PAGE, BOOK_WEIGHT) values ('BK00030', 'PB02', N'Bìa Mềm', 2022, 300, 350)
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00030', 'AU46')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00030', 2, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00030-2.png', 'hachiko/product/BK00030-2.png')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00030', 3, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00030-3.png', 'hachiko/product/BK00030-3.png')

INSERT into BOOK (BOOK_ID, CATE_ID, BOOK_NAME, BOOK_PRICE, BOOK_PATH, BOOK_FILENAME, AVG_RATING, COUNT_RATING, STOCK, DISCOUNTED_NUMBER, BOOK_DISCOUNTED_PRICE, SOFT_DELETE) values ('BK00031', 'CA15', N'Đám Trẻ Ở Đại Dương Đen', 99000, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690968058/hachiko/product/BK00031-1.jpg', 'hachiko/product/BK00031-1.jpg', 0, 0, 50, 30, 69300, 0)
INSERT into BOOK_DETAIL (BOOK_ID, PUB_ID, BOOK_FORMAT, PUBLISHED_YEAR, NUMBER_PAGE, BOOK_WEIGHT) values ('BK00031', 'PB07', N'Bìa Mềm', 2023, 280, 300)
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00031', 'AU47')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00031', 2, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00031-2.png', 'hachiko/product/BK00031-2.png')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00031', 3, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00031-3.png', 'hachiko/product/BK00031-3.png')

INSERT into BOOK (BOOK_ID, CATE_ID, BOOK_NAME, BOOK_PRICE, BOOK_PATH, BOOK_FILENAME, AVG_RATING, COUNT_RATING, STOCK, DISCOUNTED_NUMBER, BOOK_DISCOUNTED_PRICE, SOFT_DELETE) values ('BK00032', 'CA15', N'Gấu Trúc Lớn Và Rồng Tí Hon', 108000, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690968058/hachiko/product/BK00032-1.jpg', 'hachiko/product/BK00032-1.jpg', 0, 0, 50, 10, 97200, 0)
INSERT into BOOK_DETAIL (BOOK_ID, PUB_ID, BOOK_FORMAT, PUBLISHED_YEAR, NUMBER_PAGE, BOOK_WEIGHT) values ('BK00032', 'PB06', N'Bìa Mềm', 2023, 160, 180)
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00032', 'AU44')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00032', 2, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00032-2.png', 'hachiko/product/BK00032-2.png')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00032', 3, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00032-3.png', 'hachiko/product/BK00032-3.png')

INSERT into BOOK (BOOK_ID, CATE_ID, BOOK_NAME, BOOK_PRICE, BOOK_PATH, BOOK_FILENAME, AVG_RATING, COUNT_RATING, STOCK, DISCOUNTED_NUMBER, BOOK_DISCOUNTED_PRICE, SOFT_DELETE) values ('BK00033', 'CA15', N'Mẹ Làm Gì Có Ước Mơ', 89000, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690968058/hachiko/product/BK00033-1.jpg', 'hachiko/product/BK00033-1.jpg', 0, 0, 50, 15, 75650, 0)
INSERT into BOOK_DETAIL (BOOK_ID, PUB_ID, BOOK_FORMAT, PUBLISHED_YEAR, NUMBER_PAGE, BOOK_WEIGHT) values ('BK00033', 'PB10', N'Bìa Mềm', 2023, 208, 190)
INSERT into WRITTEN_BY (BOOK_ID, AUTHOR_ID) values ('BK00033', 'AU45')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00033', 2, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00033-2.png', 'hachiko/product/BK00033-2.png')
INSERT into BOOK_IMAGES (BOOK_ID, IMAGE_ID, BOOK_PATH, BOOK_FILENAME) values ('BK00033', 3, 'https://res.cloudinary.com/dsbuw9oyz/image/upload/v1690970158/hachiko/product/BK00033-3.png', 'hachiko/product/BK00033-3.png')

-- ========== ACCOUNT ==========
-- insert INTO ACCOUNT (EMAIL, phone_number) values ('khoi', '0918628528')
-- insert INTO ACCOUNT (EMAIL, phone_number) values ('khoi2', '0918628528')

-- ========== VOUCHER TYPE ==========
INSERT into VOUCHER_TYPE (VOUCHER_TYPE_ID, VOUCHER_TYPE) values ('VT01', N'Ship')
INSERT into VOUCHER_TYPE (VOUCHER_TYPE_ID, VOUCHER_TYPE) values ('VT02', N'Hachiko')

-- ========== VOUCHER ==========
INSERT into VOUCHER (VOUCHER_ID, VOUCHER_TYPE_ID, STARTED_DATE, END_DATE, MAXIMUM_AMOUNT, REMAINING_AMOUNT, MINIMUM_PRICE, PERCENTAGE_DISCOUNT, MAXIMUM_DISCOUNT_PRICE) 
    VALUES ('VC00001', 'VT01', '2023-8-16', '2023-12-12', 50, 50, 50000, Null, 50000)
INSERT into VOUCHER (VOUCHER_ID, VOUCHER_TYPE_ID, STARTED_DATE, END_DATE, MAXIMUM_AMOUNT, REMAINING_AMOUNT, MINIMUM_PRICE, PERCENTAGE_DISCOUNT, MAXIMUM_DISCOUNT_PRICE) 
    VALUES ('VC00002', 'VT01', '2023-8-16', '2023-12-12', 50, 50, 100000, Null, 80000)
INSERT into VOUCHER (VOUCHER_ID, VOUCHER_TYPE_ID, STARTED_DATE, END_DATE, MAXIMUM_AMOUNT, REMAINING_AMOUNT, MINIMUM_PRICE, PERCENTAGE_DISCOUNT, MAXIMUM_DISCOUNT_PRICE) 
    VALUES ('VC00003', 'VT02', '2023-8-16', '2023-12-12', 50, 50, 100000, 30, 80000)
INSERT into VOUCHER (VOUCHER_ID, VOUCHER_TYPE_ID, STARTED_DATE, END_DATE, MAXIMUM_AMOUNT, REMAINING_AMOUNT, MINIMUM_PRICE, PERCENTAGE_DISCOUNT, MAXIMUM_DISCOUNT_PRICE) 
    VALUES ('VC00004', 'VT02', '2023-8-16', '2023-12-12', 50, 50, 200000, 40, 120000)