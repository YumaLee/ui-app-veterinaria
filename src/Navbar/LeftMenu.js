import React, { Component } from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class LeftMenu extends Component {
  render() {
    return (
			<Menu mode="horizontal">
      	<Menu.Item key="mail">
          <a href="">Inicio</a>
        </Menu.Item>
        <SubMenu title={<span>Veterinaria</span>}>
          <MenuItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
        <Menu.Item key="alipay">
          <a href="">Servicios</a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default LeftMenu;