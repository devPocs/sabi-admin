import { useNavigate } from "react-router-dom";
import { ImCircleLeft } from "react-icons/im";
import { useColorMode } from "@chakra-ui/react";

interface IBackButtonProps {
	onClick?: () => void;
}
const BackButton = ({ onClick }: IBackButtonProps) => {
	const navigate = useNavigate();
	const { colorMode } = useColorMode();

	const isDarkMode = colorMode !== "light";

	const goBack = () => {
		navigate(-1);
	};

	return (
		<>
			<ImCircleLeft
				onClick={onClick || goBack}
				style={{
					cursor: "pointer",
					margin: "10px",
					color: isDarkMode ? "#E6E6E6" : "",
				}}
				fontSize={20}
			/>
		</>
	);
};

export default BackButton;
