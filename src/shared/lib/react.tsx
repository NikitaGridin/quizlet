import { Children, ReactNode, createElement, isValidElement } from "react";

export function ComposeChildren({ children }: { children: ReactNode }) {
  const array = Children.toArray(children);
  const last = array.pop();
  return (
    <>
      {array.reduceRight(
        (child, element) =>
          isValidElement(element)
            ? createElement(element.type, element.props, child)
            : child,
        last
      )}
    </>
  );
}

export function generateCode(length: number): string {
  let code = "";
  for (let i = 0; i < length; i++) {
    const digit = Math.floor(Math.random() * 10); // Генерация случайной цифры от 0 до 9
    code += digit.toString();
  }
  return code;
}
