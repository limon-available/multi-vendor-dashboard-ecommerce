 import React, { useEffect, useState } from 'react';
import { Link,useLocation, useNavigate } from 'react-router-dom';
import { getNav } from '../navigation/index';
import { BiLogOutCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../store/Reducers/authReducer';
import logo from '../assets/logo.png'

const Sidebar = ({showSidebar, setShowSidebar}) => {

    const dispatch = useDispatch()
    const { role, userInfo } = useSelector(state => state.auth)
    const navigate = useNavigate()

    const {pathname} = useLocation()
    const [allNav,setAllNav] = useState([])
    useEffect(() => {
        const navs = getNav(role)
        setAllNav(navs)
    },[role])


    return (
        <div>
            <div onClick={()=> setShowSidebar(false)} className={`fixed duration-300 ${!showSidebar ? 'invisible opacity-0' : 'visible opacity-100'} w-screen h-screen bg-slate-900/40 backdrop-blur-sm top-0 left-0 z-10`} >
            </div>

    <div className={`w-[260px] fixed bg-white border-r border-slate-100 z-50 top-0 h-screen shadow-soft transition-all flex flex-col ${showSidebar ? 'left-0' : '-left-[260px] lg:left-0'} `}>
        {/* Brand */}
        <div className='h-[70px] flex justify-center items-center border-b border-slate-100 shrink-0'>
            <Link to='/' className='w-[180px] h-[50px]'>
                <img className='w-full h-full object-contain' src={logo} alt="" />
            </Link>
        </div>

        {/* Profile card */}
        <div className='px-4 pt-4 shrink-0'>
            <div className='flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100/70'>
                <img
                    className='w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-sm'
                    src={role === 'admin' ? '/images/admin.jpg' : (userInfo?.image || '/images/admin.jpg')}
                    alt=""
                />
                <div className='leading-tight min-w-0'>
                    <h2 className='text-sm font-bold text-slate-800 truncate'>{userInfo?.name || 'User'}</h2>
                    <span className='inline-block mt-0.5 text-[11px] font-semibold capitalize px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-600'>
                        {role || 'member'}
                    </span>
                </div>
            </div>
        </div>

        {/* Navigation */}
        <div className='px-4 pt-5 flex-1 overflow-y-auto'>
            <p className='text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 px-2 mb-2'>Menu</p>
            <ul>
                {
                    allNav.map((n,i) =>{
                        const active = pathname === n.path
                        return (
                            <li key={i}>
                            <Link to={n.path} className={`group relative ${active ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 shadow-md shadow-indigo-500/30 text-white' : 'text-slate-600 font-semibold hover:bg-indigo-50 hover:text-indigo-600' } px-[14px] py-[11px] rounded-xl flex justify-start items-center gap-[12px] transition-all duration-200 w-full mb-1.5`} >
                                <span className={`absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-white transition-all ${active ? 'opacity-100' : 'opacity-0'}`}></span>
                                <span className='text-lg'>{n.icon}</span>
                                <span className='text-sm'>{n.title}</span>
                            </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>

        {/* Logout (sticky bottom) */}
        <div className='px-4 py-4 border-t border-slate-100 shrink-0'>
            <button onClick={() => dispatch(logout({navigate,role }))} className='text-slate-600 font-semibold duration-200 px-[14px] py-[11px] rounded-xl flex justify-start items-center gap-[12px] hover:bg-red-50 hover:text-red-500 transition-all w-full'>
                <span className='text-lg'><BiLogOutCircle /></span>
                <span className='text-sm'>Logout</span>
            </button>
        </div>
    </div>

        </div>
    );
};

export default Sidebar;
