import React, { useState } from 'react';
import SideMenu from "../../components/SideMenu"
import { Button, Layout, Flex } from "antd"
import { Content, Footer, Header } from "antd/es/layout/layout"
import Sider from "antd/es/layout/Sider"
import BgPic from '.././../assets/bg2.jpg'

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
  } from '@ant-design/icons';

  const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    overflow:'hidden',
    height:'100vh',
    padding:'3%',
    background: `url(${BgPic}) center/cover no-repeat, linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))`, 
  };
  
  const contentInside: React.CSSProperties = {
    width:'100%',
    height:'100%',
    borderRadius:'8px',
    background: "rgba(255, 255, 255, 0.21)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(11.5px)",
    border: "1px solid rgba(255, 255, 255, 0.39)",
  };
  
  const layoutStyle = {
    overflow: 'hidden',
    width: 'calc(100%)',
    maxWidth: 'calc(100%)',
    
  };
  

function LayoutCore({children}:any) {

const [collapsed, setCollapsed] = useState(false);


  return (
    <Flex gap="middle" wrap="wrap">
       <Layout style={layoutStyle} >
            <Sider collapsible trigger={null} collapsed={collapsed}>
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                    color:'white'
                    }}
                />
                <SideMenu />
                
            </Sider>
            <Layout>
                <Content  style={contentStyle}>
                    <div style={contentInside}>
                        {children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    </Flex>
  )
}

export default LayoutCore