go
DROP USER [hachiko-admin]
exec sp_droplogin [hachiko-admin]
go
CREATE LOGIN [hachiko-admin] WITH PASSWORD = 'project2023$', DEFAULT_DATABASE = db_hachiko
CREATE USER [hachiko-admin] FROM LOGIN [hachiko-admin]
EXEC sp_addrolemember 'db_owner', 'hachiko-admin'