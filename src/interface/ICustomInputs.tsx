import { InputProps } from "@chakra-ui/react";

export default interface ICustomInputProps extends InputProps {
	title?: string;
	textColor?: string;
	fontFamily?: string;
	icon?: React.ReactNode;
	secured?: boolean;
	showPrefix?: boolean;
	boxStyles?: React.CSSProperties;
	height?: string;
	fontSize?: string | string[];
	fontWeight?: string;
	placeholder?: string;
	disabled?: boolean;
	errorMsg?: string;
	error?: boolean;
	bg?:string;
}