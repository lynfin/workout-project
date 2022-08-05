import styled from "styled-components";

const COLORS = {
  primary: {
    "--main": "red",
    "--accent": "white",
  },
  secondary: {
    "--main": "lavenderblush",
    "--accent": "indigo",
  },
};

function ButtonFixedWidth({
  variant = "outline",
  color = "primary",
  ...props
}) {
  let Component;
  if (variant === "fill") {
    Component = FillButton;
  } else if (variant === "outline") {
    Component = OutlineButton;
  }

  return <Component style={COLORS[color]} {...props} />;
}

const ButtonBase = styled.button`
  cursor: pointer;
  font-size: 1rem;
  width: 15rem;
  border: 1px solid transparent;
  border-radius: 6px;
  padding: 8px 16px;
  text-decoration: none;
`;

const FillButton = styled(ButtonBase)`
  background-color: var(--main);
  color: var(--accent);

  &:hover {
    opacity: 0.9;
  }
`;

const OutlineButton = styled(ButtonBase)`
  background-color: white;
  color: var(--main);
  border: 2px solid var(--main);

  &:hover {
    background: var(--main);
    color: var(--accent);
    border: 2px solid var(--accent);
  }
`;

export default ButtonFixedWidth;
