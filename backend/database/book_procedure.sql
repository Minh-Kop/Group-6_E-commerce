-- init: 0
-- pending: 1
-- cancel: -1
-- shipping: 2
-- success: 3
-- refunding: -2
-- refunded: -3
IF OBJECT_ID('f_GetSoldNumber') IS NOT NULL
	DROP FUNCTION f_GetSoldNumber
GO
CREATE FUNCTION f_GetSoldNumber (@BookId CHAR(7))
RETURNS int
AS
BEGIN
    DECLARE @sold_number int = 0;
	set @sold_number = (select sum(od.ORDER_QUANTITY)
						from order_detail od join order_state os on os.order_id = od.ORDER_ID
						where od.book_id = @BookId and os.order_state = 3
						group by od.BOOK_ID)
    RETURN @sold_number;
END;
go

IF OBJECT_ID('sp_GetAuthors') IS NOT NULL
	DROP proc sp_GetAuthors
GO
CREATE proc sp_GetAuthors (@BookId CHAR(7))
AS
BEGIN
    select a.AUTHOR_NAME 
	from WRITTEN_BY w join AUTHOR a on a.AUTHOR_ID = w.AUTHOR_ID
	where w.BOOK_ID = @BookId
END;
go

GO
IF OBJECT_ID('sp_GetBook') IS NOT NULL
	DROP PROC sp_GetBook
GO
CREATE PROCEDURE sp_GetBook
	@BookId CHAR(7)
AS
BEGIN TRANSACTION
	BEGIN TRY
		if not exists(select 1 from BOOK where BOOK_ID = @BookId)
		BEGIN
			PRINT N'Book ID isn''t valid!'
			ROLLBACK TRAN
			RETURN -1
		END
		
		select [b].[BOOK_ID], [b].[CATE_ID], [b].[BOOK_NAME], [b].[BOOK_PRICE], [b].[BOOK_PATH], [b].[AVG_RATING], 
			[b].[COUNT_RATING], [b].[STOCK], [b].[DISCOUNTED_NUMBER], [b].[BOOK_DISCOUNTED_PRICE],
			p.PUB_NAME, [bd].[BOOK_FORMAT], [bd].[PUBLISHED_YEAR], [bd].[NUMBER_PAGE], [bd].[BOOK_WEIGHT], [bd].[BOOK_DESC],
			dbo.f_GetSoldNumber(b.BOOK_ID) as 'Sold_number'
		from BOOK b join BOOK_DETAIL bd on bd.BOOK_ID = b.BOOK_ID
			join PUBLISHER p on p.PUB_ID = bd.PUB_ID
		where b.BOOK_ID = @BookId
	END TRY

	BEGIN CATCH
		PRINT N'Bị lỗi'
		ROLLBACK TRANSACTION 
		RETURN 0
	END CATCH
COMMIT TRANSACTION
RETURN 1
GO

declare @k char(7) = 'BK00001'
declare @i int
exec @i = sp_GetBook @k
print(@i)

select * from book
select * from BOOK b where b.DISCOUNTED_NUMBER = 12

insert into account (EMAIL) values ('khoi@gmail.com')
insert into shipping_address (ADDR_ID, EMAIL, DIST_ID, WARD_ID, PROV_ID, DETAILED_ADDR) values 
	('ADDR000001', 'khoi@gmail.com', 'DT0005', 'WD000001', 'PR01', N'225 Nguyễn Văn Cừ')
insert into H_ORDER (ORDER_ID, EMAIL, addr_id, PAYMENT_ID) values ('OD001', 'khoi@gmail.com', 'ADDR000001', 'PY01')
insert into H_ORDER (ORDER_ID, EMAIL, addr_id, PAYMENT_ID) values ('OD002', 'khoi@gmail.com', 'ADDR000001', 'PY01')
insert into ORDER_detail (ORDER_ID, BOOK_ID, ORDER_QUANTITY, ORDER_PRICE) values ('OD001', 'BK00001', 6, 120000)
insert into ORDER_detail (ORDER_ID, BOOK_ID, ORDER_QUANTITY, ORDER_PRICE) values ('OD002', 'BK00001', 6, 120000)
insert into order_state (ORDER_ID, ORDER_STATE) values ('OD001', 3)
insert into order_state (ORDER_ID, ORDER_STATE) values ('OD002', 3)

select * from H_ORDER
select * from order_detail
select * from order_state
