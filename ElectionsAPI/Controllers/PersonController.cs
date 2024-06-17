using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using ElectionsAPI.Models;
using System;

namespace ElectionsAPI.Controllers
{
    [Route("api/[controller]")]
    public class PersonController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger _logger;
        public PersonController(IConfiguration configuration, ILogger logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        [HttpGet]
        public JsonResult Get([FromQuery] string ? search)
        {
            string query = @"Select top 10000
                                Id, FirstName, LastName, AddressLine1, AddressLine2, VotingForPartyId, Strength
                            from
                                dbo.Person";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Elections");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                if (!string.IsNullOrWhiteSpace(search))
                    query += "  WHERE AddressLine2 like @Search";
                
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    if (!string.IsNullOrWhiteSpace(search))
                        myCommand.Parameters.AddWithValue("@Search", search + "%");

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post([FromBody] Person person)
        {
            string query = @"Insert into dbo.Person 
                                (FirstName, LastName, AddressLine1, AddressLine2, VotingForPartyId, Strength)
                            OUTPUT INSERTED.id
                            values
                                (@FirstName, @LastName, @AddressLine1, @AddressLine2, @VotingForPartyId, @Strength)";
                
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Elections");
            SqlDataReader myReader;
            int insertedRows = 0;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@FirstName", person.FirstName);
                    myCommand.Parameters.AddWithValue("@LastName", person.LastName);
                    myCommand.Parameters.AddWithValue("@AddressLine1", person.AddressLine1);
                    myCommand.Parameters.AddWithValue("@AddressLine2", person.AddressLine2);
                    myCommand.Parameters.AddWithValue("@VotingForPartyId", person.VotingForPartyId);
                    myCommand.Parameters.AddWithValue("@Strength", person.Strength);

                    insertedRows = myCommand.ExecuteNonQuery();
                    //table.Load(myReader);

                    //myReader.Close();
                    myCon.Close();
                }
            }

            string inserted = insertedRows == 1 ? "Inserted Successfully" : "failed to insert";
            return new JsonResult(inserted);
            //return new JsonResult(result);
        }

        [HttpPut]
        public JsonResult Put([FromBody] Person person)
        {
            string query = @"Update dbo.Person
                set
                    FirstName = @FirstName,
                    LastName = @LastName,
                    AddressLine1 = @AddressLine1,
                    AddressLine2 = @AddressLine2,
                    VotingForPartyId = @VotingForPartyId,
                    Strength = @Strength
                where
                    Id = @PersonId";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Elections");
            SqlDataReader myReader;
            int updatedRows = 0;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@PersonId", person.Id);
                    myCommand.Parameters.AddWithValue("@FirstName", person.FirstName);
                    myCommand.Parameters.AddWithValue("@LastName", person.LastName);
                    myCommand.Parameters.AddWithValue("@AddressLine1", person.AddressLine1);
                    myCommand.Parameters.AddWithValue("@AddressLine2", person.AddressLine2);
                    myCommand.Parameters.AddWithValue("@VotingForPartyId", person.VotingForPartyId);
                    myCommand.Parameters.AddWithValue("@Strength", person.Strength);

                    updatedRows = myCommand.ExecuteNonQuery();
                    myCon.Close();
                }
            }

            string updated = updatedRows == 1 ? "Updated Successfully" : "failed to update";
            return new JsonResult(updated);
        }


        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"Delete from dbo.Person where Id = @PersonId";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Elections");
            SqlDataReader myReader;
            int deletedRows = 0;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@PersonId", id);
                    deletedRows = myCommand.ExecuteNonQuery();
                    _logger.Log(LogLevel.Information, $"deleted {deletedRows} rows");
                    
                    myCon.Close();
                }
            }

            string deleted = deletedRows == 1 ? "Deleted Successfully" : "failed to delete";
            return new JsonResult(deleted);
        }

    }
}
