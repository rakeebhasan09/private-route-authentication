import { useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
import {
	createUserWithEmailAndPassword,
	GithubAuthProvider,
	GoogleAuthProvider,
	onAuthStateChanged,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	// Login Using Google Account
	const googleProvider = new GoogleAuthProvider();
	const googleLogIn = () => {
		return signInWithPopup(auth, googleProvider);
	};

	// Login Using GitHub
	const githubProvider = new GithubAuthProvider();
	const gitHubLogIn = () => {
		return signInWithPopup(auth, githubProvider);
	};

	// Register With Email Password
	const emailPasswordRegistration = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};

	// Update Profile
	const handleUpdateProfile = (userInfo, updatedInfo) => {
		return updateProfile(userInfo, updatedInfo);
	};

	// User Login Email Password
	const loginWithEmailPassword = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	// Forget Password
	const resetPassword = (email) => {
		return sendPasswordResetEmail(auth, email);
	};

	// LogOut Process
	const logOut = () => {
		return signOut(auth);
	};

	// Observer
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const authData = {
		user,
		loading,
		googleLogIn,
		gitHubLogIn,
		emailPasswordRegistration,
		handleUpdateProfile,
		loginWithEmailPassword,
		resetPassword,
		logOut,
	};

	return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
