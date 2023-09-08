GO
IF OBJECT_ID('sp_UpdateTier') IS NOT NULL
	DROP PROC sp_UpdateTier
GO
CREATE PROCEDURE sp_UpdateTier
AS
BEGIN TRANSACTION
	BEGIN TRY
        -- Check if this proc is run in new year or not
        IF exists(select 1 from HPOINT_ACCUMULATION_YEAR where SAVED_YEAR = YEAR(GETDATE()))
        BEGIN
            PRINT N'This proc can only be run once in a year.'
            ROLLBACK 
            RETURN -1
        END

        DECLARE @ResultTable TABLE (
            email NVARCHAR(100),
            rn int
        )
        INSERT INTO @ResultTable (email, rn)
        SELECT EMAIL email, ROW_NUMBER() OVER(order by EMAIL) rn
        from ACCOUNT
        where VERIFIED = 1

        -- Create index i to loop all temp table
        DECLARE @i int = 1

        -- Loop for all temp table
        WHILE EXISTS (select 1 from @ResultTable where rn = @i)
        BEGIN
            declare @email NVARCHAR(100), @accumulatedPoints INT, @tier INT = 1
            SELECT @email = email
            from @ResultTable 
            where rn = @i

            SELECT @accumulatedPoints = HPOINT
            from HPOINT_ACCUMULATION_YEAR
            WHERE SAVED_YEAR = YEAR(GETDATE()) - 1 and EMAIL = @email

            if @accumulatedPoints is NULL
            BEGIN
                INSERT into HPOINT_ACCUMULATION_YEAR (EMAIL, SAVED_YEAR, HPOINT) VALUES (@email, YEAR(GETDATE()), 0)
                CONTINUE
            END

            -- Calculate tier
            IF @accumulatedPoints >= 150000
            BEGIN
                set @tier = 3
            END
            ELSE IF @accumulatedPoints >= 30000
            BEGIN
                set @tier = 2
            END

            -- Update tier
            UPDATE ACCOUNT_DETAIL
            SET TIER = @tier
            WHERE EMAIL = @email
            -- Insert new HPoint accumulation year
            INSERT into HPOINT_ACCUMULATION_YEAR (EMAIL, SAVED_YEAR, HPOINT) VALUES (@email, YEAR(GETDATE()), 0)

            -- Increase index by 1
            set @i = @i + 1
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
