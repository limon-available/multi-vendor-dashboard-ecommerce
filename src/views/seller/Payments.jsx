 import React, { forwardRef, useEffect, useState } from 'react';
import { MdCurrencyExchange } from "react-icons/md"; 
import { useDispatch, useSelector } from 'react-redux';
import { List } from 'react-window';
import { get_seller_payment_details, messageClear, send_withdrowal_request } from '../../store/Reducers/PaymentReducer';
import toast from 'react-hot-toast';
import moment from 'moment';

function handleOnWheel({ deltaY }) {
    console.log('handleOnWheel', deltaY);
}

const outerElementType = forwardRef((props, ref) => (
    <div ref={ref} onWheel={handleOnWheel} {...props} /> 
));

const Payments = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.auth);

    const {
        successMessage, errorMessage, loader,
        pendingWithdrows = [],   // fallback empty array
        successWithdrows = [],   // fallback empty array
        totalAmount = 0, withdrowAmount = 0,
        pendingAmount = 0, availableAmount = 0
    } = useSelector(state => state.payment);

    const [amount, setAmount] = useState(0);

    const sendRequest = (e) => {
        e.preventDefault();
        if (availableAmount - amount > 10) {
            dispatch(send_withdrowal_request({ amount, sellerId: userInfo?._id }));
            setAmount(0);
        } else {
            toast.error('Insufficient Balance');
        }
    };

    // ✅ Safe Row for Pending
    const Row = ({ index, style }) => {
        if (!Array.isArray(pendingWithdrows)) {
            return <div style={style}>No data</div>;
        }
        const item = pendingWithdrows[index];
        if (!item) {
            return <div style={style}>--</div>;
        }
        return (
            <div style={style} className='flex text-sm text-white font-medium'>
                <div className='w-[25%] p-2 whitespace-nowrap'>{index + 1}</div>
                <div className='w-[25%] p-2 whitespace-nowrap'>${item.amount ?? 0}</div>
                <div className='w-[25%] p-2 whitespace-nowrap'>
                    <span className='py-[1px] px-[5px] bg-slate-300 text-blue-500 rounded-md text-sm'>
                        {item.status ?? "N/A"}
                    </span>
                </div>
                <div className='w-[25%] p-2 whitespace-nowrap'>
                    {item.createdAt ? moment(item.createdAt).format('LL') : "--"}
                </div>
            </div>
        );
    };

    // ✅ Safe Rows for Success
    const Rows = ({ index, style }) => {
        if (!Array.isArray(successWithdrows)) {
            return <div style={style}>No data</div>;
        }
        const item = successWithdrows[index];
        if (!item) {
            return <div style={style}>--</div>;
        }
        return (
            <div style={style} className='flex text-sm text-white font-medium'>
                <div className='w-[25%] p-2 whitespace-nowrap'>{index + 1}</div>
                <div className='w-[25%] p-2 whitespace-nowrap'>${item.amount ?? 0}</div>
                <div className='w-[25%] p-2 whitespace-nowrap'>
                    <span className='py-[1px] px-[5px] bg-slate-300 text-blue-500 rounded-md text-sm'>
                        {item.status ?? "N/A"}
                    </span>
                </div>
                <div className='w-[25%] p-2 whitespace-nowrap'>
                    {item.createdAt ? moment(item.createdAt).format('LL') : "--"}
                </div>
            </div>
        );
    };

    useEffect(() => {
        if (userInfo?._id) {
            dispatch(get_seller_payment_details(userInfo._id));
        }
    }, [dispatch, userInfo]);

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage, dispatch]);

    return (
        <div className='px-2 md:px-7 py-5'>
            {/* Top cards */}
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-5'>
                <Card value={totalAmount} label="Total Sales" color="bg-[#fa0305]" bg="bg-[#fae8e8]" />
                <Card value={availableAmount} label="Available Amount" color="bg-[#760077]" bg="bg-[#fde2ff]" />
                <Card value={withdrowAmount} label="WithDrawal Amount" color="bg-[#038000]" bg="bg-[#e9feea]" />
                <Card value={pendingAmount} label="Pending Amount" color="bg-[#0200f8]" bg="bg-[#ecebff]" />
            </div>

            {/* Tables */}
            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-2 pb-4'>
                {/* Pending */}
                <div className='bg-[#6a5fdf] text-[#d0d2d6] rounded-md p-5'>
                    <h2 className='text-lg'>Send Request</h2>
                    <div className='pt-5 mb-5'>
                        <form onSubmit={sendRequest}>
                            <div className='flex gap-3 flex-wrap'>
                                <input
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    value={amount}
                                    min='0'
                                    type="number"
                                    className='px-3 py-2 md:w-[75%] focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
                                    name='amount'
                                />
                                <button disabled={loader} className='bg-red-500 hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2'>
                                    {loader ? 'loading..' : 'Submit'}
                                </button>
                            </div>
                        </form> 
                    </div>

                    <h2 className='text-lg pb-4'>Pending Request</h2>
                    <TableHeader />
                    {Array.isArray(pendingWithdrows) && pendingWithdrows.length > 0 ? (
                        <List
                            style={{ minWidth: '340px' }}
                            className='List'
                            height={350}
                            itemCount={pendingWithdrows.length}
                            itemSize={35}
                            outerElementType={outerElementType}
                        >
                            {Row}
                        </List>
                    ) : (
                        <p className='text-sm text-white mt-2'>No pending requests</p>
                    )}
                </div>

                {/* Success */}
                <div className='bg-[#6a5fdf] text-[#d0d2d6] rounded-md p-5'>
                    <h2 className='text-lg pb-4'>Success WithDrawal</h2>
                    <TableHeader />
                    {Array.isArray(successWithdrows) && successWithdrows.length > 0 ? (
                        <List
                            style={{ minWidth: '340px' }}
                            className='List'
                            height={350}
                            itemCount={successWithdrows.length}
                            itemSize={35}
                            outerElementType={outerElementType}
                        >
                            {Rows}
                        </List>
                    ) : (
                        <p className='text-sm text-white mt-2'>No successful withdrawals</p>
                    )}
                </div>
            </div>
        </div>
    );
};

const Card = ({ value, label, color, bg }) => (
    <div className={`flex justify-between items-center p-5 ${bg} rounded-md gap-3`}>
        <div className='flex flex-col justify-start items-start text-[#5c5a5a]'>
            <h2 className='text-2xl font-bold'>${value}</h2>
            <span className='text-sm font-bold'>{label}</span>
        </div>
        <div className={`w-[40px] h-[47px] rounded-full ${color} flex justify-center items-center text-xl`}>
            <MdCurrencyExchange className='text-[#fae8e8] shadow-lg' /> 
        </div> 
    </div>
);

const TableHeader = () => (
    <div className='flex bg-[#a7a3de] uppercase text-xs font-bold min-w-[340px] rounded-md'>
        <div className='w-[25%] p-2'> No </div>
        <div className='w-[25%] p-2'> Amount </div>
        <div className='w-[25%] p-2'> Status </div>
        <div className='w-[25%] p-2'> Date </div> 
    </div>
);

export default Payments;
