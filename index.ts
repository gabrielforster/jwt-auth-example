import app from "./app"

const { SERVER_PORT } = process.env ?? 4000

app.listen(SERVER_PORT as string, () => {
  console.log("Server is running")
})
