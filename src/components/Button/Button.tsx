import type { FC, ReactNode, MouseEvent } from "react";
import cls from "./Button.module.css"

export interface IButtonProps {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  isActive?: boolean; 
  isDisabled?: boolean;
  children: ReactNode;
}

export const Button: FC<IButtonProps> = ({onClick, isActive, isDisabled, children}) => {
  return (
    <button className={`${cls.btn} ${isActive ? cls.active : ""}`} onClick={onClick} disabled={isDisabled}>
      {children}
    </button> 
  );
}
