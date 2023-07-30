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