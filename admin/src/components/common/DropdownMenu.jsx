import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { MenuIcon } from 'lucide-react'
import { Link } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Users, Shield } from "lucide-react";

function DropDownMenu() {
    const links = [
        { name: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
        { name: "Orders", path: "/orders", icon: <ShoppingBag size={20} /> },
        { name: "Products", path: "/products", icon: <Package size={20} /> },
        { name: "Users", path: "/users", icon: <Users size={20} /> },
        { name: "Security", path: "/security", icon: <Shield size={20} /> },
    ];
    return (
        <Menu >
            <MenuButton><MenuIcon /></MenuButton>
            <MenuItems anchor="bottom" className='w-full sm:h-[90dvh] h-[90dvh] text-5xl z-50  bg-black/5 flex items-center justify-center flex-col backdrop-blur-2xl'>
              {links.map((link,idx)=>{
                return   <MenuItem key={idx}>
                 <Link className='flex items-center text-xl gap-3 justify-center min-w-max' to={link.path}>{link.name} {link.icon}</Link>
                </MenuItem>
              })}
           
            </MenuItems>
        </Menu>
    )
}
export default DropDownMenu