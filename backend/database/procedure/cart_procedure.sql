use DB_hachiko

go
IF OBJECT_ID('f_CreateCartId') IS NOT NULL
	DROP FUNCTION f_CreateCartId
GO
CREATE FUNCTION f_CreateCartId()
returns CHAR(10)
    BEGIN
        DECLARE @i INT = 1
        DECLARE @id char(10) = 'CR00000001'
        WHILE(EXISTS(SELECT 1
                    FROM CART
                    WHERE CART_ID = @id))
        BEGIN
            SET @i += 1
            SET @id = 'CR' + REPLICATE('0', 8 - LEN(@i)) + CAST(@i AS CHAR(8))
        END
        return @id
    END

GO
IF OBJECT_ID('sp_AddBookToCart') IS NOT NULL
	DROP PROC sp_AddBookToCart
GO
CREATE PROCEDURE sp_AddBookToCart (
    @cartId char(10), 
    @bookId CHAR(7), 
    @quantity int,
    @isClicked BIT
)
AS
BEGIN TRANSACTION
	BEGIN TRY
        INSERT into CART_DETAIL (CART_ID, BOOK_ID, CART_QUANTITY, IS_CLICKED) values (@cartId, @bookId, @quantity, @isClicked)

        declare @cartCount int
        select @cartCount = COUNT(*)
        from CART_DETAIL
        where CART_ID = @cartId
        GROUP by CART_ID
        
        UPDATE CART
        set CART_COUNT = @cartCount
        where CART_ID = @cartId
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
IF OBJECT_ID('sp_DeleteBookFromCart') IS NOT NULL
	DROP PROC sp_DeleteBookFromCart
GO
CREATE PROCEDURE sp_DeleteBookFromCart (
    @cartId char(10), 
    @bookId CHAR(7)
)
AS
BEGIN TRANSACTION
	BEGIN TRY
        delete from CART_DETAIL where CART_ID = @cartId and BOOK_ID = @bookId

        -- Count books
        declare @cartCount int
        select @cartCount = COUNT(*)
        from CART_DETAIL
        where CART_ID = @cartId
        GROUP by CART_ID

        IF @cartCount is NULL
        BEGIN
            set @cartCount = 0
        END

        -- Calculate total
        DECLARE @total int = 0;
        
        select @total = sum(CART_PRICE)
        from CART_DETAIL cd
        where CART_ID = @cartId and IS_CLICKED = 1
        group BY CART_ID
        
        UPDATE CART
        set CART_COUNT = @cartCount, CART_TOTAL = @total
        where CART_ID = @cartId
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
IF OBJECT_ID('sp_DeleteClickedBooksFromCart') IS NOT NULL
	DROP PROC sp_DeleteClickedBooksFromCart
GO
CREATE PROCEDURE sp_DeleteClickedBooksFromCart (
    @email NVARCHAR(100)
)
AS
BEGIN TRANSACTION
	BEGIN TRY
        DECLARE @cartId CHAR(10) = (select CART_ID from CART where EMAIL = @email)
        delete from CART_DETAIL where CART_ID = @cartId and IS_CLICKED = 1

        -- Count books
        declare @cartCount int
        select @cartCount = COUNT(*)
        from CART_DETAIL
        where CART_ID = @cartId
        GROUP by CART_ID

        IF @cartCount is NULL
        BEGIN
            set @cartCount = 0
        END
        
        UPDATE CART
        set CART_COUNT = @cartCount, CART_TOTAL = 0
        where CART_ID = @cartId
	END TRY

	BEGIN CATCH
		PRINT N'Bị lỗi'
		ROLLBACK  
		RETURN 0
	END CATCH
COMMIT
RETURN 1
GO
