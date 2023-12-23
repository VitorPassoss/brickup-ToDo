import React, { useState } from 'react';
import {
  DesktopOutlined,
  MailOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}


const SideMenu: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);


  const items: MenuItem[] = [
    getItem('Area de Trabalho', '1', <DesktopOutlined />),
  
    getItem('Configurações', '2', <MailOutlined />, [
      getItem('Minha conta', '3'),
    ]),
  
    getItem('Sair', '4', <DesktopOutlined />),

  ];


  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    const keyCurrent = e.key 

  };

  return (
    <div >
   
  
      <Menu
        style={{height:'100%'}}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        inlineCollapsed={collapsed}
        items={items}
        onClick={onClick}
        theme='dark'
      >
   
      </Menu>
    </div>
  );
};

export default SideMenu;