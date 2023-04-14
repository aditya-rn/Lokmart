export const LoginToApi = async (userDetails, isSaveCredential = false) => {
  try {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: userDetails.username,
        password: userDetails.password,
        // expiresInMins: 60, // optional
      }),
    });

    const userData = await response.json();
    if (!!userData.message) {
      throw 'Invalid details !!';
    }
    return {
      isError: false,
      userData,
    };
  } catch (error) {
    console.log('error in api');
    console.log(error);
    return {
      isError: true,
      userData,
    };
  }
};

// const dataList = [
//   {
//     name: 'parthil',
//     created_at: 'Thu Dec 25 2022 17:05:18 GMT+0530',
//   },
//   {
//     name: 'kaushal',
//     created_at: 'Thu Dec 25 2022 17:05:18 GMT+0530',
//   },
//   {
//     name: 'vishal',
//     created_at: 'Thu Dec 28 2022 17:05:18 GMT+0530',
//   },
//   {
//     name: 'yash',
//     created_at: 'Thu Dec 28 2022 17:05:18 GMT+0530',
//   },
//   {
//     name: 'kevin',
//     created_at: 'Thu Dec 28 2022 17:05:18 GMT+0530',
//   },
//   {
//     name: 'aditya',
//     created_at: 'Thu Dec 29 2022 17:05:18 GMT+0530',
//   },

//   {
//     name: 'amish',
//     created_at: 'Thu Dec 29 2022 17:05:18 GMT+0530',
//   },
// ];

// let temp = [];
// let priviousDate = '';
// let indexOfEntry = 0;
// dataList.map(item => {
//   let dateString = item.created_at.slice(0, 11);
//   if (!priviousDate) {
//     priviousDate = dateString;
//     temp.push({
//       created_at: dateString,
//       itemArray: !temp[indexOfEntry]
//         ? [{...item}]
//         : [{...item}, ...temp[indexOfEntry].itemArray],
//     });
//   } else {
//     if (dateString != priviousDate) {
//       priviousDate = dateString;
//       indexOfEntry += 1;
//       temp.push({
//         created_at: dateString,
//         itemArray: !temp[indexOfEntry]
//           ? [{...item}]
//           : [{...item}, ...temp[indexOfEntry].itemArray],
//       });
//     } else {
//       temp[indexOfEntry] = {
//         created_at: dateString,
//         itemArray: [{...item}, ...temp[indexOfEntry].itemArray],
//       };
//     }
//   }
// });
// console.log(temp);
