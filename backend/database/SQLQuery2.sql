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