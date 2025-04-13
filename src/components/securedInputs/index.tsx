import React from "react";
import {
	FormHelperText,
	FormLabel,
	Input,
	InputGroup,
	Icon,
	InputRightElement,
	useColorMode,
} from "@chakra-ui/react";

import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import ICustomInputProps from "@interface/ICustomInputs";

const SecuredInput: React.FC<ICustomInputProps> = ({
	title = "title",
	textColor = "",
	// fontFamily = "",
	// icon,
	// secured = false,
	// boxStyles = {},
	bg="#f5f5f5",
	height,
	fontSize,
	fontWeight,
	placeholder = "",
	// disabled = false,
	errorMsg,
	error,
	...rest
}) => {
	const [show, setShow] = React.useState(true);
	const { colorMode } = useColorMode();
	const handleClick = () => setShow(!show);

	const isDarkMode = colorMode !== "light";

	return (
		<>
			<FormLabel
				mb={["8px"]}
				lineHeight={["16px", "17px"]}
				fontSize={fontSize || ["12px", "14px"]}
				color={textColor || "neutral.1"}
				fontWeight={fontWeight || "500"}
				float={"left"}
			>
				{title}
			</FormLabel>
			<InputGroup
				style={{
					height: height || "56px",
					width: "100%",
					borderRadius: "5px",
					border: error
						? "1px solid #F10000 "
						: "1.5px solid inherit",
					backgroundColor: isDarkMode ? "black" : "white",
				}}
				size="md"
			>
				<Input
					isRequired={true}
					fontSize="sm"
					style={{
						height: "100%",
						width: "100%",

						backgroundColor: isDarkMode ? "black" : bg,
						color: isDarkMode ? "white" : "black",
					}}
					placeholder={placeholder}
					size="lg"
					type={!show ? "text" : "password"}
					variant="auth"
					{...rest}
				/>
				<InputRightElement
					h={["100%"]}
					display="flex"
					alignItems="center"
				>
					<Icon
						color={!isDarkMode ? "black" : "white"}
						_hover={{ cursor: "pointer" }}
						as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
						onClick={handleClick}
					/>
				</InputRightElement>
			</InputGroup>
			{error && (
				<FormHelperText fontSize={"x-small"} color="error.20">
					{errorMsg}
				</FormHelperText>
			)}
		</>
	);
};

export default SecuredInput;