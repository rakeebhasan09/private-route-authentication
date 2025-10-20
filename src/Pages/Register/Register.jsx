import { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { sendEmailVerification } from "firebase/auth";

const Register = () => {
	const [show, setShow] = useState(false);
	const { emailPasswordRegistration, handleUpdateProfile } = use(AuthContext);
	const navigate = useNavigate();

	const handleRegistration = (e) => {
		e.preventDefault();
		const displayName = e.target.name.value;
		const photoURL = e.target.photo.value;
		const email = e.target.email.value;
		const password = e.target.password.value;

		// Name Regex Pattern
		const namePatter = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
		if (!namePatter.test(displayName)) {
			toast.warn("Name Content Letters Only!");
			return;
		}

		// Email Regex Pattern
		const emailPattern = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
		if (!emailPattern.test(email)) {
			toast.warn("You must need to provide ends with @gmail.com!");
			return;
		}

		// Password Regex Pattern
		const passwordPattern =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#+=^()_-])[A-Za-z\d@$!%*?&#+=^()_-]{6,}$/;

		if (!passwordPattern.test(password)) {
			Swal.fire({
				title: "Wrong Password Format!",
				text: "Password must be at least 10 characters, one uppercase, one lowercase, one number, and one special character",
				icon: "error",
			});
			return;
		}
		// console.log("register button clicked.");

		// Email Password Registration
		emailPasswordRegistration(email, password)
			.then((result) => {
				handleUpdateProfile(result.user, { displayName, photoURL })
					.then(() => {
						sendEmailVerification(result.user)
							.then(() => {
								Swal.fire({
									title: "Registration Successfull.",
									text: "Check your email inbox or spam to verify your account",
									icon: "success",
								});
								e.target.reset();
								navigate("/");
							})
							.catch((error) => {
								const message = error.message;
								const modifiedMessage = message
									.split("/")[1]
									.replaceAll("-", " ")
									.replace(")", "");
								toast.error(modifiedMessage);
							});
					})
					.catch((error) => {
						const message = error.message;
						const modifiedMessage = message
							.split("/")[1]
							.replaceAll("-", " ")
							.replace(")", "");
						toast.error(modifiedMessage);
					});
			})
			.catch((error) => {
				const message = error.message;
				const modifiedMessage = message
					.split("/")[1]
					.replaceAll("-", " ")
					.replace(")", "");
				toast.error(modifiedMessage);
			});
	};

	return (
		<div className="container">
			<div className="card bg-base-100 mx-auto mt-28 md:mt-36 w-full max-w-lg shrink-0 shadow-2xl">
				<h1 className="text-3xl font-bold text-center pt-10">
					Register Now!
				</h1>
				<div className="card-body">
					<form onSubmit={handleRegistration}>
						<fieldset className="fieldset">
							<label className="label">Name</label>
							<input
								type="text"
								className="input w-full focus:outline-none"
								placeholder="Your Name"
								name="name"
							/>
							<label className="label">Photo URL</label>
							<input
								type="text"
								className="input w-full focus:outline-none"
								placeholder="Photo URL"
								name="photo"
							/>
							<label className="label">Email</label>
							<input
								type="email"
								className="input w-full focus:outline-none"
								placeholder="Email"
								name="email"
							/>
							<label className="label">Password</label>
							<div className="relative">
								<div className="absolute right-3 top-[50%] translate-y-[-50%] z-10">
									{show ? (
										<IoMdEyeOff
											onClick={() => setShow(!show)}
											className="text-[22px] cursor-pointer"
										/>
									) : (
										<IoMdEye
											onClick={() => setShow(!show)}
											className="text-[22px] cursor-pointer"
										/>
									)}
								</div>
								<input
									type={show ? "text" : "password"}
									className="input w-full focus:outline-none"
									placeholder="Password"
									name="password"
								/>
							</div>

							<button className="btn btn-neutral mt-4">
								Register
							</button>
						</fieldset>
					</form>
					<p className="text-center pt-2.5">
						Already have an account? Please{" "}
						<Link to="/login" className="text-blue-500">
							Login
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;
