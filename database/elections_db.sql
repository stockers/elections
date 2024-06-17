
CREATE DATABASE Elections;
GO
USE Elections;
GO

CREATE TABLE dbo.Party (
    Id int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(max) NULL,
    [PhotoUrl] nvarchar(max) NULL,
    PRIMARY KEY (Id)
);

SET IDENTITY_INSERT Party OFF
INSERT INTO dbo.Party ([Name], [PhotoUrl]) VALUES 
  ('Conservative', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Portrait_of_Prime_Minister_Rishi_Sunak_%28cropped%29.jpg/220px-Portrait_of_Prime_Minister_Rishi_Sunak_%28cropped%29.jpg')
, ('Liberal Democrats', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Official_portrait_of_Rt_Hon_Sir_Edward_Davey_MP_crop_2.jpg/220px-Official_portrait_of_Rt_Hon_Sir_Edward_Davey_MP_crop_2.jpg')
, ('Greens', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Carla_Denyer%2C_1_October_2022.jpg/220px-Carla_Denyer%2C_1_October_2022.jpg')
, ('Labour', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Official_portrait_of_Keir_Starmer_%28crop%29.jpg/220px-Official_portrait_of_Keir_Starmer_%28crop%29.jpg')
, ('Reform UK', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Nigel_Farage_%2845718080574%29_%28cropped%29.jpg/220px-Nigel_Farage_%2845718080574%29_%28cropped%29.jpg')


CREATE TABLE dbo.Person (
    Id int IDENTITY(1,1) NOT NULL,
    FirstName nvarchar(max) NULL,
    LastName nvarchar(max) NULL,
    AddressLine1 nvarchar(max) NULL,
    AddressLine2 nvarchar(max) NULL,
    VotingForPartyId int NULL,
    Strength float NULL,
    PRIMARY KEY (Id),
    FOREIGN KEY (VotingForPartyId) REFERENCES dbo.Party(Id)
);



SET IDENTITY_INSERT Person OFF
INSERT INTO dbo.Person (FirstName, LastName, AddressLine1, AddressLine2, VotingForPartyId, Strength) VALUES
 ('Richard', 'Stockdale', '1 Mill Lane', 'Reading', 3, 0.5)
,('John', 'Binman', '2 Mill Lane', 'Reading', 4, 0.7)
,('David', 'Ballard', '3 Mill Lane', 'Reading', 5, 0.8)
,('Dan', 'Mullainy', '4 Mill Lane', 'Reading', 1, 0.5)
,('Finn', 'Saunders', '5 Mill Lane', 'Reading', 4, 0.7)
,('Billy', 'Fishguard', '6 Mill Lane', 'Reading', 5, 0.8)
,('Sigmund', 'Friend', '7 Mill Lane', 'Reading', 5, 0.9)
,('Daphne', 'Pue', '8 Mill Lane', 'Reading', 2, 0.9)
,('Sandy', 'Skelton', '9 Mill Lane', 'Reading', 3, 0.8)
,('Georgina', 'Handy', '10 Mill Lane', 'Reading', 3, 0.8)

INSERT INTO dbo.Person (FirstName, LastName, AddressLine1, AddressLine2, VotingForPartyId, Strength) VALUES
 ('A','AARDVARK','1 Mill Lane','Reading', 1 , 0.5 ),
 ('B','BLOFELD','2 Mill Lane','Reading', 2 , 0.5 ),
 ('C','CHURCH','3 Mill Lane','Reading', 2 , 0.6 ),
 ('D','DREYFUS','4 Mill Lane','Reading', 2 , 0.7 ),
 ('E','ELODY','5 Mill Lane','Reading', 2 , 0.8 ),
 ('F','FERARE','6 Mill Lane','Reading', 2 , 0.9 ),
 ('G','GEORGE','7 Mill Lane','Reading', 2 , 0.7 ),
 ('H','HARMON','8 Mill Lane','Reading', 3 , 0.6 ),
 ('I','ISAACS','9 Mill Lane','Reading', 3 , 0.5 ),
 ('J','JOLIE','10 Mill Lane','Reading', 3 , 0.4 ),
 ('K','KARMEN','11 Mill Lane','Reading', 3 , 0.5 ),
 ('L','LAMARR','12 Mill Lane','Reading', 3 , 0.6 ),
 ('M','MCDONALD','13 Mill Lane','Reading', 3 , 0.7 ),
 ('N','NULTY','14 Mill Lane','Reading', 3 , 0.9 ),
 ('O','OLEARY','15 Mill Lane','Reading', 3 , 0.9 ),
 ('P','PADDAM','16 Mill Lane','Reading', 3 , 0.8 ),
 ('Q','QUEBEC','17 Mill Lane','Reading', 3 , 0.8 ),
 ('R','RICHARDSON','18 Mill Lane','Reading', 4 , 0.8 ),
 ('S','STANMORE','19 Mill Lane','Reading', 4 , 0.7 ),
 ('T','TAMWORTH','20 Mill Lane','Reading', 4 , 0.6 ),
 ('U','ULSWATER','21 Mill Lane','Reading', 4 , 0.5 ),
 ('V','VEACH','22 Mill Lane','Reading', 4 , 0.7 ),
 ('W','WILLOUGHBY','23 Mill Lane','Reading', 4 , 0.9 ),
 ('X','XAVIER','24 Mill Lane','Reading', 4 , 1 ),
 ('Y','YONDER','25 Mill Lane','Reading', 4 , 1 ),
 ('Z','ZAGREB','26 Mill Lane','Reading', 4 , 0.8 ),
 ('A','ANDERS','27 Mill Lane','Reading', 4 , 0.9 ),
 ('B','BORZONE','28 Mill Lane','Reading', 4 , 0.8 ),
 ('C','CRUZ','29 Mill Lane','Reading', 4 , 0.9 ),
 ('D','DESANCHEZ','30 Mill Lane','Reading', 4 , 0.7 ),
 ('E','EMBURG','31 Mill Lane','Reading', 4 , 0.5 ),
 ('F','FONTAIN','32 Mill Lane','Reading', 5 , 0.7 ),
 ('G','GERMANY','33 Mill Lane','Reading', 5 , 0.7 ),
 ('H','HUBERTS','34 Mill Lane','Reading', 5 , 0.9 ),
 ('I','INDIGO','35 Mill Lane','Reading', 5 , 0.8 ),
 ('J','JANOS','36 Mill Lane','Reading', 5 , 0.8 ),
 ('K','KARAWAY','37 Mill Lane','Reading', 5 , 0.7 ),
 ('L','LOVETT','38 Mill Lane','Reading', 5 , 0.6 ),
 ('M','MINDY','39 Mill Lane','Reading', 5 , 0.6 ),
 ('N','NORSEMAN','40 Mill Lane','Reading', 5 , 0.5 ),
 ('O','OGLEVY','41 Mill Lane','Reading', 5 , 0.7 ),
 ('P','PARDEW','42 Mill Lane','Reading', 5 , 0.8 ),
 ('Q','QUIMBY','43 Mill Lane','Reading', 5 , 0.7 ),
 ('R','RODDICK','44 Mill Lane','Reading', 5 , 0.8 ),
 ('S','SHIVANI','45 Mill Lane','Reading', 5 , 0.8 ),
 ('T','TUMBLETON','46 Mill Lane','Reading', 5 , 0.9 ),
 ('U','UNDERWOOD','47 Mill Lane','Reading', 5 , 0.8 ),
 ('V','VANTY','48 Mill Lane','Reading', 5 , 0.7 ),
 ('W','WHISTIBLE','49 Mill Lane','Reading', 5 , 0.6 ),
 ('X','XU','50 Mill Lane','Reading', 5 , 0.7 ),

 ('A','Nother','2 Harmony Court','Oxford', 5 , 0.7 ),
 ('S','Omeone','3 Bleechers Road','Woodley', 1 , 0.8 )








