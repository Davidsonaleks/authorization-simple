// import { useState } from "react"

// export const useFetch = () => {
//   //   const [errors, setErrors] = useState()
//   const [isLoading, setLoading] = useState()

//   const request = async (url: string, headers = {}, method = "GET", body = null) => {
//     try {
//       const res = await fetch(url, {
//         headers,
//         method,
//         body: JSON.stringify(body),
//       })
//       const json = await res.json()
//       console.log("res: ", json)
//     } catch (e) {}
//   }

//   return { request }
// }
