import { BounceLoader } from "react-spinners";

const Loading = () => {
	return (
		<div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
			<BounceLoader color="#3622B0" />
		</div>
	);
};

export default Loading;
