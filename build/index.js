/** @jsx betanDom */
const betanDom = (type, props, ...args) => {
  return {
    type,
    props,
    children: [...args]
  };
};

const render = node => {
  if (typeof node.type === "function") {
    const result = node.type(node.props);
    return render(result);
  }

  const element = document.createElement(node.type);

  if (node.props) {
    Object.keys(node.props).map(key => {
      element.setAttribute(key, node.props[key]);
    });
  }

  node.children.forEach(child => {
    if (typeof child === "string") {
      return element.appendChild(document.createTextNode(node.children));
    }

    return element.appendChild(render(child));
  });
  return element;
};

const span = betanDom("span", {
  class: "addStyle"
}, "Hola Betan");

const Label = ({
  text
}) => betanDom("label", null, text);

const Menu = ({
  name,
  secondName
}) => betanDom("ul", null, betanDom("li", null, name), betanDom("li", null, secondName));

document.body.appendChild(render(span));
document.body.appendChild(render(betanDom(Label, {
  text: "Test functional component"
})));
document.body.appendChild(render(betanDom(Label, {
  text: "Test other component"
})));
document.body.appendChild(render(betanDom(Menu, {
  name: "Carlos",
  secondName: "Betan"
}))); // console.log(span);
// console.log(Label);