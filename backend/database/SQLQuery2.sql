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

select dbo.f_CreateAuthorId()

GO
DELETE from BOOK_IMAGES where BOOK_ID = 'BK00034'
go
delete from WRITTEN_BY where BOOK_ID = 'BK00034'
go
delete from BOOK_DETAIL where BOOK_ID = 'BK00034'
go
delete from BOOK where BOOK_ID = 'BK00034'

select * from BOOK where BOOK_ID = 'BK00034'
select * from BOOK_DETAIL where BOOK_ID = 'BK00034'
select w.*, a.AUTHOR_NAME from WRITTEN_BY w join AUTHOR a on w.AUTHOR_ID = a.AUTHOR_ID where BOOK_ID = 'BK00034'
SELECT * from BOOK_IMAGES where BOOK_ID = 'BK00034'

select * from WRITTEN_BY where BOOK_ID = 'BK00034'

delete from WRITTEN_BY where BOOK_ID = 'BK00034' AND (AUTHOR_ID = 'AU41' or AUTHOR_ID = 'AU42')

insert into WRITTEN_BY (BOOK_ID, AUTHOR_ID) VALUES ('BK00034', 'AU41')
insert into WRITTEN_BY (BOOK_ID, AUTHOR_ID) VALUES ('BK00034', 'AU42')
insert into WRITTEN_BY (BOOK_ID, AUTHOR_ID) VALUES ('BK00034', 'AU43')

DECLARE @d int = 99000 * (1 - 33/100.0)
PRINT @d

update BOOK set DISCOUNTED_NUMBER = 55 where BOOK_ID = 'BK00034'
update BOOK set BOOK_PRICE = 35000 where BOOK_ID = 'BK00034'
go
select BOOK_PRICE, DISCOUNTED_NUMBER, BOOK_DISCOUNTED_PRICE from BOOK where BOOK_ID = 'BK00034'