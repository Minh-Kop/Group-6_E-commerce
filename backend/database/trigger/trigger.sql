GO
IF OBJECT_ID('t_UpdateDiscountedPrice') IS NOT NULL
	DROP TRIGGER t_UpdateDiscountedPrice
GO
CREATE TRIGGER t_UpdateDiscountedPrice
ON book
AFTER INSERT, UPDATE
AS
BEGIN
    UPDATE BOOK
    SET BOOK_DISCOUNTED_PRICE = i.BOOK_PRICE * (1 - i.DISCOUNTED_NUMBER / 100.0)
    FROM BOOK b
    JOIN inserted i ON b.BOOK_ID = i.BOOK_ID;
END;

GO
IF OBJECT_ID('t_UpdatePasswordChangedAt') IS NOT NULL
	DROP TRIGGER t_UpdatePasswordChangedAt
GO
CREATE TRIGGER t_UpdatePasswordChangedAt
ON ACCOUNT
AFTER UPDATE
AS
BEGIN
    if UPDATE(ENC_PWD)
    BEGIN
        UPDATE ACCOUNT
        SET PASSWORDCHANGEDAT = DATEADD(second, -1, GETDATE())
        FROM ACCOUNT a
        JOIN inserted i ON a.EMAIL = i.EMAIL;
    END
END;

GO
IF OBJECT_ID('t_UpdateCartDetail') IS NOT NULL
	DROP TRIGGER t_UpdateCartDetail
GO
CREATE TRIGGER t_UpdateCartDetail
ON CART_DETAIL
AFTER UPDATE, INSERT
AS
BEGIN
    declare @cartId char(10), @bookId char(7), @quantity int, @price int, @isClicked bit
    select @cartId = i.CART_ID, @bookId = i.BOOK_ID, @quantity = i.CART_QUANTITY, @isClicked = i.IS_CLICKED from inserted i
    select @price = BOOK_DISCOUNTED_PRICE from BOOK where BOOK_ID = @bookId
    
    if UPDATE(cart_quantity)
    BEGIN
        UPDATE CART_DETAIL
        SET CART_PRICE = @quantity * @price
        where BOOK_ID = @bookId and CART_ID = @cartId
    END
   
    if UPDATE(is_clicked) or @isClicked = 1
    BEGIN
        DECLARE @total int = 0;
        
        select @total = sum(CART_PRICE)
        from CART_DETAIL cd
        where CART_ID = @cartId and IS_CLICKED = 1
        group BY CART_ID

        UPDATE CART
        SET CART_TOTAL = @total
        where CART_ID = @cartId
    END
END;
