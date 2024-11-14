import classes from "./Card.module.css";
import { ComponentPropsWithoutRef } from "react";

type CardProps = {
  className?: string;
} & ComponentPropsWithoutRef<"section">;

const Card = (props: CardProps) => {
  return (
    <section
      className={`${classes.card} ${props.className ? props.className : ""}`}
    >
      {props.children}
    </section>
  );
};

export default Card;
