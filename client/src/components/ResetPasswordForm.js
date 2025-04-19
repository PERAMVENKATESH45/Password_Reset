import { useState } from "react";
import { useParams } from "react-router-dom";

const ResetPasswordForm = () => {

    const { token } = useParams()
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");


    // function to handle the form submission

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(''); //clear the previous error
        setMessage(""); //clear the previous messages

        try {
            const res = await fetch(`http://localhost:5004/api/users/password-reset/${token}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({password})
            })

            if (res.ok) {
                const data = await res.json();
                setMessage(data.message || "Password reset succesfully");
                setPassword('')
            } else {
                const errordata = await res.json();
                setError(errordata.message || "Password not reset please try again")
            }

        } catch (error) {
            setError("Unable to reset")
        }

    }


    // rendering the component

    return (
        <div className="bg-primary-subtle p-4 rounded">
            <form onSubmit={handleSubmit}>
                <h2 className="mb-5 text-primary text-center">Reset Password</h2>
                {message && <div className="alert alert-success">{message}</div>}
                {error && <div className="alert alert-danger">{error}</div>}


                <div className="mb-3">
                    <label className="form-label fw-bold">Password</label>
                    <input
                        type="password"
                        placeholder="Reset your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>

                <button type="submit" className="mb-3 mt-3 btn btn-success">Reset password</button>
            </form>
        </div>
    )


}


export default ResetPasswordForm