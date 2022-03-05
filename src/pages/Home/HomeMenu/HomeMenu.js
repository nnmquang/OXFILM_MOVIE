import React, { Fragment, useState } from 'react'
import { Tabs, Radio, Space } from 'antd';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

const { TabPane } = Tabs;

export default function HomeMenu(props) {

    console.log('props', props)
    const [state, setState] = useState({
        tabPosition: 'left',
    })

    const changeTabPosition = e => {
        setState({ tabPosition: e.target.value });
    };

    const { tabPosition } = state;

    const renderHeThongRap = () => {
        return props.heThongRapChieu?.map((heThongRap, index) => {
            return <TabPane key={index} tab={<img src={heThongRap.logo} className="rounded-full" width="50" alt="" />}>
                <Tabs tabPosition={tabPosition}>
                    {heThongRap.lstCumRap?.map((cumRap, index) => {
                        return <TabPane key={index} tab={
                            <div style={{ width: '300px', display: 'flex' }}>
                                <img src="https://hkd.com.vn/ckfinder/userfiles/images/DU%20AN/26-2.png" width="50" alt="" />
                                <div className='text-left ml-2'>
                                    {cumRap.tenCumRap} <br />
                                    <a className='text-red-400'>Chi tiết</a>
                                </div>
                            </div>
                        }>
                            {cumRap.danhSachPhim.slice(0, 4).map((phim, index) => {
                                return <Fragment key={index}>
                                    <div className='my-5' style={{ display: 'flex' }} >
                                        <div style={{ display: 'flex' }}>
                                            <img style={{ height: 75, width: 75 }} src={phim.hinhAnh} alt={phim.tenPhim} onError={({ currentTarget }) => {
                                                currentTarget.onerror = null; // prevents looping
                                                currentTarget.src = "https://picsum.photos/75/75";
                                            }} />
                                            <div className="ml-2">
                                                <h1 className="text-1xl text-green-700">{phim.tenPhim}</h1>
                                                <p>{cumRap.diaChi}</p>

                                                <div className="grid grid-cols-6 gap-6">
                                                    {phim.lstLichChieuTheoPhim?.slice(0, 12).map((lichChieu, idex) => {
                                                        return <NavLink className="text-1xl text-orange-500" to="/" key={index}>
                                                            {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                        </NavLink>
                                                    })}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </Fragment>
                            })}
                        </TabPane>
                    })}
                </Tabs>
            </TabPane>
        })
    }


    return (
        <>
            {/* <Space style={{ marginBottom: 24 }}>
                Tab position:
                <Radio.Group value={tabPosition} onChange={changeTabPosition}>
                    <Radio.Button value="top">top</Radio.Button>
                    <Radio.Button value="bottom">bottom</Radio.Button>
                    <Radio.Button value="left">left</Radio.Button>
                    <Radio.Button value="right">right</Radio.Button>
                </Radio.Group>
            </Space> */}
            <Tabs tabPosition={tabPosition}>
                {renderHeThongRap()}
                {/* <TabPane tab={<img src="https://picsum.photos/200" className="rounded-full" width="50" alt="" />} key="1">
                    Content of Tab 1
                </TabPane>
                <TabPane tab={<img src="https://picsum.photos/200" className="rounded-full" width="50" alt="" />} key="2">
                    Content of Tab 2
                </TabPane>
                <TabPane tab={<img src="https://picsum.photos/200" className="rounded-full" width="50" alt="" />} key="3">
                    Content of Tab 3
                </TabPane> */}
            </Tabs>
        </>
    )
}
