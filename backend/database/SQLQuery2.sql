select top 10 * from SalesLT.Customer
USE DB_Hachiko
SELECT COLUMN_NAME
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'h_ORDER';

select * from district;

GO
IF OBJECT_ID('sp_Test') IS NOT NULL
	DROP PROC sp_Test
GO
CREATE PROCEDURE sp_Test
	@MaDT CHAR(6),
	@Ma char(6) OUT
AS
BEGIN TRANSACTION
	BEGIN TRY
		set @Ma = 'Khoi22'
		PRINT(100)
		IF 1 = 1
		BEGIN
			PRINT N'Số lượng không hợp lệ'
			ROLLBACK TRAN
			RETURN -10
		END
	END TRY

	BEGIN CATCH
		PRINT N'Bị lỗi'
		ROLLBACK TRANSACTION 
		RETURN 0
	END CATCH
COMMIT TRANSACTION
RETURN 1
GO

declare @k char(6)
declare @i int
exec @i = sp_Test 'Khoi', @k out
print(@i)
print(@k)

select * from AUTHOR

insert into AUTHOR values('AUT001', N'Nhà xuất bản Kim Đồng')
insert into AUTHOR values('AUT002', N'Nhà xuất bản Nhã Nam')
insert into AUTHOR values('AUT003', N'Nhà xuất bản Sự Thật')

-- select b.*, c.CATE_NAME from BOOK b join CATEGORY c on c.CATE_ID = b.CATE_ID where BOOK_ID = 'BK00033'
-- select b.*, p.PUB_NAME from BOOK_DETAIL b join PUBLISHER p on b.PUB_ID = p.PUB_ID where BOOK_ID = 'BK00033'
-- select * from BOOK_IMAGES where BOOK_ID = 'BK00033'
-- select b.BOOK_NAME, a.AUTHOR_NAME from BOOK b join WRITTEN_BY w on b.BOOK_ID = w.BOOK_ID join AUTHOR a on a.AUTHOR_ID = w.AUTHOR_ID where b.BOOK_ID = 'BK00033'

select * from CATEGORY
select * from PUBLISHER
select * from AUTHOR
SELECT * from BOOK_DETAIL
select b.*, d.BOOK_DESC, d. from BOOK b join BOOK_DETAIL d on d.BOOK_ID = b.BOOK_ID order by BOOK_DISCOUNTED_PRICE desc OFFSET 24 ROWS FETCH NEXT 12 ROWS ONLY