using Microsoft.Data.SqlClient;
using System.Data;

namespace ElectionsAPI.Helpers
{
    public class SqlHelpers
    {
        public static async Task<IEnumerable<T>> ExecuteProcedure<T>(string sqlDataSource, string sproc, string? paramName = null, object? paramValue = null)
        {
            using (var conn = new SqlConnection(sqlDataSource))
            using (var command = new SqlCommand(sproc, conn) { CommandType = CommandType.StoredProcedure })
            {
                if (paramName != null)
                    command.Parameters.AddWithValue(paramName, paramValue);

                conn.Open();
                var myReader = await command.ExecuteReaderAsync();
                var table = new DataTable();
                table.Load(myReader);
                myReader.Close();

                string json = Newtonsoft.Json.JsonConvert.SerializeObject(table);

                var list = Newtonsoft.Json.JsonConvert.DeserializeObject<List<T>>(json);
                return list;
            }
        }

    }
}
