
export const getCognitoToken = (payload) => {
  return fetch('https://gggrkc8ukf.execute-api.us-east-1.amazonaws.com/dev/auth/cognito', {
    "method":"POST",
    "body": JSON.stringify(payload),
    "headers": new Headers({
      'Content-Type': 'application/json'
    })
  })
  .then((res) => res.json())
  .catch(err => console.log(err));
}