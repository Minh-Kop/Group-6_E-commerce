go
IF OBJECT_ID('f_CreateOrderId') IS NOT NULL
	DROP FUNCTION f_CreateOrderId
GO
CREATE FUNCTION f_CreateOrderId()
returns CHAR(7)
    BEGIN
        DECLARE @i INT = 1
        DECLARE @id char(7) = 'OD00001'
        WHILE(EXISTS(SELECT 1
                    FROM H_ORDER
                    WHERE ORDER_ID = @id))
        BEGIN
            SET @i += 1
            SET @id = 'OD' + REPLICATE('0', 5 - LEN(@i)) + CAST(@i AS CHAR(5))
        END
        return @id
    END
GO

GO
IF OBJECT_ID('sp_CreateOrder') IS NOT NULL
	DROP PROC sp_CreateOrder
GO
CREATE PROCEDURE sp_CreateOrder (
    @email NVARCHAR(100),
    @addrId CHAR(10),
    @merchandiseSubtotal int,
    @shippingFee int
)
AS
BEGIN TRANSACTION
	BEGIN TRY
        DECLARE @id char(7) = dbo.f_CreateOrderId()
        INSERT into H_ORDER (ORDER_ID, EMAIL, ADDR_ID, PAYMENT_ID, MERCHANDISE_SUBTOTAL, SHIPPING_FEE, ORDER_TOTAL__) values 
            (@id, @email, @addrId, 'PY05', @merchandiseSubtotal, @shippingFee, @merchandiseSubtotal + @shippingFee)
        INSERT into ORDER_STATE (ORDER_ID, ORDER_STATE, CREATED_TIME) values (@id, 0, GETDATE())

        select @id orderId
	END TRY

	BEGIN CATCH
		PRINT N'Bị lỗi'
		ROLLBACK 
		RETURN 0
	END CATCH
COMMIT
RETURN 1
GO

GO
IF OBJECT_ID('sp_CreateOrderDetail') IS NOT NULL
	DROP PROC sp_CreateOrderDetail
GO
CREATE PROCEDURE sp_CreateOrderDetail (
    @orderId CHAR(7),
    @bookId CHAR(7),
    @quantity int,
    @price int
)
AS
BEGIN TRANSACTION
	BEGIN TRY
        if @quantity > (select STOCK
                        from BOOK
                        where BOOK_ID = @bookId)
        BEGIN
            PRINT N'Quantity exceeds stock.'
            ROLLBACK 
            RETURN -1
        END

        INSERT into ORDER_DETAIL (ORDER_ID, BOOK_ID, ORDER_QUANTITY, ORDER_PRICE) VALUES (@orderId, @bookId, @quantity, @price)
	END TRY

	BEGIN CATCH
		PRINT N'Bị lỗi'
		ROLLBACK 
		RETURN 0
	END CATCH
COMMIT
RETURN 1
GO

GO
IF OBJECT_ID('sp_GetInitialOrder') IS NOT NULL
	DROP PROC sp_GetInitialOrder
GO
CREATE PROCEDURE sp_GetInitialOrder (
    @orderId CHAR(7)
)
AS
BEGIN TRANSACTION
	BEGIN TRY
        select sa.ADDR_ID addrId, sa.RECEIVER_NAME fullName, sa.RECEIVER_PHONE_NUMBER phoneNumber, 
            sa.DETAILED_ADDR + ', ' + w.WARD_NAME + ', ' + d.DIST_NAME + ', ' + p.PROV_NAME detailedAddress
        from SHIPPING_ADDRESS sa join WARD w on w.WARD_ID = sa.WARD_ID
            join DISTRICT d on d.DIST_ID = sa.DIST_ID
            join PROVINCE p on p.PROV_ID = sa.PROV_ID
        where sa.ADDR_ID = (select ADDR_ID from H_ORDER where ORDER_ID = @orderId)

        SELECT od.BOOK_ID bookId, b.BOOK_NAME bookName, b.BOOK_PATH bookImage, b.BOOK_DISCOUNTED_PRICE unitPrice,
            od.ORDER_QUANTITY amount, od.ORDER_PRICE itemSubtotal
        from ORDER_DETAIL od join BOOK b on od.BOOK_ID = b.BOOK_ID
        where od.ORDER_ID = @orderId 
        
        select [ORDER_ID] orderId, o.[PAYMENT_ID] paymentId, p.PAYMENT_PROVIDER paymentProvider,
            [MERCHANDISE_SUBTOTAL] merchandiseSubtotal, [SHIPPING_FEE] shippingFee, 
            [SHIPPING_DISCOUNT_SUBTOTAL] shippingDiscountSubtotal, [HACHIKO_VOUCHER_APPLIED] hachikoVoucherApplied, 
            [ORDER_TOTAL__] totalPayment
        from H_ORDER o join PAYMENT p on o.PAYMENT_ID = p.PAYMENT_ID 
        where ORDER_ID = @orderId
	END TRY

	BEGIN CATCH
		PRINT N'Bị lỗi'
		ROLLBACK 
		RETURN 0
	END CATCH
COMMIT
RETURN 1
GO

GO
IF OBJECT_ID('sp_DeleteAllInitialOrders') IS NOT NULL
	DROP PROC sp_DeleteAllInitialOrders
GO
CREATE PROCEDURE sp_DeleteAllInitialOrders (
    @email NVARCHAR(100)
)
AS
BEGIN TRANSACTION
	BEGIN TRY
        WHILE(exists(SELECT 1
					 from ORDER_STATE os join H_ORDER o on o.ORDER_ID = os.ORDER_ID
					 where o.EMAIL = @email
                     group by os.ORDER_ID
                     having count(*) = 1))
        BEGIN
            declare @id char(7)
            
            SELECT @id = os.ORDER_ID
            from ORDER_STATE os join H_ORDER o on o.ORDER_ID = os.ORDER_ID
            where o.EMAIL = @email
            group by os.ORDER_ID
            having count(*) = 1
            
            delete from ORDER_STATE where ORDER_ID = @id
            delete from ORDER_VOUCHER where ORDER_ID = @id
            delete from ORDER_DETAIL where ORDER_ID = @id
            delete from H_ORDER where ORDER_ID = @id
        END
	END TRY

	BEGIN CATCH
		PRINT N'Bị lỗi'
		ROLLBACK 
		RETURN 0
	END CATCH
COMMIT
RETURN 1
GO