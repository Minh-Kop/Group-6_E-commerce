GO
IF OBJECT_ID('sp_GetAllVouchers') IS NOT NULL
	DROP PROC sp_GetAllVouchers
GO
CREATE PROCEDURE sp_GetAllVouchers
AS
BEGIN TRANSACTION
	BEGIN TRY
        SELECT [VOUCHER_ID] 'voucherId', vt.VOUCHER_TYPE_ID voucherTypeId, vt.VOUCHER_TYPE 'voucherType', 
            [STARTED_DATE] 'startDate', [END_DATE] 'endDate', 
            [MAXIMUM_AMOUNT] 'maxAmount', [REMAINING_AMOUNT] 'remainingAmount',
            [MINIMUM_PRICE] 'minPrice', [MAXIMUM_DISCOUNT_PRICE] 'maxPrice', [PERCENTAGE_DISCOUNT] 'percentageDiscount'
        from VOUCHER v join VOUCHER_TYPE vt on v.VOUCHER_TYPE_ID = vt.VOUCHER_TYPE_ID
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
IF OBJECT_ID('sp_GetAllUserVouchers') IS NOT NULL
	DROP PROC sp_GetAllUserVouchers
GO
CREATE PROCEDURE sp_GetAllUserVouchers (
    @email NVARCHAR(100)
)
AS
BEGIN TRANSACTION
	BEGIN TRY
        SELECT v.[VOUCHER_ID] 'voucherId', vt.VOUCHER_TYPE_ID voucherTypeId, vt.VOUCHER_TYPE 'voucherType', [STARTED_DATE] 'startDate', [END_DATE] 'endDate', 
            [MAXIMUM_AMOUNT] 'maxAmount', [REMAINING_AMOUNT] 'remainingAmount',
            [MINIMUM_PRICE] 'minPrice', [MAXIMUM_DISCOUNT_PRICE] 'maxPrice', [PERCENTAGE_DISCOUNT] 'percentageDiscount'
        from VOUCHER v join VOUCHER_TYPE vt on v.VOUCHER_TYPE_ID = vt.VOUCHER_TYPE_ID
            join user_voucher uv on uv.VOUCHER_ID = v.VOUCHER_ID
        where uv.EMAIL = @email and v.STARTED_DATE <= GETDATE() and v.END_DATE >= GETDATE() and v.REMAINING_AMOUNT > 0
	END TRY

	BEGIN CATCH
		PRINT N'Bị lỗi'
		ROLLBACK 
		RETURN 0
	END CATCH
COMMIT
RETURN 1
GO

go
IF OBJECT_ID('f_CreateVoucherId') IS NOT NULL
	DROP FUNCTION f_CreateVoucherId
GO
CREATE FUNCTION f_CreateVoucherId()
returns CHAR(7)
    BEGIN
        DECLARE @i INT = 1
        DECLARE @id char(7) = 'VC00001'
        WHILE(EXISTS(SELECT 1
                    FROM VOUCHER
                    WHERE VOUCHER_ID = @id))
        BEGIN
            SET @i += 1
            SET @id = 'VC' + REPLICATE('0', 5 - LEN(@i)) + CAST(@i AS CHAR(5))
        END
        return @id
    END
GO

GO
IF OBJECT_ID('sp_CreateVoucher') IS NOT NULL
	DROP PROC sp_CreateVoucher
GO
CREATE PROCEDURE sp_CreateVoucher (
    @voucherTypeId char(4),
    @percentageDiscount int,
    @minPrice int,
    @maxDiscountPrice int,
    @startDate DATETIME,
    @endDate DATETIME,
    @maxAmount int
)
AS
BEGIN TRANSACTION
	BEGIN TRY
        DECLARE @voucherId char(7) = dbo.f_CreateVoucherId()
        INSERT into VOUCHER (VOUCHER_ID, VOUCHER_TYPE_ID, STARTED_DATE, END_DATE, MAXIMUM_AMOUNT, REMAINING_AMOUNT, MINIMUM_PRICE, MAXIMUM_DISCOUNT_PRICE, PERCENTAGE_DISCOUNT)
            VALUES (@voucherId, @voucherTypeId, @startDate, @endDate, @maxAmount, @maxAmount, @minPrice, @maxDiscountPrice, @percentageDiscount)
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
        from H_ORDER
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

