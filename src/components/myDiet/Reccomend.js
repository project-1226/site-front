const axios = require("axios");
//작성중.....
async function run() {

  //설문결과값받아오기
  const userid = "508e3fef-7b55-4382-9";

  try {
    let res = await axios(`http://localhost:8080/user/survey/read?userid=${userid}`);
    res = res.data;
  } catch (error) {
    console.error("Error in main script:", error);
  }
}

run();
