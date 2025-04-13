import { Divider, Flex, Tag } from "antd";
export type tagsType = "success" | "warning" | "error";
import { GoDotFill } from "react-icons/go";

interface props {
  type: tagsType;
}
const StatusTags = ({ type }: props) => {
  return (
    <Tag
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.1rem",
        padding: "0.2rem 0.5rem",
        whiteSpace: "nowrap",
      }}
      bordered={false}
      color={type}
    >
      <GoDotFill />
      {type === "success"
        ? "Paid"
        : type === "error"
        ? "Fail"
        : type === "warning"
        ? "Unpaid"
        : ""}
    </Tag>
  );
};

export default StatusTags;
