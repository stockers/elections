USE Elections
GO

IF EXISTS (SELECT 1 FROM sys.objects WHERE type IN (N'P', N'PC') AND object_id = 
	OBJECT_ID(N'usp_VotesByParty_Get')) DROP PROCEDURE usp_VotesByParty_Get
GO
CREATE PROCEDURE usp_VotesByParty_Get AS
BEGIN
	SELECT
	 p.[Id] AS PartyId
	,p.[Name] As PartyName
	,p.[PhotoUrl] AS PhotoUrl
	,COUNT(v.Id) As Votes
	FROM dbo.Person v RIGHT OUTER JOIN dbo.Party p on v.VotingForPartyId = p.Id
	WHERE v.Strength >= 0.5
	GROUP BY p.Id, p.[Name], p.[PhotoUrl]
END
GO
-- EXEC usp_VotesByParty_Get

IF EXISTS (SELECT 1 FROM sys.objects WHERE type IN (N'P', N'PC') AND object_id = 
	OBJECT_ID(N'usp_VoteStrengthsByParty_Get')) DROP PROCEDURE usp_VoteStrengthsByParty_Get
GO
CREATE PROCEDURE usp_VoteStrengthsByParty_Get AS
BEGIN
	SELECT
	 p.[Id] AS PartyId
	,p.[Name] As PartyName
	,AVG(Strength) as Strength
	,SUM(Strength) as Votes
	FROM dbo.Person v JOIN dbo.Party p on v.VotingForPartyId = p.Id
	GROUP BY p.Id, p.[Name]
	ORDER BY p.[Name] ASC, Votes DESC
END
GO
--EXEC usp_VoteStrengthsByParty_Get

IF EXISTS (SELECT 1 FROM sys.objects WHERE type IN (N'P', N'PC') AND object_id = 
	OBJECT_ID(N'usp_VoteStrengths_Get')) DROP PROCEDURE usp_VoteStrengths_Get
GO
CREATE PROCEDURE usp_VoteStrengths_Get (@PartyId INT = NULL) AS
BEGIN
	SELECT
	 p.[Id] AS PartyId
	,p.[Name] As PartyName
	,Strength
	,count(*) As Votes
	FROM dbo.Person v JOIN dbo.Party p on v.VotingForPartyId = p.Id
	WHERE p.Id = @PartyId OR (@PartyId is null)
	GROUP BY p.Id, p.[Name], Strength
	ORDER BY p.[Name] ASC, Strength DESC
END
--EXEC usp_VoteStrengths_Get @PartyId = 4
GO


