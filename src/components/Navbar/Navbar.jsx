import { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";

import defaultUser from "../../assets/default-user.png";

const Navbar = () => {
	const { user, logOut } = use(AuthContext);

	const handleLogOut = () => {
		logOut();
	};

	const menuItems = (
		<>
			<li>
				<NavLink
					className="hover:bg-transparent focus:!bg-transparent text-[16px]"
					to="/"
				>
					Home
				</NavLink>
			</li>
			<li>
				<NavLink
					className="hover:bg-transparent focus:!bg-transparent text-[16px]"
					to="/about"
				>
					About
				</NavLink>
			</li>
			<li>
				<NavLink
					className="hover:bg-transparent focus:!bg-transparent text-[16px]"
					to="/contact"
				>
					Contact
				</NavLink>
			</li>
			<li>
				<NavLink
					className="hover:bg-transparent focus:!bg-transparent text-[16px]"
					to="/dashboard"
				>
					Dashboard
				</NavLink>
			</li>
		</>
	);
	return (
		<header className="bg-base-100 shadow-sm py-5">
			<div className="container">
				<div className="navbar min-h-0 p-0">
					<div className="navbar-start">
						<div className="dropdown">
							<div
								tabIndex={0}
								role="button"
								className="lg:hidden cursor-pointer mr-3"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-10 w-10"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 6h16M4 12h8m-8 6h16"
									/>
								</svg>
							</div>
							<ul
								tabIndex="-1"
								className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
							>
								{menuItems}
							</ul>
						</div>
						<Link to="/" className="text-3xl font-semibold">
							daisyUI
						</Link>
					</div>
					<div className="navbar-center hidden lg:flex">
						<ul className="menu menu-horizontal p-0">
							{menuItems}
						</ul>
					</div>
					<div className="navbar-end">
						{user ? (
							<div className="dropdown dropdown-end !w-[45px] !h-[45px]">
								<div
									tabIndex={0}
									role="button"
									className="rounded-full cursor-pointer !w-[45px] !h-[45px]"
								>
									<div className="!w-[45px] rounded-full">
										{user?.photoURL ? (
											<img
												className="!w-[60px] rounded-full"
												src={user.photoURL}
												alt="Profile"
											/>
										) : (
											<img
												className="!w-[60px] rounded-full"
												src={defaultUser}
												alt="Default"
											/>
										)}
									</div>
								</div>
								<ul
									tabIndex="-1"
									className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3  p-2 shadow"
								>
									<li>
										<span className="text-[16px]">
											{user.displayName}
										</span>
									</li>
									<li>
										<span className="text-[16px]">
											{user.email}
										</span>
									</li>
									<li>
										<span
											onClick={handleLogOut}
											className="text-[16px]"
										>
											Logout
										</span>
									</li>
								</ul>
							</div>
						) : (
							<Link to="/login" className="btn btn-primary">
								Login
							</Link>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
