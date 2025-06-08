// import requests,json
// for i in range(0, 100):
//     st = requests.request(method='POST', 
//                     url='https://cas.apiit.edu.my/cas/v1/tickets/TGT-3318323-bylkcYE1Fd7B-U4DbWw-EGke7Z-sSGuNBv7c77ijB3SxX6BS6Zv-f3RSfxiGsOyLX-gip-172-33-0-182?service=https://api.apiit.edu.my/attendix',
//                     headers={
//                         'Content-type': 'application/x-www-form-urlencoded'
//                     })

//     response_json = requests.request(method='POST',
//                                 url='https://attendix.apu.edu.my/graphql',
//                                 headers={
//                                     'X-Api-Key': 'da2-u4ksf3gspnhyjcokxzugo3mqr4',
//                                     # 'x-amz-user-agent': 'aws-amplify/2.0.7',
//                                     'ticket': st.text,
//                                     'Content-Type': 'application/json'
//                                 },
//                                 json={"operationName":"updateAttendance","variables":{"otp":"123"},"query":"mutation updateAttendance($otp: String!) {\n  updateAttendance(otp: $otp) {\n    id\n    attendance\n    classcode\n    date\n    startTime\n    endTime\n    classType\n    __typename\n  }\n}\n"}
//     )
//     data = json.loads(response_json.text)
//     print(data['errors'][0]['message'])
const axios = require('axios');

async function get_TGT_value(){
  account_credentials = {cred:"username=TP064820&password=Dtpo-75837461"}
  const loginResponse = await axios.post('https://apspace.apu.edu.my/login', account_credentials, {
    headers: account_credentials
  });
  const TGT_value = loginResponse.data; // Assuming `st.text` is equivalent to the response body
  console.log(data.errors ? data.errors[0].message : 'Success:', data);
}
async function updateAttendance() {
  TGT_value = '262818-IfpiB8HRW0gI1xj6geKBlE---QxB1xX-ChFAiT1nCB6R8N0BldvvQ9udKJ54kroT264ip-172-32-62-76'
  try {
    // Fetch the ticket
    const ticketResponse = await axios.post(`https://cas.apiit.edu.my/cas/v1/tickets/TGT-${TGT_value}?service=https://api.apiit.edu.my/attendix`, null, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const ticket = ticketResponse.data; // Assuming `st.text` is equivalent to the response body

    // Use the ticket to update attendance
    const response = await axios.post(
      'https://attendix.apu.edu.my/graphql',
      {
        operationName: 'updateAttendance',
        variables: { otp: '157' },
        query: `mutation updateAttendance($otp: String!) {
          updateAttendance(otp: $otp) {
            id
            attendance
            classcode
            date
            startTime
            endTime
            classType
            __typename
          }
        }`,
      },
      {
        headers: {
          'X-Api-Key': 'da2-u4ksf3gspnhyjcokxzugo3mqr4',// usually does not change, account specific
          ticket: ticket,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = response.data;
    console.log(data.errors ? data.errors[0].message : 'Success:', data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

updateAttendance();
// get_TGT_value();