/** @jsx betanDom */

const betanDom = (type, props, ...args) => {
  return {
    type,
    props,
    children: [...args]
  }
};

const render = (node) => {
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

const span = <span class="addStyle">Hola Betan</span>;
const Label = ({ text }) => <label>{text}</label>;
const Menu = ({ name, secondName }) =>
  <ul>
    <li>{name}</li>
    <li>{secondName}</li>
  </ul>;

document.body.appendChild(render(span));
document.body.appendChild(render(<Label text="Test functional component" />));
document.body.appendChild(render(<Label text="Test other component" />));
document.body.appendChild(render(<Menu name="Carlos" secondName="Betan" />));
// console.log(span);
// console.log(Label);