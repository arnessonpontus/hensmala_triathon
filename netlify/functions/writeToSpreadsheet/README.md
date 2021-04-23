# Netlify Functions to add content to Google sheets and confirmation email

Remember to share every sheet with the service account email

### Example fetch

```javascript
const onSubmit = () => {
  fetch("/.netlify/functions/writeToSpreadsheet", {
    method: "POST",
    body: JSON.stringify({
      name: "User 3",
      email: "0323339492",
      id: "398jw393",
    }),
  }).then((res) => console.log(res));
};
```
