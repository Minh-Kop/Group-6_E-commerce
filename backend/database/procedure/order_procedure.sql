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
        INSERT into H_ORDER (ORDER_ID, EMAIL, ADDR_ID, PAYMENT_ID, MERCHANDISE_SUBTOTAL, SHIPPING_FEE, SHIPPING_DISCOUNT_SUBTOTAL, HACHIKO_VOUCHER_APPLIED, TOTAL_PAYMENT) values 
            (@id, @email, @addrId, 'PY05', @merchandiseSubtotal, @shippingFee, 0, 0, @merchandiseSubtotal + @shippingFee)
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
            [TOTAL_PAYMENT] totalPayment
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

GO
IF OBJECT_ID('sp_AddVoucher') IS NOT NULL
	DROP PROC sp_AddVoucher
GO
CREATE PROCEDURE sp_AddVoucher (
    @voucherId char(7),
    @orderId char(7)
)
AS
BEGIN TRANSACTION
	BEGIN TRY
        if not exists (select 1 from USER_VOUCHER uv where uv.VOUCHER_ID = @voucherId)
         BEGIN
            PRINT N'User doesn''t have this voucher.'
            ROLLBACK 
            RETURN -5
        END

        -- Voucher information
        DECLARE @voucherTypeId char(4), @remainingAmount int, @minPrice int, @maxDiscountPrice INT, @percentage int,
            @voucherType NVARCHAR(100)
        select @voucherTypeId = vt.VOUCHER_TYPE_ID, @remainingAmount = v.REMAINING_AMOUNT, @minPrice = v.MINIMUM_PRICE,
            @percentage = v.PERCENTAGE_DISCOUNT, @maxDiscountPrice = v.MAXIMUM_DISCOUNT_PRICE, @voucherType = vt.VOUCHER_TYPE
        from VOUCHER v join VOUCHER_TYPE vt on vt.VOUCHER_TYPE_ID = v.VOUCHER_TYPE_ID
        where VOUCHER_ID = @voucherId

        if @voucherTypeId is NULL
        BEGIN
            PRINT N'Voucher Id is invalid.'
            ROLLBACK 
            RETURN -3
        END

        -- Order information
        DECLARE @merchandiseSubtotal INT, @shippingFee INT, @shippingDiscountSubtotal INT, @hachikoVoucherApplied int
        SELECT @merchandiseSubtotal = MERCHANDISE_SUBTOTAL, @shippingFee = SHIPPING_FEE, @shippingDiscountSubtotal = SHIPPING_DISCOUNT_SUBTOTAL,
            @hachikoVoucherApplied = HACHIKO_VOUCHER_APPLIED
        from H_ORDER with (XLOCK)
        where ORDER_ID = @orderId

        if @merchandiseSubtotal is NULL
        BEGIN
            PRINT N'Order Id is invalid.'
            ROLLBACK 
            RETURN -4
        END

        if (@minPrice > @merchandiseSubtotal)
        BEGIN
            PRINT N'Subtotal isn''t enough to use this voucher.'
            ROLLBACK 
            RETURN -1
        END

        if (@remainingAmount < 1)
        BEGIN
            PRINT N'Out of vouchers.'
            ROLLBACK 
            RETURN -2
        END

        -- Delete old same type voucher before add new one
        if exists (select 1
                    from ORDER_VOUCHER ov join VOUCHER v on ov.VOUCHER_ID = v.VOUCHER_ID
                    where v.VOUCHER_TYPE_ID = @voucherTypeId and ov.ORDER_ID = @orderId)
        BEGIN
            DECLARE @oldVoucherId char(7)
            select @oldVoucherId = v.VOUCHER_ID
            from ORDER_VOUCHER ov join VOUCHER v on ov.VOUCHER_ID = v.VOUCHER_ID
            where v.VOUCHER_TYPE_ID = @voucherTypeId and ov.ORDER_ID = @orderId

            DELETE from ORDER_VOUCHER where VOUCHER_ID = @oldVoucherId and ORDER_ID = @orderId
        END

        if (@voucherType = 'Free ship')
        BEGIN
            if @shippingFee < @maxDiscountPrice
            BEGIN
                set @shippingDiscountSubtotal = @shippingFee
            END
            ELSE
            BEGIN
                set @shippingDiscountSubtotal = @maxDiscountPrice
            END
            
            INSERT into ORDER_VOUCHER (ORDER_ID, VOUCHER_ID) values (@orderId, @voucherId)
            UPDATE H_ORDER
            SET SHIPPING_DISCOUNT_SUBTOTAL = @shippingDiscountSubtotal, 
                TOTAL_PAYMENT = @merchandiseSubtotal + @shippingFee - @shippingDiscountSubtotal - @hachikoVoucherApplied
            WHERE ORDER_ID = @orderId
        END
        ELSE
        BEGIN
            if @percentage/100.0 * @merchandiseSubtotal > @maxDiscountPrice
            BEGIN
                SET @hachikoVoucherApplied = @maxDiscountPrice
            END
            ELSE
            BEGIN
                SET @hachikoVoucherApplied = @percentage/100.0 * @merchandiseSubtotal
            END

            INSERT into ORDER_VOUCHER (ORDER_ID, VOUCHER_ID) values (@orderId, @voucherId)
            UPDATE H_ORDER
            SET HACHIKO_VOUCHER_APPLIED = @hachikoVoucherApplied, 
                TOTAL_PAYMENT = @merchandiseSubtotal + @shippingFee - @shippingDiscountSubtotal - @hachikoVoucherApplied
            WHERE ORDER_ID = @orderId
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

GO
IF OBJECT_ID('sp_ChangeShippingAddress') IS NOT NULL
	DROP PROC sp_ChangeShippingAddress
GO
CREATE PROCEDURE sp_ChangeShippingAddress (
    @orderId char(7),
    @addrId char(10),
    @shippingFee INT
)
AS
BEGIN TRANSACTION
	BEGIN TRY
        UPDATE H_ORDER
        SET ADDR_ID = @addrId, SHIPPING_FEE = @shippingFee, 
            TOTAL_PAYMENT = MERCHANDISE_SUBTOTAL + @shippingFee - SHIPPING_DISCOUNT_SUBTOTAL - HACHIKO_VOUCHER_APPLIED
        WHERE ORDER_ID = @orderId
	END TRY

	BEGIN CATCH
		PRINT N'Bị lỗi'
		ROLLBACK 
		RETURN 0
	END CATCH
COMMIT
RETURN 1
GO
