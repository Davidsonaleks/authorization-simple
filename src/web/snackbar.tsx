import React, { CSSProperties, FC } from "react"

type TSnackBar = {
  show: boolean
  text: string
}

const whenShown: CSSProperties = {
  bottom: "100px",
}
const whenNotShown: CSSProperties = {
  bottom: "-100px",
}
const style: CSSProperties = {
  position: "absolute",
  width: "60",
  background: "green",
  transform: "translateX(-50%)",
  left: "50%",
  fontSize: "20px",
  color: "#fff",
  padding: "20px",
  textAlign: "center",
  transition: ".3s",
}

export const SnackBar: FC<TSnackBar> = ({ show, text }) => {
  const currentStyle = show ? whenShown : whenNotShown
  return <div style={{ ...style, ...currentStyle }}>{text}</div>
}
