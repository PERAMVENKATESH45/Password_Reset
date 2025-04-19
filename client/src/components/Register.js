import {useState} from "react";

const RegisterForm = () => {
    const[username, setUsername]= useState(''); //state for the username input
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState("");
    const[error, setError] = useState("");
    const [message, setMessage] = useState("");


    // function to handle the form submission

    const handleSubmit = async(e) => {
        e.preventDefault();

        const user = {username, email, password};

        setError(''); //clear the previous error
        setMessage(""); //clear the previous messages

        try {
            const res = await fetch("http://localhost:5004/api/users/register", {
                method: "POST",
                headers: {
                    "Content-type" : "application/json"
                },
                body: JSON.stringify(user)
            })

            if(res.ok){
                const data = await res.json();
                setMessage(data.message || "Regisration successfull");
                setUsername('');
                setEmail("");
                setPassword('')
            } else {
                const errordata = await res.json();
                setError(errordata.message || "Registration not successful, try again change username and email")
            }

        } catch(error){
            setError("Unable to register")
        }

    }


    // rendering the component

    return(
        <div className="bg-primary-subtle p-4 rounded">
            <form onSubmit={handleSubmit}>
                <h2 className="mb-5 text-primary text-center">Register</h2>
                {message && <div className="alert alert-success">{message}</div>}
                {error && <div className="alert alert-danger">{error}</div>}


                <div className="mb-3">
                    <label className="form-label fw-bold">Username</label>
                    <input
                        type = "text"
                        placeholder="Enter your Name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold">Email</label>
                    <input
                        type = "text"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>


                <div className="mb-3">
                    <label className="form-label fw-bold">Password</label>
                    <input
                        type = "password"
                        placeholder="Enter your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>

                <button type="submit" className="mb-3 mt-3 btn btn-success">Register</button>
            </form>
        </div>
    )


}


export default RegisterForm