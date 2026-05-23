// import { useState } from "react"
// import API from "../services/api"
// import { useNavigate, Link } from "react-router-dom"

// export default function Login(){

//   const navigate = useNavigate()

//   const [form, setForm] = useState({
//     username:"",
//     password:""
//   })

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]:e.target.value
//     })
//   }

//   const loginUser = async (e) => {

//     e.preventDefault()

//     try{

//       const res = await API.post(
//         "/auth/login/",
//         form
//       )

//       localStorage.setItem(
//         "token",
//         res.data.access
//       )

//       navigate("/dashboard")

//     }catch(err){
//       alert("Invalid Credentials")
//     }
//   }

//   return(
//     <div className="flex justify-center items-center h-screen">

//       <form
//         onSubmit={loginUser}
//         className="bg-white p-10 rounded-2xl shadow-xl w-96"
//       >

//         <h1 className="text-3xl font-bold mb-5">
//           Login
//         </h1>

//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           className="w-full border p-3 mb-4 rounded"
//           onChange={handleChange}
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           className="w-full border p-3 mb-4 rounded"
//           onChange={handleChange}
//         />

//         <button
//           className="w-full bg-green-600 text-white p-3 rounded"
//         >
//           Login
//         </button>

//         <p className="mt-4">
//           No account?
//           <Link
//             to="/register"
//             className="text-blue-500"
//           >
//             Register
//           </Link>
//         </p>

//       </form>

//     </div>
//   )
// }