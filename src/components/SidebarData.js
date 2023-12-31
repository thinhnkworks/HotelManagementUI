import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as LiaIcons from 'react-icons/lia';
import * as RiIcons from 'react-icons/ri';
import * as Io5Icons from 'react-icons/io5';



export const SidebarData = [
  {
    title: 'Trang chủ',
    path: '/',
    icon: <AiIcons.AiOutlineHome />,
    cName: 'nav-text'
  },
  {
    title: 'Khách hàng',
    path: '/clients',
    icon: <Io5Icons.IoPeopleOutline />,
    cName: 'nav-text'
  },
  {
    title: 'Danh sách phòng',
    path: '/listRooms',
    icon: <BsIcons.BsListTask />,
    cName: 'nav-text'
  },
  {
    title: 'Đặt phòng',
    path: '/booking',
    icon: <BsIcons.BsPencilSquare />,
    cName: 'nav-text'
  },
  {
    title: 'Hóa đơn',
    path: '/invoices',
    icon: <LiaIcons.LiaFileInvoiceDollarSolid />,
    cName: 'nav-text'
  },

  {
    title: 'Dịch vụ',
    path: '/services',
    icon: <RiIcons.RiServiceLine />,
    cName: 'nav-text'
  },
  {
    title: 'Phụ phí',
    path: '/surcharge',
    icon: <RiIcons.RiMoneyDollarCircleLine />,
    cName: 'nav-text'
  },

];