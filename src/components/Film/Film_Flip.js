import React from 'react'
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './Film_Flip.css'

export default function Film_Flip(props) {
    const history = useHistory();
    const { item } = props;
    return (
        <div>
            <div className="wrapper">
                <div className="card">
                    <div
                        style={{ background: `url(${item.hinhAnh}), url(https://picsum.photos/300)`, backgroundPosition: 'center', backgroundSize: '100%' }}
                    >
                        <img className='opacity-0 w-full' src={item.hinhAnh} alt={item.hinhAnh} style={{ height: '350px' }} />
                    </div>
                    <div className="descriptions">
                        <h1>{item.tenPhim.toUpperCase()}</h1>
                        <p className="leading-relaxed mb-3 h-16">{item.moTa.length > 100 ? <span>{item.moTa.slice(0, 300)} ...</span> : <span>{item.moTa}</span>}</p>
                        <NavLink to={`/detail/${item.maPhim}`} className="text-blue-600 inline-flex items-center font-bold">ĐẶT VÉ
                            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14" />
                                <path d="M12 5l7 7-7 7" />
                            </svg>
                        </NavLink>

                        
                        {/* <div onClick={()=>{   // có thể sử dụng cach history.push để link thay cho navlink sử dụng useHistory
                            history.push(`/detail/${item.maPhim}`)
                        }} className="text-blue-600 inline-flex items-center font-bold">ĐẶT VÉ
                            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14" />
                                <path d="M12 5l7 7-7 7" />
                            </svg>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
