import Cookies from "js-cookie";

const BASE_URL = "https://bursting-gelding-24.hasura.app/api/rest";

export const loginData = async (url, body, role) => {
  let headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "x-hasura-admin-secret":
      "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF" ||
      process.env.REACT_APP_API_KEY,
  };

  if (role !== null) {
    headers["x-hasura-role"] = role;
  }
  const options = {
    method: "POST",
    headers: headers,
    body:(body)
  };

  try {
    const response = await fetch(
      `${BASE_URL}/${url}`,
      options
    );
    return response.json();
  } catch (error) {
    console.error("Error:", error);
    console.log('hi')
    return null
  }
};



export const fetchDataFromApi = async (url, method,body=null) => {
    const userId=Cookies.get("user-id")
  const headers={
    "Content-Type": "application/x-www-form-urlencoded",
    "content-type": "application/json",
    "x-hasura-admin-secret":
      "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF" ||
      process.env.REACT_APP_API_KEY,
    "x-hasura-role": userId==='3'?'admin':'user',
   
  }
  if (userId !== 3) {
    headers["x-hasura-user-id"]= userId
  }


  const options = {
    method,
    headers,
  };
  if (body!==null) {
    options.body = JSON.stringify(body)
  }

  try {
    const response = await fetch(`${BASE_URL}/${url}`, options);
        return response.json();
  } catch (error) {
    console.error("Error:", error);
  }
  
 
  };