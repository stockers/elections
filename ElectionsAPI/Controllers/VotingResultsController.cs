using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using ElectionsAPI.Models;
using System;
using System.Collections.Generic;
using ElectionsAPI.Helpers;
using Microsoft.Extensions.Caching.Memory;

namespace ElectionsAPI.Controllers
{
    [Route("api/[controller]")]
    public class VotingResultsController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger _logger;
        private readonly IMemoryCache _memoryCache;
        public VotingResultsController(IConfiguration configuration, ILogger logger, IMemoryCache memoryCache)
        {
            _configuration = configuration;
            _logger = logger;
            _memoryCache = memoryCache;
        }

        [HttpGet("VotesByParty")]
        public async Task<IEnumerable<PartyVotes>> GetVotesByParty()
        {
            IEnumerable<PartyVotes> result = _memoryCache.Get<IEnumerable<PartyVotes>>("GetVotesByParty");
            if (result != null)
                return result;

            string? sqlDataSource = _configuration.GetConnectionString("Elections");
            string sproc = "usp_VotesByParty_Get";
            
            try
            {
                result = await SqlHelpers.ExecuteProcedure<PartyVotes>(sqlDataSource!, sproc);
                _memoryCache.Set("GetVotesByParty", result, new TimeSpan(0, 1, 0)); // cache for at least 1 minute
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,"GetVotesByParty failed");
            }
            return result;
        }

        [HttpGet("VoteStrengthsByParty")]
        public async Task<IEnumerable<PartyVotes>> GetVoteStrengthsByParty()
        {
            string sqlDataSource = _configuration.GetConnectionString("Elections");
            string sproc = "usp_VoteStrengthsByParty_Get";

            return await SqlHelpers.ExecuteProcedure<PartyVotes>(sqlDataSource, sproc);

        }

        [HttpGet("VoteStrengths/{partyId?}")]
        public async Task<IEnumerable<PartyVotes>> GetVoteStrengths([FromRoute] int ? partyId)
        {
            string sqlDataSource = _configuration.GetConnectionString("Elections");
            string sproc = "usp_VoteStrengths_Get";
            string paramName = "PartyId";

            try
            {
                return await SqlHelpers.ExecuteProcedure<PartyVotes>(sqlDataSource, sproc, paramName, partyId);
            } catch (Exception ex)
            {
                _logger.LogError("GetVoteStrengths", ex);
            }
            return Array.Empty<PartyVotes>();
        }

    }
}
