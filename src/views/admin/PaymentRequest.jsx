 import React, { forwardRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List } from 'react-window';   // ✅ Fixed import
import { confirm_payment_request, get_payment_request, messageClear } from '../../store/Reducers/PaymentReducer';
import moment from 'moment';
import toast from 'react-hot-toast';

function handleOnWheel({ deltaY }) {
    console.log('handleOnWheel', deltaY);
}

const outerElementType = forwardRef((props, ref) => (
    <div ref={ref} onWheel={handleOnWheel} {...props} />
));

const PaymentRequest = () => {
    const dispatch = useDispatch();
    const { successMessage, errorMessage, pendingWithdrows = [], loader } = useSelector(state => state.payment); 
    const [paymentId, setPaymentId] = useState('');

    useEffect(() => {
        dispatch(get_payment_request());
    }, [dispatch]);

    const confirm_request = (id) => {
        setPaymentId(id);
        dispatch(confirm_payment_request(id));
    };

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

    const Row = ({ index, style }) => {
        const item = Array.isArray(pendingWithdrows) ? pendingWithdrows[index] : null;
        if (!item) return null;

        return (
            <div style={style} className='flex text-sm text-white font-medium'>
                <div className='w-[20%] p-2 whitespace-nowrap'>{index + 1}</div>
                <div className='w-[20%] p-2 whitespace-nowrap'>${item.amount}</div>
                <div className='w-[20%] p-2 whitespace-nowrap'>
                    <span className='py-[1px] px-[5px] bg-slate-300 text-blue-500 rounded-md text-sm'>
                        {item.status}
                    </span>
                </div>
                <div className='w-[20%] p-2 whitespace-nowrap'>
                    {item.createdAt ? moment(item.createdAt).format('LL') : '--'}
                </div>
                <div className='w-[20%] p-2 whitespace-nowrap'>
                    <button
                        disabled={loader}
                        onClick={() => confirm_request(item._id)}
                        className='bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-[2px] cursor-pointer text-white rounded-sm text-sm'
                    >
                        {(loader && paymentId === item._id) ? 'loading..' : 'Confirm'}
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
                <h2 className='text-xl font-medium pb-5 text-[#d0d2d6]'>Withdrawal Request</h2>
                <div className='w-full'>
                    <div className='w-full overflow-x-auto'>
                        <div className='flex bg-[#a7a3de] uppercase text-xs font-bold min-w-[340px] rounded-md'>
                            <div className='w-[20%] p-2'>No</div>
                            <div className='w-[20%] p-2'>Amount</div>
                            <div className='w-[20%] p-2'>Status</div>
                            <div className='w-[20%] p-2'>Date</div>
                            <div className='w-[20%] p-2'>Action</div>
                        </div>

                        <List
                            style={{ minWidth: '340px' }}
                            className='List'
                            height={350}
                            itemCount={Array.isArray(pendingWithdrows) ? pendingWithdrows.length : 0}
                            itemSize={40}
                            outerElementType={outerElementType}
                        >
                            {Row}
                        </List>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentRequest;
