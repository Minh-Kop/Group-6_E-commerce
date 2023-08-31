GO
IF OBJECT_ID('sp_CreateReview') IS NOT NULL
	DROP PROC sp_CreateReview
GO
CREATE PROCEDURE sp_CreateReview (
    @orderId char(7),
    @bookId char(7),
    @rating INT,
    @comment NVARCHAR(800)
)
AS
BEGIN TRANSACTION
	BEGIN TRY
        if not exists (select 1 from ORDER_DETAIL where ORDER_ID = @orderId and BOOK_ID = @bookId)
        BEGIN
            PRINT N'This item is not in this order.'
            ROLLBACK 
            RETURN -1
        END
        
        if exists (select 1 from ORDER_REVIEW where ORDER_ID = @orderId and BOOK_ID = @bookId)
        BEGIN
            PRINT N'This order''s item is already reviewed.'
            ROLLBACK 
            RETURN -2
        END
        
        if exists (select 1 from BOOK where BOOK_ID = @bookId and SOFT_DELETE = 1)
        BEGIN
            PRINT N'This order''s item is no longer existed.'
            ROLLBACK 
            RETURN -3
        END

        INSERT into ORDER_REVIEW (ORDER_ID, BOOK_ID, RATING, REVIEW, CREATED_TIME) VALUES
            (@orderId, @bookId, @rating, @comment, GETDATE())
	END TRY

	BEGIN CATCH
		PRINT N'Bị lỗi'
		ROLLBACK 
		RETURN 0
	END CATCH
COMMIT
RETURN 1
GO
