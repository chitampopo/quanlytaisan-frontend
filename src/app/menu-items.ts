export interface MenuItem {
  link: string;
  icon: string;
  title: string;
}

export const USER_MENU: MenuItem[] = [
  {
    link: '/home',
    icon: 'home',
    title: 'Trang chủ'
  },
  {
    link: '/bat-dong-san',
    icon: 'apartment',
    title: 'Bất động sản'
  },
  {
    link: '/dong-san',
    icon: 'commute',
    title: 'Động sản'
  },
  {
    link: '/ban-do',
    icon: 'place',
    title: 'Bản đồ'
  }
]

export const ADMIN_MENU: MenuItem[] = [
  {
    link: '/home',
    icon: 'home',
    title: 'Trang chủ'
  },
  {
    link: '/bat-dong-san',
    icon: 'apartment',
    title: 'Bất động sản'
  },
  {
    link: '/dong-san',
    icon: 'commute',
    title: 'Động sản'
  },
  {
    link: '/ban-do',
    icon: 'place',
    title: 'Bản đồ'
  },
  {
    link: '/cai-dat',
    icon: 'settings',
    title: 'Cài đặt'
  },
  {
    link: '/bat-dong-san-quan-ly',
    icon: 'apartment',
    title: 'Quản lý BDS'
  },
  {
    link: '/dong-san-quan-ly',
    icon: 'commute',
    title: 'Quản lý ĐS'
  },
  {
    link: '/bat-dong-san-sap-xep',
    icon: 'view_agenda',
    title: 'Sắp xếp'
  }
]
