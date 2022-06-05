try {
    const URLToken = "https://dev-oodev-bizagiplatform.bizagi.com/oauth2/server/token";
    const Encode = "basic ZjY1MjY3YjNlOTE4YzQyMmZjYTI4MWYwZTE4ODdjOTc3MjljZTE5MzY4MDY5NDlmN2IzMTZjMGNiYTYxN2VjMTowMWE5MjcwZDViNTFkMDZjMTdkNjg0NWRiZTlkYmZiYjY3NTI0Y2IxNDVkYWQzYWFhZWExNTM5ZjBiYzcyMTBk";

    const response = await axios({
      url: URLToken,
      method: 'post',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': Encode
      },
      data: 'grant_type=client_credentials&scope=api'
    });

    if (response.status != 200)
    {
      //Error en ejecucion AXIOS.
      console.log("ERROR AXIOS");
      return "ERROR AXIOS";
    }
    else
    {
      if (response.data.http_status_code != 200)
      {
        console.log("ERROR BIZAGI");
        console.log(response.data.http_status_code);
        console.log(response.data.error);
        console.log(response.data.error_description);
        return "error";
      }
      else
      {
        console.log("RESPUESTA BIZAGI");
        console.log(response.data);
        return response.data;
      }
      
    }

  } catch (error) {
    console.error(error);
  }