// import { useState } from "react"
// import API from "../services/api"
// import { useNavigate } from "react-router-dom"

// export default function Register(){

//   const navigate = useNavigate()

//   const [form, setForm] = useState({
//     username:"",
//     email:"",
//     password:"",
//     phone:""
//   })

//   const handleChange = (e) => {

//     setForm({
//       ...form,
//       [e.target.name]:e.target.value
//     })
//   }

//   const registerUser = async (e) => {

//     e.preventDefault()

//     try{

//       await API.post(
//         "/auth/register/",
//         form
//       )

//       alert("Registered Successfully")

//       navigate("/login")

//     }catch(err){
//       console.log(err)
//     }
//   }

//   return(
//     <div className="flex justify-center items-center h-screen">

//       <form
//         onSubmit={registerUser}
//         className="bg-white p-10 rounded-2xl shadow-xl w-96"
//       >

//         <h1 className="text-3xl font-bold mb-5">
//           Register
//         </h1>

//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           className="w-full border p-3 mb-4 rounded"
//           onChange={handleChange}
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           className="w-full border p-3 mb-4 rounded"
//           onChange={handleChange}
//         />

//         <input
//           type="text"
//           name="phone"
//           placeholder="Phone"
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
//           Register
//         </button>

//       </form>

//     </div>
//   )
// }